// Motor de cálculo de la Calculadora de beneficios.
// Funciones puras, sin React: todo lo que se muestra en pantalla sale de aquí.
//
// Convenciones:
// - Internamente TODO va sin IVA. Si el usuario indica que sus cifras de ventas
//   incluyen IVA, se dividen por (1 + IVA). Los costes se piden siempre sin IVA
//   (el IVA soportado es recuperable para una empresa o autónomo).
// - Las cifras de ventas, costes variables y marketing son totales del periodo
//   elegido (1, 3, 6 o 12 meses). Los fijos también, pero se anualizan en línea
//   recta (no dependen de la estacionalidad).

export type Mode = "eur" | "pct"
/** "review" = el dato parece mal metido (p. ej. una plataforma se atribuye más de lo vendido). */
export type Level = "good" | "warn" | "bad" | "neutral" | "review"
/**
 * Fiabilidad del resultado:
 * - empty: aún no hay datos.
 * - incomplete: falta algún dato clave (ver KEY_FIELDS); no se da veredicto.
 * - quick: modo rápido con los datos clave del modo rápido; faltan partidas de coste.
 * - complete: todos los datos clave del modo completo.
 */
export type Status = "empty" | "incomplete" | "quick" | "complete"
export type SeasonProfile = "flat" | "xmas" | "summer" | "custom"
/** Dónde vende: tienda propia, un marketplace (Etsy, Amazon…) o las dos cosas. */
export type SalesChannel = "store" | "marketplace" | "both"

export const MONTHS_SHORT = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
export const MONTHS_LONG = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
]

// Pesos relativos de cada mes (1 = mes medio). Son perfiles ORIENTATIVOS,
// estimados por SellifyWorks, no datos de mercado: en la página se indica así y
// el usuario puede ajustarlos con el perfil "personalizado".
export const SEASON_PROFILES: Record<Exclude<SeasonProfile, "custom">, number[]> = {
  flat: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     Ene  Feb  Mar  Abr  May  Jun  Jul  Ago  Sep  Oct  Nov  Dic
  xmas: [0.85, 0.8, 0.9, 0.9, 0.95, 0.9, 0.95, 0.8, 0.9, 1.0, 1.6, 1.45],
  summer: [0.8, 0.7, 0.8, 0.9, 1.1, 1.35, 1.45, 1.3, 0.9, 0.8, 1.0, 0.9],
}

export interface AdChannel {
  id: string
  name: string
  spend: number | null
  attributed: number | null
}

/** App que cobra un % de las ventas de la tienda propia (y opcionalmente un fijo por pedido). */
export interface AppFee {
  id: string
  name: string
  pct: number | null
  fixed: number | null
}

export interface Inputs {
  /** Modo rápido: solo cuentan los campos del modo rápido (ver applyMode). */
  quickMode: boolean
  months: 1 | 3 | 6 | 12
  endMonth: number // 0-11, último mes incluido en los datos
  profile: SeasonProfile
  customWeights: number[] // 12 valores
  growthPct: number | null

  salesIncludeVat: boolean | null // null = sin contestar (se calcula como "sin IVA")
  vatPct: number | null

  grossSales: number | null
  discounts: number | null
  returns: number | null
  shippingCharged: number | null
  orders: number | null
  sessions: number | null
  newCustomers: number | null
  returningCustomers: number | null

  cogsMode: Mode
  cogs: number | null
  shippingPaid: number | null
  packaging: number | null
  feesMode: Mode
  fees: number | null // € total, o % sobre lo cobrado (con IVA y envío)
  feesFixedPerOrder: number | null // solo en modo %
  returnCosts: number | null // envíos de vuelta y producto que ya no se puede revender (€)

  // Comisiones por venta. Las cifras de ventas son siempre el total de todos los canales;
  // mkSharePct dice qué parte viene del marketplace (solo en "both").
  salesChannel: SalesChannel
  mkSharePct: number | null
  mkFeePct: number | null // % sobre lo vendido en el marketplace (sin IVA)
  mkFeeFixed: number | null // fijo por pedido del marketplace
  mkFeeOnShipping: boolean // la comisión se aplica también al envío cobrado
  mkOtherFees: number | null // otras tarifas del marketplace: total del periodo
  platformFeePct: number | null // comisión por transacción de la plataforma de la tienda
  platformFeeFixed: number | null
  apps: AppFee[]

  ads: AdChannel[]
  adSpendTotal: number | null // solo modo rápido: gasto total en publicidad
  emailToolCost: number | null
  emailAttributed: number | null
  otherMarketing: number | null

  platformCost: number | null
  otherFixed: number | null
  ownerSalary: number | null // lo que se paga el dueño en el periodo
  ownerHours: number | null // horas al mes que le dedica
  profitTaxPct: number | null

  ltvEnabled: boolean
  ltvFrequency: number | null // pedidos por cliente en 12 meses

  // Primera compra (opcional): si se dejan vacíos se usa el pedido medio
  firstOrderAov: number | null // ticket medio del primer pedido, antes del descuento de bienvenida
  welcomeDiscountPct: number | null

  croUpliftPct: number | null

  /** Lo pone applyMode: en modo rápido se ignoran unas comisiones que el usuario sí indicó. */
  quickIgnoresSalesFees?: boolean
}

const n = (x: number | null | undefined) => (typeof x === "number" && isFinite(x) ? x : 0)
/** Importes de coste: el signo no importa (muchos informes los muestran en negativo). */
const a = (x: number | null | undefined) => Math.abs(n(x))
const has = (x: number | null | undefined) => typeof x === "number" && isFinite(x)
export const div = (a: number, b: number): number | null => (b > 0 && isFinite(a) ? a / b : null)

export function seasonWeights(profile: SeasonProfile, custom: number[]): number[] {
  const raw = profile === "custom" ? custom.map((w) => Math.max(0, n(w))) : SEASON_PROFILES[profile]
  const sum = raw.reduce((a, b) => a + b, 0)
  if (sum <= 0) return SEASON_PROFILES.flat
  return raw.map((w) => (w * 12) / sum) // normalizado: suma 12, media 1
}

/** Índices de mes (0-11) que cubren los datos: `months` meses terminando en `endMonth`. */
export function periodMonthIndexes(months: number, endMonth: number): number[] {
  const out: number[] = []
  for (let i = months - 1; i >= 0; i--) out.push((((endMonth - i) % 12) + 12) % 12)
  return out
}

export interface ChannelResult {
  id: string
  name: string
  spend: number
  attributed: number // sin IVA
  roas: number | null
  level: Level
}

export interface ProjectionMonth {
  monthIndex: number
  label: string
  revenue: number
  profitBeforeTax: number
}

export interface Insight {
  level: Level
  title: string
  text: string
  /** Impacto estimado en € sobre el beneficio del periodo (para ordenar). */
  impact: number
  /** summary = pérdida o rentabilidad global (va primero); data = calidad de los datos (va después). */
  kind?: "summary" | "data"
}

export interface Completeness {
  status: Status
  /** Datos clave sin rellenar: mientras falte alguno no hay veredicto. */
  missing: string[]
  /** Opcionales vacíos que cuentan como 0 (no bloquean el veredicto). */
  optionalEmpty: string[]
  /** Partidas que el modo rápido no tiene en cuenta. */
  notIncluded: string[]
  fixedKnown: boolean
}

export interface Results {
  hasData: boolean
  completeness: Completeness
  /** Solo si el resultado es completo y no hay pérdidas se permite el verde en las métricas de rentabilidad. */
  trusted: boolean
  vatRate: number
  vatFactor: number

  // Ventas (sin IVA)
  gross: number
  discounts: number
  returns: number
  netProductSales: number
  shippingRevenue: number
  netRevenue: number
  totalCharged: number // lo que pagan los clientes, con IVA
  vatCollected: number

  // Costes variables
  cogs: number
  shippingPaid: number
  packaging: number
  fees: number // pasarela de pago (solo la parte de tienda propia)
  returnCosts: number
  // Comisiones por venta
  mkShare: number // fracción de las ventas que viene del marketplace (0-1)
  marketplaceFees: number
  platformFees: number
  appFees: number
  appBreakdown: { id: string; name: string; amount: number }[]
  salesFeesTotal: number // marketplace + plataforma + apps (sin la pasarela)
  /** Solo si vende en los dos canales: lo que queda por cada unidad vendida en cada uno, antes de marketing. */
  cm1PerEuroStore: number | null
  cm1PerEuroMarketplace: number | null
  variableCosts: number
  shippingSubsidy: number // envíos pagados - cobrados (si > 0, lo pones tú)

  cm1: number // margen antes de marketing
  cm1PerEuro: number | null // € que quedan por € de ingresos netos

  // Marketing
  channels: ChannelResult[]
  adSpend: number
  adAttributed: number
  emailToolCost: number
  emailAttributed: number
  emailRoas: number | null
  otherMarketing: number
  marketing: number
  restRevenue: number // orgánico, directo, otros
  overAttribution: number // > 0 si las plataformas se atribuyen más de lo vendido

  contribution: number
  contributionPct: number | null

  fixed: number // plataforma + otros fijos + sueldo del dueño
  ownerSalary: number
  ownerSalaryEmpty: boolean // vacío o 0
  ebit: number
  tax: number
  netProfit: number
  netMarginPct: number | null
  ownerTake: number // sueldo del dueño + beneficio neto
  ownerHoursPeriod: number | null
  ownerPerHour: number | null

  // KPIs
  orders: number
  sessions: number
  aov: number | null
  conversionRate: number | null
  rpv: number | null
  newCustomers: number
  returningCustomers: number
  returningShare: number | null
  roasBreakeven: number | null // = MER mínimo para cubrir costes variables
  merProfit: number | null // MER mínimo para beneficio 0, contando los fijos (null si es imposible)
  merProfitImpossible: boolean // margen antes de marketing ≤ fijos: ningún nivel de marketing da beneficio
  mer: number | null
  recurrentOrders: number | null // pedidos − clientes nuevos (mín. 0)
  cac: number | null
  cm1PerOrder: number | null
  breakevenRevenue: number | null // ingresos netos necesarios para beneficio 0
  discountPct: number | null
  returnPct: number | null

  // LTV
  ltvFrequency: number | null
  ltvFrequencyIsEstimate: boolean
  ltvRevenue: number | null
  ltvMargin: number | null
  ltvCac: number | null

  // Primera compra
  firstOrderCustom: boolean // el usuario metió ticket o descuento propios
  firstOrderTicket: number | null // ticket del primer pedido tras el descuento de bienvenida (sin IVA)
  firstOrderMargin: number | null // lo que deja el primer pedido antes de marketing
  firstOrderProfit: number | null // margen del primer pedido − CAC
  ordersToRecoverCac: number | null // pedidos necesarios para recuperar el CAC

  // Proyección 12 meses
  seasonFactor: number
  weights: number[]
  periodMonths: number[]
  projection: ProjectionMonth[]
  projRevenue: number
  projContribution: number
  projProfitBeforeTax: number
  projTax: number
  projNetProfit: number
  lossMonths: string[]

  // ¿Y si mejoras la conversión?
  croExtraProfitYear: number | null

  insights: Insight[]
}

// ---------------------------------------------------------------------------
// Modo rápido y datos que faltan
// ---------------------------------------------------------------------------

/**
 * En modo rápido solo cuentan: IVA, ventas brutas, pedidos, % de producto,
 * envíos pagados, gasto total en publicidad, gastos fijos (en "otros fijos") y
 * sesiones. El resto se ignora (no se borra del formulario).
 */
export function applyMode(inp: Inputs): Inputs {
  if (!inp.quickMode) return { ...inp, adSpendTotal: null }
  return {
    ...inp,
    quickIgnoresSalesFees: hasSalesFees(inp),
    discounts: null,
    returns: null,
    shippingCharged: null,
    newCustomers: null,
    returningCustomers: null,
    packaging: null,
    fees: null,
    feesFixedPerOrder: null,
    returnCosts: null,
    salesChannel: "store",
    mkSharePct: null,
    mkFeePct: null,
    mkFeeFixed: null,
    mkOtherFees: null,
    platformFeePct: null,
    platformFeeFixed: null,
    apps: [],
    ads: has(inp.adSpendTotal) ? [{ id: "total", name: "Publicidad (total)", spend: inp.adSpendTotal, attributed: null }] : [],
    emailToolCost: null,
    emailAttributed: null,
    otherMarketing: null,
    platformCost: null,
    ownerSalary: null,
    ownerHours: null,
    ltvEnabled: false,
    firstOrderAov: null,
    welcomeDiscountPct: null,
  }
}

/** El usuario ha indicado comisiones por venta (o vende en un marketplace). */
function hasSalesFees(inp: Inputs) {
  return (
    inp.salesChannel !== "store" ||
    [inp.platformFeePct, inp.platformFeeFixed].some((v) => n(v) !== 0) ||
    inp.apps.some((x) => n(x.pct) !== 0 || n(x.fixed) !== 0)
  )
}

export function completeness(inp: Inputs, hasData: boolean): Completeness {
  const missing: string[] = []
  if (inp.salesIncludeVat === null) missing.push("Si tus ventas incluyen IVA o no")
  if (!has(inp.grossSales)) missing.push("Ventas brutas")
  if (!has(inp.orders)) missing.push("Pedidos")
  if (!has(inp.cogs)) missing.push("Coste de producto")
  if (!has(inp.shippingPaid)) missing.push("Envíos pagados")
  // En un marketplace el cobro va incluido en su comisión: no hay pasarela que pedir.
  if (!inp.quickMode && inp.salesChannel !== "marketplace" && !has(inp.fees)) missing.push("Pasarela de pago")
  // Gastos fijos: basta con uno de los dos campos (si no tienes uno de ellos, pon 0).
  const fixedKnown = has(inp.platformCost) || has(inp.otherFixed)
  if (!fixedKnown) missing.push("Gastos fijos")

  const optionalEmpty: string[] = []
  const notIncluded: string[] = []
  if (inp.quickMode) {
    notIncluded.push(
      "Pasarela de pago",
      "Packaging",
      "Descuentos",
      "Devoluciones y su coste",
      "Envíos cobrados a clientes",
      "Email y otros gastos de marketing",
      "Desglose de publicidad por canal (ROAS)",
      "Clientes nuevos y recurrentes (CAC, primera compra)",
      "Tu sueldo por separado",
      ...(inp.quickIgnoresSalesFees ? ["Comisiones por venta (marketplace, plataforma y apps)"] : []),
    )
  } else {
    if (!has(inp.discounts)) optionalEmpty.push("Descuentos")
    if (!has(inp.returns)) optionalEmpty.push("Devoluciones")
    if (!has(inp.shippingCharged)) optionalEmpty.push("Envíos cobrados a clientes")
    if (!has(inp.packaging)) optionalEmpty.push("Packaging")
    if (!has(inp.returnCosts)) optionalEmpty.push("Coste de devoluciones")
    const anyMarketing =
      inp.ads.some((c) => has(c.spend)) || has(inp.emailToolCost) || has(inp.otherMarketing)
    if (!anyMarketing) optionalEmpty.push("Marketing (publicidad, email y otros)")
    if (!has(inp.ownerSalary)) optionalEmpty.push("Tu sueldo")
    if (!has(inp.ownerHours)) optionalEmpty.push("Horas que le dedicas")
  }

  const status: Status = !hasData ? "empty" : missing.length > 0 ? "incomplete" : inp.quickMode ? "quick" : "complete"
  return { status, missing, optionalEmpty, notIncluded, fixedKnown }
}

/** Cálculo + conclusiones. Recibe las entradas ya pasadas por applyMode. */
export function compute(inp: Inputs): Results {
  const r = computeCore(inp)
  r.insights = buildInsights(r, inp)
  return r
}

/** Cálculo sin conclusiones (lo usa también el simulador). */
export function computeCore(inp: Inputs): Results {
  const vatRate = Math.max(0, n(inp.vatPct)) / 100
  const vatFactor = inp.salesIncludeVat === true ? 1 / (1 + vatRate) : 1

  const gross = Math.abs(n(inp.grossSales)) * vatFactor
  const discounts = Math.abs(n(inp.discounts)) * vatFactor
  const returns = Math.abs(n(inp.returns)) * vatFactor
  const shippingRevenue = Math.abs(n(inp.shippingCharged)) * vatFactor
  const netProductSales = gross - discounts - returns
  const netRevenue = netProductSales + shippingRevenue
  const totalCharged = netRevenue * (1 + vatRate)
  const vatCollected = netRevenue * vatRate

  const orders = Math.max(0, n(inp.orders))
  const sessions = Math.max(0, n(inp.sessions))
  const newCustomers = Math.max(0, n(inp.newCustomers))
  const returningCustomers = Math.max(0, n(inp.returningCustomers))

  const cogs = inp.cogsMode === "pct" ? Math.max(0, netProductSales) * (a(inp.cogs) / 100) : a(inp.cogs)
  const shippingPaid = a(inp.shippingPaid)
  const packaging = a(inp.packaging)
  // Parte de las ventas que viene del marketplace. Las cifras de ventas son el total.
  const channel = inp.salesChannel ?? "store"
  const mkShare = channel === "marketplace" ? 1 : channel === "both" ? Math.min(1, Math.max(0, n(inp.mkSharePct) / 100)) : 0
  const storeShare = 1 - mkShare
  const productBase = Math.max(0, netProductSales)

  // Pasarela: solo cobra en la tienda propia (en el marketplace el cobro va en su comisión).
  // En % se aplica a la parte de tienda; en importe total, el usuario mete lo que pagó a su
  // pasarela, que ya es solo de la tienda, así que se usa tal cual (0 si solo vende en marketplace).
  const fees =
    inp.feesMode === "pct"
      ? (Math.max(0, totalCharged) * (a(inp.fees) / 100) + orders * a(inp.feesFixedPerOrder)) * storeShare
      : channel === "marketplace"
        ? 0
        : a(inp.fees)
  const returnCosts = a(inp.returnCosts)

  // Comisiones por venta: escalan con lo vendido en cada canal (sin IVA).
  const marketplaceFees =
    channel === "store"
      ? 0
      : (productBase + (inp.mkFeeOnShipping ? shippingRevenue : 0)) * mkShare * (a(inp.mkFeePct) / 100) +
        orders * mkShare * a(inp.mkFeeFixed) +
        a(inp.mkOtherFees)
  const platformFees = channel === "marketplace" ? 0 : productBase * storeShare * (a(inp.platformFeePct) / 100) + orders * storeShare * a(inp.platformFeeFixed)
  const appBreakdown =
    channel === "marketplace"
      ? []
      : (inp.apps ?? [])
          .filter((x) => has(x.pct) || has(x.fixed))
          .map((x) => ({
            id: x.id,
            name: x.name || "App",
            amount: productBase * storeShare * (a(x.pct) / 100) + orders * storeShare * a(x.fixed),
          }))
  const appFees = appBreakdown.reduce((acc, x) => acc + x.amount, 0)
  const salesFeesTotal = marketplaceFees + platformFees + appFees

  const variableCosts = cogs + shippingPaid + packaging + fees + returnCosts + salesFeesTotal
  const shippingSubsidy = shippingPaid - shippingRevenue

  const cm1 = netRevenue - variableCosts
  const cm1PerEuro = div(cm1, netRevenue)

  // Margen por canal (solo si vende en los dos): mismos % de producto, envíos, packaging y
  // devoluciones en ambos; cada canal carga solo con sus comisiones y la pasarela, solo la tienda.
  let cm1PerEuroStore: number | null = null
  let cm1PerEuroMarketplace: number | null = null
  if (channel === "both" && netRevenue > 0 && mkShare > 0 && mkShare < 1) {
    const commonRatio = (cogs + shippingPaid + packaging + returnCosts) / netRevenue
    cm1PerEuroStore = 1 - commonRatio - (fees + platformFees + appFees) / (netRevenue * storeShare)
    cm1PerEuroMarketplace = 1 - commonRatio - marketplaceFees / (netRevenue * mkShare)
  }

  // Marketing
  const roasBreakeven = cm1 > 0 ? netRevenue / cm1 : null
  const levelVsBreakeven = (roas: number | null): Level => {
    if (roas === null) return "neutral"
    if (roasBreakeven === null) return "bad"
    if (roas < roasBreakeven) return "bad"
    if (roas < roasBreakeven * 1.2) return "warn"
    return "good"
  }

  const channels: ChannelResult[] = inp.ads
    .filter((c) => has(c.spend) || has(c.attributed))
    .map((c) => {
      const spend = a(c.spend)
      const attributed = a(c.attributed) * vatFactor
      // Sin ventas atribuidas no hay ROAS (no es 0x: es un dato que falta).
      const roas = has(c.attributed) ? div(attributed, spend) : null
      // Una sola plataforma no puede haber vendido más que la tienda entera.
      const level: Level = netRevenue > 0 && attributed > netRevenue ? "review" : levelVsBreakeven(roas)
      return { id: c.id, name: c.name || "Otra plataforma", spend, attributed, roas, level }
    })
  const adSpend = channels.reduce((a, c) => a + c.spend, 0)
  const adAttributed = channels.reduce((a, c) => a + c.attributed, 0)
  const emailToolCost = a(inp.emailToolCost)
  const emailAttributed = a(inp.emailAttributed) * vatFactor
  const emailRoas = div(emailAttributed, emailToolCost)
  const otherMarketing = a(inp.otherMarketing)
  const marketing = adSpend + emailToolCost + otherMarketing
  const attributedTotal = adAttributed + emailAttributed
  const restRevenue = Math.max(0, netRevenue - attributedTotal)
  const overAttribution = Math.max(0, attributedTotal - netRevenue)

  const contribution = cm1 - marketing
  const contributionPct = div(contribution, netRevenue)

  const ownerSalary = a(inp.ownerSalary)
  const fixed = a(inp.platformCost) + a(inp.otherFixed) + ownerSalary
  const ebit = contribution - fixed
  const taxRate = Math.max(0, n(inp.profitTaxPct)) / 100
  const tax = ebit > 0 ? ebit * taxRate : 0
  const netProfit = ebit - tax
  const netMarginPct = div(netProfit, netRevenue)

  // Lo que se lleva el dueño: su sueldo + el beneficio (o menos la pérdida).
  const ownerTake = ownerSalary + netProfit
  const ownerHoursPeriod = has(inp.ownerHours) && a(inp.ownerHours) > 0 ? a(inp.ownerHours) * inp.months : null
  const ownerPerHour = ownerHoursPeriod !== null ? ownerTake / ownerHoursPeriod : null

  const aov = div(gross - discounts, orders)
  const conversionRate = div(orders, sessions)
  const rpv = div(gross - discounts, sessions)
  const totalCustomers = newCustomers + returningCustomers
  const returningShare = div(returningCustomers, totalCustomers)
  const mer = div(netRevenue, marketing)
  // MER con el que el beneficio sería 0 a estos ingresos: marketing = margen antes de marketing − fijos.
  const merProfitImpossible = cm1 - fixed <= 0
  const merProfit = !merProfitImpossible && netRevenue > 0 ? netRevenue / (cm1 - fixed) : null
  const recurrentOrders = has(inp.newCustomers) && orders > 0 ? Math.max(0, orders - newCustomers) : null
  const cac = div(marketing, newCustomers)
  const cm1PerOrder = div(cm1, orders)
  const breakevenRevenue = cm1PerEuro !== null && cm1PerEuro > 0 ? (marketing + fixed) / cm1PerEuro : null
  const discountPct = div(discounts, gross)
  const returnPct = div(returns, gross)

  // LTV (opcional)
  let ltvFrequency: number | null = has(inp.ltvFrequency) && n(inp.ltvFrequency) > 0 ? n(inp.ltvFrequency) : null
  let ltvFrequencyIsEstimate = false
  if (ltvFrequency === null && inp.months === 12 && totalCustomers > 0 && orders > 0) {
    // Con 12 meses de datos sí podemos estimarlo: pedidos / clientes únicos.
    ltvFrequency = orders / totalCustomers
    ltvFrequencyIsEstimate = true
  }
  const aovNet = div(netProductSales, orders)
  const ltvRevenue = inp.ltvEnabled && ltvFrequency !== null && aovNet !== null ? aovNet * ltvFrequency : null
  const ltvMargin = inp.ltvEnabled && ltvFrequency !== null && cm1PerOrder !== null ? cm1PerOrder * ltvFrequency : null
  const ltvCac = ltvMargin !== null && cac !== null && cac > 0 ? ltvMargin / cac : null

  // Primera compra. Partimos del margen por pedido medio y ajustamos por la
  // diferencia de importe: producto y comisiones escalan con lo vendido; envío y
  // packaging se pagan igual en cualquier pedido.
  const firstOrderCustom = has(inp.firstOrderAov) || (has(inp.welcomeDiscountPct) && n(inp.welcomeDiscountPct) !== 0)
  const baseTicket = has(inp.firstOrderAov) ? Math.abs(n(inp.firstOrderAov)) * vatFactor : aov
  const welcome = Math.min(100, Math.max(0, n(inp.welcomeDiscountPct))) / 100
  const firstOrderTicket = baseTicket !== null ? baseTicket * (1 - welcome) : null
  const returnRate = gross - discounts > 0 ? returns / (gross - discounts) : 0
  const cogsRatio = netProductSales > 0 ? cogs / netProductSales : 0
  const feesRatio = netRevenue > 0 ? (fees + salesFeesTotal) / netRevenue : 0
  const avgNetPerOrder = div(netProductSales, orders)
  const firstOrderMargin =
    cm1PerOrder !== null && avgNetPerOrder !== null && firstOrderTicket !== null
      ? cm1PerOrder + (firstOrderTicket * (1 - returnRate) - avgNetPerOrder) * (1 - cogsRatio - feesRatio)
      : null
  const firstOrderProfit = firstOrderMargin !== null && cac !== null ? firstOrderMargin - cac : null
  const ordersToRecoverCac =
    firstOrderProfit === null || cac === null || firstOrderMargin === null
      ? null
      : firstOrderProfit >= 0
        ? cac / Math.max(firstOrderMargin, 1e-9)
        : cm1PerOrder !== null && cm1PerOrder > 0
          ? 1 + -firstOrderProfit / cm1PerOrder
          : null

  // Estacionalidad y proyección
  const weights = seasonWeights(inp.profile, inp.customWeights)
  const periodMonths = periodMonthIndexes(inp.months, inp.endMonth)
  const periodWeight = periodMonths.reduce((a, m) => a + weights[m], 0)
  const seasonFactor = periodWeight > 0 ? 12 / periodWeight : 12 / inp.months
  const linearFactor = 12 / inp.months
  const growth = 1 + n(inp.growthPct) / 100

  // Lo que escala con las ventas (y con la estacionalidad): ingresos, costes
  // variables y publicidad (suponemos MER constante). Lo fijo, en línea recta.
  const annualRevenue = netRevenue * seasonFactor * growth
  const annualVariable = variableCosts * seasonFactor * growth
  const annualScaledMkt = (adSpend + otherMarketing) * seasonFactor * growth
  const annualFlat = (fixed + emailToolCost) * linearFactor

  const projection: ProjectionMonth[] = []
  for (let i = 1; i <= 12; i++) {
    const m = (inp.endMonth + i) % 12
    const w = weights[m] / 12
    const revenue = annualRevenue * w
    const profitBeforeTax = (annualRevenue - annualVariable - annualScaledMkt) * w - annualFlat / 12
    projection.push({ monthIndex: m, label: MONTHS_SHORT[m], revenue, profitBeforeTax })
  }
  const projRevenue = annualRevenue
  const projContribution = annualRevenue - annualVariable - annualScaledMkt - emailToolCost * linearFactor
  const projProfitBeforeTax = projContribution - fixed * linearFactor
  const projTax = projProfitBeforeTax > 0 ? projProfitBeforeTax * taxRate : 0
  const projNetProfit = projProfitBeforeTax - projTax
  const lossMonths = projection.filter((p) => p.profitBeforeTax < 0).map((p) => MONTHS_LONG[p.monthIndex])

  const uplift = Math.max(0, n(inp.croUpliftPct)) / 100
  const croExtraProfitYear =
    cm1PerEuro !== null && netRevenue > 0 ? netRevenue * uplift * cm1PerEuro * seasonFactor * growth : null

  const hasData = netRevenue !== 0 || orders > 0
  const comp = completeness(inp, hasData)
  const trusted = comp.status === "complete" && netProfit >= 0

  const r: Results = {
    hasData, completeness: comp, trusted, vatRate, vatFactor,
    gross, discounts, returns, netProductSales, shippingRevenue, netRevenue, totalCharged, vatCollected,
    cogs, shippingPaid, packaging, fees, returnCosts, variableCosts, shippingSubsidy, cm1, cm1PerEuro,
    mkShare, marketplaceFees, platformFees, appFees, appBreakdown, salesFeesTotal, cm1PerEuroStore, cm1PerEuroMarketplace,
    channels, adSpend, adAttributed, emailToolCost, emailAttributed, emailRoas, otherMarketing, marketing,
    restRevenue, overAttribution, contribution, contributionPct,
    fixed, ownerSalary, ownerSalaryEmpty: ownerSalary === 0, ebit, tax, netProfit, netMarginPct,
    ownerTake, ownerHoursPeriod, ownerPerHour,
    orders, sessions, aov, conversionRate, rpv, newCustomers, returningCustomers, returningShare,
    roasBreakeven, merProfit, merProfitImpossible, mer, recurrentOrders, cac, cm1PerOrder,
    // Sin gastos fijos no hay punto de equilibrio que dar.
    breakevenRevenue: comp.fixedKnown ? breakevenRevenue : null,
    discountPct, returnPct,
    ltvFrequency, ltvFrequencyIsEstimate, ltvRevenue, ltvMargin, ltvCac,
    firstOrderCustom, firstOrderTicket, firstOrderMargin, firstOrderProfit, ordersToRecoverCac,
    seasonFactor, weights, periodMonths, projection,
    projRevenue, projContribution, projProfitBeforeTax, projTax, projNetProfit, lossMonths,
    croExtraProfitYear,
    insights: [],
  }
  return r
}

// ---------------------------------------------------------------------------
// Semáforos (umbrales ORIENTATIVOS; en la página se indica así)
// ---------------------------------------------------------------------------

// Regla general: ninguna métrica de rentabilidad sale en verde si el resultado
// global no lo respalda (pérdidas, datos clave sin rellenar o modo rápido).
// En esos casos el "Bien" pasa a neutro y la interfaz añade una nota.
export function capGood(level: Level, r: Pick<Results, "trusted">): Level {
  return level === "good" && !r.trusted ? "neutral" : level
}

export const levelOf = {
  profit: (v: number): Level => (v > 0 ? "good" : v < 0 ? "bad" : "warn"),
  /** Resultado global: sin datos completos no hay verde. */
  result: (v: number, r: Pick<Results, "completeness">): Level =>
    v < 0 ? "bad" : r.completeness.status === "complete" ? (v > 0 ? "good" : "warn") : "neutral",
  cm1PerEuro: (v: number | null): Level => (v === null ? "neutral" : v <= 0 ? "bad" : v < 0.3 ? "warn" : "good"),
  contributionPct: (v: number | null): Level => (v === null ? "neutral" : v <= 0 ? "bad" : v < 0.1 ? "warn" : "good"),
  /**
   * Margen de contribución: solo "Bien" si cubre los gastos fijos. Si no los
   * cubre, "Problema". Sin dato de fijos no se puede juzgar (neutro).
   * El umbral del 10 % es el que ya usaba la calculadora.
   */
  contribution: (r: Pick<Results, "contribution" | "contributionPct" | "fixed" | "completeness">): Level => {
    if (r.contributionPct === null) return "neutral"
    if (r.contribution <= 0) return "bad"
    if (!r.completeness.fixedKnown) return "neutral"
    if (r.contribution < r.fixed) return "bad"
    return r.contributionPct < 0.1 ? "warn" : "good"
  },
  /** MER frente al mínimo para beneficio 0 (contando fijos). Mismo margen del 20 % que ya se usaba frente al breakeven. */
  mer: (r: Pick<Results, "mer" | "merProfit" | "merProfitImpossible">): Level =>
    r.mer === null ? "neutral" : r.merProfitImpossible || r.merProfit === null || r.mer < r.merProfit ? "bad" : r.mer < r.merProfit * 1.2 ? "warn" : "good",
  conversion: (v: number | null): Level => (v === null ? "neutral" : v < 0.005 ? "bad" : v < 0.01 ? "warn" : v >= 0.02 ? "good" : "neutral"),
  ltvCac: (v: number | null): Level => (v === null ? "neutral" : v < 1 ? "bad" : v < 3 ? "warn" : "good"),
  /** ≥ 0 bien; < 0 atención si se recupera dentro del año (según LTV), problema si no */
  firstOrder: (profit: number | null, toRecover: number | null, freq: number | null): Level =>
    profit === null ? "neutral" : profit >= 0 ? "good" : toRecover !== null && freq !== null && toRecover <= freq ? "warn" : "bad",
  cacVsOrder: (cac: number | null, cm1PerOrder: number | null): Level =>
    cac === null || cm1PerOrder === null ? "neutral" : cac > cm1PerOrder ? "warn" : "good",
  discount: (v: number | null): Level => (v === null ? "neutral" : v > 0.2 ? "bad" : v > 0.12 ? "warn" : "good"),
  returns: (v: number | null): Level => (v === null ? "neutral" : v > 0.15 ? "bad" : v > 0.08 ? "warn" : "good"),
}

// ---------------------------------------------------------------------------
// Formato
// ---------------------------------------------------------------------------

// Monedas de España y Latinoamérica. Cada una se formatea con la convención de
// su país (símbolo, separadores y decimales).
// vat: tipo general de IVA del país (el que se propone por defecto; en USD, Ecuador).
// perEur: tipo de cambio aproximado (oct. 2026), solo para adaptar la tienda de ejemplo.
// tax: organismo al que se paga el IVA.
export const CURRENCIES = [
  { code: "EUR", vat: 21, perEur: 1, tax: "Hacienda", locale: "es-ES", one: "euro", many: "euros", label: "Euro (EUR) · España" },
  { code: "USD", vat: 15, perEur: 1.15, tax: "el SRI", locale: "es-EC", one: "dólar", many: "dólares", label: "Dólar (USD) · Ecuador, El Salvador, Panamá…" },
  { code: "MXN", vat: 16, perEur: 21.5, tax: "el SAT", locale: "es-MX", one: "peso", many: "pesos", label: "Peso mexicano (MXN)" },
  { code: "ARS", vat: 21, perEur: 1500, tax: "ARCA", locale: "es-AR", one: "peso", many: "pesos", label: "Peso argentino (ARS)" },
  { code: "COP", vat: 19, perEur: 4600, tax: "la DIAN", locale: "es-CO", one: "peso", many: "pesos", label: "Peso colombiano (COP)" },
  { code: "CLP", vat: 19, perEur: 1100, tax: "el SII", locale: "es-CL", one: "peso", many: "pesos", label: "Peso chileno (CLP)" },
  { code: "PEN", vat: 18, perEur: 4, tax: "la SUNAT", locale: "es-PE", one: "sol", many: "soles", label: "Sol peruano (PEN)" },
  { code: "UYU", vat: 22, perEur: 46, tax: "la DGI", locale: "es-UY", one: "peso", many: "pesos", label: "Peso uruguayo (UYU)" },
  { code: "PYG", vat: 10, perEur: 8500, tax: "la DNIT", locale: "es-PY", one: "guaraní", many: "guaraníes", label: "Guaraní paraguayo (PYG)" },
  { code: "BOB", vat: 13, perEur: 8, tax: "Impuestos Nacionales", locale: "es-BO", one: "boliviano", many: "bolivianos", label: "Boliviano (BOB)" },
  { code: "VES", vat: 16, perEur: 400, tax: "el SENIAT", locale: "es-VE", one: "bolívar", many: "bolívares", label: "Bolívar venezolano (VES)" },
  { code: "GTQ", vat: 12, perEur: 8.9, tax: "la SAT", locale: "es-GT", one: "quetzal", many: "quetzales", label: "Quetzal guatemalteco (GTQ)" },
  { code: "HNL", vat: 15, perEur: 30, tax: "el SAR", locale: "es-HN", one: "lempira", many: "lempiras", label: "Lempira hondureño (HNL)" },
  { code: "NIO", vat: 15, perEur: 42, tax: "la DGI", locale: "es-NI", one: "córdoba", many: "córdobas", label: "Córdoba nicaragüense (NIO)" },
  { code: "CRC", vat: 13, perEur: 580, tax: "Hacienda", locale: "es-CR", one: "colón", many: "colones", label: "Colón costarricense (CRC)" },
  { code: "DOP", vat: 18, perEur: 72, tax: "la DGII", locale: "es-DO", one: "peso", many: "pesos", label: "Peso dominicano (DOP)" },
  { code: "CUP", vat: 10, perEur: 140, tax: "la ONAT", locale: "es-CU", one: "peso", many: "pesos", label: "Peso cubano (CUP)" },
  { code: "BRL", vat: 18, perEur: 6.3, tax: "la Receita Federal", locale: "pt-BR", one: "real", many: "reales", label: "Real brasileño (BRL)" },
] as const

export type CurrencyCode = (typeof CURRENCIES)[number]["code"]

export const isCurrency = (v: unknown): v is CurrencyCode => CURRENCIES.some((c) => c.code === v)

export const currencyInfo = (code: CurrencyCode) => CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0]

const NF = (locale: string, o: Intl.NumberFormatOptions) =>
  new Intl.NumberFormat(locale, { useGrouping: "always", ...o } as Intl.NumberFormatOptions)

function buildFormatters(code: CurrencyCode) {
  const locale = CURRENCIES.find((c) => c.code === code)?.locale ?? "es-ES"
  const base = NF(locale, { style: "currency", currency: code })
  const num2 = NF(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return {
    code,
    one: CURRENCIES.find((c) => c.code === code)?.one ?? "euro",
    many: CURRENCIES.find((c) => c.code === code)?.many ?? "euros",
    tax: CURRENCIES.find((c) => c.code === code)?.tax ?? "Hacienda",
    symbol: base.formatToParts(1).find((p) => p.type === "currency")?.value ?? code,
    decimal: num2.formatToParts(1.5).find((p) => p.type === "decimal")?.value ?? ",",
    eur0: NF(locale, { style: "currency", currency: code, minimumFractionDigits: 0, maximumFractionDigits: 0 }),
    // Importes por unidad (ticket medio, por cada 100…): siempre 2 decimales, también en CLP, COP o PYG
    eur2: NF(locale, { style: "currency", currency: code, minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    num0: NF(locale, { maximumFractionDigits: 0 }),
    num2,
    num4: NF(locale, { minimumFractionDigits: 4, maximumFractionDigits: 4 }),
    pct1: NF(locale, { style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1 }),
  }
}

let F = buildFormatters("EUR")

/** Cambia la moneda (y el formato de números) de todo lo que muestra la calculadora. */
export function setCurrency(code: CurrencyCode) {
  const next = isCurrency(code) ? code : "EUR"
  if (F.code !== next) F = buildFormatters(next)
}

// Evita "-0,00 €" / "-0,0 %": si el valor redondeado a la precisión mostrada es 0, se muestra 0
const z0 = (v: number, decimals: number) => (Math.round(v * 10 ** decimals) === 0 ? 0 : v)

/**
 * Importe con el signo siempre delante de todo ("-$177.759", "-Gs. 177.759",
 * "-177.759 €") y un espacio entre un símbolo con letras ("Gs.", "Bs.S", "S/", "Q")
 * y la cifra. No se fía del formato regional del signo, que varía por país.
 */
function formatMoney(nf: Intl.NumberFormat, v: number, decimals: number) {
  const x = z0(v, decimals)
  const parts = nf.formatToParts(Math.abs(x))
  let out = ""
  parts.forEach((p, i) => {
    out += p.value
    const next = parts[i + 1]
    if (p.type === "currency" && /[A-Za-z/.]$/.test(p.value) && next && next.type !== "literal") out += " "
  })
  return (x < 0 ? "-" : "") + out
}

/** "Meta Ads", "Meta Ads y Google Ads", "Meta Ads, Google Ads y email" */
export function joinEs(items: string[]) {
  if (items.length <= 1) return items.join("")
  return `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}`
}

export const fmt = {
  eur: (v: number | null) => (v === null ? "—" : formatMoney(F.eur0, v, 0)),
  eur2: (v: number | null) => (v === null ? "—" : formatMoney(F.eur2, v, 2)),
  num: (v: number | null) => (v === null ? "—" : F.num0.format(z0(v, 0))),
  x: (v: number | null) => (v === null ? "—" : `${F.num2.format(z0(v, 2))}x`),
  dec: (v: number | null) => (v === null ? "—" : F.num2.format(z0(v, 2))),
  dec4: (v: number | null) => (v === null ? "—" : F.num4.format(v)),
  pct: (v: number | null) => (v === null ? "—" : F.pct1.format(z0(v, 3))),
  /** Símbolo de la moneda elegida ("€", "$", "S/"…) */
  sym: () => F.symbol,
  /** Separador decimal de la moneda elegida ("," o ".") */
  decimal: () => F.decimal,
  /** Nombre de la moneda: "euro" / "euros", "peso" / "pesos"… */
  one: () => F.one,
  many: () => F.many,
  tax: () => F.tax,
}

/**
 * Adapta a la moneda elegida los textos fijos (conceptos): {euro} y {euros} →
 * nombre de la moneda, {€} → símbolo, {100} → importe formateado, {hacienda} →
 * organismo fiscal del país ("Hacienda", "el SAT", "la DIAN"…).
 */
export function money(text: string): string
export function money(text: string | undefined): string | undefined
export function money(text: string | undefined) {
  return text
    ?.replace(/\{euros\}/g, F.many)
    .replace(/\{hacienda\}/g, F.tax)
    .replace(/\{euro\}/g, F.one)
    .replace(/\{€\}/g, F.symbol)
    .replace(/\{(\d+)\}/g, (_, n: string) => fmt.eur(Number(n)))
}

// ---------------------------------------------------------------------------
// Conclusiones: lo primero, de dónde viene la pérdida (o que la tienda es
// rentable); después, avisos sobre la calidad de los datos; el resto, ordenado
// por su impacto estimado en € sobre el beneficio del periodo.
// ---------------------------------------------------------------------------

/** Frase de cada palanca al mejorarla un 10 % (conclusiones). */
export const LEVER_PHRASE: Record<LeverKey, string> = {
  traffic: "Subir un 10 % las visitas",
  conversion: "Subir un 10 % la conversión",
  aov: "Subir un 10 % el ticket medio",
  repeat: "Subir un 10 % la recompra",
  discounts: "Bajar un 10 % los descuentos",
  returns: "Bajar un 10 % las devoluciones",
  cogs: "Bajar un 10 % el coste de producto",
  shipping: "Bajar un 10 % el coste de envío",
  ads: "Subir un 10 % la inversión en publicidad",
  fixed: "Bajar un 10 % los gastos fijos",
}

function buildInsights(r: Results, inp: Inputs): Insight[] {
  if (!r.hasData || r.netRevenue <= 0) return []
  const out: Insight[] = []
  const per = inp.months === 1 ? "al mes" : `en ${inp.months} meses`
  const comp = r.completeness
  const sure = comp.status === "complete"
  const atLeast = sure ? "" : "al menos "
  const cm1PerEuro = Math.max(0, r.cm1PerEuro ?? 0)

  // 1. Si pierde dinero: de dónde viene la pérdida.
  if (r.netProfit < 0) {
    const loss = -r.netProfit
    if (r.cm1 <= 0) {
      out.push({
        level: "bad",
        kind: "summary",
        impact: loss,
        title: "Pierdes dinero en cada venta, antes incluso de hacer marketing",
        text: `Producto, envíos, packaging, pasarela${r.salesFeesTotal > 0 ? ", comisiones" : ""} y devoluciones (${fmt.eur(r.variableCosts)}) se comen más de lo que ingresas (${fmt.eur(r.netRevenue)}). Más ventas o más publicidad no lo arreglan: agrandan la pérdida. Revisa precios, coste de producto y política de envíos antes de invertir un ${fmt.one()} más.`,
      })
    } else if (r.contribution <= 0) {
      out.push({
        level: "bad",
        kind: "summary",
        impact: loss,
        title: `Pierdes ${atLeast}${fmt.eur(loss)} ${per}: el marketing se come todo el margen`,
        text: `Después de producto, envíos, pasarela${r.salesFeesTotal > 0 ? " y comisiones" : ""} tus ventas dejan ${fmt.eur(r.cm1)}, y gastas ${fmt.eur(r.marketing)} en marketing: ya antes de los gastos fijos (${fmt.eur(r.fixed)}) estás en negativo. Tu MER es ${fmt.x(r.mer)} y solo para cubrir los costes variables necesitas ${fmt.x(r.roasBreakeven)}. Esta métrica no depende de lo que diga cada plataforma: es ventas totales entre gasto total.`,
      })
    } else {
      const parts: string[] = [
        `Después de producto, envíos, pasarela${r.salesFeesTotal > 0 ? ", comisiones" : ""} y marketing te quedan ${fmt.eur(r.contribution)}, y tus gastos fijos son ${fmt.eur(r.fixed)}${
          r.ownerSalary > 0 ? ` (incluido tu sueldo, ${fmt.eur(r.ownerSalary)})` : ""
        }.`,
      ]
      if (r.breakevenRevenue !== null) {
        parts.push(
          `Con tu margen actual (${fmt.eur2(r.cm1PerEuro)} por cada ${fmt.one()} vendido) necesitarías ${fmt.eur(r.breakevenRevenue)} de ingresos netos ${per}, ${fmt.eur(r.breakevenRevenue - r.netRevenue)} más que ahora, suponiendo que mantienes el mismo gasto en marketing. O vendes más, o subes el margen, o recortas gasto.`,
        )
      }
      if (r.merProfitImpossible) {
        parts.push("Con estos gastos fijos, a este volumen de ventas ningún nivel de marketing da beneficio: aunque no gastaras nada en marketing, seguirías perdiendo.")
      } else if (r.mer !== null && r.merProfit !== null) {
        parts.push(`A este volumen de ventas, tu marketing tendría que rendir un MER de al menos ${fmt.x(r.merProfit)} para no perder; ahora es ${fmt.x(r.mer)}.`)
      }
      out.push({
        level: "bad",
        kind: "summary",
        impact: loss,
        title: `Pierdes ${atLeast}${fmt.eur(loss)} ${per}: lo que dejan tus ventas no cubre los gastos fijos`,
        text: parts.join(" "),
      })
    }
  }

  // 2. Calidad de los datos.
  if (comp.status === "incomplete") {
    out.push({
      level: "warn",
      kind: "data",
      impact: 0,
      title: "Estimación incompleta: faltan datos clave",
      text: `Falta: ${joinEs(comp.missing.map(lcFirst))}. Mientras falten, cuentan como 0${
        inp.salesIncludeVat === null ? " (y las ventas, como si fueran sin IVA)" : ""
      }. Cuando los completes, el beneficio bajará: el real es menor que el que ves aquí.`,
    })
  } else if (comp.status === "quick") {
    out.push({
      level: "warn",
      kind: "data",
      impact: 0,
      title: "Estimación rápida: faltan partidas de coste",
      text: `No incluye ${joinEs(comp.notIncluded.slice(0, 4).map(lcFirst))}, entre otras partidas. Casi todo lo que falta son costes, así que lo normal es que el beneficio real sea menor (la excepción son los envíos que cobras a tus clientes, que lo subirían). Usa «Afinar mi cálculo» para completarlo.`,
    })
  }

  const sources = [
    ...r.channels.filter((c) => c.attributed > 0).map((c) => ({ name: c.name, attributed: c.attributed })),
    ...(r.emailAttributed > 0 ? [{ name: "email marketing", attributed: r.emailAttributed }] : []),
  ]
  const overOne = r.channels.filter((c) => c.level === "review")
  if (r.overAttribution > 0) {
    if (sources.length >= 2) {
      out.push({
        level: overOne.length > 0 ? "review" : "warn",
        kind: "data",
        impact: 0,
        title: "Las plataformas se atribuyen más ventas de las que tuviste",
        text: `Suman ${fmt.eur(r.overAttribution)} más que tus ingresos reales. Es habitual: varias plataformas se adjudican la misma venta. Por eso conviene decidir con el MER, no solo con el ROAS de cada una.${
          overOne.length > 0
            ? ` Además, ${joinEs(overOne.map((c) => c.name))} por sí sola se atribuye más de lo que vendiste en total: revisa ese dato (mismo periodo, con o sin IVA igual que tus ventas).`
            : ""
        }`,
      })
    } else if (sources.length === 1) {
      const s = sources[0]
      out.push({
        level: "review",
        kind: "data",
        impact: 0,
        title: `${capitalize(s.name)} se atribuye más ventas de las que tuviste`,
        text: `Dice haber generado ${fmt.eur(s.attributed)} y tus ingresos netos totales son ${fmt.eur(r.netRevenue)}. Una sola fuente no puede vender más que toda la tienda: revisa que la cifra sea del mismo periodo y que esté con o sin IVA igual que tus ventas. Hasta entonces, su ROAS no es fiable: decide con el MER.`,
      })
    }
  }

  // 3. El resto, con su impacto en €.
  const losing = r.channels.filter((c) => c.level === "bad" && c.spend > 0)
  for (const c of losing) {
    out.push({
      level: "bad",
      impact: Math.max(0, c.spend - c.attributed * cm1PerEuro),
      title: `${c.name} no se paga ni con sus propios datos`,
      text: `ROAS de ${fmt.x(c.roas)} cuando necesitas al menos ${fmt.x(r.roasBreakeven)} para cubrir costes. Y las plataformas tienden a atribuirse de más, así que la realidad suele ser peor. Revisa campañas, público y creatividades, o baja el presupuesto.`,
    })
  }

  // En modo rápido no sabemos lo que cobras de envío: no se puede calcular.
  if (!inp.quickMode && r.shippingSubsidy > 0 && r.netRevenue > 0 && !has(inp.shippingCharged)) {
    // Sin el dato de envíos cobrados no afirmamos que los pague de su bolsillo.
    out.push({
      level: "warn",
      kind: "data",
      impact: 0,
      title: `Pagas ${fmt.eur(r.shippingPaid)} en envíos y no has indicado cuánto cobras por ellos`,
      text: "Ahora cuenta como 0, así que el cálculo supone que todos los envíos los pagas tú. Si ofreces envío gratis, pon 0 en «Envíos cobrados a clientes»; si cobras algo, mételo.",
    })
  } else if (!inp.quickMode && r.shippingSubsidy > 0 && r.netRevenue > 0) {
    out.push({
      level: r.shippingSubsidy / r.netRevenue > 0.05 ? "bad" : "warn",
      impact: r.shippingSubsidy,
      title: `Pagas de tu bolsillo ${fmt.eur(r.shippingSubsidy)} en envíos ${per}`,
      text: `Es lo que te cuestan los envíos menos lo que cobras por ellos (${fmt.pct(r.shippingSubsidy / r.netRevenue)} de tus ingresos). Prueba un umbral de envío gratis por encima de tu ticket medio (${fmt.eur(r.aov)}) o ajusta tarifas.`,
    })
  }

  // Comisiones por venta (marketplace, plataforma y apps; la pasarela va aparte).
  const feesShare = r.salesFeesTotal / r.netRevenue
  if (feesShare > 0.15) {
    const channel = inp.salesChannel
    const advice =
      channel === "marketplace"
        ? "Revisa si tu plan del marketplace te compensa, si alguna tarifa depende de la categoría o del volumen y si puedes negociarla. Y valora abrir un canal propio: en tu tienda no pagas comisión por cada venta."
        : channel === "both"
          ? "Revisa tu plan en cada canal, negocia lo que se pueda y empuja las ventas hacia el canal que te deja más margen (normalmente, tu tienda propia)."
          : "Revisa si un plan superior de tu plataforma cobra menos por transacción y qué apps se quedan un % de tus ventas: compara con alternativas de cuota fija."
    out.push({
      level: "warn",
      impact: r.salesFeesTotal - 0.15 * r.netRevenue,
      title: `Las comisiones se llevan el ${fmt.pct(feesShare)} de cada venta`,
      text: `Pagas ${fmt.eur(r.salesFeesTotal)} ${per} en comisiones por venta, sin contar la pasarela de pago. ${advice}`,
    })
  }

  if (r.cm1PerEuroStore !== null && r.cm1PerEuroMarketplace !== null && Math.abs(r.cm1PerEuroStore - r.cm1PerEuroMarketplace) >= 0.02) {
    const storeBetter = r.cm1PerEuroStore > r.cm1PerEuroMarketplace
    const gap = Math.abs(r.cm1PerEuroStore - r.cm1PerEuroMarketplace)
    out.push({
      level: "neutral",
      // Lo que ganarías si un 10 % de las ventas del peor canal pasaran al mejor
      impact: r.netRevenue * (storeBetter ? r.mkShare : 1 - r.mkShare) * 0.1 * gap,
      title: `De cada ${fmt.eur(100)} que vendes en el marketplace te quedan ${fmt.eur2(r.cm1PerEuroMarketplace * 100)}; en tu tienda, ${fmt.eur2(r.cm1PerEuroStore * 100)}`,
      text: `Antes de marketing y gastos fijos. ${
        storeBetter
          ? "Tu tienda te deja más por cada venta: cada cliente que compra en ella en lugar de en el marketplace suma margen. Usa el marketplace para que te descubran y trae la recompra a tu tienda (email, inserto en el paquete, ventajas por comprar directo)."
          : "El marketplace te deja más por cada venta que tu tienda: revisa la pasarela, la comisión de tu plataforma y las apps que cobran un %."
      } Supone el mismo coste de producto, envíos y packaging en los dos canales.`,
    })
  }

  // Descuentos y devoluciones: el impacto es lo que pasa del umbral orientativo
  // que ya usa el semáforo (12 % y 8 % de las ventas brutas).
  const discLevel = levelOf.discount(r.discountPct)
  if (discLevel === "warn" || discLevel === "bad") {
    out.push({
      level: discLevel,
      impact: Math.max(0, r.discounts - 0.12 * r.gross),
      title: `Los descuentos se llevan el ${fmt.pct(r.discountPct)} de tus ventas brutas`,
      text: `Cada ${fmt.one()} de descuento sale directo de tu margen. Revisa si los códigos están generando ventas nuevas o solo regalando margen a quien iba a comprar igual.`,
    })
  }

  const retLevel = levelOf.returns(r.returnPct)
  if (retLevel === "warn" || retLevel === "bad") {
    const excess = Math.max(0, r.returns - 0.08 * r.gross)
    out.push({
      level: retLevel,
      impact: excess * cm1PerEuro + (r.returns > 0 ? r.returnCosts * (excess / r.returns) : 0),
      title: `Devoluciones del ${fmt.pct(r.returnPct)}`,
      text: `${
        r.returnCosts > 0 ? `Además del importe devuelto, te cuestan ${fmt.eur(r.returnCosts)} en envíos de vuelta y producto que no puedes revender. ` : ""
      }Suele indicar que el cliente no recibe lo que esperaba: tallas, medidas, fotos, materiales. Mira qué productos concentran las devoluciones y por qué.`,
    })
  }

  if (r.ltvCac !== null) {
    const l = levelOf.ltvCac(r.ltvCac)
    if (l !== "good") {
      out.push({
        level: l,
        impact: r.cac !== null && r.ltvMargin !== null ? r.newCustomers * Math.max(0, r.cac - r.ltvMargin) : 0,
        title: l === "bad" ? "Un cliente nuevo te cuesta más de lo que te deja en un año" : "Captar clientes te sale justo",
        text: `Cada cliente deja ${fmt.eur(r.ltvMargin)} de margen en 12 meses y captarlo cuesta ${fmt.eur(r.cac)} (LTV:CAC ${fmt.dec(r.ltvCac)}). Sube la recompra o baja el coste de captación.`,
      })
    } else if (r.trusted) {
      out.push({
        level: "good",
        impact: 0,
        title: "Tus clientes son rentables a 12 meses",
        text: `LTV:CAC de ${fmt.dec(r.ltvCac)}: cada ${fmt.one()} que inviertes en captar un cliente vuelve multiplicado en el año.`,
      })
    }
  }

  if (r.firstOrderProfit !== null && r.firstOrderProfit < 0) {
    const l = levelOf.firstOrder(r.firstOrderProfit, r.ordersToRecoverCac, r.ltvFrequency)
    const recover =
      r.ordersToRecoverCac === null
        ? "Con tu margen actual no lo recuperas nunca."
        : `Lo recuperas en su ${ordinal(Math.ceil(r.ordersToRecoverCac - 1e-9))} pedido${
            r.ltvFrequency !== null
              ? r.ordersToRecoverCac <= r.ltvFrequency
                ? `, y de media te hace ${fmt.dec(r.ltvFrequency)} al año: lo recuperas dentro del año.`
                : `, pero de media solo te hace ${fmt.dec(r.ltvFrequency)} al año: no lo recuperas en un año.`
              : "."
          }`
    out.push({
      level: l,
      // Si se recupera dentro del año no es una pérdida: no compite por arriba.
      impact: l === "bad" ? r.newCustomers * -r.firstOrderProfit : 0,
      title: `Pierdes ${fmt.eur2(-r.firstOrderProfit)} en la primera compra de cada cliente nuevo`,
      text: `Captarlo te cuesta ${fmt.eur2(r.cac)} y su primer pedido te deja ${fmt.eur2(r.firstOrderMargin)} antes de marketing. ${recover} Sube el ticket del primer pedido (packs, envío gratis desde un importe), revisa el descuento de bienvenida o trabaja la segunda compra.`,
    })
  }

  const ranking = leverRanking(inp, r, 10)
  const leverDelta = (k: LeverKey) => ranking.find((x) => x.key === k)?.delta ?? 0

  const cr = levelOf.conversion(r.conversionRate)
  if (cr === "bad" || cr === "warn") {
    out.push({
      level: cr,
      impact: Math.max(0, leverDelta("conversion")),
      title: `Solo compra el ${fmt.pct(r.conversionRate)} de las visitas`,
      text: "Tu tráfico llega pero no convierte. Antes de pagar más publicidad, conviene entender qué frena la compra dentro de la tienda: cada mejora de conversión abarata todo tu marketing.",
    })
  }

  if (r.lossMonths.length > 0 && r.lossMonths.length < 12) {
    const lossYear = r.projection.filter((p) => p.profitBeforeTax < 0).reduce((acc, p) => acc - p.profitBeforeTax, 0)
    out.push({
      level: "warn",
      impact: (lossYear * inp.months) / 12,
      title: `Con tu estacionalidad, perderías dinero en ${r.lossMonths.length === 1 ? "1 mes" : `${r.lossMonths.length} meses`} del próximo año`,
      text: `${
        r.lossMonths.length > 6
          ? `Solo ganarías dinero en ${joinEs(r.projection.filter((p) => p.profitBeforeTax >= 0).map((p) => MONTHS_LONG[p.monthIndex]))}`
          : capitalize(joinEs(r.lossMonths))
      }. Los fijos no bajan cuando bajan las ventas: prepara caja o concentra la inversión en los meses fuertes.`,
    })
  }

  if (r.emailToolCost > 0 && r.emailRoas !== null && r.emailRoas >= 10) {
    out.push({
      level: capGood("good", r),
      impact: 0,
      title: "Tu herramienta de email se paga sola",
      text: `Las ventas atribuidas al email multiplican por ${fmt.dec(r.emailRoas)} lo que cuesta la herramienta. No es comparable con el ROAS de la publicidad: solo cuenta el coste de la herramienta (no el tiempo de preparar los emails) y son sobre todo ventas a clientes que ya tienes.`,
    })
  }

  // Las 1–2 palancas de más impacto del simulador, sea cual sea. Con datos clave
  // sin rellenar las cifras saldrían infladas, así que no se dan.
  if (comp.status !== "incomplete") ranking
    .filter((x) => x.delta >= 1)
    .slice(0, 2)
    .forEach((x, i) => {
      out.push({
        level: "neutral",
        impact: x.delta,
        title: `${LEVER_PHRASE[x.key]} sumaría ${fmt.eur(x.delta)} ${per}`,
        text: `Es la ${i === 0 ? "palanca con más impacto" : "segunda palanca con más impacto"} en tu caso según el simulador${
          sure ? "" : ", con los datos que has metido"
        }${x.key === "ads" ? " (suponiendo que cada ${fmt.one()} extra de publicidad rinde algo menos que el anterior)" : ""}. Más abajo puedes moverla y combinarla con otras.`,
      })
    })

  if (r.trusted && r.netProfit > 0 && out.every((i) => i.level !== "bad")) {
    out.push({
      level: "good",
      kind: "summary",
      impact: r.netProfit,
      title: `Tu tienda es rentable: te quedan ${fmt.eur(r.netProfit)} ${per}`,
      text: `Un ${fmt.pct(r.netMarginPct)} de lo que ingresas.${
        r.ownerSalaryEmpty ? " Ojo: no has metido un sueldo para ti, así que este beneficio también es tu sueldo." : ""
      }`,
    })
  }

  const rank = (i: Insight) => (i.kind === "summary" ? 0 : i.kind === "data" ? 1 : 2)
  const severity: Record<Level, number> = { bad: 0, review: 1, warn: 2, neutral: 3, good: 4 }
  return out.sort((a, b) => rank(a) - rank(b) || b.impact - a.impact || severity[a.level] - severity[b.level])
}

/** 1 → "1.er", 2 → "2.º"… */
export function ordinal(k: number) {
  return k === 1 ? "1.er" : `${k}.º`
}

function lcFirst(s: string) {
  return s.charAt(0).toLowerCase() + s.slice(1)
}
function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

// ---------------------------------------------------------------------------
// Simulador de palancas
// ---------------------------------------------------------------------------
// Cada palanca es un cambio relativo en % sobre la situación actual. Supuestos
// (se explican en la página):
// - Visitas y conversión cambian el nº de pedidos; el ticket medio, el importe
//   de cada pedido. Descuentos y devoluciones mantienen su % salvo que muevas
//   su palanca.
// - Envíos, packaging y comisiones escalan con los pedidos / ventas.
// - Publicidad: rendimientos decrecientes. Las ventas de ads cambian según
//   (inversión nueva ÷ actual) ^ AD_ELASTICITY: al subir la inversión cada euro
//   extra rinde algo menos (el ROAS baja) y al recortar se quita primero lo que
//   menos rinde (el ROAS sube). Es un supuesto orientativo, no un dato medido.

export const AD_ELASTICITY = 0.7

/** Factor de ventas de publicidad para un cambio de inversión de `pct` %. */
export function adReturnFactor(pct: number): number {
  const ratio = Math.max(0, 1 + pct / 100)
  return ratio === 0 ? 0 : Math.pow(ratio, AD_ELASTICITY)
}

export const LEVER_KEYS = ["traffic", "conversion", "aov", "repeat", "discounts", "returns", "cogs", "shipping", "ads", "fixed"] as const
export type LeverKey = (typeof LEVER_KEYS)[number]
export type Levers = Record<LeverKey, number>

export const ZERO_LEVERS: Levers = { traffic: 0, conversion: 0, aov: 0, repeat: 0, discounts: 0, returns: 0, cogs: 0, shipping: 0, ads: 0, fixed: 0 }

/** Dirección en la que la palanca mejora el negocio (para el ranking). */
export const LEVER_GOOD_DIRECTION: Record<LeverKey, 1 | -1> = {
  traffic: 1, conversion: 1, aov: 1, repeat: 1, discounts: -1, returns: -1, cogs: -1, shipping: -1, ads: 1, fixed: -1,
}

export function simulate(inp: Inputs, base: Results, lv: Levers): Results {
  const f = (v: number) => 1 + v / 100
  const adShare = base.netRevenue > 0 ? Math.min(1, base.adAttributed / base.netRevenue) : 0
  const adFactor = adReturnFactor(lv.ads) // ventas de ads, con rendimientos decrecientes
  const adDemand = 1 + (adFactor - 1) * adShare
  // Recompra: los clientes recurrentes hacen un X % más de pedidos. Pedidos de
  // recurrentes = pedidos − clientes nuevos (cada cliente nuevo hace su primer pedido).
  const repeatShare = base.recurrentOrders !== null && base.orders > 0 ? base.recurrentOrders / base.orders : 0
  const repeat = 1 + repeatShare * (lv.repeat / 100)
  const customers = f(lv.traffic) * adDemand * f(lv.conversion) // factor sobre nº de clientes
  const visits = f(lv.traffic) * adDemand * repeat
  const volume = customers * repeat // factor sobre nº de pedidos
  const ticket = f(lv.aov)

  const gross0 = Math.abs(n(inp.grossSales))
  const disc0 = Math.abs(n(inp.discounts))
  const ret0 = Math.abs(n(inp.returns))
  const ship0 = Math.abs(n(inp.shippingCharged))
  const gross = gross0 * volume * ticket
  const discounts = (gross0 > 0 ? gross * (disc0 / gross0) : disc0 * volume * ticket) * f(lv.discounts)
  const returns = (gross0 > 0 ? gross * (ret0 / gross0) : ret0 * volume * ticket) * f(lv.returns)
  const shippingCharged = ship0 * volume

  const ns0 = gross0 - disc0 - ret0
  const ns1 = gross - discounts - returns
  const nsRatio = ns0 > 0 ? ns1 / ns0 : 1
  const rev0 = ns0 + ship0
  const rev1 = ns1 + shippingCharged
  const revRatio = rev0 > 0 ? rev1 / rev0 : 1
  const salesFactor = f(lv.traffic) * f(lv.conversion) * repeat * ticket // ventas no ligadas a ads

  const next: Inputs = {
    ...inp,
    grossSales: gross,
    discounts,
    returns,
    shippingCharged,
    orders: n(inp.orders) * volume,
    sessions: n(inp.sessions) * visits,
    newCustomers: n(inp.newCustomers) * customers,
    returningCustomers: n(inp.returningCustomers) * customers,
    ltvFrequency: has(inp.ltvFrequency) ? n(inp.ltvFrequency) * repeat : inp.ltvFrequency,
    firstOrderAov: has(inp.firstOrderAov) ? Math.abs(n(inp.firstOrderAov)) * ticket : inp.firstOrderAov,
    cogs: inp.cogsMode === "pct" ? n(inp.cogs) * f(lv.cogs) : n(inp.cogs) * nsRatio * f(lv.cogs),
    shippingPaid: n(inp.shippingPaid) * volume * f(lv.shipping),
    packaging: n(inp.packaging) * volume,
    returnCosts: ret0 > 0 ? n(inp.returnCosts) * (returns / ret0) : n(inp.returnCosts) * volume,
    fees: inp.feesMode === "pct" ? inp.fees : n(inp.fees) * revRatio,
    // Comisiones en % y fijo por pedido escalan solas; las otras tarifas del marketplace, con las ventas.
    mkOtherFees: has(inp.mkOtherFees) ? n(inp.mkOtherFees) * revRatio : inp.mkOtherFees,
    ads: inp.ads.map((a) => ({
      ...a,
      spend: has(a.spend) ? n(a.spend) * f(lv.ads) : a.spend,
      attributed: has(a.attributed) ? n(a.attributed) * adFactor * salesFactor : a.attributed,
    })),
    emailAttributed: has(inp.emailAttributed) ? n(inp.emailAttributed) * salesFactor : inp.emailAttributed,
    platformCost: has(inp.platformCost) ? n(inp.platformCost) * f(lv.fixed) : inp.platformCost,
    otherFixed: has(inp.otherFixed) ? n(inp.otherFixed) * f(lv.fixed) : inp.otherFixed,
    // El sueldo del dueño no entra en la palanca de fijos: bajarte el sueldo no mejora el negocio.
  }
  return computeCore(next)
}

// ---------------------------------------------------------------------------
// Escenario de publicidad (tiendas que hoy no invierten en ads)
// ---------------------------------------------------------------------------
// El usuario pone cuánto invertiría al mes y qué ROAS espera (sobre ventas sin
// IVA). No hay valores por defecto: ningún ROAS "típico" inventado.
// Supuestos (se explican en la página):
// - El ROAS se mantiene igual a ese nivel de inversión.
// - Las ventas extra tienen el mismo ticket, descuentos, devoluciones, envíos y
//   costes por pedido que las actuales (todo escala en la misma proporción).
// - Los pedidos extra son de clientes nuevos.
// - Los gastos fijos no cambian.
export function adsScenario(inp: Inputs, base: Results, monthlySpend: number, roas: number): Results | null {
  if (base.netRevenue <= 0 || !(monthlySpend > 0) || !(roas >= 0)) return null
  const spend = monthlySpend * inp.months
  const extraRevenue = spend * roas // ingresos netos extra, sin IVA
  const k = 1 + extraRevenue / base.netRevenue
  const scale = (v: number | null) => (has(v) ? n(v) * k : v)
  const extraOrders = n(inp.orders) * (k - 1)
  const next: Inputs = {
    ...inp,
    grossSales: scale(inp.grossSales),
    discounts: scale(inp.discounts),
    returns: scale(inp.returns),
    shippingCharged: scale(inp.shippingCharged),
    orders: scale(inp.orders),
    sessions: scale(inp.sessions),
    newCustomers: has(inp.newCustomers) ? n(inp.newCustomers) + extraOrders : inp.newCustomers,
    cogs: inp.cogsMode === "pct" ? inp.cogs : scale(inp.cogs),
    shippingPaid: scale(inp.shippingPaid),
    packaging: scale(inp.packaging),
    fees: inp.feesMode === "pct" ? inp.fees : scale(inp.fees),
    mkOtherFees: scale(inp.mkOtherFees),
    returnCosts: scale(inp.returnCosts),
    ads: [
      ...inp.ads,
      // Las ventas atribuidas se meten en la misma base que las ventas (con o sin IVA)
      { id: "scenario", name: "Publicidad (escenario)", spend, attributed: extraRevenue / base.vatFactor },
    ],
  }
  return computeCore(next)
}

/** Cuánto cambia el beneficio neto (del periodo) al mejorar cada palanca un `step` %. */
export function leverRanking(inp: Inputs, base: Results, step = 10) {
  return LEVER_KEYS.filter((k) => (k !== "ads" || base.adSpend > 0) && (k !== "repeat" || (base.recurrentOrders ?? 0) > 0))
    .map((k) => {
      const lv = { ...ZERO_LEVERS, [k]: step * LEVER_GOOD_DIRECTION[k] }
      return { key: k, delta: simulate(inp, base, lv).netProfit - base.netProfit }
    })
    .sort((a, b) => b.delta - a.delta)
}

// ---------------------------------------------------------------------------
// Avisos de datos incoherentes (probablemente un error al teclear)
// ---------------------------------------------------------------------------
export function dataWarnings(inp: Inputs, r: Results): string[] {
  const w: string[] = []
  const gross = Math.abs(n(inp.grossSales))
  if (has(inp.ownerHours) && a(inp.ownerHours) > 744) w.push("Las horas que le dedicas son al mes: un mes tiene como mucho 744 horas.")
  if (gross > 0 && Math.abs(n(inp.discounts)) + Math.abs(n(inp.returns)) > gross)
    w.push("Descuentos y devoluciones suman más que tus ventas brutas. Revisa que sean del mismo periodo.")
  if (r.sessions > 0 && r.orders > r.sessions) w.push("Tienes más pedidos que sesiones: ¿puede que falte una cifra en las sesiones?")
  if (r.orders > 0 && r.newCustomers + r.returningCustomers > r.orders)
    w.push("Hay más clientes que pedidos: cada cliente hace al menos un pedido. Revisa clientes nuevos y recurrentes.")
  if (Math.abs(n(inp.welcomeDiscountPct)) > 100) w.push("El descuento de bienvenida no puede superar el 100 %.")
  if (inp.cogsMode === "pct" && Math.abs(n(inp.cogs)) > 100) w.push(`El coste de producto supera el 100 % del precio de venta: ¿querías ponerlo en ${fmt.many()}?`)
  if (inp.salesChannel === "both" && has(inp.mkSharePct) && (n(inp.mkSharePct) < 0 || n(inp.mkSharePct) > 100))
    w.push("La parte de tus ventas que viene del marketplace tiene que estar entre 0 y 100 %.")
  const highFees: string[] = []
  if (inp.salesChannel !== "store" && a(inp.mkFeePct) > 50) highFees.push("del marketplace")
  if (inp.salesChannel !== "marketplace" && a(inp.platformFeePct) > 50) highFees.push("de la plataforma")
  if (inp.salesChannel !== "marketplace")
    for (const x of inp.apps ?? []) if (a(x.pct) > 50) highFees.push(`de ${x.name || "una app"}`)
  if (highFees.length > 0)
    w.push(`Una comisión ${joinEs(highFees)} de más del 50 % es muy alta: revisa que sea un porcentaje y no un importe.`)
  // Pasarela en %: entre 10 y 100 suele ser una coma de menos (14 → 1,4); por encima de 100
  // no es un porcentaje posible: probablemente es el total en importe.
  const gw = Math.abs(n(inp.fees))
  if (inp.salesChannel !== "marketplace" && inp.feesMode === "pct" && gw > 100)
    w.push(`Una comisión de pasarela del ${fmt.num(gw)} % no es posible: revisa si querías meter el total en ${fmt.many()} (usa «¿Solo sabes el total?»)`)
  else if (inp.salesChannel !== "marketplace" && inp.feesMode === "pct" && gw > 10)
    w.push(`Una comisión de pasarela del ${String(gw).replace(".", fmt.decimal())} % es muy alta: ¿querías poner ${String(gw / 10).replace(".", fmt.decimal())} %?`)
  return w
}

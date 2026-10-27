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
export type Level = "good" | "warn" | "bad" | "neutral"
export type SeasonProfile = "flat" | "xmas" | "summer" | "custom"

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

export interface Inputs {
  months: 1 | 3 | 6 | 12
  endMonth: number // 0-11, último mes incluido en los datos
  profile: SeasonProfile
  customWeights: number[] // 12 valores
  growthPct: number | null

  salesIncludeVat: boolean
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

  ads: AdChannel[]
  emailToolCost: number | null
  emailAttributed: number | null
  otherMarketing: number | null

  platformCost: number | null
  otherFixed: number | null
  profitTaxPct: number | null

  ltvEnabled: boolean
  ltvFrequency: number | null // pedidos por cliente en 12 meses

  croUpliftPct: number | null
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
  cta?: "audit" | "contact"
}

export interface Results {
  hasData: boolean
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
  fees: number
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

  fixed: number
  ebit: number
  tax: number
  netProfit: number
  netMarginPct: number | null

  // KPIs
  orders: number
  sessions: number
  aov: number | null
  conversionRate: number | null
  rpv: number | null
  newCustomers: number
  returningCustomers: number
  returningShare: number | null
  roasBreakeven: number | null
  mer: number | null
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

export function compute(inp: Inputs): Results {
  const vatRate = Math.max(0, n(inp.vatPct)) / 100
  const vatFactor = inp.salesIncludeVat ? 1 / (1 + vatRate) : 1

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
  const fees =
    inp.feesMode === "pct"
      ? Math.max(0, totalCharged) * (a(inp.fees) / 100) + orders * a(inp.feesFixedPerOrder)
      : a(inp.fees)
  const variableCosts = cogs + shippingPaid + packaging + fees
  const shippingSubsidy = shippingPaid - shippingRevenue

  const cm1 = netRevenue - variableCosts
  const cm1PerEuro = div(cm1, netRevenue)

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
      const roas = div(attributed, spend)
      return { id: c.id, name: c.name || "Otra plataforma", spend, attributed, roas, level: levelVsBreakeven(roas) }
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

  const fixed = a(inp.platformCost) + a(inp.otherFixed)
  const ebit = contribution - fixed
  const taxRate = Math.max(0, n(inp.profitTaxPct)) / 100
  const tax = ebit > 0 ? ebit * taxRate : 0
  const netProfit = ebit - tax
  const netMarginPct = div(netProfit, netRevenue)

  const aov = div(gross - discounts, orders)
  const conversionRate = div(orders, sessions)
  const rpv = div(gross - discounts, sessions)
  const totalCustomers = newCustomers + returningCustomers
  const returningShare = div(returningCustomers, totalCustomers)
  const mer = div(netRevenue, marketing)
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

  const r: Results = {
    hasData, vatRate, vatFactor,
    gross, discounts, returns, netProductSales, shippingRevenue, netRevenue, totalCharged, vatCollected,
    cogs, shippingPaid, packaging, fees, variableCosts, shippingSubsidy, cm1, cm1PerEuro,
    channels, adSpend, adAttributed, emailToolCost, emailAttributed, emailRoas, otherMarketing, marketing,
    restRevenue, overAttribution, contribution, contributionPct,
    fixed, ebit, tax, netProfit, netMarginPct,
    orders, sessions, aov, conversionRate, rpv, newCustomers, returningCustomers, returningShare,
    roasBreakeven, mer, cac, cm1PerOrder, breakevenRevenue, discountPct, returnPct,
    ltvFrequency, ltvFrequencyIsEstimate, ltvRevenue, ltvMargin, ltvCac,
    seasonFactor, weights, periodMonths, projection,
    projRevenue, projContribution, projProfitBeforeTax, projTax, projNetProfit, lossMonths,
    croExtraProfitYear,
    insights: [],
  }
  r.insights = buildInsights(r, inp)
  return r
}

// ---------------------------------------------------------------------------
// Semáforos (umbrales ORIENTATIVOS; en la página se indica así)
// ---------------------------------------------------------------------------

export const levelOf = {
  profit: (v: number): Level => (v > 0 ? "good" : v < 0 ? "bad" : "warn"),
  cm1PerEuro: (v: number | null): Level => (v === null ? "neutral" : v <= 0 ? "bad" : v < 0.3 ? "warn" : "good"),
  contributionPct: (v: number | null): Level => (v === null ? "neutral" : v <= 0 ? "bad" : v < 0.1 ? "warn" : "good"),
  mer: (mer: number | null, be: number | null): Level =>
    mer === null ? "neutral" : be === null || mer < be ? "bad" : mer < be * 1.2 ? "warn" : "good",
  conversion: (v: number | null): Level => (v === null ? "neutral" : v < 0.005 ? "bad" : v < 0.01 ? "warn" : v >= 0.02 ? "good" : "neutral"),
  ltvCac: (v: number | null): Level => (v === null ? "neutral" : v < 1 ? "bad" : v < 3 ? "warn" : "good"),
  cacVsOrder: (cac: number | null, cm1PerOrder: number | null): Level =>
    cac === null || cm1PerOrder === null ? "neutral" : cac > cm1PerOrder ? "warn" : "good",
  discount: (v: number | null): Level => (v === null ? "neutral" : v > 0.2 ? "bad" : v > 0.12 ? "warn" : "good"),
  returns: (v: number | null): Level => (v === null ? "neutral" : v > 0.15 ? "bad" : v > 0.08 ? "warn" : "good"),
}

// ---------------------------------------------------------------------------
// Formato
// ---------------------------------------------------------------------------

const eur0 = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0, useGrouping: "always" } as Intl.NumberFormatOptions)
const eur2 = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: "always" } as Intl.NumberFormatOptions)
const num0 = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 0, useGrouping: "always" } as Intl.NumberFormatOptions)
const num2 = new Intl.NumberFormat("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: "always" } as Intl.NumberFormatOptions)
const pct1 = new Intl.NumberFormat("es-ES", { style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1 })

// Evita "-0,00 €" / "-0,0 %": si el valor redondeado a la precisión mostrada es 0, se muestra 0
const z0 = (v: number, decimals: number) => (Math.round(v * 10 ** decimals) === 0 ? 0 : v)

export const fmt = {
  eur: (v: number | null) => (v === null ? "—" : eur0.format(z0(v, 0))),
  eur2: (v: number | null) => (v === null ? "—" : eur2.format(z0(v, 2))),
  num: (v: number | null) => (v === null ? "—" : num0.format(z0(v, 0))),
  x: (v: number | null) => (v === null ? "—" : `${num2.format(z0(v, 2))}x`),
  dec: (v: number | null) => (v === null ? "—" : num2.format(z0(v, 2))),
  pct: (v: number | null) => (v === null ? "—" : pct1.format(z0(v, 3))),
}

// ---------------------------------------------------------------------------
// Conclusiones: reglas simples, ordenadas por gravedad
// ---------------------------------------------------------------------------

function buildInsights(r: Results, inp: Inputs): Insight[] {
  if (!r.hasData || r.netRevenue <= 0) return []
  const out: Insight[] = []
  const per = inp.months === 1 ? "al mes" : `en ${inp.months} meses`

  if (r.cm1 <= 0) {
    out.push({
      level: "bad",
      title: "Pierdes dinero en cada venta, antes incluso de hacer marketing",
      text: `Producto, envíos, packaging y pasarela se comen más de lo que ingresas. Más ventas o más publicidad no lo arreglan: agrandan la pérdida. Revisa precios, coste de producto y política de envíos antes de invertir un euro más.`,
    })
  }

  if (r.netProfit < 0 && r.cm1 > 0 && r.breakevenRevenue !== null) {
    const gap = r.breakevenRevenue - r.netRevenue
    out.push({
      level: "bad",
      title: `Te faltan ${fmt.eur(gap)} de ventas netas ${per} para no perder dinero`,
      text: `Con tu margen actual (${fmt.eur2(r.cm1PerEuro)} por cada euro vendido) y tus gastos de marketing y fijos, el punto de equilibrio está en ${fmt.eur(r.breakevenRevenue)} de ingresos netos ${per}. O vendes más con el mismo gasto, o subes el margen, o recortas gasto.`,
    })
  }

  const losing = r.channels.filter((c) => c.level === "bad" && c.spend > 0)
  for (const c of losing) {
    out.push({
      level: "bad",
      title: `${c.name} no se paga ni con sus propios datos`,
      text: `ROAS de ${fmt.x(c.roas)} cuando necesitas al menos ${fmt.x(r.roasBreakeven)} para cubrir costes. Y las plataformas tienden a atribuirse de más, así que la realidad suele ser peor. Revisa campañas, público y creatividades, o baja el presupuesto.`,
    })
  }

  if (r.mer !== null && r.roasBreakeven !== null && r.mer < r.roasBreakeven) {
    out.push({
      level: "bad",
      title: "En conjunto, tu marketing cuesta más de lo que deja",
      text: `Tu MER es ${fmt.x(r.mer)} y el mínimo para cubrir costes es ${fmt.x(r.roasBreakeven)}. Esta métrica no depende de lo que diga cada plataforma: es ventas totales entre gasto total.`,
    })
  }

  if (r.overAttribution > 0) {
    out.push({
      level: "warn",
      title: "Las plataformas se atribuyen más ventas de las que tuviste",
      text: `Suman ${fmt.eur(r.overAttribution)} más que tus ingresos reales. Es normal: varias plataformas se adjudican la misma venta. Por eso conviene decidir con el MER, no solo con el ROAS de cada una.`,
    })
  }

  if (r.shippingSubsidy > 0 && r.netRevenue > 0) {
    out.push({
      level: r.shippingSubsidy / r.netRevenue > 0.05 ? "bad" : "warn",
      title: `Pagas de tu bolsillo ${fmt.eur(r.shippingSubsidy)} en envíos ${per}`,
      text: `Es lo que te cuestan los envíos menos lo que cobras por ellos (${fmt.pct(r.shippingSubsidy / r.netRevenue)} de tus ingresos). Prueba un umbral de envío gratis por encima de tu ticket medio (${fmt.eur(r.aov)}) o ajusta tarifas.`,
    })
  }

  if (levelOf.discount(r.discountPct) !== "good") {
    out.push({
      level: levelOf.discount(r.discountPct),
      title: `Los descuentos se llevan el ${fmt.pct(r.discountPct)} de tus ventas brutas`,
      text: "Cada euro de descuento sale directo de tu margen. Revisa si los códigos están generando ventas nuevas o solo regalando margen a quien iba a comprar igual.",
    })
  }

  if (levelOf.returns(r.returnPct) !== "good") {
    out.push({
      level: levelOf.returns(r.returnPct),
      title: `Devoluciones del ${fmt.pct(r.returnPct)}`,
      text: "Suele indicar que la ficha de producto no deja claro lo que el cliente va a recibir: tallas, medidas, fotos reales, materiales. Mejorar la ficha reduce devoluciones y sube conversión a la vez.",
      cta: "audit",
    })
  }

  if (r.ltvCac !== null) {
    const l = levelOf.ltvCac(r.ltvCac)
    if (l !== "good") {
      out.push({
        level: l,
        title: l === "bad" ? "Un cliente nuevo te cuesta más de lo que te deja en un año" : "Captar clientes te sale justo",
        text: `Cada cliente deja ${fmt.eur(r.ltvMargin)} de margen en 12 meses y captarlo cuesta ${fmt.eur(r.cac)} (LTV:CAC ${fmt.dec(r.ltvCac)}). Sube la recompra con email (post-compra, recordatorios) o baja el coste de captación.`,
      })
    } else {
      out.push({
        level: "good",
        title: "Tus clientes son rentables a 12 meses",
        text: `LTV:CAC de ${fmt.dec(r.ltvCac)}: cada euro que inviertes en captar un cliente vuelve multiplicado en el año. Hay margen para invertir más en captación.`,
      })
    }
  } else if (levelOf.cacVsOrder(r.cac, r.cm1PerOrder) === "warn") {
    out.push({
      level: "warn",
      title: "Pierdes dinero en el primer pedido de cada cliente nuevo",
      text: `Captar un cliente te cuesta ${fmt.eur(r.cac)} y cada pedido deja ${fmt.eur(r.cm1PerOrder)} antes de marketing. Solo es rentable si vuelven a comprar: activa el cálculo de LTV para comprobarlo.`,
    })
  }

  const cr = levelOf.conversion(r.conversionRate)
  if (cr === "bad" || cr === "warn") {
    out.push({
      level: cr,
      title: `Solo compra el ${fmt.pct(r.conversionRate)} de las visitas`,
      text: "Tu tráfico llega pero no convierte. Antes de pagar más publicidad, conviene encontrar qué frena la compra dentro de la tienda: cada mejora de conversión abarata todo tu marketing.",
      cta: "audit",
    })
  }

  if (r.lossMonths.length > 0 && r.lossMonths.length < 12) {
    out.push({
      level: "warn",
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
      level: "good",
      title: "El email marketing es tu canal más rentable",
      text: `Cada euro de la herramienta devuelve ${fmt.x(r.emailRoas)} en ventas. Más flujos automáticos (bienvenida, carrito abandonado, post-compra) suelen ser la palanca más barata.`,
    })
  }

  if (r.netProfit > 0 && out.every((i) => i.level !== "bad")) {
    out.push({
      level: "good",
      title: `Tu tienda es rentable: te quedan ${fmt.eur(r.netProfit)} ${per}`,
      text: `Un ${fmt.pct(r.netMarginPct)} de lo que ingresas. El siguiente paso es crecer sin romper el margen: subir conversión y ticket medio sobre el tráfico que ya tienes.`,
      cta: "audit",
    })
  }

  const order: Record<Level, number> = { bad: 0, warn: 1, neutral: 2, good: 3 }
  return out.sort((a, b) => order[a.level] - order[b.level])
}

function joinEs(items: string[]) {
  if (items.length <= 1) return items.join("")
  return `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}`
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
  // Recompra: los clientes recurrentes hacen un X % más de pedidos. Como no sabemos
  // cuántos pedidos son de recurrentes, los estimamos en proporción a sus clientes.
  const nc0 = Math.max(0, n(inp.newCustomers))
  const rc0 = Math.max(0, n(inp.returningCustomers))
  const repeatShare = nc0 + rc0 > 0 ? rc0 / (nc0 + rc0) : 0
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
    cogs: inp.cogsMode === "pct" ? n(inp.cogs) * f(lv.cogs) : n(inp.cogs) * nsRatio * f(lv.cogs),
    shippingPaid: n(inp.shippingPaid) * volume * f(lv.shipping),
    packaging: n(inp.packaging) * volume,
    fees: inp.feesMode === "pct" ? inp.fees : n(inp.fees) * revRatio,
    ads: inp.ads.map((a) => ({
      ...a,
      spend: has(a.spend) ? n(a.spend) * f(lv.ads) : a.spend,
      attributed: has(a.attributed) ? n(a.attributed) * adFactor * salesFactor : a.attributed,
    })),
    emailAttributed: has(inp.emailAttributed) ? n(inp.emailAttributed) * salesFactor : inp.emailAttributed,
    platformCost: has(inp.platformCost) ? n(inp.platformCost) * f(lv.fixed) : inp.platformCost,
    otherFixed: has(inp.otherFixed) ? n(inp.otherFixed) * f(lv.fixed) : inp.otherFixed,
  }
  return compute(next)
}

/** Cuánto cambia el beneficio neto (del periodo) al mejorar cada palanca un `step` %. */
export function leverRanking(inp: Inputs, base: Results, step = 10) {
  return LEVER_KEYS.filter((k) => (k !== "ads" || base.adSpend > 0) && (k !== "repeat" || base.returningCustomers > 0))
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
  if (!has(inp.grossSales) && (has(inp.discounts) || has(inp.returns) || has(inp.shippingCharged) || has(inp.orders)))
    w.push("Falta el dato de ventas brutas: sin él, casi todo el cálculo sale mal.")
  if (gross > 0 && Math.abs(n(inp.discounts)) + Math.abs(n(inp.returns)) > gross)
    w.push("Descuentos y devoluciones suman más que tus ventas brutas. Revisa que sean del mismo periodo.")
  if (r.sessions > 0 && r.orders > r.sessions) w.push("Tienes más pedidos que sesiones: ¿puede que falte una cifra en las sesiones?")
  if (r.orders > 0 && r.newCustomers + r.returningCustomers > r.orders)
    w.push("Hay más clientes que pedidos: cada cliente hace al menos un pedido. Revisa clientes nuevos y recurrentes.")
  if (inp.cogsMode === "pct" && Math.abs(n(inp.cogs)) > 100) w.push("El coste de producto supera el 100 % del precio de venta: ¿querías ponerlo en euros?")
  if (inp.feesMode === "pct" && Math.abs(n(inp.fees)) > 10)
    w.push(`Una comisión de pasarela del ${n(inp.fees)} % es muy alta: ¿querías poner ${String(n(inp.fees) / 10).replace(".", ",")} %?`)
  return w
}

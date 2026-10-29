// "Tu cuenta": la operación exacta, con los números del usuario, de cada
// métrica calculada. Se muestra dentro del panel (?) de cada concepto.
import { fmt, type Inputs, type Results } from "./calc"

const e = fmt.eur
const e2 = fmt.eur2
const n = fmt.num
const p = fmt.pct
const x = fmt.x
const d = fmt.dec
const num = (v: number | null | undefined) => (typeof v === "number" && isFinite(v) ? v : 0)
const d4 = (v: number | null) =>
  v === null ? "—" : fmt.dec4(v)
const pctIn = (v: number | null) => `${fmt.dec(num(v)).replace(/[.,]00$/, "")} %`

export type Formulas = Record<string, string[]>

export function buildFormulas(r: Results, inp: Inputs): Formulas {
  if (!r.hasData) return {}
  const f: Formulas = {}
  const vatNote = inp.salesIncludeVat
    ? [`Tus cifras de ventas se pasan a sin IVA: cifra ÷ ${d(1 + r.vatRate)}`]
    : []

  // Ventas
  f.netProductSales = [...vatNote, `${e(r.gross)} − ${e(r.discounts)} − ${e(r.returns)} = ${e(r.netProductSales)}`]
  f.netRevenue = [...vatNote, `${e(r.netProductSales)} + ${e(r.shippingRevenue)} = ${e(r.netRevenue)}`]
  f.vatCollected = [`${e(r.netRevenue)} × ${p(r.vatRate)} = ${e(r.vatCollected)}`]

  // Costes variables
  if (inp.cogsMode === "pct") f.cogs = [`${e(r.netProductSales)} × ${pctIn(inp.cogs)} = ${e(r.cogs)}`]
  const share = r.mkShare
  const storeShare = 1 - share
  const partial = share > 0 && share < 1
  if (inp.feesMode === "pct") {
    const all = r.totalCharged * (Math.abs(num(inp.fees)) / 100) + r.orders * Math.abs(num(inp.feesFixedPerOrder))
    f.fees = [
      `Lo que pagan los clientes: ${e(r.netRevenue)} × ${d(1 + r.vatRate)} = ${e(r.totalCharged)}`,
      partial
        ? `${e(r.totalCharged)} × ${pctIn(inp.fees)} + ${n(r.orders)} pedidos × ${e2(num(inp.feesFixedPerOrder))} = ${e(all)}`
        : `${e(r.totalCharged)} × ${pctIn(inp.fees)} + ${n(r.orders)} pedidos × ${e2(num(inp.feesFixedPerOrder))} = ${e(r.fees)}`,
      ...(partial ? [`Solo la parte de tu tienda: ${e(all)} × ${p(storeShare)} = ${e(r.fees)}`] : []),
    ]
  } else if (partial) {
    f.fees = [`Lo que pagaste a tu pasarela (solo cobra en tu tienda): ${e(r.fees)}`]
  }
  if (inp.salesChannel === "marketplace") f.fees = ["Vendes solo en el marketplace: el cobro va incluido en su comisión, la pasarela cuenta como 0"]

  // Comisiones por venta
  const nps = Math.max(0, r.netProductSales)
  if (r.marketplaceFees > 0 || inp.salesChannel !== "store") {
    const ship = inp.mkFeeOnShipping ? r.shippingRevenue : 0
    const base = (nps + ship) * share
    const lines = [
      inp.mkFeeOnShipping
        ? `Ventas del marketplace con envío: (${e(nps)} + ${e(r.shippingRevenue)}) × ${p(share)} = ${e(base)}`
        : `Ventas del marketplace: ${e(nps)} × ${p(share)} = ${e(base)}`,
      `${e(base)} × ${pctIn(inp.mkFeePct)} = ${e(base * (Math.abs(num(inp.mkFeePct)) / 100))}`,
    ]
    if (num(inp.mkFeeFixed) !== 0) lines.push(`${n(r.orders * share)} pedidos × ${e2(Math.abs(num(inp.mkFeeFixed)))} = ${e(r.orders * share * Math.abs(num(inp.mkFeeFixed)))}`)
    if (num(inp.mkOtherFees) !== 0) lines.push(`Otras tarifas: ${e(Math.abs(num(inp.mkOtherFees)))}`)
    lines.push(`Comisión del marketplace = ${e(r.marketplaceFees)}`)
    f.marketplaceFee = lines
    f.mkOtherFees = [`${e(Math.abs(num(inp.mkOtherFees)))} (total del periodo, sin IVA)`]
  }
  if (inp.salesChannel !== "marketplace") {
    const storeSales = nps * storeShare
    const storeOrders = r.orders * storeShare
    const storeLine = partial ? [`Ventas de tu tienda: ${e(nps)} × ${p(storeShare)} = ${e(storeSales)} · ${n(storeOrders)} pedidos`] : []
    f.platformFee = [
      ...storeLine,
      `${e(storeSales)} × ${pctIn(inp.platformFeePct)} + ${n(storeOrders)} pedidos × ${e2(Math.abs(num(inp.platformFeeFixed)))} = ${e(r.platformFees)}`,
    ]
    if (r.appBreakdown.length > 0) {
      const byId = new Map((inp.apps ?? []).map((x) => [x.id, x]))
      f.appFees = [
        ...storeLine,
        ...r.appBreakdown.map((x) => {
          const src = byId.get(x.id)
          return `${x.name}: ${e(storeSales)} × ${pctIn(src?.pct ?? 0)} + ${n(storeOrders)} pedidos × ${e2(Math.abs(num(src?.fixed)))} = ${e(x.amount)}`
        }),
        ...(r.appBreakdown.length > 1 ? [`Total apps = ${e(r.appFees)}`] : []),
      ]
    }
  }
  if (r.salesFeesTotal > 0) {
    const parts = [
      ...(r.marketplaceFees > 0 ? [`${e(r.marketplaceFees)} marketplace`] : []),
      ...(r.platformFees > 0 ? [`${e(r.platformFees)} plataforma`] : []),
      ...(r.appFees > 0 ? [`${e(r.appFees)} apps`] : []),
    ]
    f.salesFees = [`${parts.join(" + ")} = ${e(r.salesFeesTotal)}`, `${e(r.salesFeesTotal)} ÷ ${e(r.netRevenue)} = ${p(r.netRevenue > 0 ? r.salesFeesTotal / r.netRevenue : null)} de tus ingresos`]
  }
  if (r.cm1PerEuroStore !== null && r.cm1PerEuroMarketplace !== null && r.netRevenue > 0) {
    const common = r.cogs + r.shippingPaid + r.packaging + r.returnCosts
    const cr = common / r.netRevenue
    f.channelMargin = [
      `Costes comunes: ${e(common)} ÷ ${e(r.netRevenue)} = ${p(cr)} de cada venta`,
      `Tienda: 1 − ${p(cr)} − (${e(r.fees)} pasarela + ${e(r.platformFees + r.appFees)} comisiones) ÷ ${e(r.netRevenue * storeShare)} = ${e2(r.cm1PerEuroStore)} por ${fmt.one()}`,
      `Marketplace: 1 − ${p(cr)} − ${e(r.marketplaceFees)} ÷ ${e(r.netRevenue * share)} = ${e2(r.cm1PerEuroMarketplace)} por ${fmt.one()}`,
    ]
  }

  const varLine = `${e(r.cogs)} + ${e(r.shippingPaid)} + ${e(r.packaging)} + ${e(r.fees)}${r.salesFeesTotal > 0 ? ` + ${e(r.salesFeesTotal)} comisiones` : ""}${r.returnCosts > 0 ? ` + ${e(r.returnCosts)}` : ""} = ${e(r.variableCosts)}`
  f.variableCosts = [varLine]
  f.cm1 = [
    `Costes variables: ${varLine}`,
    `${e(r.netRevenue)} − ${e(r.variableCosts)} = ${e(r.cm1)}`,
  ]
  f.cm1PerEuro = [`${e(r.cm1)} ÷ ${e(r.netRevenue)} = ${e2(r.cm1PerEuro)}`]
  f.cm1PerOrder = [`${e(r.cm1)} ÷ ${n(r.orders)} pedidos = ${e2(r.cm1PerOrder)}`]

  // Marketing y márgenes
  const mktLine = `Marketing: ${e(r.adSpend)} ads + ${e(r.emailToolCost)} email + ${e(r.otherMarketing)} otros = ${e(r.marketing)}`
  f.contribution = [mktLine, `${e(r.netRevenue)} − ${e(r.variableCosts)} − ${e(r.marketing)} = ${e(r.contribution)}`]
  f.contributionPct = [`${e(r.contribution)} ÷ ${e(r.netRevenue)} = ${p(r.contributionPct)}`]
  f.fixed = r.completeness.fixedKnown
    ? [`${e(Math.abs(num(inp.platformCost)))} + ${e(Math.abs(num(inp.otherFixed)))}${r.ownerSalary > 0 ? ` + ${e(r.ownerSalary)} (tu sueldo)` : ""} = ${e(r.fixed)}`]
    : ["Falta el dato de gastos fijos: cuenta como 0"]
  f.ownerTake = [`${e(r.ownerSalary)} (tu sueldo) + ${e(r.netProfit)} (beneficio neto) = ${e(r.ownerTake)}`]
  if (r.ownerHoursPeriod !== null) {
    f.ownerPerHour = [
      `Horas del periodo: ${n(Math.abs(num(inp.ownerHours)))} h al mes × ${inp.months} = ${n(r.ownerHoursPeriod)} h`,
      `${e(r.ownerTake)} ÷ ${n(r.ownerHoursPeriod)} h = ${e2(r.ownerPerHour)}`,
    ]
  }
  f.ebit = [`${e(r.contribution)} − ${e(r.fixed)} = ${e(r.ebit)}`]
  f.profitTax =
    r.ebit > 0
      ? [`${e(r.ebit)} × ${pctIn(inp.profitTaxPct)} = ${e(r.tax)}`]
      : [`No hay beneficio, así que no se aplica impuesto: ${e(0)}`]
  f.netProfit = [
    `${e(r.netRevenue)} − ${e(r.variableCosts)} − ${e(r.marketing)} − ${e(r.fixed)} = ${e(r.ebit)} antes de impuestos`,
    r.ebit > 0 ? `${e(r.ebit)} − ${e(r.tax)} de impuesto = ${e(r.netProfit)}` : `Sin impuesto (no hay beneficio) = ${e(r.netProfit)}`,
  ]
  f.netMarginPct = [`${e(r.netProfit)} ÷ ${e(r.netRevenue)} = ${p(r.netMarginPct)}`]

  // Tráfico y clientes
  f.aov = [`(${e(r.gross)} − ${e(r.discounts)}) ÷ ${n(r.orders)} pedidos = ${e2(r.aov)}`]
  const noVisits = ["Sin el dato de visitas no se puede calcular"]
  f.conversionRate = r.sessions > 0 ? [`${n(r.orders)} pedidos ÷ ${n(r.sessions)} sesiones = ${p(r.conversionRate)}`] : noVisits
  f.rpv =
    r.sessions > 0
      ? [
          `(${e(r.gross)} − ${e(r.discounts)}) ÷ ${n(r.sessions)} sesiones = ${e2(r.rpv)}`,
          `Comprobación: ${p(r.conversionRate)} × ${e2(r.aov)} = ${e2(r.conversionRate !== null && r.aov !== null ? r.conversionRate * r.aov : null)}`,
        ]
      : noVisits
  f.returningShare =
    r.newCustomers + r.returningCustomers > 0
      ? [`${n(r.returningCustomers)} ÷ (${n(r.newCustomers)} + ${n(r.returningCustomers)}) = ${p(r.returningShare)}`]
      : ["Sin el dato de clientes nuevos y recurrentes no se puede calcular"]

  // Publicidad
  f.roasBreakeven = r.cm1 > 0 ? [`${e(r.netRevenue)} ÷ ${e(r.cm1)} = ${x(r.roasBreakeven)}`] : ["El margen antes de marketing es 0 o negativo: ningún ROAS cubre costes"]
  f.roas = r.channels.map((c) => `${c.name}: ${e(c.attributed)} ÷ ${e(c.spend)} = ${x(c.roas)}`)
  if (inp.salesIncludeVat && f.roas.length) f.roas.unshift(`Ventas atribuidas pasadas a sin IVA (÷ ${d(1 + r.vatRate)})`)
  f.emailRoas = [`${e(r.emailAttributed)} ÷ ${e(r.emailToolCost)} = ${x(r.emailRoas)}`]
  f.mer = [mktLine, `${e(r.netRevenue)} ÷ ${e(r.marketing)} = ${x(r.mer)}`]
  f.merProfit = r.merProfitImpossible
    ? [`Margen antes de marketing ${e(r.cm1)} − fijos ${e(r.fixed)} = ${e(r.cm1 - r.fixed)}: no queda nada para marketing, ningún MER da beneficio`]
    : [`${e(r.netRevenue)} ÷ (${e(r.cm1)} margen antes de marketing − ${e(r.fixed)} fijos) = ${x(r.merProfit)}`]
  f.cac = r.newCustomers > 0 ? [mktLine, `${e(r.marketing)} ÷ ${n(r.newCustomers)} clientes nuevos = ${e2(r.cac)}`] : ["Sin el dato de clientes nuevos no se puede calcular"]
  f.attribution = [
    `${e(r.netRevenue)} − ${e(r.adAttributed)} (ads) − ${e(r.emailAttributed)} (email) = ${e(r.netRevenue - r.adAttributed - r.emailAttributed)}`,
    ...(r.overAttribution > 0 ? [`Sale negativo: las plataformas se atribuyen más de lo vendido, así que el resto se muestra como ${e(0)}`] : []),
  ]
  f.breakevenRevenue =
    r.breakevenRevenue !== null
      ? [
          `(${e(r.marketing)} marketing + ${e(r.fixed)} fijos) ÷ ${d4(r.cm1PerEuro)} = ${e(r.breakevenRevenue)}`,
          "Suponiendo que mantienes el mismo gasto en marketing",
        ]
      : !r.completeness.fixedKnown
        ? ["Falta el dato de gastos fijos: sin él no se puede calcular"]
        : ["Con margen antes de marketing negativo no hay punto de equilibrio"]

  // Primera compra
  if (r.firstOrderMargin !== null && r.firstOrderTicket !== null) {
    f.firstOrderProfit = [
      ...(r.firstOrderCustom
        ? [
            `Ticket del primer pedido: ${e2(r.firstOrderTicket / (1 - Math.min(100, Math.max(0, num(inp.welcomeDiscountPct))) / 100 || 1))} − ${pctIn(inp.welcomeDiscountPct)} de bienvenida = ${e2(r.firstOrderTicket)}`,
            `Margen del primer pedido (ajustado por su importe): ${e2(r.firstOrderMargin)}`,
          ]
        : [`Margen del primer pedido = margen por pedido medio: ${e2(r.firstOrderMargin)}`]),
      `${e2(r.firstOrderMargin)} − ${e2(r.cac)} (CAC) = ${e2(r.firstOrderProfit)}`,
    ]
    if (r.ordersToRecoverCac !== null && r.firstOrderProfit !== null) {
      f.ordersToRecoverCac =
        r.firstOrderProfit >= 0
          ? [`${e2(r.cac)} ÷ ${e2(r.firstOrderMargin)} = ${d(r.ordersToRecoverCac)} → lo recuperas con el primer pedido`]
          : [`1 + ${e2(-r.firstOrderProfit)} ÷ ${e2(r.cm1PerOrder)} = ${d(r.ordersToRecoverCac)} pedidos`]
    }
  }

  // LTV
  if (inp.ltvEnabled && r.ltvFrequency !== null) {
    const aovNet = r.orders > 0 ? r.netProductSales / r.orders : null
    f.ltvFrequency = r.ltvFrequencyIsEstimate
      ? [`${n(r.orders)} pedidos ÷ (${n(r.newCustomers)} + ${n(r.returningCustomers)}) clientes = ${d(r.ltvFrequency)}`]
      : []
    f.ltvRevenue = [
      `Ticket neto: ${e(r.netProductSales)} ÷ ${n(r.orders)} pedidos = ${e2(aovNet)}`,
      `${e2(aovNet)} × ${d(r.ltvFrequency)} pedidos al año = ${e2(r.ltvRevenue)}`,
    ]
    f.ltvMargin = [`${e2(r.cm1PerOrder)} × ${d(r.ltvFrequency)} pedidos al año = ${e2(r.ltvMargin)}`]
    f.ltvCac = [`${e2(r.ltvMargin)} ÷ ${e2(r.cac)} = ${d(r.ltvCac)}`]
  }

  // Cada 100 €
  if (r.netRevenue > 0) {
    const per100 = (v: number) => e2((v / r.netRevenue) * 100)
    f.per100 = [
      `Cada partida ÷ ${e(r.netRevenue)} × 100`,
      `Ej. producto: ${e(r.cogs)} ÷ ${e(r.netRevenue)} × 100 = ${per100(r.cogs)}`,
      `Te queda: ${e(r.netProfit)} ÷ ${e(r.netRevenue)} × 100 = ${per100(r.netProfit)}`,
    ]
  }

  // Proyección
  const periodWeight = r.periodMonths.reduce((a, m) => a + r.weights[m], 0)
  const growth = 1 + num(inp.growthPct) / 100
  const k = inp.months
  f.projection = [
    `Factor estacional: 12 ÷ ${d4(periodWeight)} (peso de tus ${k === 1 ? "mes" : `${k} meses`}) = ${d4(r.seasonFactor)}`,
    `Ingresos: ${e(r.netRevenue)} × ${d4(r.seasonFactor)} × ${d(growth)} (crecimiento) = ${e(r.projRevenue)}`,
    `Costes variables y publicidad: × ${d4(r.seasonFactor)} × ${d(growth)}`,
    `Fijos y herramienta de email: × 12 ÷ ${k} = ${e((r.fixed + r.emailToolCost) * (12 / k))}`,
    `Cada mes = total anual × peso del mes ÷ 12`,
  ]
  f.projContribution = [
    `${e(r.projRevenue)} − ${e(r.variableCosts * r.seasonFactor * growth)} variables − ${e((r.adSpend + r.otherMarketing) * r.seasonFactor * growth)} publicidad y otros − ${e(r.emailToolCost * (12 / k))} email = ${e(r.projContribution)}`,
  ]
  f.projNetProfit = [
    `${e(r.projContribution)} − ${e(r.fixed * (12 / k))} fijos = ${e(r.projProfitBeforeTax)} antes de impuestos`,
    r.projProfitBeforeTax > 0
      ? `${e(r.projProfitBeforeTax)} − ${e(r.projTax)} de impuesto = ${e(r.projNetProfit)}`
      : `Sin impuesto (no hay beneficio) = ${e(r.projNetProfit)}`,
  ]

  return f
}

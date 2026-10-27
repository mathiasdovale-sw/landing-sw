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
  v === null ? "—" : new Intl.NumberFormat("es-ES", { minimumFractionDigits: 4, maximumFractionDigits: 4 }).format(v)
const pctIn = (v: number | null) => `${fmt.dec(num(v)).replace(/,00$/, "")} %`

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
  if (inp.feesMode === "pct") {
    f.fees = [
      `Lo que pagan los clientes: ${e(r.netRevenue)} × ${d(1 + r.vatRate)} = ${e(r.totalCharged)}`,
      `${e(r.totalCharged)} × ${pctIn(inp.fees)} + ${n(r.orders)} pedidos × ${e2(num(inp.feesFixedPerOrder))} = ${e(r.fees)}`,
    ]
  }
  f.variableCosts = [`${e(r.cogs)} + ${e(r.shippingPaid)} + ${e(r.packaging)} + ${e(r.fees)} = ${e(r.variableCosts)}`]
  f.cm1 = [
    `Costes variables: ${e(r.cogs)} + ${e(r.shippingPaid)} + ${e(r.packaging)} + ${e(r.fees)} = ${e(r.variableCosts)}`,
    `${e(r.netRevenue)} − ${e(r.variableCosts)} = ${e(r.cm1)}`,
  ]
  f.cm1PerEuro = [`${e(r.cm1)} ÷ ${e(r.netRevenue)} = ${e2(r.cm1PerEuro)}`]
  f.cm1PerOrder = [`${e(r.cm1)} ÷ ${n(r.orders)} pedidos = ${e2(r.cm1PerOrder)}`]

  // Marketing y márgenes
  const mktLine = `Marketing: ${e(r.adSpend)} ads + ${e(r.emailToolCost)} email + ${e(r.otherMarketing)} otros = ${e(r.marketing)}`
  f.contribution = [mktLine, `${e(r.netRevenue)} − ${e(r.variableCosts)} − ${e(r.marketing)} = ${e(r.contribution)}`]
  f.contributionPct = [`${e(r.contribution)} ÷ ${e(r.netRevenue)} = ${p(r.contributionPct)}`]
  f.fixed = [`${e(num(inp.platformCost))} + ${e(num(inp.otherFixed))} = ${e(r.fixed)}`]
  f.ebit = [`${e(r.contribution)} − ${e(r.fixed)} = ${e(r.ebit)}`]
  f.profitTax =
    r.ebit > 0
      ? [`${e(r.ebit)} × ${pctIn(inp.profitTaxPct)} = ${e(r.tax)}`]
      : ["No hay beneficio, así que no se aplica impuesto: 0 €"]
  f.netProfit = [
    `${e(r.netRevenue)} − ${e(r.variableCosts)} − ${e(r.marketing)} − ${e(r.fixed)} = ${e(r.ebit)} antes de impuestos`,
    r.ebit > 0 ? `${e(r.ebit)} − ${e(r.tax)} de impuesto = ${e(r.netProfit)}` : `Sin impuesto (no hay beneficio) = ${e(r.netProfit)}`,
  ]
  f.netMarginPct = [`${e(r.netProfit)} ÷ ${e(r.netRevenue)} = ${p(r.netMarginPct)}`]

  // Tráfico y clientes
  f.aov = [`(${e(r.gross)} − ${e(r.discounts)}) ÷ ${n(r.orders)} pedidos = ${e2(r.aov)}`]
  f.conversionRate = [`${n(r.orders)} pedidos ÷ ${n(r.sessions)} sesiones = ${p(r.conversionRate)}`]
  f.rpv = [
    `(${e(r.gross)} − ${e(r.discounts)}) ÷ ${n(r.sessions)} sesiones = ${e2(r.rpv)}`,
    `Comprobación: ${p(r.conversionRate)} × ${e2(r.aov)} = ${e2(r.conversionRate !== null && r.aov !== null ? r.conversionRate * r.aov : null)}`,
  ]
  f.returningShare = [
    `${n(r.returningCustomers)} ÷ (${n(r.newCustomers)} + ${n(r.returningCustomers)}) = ${p(r.returningShare)}`,
  ]

  // Publicidad
  f.roasBreakeven = r.cm1 > 0 ? [`${e(r.netRevenue)} ÷ ${e(r.cm1)} = ${x(r.roasBreakeven)}`] : ["El margen antes de marketing es 0 o negativo: ningún ROAS cubre costes"]
  f.roas = r.channels.map((c) => `${c.name}: ${e(c.attributed)} ÷ ${e(c.spend)} = ${x(c.roas)}`)
  if (inp.salesIncludeVat && f.roas.length) f.roas.unshift(`Ventas atribuidas pasadas a sin IVA (÷ ${d(1 + r.vatRate)})`)
  f.emailRoas = [`${e(r.emailAttributed)} ÷ ${e(r.emailToolCost)} = ${x(r.emailRoas)}`]
  f.mer = [mktLine, `${e(r.netRevenue)} ÷ ${e(r.marketing)} = ${x(r.mer)}`]
  f.cac = [mktLine, `${e(r.marketing)} ÷ ${n(r.newCustomers)} clientes nuevos = ${e2(r.cac)}`]
  f.attribution = [
    `${e(r.netRevenue)} − ${e(r.adAttributed)} (ads) − ${e(r.emailAttributed)} (email) = ${e(r.netRevenue - r.adAttributed - r.emailAttributed)}`,
    ...(r.overAttribution > 0 ? ["Sale negativo: las plataformas se atribuyen más de lo vendido, así que el resto se muestra como 0 €"] : []),
  ]
  f.breakevenRevenue =
    r.breakevenRevenue !== null
      ? [`(${e(r.marketing)} marketing + ${e(r.fixed)} fijos) ÷ ${d4(r.cm1PerEuro)} € = ${e(r.breakevenRevenue)}`]
      : ["Con margen antes de marketing negativo no hay punto de equilibrio"]

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
    const per100 = (v: number) => `${d((v / r.netRevenue) * 100)} €`
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

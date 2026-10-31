// Planificador de campañas: cálculo puro (sin React).
// Mismo modelo que el simulador (calc.ts):
// - pedidos = visitas × conversión;
// - visitas de pago extra con la misma curva de rendimientos decrecientes (adReturnFactor);
// - mismos márgenes y costes variables: margen por pedido de la calculadora y, para los
//   cambios de ticket medio, lo que deja cada euro de más según simulate().
// El beneficio de una campaña es la diferencia con «no hacer nada» esos mismos días,
// antes de impuestos y sin gastos fijos (no cambian).
import { adReturnFactor, fmt, MONTHS_LONG, simulate, trafficSplit, ZERO_LEVERS, type Inputs, type Results } from "./calc"
import type { TemplateId } from "./campaign-dates"

// ---------------------------------------------------------------------------
// Datos base de la calculadora, por día
// ---------------------------------------------------------------------------

export interface PlanBase {
  periodDays: number
  /** Texto del periodo: «julio a septiembre de 2026» */
  periodText: string
  visitsDay: number
  paidVisitsDay: number
  ordersDay: number
  /** Conversión: pedidos ÷ visitas */
  cr: number
  /** Ticket medio (sin IVA), como en la calculadora */
  ticket: number
  /** Ingreso neto por pedido (sin IVA, con envíos cobrados) */
  revenuePerOrder: number
  /** Margen por pedido antes de marketing (el de la calculadora) */
  margin: number
  shipChargedPerOrder: number
  shipCostPerOrder: number
  adSpendDay: number
  /** Coste por visita de anuncios actual: gasto ÷ visitas de anuncios (solo si ese dato es válido). */
  cpcCurrent: number | null
  /** Lo que deja (margen) y lo que suma (ingresos) cada euro de más en el ticket medio. */
  marginPerTicketEuro: number
  revenuePerTicketEuro: number
  // Para «Tu cuenta»
  adSpend: number
  adVisits: number
  orders: number
  sessions: number
}

/** Año en que terminó el periodo de datos: el último mes ya pasado (o el actual). */
function periodYears(months: number[], endMonth: number, today: Date): number[] {
  const endYear = endMonth <= today.getMonth() ? today.getFullYear() : today.getFullYear() - 1
  // months va del primero al último; los meses posteriores al último (en el calendario) son del año anterior.
  return months.map((m) => (m > endMonth ? endYear - 1 : endYear))
}

/** null = no se puede planificar (sin visitas o sin pedidos). */
export function planBase(inp: Inputs, r: Results, today: Date): PlanBase | null {
  if (!(r.sessions > 0) || !(r.orders > 0) || r.cm1PerOrder === null || r.aov === null) return null
  const years = periodYears(r.periodMonths, inp.endMonth, today)
  const periodDays = r.periodMonths.reduce((acc, m, i) => acc + new Date(years[i], m + 1, 0).getDate(), 0)
  const first = r.periodMonths[0]
  const last = r.periodMonths[r.periodMonths.length - 1]
  const periodText =
    r.periodMonths.length === 1
      ? `${MONTHS_LONG[first]} de ${years[0]}`
      : `${MONTHS_LONG[first]}${years[0] !== years[years.length - 1] ? ` de ${years[0]}` : ""} a ${MONTHS_LONG[last]} de ${years[years.length - 1]}`
  const split = trafficSplit(inp, r)
  const paid = split.hasSessions ? split.paid : 0
  // Margen e ingreso de cada euro extra de ticket: el mismo cálculo que la palanca «Ticket medio».
  const up = simulate(inp, r, { ...ZERO_LEVERS, aov: 1 })
  const dTicket = r.aov * 0.01
  const marginPerTicketEuro = dTicket > 0 ? (up.cm1 - r.cm1) / r.orders / dTicket : 0
  const revenuePerTicketEuro = dTicket > 0 ? (up.netRevenue - r.netRevenue) / r.orders / dTicket : 0
  const cpcCurrent = split.adSessionsStatus === "given" && split.paid > 0 && r.adSpend > 0 ? r.adSpend / split.paid : null
  return {
    periodDays,
    periodText,
    visitsDay: r.sessions / periodDays,
    paidVisitsDay: paid / periodDays,
    ordersDay: r.orders / periodDays,
    cr: r.orders / r.sessions,
    ticket: r.aov,
    revenuePerOrder: r.netRevenue / r.orders,
    margin: r.cm1PerOrder,
    shipChargedPerOrder: r.shippingRevenue / r.orders,
    shipCostPerOrder: r.shippingPaid / r.orders,
    adSpendDay: r.adSpend / periodDays,
    cpcCurrent,
    marginPerTicketEuro,
    revenuePerTicketEuro,
    adSpend: r.adSpend,
    adVisits: split.adSessionsStatus === "given" ? split.paid : 0,
    orders: r.orders,
    sessions: r.sessions,
  }
}

/**
 * Visitas de pago extra al día por gastar `budgetDay` más en anuncios, con un coste por clic `cpc`.
 * Con publicidad actual: la curva del simulador sobre el gasto normal de esos días (si el coste
 * por clic es el actual, salen exactamente las visitas del simulador). Sin publicidad actual no
 * hay curva de referencia: cada euro trae 1 ÷ coste por clic visitas.
 */
export function extraPaidVisitsDay(b: PlanBase, budgetDay: number, cpc: number): number {
  if (!(budgetDay > 0) || !(cpc > 0)) return 0
  if (b.adSpendDay > 0) return (b.adSpendDay / cpc) * (adReturnFactor((budgetDay / b.adSpendDay) * 100) - 1)
  return budgetDay / cpc
}

// ---------------------------------------------------------------------------
// Plantillas y campos
// ---------------------------------------------------------------------------

export type Unit = "pct" | "money" | "days" | "orders" | "people"

export interface FieldDef {
  key: string
  label: string
  unit: Unit
  /** Clave de la ayuda (?) en concepts.ts */
  concept: string
  required?: boolean | ((v: Values, b: PlanBase) => boolean)
  /** Valor por defecto si el usuario no lo toca (p. ej. 100 %). */
  defaultValue?: number
  /** Se precarga con un dato de la calculadora («De tu cálculo»). */
  prefill?: "cpc"
  hint?: string | ((b: PlanBase) => string)
  /** Máximo admitido (los % de reparto, descuento y comisión no pasan de 100). */
  max?: number
  integer?: boolean
}

export type Values = Record<string, number | null>

export interface TemplateDef {
  id: TemplateId
  name: string
  description: string
  fields: FieldDef[]
}

const daysField: FieldDef = { key: "days", label: "Duración de la campaña", unit: "days", concept: "cpDays", required: true, integer: true }
const cpcField: FieldDef = {
  key: "cpc",
  label: "Coste por clic (por visita de anuncios)",
  unit: "money",
  concept: "cpCpc",
  prefill: "cpc",
}

export const TEMPLATES: TemplateDef[] = [
  {
    id: "discount",
    name: "Fecha de descuentos",
    description: "Black Friday, rebajas, Hot Sale… ¿Cuánto descuento te puedes permitir?",
    fields: [
      daysField,
      { key: "discount", label: "Descuento", unit: "pct", concept: "cpDiscount", required: true, max: 100 },
      { key: "discountShare", label: "Parte de los pedidos que usará el descuento", unit: "pct", concept: "cpDiscountShare", defaultValue: 100, max: 100, hint: "Si el descuento es para toda la tienda, déjalo en 100 %." },
      { key: "budget", label: "Presupuesto extra en anuncios", unit: "money", concept: "cpBudget" },
      { ...cpcField, hint: "Puedes subirlo si esperas más competencia esos días.", required: (v, b) => (v.budget ?? 0) > 0 && b.cpcCurrent === null },
      { key: "visitsUp", label: "¿Esperas más visitas de lo normal esos días?", unit: "pct", concept: "cpVisitsUp", hint: "Si tienes los datos del año pasado, compara esos días con un día normal." },
      { key: "crUp", label: "¿Esperas que compre más gente de la que te visita?", unit: "pct", concept: "cpCrUp" },
      { key: "otherCosts", label: "Otros costes de la campaña", unit: "money", concept: "cpOtherCosts", hint: "Creatividades, regalos, influencers…" },
    ],
  },
  {
    id: "ads",
    name: "Captación con anuncios",
    description: "¿Cuánto puede costarte cada visita para que los anuncios se paguen?",
    fields: [
      daysField,
      { key: "budget", label: "Presupuesto en anuncios", unit: "money", concept: "cpBudget", required: true },
      { ...cpcField, required: (_v, b) => b.cpcCurrent === null },
    ],
  },
  {
    id: "freeShipping",
    name: "Envío gratis desde X",
    description: "¿Cuánto tiene que subir tu ticket medio para pagar el envío?",
    fields: [
      daysField,
      { key: "threshold", label: "Envío gratis a partir de", unit: "money", concept: "cpThreshold", required: true, hint: (b) => `Tu ticket medio ahora: ${fmt.eur2(b.ticket)}` },
      { key: "shareAbove", label: "¿Qué parte de tus pedidos crees que superará el umbral?", unit: "pct", concept: "cpShareAbove", required: true, max: 100 },
      { key: "ticketUp", label: "Mejora esperada del ticket medio", unit: "pct", concept: "cpTicketUp" },
      { key: "crUp", label: "Mejora esperada de la conversión", unit: "pct", concept: "cpCrUp" },
    ],
  },
  {
    id: "gift",
    name: "Regalo o pack por compra",
    description: "¿Hasta cuánto puede costarte el regalo?",
    fields: [
      daysField,
      { key: "giftCost", label: "Coste del regalo por pedido", unit: "money", concept: "cpGiftCost", required: true },
      { key: "giftShare", label: "Parte de los pedidos que lo recibirán", unit: "pct", concept: "cpGiftShare", defaultValue: 100, max: 100, hint: "Si hay un gasto mínimo para recibirlo, pon qué parte de tus pedidos lo alcanzará." },
      { key: "crUp", label: "Mejora esperada de la conversión", unit: "pct", concept: "cpCrUp" },
      { key: "ticketUp", label: "Mejora esperada del ticket medio", unit: "pct", concept: "cpTicketUp" },
    ],
  },
  {
    id: "email",
    name: "Email a mis clientes",
    description: "¿Cuántos pedidos tiene que traer para que compense?",
    fields: [
      { key: "listSize", label: "¿A cuántos clientes escribirás?", unit: "people", concept: "cpListSize", required: true, integer: true },
      { key: "discount", label: "Descuento (opcional)", unit: "pct", concept: "cpDiscount", max: 100 },
      { key: "extraCost", label: "Coste extra", unit: "money", concept: "cpExtraCost", hint: "SMS, diseño…" },
      { key: "buyShare", label: "¿Qué parte crees que comprará?", unit: "pct", concept: "cpBuyShare", max: 100 },
    ],
  },
  {
    id: "influencer",
    name: "Influencer o colaboración",
    description: "¿Cuántos pedidos tiene que traerte?",
    fields: [
      { key: "fixedPay", label: "Pago fijo", unit: "money", concept: "cpFixedPay" },
      { key: "productCost", label: "Coste del producto que le envías", unit: "money", concept: "cpProductCost" },
      { key: "commission", label: "Comisión por venta", unit: "pct", concept: "cpCommission", max: 100 },
      { key: "codeDiscount", label: "Descuento del código", unit: "pct", concept: "cpCodeDiscount", max: 100 },
      { key: "expectedOrders", label: "Pedidos que esperas con el código (opcional)", unit: "orders", concept: "cpExpectedOrders", integer: true },
    ],
  },
]

export const templateOf = (id: TemplateId) => TEMPLATES.find((t) => t.id === id) as TemplateDef

export const isRequired = (f: FieldDef, v: Values, b: PlanBase) => (typeof f.required === "function" ? f.required(v, b) : !!f.required)

/** Valor por defecto de un campo: dato de la calculadora o valor fijo. */
export function fieldDefault(f: FieldDef, b: PlanBase): number | null {
  if (f.prefill === "cpc") return b.cpcCurrent
  return f.defaultValue ?? null
}

// ---------------------------------------------------------------------------
// Resolución numérica (bisección)
// ---------------------------------------------------------------------------

/**
 * Valor de x en [lo, hi] con f(x) = target, si f es monótona y cambia de lado en el intervalo.
 * null = no hay solución en el intervalo.
 */
export function solve(f: (x: number) => number, target: number, lo: number, hi: number): number | null {
  let a = lo
  let b = hi
  let fa = f(a) - target
  const fb = f(b) - target
  if (!Number.isFinite(fa) || !Number.isFinite(fb)) return null
  if (Math.abs(fa) < 1e-9) return a
  if (Math.abs(fb) < 1e-9) return b
  if (Math.sign(fa) === Math.sign(fb)) return null
  for (let i = 0; i < 80; i++) {
    const m = (a + b) / 2
    const fm = f(m) - target
    if (!Number.isFinite(fm)) return null
    if (Math.sign(fm) === Math.sign(fa)) {
      a = m
      fa = fm
    } else b = m
  }
  return (a + b) / 2
}

/** Máximo de una función cóncava en [lo, hi] (sección áurea). */
function maximize(f: (x: number) => number, lo: number, hi: number): { x: number; y: number } {
  const g = (Math.sqrt(5) - 1) / 2
  let a = lo
  let b = hi
  for (let i = 0; i < 120; i++) {
    const c = b - g * (b - a)
    const d = a + g * (b - a)
    if (f(c) > f(d)) b = d
    else a = c
  }
  const x = (a + b) / 2
  return { x, y: f(x) }
}

// ---------------------------------------------------------------------------
// Resultado
// ---------------------------------------------------------------------------

export interface PlanResult {
  /** Beneficio de la campaña (antes de impuestos, frente a no hacerla). null = no se puede estimar. */
  profit: number | null
  /** Caja «Para que te salga a cuenta»: la variable clave en una frase. */
  key: string
  /** Frases secundarias de la caja. */
  secondary: string[]
  /** «Con estos números no es posible salir a cuenta»: el motivo. */
  impossible: string | null
  /** Visitas, pedidos y ventas: [sin campaña, con campaña] (null = no lo estimamos). */
  figures: { visits: [number, number] | null; orders: [number, number] | null; sales: [number, number] | null }
  /** «¿De dónde sale?» */
  lines: string[]
  notes: string[]
  /** «Tu cuenta» de cada campo (por clave de concepto). */
  fieldCalc: Record<string, string[]>
  /** Para el plan de acción */
  plannedOrders: number | null
  giftOrders: number | null
  minOrders: number | null
}

const e = (v: number) => fmt.eur(v)
const e2 = (v: number) => fmt.eur2(v)
const num = (v: number) => fmt.num(v)
/** «8,7 %» (hasta 1 decimal). Los máximos se redondean hacia abajo y los mínimos hacia arriba: nunca prometemos de más. */
const pctText = (x: number) => `${Number.isInteger(x) ? fmt.num(x) : fmt.dec(x).replace(/0$/, "")} %`
const pct = (v: number) => pctText(Math.round(v * 1000) / 10)
const pctDown = (v: number) => pctText(Math.floor(v * 1000 + 1e-6) / 10)
const pctUp = (v: number) => pctText(Math.ceil(v * 1000 - 1e-6) / 10)
const e2Down = (v: number) => e2(Math.floor(v * 100 + 1e-6) / 100)
const e2Up = (v: number) => e2(Math.ceil(v * 100 - 1e-6) / 100)
const val = (v: Values, k: string, d = 0) => (v[k] === null || v[k] === undefined || !Number.isFinite(v[k] as number) ? d : (v[k] as number))
const signed = (v: number) => `${v >= 0 ? "+" : "−"}${e(Math.abs(v))}`

/**
 * Calcula una plantilla. `values` ya trae los valores efectivos (los del usuario o los
 * precargados); `target` es el objetivo de beneficio (0 = no perder dinero).
 */
export function computePlan(id: TemplateId, v: Values, b: PlanBase, days: number, target: number, inverse: boolean): PlanResult {
  const D = Math.max(1, Math.round(days))
  const M = b.margin
  const T = b.ticket
  const O = b.ordersDay
  const V = b.visitsDay
  const goal = inverse ? target : 0
  const goalText = inverse && target !== 0 ? `Para ganar ${e(target)}, ` : ""
  const cap = (s: string) => (goalText ? s.charAt(0).toLowerCase() + s.slice(1) : s)
  const base = { visits: D * V, orders: D * O, sales: D * O * b.revenuePerOrder }
  const out: PlanResult = {
    profit: null,
    key: "",
    secondary: [],
    impossible: null,
    figures: { visits: null, orders: null, sales: null },
    lines: [],
    notes: [],
    fieldCalc: {},
    plannedOrders: null,
    giftOrders: null,
    minOrders: null,
  }
  const baseLines = [
    `Un día normal (${b.periodText}): ${num(V)} visitas, ${num(O)} pedidos (conversión ${fmt.conv(b.cr)})`,
    `Margen por pedido antes de marketing: ${e2(M)} · ticket medio ${e2(T)}`,
  ]
  out.fieldCalc.cpDays = [`${num(D)} días de campaña`]
  if (b.cpcCurrent !== null) out.fieldCalc.cpCpc = [`${e(b.adSpend)} ÷ ${num(b.adVisits)} visitas de anuncios = ${e2(b.cpcCurrent)} por visita`]
  else out.fieldCalc.cpCpc = ["Sin tus visitas de anuncios (paso 2 de la calculadora) no podemos calcularlo: ponlo tú"]

  switch (id) {
    // -------------------------------------------------------------------
    case "discount": {
      const d = val(v, "discount") / 100
      const u = val(v, "discountShare", 100) / 100
      const B = val(v, "budget")
      const c = val(v, "cpc")
      const vu = val(v, "visitsUp") / 100
      const k = val(v, "crUp") / 100
      const X = val(v, "otherCosts")
      const extraDay = (cpc: number) => extraPaidVisitsDay(b, B / D, cpc)
      const P = (dd: number, vv = vu, cc = c) => {
        const visits = V * (1 + vv) + extraDay(cc)
        const orders = visits * b.cr * (1 + k)
        return D * orders * (M - T * dd * u) - B - X - D * O * M
      }
      const visitsDay = V * (1 + vu) + extraDay(c)
      const ordersDay = visitsDay * b.cr * (1 + k)
      const mDisc = M - T * d * u
      out.profit = P(d)
      out.plannedOrders = D * ordersDay
      out.figures = {
        visits: [base.visits, D * visitsDay],
        orders: [base.orders, D * ordersDay],
        sales: [base.sales, D * ordersDay * (b.revenuePerOrder - T * d * u)],
      }
      if (mDisc <= 0) out.impossible = `Con un descuento del ${pct(d)} pierdes dinero en cada pedido: el descuento (${e2(T * d * u)} por pedido) es mayor que tu margen (${e2(M)}).`
      // Variable clave: descuento máximo
      const p0 = P(0)
      if (p0 < goal) {
        out.key = `${goalText}${cap(`Ni sin descuento te saldría a cuenta: los anuncios y los costes extra (${e(B + X)}) cuestan más de lo que dejan las visitas extra.`)}`
      } else {
        const dMax = solve((x) => P(x), goal, 0, 1)
        if (dMax === null) out.key = `${goalText}${cap("Te sale a cuenta con cualquier descuento.")}`
        else if (dMax < 0.0005)
          out.key = `${goalText}${cap("Sin más visitas ni más conversión, cualquier descuento te hace perder dinero: los pedidos que tendrías igual también se lo llevan.")}`
        else out.key = `${goalText}${cap(`Tu descuento no puede pasar del ${pctDown(dMax)}.`)}`
      }
      // Secundarias: visitas extra necesarias y coste por clic máximo
      if (mDisc > 0 && P(d) < goal) {
        const need = solve((x) => P(d, x), goal, vu, 20)
        out.secondary.push(
          need === null
            ? `Con un descuento del ${pct(d)}, ni con 20 veces más visitas lo conseguirías.`
            : `Con un descuento del ${pct(d)}, necesitas al menos un ${pctUp(need)} más de visitas de lo normal esos días (unas ${num(Math.ceil(D * V * need))} visitas más).`,
        )
      }
      if (B > 0 && c > 0) {
        const cMax = solve((x) => P(d, vu, x), goal, 0.0001, 1000)
        if (cMax !== null) out.secondary.push(`Con tu presupuesto, cada clic tiene que costarte menos de ${e2Down(cMax)}.`)
      }
      if (d > 0) out.notes.push(`De esos pedidos, unos ${num(base.orders)} los habrías tenido igual sin campaña: también se llevan el descuento.`)
      out.lines = [
        ...baseLines,
        `Visitas al día con campaña: ${num(V)} × (1 + ${pct(vu)})${B > 0 ? ` + ${num(extraDay(c))} de anuncios extra` : ""} = ${num(visitsDay)}`,
        `Pedidos al día: ${num(visitsDay)} × ${fmt.conv(b.cr)}${k ? ` × (1 + ${pct(k)})` : ""} = ${num(ordersDay)}`,
        `Margen por pedido con descuento: ${e2(M)} − ${e2(T)} × ${pct(d)} × ${pct(u)} = ${e2(mDisc)}`,
        `Con campaña: ${num(D)} días × ${num(ordersDay)} pedidos × ${e2(mDisc)} − ${e(B)} anuncios − ${e(X)} otros costes = ${e(D * ordersDay * mDisc - B - X)}`,
        `Sin campaña: ${num(D)} días × ${num(O)} pedidos × ${e2(M)} = ${e(D * O * M)}`,
        `Diferencia: ${signed(out.profit)}`,
      ]
      out.fieldCalc.cpDiscount = [`${e2(T)} × ${pct(d)} × ${pct(u)} = ${e2(T * d * u)} menos de margen por pedido`, `Margen por pedido: ${e2(M)} → ${e2(mDisc)}`]
      out.fieldCalc.cpDiscountShare = out.fieldCalc.cpDiscount
      if (B > 0) out.fieldCalc.cpBudget = [`${e(B)} ÷ ${num(D)} días = ${e(B / D)} al día`, `Visitas extra al día: ${num(extraDay(c))}`]
      out.fieldCalc.cpVisitsUp = [`${num(V)} visitas al día × (1 + ${pct(vu)}) = ${num(V * (1 + vu))}`]
      out.fieldCalc.cpCrUp = [`Conversión: ${fmt.conv(b.cr)} × (1 + ${pct(k)}) = ${fmt.conv(b.cr * (1 + k))}`]
      break
    }
    // -------------------------------------------------------------------
    case "ads": {
      const B = val(v, "budget")
      const c = val(v, "cpc")
      const extraV = (bb: number) => D * extraPaidVisitsDay(b, bb / D, c)
      const P = (bb: number) => extraV(bb) * b.cr * M - bb
      const ev = extraV(B)
      const eo = ev * b.cr
      out.profit = P(B)
      out.plannedOrders = base.orders + eo
      out.figures = { visits: [base.visits, base.visits + ev], orders: [base.orders, base.orders + eo], sales: [base.sales, base.sales + eo * b.revenuePerOrder] }
      const breakeven = b.cr * M
      if (inverse && target > 0) {
        if (!(c > 0)) out.key = "Indica tu coste por clic para calcularlo."
        else {
          const capB = b.adSpendDay > 0 ? b.adSpendDay * D * 100 : 1e7
          const best = maximize(P, 0, capB)
          if (best.y < target)
            out.key = `Ni invirtiendo lo que más te deja (${e(best.x)}) llegarías: como mucho ganarías ${e(Math.max(0, best.y))}.`
          else {
            const need = solve(P, target, 0, best.x)
            out.key = need === null ? `No encontramos un presupuesto que te deje ${e(target)}.` : `Para ganar ${e(target)} necesitas un presupuesto de ${e(Math.ceil(need))}.`
          }
        }
      } else out.key = `Cada visita tiene que costarte menos de ${e2Down(breakeven)}.`
      if (ev > 0) {
        const avg = B / ev
        out.secondary.push(
          `Con tu presupuesto y tu coste por clic, cada visita extra te saldría de media a ${e2(avg)}${b.adSpendDay > 0 ? " (al invertir más, cada visita extra cuesta algo más)" : ""}.`,
        )
        if (avg > breakeven) out.secondary.push(`Ahora cada visita extra te costaría más de lo que deja: baja el presupuesto o el coste por clic.`)
      }
      out.lines = [
        ...baseLines,
        `Lo que deja una visita: ${fmt.conv(b.cr)} × ${e2(M)} = ${e2(breakeven)}`,
        `Visitas extra: ${num(ev)} (${num(D)} días, ${e(B)} de presupuesto, ${e2(c)} por clic)`,
        `Pedidos extra: ${num(ev)} × ${fmt.conv(b.cr)} = ${num(eo)}`,
        `${num(eo)} pedidos × ${e2(M)} − ${e(B)} = ${signed(out.profit)}`,
      ]
      out.fieldCalc.cpBudget = [`${e(B)} ÷ ${num(D)} días = ${e(B / D)} al día`, `Visitas extra: ${num(ev)}`]
      break
    }
    // -------------------------------------------------------------------
    case "freeShipping": {
      const s = val(v, "shareAbove") / 100
      const t = val(v, "ticketUp") / 100
      const k = val(v, "crUp") / 100
      const S = b.shipChargedPerOrder
      const mt = b.marginPerTicketEuro
      const mNew = (tt: number) => M - s * S + T * tt * mt
      const P = (tt: number) => D * (O * (1 + k) * mNew(tt) - O * M)
      const ordersC = D * O * (1 + k)
      out.profit = P(t)
      out.plannedOrders = ordersC
      out.figures = {
        visits: [base.visits, base.visits],
        orders: [base.orders, ordersC],
        sales: [base.sales, ordersC * (b.revenuePerOrder - s * S + T * t * b.revenuePerTicketEuro)],
      }
      if (P(0) >= goal) out.key = `${goalText}${cap("Con tus supuestos ya te sale a cuenta: no necesitas que suba el ticket medio.")}`
      else {
        const need = solve(P, goal, 0, 5)
        out.key =
          need === null
            ? `${goalText}${cap("Ni con un ticket medio seis veces mayor te saldría a cuenta.")}`
            : `${goalText}${cap(`Tu ticket medio tiene que subir al menos un ${pctUp(need)}: de ${e2(T)} a ${e2Up(T * (1 + need))}.`)}`
      }
      if (S <= 0) out.notes.push("Ahora no cobras envíos (o no lo has indicado en la calculadora): el envío gratis no te quita ingresos en esta cuenta.")
      const thr = val(v, "threshold")
      if (thr > 0 && thr <= T) out.notes.push(`Tu umbral (${e2(thr)}) está por debajo de tu ticket medio (${e2(T)}): la mayoría de tus pedidos ya lo superan.`)
      out.lines = [
        ...baseLines,
        `Envío que cobras de media por pedido: ${e2(S)}`,
        `Margen por pedido: ${e2(M)} − ${pct(s)} × ${e2(S)}${t ? ` + ${e2(T * t)} de ticket × ${pct(mt)}` : ""} = ${e2(mNew(t))}`,
        `Con campaña: ${num(ordersC)} pedidos × ${e2(mNew(t))} = ${e(ordersC * mNew(t))}`,
        `Sin campaña: ${num(base.orders)} pedidos × ${e2(M)} = ${e(base.orders * M)}`,
        `Diferencia: ${signed(out.profit)}`,
      ]
      out.fieldCalc.cpShareAbove = [`${pct(s)} de los pedidos × ${e2(S)} de envío = ${e2(s * S)} menos por pedido`]
      out.fieldCalc.cpTicketUp = [`${e2(T)} × ${pct(t)} = ${e2(T * t)} más de ticket; deja ${e2(T * t * mt)} de margen (${pct(mt)} de cada euro)`]
      out.fieldCalc.cpCrUp = [`Pedidos: ${num(base.orders)} × (1 + ${pct(k)}) = ${num(ordersC)}`]
      break
    }
    // -------------------------------------------------------------------
    case "gift": {
      const g = val(v, "giftCost")
      const s = val(v, "giftShare", 100) / 100
      const k = val(v, "crUp") / 100
      const t = val(v, "ticketUp") / 100
      const mt = b.marginPerTicketEuro
      const m = (gg: number, tt = t) => M - s * gg + T * tt * mt
      const P = (gg: number, kk = k) => D * (O * (1 + kk) * m(gg) - O * M)
      const ordersC = D * O * (1 + k)
      out.profit = P(g)
      out.plannedOrders = ordersC
      out.giftOrders = ordersC * s
      out.figures = {
        visits: [base.visits, base.visits],
        orders: [base.orders, ordersC],
        sales: [base.sales, ordersC * (b.revenuePerOrder + T * t * b.revenuePerTicketEuro)],
      }
      if (m(g) <= 0) out.impossible = `Con un regalo de ${e2(g)} por pedido pierdes dinero en cada pedido: cuesta más que tu margen (${e2(M)}).`
      // Coste máximo del regalo (con las mejoras indicadas)
      if (P(0) < goal) out.key = `${goalText}${cap("Ni con un regalo gratis te saldría a cuenta con estas mejoras.")}`
      else {
        const gMax = s > 0 ? solve((x) => P(x), goal, 0, M + T) : null
        if (s === 0) out.key = "Si nadie recibe el regalo, no te cuesta nada."
        else if (gMax === null || gMax < 0.005)
          out.key = `${goalText}${cap("Sin que compre más gente ni gaste más, cualquier regalo te cuesta dinero.")}`
        else out.key = `${goalText}${cap(`El regalo no puede costarte más de ${e2Down(gMax)} por pedido.`)}`
      }
      // Mejora de conversión necesaria con el coste indicado
      if (g > 0 && m(g) > 0) {
        if (P(g, 0) >= goal) out.secondary.push(`Con un regalo de ${e2(g)}, te sale a cuenta aunque no compre más gente.`)
        else {
          const need = solve((x) => P(g, x), goal, 0, 20)
          out.secondary.push(
            need === null
              ? `Con un regalo de ${e2(g)}, ni con 20 veces más compradores lo conseguirías.`
              : `Con un regalo de ${e2(g)}, necesitas que compre al menos un ${pctUp(need)} más de gente.`,
          )
        }
      }
      out.lines = [
        ...baseLines,
        `Margen por pedido: ${e2(M)} − ${pct(s)} × ${e2(g)} de regalo${t ? ` + ${e2(T * t)} de ticket × ${pct(mt)}` : ""} = ${e2(m(g))}`,
        `Con campaña: ${num(ordersC)} pedidos × ${e2(m(g))} = ${e(ordersC * m(g))}`,
        `Sin campaña: ${num(base.orders)} pedidos × ${e2(M)} = ${e(base.orders * M)}`,
        `Diferencia: ${signed(out.profit)}`,
      ]
      out.fieldCalc.cpGiftCost = [`${pct(s)} de los pedidos × ${e2(g)} = ${e2(s * g)} menos de margen por pedido`]
      out.fieldCalc.cpGiftShare = out.fieldCalc.cpGiftCost
      out.fieldCalc.cpCrUp = [`Pedidos: ${num(base.orders)} × (1 + ${pct(k)}) = ${num(ordersC)}`]
      out.fieldCalc.cpTicketUp = [`${e2(T)} × ${pct(t)} = ${e2(T * t)} más de ticket; deja ${e2(T * t * mt)} de margen`]
      break
    }
    // -------------------------------------------------------------------
    case "email": {
      const N = val(v, "listSize")
      const d = val(v, "discount") / 100
      const X = val(v, "extraCost")
      const share = v.buyShare
      const m = M - T * d
      out.notes.push("Parte de estos clientes te habría comprado igual: cuenta solo los pedidos que crees que trae el email.")
      if (m <= 0) {
        out.impossible = `Con un descuento del ${pct(d)} pierdes dinero en cada pedido: el descuento (${e2(T * d)}) es mayor que tu margen (${e2(M)}).`
        out.key = "Con estos números no es posible salir a cuenta."
      } else {
        const need = Math.max(0, Math.ceil((X + goal) / m - 1e-9))
        out.minOrders = need
        if (need === 0) out.key = `${goalText}${cap("Sin costes extra, cualquier pedido que traiga el email ya te deja dinero.")}`
        else if (N > 0 && need > N) out.key = `${goalText}${cap(`Necesitarías ${num(need)} pedidos y solo escribes a ${num(N)} clientes: ni aunque compren todos lo conseguirías.`)}`
        else out.key = `${goalText}${cap(`El email tiene que traerte al menos ${num(need)} pedidos${N > 0 ? ` (un ${pctUp(need / N)} de tu lista)` : ""}.`)}`
      }
      if (share !== null && share !== undefined && Number.isFinite(share) && N > 0) {
        const orders = (N * share) / 100
        out.profit = orders * m - X
        out.plannedOrders = orders
        out.figures = { visits: null, orders: [base.orders, base.orders + orders], sales: [base.sales, base.sales + orders * (b.revenuePerOrder - T * d)] }
        out.lines.push(`Pedidos que trae el email: ${num(N)} × ${pct(share / 100)} = ${num(orders)}`)
      }
      out.lines = [
        ...baseLines,
        `Margen por pedido del email: ${e2(M)}${d ? ` − ${e2(T)} × ${pct(d)}` : ""} = ${e2(m)}`,
        ...out.lines,
        ...(out.profit !== null ? [`${num(out.plannedOrders ?? 0)} pedidos × ${e2(m)} − ${e(X)} = ${signed(out.profit)}`] : []),
        ...(m > 0 ? [`Pedidos mínimos: (${e(X)}${goal ? ` + ${e(goal)}` : ""}) ÷ ${e2(m)} = ${num(out.minOrders ?? 0)} (redondeado hacia arriba)`] : []),
      ]
      break
    }
    // -------------------------------------------------------------------
    case "influencer": {
      const pay = val(v, "fixedPay")
      const prod = val(v, "productCost")
      const c = val(v, "commission") / 100
      const d = val(v, "codeDiscount") / 100
      const expected = v.expectedOrders
      const mc = M - T * (c + d)
      const fixed = pay + prod
      if (mc <= 0) {
        out.impossible = "Con esa comisión y ese descuento pierdes dinero en cada pedido: baja alguno de los dos."
        out.key = "Con estos números no es posible salir a cuenta."
      } else {
        const need = Math.max(0, Math.ceil((fixed + goal) / mc - 1e-9))
        out.minOrders = need
        out.key = need === 0 ? `${goalText}${cap("Sin pago fijo, cualquier pedido con el código te deja dinero.")}` : `${goalText}${cap(`El influencer tiene que traerte al menos ${num(need)} pedidos.`)}`
      }
      if (expected !== null && expected !== undefined && Number.isFinite(expected)) {
        out.profit = expected * mc - fixed
        out.plannedOrders = expected
        out.figures = { visits: null, orders: [base.orders, base.orders + expected], sales: [base.sales, base.sales + expected * (b.revenuePerOrder - T * d)] }
      }
      out.lines = [
        ...baseLines,
        `Margen por pedido con código: ${e2(M)} − ${e2(T)} × (${pct(c)} + ${pct(d)}) = ${e2(mc)}`,
        `Costes fijos: ${e(pay)} de pago + ${e(prod)} de producto = ${e(fixed)}`,
        ...(mc > 0 ? [`Pedidos mínimos: ${e(fixed)}${goal ? ` + ${e(goal)}` : ""} ÷ ${e2(mc)} = ${num(out.minOrders ?? 0)} (redondeado hacia arriba)`] : []),
        ...(out.profit !== null ? [`${num(expected as number)} pedidos × ${e2(mc)} − ${e(fixed)} = ${signed(out.profit)}`] : []),
      ]
      out.fieldCalc.cpCommission = [`${e2(T)} × ${pct(c)} = ${e2(T * c)} por pedido`]
      out.fieldCalc.cpCodeDiscount = [`${e2(T)} × ${pct(d)} = ${e2(T * d)} por pedido`]
      break
    }
  }
  // Nunca NaN ni Infinito; al céntimo (evita «−0,00» por redondeo)
  if (out.profit !== null) out.profit = Number.isFinite(out.profit) ? Math.round(out.profit * 100) / 100 + 0 : null
  return out
}

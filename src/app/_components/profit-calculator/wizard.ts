// Pasos del asistente y datos obligatorios de cada uno.
// Los datos obligatorios son los "datos clave" que ya detecta calc.ts
// (completeness.missing): aquí solo se dice en qué paso y en qué campo está cada uno.
import type { FormState } from "./form"

export type StepId = "period" | "sales" | "costs" | "adsFixed" | "variable" | "marketing" | "fixed" | "ltv"

export interface StepDef {
  id: StepId
  title: string
}

export const QUICK_STEPS: StepDef[] = [
  { id: "period", title: "Periodo" },
  { id: "sales", title: "Tus ventas" },
  { id: "costs", title: "Tus costes" },
  { id: "adsFixed", title: "Publicidad y gastos fijos" },
]

export const FULL_STEPS: StepDef[] = [
  { id: "period", title: "Periodo y estacionalidad" },
  { id: "sales", title: "Ventas y tráfico" },
  { id: "variable", title: "Lo que te cuesta cada venta" },
  { id: "marketing", title: "Marketing" },
  { id: "fixed", title: "Gastos fijos e impuestos" },
  { id: "ltv", title: "Primera compra y valor del cliente (opcional)" },
]

export const stepsFor = (quickMode: boolean) => (quickMode ? QUICK_STEPS : FULL_STEPS)

/** Dato obligatorio (uno por cada etiqueta de completeness.missing). */
export type FieldKey = "salesIncludeVat" | "grossSales" | "orders" | "cogs" | "shippingPaid" | "fixed"

interface RequiredDef {
  field: FieldKey
  /** Gasto que puede no existir: el aviso es «Si no tienes este gasto, pon 0». */
  mayBeZero: boolean
}

/** Etiqueta de calc.ts → campo del formulario. */
const REQUIRED: Record<string, RequiredDef> = {
  "Si tus ventas incluyen IVA o no": { field: "salesIncludeVat", mayBeZero: false },
  "Ventas brutas": { field: "grossSales", mayBeZero: false },
  Pedidos: { field: "orders", mayBeZero: false },
  "Coste de producto": { field: "cogs", mayBeZero: false },
  "Envíos pagados": { field: "shippingPaid", mayBeZero: true },
  "Gastos fijos": { field: "fixed", mayBeZero: true },
}

export const fieldOfLabel = (label: string): FieldKey | null => REQUIRED[label]?.field ?? null

export const MSG_REQUIRED = "Necesitamos este dato para darte tu resultado."
export const MSG_ZERO = "Si no tienes este gasto, pon 0."

export function requiredMessage(field: FieldKey) {
  const def = Object.values(REQUIRED).find((d) => d.field === field)
  return def?.mayBeZero ? MSG_ZERO : MSG_REQUIRED
}

/** Paso en el que se rellena cada dato obligatorio. */
export function stepOfField(field: FieldKey, quickMode: boolean): StepId {
  switch (field) {
    case "salesIncludeVat":
    case "grossSales":
    case "orders":
      return "sales"
    case "cogs":
    case "shippingPaid":
      return quickMode ? "costs" : "variable"
    case "fixed":
      return quickMode ? "adsFixed" : "fixed"
  }
}

/** id del elemento al que se lleva el foco para cada dato obligatorio. */
export function domIdOfField(field: FieldKey, quickMode: boolean): string {
  if (field === "fixed") return quickMode ? "pc-otherFixed" : "pc-platformCost"
  if (field === "salesIncludeVat") return "pc-vat"
  return `pc-${field}`
}

/** Al cambiar de modo, el paso equivalente en el otro modo. */
export function mapStep(id: StepId, toQuick: boolean): StepId {
  if (toQuick) {
    if (id === "variable") return "costs"
    if (id === "marketing" || id === "fixed" || id === "ltv") return "adsFixed"
    return id
  }
  if (id === "costs") return "variable"
  if (id === "adsFixed") return "marketing"
  return id
}

/** ¿Hay algo metido por el usuario (para ofrecer «Continuar donde lo dejé»)? */
export function hasUserData(f: FormState): boolean {
  if (f.salesIncludeVat !== null) return true
  const fields = [
    f.grossSales, f.orders, f.sessions, f.cogs, f.shippingPaid, f.otherFixed, f.platformCost, f.adSpendTotal,
    f.discounts, f.returns, f.shippingCharged, f.packaging, f.fees, f.feesFixedPerOrder, f.emailToolCost, f.otherMarketing, f.ownerSalary,
  ]
  return fields.some((v) => (v ?? "").trim() !== "") || f.ads.some((a) => a.spend.trim() !== "" || a.attributed.trim() !== "")
}

// Estado del formulario (strings, para permitir escribir "12," o vacío) y su
// conversión a números para el motor de cálculo.
import type { Inputs, Mode, SeasonProfile } from "./calc"

export interface AdRow {
  id: string
  name: string
  spend: string
  attributed: string
}

export interface FormState {
  quickMode: boolean
  months: 1 | 3 | 6 | 12
  endMonth: number
  profile: SeasonProfile
  customWeights: string[]
  growthPct: string

  salesIncludeVat: boolean | null // null = aún sin contestar
  vatPct: string

  grossSales: string
  discounts: string
  returns: string
  shippingCharged: string
  orders: string
  sessions: string
  newCustomers: string
  returningCustomers: string

  cogsMode: Mode
  cogs: string
  shippingPaid: string
  packaging: string
  feesMode: Mode
  fees: string
  feesFixedPerOrder: string
  returnCosts: string

  ads: AdRow[]
  adSpendTotal: string // modo rápido
  emailToolCost: string
  emailAttributed: string
  otherMarketing: string

  platformCost: string
  otherFixed: string
  ownerSalary: string
  ownerHours: string
  profitTaxPct: string

  ltvEnabled: boolean
  ltvFrequency: string

  firstOrderAov: string
  welcomeDiscountPct: string

  croUpliftPct: string
}

/** Acepta formato español ("1.234,56") y simple ("1234.56"). */
export function parseNum(raw: string): number | null {
  if (raw === undefined || raw === null) return null
  let s = String(raw).trim().replace(/[€%\s]/g, "")
  if (s === "" || s === "-" || !/^-?[\d.,]*\d[\d.,]*$/.test(s)) return null
  const lastComma = s.lastIndexOf(",")
  const lastDot = s.lastIndexOf(".")
  const commas = (s.match(/,/g) || []).length
  const dots = (s.match(/\./g) || []).length
  if (commas && dots) {
    // Ambos separadores: el último es el decimal ("1.234,56" o "1,234.56")
    s = lastComma > lastDot ? s.replace(/\./g, "").replace(",", ".") : s.replace(/,/g, "")
  } else if (commas > 1) {
    s = s.replace(/,/g, "") // "1,234,567" → miles en formato inglés
  } else if (commas === 1) {
    s = s.replace(",", ".") // "1234,56" → decimal en formato español
  } else if (dots > 1 || /^-?\d{1,3}(\.\d{3})+$/.test(s)) {
    s = s.replace(/\./g, "") // "1.234" o "1.234.567" → miles en formato español
  }
  const v = Number(s)
  return isFinite(v) ? v : null
}

export function toInputs(f: FormState): Inputs {
  return {
    quickMode: f.quickMode,
    months: f.months,
    endMonth: f.endMonth,
    profile: f.profile,
    customWeights: f.customWeights.map((w) => parseNum(w) ?? 0),
    growthPct: parseNum(f.growthPct),
    salesIncludeVat: f.salesIncludeVat,
    vatPct: parseNum(f.vatPct),
    grossSales: parseNum(f.grossSales),
    discounts: parseNum(f.discounts),
    returns: parseNum(f.returns),
    shippingCharged: parseNum(f.shippingCharged),
    orders: parseNum(f.orders),
    sessions: parseNum(f.sessions),
    newCustomers: parseNum(f.newCustomers),
    returningCustomers: parseNum(f.returningCustomers),
    cogsMode: f.cogsMode,
    cogs: parseNum(f.cogs),
    shippingPaid: parseNum(f.shippingPaid),
    packaging: parseNum(f.packaging),
    feesMode: f.feesMode,
    fees: parseNum(f.fees),
    feesFixedPerOrder: parseNum(f.feesFixedPerOrder),
    returnCosts: parseNum(f.returnCosts),
    ads: f.ads.map((a) => ({ id: a.id, name: a.name, spend: parseNum(a.spend), attributed: parseNum(a.attributed) })),
    adSpendTotal: parseNum(f.adSpendTotal),
    emailToolCost: parseNum(f.emailToolCost),
    emailAttributed: parseNum(f.emailAttributed),
    otherMarketing: parseNum(f.otherMarketing),
    platformCost: parseNum(f.platformCost),
    otherFixed: parseNum(f.otherFixed),
    ownerSalary: parseNum(f.ownerSalary),
    ownerHours: parseNum(f.ownerHours),
    profitTaxPct: parseNum(f.profitTaxPct),
    ltvEnabled: f.ltvEnabled,
    ltvFrequency: parseNum(f.ltvFrequency),
    firstOrderAov: parseNum(f.firstOrderAov ?? ""),
    welcomeDiscountPct: parseNum(f.welcomeDiscountPct ?? ""),
    croUpliftPct: parseNum(f.croUpliftPct),
  }
}

function lastFullMonth(): number {
  const now = new Date()
  return (now.getMonth() + 11) % 12
}

const DEFAULT_ADS: AdRow[] = [
  { id: "meta", name: "Meta Ads", spend: "", attributed: "" },
  { id: "google", name: "Google Ads", spend: "", attributed: "" },
  { id: "tiktok", name: "TikTok Ads", spend: "", attributed: "" },
]

export function emptyForm(): FormState {
  return {
    quickMode: false,
    months: 3,
    endMonth: lastFullMonth(),
    profile: "flat",
    customWeights: Array(12).fill("1"),
    growthPct: "0",
    salesIncludeVat: null,
    vatPct: "21",
    grossSales: "",
    discounts: "",
    returns: "",
    shippingCharged: "",
    orders: "",
    sessions: "",
    newCustomers: "",
    returningCustomers: "",
    cogsMode: "pct",
    cogs: "",
    shippingPaid: "",
    packaging: "",
    feesMode: "pct",
    fees: "",
    feesFixedPerOrder: "",
    returnCosts: "",
    ads: DEFAULT_ADS.map((a) => ({ ...a })),
    adSpendTotal: "",
    emailToolCost: "",
    emailAttributed: "",
    otherMarketing: "",
    platformCost: "",
    otherFixed: "",
    ownerSalary: "",
    ownerHours: "",
    profitTaxPct: "0",
    ltvEnabled: false,
    ltvFrequency: "",
    firstOrderAov: "",
    welcomeDiscountPct: "",
    croUpliftPct: "20",
  }
}

/** Tienda ficticia para que la página muestre algo desde el primer segundo. */
export function exampleForm(): FormState {
  return {
    ...emptyForm(),
    quickMode: false,
    months: 3,
    endMonth: 8, // septiembre
    profile: "xmas",
    salesIncludeVat: false,
    grossSales: "48000",
    discounts: "3600",
    returns: "1900",
    shippingCharged: "2100",
    orders: "820",
    sessions: "41000",
    newCustomers: "610",
    returningCustomers: "160",
    cogsMode: "pct",
    cogs: "38",
    shippingPaid: "4300",
    packaging: "900",
    feesMode: "pct",
    fees: "1,4",
    feesFixedPerOrder: "0,25",
    ads: [
      { id: "meta", name: "Meta Ads", spend: "7200", attributed: "21500" },
      { id: "google", name: "Google Ads", spend: "3100", attributed: "11800" },
      { id: "tiktok", name: "TikTok Ads", spend: "1200", attributed: "1900" },
    ],
    emailToolCost: "180",
    emailAttributed: "6400",
    otherMarketing: "0",
    platformCost: "420",
    otherFixed: "4500",
    profitTaxPct: "20",
  }
}

// ---------------------------------------------------------------------------
// Guardado en el navegador (localStorage)
// ---------------------------------------------------------------------------
// v1: { form, isExample } con el formulario antiguo (sin modo rápido, sueldo,
//     horas, coste de devoluciones ni gasto total en publicidad).
// v2: { version: 2, form, isExample }.
export const STORAGE_KEY = "sw-profit-calculator-v2"
export const LEGACY_STORAGE_KEYS = ["sw-profit-calculator-v1"]

export interface Saved {
  form: FormState
  isExample: boolean
}

/** Convierte lo guardado (de cualquier versión) al formulario actual. Null si no sirve. */
export function migrateSaved(raw: unknown): Saved | null {
  if (!raw || typeof raw !== "object") return null
  const o = raw as { version?: number; form?: Partial<FormState>; isExample?: unknown }
  if (!o.form || typeof o.form !== "object") return null
  const base = emptyForm()
  const form: FormState = { ...base, ...o.form }
  // Campos que no existían en v1: se quedan vacíos (no inventamos valores).
  if (!o.version || o.version < 2) {
    form.quickMode = false
    form.returnCosts = ""
    form.adSpendTotal = ""
    form.ownerSalary = ""
    form.ownerHours = ""
  }
  if (!Array.isArray(form.ads)) form.ads = base.ads
  if (!Array.isArray(form.customWeights) || form.customWeights.length !== 12) form.customWeights = base.customWeights
  return { form, isExample: Boolean(o.isExample) }
}

/** Lee lo guardado: primero la versión actual y, si no hay, las anteriores. */
export function loadSaved(storage: Pick<Storage, "getItem">): Saved | null {
  for (const key of [STORAGE_KEY, ...LEGACY_STORAGE_KEYS]) {
    const raw = storage.getItem(key)
    if (!raw) continue
    try {
      const saved = migrateSaved(JSON.parse(raw))
      if (saved) return saved
    } catch {
      /* dato corrupto: probamos la siguiente versión */
    }
  }
  return null
}

export function serializeSaved(s: Saved): string {
  return JSON.stringify({ version: 2, form: s.form, isExample: s.isExample })
}

/**
 * Pasar de modo rápido a completo ("Afinar mi cálculo") sin perder nada: si el
 * gasto total en publicidad no está repartido por plataformas, se mete como una
 * fila propia.
 */
export function toFullMode(f: FormState): FormState {
  const anySpend = f.ads.some((a) => a.spend.trim() !== "")
  const ads =
    !anySpend && f.adSpendTotal.trim() !== ""
      ? [{ id: "ad-total", name: "Publicidad (total)", spend: f.adSpendTotal, attributed: "" }, ...f.ads]
      : f.ads
  return { ...f, quickMode: false, ads }
}

/** Pasar a modo rápido: el gasto en publicidad por plataformas se suma en el total. */
export function toQuickMode(f: FormState): FormState {
  const spends = f.ads.map((a) => parseNum(a.spend)).filter((v): v is number => v !== null)
  const adSpendTotal = spends.length > 0 ? String(spends.reduce((a, b) => a + Math.abs(b), 0)).replace(".", ",") : f.adSpendTotal
  return { ...f, quickMode: true, adSpendTotal }
}

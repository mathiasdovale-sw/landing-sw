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

  ads: AdRow[]
  emailToolCost: string
  emailAttributed: string
  otherMarketing: string

  platformCost: string
  otherFixed: string
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
    months: f.months,
    endMonth: f.endMonth,
    profile: f.profile,
    customWeights: f.customWeights.map((w) => parseNum(w) ?? 0),
    growthPct: parseNum(f.growthPct),
    salesIncludeVat: f.salesIncludeVat ?? false,
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
    ads: f.ads.map((a) => ({ id: a.id, name: a.name, spend: parseNum(a.spend), attributed: parseNum(a.attributed) })),
    emailToolCost: parseNum(f.emailToolCost),
    emailAttributed: parseNum(f.emailAttributed),
    otherMarketing: parseNum(f.otherMarketing),
    platformCost: parseNum(f.platformCost),
    otherFixed: parseNum(f.otherFixed),
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
    ads: DEFAULT_ADS.map((a) => ({ ...a })),
    emailToolCost: "",
    emailAttributed: "",
    otherMarketing: "",
    platformCost: "",
    otherFixed: "",
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

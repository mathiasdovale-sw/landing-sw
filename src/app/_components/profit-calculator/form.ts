// Estado del formulario (strings, para permitir escribir "12," o vacío) y su
// conversión a números para el motor de cálculo.
import { currencyInfo, fmt, isCurrency, setCurrency, type CpaMode, type CurrencyCode, type Inputs, type Mode, type SalesChannel, type SeasonProfile } from "./calc"

export interface AdRow {
  id: string
  name: string
  spend: string
  attributed: string
}

/** App que cobra un % de las ventas (fila de la lista de apps). */
export interface AppRow {
  id: string
  name: string
  pct: string
  fixed: string
}

export const SALES_CHANNELS: SalesChannel[] = ["store", "marketplace", "both"]

export interface FormState {
  currency: CurrencyCode
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
  adSessions: string // visitas que vienen de anuncios (modo completo, opcional)
  newCustomers: string

  cogsMode: Mode
  cogs: string
  shippingPaid: string
  packaging: string
  feesMode: Mode
  fees: string
  feesFixedPerOrder: string
  returnCosts: string

  salesChannel: SalesChannel
  mkSharePct: string
  mkFeePct: string
  mkFeeFixed: string
  mkFeeOnShipping: boolean
  mkOtherFees: string
  platformFeePct: string
  platformFeeFixed: string
  apps: AppRow[]

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

  // ¿Te conviene abrir tu tienda propia? (sin IVA, en la moneda elegida)
  adsDailyBudget: string
  cpaMode: CpaMode
  cpc: string
  storeCr: string
  cpaDirect: string
  storeGatewayPct: string // solo "marketplace"
  storeGatewayFixed: string
  storePlatformPct: string
  storePlatformFixed: string
  storeFixedMonthly: string
  migratePct: string
}

/**
 * Acepta "1.234,56" y "1,234.56". Si solo hay un separador y es ambiguo
 * ("12,500" / "12.500"), se interpreta según la moneda elegida: en las que usan
 * coma decimal (EUR, ARS…) "12,5" es decimal; en las de punto (MXN, PEN…) lo es "12.5".
 */
export function parseNum(raw: string): number | null {
  if (raw === undefined || raw === null) return null
  // Se queda con la cifra; alrededor solo puede haber símbolo de moneda o % ("Gs. -1.234", "S/ 20", "12 %")
  const str = String(raw).replace(/\s+/g, "").replace(/−/g, "-")
  const core = str.match(/-?[\d.,]*\d[\d.,]*/)
  if (!core || core.index === undefined) return null
  const before = str.slice(0, core.index)
  const after = str.slice(core.index + core[0].length)
  if (/\d/.test(before + after) || after.includes("-")) return null
  const signs = (before.match(/-/g) || []).length
  if (signs > 1 || (signs === 1 && core[0].startsWith("-"))) return null
  let s = signs === 1 ? `-${core[0]}` : core[0]
  const lastComma = s.lastIndexOf(",")
  const lastDot = s.lastIndexOf(".")
  const commas = (s.match(/,/g) || []).length
  const dots = (s.match(/\./g) || []).length
  // dec: separador decimal de la moneda; grp: el otro (miles)
  const dec = fmt.decimal() === "." ? "." : ","
  const grp = dec === "," ? "." : ","
  const nDec = dec === "," ? commas : dots
  const nGrp = dec === "," ? dots : commas
  if (commas && dots) {
    // Ambos separadores: el último es el decimal ("1.234,56" o "1,234.56")
    s = lastComma > lastDot ? s.replace(/\./g, "").replace(",", ".") : s.replace(/,/g, "")
  } else if (nDec > 1) {
    s = s.split(dec).join("") // "1,234,567" con coma decimal → miles
  } else if (nDec === 1) {
    s = s.replace(dec, ".") // "1234,56" → decimal
  } else if (nGrp > 1 || (dec === "," ? /^-?\d{1,3}(\.\d{3})+$/ : /^-?\d{1,3}(,\d{3})+$/).test(s)) {
    s = s.split(grp).join("") // "1.234" o "1.234.567" → miles
  } else if (nGrp === 1) {
    s = s.replace(grp, ".") // "12.5" con coma decimal: se entiende como decimal
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
    // Texto que no es un número → NaN: el simulador lo trata como dato no válido (no como vacío).
    adSessions: (f.adSessions ?? "").trim() === "" ? null : parseNum(f.adSessions) ?? NaN,
    newCustomers: parseNum(f.newCustomers),
    cogsMode: f.cogsMode,
    cogs: parseNum(f.cogs),
    shippingPaid: parseNum(f.shippingPaid),
    packaging: parseNum(f.packaging),
    feesMode: f.feesMode,
    fees: parseNum(f.fees),
    feesFixedPerOrder: parseNum(f.feesFixedPerOrder),
    returnCosts: parseNum(f.returnCosts),
    salesChannel: f.salesChannel,
    mkSharePct: parseNum(f.mkSharePct),
    mkFeePct: parseNum(f.mkFeePct),
    mkFeeFixed: parseNum(f.mkFeeFixed),
    mkFeeOnShipping: f.mkFeeOnShipping,
    mkOtherFees: parseNum(f.mkOtherFees),
    platformFeePct: parseNum(f.platformFeePct),
    platformFeeFixed: parseNum(f.platformFeeFixed),
    apps: f.apps.map((x) => ({ id: x.id, name: x.name, pct: parseNum(x.pct), fixed: parseNum(x.fixed) })),
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
    adsDailyBudget: parseNum(f.adsDailyBudget),
    cpaMode: f.cpaMode,
    cpc: parseNum(f.cpc),
    storeCr: parseNum(f.storeCr),
    cpaDirect: parseNum(f.cpaDirect),
    storeGatewayPct: parseNum(f.storeGatewayPct),
    storeGatewayFixed: parseNum(f.storeGatewayFixed),
    storePlatformPct: parseNum(f.storePlatformPct),
    storePlatformFixed: parseNum(f.storePlatformFixed),
    storeFixedMonthly: parseNum(f.storeFixedMonthly),
    migratePct: parseNum(f.migratePct),
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

export function emptyForm(currency: CurrencyCode = "EUR"): FormState {
  return {
    currency,
    quickMode: true, // el modo rápido es el de entrada
    months: 3,
    endMonth: lastFullMonth(),
    profile: "flat",
    customWeights: Array(12).fill("1"),
    growthPct: "0",
    salesIncludeVat: null,
    vatPct: String(currencyInfo(currency).vat),
    grossSales: "",
    discounts: "",
    returns: "",
    shippingCharged: "",
    orders: "",
    sessions: "",
    adSessions: "",
    newCustomers: "",
    cogsMode: "pct",
    cogs: "",
    shippingPaid: "",
    packaging: "",
    feesMode: "pct",
    fees: "",
    feesFixedPerOrder: "",
    returnCosts: "",
    salesChannel: "store",
    mkSharePct: "",
    mkFeePct: "",
    mkFeeFixed: "",
    mkFeeOnShipping: true,
    mkOtherFees: "",
    platformFeePct: "",
    platformFeeFixed: "",
    apps: [],
    ads: DEFAULT_ADS.map((a) => ({ ...a })),
    adSpendTotal: "",
    emailToolCost: "",
    emailAttributed: "",
    otherMarketing: "",
    platformCost: "",
    otherFixed: "",
    ownerSalary: "",
    ownerHours: "",
    profitTaxPct: "", // vacío = resultado antes de impuestos (cuenta como 0)
    ltvEnabled: false,
    ltvFrequency: "",
    firstOrderAov: "",
    welcomeDiscountPct: "",
    croUpliftPct: "20",
    adsDailyBudget: "",
    cpaMode: "cpc",
    cpc: "",
    storeCr: "",
    cpaDirect: "",
    storeGatewayPct: "",
    storeGatewayFixed: "",
    storePlatformPct: "",
    storePlatformFixed: "",
    storeFixedMonthly: "",
    migratePct: "",
  }
}

/** Tienda ficticia para que la página muestre algo desde el primer segundo. */
export function exampleForm(currency: CurrencyCode = "EUR"): FormState {
  const { perEur, locale } = currencyInfo(currency)
  const dec = new Intl.NumberFormat(locale).formatToParts(1.5).find((p) => p.type === "decimal")?.value ?? ","
  // Importe en euros → moneda elegida, redondeado a 3 cifras significativas
  const m = (eur: number) => {
    const v = eur * perEur
    const step = 10 ** Math.max(Math.floor(Math.log10(Math.abs(v) || 1)) - 2, -2)
    const r = Math.round(v / step) * step
    return String(Number(r.toFixed(2))).replace(".", dec)
  }
  return {
    ...emptyForm(currency),
    quickMode: false,
    months: 3,
    endMonth: 8, // septiembre
    profile: "xmas",
    salesIncludeVat: false,
    grossSales: m(48000),
    discounts: m(3600),
    returns: m(1900),
    shippingCharged: m(2100),
    orders: "820",
    sessions: "41000",
    adSessions: "24600", // 60 % de las sesiones (no cambia el resultado: solo lo usa el simulador)
    newCustomers: "610",
    cogsMode: "pct",
    cogs: "38",
    shippingPaid: m(4300),
    packaging: m(900),
    feesMode: "pct",
    fees: `1${dec}4`,
    feesFixedPerOrder: m(0.25),
    ads: [
      { id: "meta", name: "Meta Ads", spend: m(7200), attributed: m(21500) },
      { id: "google", name: "Google Ads", spend: m(3100), attributed: m(11800) },
      { id: "tiktok", name: "TikTok Ads", spend: m(1200), attributed: m(1900) },
    ],
    emailToolCost: m(180),
    emailAttributed: m(6400),
    otherMarketing: "0",
    platformCost: m(420),
    otherFixed: m(4500),
    profitTaxPct: "20",
    // Marketplace: solo cuentan si se cambia «¿Dónde vendes?» (la tienda propia los ignora)
    mkSharePct: "40",
    mkFeePct: `6${dec}5`,
    mkFeeFixed: m(0.2),
    mkFeeOnShipping: true,
    // Tienda propia (solo se ve si vende en un marketplace)
    adsDailyBudget: m(17.5),
    cpc: m(0.5),
    storeCr: `1${dec}5`,
    storeGatewayPct: `1${dec}5`,
    storeGatewayFixed: m(0.25),
    storeFixedMonthly: m(39),
    migratePct: "10",
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

/** Progreso del asistente: paso abierto y pasos que el usuario ha completado él mismo. */
export interface WizardSaved {
  step: number
  completed: string[]
}

export interface Saved {
  form: FormState
  isExample: boolean
  wizard?: WizardSaved
}

/** Convierte lo guardado (de cualquier versión) al formulario actual. Null si no sirve. */
export function migrateSaved(raw: unknown): Saved | null {
  if (!raw || typeof raw !== "object") return null
  const o = raw as { version?: number; form?: Partial<FormState>; isExample?: unknown; wizard?: Partial<WizardSaved> }
  if (!o.form || typeof o.form !== "object") return null
  const base = emptyForm()
  const form: FormState = { ...base, ...o.form }
  // Campos que ya no existen (p. ej. returningCustomers): se ignoran y no se vuelven a guardar.
  for (const k of Object.keys(form)) if (!(k in base)) delete (form as unknown as Record<string, unknown>)[k]
  // Campos que no existían en v1: se quedan vacíos (no inventamos valores).
  if (!o.version || o.version < 2) {
    form.quickMode = false
    form.returnCosts = ""
    form.adSpendTotal = ""
    form.ownerSalary = ""
    form.ownerHours = ""
  }
  if (!isCurrency(form.currency)) form.currency = base.currency
  if (!Array.isArray(form.ads)) form.ads = base.ads
  if (!SALES_CHANNELS.includes(form.salesChannel)) form.salesChannel = base.salesChannel
  if (typeof form.mkFeeOnShipping !== "boolean") form.mkFeeOnShipping = base.mkFeeOnShipping
  if (!Array.isArray(form.apps)) form.apps = base.apps
  if (form.cpaMode !== "cpc" && form.cpaMode !== "cpa") form.cpaMode = base.cpaMode
  // Campos de texto nuevos o corruptos → vacíos (los antiguos guardados no los tienen)
  for (const k of ["adSessions", "adsDailyBudget", "cpc", "storeCr", "cpaDirect", "storeGatewayPct", "storeGatewayFixed", "storePlatformPct", "storePlatformFixed", "storeFixedMonthly", "migratePct"] as const)
    if (typeof form[k] !== "string") form[k] = base[k]
  if (!Array.isArray(form.customWeights) || form.customWeights.length !== 12) form.customWeights = base.customWeights
  const w = o.wizard
  const wizard: WizardSaved | undefined =
    w && typeof w === "object"
      ? {
          step: typeof w.step === "number" && w.step >= 0 ? Math.floor(w.step) : 0,
          completed: Array.isArray(w.completed) ? w.completed.filter((x): x is string => typeof x === "string") : [],
        }
      : undefined
  return { form, isExample: Boolean(o.isExample), wizard }
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
  return JSON.stringify({ version: 2, form: s.form, isExample: s.isExample, wizard: s.wizard })
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
  const adSpendTotal = spends.length > 0 ? String(spends.reduce((a, b) => a + Math.abs(b), 0)).replace(".", fmt.decimal()) : f.adSpendTotal
  return { ...f, quickMode: true, adSpendTotal }
}

/**
 * Cambiar de moneda con datos propios: no convierte importes, pero
 * - el IVA pasa al del nuevo país, salvo que el usuario haya puesto uno distinto al propuesto;
 * - si cambia el separador decimal (EUR "12,5" ↔ MXN "12.5"), reescribe lo ya tecleado
 *   para que cada cifra conserve su valor ("12,500" en MXN es 12500, no 12,5 en COP).
 */
export function switchCurrency(f: FormState, to: CurrencyCode): FormState {
  const from = f.currency
  const decOf = (c: CurrencyCode) =>
    new Intl.NumberFormat(currencyInfo(c).locale).formatToParts(1.5).find((p) => p.type === "decimal")?.value ?? ","
  const fromDec = decOf(from)
  const toDec = decOf(to)
  let next: FormState = { ...f, currency: to }
  setCurrency(from) // parseNum lee según la moneda activa
  const prevVat = currencyInfo(from).vat
  const customVat = f.vatPct.trim() !== "" && parseNum(f.vatPct) !== prevVat
  if (fromDec !== toDec) {
    const conv = (s: string) => {
      const v = parseNum(s)
      return v === null || !/\d/.test(s) ? s : String(v).replace(".", toDec)
    }
    const out: Record<string, unknown> = { ...next }
    for (const [k, v] of Object.entries(f)) {
      if (typeof v === "string" && k !== "currency") out[k] = conv(v)
    }
    next = out as unknown as FormState
    next.customWeights = f.customWeights.map(conv)
    next.ads = f.ads.map((a) => ({ ...a, spend: conv(a.spend), attributed: conv(a.attributed) }))
    next.apps = f.apps.map((x) => ({ ...x, pct: conv(x.pct), fixed: conv(x.fixed) }))
  }
  setCurrency(to)
  return customVat ? next : { ...next, vatPct: String(currencyInfo(to).vat) }
}

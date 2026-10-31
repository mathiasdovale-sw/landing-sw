// Fechas fuertes de venta por país, para el planificador de campañas.
// Todas las fechas viven aquí. Tres tipos:
// - fija: día y mes;
// - por regla: n-ésimo día de la semana de un mes, Black Friday (viernes tras el
//   cuarto jueves de noviembre) o desplazamiento respecto a la Pascua;
// - de organizador: fecha oficial por año. Si el año no está, se usa la regla
//   habitual como aproximación y se muestra «Fecha aprox. · la confirma …».
import type { CurrencyCode } from "./calc"

export type Country = "ES" | "AR" | "MX"
export type DateSize = "grande" | "media" | "pequeña"
export type TemplateId = "discount" | "ads" | "freeShipping" | "gift" | "email" | "influencer"

/** Semanas de preparación según el tamaño de la fecha. */
export const PREP_WEEKS: Record<DateSize, number> = { grande: 6, media: 3, pequeña: 2 }

/** País de las fechas según la moneda de la calculadora (cualquier otra → España). */
export function countryOf(currency: CurrencyCode): Country {
  return currency === "ARS" ? "AR" : currency === "MXN" ? "MX" : "ES"
}

type Rule =
  /** month 1-12 */
  | { kind: "fixed"; month: number; day: number }
  /** weekday 0 = domingo … 6 = sábado; n = 1, 2, 3… o -1 (el último). offset en días. */
  | { kind: "nthWeekday"; month: number; weekday: number; n: number; offset?: number }
  /** Viernes siguiente al cuarto jueves de noviembre (regla de EE. UU.), + offset días. */
  | { kind: "blackFriday"; offset?: number }
  /** Domingo de Pascua (algoritmo de Gauss / anónimo gregoriano) + offset días. */
  | { kind: "easter"; offset: number }

interface DateDef {
  id: string
  name: string
  country: Country
  size: DateSize
  template: TemplateId
  start: Rule
  /** Días que dura (1 = un solo día). */
  days: number
  /** Fecha de organizador: oficial por año; si no está el año, `start` es la aproximación. */
  organizer?: { name: string; years: Record<number, { month: number; day: number; days: number; note?: string }> }
}

const D: DateDef[] = [
  // ---------------- España ----------------
  // Las rebajas empiezan el día habitual; la duración (14 días) es orientativa y se puede cambiar.
  { id: "es-rebajas-invierno", name: "Rebajas de enero", country: "ES", size: "grande", template: "discount", start: { kind: "fixed", month: 1, day: 7 }, days: 14 },
  { id: "es-san-valentin", name: "San Valentín", country: "ES", size: "media", template: "gift", start: { kind: "fixed", month: 2, day: 14 }, days: 1 },
  { id: "es-dia-padre", name: "Día del Padre", country: "ES", size: "media", template: "gift", start: { kind: "fixed", month: 3, day: 19 }, days: 1 },
  { id: "es-semana-santa", name: "Semana Santa", country: "ES", size: "pequeña", template: "discount", start: { kind: "easter", offset: -3 }, days: 4 },
  { id: "es-dia-madre", name: "Día de la Madre", country: "ES", size: "media", template: "gift", start: { kind: "nthWeekday", month: 5, weekday: 0, n: 1 }, days: 1 },
  { id: "es-rebajas-verano", name: "Rebajas de verano", country: "ES", size: "grande", template: "discount", start: { kind: "fixed", month: 7, day: 1 }, days: 14 },
  // Amazon anuncia la fecha cada año: sin fecha oficial, aprox. segundo martes de julio, 4 días.
  {
    id: "es-prime-day", name: "Prime Day", country: "ES", size: "media", template: "discount",
    start: { kind: "nthWeekday", month: 7, weekday: 2, n: 2 }, days: 4, organizer: { name: "Amazon", years: {} },
  },
  { id: "es-vuelta-cole", name: "Vuelta al cole", country: "ES", size: "pequeña", template: "ads", start: { kind: "fixed", month: 9, day: 1 }, days: 15 },
  { id: "es-halloween", name: "Halloween", country: "ES", size: "pequeña", template: "discount", start: { kind: "fixed", month: 10, day: 31 }, days: 1 },
  { id: "es-singles-day", name: "Singles Day", country: "ES", size: "pequeña", template: "discount", start: { kind: "fixed", month: 11, day: 11 }, days: 1 },
  { id: "es-black-friday", name: "Black Friday", country: "ES", size: "grande", template: "discount", start: { kind: "blackFriday" }, days: 1 },
  { id: "es-cyber-monday", name: "Cyber Monday", country: "ES", size: "grande", template: "discount", start: { kind: "blackFriday", offset: 3 }, days: 1 },
  { id: "es-navidad", name: "Navidad", country: "ES", size: "grande", template: "gift", start: { kind: "fixed", month: 12, day: 1 }, days: 24 },
  { id: "es-reyes", name: "Reyes", country: "ES", size: "media", template: "gift", start: { kind: "fixed", month: 1, day: 6 }, days: 1 },

  // ---------------- Argentina ----------------
  { id: "ar-vuelta-clases", name: "Vuelta a clases", country: "AR", size: "pequeña", template: "ads", start: { kind: "fixed", month: 2, day: 15 }, days: 24 }, // 15 feb – 10 mar
  { id: "ar-san-valentin", name: "San Valentín", country: "AR", size: "media", template: "gift", start: { kind: "fixed", month: 2, day: 14 }, days: 1 },
  {
    id: "ar-hot-sale", name: "Hot Sale", country: "AR", size: "grande", template: "discount",
    // Otros años: aprox. segunda semana de mayo, de lunes a miércoles.
    start: { kind: "nthWeekday", month: 5, weekday: 1, n: 2 }, days: 3,
    organizer: { name: "la CACE", years: { 2026: { month: 5, day: 11, days: 3, note: "Hot Week del 14 al 17 de mayo" } } },
  },
  { id: "ar-dia-padre", name: "Día del Padre", country: "AR", size: "media", template: "gift", start: { kind: "nthWeekday", month: 6, weekday: 0, n: 3 }, days: 1 },
  { id: "ar-dia-amigo", name: "Día del Amigo", country: "AR", size: "pequeña", template: "gift", start: { kind: "fixed", month: 7, day: 20 }, days: 1 },
  // verificar: el Día del Niño en Argentina suele ser el tercer domingo de agosto, pero algunos años se ha movido.
  { id: "ar-dia-nino", name: "Día del Niño", country: "AR", size: "media", template: "gift", start: { kind: "nthWeekday", month: 8, weekday: 0, n: 3 }, days: 1 },
  { id: "ar-dia-madre", name: "Día de la Madre", country: "AR", size: "grande", template: "gift", start: { kind: "nthWeekday", month: 10, weekday: 0, n: 3 }, days: 1 },
  {
    id: "ar-cybermonday", name: "CyberMonday", country: "AR", size: "grande", template: "discount",
    // Otros años: aprox. primera semana de noviembre, de lunes a miércoles.
    start: { kind: "nthWeekday", month: 11, weekday: 1, n: 1 }, days: 3,
    organizer: { name: "la CACE", years: { 2026: { month: 11, day: 2, days: 3 } } },
  },
  { id: "ar-black-friday", name: "Black Friday", country: "AR", size: "media", template: "discount", start: { kind: "blackFriday" }, days: 1 },
  { id: "ar-navidad", name: "Navidad y Fiestas", country: "AR", size: "grande", template: "gift", start: { kind: "fixed", month: 12, day: 1 }, days: 24 },

  // ---------------- México ----------------
  { id: "mx-reyes", name: "Día de Reyes", country: "MX", size: "media", template: "gift", start: { kind: "fixed", month: 1, day: 6 }, days: 1 },
  { id: "mx-san-valentin", name: "San Valentín", country: "MX", size: "media", template: "gift", start: { kind: "fixed", month: 2, day: 14 }, days: 1 },
  { id: "mx-dia-nino", name: "Día del Niño", country: "MX", size: "media", template: "gift", start: { kind: "fixed", month: 4, day: 30 }, days: 1 },
  { id: "mx-dia-madres", name: "Día de las Madres", country: "MX", size: "grande", template: "gift", start: { kind: "fixed", month: 5, day: 10 }, days: 1 },
  {
    id: "mx-hot-sale", name: "Hot Sale", country: "MX", size: "grande", template: "discount",
    // Otros años: aprox. última semana de mayo (desde el último lunes), 9 días.
    start: { kind: "nthWeekday", month: 5, weekday: 1, n: -1 }, days: 9,
    organizer: { name: "la AMVO", years: { 2026: { month: 5, day: 25, days: 9 } } },
  },
  { id: "mx-dia-padre", name: "Día del Padre", country: "MX", size: "media", template: "gift", start: { kind: "nthWeekday", month: 6, weekday: 0, n: 3 }, days: 1 },
  { id: "mx-regreso-clases", name: "Regreso a clases", country: "MX", size: "pequeña", template: "ads", start: { kind: "fixed", month: 8, day: 1 }, days: 31 },
  { id: "mx-fiestas-patrias", name: "Fiestas Patrias", country: "MX", size: "pequeña", template: "discount", start: { kind: "fixed", month: 9, day: 15 }, days: 2 },
  { id: "mx-dia-muertos", name: "Día de Muertos", country: "MX", size: "pequeña", template: "discount", start: { kind: "fixed", month: 11, day: 1 }, days: 2 },
  {
    id: "mx-buen-fin", name: "El Buen Fin", country: "MX", size: "grande", template: "discount",
    // Otros años: aprox. mediados de noviembre, 5 días (del viernes anterior al tercer lunes al martes).
    start: { kind: "nthWeekday", month: 11, weekday: 1, n: 3, offset: -3 }, days: 5,
    organizer: { name: "el Gobierno de México", years: { 2026: { month: 11, day: 13, days: 5 } } },
  },
  { id: "mx-navidad", name: "Navidad (Guadalupe–Reyes)", country: "MX", size: "grande", template: "gift", start: { kind: "fixed", month: 12, day: 12 }, days: 26 }, // 12 dic – 6 ene
]

// ---------------------------------------------------------------------------
// Fechas (siempre a medianoche local; sin horas para evitar saltos de horario)
// ---------------------------------------------------------------------------

export const dayStart = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
export const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)
/** Días de a hasta b (b − a), en días naturales. */
export const daysBetween = (a: Date, b: Date) => Math.round((dayStart(b).getTime() - dayStart(a).getTime()) / 86_400_000)
/** "2026-11-27" (para <input type="date"> y para guardar). */
export const toISODate = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
export function fromISODate(s: string | null | undefined): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s ?? "")
  if (!m) return null
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
  return d.getMonth() === Number(m[2]) - 1 ? d : null
}
/** "27/11" */
export const ddmm = (d: Date) => `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`

const MONTHS_ABBR = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
/** "27 nov" o "1–24 dic" o "12 dic – 6 ene" */
export function rangeText(start: Date, end: Date) {
  if (daysBetween(start, end) === 0) return `${start.getDate()} ${MONTHS_ABBR[start.getMonth()]}`
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear())
    return `${start.getDate()}–${end.getDate()} ${MONTHS_ABBR[start.getMonth()]}`
  return `${start.getDate()} ${MONTHS_ABBR[start.getMonth()]} – ${end.getDate()} ${MONTHS_ABBR[end.getMonth()]}`
}

/** Domingo de Pascua (algoritmo anónimo gregoriano). */
export function easterSunday(year: number): Date {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(year, month - 1, day)
}

/** n-ésimo `weekday` de `month` (1-12); n = -1 → el último. */
export function nthWeekday(year: number, month: number, weekday: number, n: number): Date {
  if (n > 0) {
    const first = new Date(year, month - 1, 1)
    const shift = (weekday - first.getDay() + 7) % 7
    return new Date(year, month - 1, 1 + shift + (n - 1) * 7)
  }
  const last = new Date(year, month, 0)
  const shift = (last.getDay() - weekday + 7) % 7
  return new Date(year, month - 1, last.getDate() - shift)
}

/** Black Friday: viernes siguiente al cuarto jueves de noviembre. */
export const blackFriday = (year: number) => addDays(nthWeekday(year, 11, 4, 4), 1)

function ruleDate(rule: Rule, year: number): Date {
  switch (rule.kind) {
    case "fixed":
      return new Date(year, rule.month - 1, rule.day)
    case "nthWeekday":
      return addDays(nthWeekday(year, rule.month, rule.weekday, rule.n), rule.offset ?? 0)
    case "blackFriday":
      return addDays(blackFriday(year), rule.offset ?? 0)
    case "easter":
      return addDays(easterSunday(year), rule.offset)
  }
}

export interface DateOccurrence {
  /** id de la fecha + año (único) */
  key: string
  id: string
  name: string
  country: Country
  size: DateSize
  template: TemplateId
  /** La fecha en sí (lo que se muestra). */
  start: Date
  end: Date
  /** Días de campaña (para regalos de un solo día, la semana que termina ese día). */
  campaignStart: Date
  campaignEnd: Date
  /** Fecha aproximada: el organizador aún no la ha publicado. */
  approx: boolean
  organizer: string | null
  note: string | null
}

/** Una fecha concreta de un año. */
function occurrence(def: DateDef, year: number): DateOccurrence {
  const official = def.organizer?.years[year]
  const start = official ? new Date(year, official.month - 1, official.day) : ruleDate(def.start, year)
  const days = official ? official.days : def.days
  const end = addDays(start, days - 1)
  // La gente compra los regalos antes: para un regalo de un solo día, la campaña es la semana previa.
  const giftWeek = def.template === "gift" && days === 1
  return {
    key: `${def.id}-${year}`,
    id: def.id,
    name: def.name,
    country: def.country,
    size: def.size,
    template: def.template,
    start,
    end,
    campaignStart: giftWeek ? addDays(start, -6) : start,
    campaignEnd: end,
    approx: !!def.organizer && !official,
    organizer: def.organizer?.name ?? null,
    note: official?.note ?? null,
  }
}

/** Fechas del país en los próximos 12 meses desde hoy (las que ya terminaron, no), ordenadas. */
export function upcomingDates(country: Country, today: Date): DateOccurrence[] {
  const from = dayStart(today)
  const until = addDays(from, 365)
  const y = from.getFullYear()
  const out: DateOccurrence[] = []
  for (const def of D) {
    if (def.country !== country) continue
    for (const year of [y - 1, y, y + 1]) {
      const o = occurrence(def, year)
      if (o.end >= from && o.start < until) out.push(o)
    }
  }
  return out.sort((a, b) => a.start.getTime() - b.start.getTime())
}

/** Busca una fecha por su clave (id-año), para recuperar una campaña guardada. */
export function findOccurrence(key: string | null | undefined): DateOccurrence | null {
  const m = /^(.*)-(\d{4})$/.exec(key ?? "")
  if (!m) return null
  const def = D.find((d) => d.id === m[1])
  return def ? occurrence(def, Number(m[2])) : null
}

/** Fecha de una ocurrencia por id y año (para pruebas y para el plan de acción). */
export function dateOf(id: string, year: number): DateOccurrence | null {
  const def = D.find((d) => d.id === id)
  return def ? occurrence(def, year) : null
}

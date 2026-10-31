"use client"
// Piezas de interfaz reutilizables de la calculadora.
import { createContext, useContext, useId, useState, type ReactNode } from "react"
import { AlertTriangle, ArrowRight, CheckCircle2, HelpCircle, Info, X, XCircle } from "lucide-react"
import { money, type Level } from "./calc"
import { parseNum } from "./form"
import { CONCEPTS } from "./concepts"
import type { Formulas } from "./formulas"

/** Cuentas con los números del usuario, por concepto (ver formulas.ts). */
export const FormulaContext = createContext<Formulas>({})

export const LEVEL_STYLES: Record<Level, { text: string; border: string; bg: string; label: string }> = {
  good: { text: "text-sw-success", border: "border-sw-success/40", bg: "bg-sw-success/10", label: "Bien" },
  warn: { text: "text-amber-400", border: "border-amber-400/40", bg: "bg-amber-400/10", label: "Atención" },
  bad: { text: "text-sw-danger", border: "border-sw-danger/50", bg: "bg-sw-danger/10", label: "Problema" },
  neutral: { text: "text-sw-fg-1", border: "border-sw-line-strong", bg: "bg-sw-bg-2", label: "" },
  review: { text: "text-amber-400", border: "border-amber-400/40", bg: "bg-amber-400/10", label: "Revisar datos" },
}

export function LevelIcon({ level, className = "h-4 w-4" }: { level: Level; className?: string }) {
  const s = LEVEL_STYLES[level].text
  if (level === "good") return <CheckCircle2 className={`${className} ${s}`} aria-hidden="true" />
  if (level === "warn" || level === "review") return <AlertTriangle className={`${className} ${s}`} aria-hidden="true" />
  if (level === "bad") return <XCircle className={`${className} ${s}`} aria-hidden="true" />
  return <Info className={`${className} text-sw-fg-3`} aria-hidden="true" />
}

export function StatusPill({ level }: { level: Level }) {
  if (level === "neutral") return null
  const s = LEVEL_STYLES[level]
  return (
    <span className={`inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 text-xs font-medium ${s.border} ${s.bg} ${s.text}`}>
      <LevelIcon level={level} className="h-3.5 w-3.5" />
      {s.label}
    </span>
  )
}

/**
 * Qué ayuda (?) está abierta. Compartido para que abrir una cierre la anterior.
 * Sin proveedor, cada ayuda funciona por su cuenta.
 */
const OpenHelpContext = createContext<[string | null, (id: string | null) => void] | null>(null)

export function HelpProvider({ children }: { children: ReactNode }) {
  const state = useState<string | null>(null)
  return <OpenHelpContext.Provider value={state}>{children}</OpenHelpContext.Provider>
}

/** Botón (?) que despliega qué significa un concepto y cómo se calcula. */
export function useConcept(conceptKey?: string, calcOverride?: string[] | null) {
  const shared = useContext(OpenHelpContext)
  const [localOpen, setLocalOpen] = useState(false)
  const id = useId()
  const open = shared ? shared[0] === id : localOpen
  const toggle = () => (shared ? shared[1](open ? null : id) : setLocalOpen((o) => !o))
  const formulas = useContext(FormulaContext)
  const concept = conceptKey ? CONCEPTS[conceptKey] : undefined
  const calc = calcOverride === null ? undefined : calcOverride ?? (conceptKey ? formulas[conceptKey] : undefined)
  const button = concept ? (
    <button
      type="button"
      onClick={toggle}
      aria-expanded={open}
      aria-controls={id}
      aria-label={`Qué es: ${money(concept.label)}`}
      // -m-2 + p-2 + icono 16 px = área táctil de 32×32 px sin mover el diseño
      className={`-m-2 inline-flex shrink-0 items-center justify-center rounded-full p-2 transition-colors ${
        open ? "bg-sw-secondary/10 text-sw-secondary" : "text-sw-fg-4 hover:text-sw-fg-2"
      }`}
    >
      {open ? <X className="h-4 w-4" aria-hidden="true" /> : <HelpCircle className="h-4 w-4" aria-hidden="true" />}
    </button>
  ) : null
  // Siempre montado (cerrado = altura 0) para poder animar la apertura y el cierre.
  const panel = concept ? (
    <div
      id={id}
      aria-hidden={!open}
      // inert: cerrado, su contenido no recibe foco (vía ref: React 18 no pinta bien el atributo)
      ref={(el) => {
        el?.toggleAttribute("inert", !open)
      }}
      className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none ${
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="min-h-0 overflow-hidden">
        <div className="mt-3 space-y-3 border-l-2 border-sw-secondary/50 pl-4 text-left">
          <p className="text-sm leading-relaxed text-sw-fg-2">{money(concept.what)}</p>
          {concept.how && (
            <div className="border-t border-sw-line pt-3">
              <p className="font-mono-label text-[11px] text-sw-fg-4">Cómo se calcula</p>
              <p className="mt-1 text-sm leading-relaxed text-sw-fg-1">{money(concept.how)}</p>
            </div>
          )}
          {calc && calc.length > 0 && (
            <div className="border-t border-sw-line pt-3">
              <p className="font-mono-label text-[11px] text-sw-success">Tu cuenta</p>
              <ul className="mt-1 space-y-0.5">
                {calc.map((line, i) => (
                  <li
                    key={i}
                    className={`break-words font-mono text-[13px] leading-relaxed ${i === calc.length - 1 ? "font-semibold text-sw-fg-1" : "text-sw-fg-2"}`}
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null
  return { button, panel, concept }
}

interface NumFieldProps {
  label?: string
  concept?: string
  value: string
  onChange: (v: string) => void
  suffix?: string
  placeholder?: string
  hint?: string
  integer?: boolean
  ariaLabel?: string
  /** id del input (para llevar el foco a un dato pendiente). */
  id?: string
  /** Al salir del campo (para validar solo lo que el usuario ya ha tocado). */
  onBlur?: () => void
  /** Un negativo no tiene sentido (se marca en rojo). Por defecto, sí: casi ningún campo admite negativos. */
  nonNegative?: boolean
  /** Dato obligatorio sin rellenar: aviso neutro (ámbar suave). Texto = mensaje bajo el campo. */
  missing?: boolean | string
  /** Valor no válido calculado por quien lo usa (rojo, aria-invalid); sustituye a la validación propia. */
  error?: string
  /** Aviso neutro bajo el campo (no es un error). */
  note?: string
  /** false = solo marca el borde; el aviso lo pinta quien lo use (p. ej. una fila de tabla). */
  missingNote?: boolean
  /** Más bajo, para filas de tabla (en móvil mantiene 16 px para que iOS no haga zoom). */
  compact?: boolean
}

/** Valor imposible (rojo): no es un número, o es negativo donde no puede serlo. */
export function invalidMessage(value: string, nonNegative?: boolean): string | null {
  if (value.trim() === "") return null
  const v = parseNum(value)
  if (v === null) return "Esto no es un número válido."
  if (nonNegative && v < 0) return "Tiene que ser 0 o más."
  return null
}

export function NumField({
  label,
  concept,
  value,
  onChange,
  suffix,
  placeholder,
  hint,
  integer,
  ariaLabel,
  id: idProp,
  onBlur,
  nonNegative = true,
  missing,
  error,
  note,
  missingNote = true,
  compact,
}: NumFieldProps) {
  const autoId = useId()
  const id = idProp ?? autoId
  const msgId = `${id}-msg`
  // Lo imposible (rojo) solo se avisa cuando el usuario sale del campo.
  const [blurred, setBlurred] = useState(false)
  const { button, panel, concept: c } = useConcept(concept)
  const text = label ?? money(c?.label) ?? ""
  const invalid = error ?? (blurred ? invalidMessage(value, nonNegative) : null)
  const missingText = !invalid && missing && missingNote ? (typeof missing === "string" ? missing : "Si no tienes este gasto, pon 0.") : null
  const noteText = !invalid && !missingText && note ? note : null
  return (
    <div className="min-w-0">
      {text && (
        <div className="mb-1.5 flex items-center gap-2">
          <label htmlFor={id} className="text-sm text-sw-fg-2">
            {text}
          </label>
          {button}
        </div>
      )}
      <div
        className={`flex items-stretch overflow-hidden rounded-sm border bg-sw-bg-2 transition-colors focus-within:border-sw-secondary ${
          invalid ? "border-sw-danger/70" : missing ? "border-amber-300/50" : "border-sw-line-strong"
        }`}
      >
        <input
          id={id}
          type="text"
          inputMode={integer ? "numeric" : "decimal"}
          autoComplete="off"
          value={value}
          placeholder={placeholder ?? ""}
          aria-label={ariaLabel ?? (text || undefined)}
          aria-invalid={invalid ? true : undefined}
          aria-describedby={invalid || missingText || noteText ? msgId : undefined}
          onChange={(e) => onChange(e.target.value.replace(/[^\d.,\-]/g, ""))}
          onBlur={() => {
            setBlurred(true)
            onBlur?.()
          }}
          className={`w-full min-w-0 bg-transparent text-sw-fg-1 placeholder:text-sw-fg-3 outline-none ${
            compact ? "px-2.5 py-1.5 text-base sm:py-1 sm:text-sm" : "px-3 py-2.5 text-base"
          }`}
        />
        {suffix && (
          <span className={`flex items-center border-l border-sw-line font-mono text-sw-fg-3 ${compact ? "px-2 text-xs" : "px-3 text-sm"}`}>{suffix}</span>
        )}
      </div>
      {invalid && (
        <p id={msgId} className="mt-1 text-xs text-sw-danger">
          {invalid}
        </p>
      )}
      {missingText && (
        <p id={msgId} className="mt-1 text-xs text-amber-200">
          {missingText}
        </p>
      )}
      {noteText && (
        <p id={msgId} className="mt-1 flex items-start gap-1.5 text-xs leading-relaxed text-sw-fg-2">
          <Info className="mt-px h-3.5 w-3.5 shrink-0 text-sw-fg-3" aria-hidden="true" />
          {noteText}
        </p>
      )}
      {hint && <p className="mt-1 text-xs text-sw-fg-3">{hint}</p>}
      {panel}
    </div>
  )
}

interface SegmentedProps<T extends string | number> {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
  ariaLabel: string
  size?: "sm" | "md"
  /** id del primer botón (para llevarle el foco). */
  id?: string
  /** Aviso del grupo (aria-describedby). */
  describedBy?: string
  /** Falta elegir una opción obligatoria: se resalta en ámbar. */
  invalid?: boolean
}

export function Segmented<T extends string | number>({ options, value, onChange, ariaLabel, size = "md", id, describedBy, invalid }: SegmentedProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      aria-describedby={describedBy}
      aria-invalid={invalid ? true : undefined}
      className={`flex flex-wrap gap-2 ${invalid ? "rounded-sm p-1 ring-1 ring-amber-300/60" : ""}`}
    >
      {options.map((o, i) => {
        const active = o.value === value
        return (
          <button
            key={String(o.value)}
            id={i === 0 ? id : undefined}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={`rounded-sm border outline-none transition-colors focus:ring-2 focus:ring-sw-secondary/70 ${size === "sm" ? "px-2.5 py-1 text-xs" : "px-3.5 py-2 text-sm"} ${
              active
                ? "border-sw-secondary bg-sw-secondary/15 text-sw-fg-1"
                : invalid
                  ? "border-amber-300/50 text-sw-fg-2 hover:text-sw-fg-1"
                  : "border-sw-line-strong text-sw-fg-3 hover:border-sw-fg-4 hover:text-sw-fg-1"
            }`}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

interface StepCardProps {
  id: string
  /** 0-based */
  index: number
  title: string
  /** Resumen de lo metido (solo con el paso plegado). */
  summary?: string
  /** Check verde: el usuario ha completado él mismo los datos obligatorios. */
  done?: boolean
  current: boolean
  /** Ya visitado (enlace «Editar») o aún por llegar («Abrir»). */
  visited: boolean
  onOpen: () => void
  /** Frase corta que dice qué hacer en el paso. */
  intro: string
  children: ReactNode
  /** Botón principal (Siguiente / Ver mi resultado). Sin él, el paso no tiene pie (p. ej. un resultado). */
  nextLabel?: string
  onNext?: () => void
  onBack?: () => void
}

/** Un paso del asistente: abierto (con sus campos) o plegado (con su resumen y «Editar»). */
export function StepCard({ id, index, title, summary, done, current, visited, onOpen, intro, children, nextLabel, onNext, onBack }: StepCardProps) {
  const headingId = `pc-step-${id}-title`
  return (
    <section
      id={`pc-step-${id}`}
      aria-labelledby={headingId}
      aria-current={current ? "step" : undefined}
      className={`scroll-mt-36 rounded-sm border bg-sw-bg-1 transition-colors ${current ? "border-sw-secondary/60" : "border-sw-line"}`}
    >
      <div className="flex items-center gap-3 px-4 py-4 sm:px-5">
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs ${
            done ? "border-sw-success/60 text-sw-success" : current ? "border-sw-secondary text-sw-fg-1" : "border-sw-line-strong text-sw-fg-3"
          }`}
          aria-hidden="true"
        >
          {done ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <h2 id={headingId} className={`font-semibold ${current || visited ? "text-sw-fg-1" : "text-sw-fg-2"}`}>
            <span className="sr-only">Paso {index + 1}: </span>
            {title}
            {done && <span className="sr-only"> (completado)</span>}
          </h2>
          {!current && summary && <p className="mt-0.5 truncate text-xs text-sw-fg-3">{summary}</p>}
        </div>
        {!current && (
          <button
            type="button"
            onClick={onOpen}
            aria-label={`${visited ? "Editar" : "Abrir"} paso ${index + 1}: ${title}`}
            className="min-h-11 shrink-0 rounded-sm px-3 py-2 text-sm font-semibold text-sw-secondary underline-offset-4 transition-colors hover:text-sw-fg-1 hover:underline"
          >
            {visited ? "Editar" : "Abrir"}
          </button>
        )}
      </div>
      {current && (
        <div className="border-t border-sw-line px-4 pb-5 pt-4 sm:px-5">
          <p className="mb-5 text-sm leading-relaxed text-sw-fg-1">{intro}</p>
          {children}
          {(nextLabel || onBack) && (
          <div className="mt-6 flex flex-col-reverse gap-3 border-t border-sw-line pt-4 sm:flex-row sm:items-center sm:justify-between">
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                className="min-h-11 self-start rounded-sm px-1 py-2 text-sm text-sw-fg-2 underline underline-offset-4 transition-colors hover:text-sw-fg-1"
              >
                Atrás
              </button>
            ) : (
              <span className="hidden sm:block" />
            )}
            {nextLabel && (
              <button
                type="button"
                onClick={onNext}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm bg-sw-secondary-strong px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-sw-secondary sm:w-auto"
              >
                {nextLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
          )}
        </div>
      )}
    </section>
  )
}

/** Barra «Paso X de Y · título», compartida por los dos asistentes. `badge` va delante del texto. */
export function StepProgress({ id, current, total, title, badge }: { id: string; current: number; total: number; title: string; badge?: ReactNode }) {
  const text = `Paso ${current} de ${total}`
  return (
    <div className="px-1 pt-2">
      <p id={`${id}-label`} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-sw-fg-1">
        {badge}
        <span>
          {text} · {title}
        </span>
      </p>
      <div
        role="progressbar"
        aria-labelledby={`${id}-label`}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-valuetext={`${text}: ${title}`}
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-sw-line"
      >
        <div className="h-full rounded-full bg-sw-secondary transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${(current / total) * 100}%` }} />
      </div>
    </div>
  )
}

/**
 * Tamaño de letra de un importe grande según su longitud, para que quepa en su
 * tarjeta en cualquier moneda ("4.552 €" frente a "Gs. 39.047.408").
 * sizes: clases de mayor a menor (hasta 10, 13, 16 y más caracteres).
 */
export function amountSize(text: string, sizes: readonly [string, string, string, string]) {
  const n = text.length
  return n <= 10 ? sizes[0] : n <= 13 ? sizes[1] : n <= 16 ? sizes[2] : sizes[3]
}

interface KpiProps {
  concept: string
  value: string
  level?: Level
  sub?: string
  label?: string
  /** Cuenta propia (p. ej. en la proyección); null = no mostrar cuenta */
  calc?: string[] | null
  /** Contenido bajo el subtítulo (p. ej. un enlace al dato que falta). */
  footer?: ReactNode
}

export function Kpi({ concept, value, level = "neutral", sub, label, calc, footer }: KpiProps) {
  const { button, panel, concept: c } = useConcept(concept, calc)
  const s = LEVEL_STYLES[level]
  return (
    <div className={`rounded-sm border bg-sw-bg-1 p-4 ${level === "neutral" ? "border-sw-line" : s.border}`}>
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm text-sw-fg-3">{label ?? money(c?.label)}</span>
        {button}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className={`min-w-0 break-words font-semibold tabular-nums ${amountSize(value, ["text-2xl", "text-2xl", "text-xl", "text-lg"])} ${s.text}`}>{value}</span>
        <StatusPill level={level} />
      </div>
      {sub && <p className="mt-1 text-xs text-sw-fg-4">{sub}</p>}
      {footer}
      {panel}
    </div>
  )
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 text-left text-sm text-sw-fg-2"
    >
      <span
        className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border transition-colors ${
          checked ? "border-sw-secondary bg-sw-secondary/30" : "border-sw-line-strong bg-sw-bg-2"
        }`}
      >
        <span
          className={`absolute top-[3px] h-4 w-4 rounded-full transition-all ${checked ? "left-[23px] bg-sw-secondary" : "left-[3px] bg-sw-fg-3"}`}
        />
      </span>
      {label}
    </button>
  )
}

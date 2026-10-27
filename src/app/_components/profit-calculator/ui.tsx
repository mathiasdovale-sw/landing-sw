"use client"
// Piezas de interfaz reutilizables de la calculadora.
import { createContext, useContext, useId, useState, type ReactNode } from "react"
import { AlertTriangle, CheckCircle2, ChevronDown, HelpCircle, Info, XCircle } from "lucide-react"
import type { Level } from "./calc"
import { CONCEPTS } from "./concepts"
import type { Formulas } from "./formulas"

/** Cuentas con los números del usuario, por concepto (ver formulas.ts). */
export const FormulaContext = createContext<Formulas>({})

export const LEVEL_STYLES: Record<Level, { text: string; border: string; bg: string; label: string }> = {
  good: { text: "text-sw-success", border: "border-sw-success/40", bg: "bg-sw-success/10", label: "Bien" },
  warn: { text: "text-amber-400", border: "border-amber-400/40", bg: "bg-amber-400/10", label: "Atención" },
  bad: { text: "text-sw-danger", border: "border-sw-danger/50", bg: "bg-sw-danger/10", label: "Problema" },
  neutral: { text: "text-sw-fg-1", border: "border-sw-line-strong", bg: "bg-sw-bg-2", label: "" },
}

export function LevelIcon({ level, className = "h-4 w-4" }: { level: Level; className?: string }) {
  const s = LEVEL_STYLES[level].text
  if (level === "good") return <CheckCircle2 className={`${className} ${s}`} aria-hidden="true" />
  if (level === "warn") return <AlertTriangle className={`${className} ${s}`} aria-hidden="true" />
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

/** Botón (?) que despliega qué significa un concepto y cómo se calcula. */
export function useConcept(conceptKey?: string, calcOverride?: string[] | null) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const formulas = useContext(FormulaContext)
  const concept = conceptKey ? CONCEPTS[conceptKey] : undefined
  const calc = calcOverride === null ? undefined : calcOverride ?? (conceptKey ? formulas[conceptKey] : undefined)
  const button = concept ? (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      aria-controls={id}
      aria-label={`Qué es: ${concept.label}`}
      className={`-m-1.5 inline-flex shrink-0 items-center justify-center rounded-full p-1.5 transition-colors ${
        open ? "text-sw-secondary" : "text-sw-fg-4 hover:text-sw-fg-2"
      }`}
    >
      <HelpCircle className="h-4 w-4" aria-hidden="true" />
    </button>
  ) : null
  const panel =
    concept && open ? (
      <div id={id} className="mt-2 rounded-sm border border-sw-line bg-sw-bg-0 p-3 text-sm leading-relaxed text-sw-fg-2">
        <p>{concept.what}</p>
        {concept.how && (
          <p className="mt-2 text-sw-fg-3">
            <span className="font-mono-label text-[11px] text-sw-secondary">Cómo se calcula · </span>
            {concept.how}
          </p>
        )}
        {calc && calc.length > 0 && (
          <div className="mt-3 rounded-sm border border-sw-line bg-sw-bg-2 px-3 py-2">
            <p className="font-mono-label text-[11px] text-sw-success">Tu cuenta</p>
            <ul className="mt-1 space-y-0.5">
              {calc.map((line, i) => (
                <li key={i} className="break-words font-mono text-[13px] leading-relaxed text-sw-fg-1">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        )}
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
}

export function NumField({ label, concept, value, onChange, suffix, placeholder, hint, integer, ariaLabel }: NumFieldProps) {
  const id = useId()
  const { button, panel, concept: c } = useConcept(concept)
  const text = label ?? c?.label ?? ""
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
      <div className="flex items-stretch overflow-hidden rounded-sm border border-sw-line-strong bg-sw-bg-2 transition-colors focus-within:border-sw-secondary">
        <input
          id={id}
          type="text"
          inputMode={integer ? "numeric" : "decimal"}
          autoComplete="off"
          value={value}
          placeholder={placeholder ?? "0"}
          aria-label={ariaLabel}
          onChange={(e) => onChange(e.target.value.replace(/[^\d.,\-]/g, ""))}
          className="w-full min-w-0 bg-transparent px-3 py-2.5 text-base text-sw-fg-1 placeholder:text-sw-fg-4 outline-none"
        />
        {suffix && (
          <span className="flex items-center border-l border-sw-line px-3 font-mono text-sm text-sw-fg-3">{suffix}</span>
        )}
      </div>
      {hint && <p className="mt-1 text-xs text-sw-fg-4">{hint}</p>}
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
}

export function Segmented<T extends string | number>({ options, value, onChange, ariaLabel, size = "md" }: SegmentedProps<T>) {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={String(o.value)}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={`rounded-sm border transition-colors ${size === "sm" ? "px-2.5 py-1 text-xs" : "px-3.5 py-2 text-sm"} ${
              active
                ? "border-sw-secondary bg-sw-secondary/15 text-sw-fg-1"
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

interface SectionProps {
  step: number
  title: string
  summary?: string
  done?: boolean
  open: boolean
  onToggle: () => void
  children: ReactNode
}

export function Section({ step, title, summary, done, open, onToggle, children }: SectionProps) {
  const id = useId()
  return (
    <div className={`rounded-sm border bg-sw-bg-1 transition-colors ${open ? "border-sw-line-strong" : "border-sw-line"}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center gap-3 px-4 py-4 text-left sm:px-5"
      >
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs ${
            done ? "border-sw-success/60 text-sw-success" : "border-sw-line-strong text-sw-fg-3"
          }`}
        >
          {done ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : step}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold text-sw-fg-1">{title}</span>
          {summary && <span className="mt-0.5 block truncate text-xs text-sw-fg-3">{summary}</span>}
        </span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-sw-fg-3 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open && (
        <div id={id} className="border-t border-sw-line px-4 pb-5 pt-4 sm:px-5">
          {children}
        </div>
      )}
    </div>
  )
}

interface KpiProps {
  concept: string
  value: string
  level?: Level
  sub?: string
  label?: string
  /** Cuenta propia (p. ej. en la proyección); null = no mostrar cuenta */
  calc?: string[] | null
}

export function Kpi({ concept, value, level = "neutral", sub, label, calc }: KpiProps) {
  const { button, panel, concept: c } = useConcept(concept, calc)
  const s = LEVEL_STYLES[level]
  return (
    <div className={`rounded-sm border bg-sw-bg-1 p-4 ${level === "neutral" ? "border-sw-line" : s.border}`}>
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm text-sw-fg-3">{label ?? c?.label}</span>
        {button}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className={`text-2xl font-semibold tabular-nums ${s.text}`}>{value}</span>
        <StatusPill level={level} />
      </div>
      {sub && <p className="mt-1 text-xs text-sw-fg-4">{sub}</p>}
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

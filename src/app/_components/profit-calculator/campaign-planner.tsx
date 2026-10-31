"use client"
// Planificador de campañas: «¿Me sale a cuenta esta campaña, cuánto puedo gastar y qué
// tengo que hacer para lanzarla?». El cálculo está en campaign-plan.ts (mismo modelo que
// el simulador); las fechas en campaign-dates.ts y el plan de acción en campaign-tasks.ts.
// Estado propio en localStorage (sw-campaign-planner-v1). Nada sale del navegador.
import { useContext, useEffect, useId, useMemo, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, CalendarDays, ChevronLeft, ChevronRight, Gift, Mail, Megaphone, Percent, Sparkles, Truck, Users, type LucideIcon } from "lucide-react"
import { fmt, MONTHS_LONG, type CurrencyCode, type Inputs, type Results } from "./calc"
import {
  addDays,
  countryOf,
  daysBetween,
  dayStart,
  ddmm,
  findOccurrence,
  fromISODate,
  PREP_WEEKS,
  rangeText,
  toISODate,
  upcomingDates,
  type DateOccurrence,
  type DateSize,
  type TemplateId,
} from "./campaign-dates"
import { computePlan, fieldDefault, isRequired, planBase, templateOf, TEMPLATES, type FieldDef, type PlanBase, type PlanResult, type Values } from "./campaign-plan"
import { CHANNELS, phasesFor, taskText, tasksFor, type Channel, type Phase, type TaskCtx } from "./campaign-tasks"
import { parseNum } from "./form"
import { FormulaContext, NumField, StepCard, StepProgress, Toggle } from "./ui"

const STORAGE_KEY = "sw-campaign-planner-v1"

interface PlannerState {
  stage: "home" | "wizard"
  step: number
  template: TemplateId | null
  /** Fecha del calendario elegida (id-año), si la hay */
  dateKey: string | null
  start: string
  end: string
  channels: Channel[]
  /** Solo los campos que el usuario ha escrito (el resto se toma de la calculadora o del valor por defecto). */
  values: Record<string, string>
  inverse: boolean
  target: string
  earlyAccess: boolean
  checked: string[]
}

const EMPTY: PlannerState = {
  stage: "home",
  step: 0,
  template: null,
  dateKey: null,
  start: "",
  end: "",
  channels: [],
  values: {},
  inverse: false,
  target: "",
  earlyAccess: false,
  checked: [],
}

const TEMPLATE_ICON: Record<TemplateId, LucideIcon> = {
  discount: Percent,
  ads: Megaphone,
  freeShipping: Truck,
  gift: Gift,
  email: Mail,
  influencer: Users,
}

/** Canales implícitos de cada plantilla (en «Fecha de descuentos» los elige el usuario). */
const IMPLICIT_CHANNELS: Partial<Record<TemplateId, Channel[]>> = { ads: ["ads"], email: ["email"], influencer: ["influencers"] }

const STEPS = [
  { id: "cp-campaign", title: "Tu campaña" },
  { id: "cp-numbers", title: "Los números" },
  { id: "cp-result", title: "Resultado" },
]

const MSG_REQUIRED = "Necesitamos este dato para calcular tu campaña."

function loadState(): PlannerState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    const o = JSON.parse(raw) as Partial<PlannerState>
    const s: PlannerState = { ...EMPTY, ...o }
    if (!TEMPLATES.some((t) => t.id === s.template)) return EMPTY
    if (!Array.isArray(s.channels)) s.channels = []
    if (!Array.isArray(s.checked)) s.checked = []
    if (!s.values || typeof s.values !== "object") s.values = {}
    s.step = Math.min(2, Math.max(0, Math.floor(Number(s.step) || 0)))
    return s
  } catch {
    return EMPTY
  }
}

interface Props {
  inputs: Inputs
  r: Results
  currency: CurrencyCode
  isExample: boolean
  quick: boolean
  ready: boolean
  /** Primer dato mínimo que falta (para el enlace). */
  firstMissing: string | null
  onGoToMissing: () => void
  onRefine: () => void
  onEditSessions: () => void
  onGoToCalculator: () => void
  onRequestReview: () => void
  onStartOwn: () => void
}

export default function CampaignPlanner(props: Props) {
  const { inputs, r, currency, isExample, quick, ready } = props
  return (
    <section id="planificador" aria-labelledby="cp-title" className="scroll-mt-24">
      <div className="mb-6">
        <span className="font-mono-label text-sw-fg-3">Planificador</span>
        <h2 id="cp-title" className="mt-2 font-display text-2xl text-sw-fg-1 sm:text-3xl">
          Planifica tu próxima campaña
        </h2>
        <p className="mt-3 max-w-3xl text-sw-fg-2">
          Elige una fecha o un tipo de campaña. Te decimos si te sale a cuenta, cuánto puedes gastar y qué tienes que preparar.
        </p>
      </div>
      {quick ? (
        <Blocked text="Para planificar campañas necesitamos tu margen por pedido y tus visitas. Afina tu cálculo para usarlo." action="Afinar mi cálculo" onAction={props.onRefine} />
      ) : !ready ? (
        <Blocked text="Completa tu cálculo para planificar campañas." action={props.firstMissing ? `Completar: ${props.firstMissing}` : "Ir a la calculadora"} onAction={props.onGoToMissing} />
      ) : (
        <PlannerBody {...props} inputs={inputs} r={r} currency={currency} isExample={isExample} />
      )}
    </section>
  )
}

function Blocked({ text, action, onAction }: { text: string; action: string; onAction: () => void }) {
  return (
    <div className="rounded-sm border border-sw-line bg-sw-bg-0 p-5 sm:p-6">
      <p className="text-sw-fg-2">{text}</p>
      <button
        type="button"
        onClick={onAction}
        className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-sm border border-sw-line-strong px-4 py-2.5 text-sm font-semibold text-sw-fg-1 transition-colors hover:border-sw-fg-1"
      >
        {action}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}

function PlannerBody({ inputs, r, currency, isExample, onEditSessions, onGoToCalculator, onRequestReview, onStartOwn }: Props) {
  const today = useMemo(() => dayStart(new Date()), [])
  const [s, setS] = useState<PlannerState>(EMPTY)
  const loaded = useRef(false)
  const [touched, setTouched] = useState<Set<string>>(() => new Set())
  const [attempted, setAttempted] = useState<Set<number>>(() => new Set())
  const [confirmReset, setConfirmReset] = useState(false)
  // Campaña guardada cuya fecha ya pasó (solo al recuperarla, no mientras se escriben fechas)
  const [endedOnLoad, setEndedOnLoad] = useState(false)
  const [focusReq, setFocusReq] = useState<{ scrollTo: string; focus?: string; n: number } | null>(null)

  // Recuperar la campaña guardada (solo en este navegador)
  useEffect(() => {
    const st = loadState()
    const end = fromISODate(st.end)
    setS(st)
    setEndedOnLoad(st.stage === "wizard" && !!end && end < dayStart(new Date()))
    loaded.current = true
  }, [])
  useEffect(() => {
    if (!loaded.current) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
    } catch {
      /* sin almacenamiento: seguimos sin guardar */
    }
  }, [s])

  // Scroll suave y foco tras cambiar de paso (igual que el formulario de la calculadora)
  useEffect(() => {
    if (!focusReq) return
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    const target = document.getElementById(focusReq.scrollTo)
    target?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: focusReq.focus && focusReq.focus !== focusReq.scrollTo ? "center" : "start" })
    const el = focusReq.focus ? document.getElementById(focusReq.focus) : target?.querySelector<HTMLElement>("input, select, [role=radio], button[data-autofocus]")
    el?.focus({ preventScroll: true })
  }, [focusReq])
  const request = (scrollTo: string, focus?: string) => setFocusReq({ scrollTo, focus, n: Date.now() })

  const country = countryOf(currency)
  const base = useMemo(() => planBase(inputs, r, today), [inputs, r, today])
  const occurrences = useMemo(() => upcomingDates(country, today), [country, today])
  const parentFormulas = useContext(FormulaContext)

  if (!base) {
    return (
      <Blocked
        text="Para planificar campañas necesitamos tus visitas: indica tus sesiones en el paso 2 de la calculadora."
        action="Indicar mis visitas"
        onAction={onEditSessions}
      />
    )
  }

  // ---- Datos de la campaña -------------------------------------------------
  const tpl = s.template ? templateOf(s.template) : null
  const occ = findOccurrence(s.dateKey)
  const startDate = fromISODate(s.start)
  const endDate = fromISODate(s.end)
  const days = startDate && endDate && endDate >= startDate ? daysBetween(startDate, endDate) + 1 : null
  const size: DateSize = occ?.size ?? "media"
  const channels = s.template === "discount" ? s.channels : IMPLICIT_CHANNELS[s.template ?? "discount"] ?? []

  /** Valor efectivo: lo escrito por el usuario o el precargado / por defecto. */
  const valueOf = (f: FieldDef): number | null => {
    if (f.key === "days") return days
    const raw = s.values[f.key]
    if (raw !== undefined) return raw.trim() === "" ? null : parseNum(raw)
    return fieldDefault(f, base)
  }
  const values: Values = Object.fromEntries((tpl?.fields ?? []).map((f) => [f.key, valueOf(f)]))
  const targetNum = s.inverse ? Math.max(0, parseNum(s.target) ?? 0) : 0

  // Errores del paso 2
  const fieldError = (f: FieldDef): { error?: string; missing?: string } => {
    const raw = f.key === "days" ? undefined : s.values[f.key]
    const v = values[f.key]
    if (raw !== undefined && raw.trim() !== "" && parseNum(raw) === null) return { error: "Escribe solo números." }
    if (v !== null && v < 0) return { error: "Tiene que ser 0 o más." }
    if (v !== null && f.max !== undefined && v > f.max) return { error: `No puede pasar del ${f.max} %.` }
    if (f.key === "days" && v !== null && v < 1) return { error: "La campaña dura al menos 1 día." }
    if (isRequired(f, values, base) && v === null)
      return { missing: f.prefill === "cpc" ? "Cuánto te cuesta de media cada clic en tus anuncios. Lo ves en tu plataforma de anuncios (CPC)." : MSG_REQUIRED }
    return {}
  }
  const step2Problems = (tpl?.fields ?? []).filter((f) => {
    const e = fieldError(f)
    return e.error || e.missing
  })

  // Errores del paso 1
  const step1Problem = (): { id: string; msg: string } | null => {
    if (!startDate) return { id: "cp-start", msg: "Indica cuándo empieza la campaña." }
    if (!endDate) return { id: "cp-end", msg: "Indica cuándo termina la campaña." }
    if (endDate < startDate) return { id: "cp-end", msg: "La campaña no puede terminar antes de empezar." }
    if (endDate < today) return { id: "cp-end", msg: "Esas fechas ya han pasado: elige fechas futuras." }
    return null
  }
  const p1 = step1Problem()

  const result: PlanResult | null = tpl && days && step2Problems.length === 0 ? computePlan(tpl.id, values, base, days, targetNum, s.inverse) : null
  const ended = endedOnLoad && s.stage === "wizard"

  // ---- Acciones -------------------------------------------------------------
  const update = (patch: Partial<PlannerState>) => setS((prev) => ({ ...prev, ...patch }))
  const openStep = (i: number) => {
    update({ step: i })
    request(`pc-step-${STEPS[i].id}`)
  }
  const begin = (patch: Partial<PlannerState>) => {
    setS({ ...EMPTY, stage: "wizard", step: 0, ...patch })
    setEndedOnLoad(false)
    setTouched(new Set())
    setAttempted(new Set())
    setConfirmReset(false)
    request(`pc-step-${STEPS[0].id}`)
  }
  const pickDate = (o: DateOccurrence) =>
    begin({ template: o.template, dateKey: o.key, start: toISODate(o.campaignStart), end: toISODate(o.campaignEnd) })
  const pickTemplate = (id: TemplateId) => begin({ template: id })
  const next = () => {
    if (s.step === 0) {
      if (p1) {
        setAttempted((a) => new Set(a).add(0))
        request(p1.id, p1.id)
        return
      }
      return openStep(1)
    }
    if (s.step === 1) {
      if (step2Problems.length > 0) {
        setAttempted((a) => new Set(a).add(1))
        const id = `cp-f-${step2Problems[0].key}`
        request(id, id)
        return
      }
      return openStep(2)
    }
  }
  const resetAll = () => {
    setS(EMPTY)
    setEndedOnLoad(false)
    setConfirmReset(false)
    request("planificador", "cp-home")
  }
  const askReset = () => (s.checked.length > 0 ? setConfirmReset(true) : resetAll())
  /** Tarea con enlace: abre otra plantilla con las mismas fechas. */
  const switchTemplate = (id: TemplateId) => {
    update({ template: id, values: {}, step: 1 })
    setAttempted(new Set())
    request(`pc-step-${STEPS[1].id}`)
  }
  const setValue = (key: string, raw: string) => {
    if (key === "days") {
      const n = parseNum(raw)
      if (startDate && n !== null && n >= 1) update({ end: toISODate(addDays(startDate, Math.round(n) - 1)) })
      return
    }
    update({ values: { ...s.values, [key]: raw } })
  }
  const resetValue = (key: string) => {
    const v = { ...s.values }
    delete v[key]
    update({ values: v })
  }

  const show = (key: string, step: number) => touched.has(key) || attempted.has(step)
  const touch = (key: string) => () => setTouched((t) => (t.has(key) ? t : new Set(t).add(key)))

  // «Tu cuenta» de los campos del planificador, junto a las de la calculadora
  const formulas = { ...parentFormulas, ...(result?.fieldCalc ?? {}) }

  return (
    <FormulaContext.Provider value={formulas}>
      {isExample && (
        <div className="mb-4 flex flex-col gap-2 rounded-sm border border-sw-secondary/50 bg-sw-bg-0 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
          <p className="text-sm font-semibold text-sw-fg-1">Estás viendo una tienda de ejemplo. Estos números no son tuyos.</p>
          <button
            type="button"
            onClick={onStartOwn}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-sm bg-sw-secondary-strong px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-sw-secondary"
          >
            Empezar con mis números
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {s.stage === "home" || !tpl ? (
        <Home occurrences={occurrences} today={today} weights={r.weights} profileFlat={inputs.profile === "flat"} onPickDate={pickDate} onPickTemplate={pickTemplate} />
      ) : ended ? (
        <div className="rounded-sm border border-sw-line bg-sw-bg-0 p-5 sm:p-6">
          <p className="text-lg font-semibold text-sw-fg-1">Esta campaña ya terminó. ¿Comparamos con lo que pasó?</p>
          <p className="mt-1 text-sm text-sw-fg-2">
            {tpl.name}
            {occ ? ` · ${occ.name}` : ""} · {startDate && endDate ? rangeText(startDate, endDate) : ""}. Mete en la calculadora tus datos de esos días y compáralos con el plan.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={onGoToCalculator} className={PRIMARY}>
              Ir a la calculadora
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button type="button" onClick={askReset} className={SECONDARY}>
              Planificar otra campaña
            </button>
          </div>
          {confirmReset && <ConfirmReset count={s.checked.length} onYes={resetAll} onNo={() => setConfirmReset(false)} />}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <button type="button" onClick={askReset} className="inline-flex min-h-11 items-center gap-1.5 rounded-sm px-1 text-sm text-sw-fg-2 underline underline-offset-4 hover:text-sw-fg-1">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Elegir otra fecha o campaña
            </button>
          </div>
          {confirmReset && <ConfirmReset count={s.checked.length} onYes={resetAll} onNo={() => setConfirmReset(false)} />}

          <StepProgress id="cp-progress" current={s.step + 1} total={3} title={STEPS[s.step].title} badge={<span className="rounded-sm border border-sw-line-strong px-2 py-0.5 text-xs text-sw-fg-2">{tpl.name}</span>} />

          {/* Paso 1: Tu campaña */}
          <StepCard
            id={STEPS[0].id}
            index={0}
            title={STEPS[0].title}
            summary={`${tpl.name}${startDate && endDate && days ? ` · ${rangeText(startDate, endDate)} · ${days} ${days === 1 ? "día" : "días"}` : ""}`}
            current={s.step === 0}
            visited={s.step > 0}
            onOpen={() => openStep(0)}
            intro={occ ? `Paso 1 · Revisa las fechas de ${occ.name} y elige por dónde la vas a mover.` : "Paso 1 · Elige el tipo de campaña, cuándo la harás y por dónde la vas a mover."}
            nextLabel={`Siguiente: ${STEPS[1].title}`}
            onNext={next}
          >
            <div className="space-y-5">
              <ChoiceGroup
                label="Tipo de campaña"
                options={TEMPLATES.map((t) => ({ value: t.id, label: t.name }))}
                value={tpl.id}
                onChange={(v) => update({ template: v as TemplateId, values: {} })}
              />
              {occ && (
                <p className="flex items-start gap-2 text-sm text-sw-fg-2">
                  <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-sw-secondary" aria-hidden="true" />
                  <span>
                    {occ.name}: {rangeText(occ.start, occ.end)} de {occ.start.getFullYear()}
                    {occ.approx && occ.organizer ? ` · Fecha aprox. · la confirma ${occ.organizer}` : ""}
                    {occ.note ? ` · ${occ.note}` : ""}
                    {occ.campaignStart < occ.start ? ". La gente compra los regalos antes: proponemos la semana previa." : ""}
                  </span>
                </p>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <DateField id="cp-start" label="Empieza" value={s.start} onChange={(v) => update({ start: v })} error={show("cp-start", 0) && p1?.id === "cp-start" ? p1.msg : undefined} onBlur={touch("cp-start")} />
                <DateField id="cp-end" label="Termina" value={s.end} onChange={(v) => update({ end: v })} error={show("cp-end", 0) && p1?.id === "cp-end" ? p1.msg : undefined} onBlur={touch("cp-end")} />
              </div>
              {tpl.id === "discount" && (
                <ChoiceGroup
                  label="¿Por dónde la vas a mover?"
                  hint="Elige todos los que vayas a usar: el plan de acción se adapta."
                  multiple
                  options={CHANNELS}
                  value={s.channels}
                  onChange={(v) => update({ channels: v as Channel[] })}
                />
              )}
            </div>
          </StepCard>

          {/* Paso 2: Los números */}
          <StepCard
            id={STEPS[1].id}
            index={1}
            title={STEPS[1].title}
            summary={numbersSummary(tpl.fields, values)}
            current={s.step === 1}
            visited={s.step > 1}
            onOpen={() => openStep(1)}
            intro="Paso 2 · Ya hemos puesto lo que sabemos de tu cálculo: ajusta solo lo que quieras. Las mejoras esperadas valen 0 si no las cambias."
            nextLabel={`Siguiente: ${STEPS[2].title}`}
            onNext={next}
            onBack={() => openStep(0)}
          >
            <div className="space-y-5">
              <FromCalc base={base} />
              <div className="grid gap-4 sm:grid-cols-2">
                {tpl.fields.map((f) => {
                  const err = fieldError(f)
                  const visible = show(f.key, 1)
                  const def = fieldDefault(f, base)
                  const edited = s.values[f.key] !== undefined
                  const raw = f.key === "days" ? (days !== null ? String(days) : "") : edited ? s.values[f.key] : def !== null ? fmtInput(def) : ""
                  const hint = typeof f.hint === "function" ? f.hint(base) : f.hint
                  return (
                    <div key={f.key} className="min-w-0">
                      <NumField
                        id={`cp-f-${f.key}`}
                        concept={f.concept}
                        label={isRequired(f, values, base) ? f.label : f.key === "days" ? f.label : `${f.label}${/opcional/.test(f.label) ? "" : " (opcional)"}`}
                        value={raw}
                        onChange={(v) => setValue(f.key, v)}
                        onBlur={touch(f.key)}
                        suffix={unitSuffix(f)}
                        integer={f.integer}
                        error={visible ? err.error : undefined}
                        missing={visible ? err.missing : undefined}
                        hint={hint}
                        note={f.prefill && def !== null && !edited ? "De tu cálculo: puedes cambiarlo." : undefined}
                      />
                      {f.prefill && def !== null && edited && (
                        <button type="button" onClick={() => resetValue(f.key)} className="mt-1 min-h-11 text-left text-xs text-sw-secondary underline underline-offset-2 hover:text-sw-fg-1">
                          Usar el valor de tu cálculo ({fmt.eur2(def)})
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
              {tpl.id === "discount" && (
                <details className="rounded-sm border border-sw-line bg-sw-bg-0 p-3">
                  <summary className="min-h-11 cursor-pointer py-2 text-sm font-semibold text-sw-fg-1">Opción avanzada</summary>
                  <label className="mt-2 flex min-h-11 cursor-pointer items-center gap-3 text-sm text-sw-fg-2">
                    <input type="checkbox" checked={s.earlyAccess} onChange={(e) => update({ earlyAccess: e.target.checked })} className="h-5 w-5 shrink-0 accent-sw-secondary" />
                    Haré una lista de acceso anticipado
                  </label>
                </details>
              )}
              <div className="space-y-3 border-t border-sw-line pt-4">
                <Toggle checked={s.inverse} onChange={(v) => update({ inverse: v })} label="Quiero ganar una cantidad concreta" />
                {s.inverse && (
                  <NumField id="cp-target" concept="cpTarget" label="¿Cuánto quieres ganar con esta campaña?" value={s.target} onChange={(v) => update({ target: v })} suffix={fmt.sym()} nonNegative placeholder="0" />
                )}
              </div>
            </div>
          </StepCard>

          {/* Paso 3: Resultado */}
          <StepCard
            id={STEPS[2].id}
            index={2}
            title={STEPS[2].title}
            current={s.step === 2}
            visited={false}
            onOpen={() => (step2Problems.length === 0 && !p1 ? openStep(2) : next())}
            intro={`Paso 3 · ${tpl.name}${startDate && endDate ? `, ${rangeText(startDate, endDate)}` : ""}: esto es lo que te dejaría, comparado con no hacerla.`}
          >
            {result ? (
              <ResultView result={result} inverse={s.inverse} onChange={() => openStep(1)} onReset={askReset} />
            ) : (
              <p className="text-sm text-sw-fg-2">Completa los pasos anteriores para ver el resultado.</p>
            )}
          </StepCard>

          {/* Plan de acción y CTA, debajo del resultado */}
          {s.step === 2 && result && startDate && endDate && (
            <>
              <ActionPlan
                ctx={{
                  template: tpl.id,
                  country,
                  currency,
                  channels,
                  earlyAccess: s.earlyAccess,
                  start: startDate,
                  end: endDate,
                  days: days ?? 1,
                  dateId: occ?.id ?? null,
                  plannedOrders: result.plannedOrders,
                  giftOrders: result.giftOrders,
                  minOrders: result.minOrders,
                }}
                today={today}
                size={size}
                checked={s.checked}
                onToggle={(id) => update({ checked: s.checked.includes(id) ? s.checked.filter((x) => x !== id) : [...s.checked, id] })}
                onLink={switchTemplate}
              />
              <div className="rounded-sm border border-sw-secondary/50 bg-sw-secondary/10 p-5 sm:p-6">
                <p className="text-lg font-semibold text-sw-fg-1">¿Quieres que revisemos esta campaña antes de lanzarla?</p>
                <p className="mt-1 text-sw-fg-2">15 minutos, gratis. Repasamos tus números y tu plan.</p>
                <button type="button" onClick={onRequestReview} className={`${PRIMARY} mt-4`}>
                  Pedir la revisión
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <p className="mt-2 text-xs text-sw-fg-3">Solo nos llega tu email: los números de la campaña se quedan en tu navegador.</p>
              </div>
            </>
          )}
        </div>
      )}
    </FormulaContext.Provider>
  )
}

// ---------------------------------------------------------------------------

const PRIMARY =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-sw-secondary-strong px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-sw-secondary"
const SECONDARY =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-sw-line-strong px-5 py-3 text-base font-semibold text-sw-fg-1 transition-colors hover:border-sw-fg-1"

const fmtInput = (v: number) => String(Math.round(v * 100) / 100).replace(".", fmt.decimal())

function unitSuffix(f: FieldDef) {
  switch (f.unit) {
    case "pct":
      return "%"
    case "money":
      return fmt.sym()
    case "days":
      return "días"
    case "orders":
      return "pedidos"
    case "people":
      return "clientes"
  }
}

function numbersSummary(fields: FieldDef[], v: Values) {
  const parts = fields
    .filter((f) => f.key !== "days" && v[f.key] !== null && v[f.key] !== undefined && v[f.key] !== 0)
    .slice(0, 3)
    .map((f) => `${f.label.replace(/ \(opcional\)$/, "").replace(/^¿|\?$/g, "")}: ${f.unit === "pct" ? `${fmt.dec(v[f.key] as number)} %` : f.unit === "money" ? fmt.eur2(v[f.key] as number) : fmt.num(v[f.key] as number)}`)
  return parts.length ? parts.join(" · ") : "Sin datos todavía"
}

/** Lo que el planificador toma de la calculadora, a la vista. */
function FromCalc({ base }: { base: PlanBase }) {
  return (
    <div className="rounded-sm border border-sw-line bg-sw-bg-0 p-3 text-sm">
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-sw-fg-3">De tu cálculo · {base.periodText}</p>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-4">
        <Fact label="Margen por pedido" value={fmt.eur2(base.margin)} />
        <Fact label="Ticket medio" value={fmt.eur2(base.ticket)} />
        <Fact label="Conversión" value={fmt.conv(base.cr)} />
        <Fact label="Visitas al día" value={fmt.num(base.visitsDay)} />
      </dl>
    </div>
  )
}
function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-sw-fg-3">{label}</dt>
      <dd className="font-semibold tabular-nums text-sw-fg-1">{value}</dd>
    </div>
  )
}

function DateField({ id, label, value, onChange, error, onBlur }: { id: string; label: string; value: string; onChange: (v: string) => void; error?: string; onBlur: () => void }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-sm text-sw-fg-2">
        {label}
      </label>
      <input
        id={id}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-msg` : undefined}
        className={`min-h-11 w-full rounded-sm border bg-sw-bg-2 px-3 py-2.5 text-base text-sw-fg-1 outline-none [color-scheme:dark] focus:border-sw-secondary ${error ? "border-sw-danger/70" : "border-sw-line-strong"}`}
      />
      {error && (
        <p id={`${id}-msg`} className="mt-1 text-xs text-sw-danger">
          {error}
        </p>
      )}
    </div>
  )
}

/** Opciones como fichas grandes (44 px): una (radio) o varias (casillas). */
function ChoiceGroup({
  label,
  hint,
  options,
  value,
  onChange,
  multiple,
}: {
  label: string
  hint?: string
  options: { value: string; label: string }[]
  value: string | string[]
  onChange: (v: string | string[]) => void
  multiple?: boolean
}) {
  const id = useId()
  const selected = (v: string) => (Array.isArray(value) ? value.includes(v) : value === v)
  return (
    <fieldset>
      <legend className="mb-2 text-sm text-sw-fg-2">{label}</legend>
      {hint && <p className="-mt-1 mb-2 text-xs text-sw-fg-3">{hint}</p>}
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = selected(o.value)
          return (
            <label
              key={o.value}
              className={`relative inline-flex min-h-11 cursor-pointer items-center rounded-sm border px-3.5 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sw-secondary/70 ${
                on ? "border-sw-secondary bg-sw-secondary/15 text-sw-fg-1" : "border-sw-line-strong text-sw-fg-2 hover:border-sw-fg-4 hover:text-sw-fg-1"
              }`}
            >
              <input
                type={multiple ? "checkbox" : "radio"}
                name={id}
                value={o.value}
                checked={on}
                onChange={() => {
                  if (!multiple) return onChange(o.value)
                  const arr = Array.isArray(value) ? value : []
                  onChange(on ? arr.filter((x) => x !== o.value) : [...arr, o.value])
                }}
                className="sr-only"
              />
              {o.label}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

function ConfirmReset({ count, onYes, onNo }: { count: number; onYes: () => void; onNo: () => void }) {
  return (
    <div role="alertdialog" aria-labelledby="cp-confirm" className="mt-3 rounded-sm border border-amber-300/50 bg-amber-300/10 p-4">
      <p id="cp-confirm" className="text-sm text-sw-fg-1">
        Tienes {count} {count === 1 ? "tarea marcada" : "tareas marcadas"} en el plan de acción. Si empiezas otra campaña, se borran. ¿Seguimos?
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={onYes} data-autofocus className={SECONDARY}>
          Sí, empezar otra
        </button>
        <button type="button" onClick={onNo} className="inline-flex min-h-11 items-center px-3 text-sm text-sw-fg-2 underline underline-offset-4 hover:text-sw-fg-1">
          No, seguir con esta
        </button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Inicio: calendario + plantillas
// ---------------------------------------------------------------------------

function Home({
  occurrences,
  today,
  weights,
  profileFlat,
  onPickDate,
  onPickTemplate,
}: {
  occurrences: DateOccurrence[]
  today: Date
  weights: number[]
  profileFlat: boolean
  onPickDate: (o: DateOccurrence) => void
  onPickTemplate: (id: TemplateId) => void
}) {
  const strip = useRef<HTMLUListElement>(null)
  const mean = weights.reduce((a, b) => a + b, 0) / 12
  // «Tu temporada fuerte»: el mes de la fecha pesa claramente más que la media en tu estacionalidad.
  const strong = (o: DateOccurrence) => !profileFlat && mean > 0 && weights[o.start.getMonth()] >= mean * 1.2
  const scroll = (dir: 1 | -1) => strip.current?.scrollBy({ left: dir * strip.current.clientWidth * 0.8, behavior: "smooth" })
  const byMonth: { key: string; label: string; items: DateOccurrence[] }[] = []
  for (const o of occurrences) {
    const key = `${o.start.getFullYear()}-${o.start.getMonth()}`
    const g = byMonth.find((x) => x.key === key)
    if (g) g.items.push(o)
    else byMonth.push({ key, label: `${MONTHS_LONG[o.start.getMonth()]} ${o.start.getFullYear()}`, items: [o] })
  }
  return (
    <div id="cp-home" tabIndex={-1} className="space-y-8 outline-none">
      <div>
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-sw-fg-1">Próximas fechas fuertes</h3>
          <div className="hidden gap-2 md:flex">
            <button type="button" onClick={() => scroll(-1)} aria-label="Ver fechas anteriores" className="flex h-11 w-11 items-center justify-center rounded-sm border border-sw-line-strong text-sw-fg-2 hover:text-sw-fg-1">
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="Ver más fechas" className="flex h-11 w-11 items-center justify-center rounded-sm border border-sw-line-strong text-sw-fg-2 hover:text-sw-fg-1">
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        {/* Móvil: lista vertical agrupada por mes */}
        <div className="space-y-5 md:hidden">
          {byMonth.map((g) => (
            <div key={g.key}>
              <h4 className="mb-2 text-sm font-semibold capitalize text-sw-fg-3">{g.label}</h4>
              <ul className="space-y-3">
                {g.items.map((o) => (
                  <li key={o.key}>
                    <DateCard o={o} today={today} strong={strong(o)} onPick={() => onPickDate(o)} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Escritorio: tira horizontal con scroll y flechas */}
        <ul ref={strip} className="hidden snap-x gap-3 overflow-x-auto pb-2 [scrollbar-width:thin] md:flex" aria-label="Próximas fechas fuertes">
          {occurrences.map((o) => (
            <li key={o.key} className="w-64 shrink-0 snap-start">
              <DateCard o={o} today={today} strong={strong(o)} onPick={() => onPickDate(o)} />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-sw-fg-1">O elige un tipo de campaña</h3>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((t) => {
            const Icon = TEMPLATE_ICON[t.id]
            return (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => onPickTemplate(t.id)}
                  className="flex h-full min-h-11 w-full items-start gap-3 rounded-sm border border-sw-line-strong bg-sw-bg-0 p-4 text-left transition-colors hover:border-sw-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sw-secondary/70"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sw-line-strong text-sw-secondary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-sw-fg-1">{t.name}</span>
                    <span className="mt-0.5 block text-sm text-sw-fg-3">{t.description}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function DateCard({ o, today, strong, onPick }: { o: DateOccurrence; today: Date; strong: boolean; onPick: () => void }) {
  const toDate = daysBetween(today, o.start)
  const toCampaign = daysBetween(today, o.campaignStart)
  const prep = addDays(o.campaignStart, -PREP_WEEKS[o.size] * 7)
  const late = today > prep
  const headingId = `cp-date-${o.key}`
  return (
    <article aria-labelledby={headingId} className="flex h-full flex-col rounded-sm border border-sw-line bg-sw-bg-0 p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-2">
        <h4 id={headingId} className="font-semibold text-sw-fg-1">
          {o.name}
        </h4>
        <span className="text-sm tabular-nums text-sw-fg-2">
          {rangeText(o.start, o.end)}
          {o.start.getFullYear() !== today.getFullYear() ? ` ${o.start.getFullYear()}` : ""}
        </span>
      </div>
      {o.approx && o.organizer && <p className="mt-0.5 text-xs text-sw-fg-3">Fecha aprox. · la confirma {o.organizer}</p>}
      {o.note && <p className="mt-0.5 text-xs text-sw-fg-3">{o.note}</p>}
      {strong && (
        <span className="mt-2 inline-flex w-fit items-center gap-1 rounded-sm border border-sw-success/40 bg-sw-success/10 px-2 py-0.5 text-xs font-semibold text-sw-success">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Tu temporada fuerte
        </span>
      )}
      <p className="mt-2 text-sm text-sw-fg-1">{toDate > 0 ? `Faltan ${toDate} ${toDate === 1 ? "día" : "días"}` : "Ya ha empezado"}</p>
      <p className={`mt-0.5 text-xs ${late ? "text-amber-200" : "text-sw-fg-3"}`}>
        {late
          ? toCampaign > 0
            ? `Vas justo: te quedan ${toCampaign} ${toCampaign === 1 ? "día" : "días"}. Te mostramos solo lo imprescindible.`
            : "Vas justo: la campaña ya ha empezado. Te mostramos solo lo imprescindible."
          : `Empieza a prepararla el ${ddmm(prep)}`}
      </p>
      <button
        type="button"
        onClick={onPick}
        aria-label={`Planificar esta campaña: ${o.name}`}
        className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-sm border border-sw-secondary/60 px-3 py-2 text-sm font-semibold text-sw-fg-1 transition-colors hover:bg-sw-secondary/15 md:mt-auto"
      >
        Planificar esta campaña
      </button>
    </article>
  )
}

// ---------------------------------------------------------------------------
// Resultado
// ---------------------------------------------------------------------------

function ResultView({ result, inverse, onChange, onReset }: { result: PlanResult; inverse: boolean; onChange: () => void; onReset: () => void }) {
  const p = result.profit
  const good = p !== null && p >= 0
  const f = result.figures
  const figure = (label: string, pair: [number, number] | null, money = false) => (
    <div className="rounded-sm border border-sw-line bg-sw-bg-0 p-3">
      <p className="text-xs text-sw-fg-3">{label}</p>
      {pair ? (
        <p className="mt-0.5 text-sm tabular-nums text-sw-fg-2">
          {money ? fmt.eur(pair[0]) : fmt.num(pair[0])} → <span className="font-semibold text-sw-fg-1">{money ? fmt.eur(pair[1]) : fmt.num(pair[1])}</span>
        </p>
      ) : (
        <p className="mt-0.5 text-sm text-sw-fg-3">No lo estimamos</p>
      )}
    </div>
  )
  return (
    <div className="space-y-5" aria-live="polite">
      {/* 1. Veredicto */}
      {p !== null && (
        <div className={`rounded-sm border p-4 ${good ? "border-sw-success/40 bg-sw-success/10" : "border-sw-danger/50 bg-sw-danger/10"}`}>
          <p className={`font-display text-2xl !normal-case sm:text-3xl ${good ? "text-sw-success" : "text-sw-danger"}`}>
            {good ? `Esta campaña te dejaría +${fmt.eur(p)}` : `Esta campaña te costaría ${fmt.eur(Math.abs(p))}`}
          </p>
          <p className="mt-1 text-sm text-sw-fg-2">antes de impuestos · comparado con no hacer la campaña</p>
        </div>
      )}

      {/* 2. Para que te salga a cuenta */}
      <div className="rounded-sm border border-sw-secondary/50 bg-sw-secondary/10 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-sw-fg-3">{inverse ? "Para llegar a tu objetivo" : "Para que te salga a cuenta"}</p>
        {result.impossible && (
          <>
            <p className="mt-1 font-semibold text-sw-fg-1">Con estos números no es posible salir a cuenta.</p>
            <p className="mt-1 text-sm text-sw-fg-2">{result.impossible}</p>
          </>
        )}
        {result.key && !(result.impossible && /no es posible/.test(result.key)) && <p className="mt-1 text-lg font-semibold text-sw-fg-1">{result.key}</p>}
        {result.secondary.map((t) => (
          <p key={t} className="mt-1 text-sm text-sw-fg-2">
            {t}
          </p>
        ))}
      </div>

      {/* 3. Cifras de apoyo */}
      <div className="grid gap-2 sm:grid-cols-3">
        {figure("Visitas (sin → con campaña)", f.visits)}
        {figure("Pedidos (sin → con campaña)", f.orders)}
        {figure("Ventas (sin → con campaña)", f.sales, true)}
      </div>
      {result.notes.map((t) => (
        <p key={t} className="text-sm text-sw-fg-2">
          {t}
        </p>
      ))}

      {/* 4. ¿De dónde sale? */}
      <details className="rounded-sm border border-sw-line bg-sw-bg-0 p-3">
        <summary className="min-h-11 cursor-pointer py-2 text-sm font-semibold text-sw-fg-1">¿De dónde sale?</summary>
        <p className="mt-1 font-mono-label text-[11px] text-sw-success">Tu cuenta</p>
        <ul className="mt-1 space-y-0.5">
          {result.lines.map((l, i) => (
            <li key={i} className="break-words font-mono text-[13px] leading-relaxed text-sw-fg-2">
              {l}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-sw-fg-3">
          Mismo modelo que el simulador: pedidos = visitas × conversión, la publicidad extra con rendimientos decrecientes y tus mismos márgenes. Los gastos fijos no
          cambian, así que no entran.
        </p>
      </details>

      {/* 5. Botones */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <button type="button" onClick={onChange} className={SECONDARY}>
          Cambiar los números
        </button>
        <button type="button" onClick={onReset} className="inline-flex min-h-11 items-center justify-center px-3 text-sm text-sw-fg-2 underline underline-offset-4 hover:text-sw-fg-1">
          Planificar otra campaña
        </button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Plan de acción
// ---------------------------------------------------------------------------

const PHASE_ORDER: (Phase | "now")[] = ["now", "month", "twoWeeks", "week", "day", "after"]

function ActionPlan({
  ctx,
  today,
  size,
  checked,
  onToggle,
  onLink,
}: {
  ctx: TaskCtx
  today: Date
  size: DateSize
  checked: string[]
  onToggle: (id: string) => void
  onLink: (id: TemplateId) => void
}) {
  const prepStart = addDays(ctx.start, -PREP_WEEKS[size] * 7)
  // Sin tiempo para prepararla como se recomienda: solo lo imprescindible.
  const rushed = today > prepStart
  const phases = phasesFor(ctx.start, ctx.end)
  const overdue = new Set(phases.filter((p) => (p.phase === "month" || p.phase === "twoWeeks" || p.phase === "week") && p.deadline < today).map((p) => p.phase))
  const tasks = tasksFor(ctx).filter((t) => !rushed || t.star)
  const groups = PHASE_ORDER.map((ph) => ({
    phase: ph,
    label: ph === "now" ? "Ya mismo" : phases.find((p) => p.phase === ph)?.label ?? "",
    items: tasks.filter((t) => (overdue.has(t.phase) ? "now" : t.phase) === ph),
  })).filter((g) => g.items.length > 0)
  const done = tasks.filter((t) => checked.includes(t.id)).length
  const daysLeft = daysBetween(today, ctx.start)
  return (
    <section aria-labelledby="cp-plan-title" className="rounded-sm border border-sw-line bg-sw-bg-1 p-4 sm:p-5">
      <h3 id="cp-plan-title" className="text-lg font-semibold text-sw-fg-1">
        Qué tienes que preparar
      </h3>
      {rushed && (
        <p className="mt-1 text-sm text-amber-200">
          {daysLeft > 0 ? `Vas justo: te quedan ${daysLeft} ${daysLeft === 1 ? "día" : "días"}.` : "Vas justo: la campaña ya ha empezado."} Te mostramos solo lo imprescindible.
        </p>
      )}
      <div className="mt-3">
        <p className="text-sm text-sw-fg-2" aria-live="polite">
          {done} de {tasks.length} tareas hechas
        </p>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-sw-line" aria-hidden="true">
          <div className="h-full rounded-full bg-sw-success transition-[width] duration-300" style={{ width: `${tasks.length ? (done / tasks.length) * 100 : 0}%` }} />
        </div>
      </div>
      <p className="mt-3 text-xs text-sw-fg-3">
        <span aria-hidden="true">★</span> = imprescindible. Las casillas se guardan solo en este navegador.
      </p>
      <div className="mt-4 space-y-5">
        {groups.map((g) => (
          <div key={g.phase}>
            <h4 className="text-sm font-semibold text-sw-fg-1">{g.label}</h4>
            <ul className="mt-2 divide-y divide-sw-line">
              {g.items.map((t) => {
                const on = checked.includes(t.id)
                return (
                  <li key={t.id} className="py-1">
                    <label className="flex min-h-11 cursor-pointer items-start gap-3 py-1.5">
                      <input type="checkbox" checked={on} onChange={() => onToggle(t.id)} className="mt-0.5 h-5 w-5 shrink-0 accent-sw-success" />
                      <span className={`text-sm leading-relaxed ${on ? "text-sw-fg-3 line-through" : "text-sw-fg-1"}`}>
                        {t.star && (
                          <>
                            <span aria-hidden="true" className="mr-1 text-amber-300">
                              ★
                            </span>
                            <span className="sr-only">Imprescindible: </span>
                          </>
                        )}
                        {taskText(t, ctx)}
                        <span className="ml-1 text-xs text-sw-fg-3">· {t.group}</span>
                      </span>
                    </label>
                    {t.link && (
                      <button
                        type="button"
                        onClick={() => onLink(t.link as TemplateId)}
                        className="mb-1 ml-8 inline-flex min-h-11 items-center gap-1 text-sm text-sw-secondary underline underline-offset-4 hover:text-sw-fg-1"
                      >
                        Calcularlo: {templateOf(t.link).name}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

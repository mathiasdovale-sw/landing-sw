"use client"
// Simulador de palancas: el usuario mueve indicadores y ve al instante cómo
// cambiaría su beneficio. Toda la lógica está en simulate() (calc.ts).
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react"
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Megaphone,
  MousePointerClick,
  Package,
  Percent,
  Repeat,
  RotateCcw,
  ShoppingBag,
  Sparkles,
  Truck,
  Undo2,
  Users,
  type LucideIcon,
} from "lucide-react"
import { effectiveLevers, fmt, LEVER_KEYS, leverAvailability, leverRanking, simTraffic, simulate, ZERO_LEVERS, type Inputs, type LeverBlock, type LeverKey, type Levers, type Results, type SimTraffic } from "./calc"
import type { SalesFieldId } from "./profit-calculator"
import styles from "./simulator.module.css"
import { amountSize } from "./ui"

interface LeverDef {
  key: LeverKey
  label: string
  hint: string
  icon: LucideIcon
  min: number
  max: number
  step: number
  show: (r: Results) => string
  /** Valor tras mover solo esta palanca (si no se puede leer directamente de la simulación) */
  showAfter?: (base: Results, value: number) => string
}

const share = (a: number, b: number) => (b > 0 ? a / b : null)

/** Pedidos de clientes que repiten = pedidos − clientes nuevos (mín. 0). */
const recurrentOrders = (r: Results) => r.recurrentOrders ?? 0
/** Nombre de la palanca en el aviso «Hemos puesto a 0 la palanca de…». */
const LEVER_NAME: Partial<Record<LeverKey, string>> = { ads: "publicidad", repeat: "recompra" }

/** Por qué no se puede usar la Recompra (según leverAvailability). */
const REPEAT_BLOCKED: Partial<Record<NonNullable<LeverBlock>, string>> = {
  noRepeatData: "Rellena pedidos y clientes nuevos (paso 2) para usarla",
  invalidNewCustomers: "No puede haber más clientes nuevos que pedidos: revisa el dato en el paso 2 para usarla",
  noRepeatOrders: "No tienes pedidos de clientes que repiten en este periodo, así que no hay recompra que simular.",
}

const LEVERS: LeverDef[] = [
  { key: "traffic", label: "Visitas sin publicidad", hint: "SEO, redes, email, recomendaciones…", icon: Users, min: -50, max: 100, step: 5, show: (r) => fmt.num(r.sessions) },
  { key: "conversion", label: "Tasa de conversión", hint: "Más visitas que terminan comprando", icon: MousePointerClick, min: -50, max: 100, step: 5, show: (r) => fmt.conv(r.conversionRate) },
  { key: "aov", label: "Ticket medio", hint: "Cada pedido vale más (packs, upsells…)", icon: ShoppingBag, min: -30, max: 50, step: 1, show: (r) => fmt.eur2(r.aov) },
  {
    key: "repeat",
    label: "Recompra",
    hint: "Tus clientes que repiten compran más veces (email, post-compra…)",
    icon: Repeat,
    min: -50,
    max: 100,
    step: 5,
    show: (r) => `${fmt.num(recurrentOrders(r))} pedidos de clientes que repiten`,
    showAfter: (b, v) => `${fmt.num(recurrentOrders(b) * (1 + v / 100))} pedidos de clientes que repiten`,
  },
  { key: "discounts", label: "Descuentos", hint: "Peso de los descuentos sobre las ventas", icon: Percent, min: -100, max: 100, step: 5, show: (r) => fmt.pct(r.discountPct) },
  { key: "returns", label: "Devoluciones", hint: "Peso de las devoluciones sobre las ventas", icon: Undo2, min: -100, max: 100, step: 5, show: (r) => fmt.pct(r.returnPct) },
  { key: "cogs", label: "Coste de producto", hint: "Negociar con proveedores, cambiar de fabricante…", icon: Package, min: -30, max: 30, step: 1, show: (r) => fmt.pct(share(r.cogs, r.netProductSales)) },
  { key: "shipping", label: "Coste de envío por pedido", hint: "Mejores tarifas de transporte", icon: Truck, min: -50, max: 50, step: 5, show: (r) => fmt.eur2(share(r.shippingPaid, r.orders)) },
  { key: "ads", label: "Inversión en publicidad", hint: "Cada inversión extra rinde algo menos que la anterior", icon: Megaphone, min: -100, max: 100, step: 5, show: (r) => fmt.eur(r.adSpend) },
  { key: "fixed", label: "Gastos fijos", hint: "Plataforma, alquiler, gestoría… (sin tu sueldo)", icon: Building2, min: -50, max: 50, step: 5, show: (r) => fmt.eur(r.fixed) },
]

const PRESETS: { label: string; levers: Partial<Levers> }[] = [
  { label: "Mejorar la tienda", levers: { conversion: 20, aov: 10, returns: -20 } },
  { label: "Recortar costes", levers: { cogs: -10, shipping: -15, fixed: -10 } },
  { label: "Escalar publicidad", levers: { ads: 50 } }, // desactivado en modo rápido
  { label: "Fidelizar clientes", levers: { repeat: 30 } },
  { label: "Menos descuentos", levers: { discounts: -50, conversion: -5 } },
]

const GREEN = "#00E58A"
const RED = "#FF4D4D"
const TRACK = "#262626"

function useAnimatedNumber(value: number, ms = 450) {
  const [shown, setShown] = useState(value)
  const from = useRef(value)
  useEffect(() => {
    const start = performance.now()
    const a = from.current
    let raf = 0
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / ms)
      const eased = 1 - Math.pow(1 - k, 3)
      const v = a + (value - a) * eased
      setShown(v)
      from.current = v
      if (k < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, ms])
  return shown
}

/** Modo rápido: no sabemos cuántas visitas traen los anuncios. */
const QUICK_ADS_MSG = "Para simular la publicidad necesitamos saber cuántas visitas te traen los anuncios. Afina tu cálculo para usarla."

interface Props {
  inputs: Inputs
  base: Results
  per: string
  /** Pasar a modo completo (para usar la palanca de publicidad). */
  onRefine: () => void
  /** Abrir el paso 2 con el foco en visitas de anuncios o en sesiones. */
  onEditTrafficField: (id: SalesFieldId) => void
}

export default function Simulator({ inputs, base, per, onRefine, onEditTrafficField }: Props) {
  const [rawLevers, setLevers] = useState<Levers>(ZERO_LEVERS)
  // Aviso de una sola vez cuando una palanca movida deja de poderse usar.
  const [resetNotice, setResetNotice] = useState<string | null>(null)
  const quick = inputs.quickMode
  // Qué palancas se pueden usar; las desactivadas valen 0 en todo (effectiveLevers, calc.ts).
  const avail = useMemo(() => leverAvailability(inputs, base), [inputs, base])
  const levers = useMemo(() => effectiveLevers(inputs, base, rawLevers), [inputs, base, rawLevers])
  const sim = useMemo(() => simulate(inputs, base, levers), [inputs, base, levers])
  // Visitas con todas las palancas aplicadas (las tarjetas de visitas y publicidad)
  const traffic = useMemo(() => simTraffic(inputs, base, levers), [inputs, base, levers])
  const ranking = useMemo(() => leverRanking(inputs, base, 10), [inputs, base])
  // Efecto aislado de cada palanca, para colorear su deslizador
  const isolated = useMemo(() => {
    const out = {} as Record<LeverKey, number>
    for (const l of LEVERS) {
      out[l.key] = levers[l.key] === 0 ? 0 : simulate(inputs, base, { ...ZERO_LEVERS, [l.key]: levers[l.key] }).netProfit - base.netProfit
    }
    return out
  }, [inputs, base, levers])

  // Si una palanca movida se desactiva (cambio de modo, gasto a 0…), su deslizador vuelve a 0.
  useEffect(() => {
    const off = LEVER_KEYS.filter((k) => avail[k] !== null && rawLevers[k] !== 0)
    if (off.length === 0) return
    setLevers((l) => {
      const next = { ...l }
      for (const k of off) next[k] = 0
      return next
    })
    const names = off.map((k) => LEVER_NAME[k] ?? k)
    setResetNotice(
      names.length === 1
        ? `Hemos puesto a 0 la palanca de ${names[0]} porque ya no se puede simular con tus datos.`
        : `Hemos puesto a 0 las palancas de ${names.join(" y ")} porque ya no se pueden simular con tus datos.`,
    )
    // Solo cuando cambia qué se puede usar; rawLevers se lee en ese momento.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avail])

  const delta = sim.netProfit - base.netProfit
  const deltaYear = sim.projNetProfit - base.projNetProfit
  const touched = Object.values(levers).some((v) => v !== 0)
  const activeCount = Object.values(levers).filter((v) => v !== 0).length
  const sumIsolated = Object.values(isolated).reduce((acc, v) => acc + v, 0)
  // Solo si la diferencia importa: más del 10 % del efecto conjunto o de 50 (lo mayor).
  const showCombined = activeCount >= 2 && Math.abs(sumIsolated - delta) > Math.max(Math.abs(delta) * 0.1, 50)
  const animated = useAnimatedNumber(sim.netProfit)
  const set = (k: LeverKey, v: number) => {
    setResetNotice(null)
    setLevers((l) => ({ ...l, [k]: v }))
  }
  /** Escenario desactivado si mueve alguna palanca desactivada. */
  const presetBlocked = (p: (typeof PRESETS)[number]) => (Object.keys(p.levers) as LeverKey[]).some((k) => avail[k] !== null)
  // En modo rápido no conocemos el reparto de pago / sin pago: la palanca es «Visitas», sin más.
  const shownLevers = LEVERS.map((l) => (quick && l.key === "traffic" ? { ...l, label: "Visitas", hint: "Más tráfico con la misma conversión" } : l))

  const deltaColor = delta > 0.5 ? "text-sw-success" : delta < -0.5 ? "text-sw-danger" : "text-sw-fg-3"
  const halo = delta > 0.5 ? "rgba(0,229,138,0.18)" : delta < -0.5 ? "rgba(255,77,77,0.18)" : "rgba(124,179,224,0.12)"
  const deltaText = `${delta >= 0 ? "+" : "−"}${fmt.eur(Math.abs(delta))}`
  const nowText = fmt.eur(base.netProfit)
  const simText = fmt.eur(animated)
  // Importes largos (PYG, COP, VES…) no caben uno al lado del otro en la columna de 380 px
  const stacked = Math.max(nowText.length, simText.length) > 10

  return (
    <div>
      {/* Tira fija en móvil para no perder de vista el resultado mientras mueves palancas */}
      <div className="sticky top-[68px] z-30 -mx-4 mb-4 border-y border-sw-line bg-sw-bg-0/95 px-4 py-2.5 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-2 text-xs min-[400px]:text-sm">
          <span className="shrink-0 text-sw-fg-3">Beneficio</span>
          <span className="flex min-w-0 flex-wrap items-baseline justify-end gap-x-1.5 tabular-nums">
            <span className="whitespace-nowrap text-sw-fg-3">{fmt.eur(base.netProfit)} →</span>
            <span className={`whitespace-nowrap font-semibold ${sim.netProfit >= 0 ? "text-sw-fg-1" : "text-sw-danger"}`}>{fmt.eur(animated)}</span>
            <span className={`whitespace-nowrap text-xs font-semibold ${deltaColor}`}>{touched ? deltaText : ""}</span>
          </span>
        </div>
      </div>

      {/* Escenarios rápidos */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="mr-1 flex items-center gap-1.5 text-sm text-sw-fg-3">
          <Sparkles className="h-4 w-4 text-sw-secondary" aria-hidden="true" />
          Prueba un escenario:
        </span>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setResetNotice(null)
              setLevers({ ...ZERO_LEVERS, ...p.levers })
            }}
            disabled={presetBlocked(p)}
            title={p.levers.ads !== undefined && quick ? QUICK_ADS_MSG : undefined}
            className="rounded-full border border-sw-line-strong bg-sw-bg-0 px-3.5 py-1.5 text-sm text-sw-fg-2 transition-colors hover:border-sw-secondary hover:text-sw-fg-1 disabled:opacity-40"
          >
            {p.label}
          </button>
        ))}
        {touched && (
          <button
            type="button"
            onClick={() => {
              setResetNotice(null)
              setLevers(ZERO_LEVERS)
            }}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-sw-fg-3 transition-colors hover:text-sw-fg-1"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Reiniciar
          </button>
        )}
        {quick && PRESETS.some((p) => p.levers.ads !== undefined) && (
          <p className="w-full text-xs text-sw-fg-3">«Escalar publicidad»: {QUICK_ADS_MSG}</p>
        )}
      </div>

      {resetNotice && (
        <p role="status" className="mb-4 flex items-start gap-2 rounded-sm border border-sw-line-strong bg-sw-bg-1 px-3 py-2 text-sm text-sw-fg-2">
          <span className="min-w-0 flex-1">{resetNotice}</span>
          <button type="button" onClick={() => setResetNotice(null)} className="shrink-0 text-xs text-sw-fg-3 underline underline-offset-2 hover:text-sw-fg-1">
            Entendido
          </button>
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        {/* Palancas */}
        <div className="grid items-start gap-3 sm:grid-cols-2">
          {shownLevers.map((l) => (
            <LeverCard
              key={l.key}
              def={l}
              value={levers[l.key]}
              effect={isolated[l.key]}
              base={base}
              sim={sim}
              disabled={avail[l.key] !== null}
              block={avail[l.key]}
              disabledNote={
                avail[l.key] === "quickMode" ? (
                  <>
                    {QUICK_ADS_MSG}{" "}
                    <button type="button" onClick={onRefine} className="mt-1 inline-flex items-center gap-1 font-semibold text-sw-secondary underline underline-offset-4 hover:text-sw-fg-1">
                      Afinar mi cálculo
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </>
                ) : undefined
              }
              details={
                l.key === "traffic" ? (
                  <TrafficLines t={traffic} per={per} detail={!quick} />
                ) : l.key === "ads" && avail.ads === null ? (
                  <AdsLines t={traffic} spend0={base.adSpend} spend1={sim.adSpend} onEditField={onEditTrafficField} />
                ) : undefined
              }
              onChange={(v) => set(l.key, v)}
            />
          ))}
        </div>

        {/* Resultado */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div
            className={`${styles.glow} overflow-hidden rounded-sm border border-sw-line-strong p-5 transition-[background] duration-500`}
            style={{ "--halo": halo } as CSSProperties}
          >
            <p className="font-mono-label text-[11px] text-sw-fg-3">Beneficio neto {per}</p>
            <div className={`mt-3 flex flex-col gap-1 ${stacked ? "" : "sm:flex-row sm:items-end sm:justify-between sm:gap-3"}`}>
              <div className="min-w-0">
                <p className="text-xs text-sw-fg-4">Ahora</p>
                <p className="break-words text-lg font-semibold tabular-nums text-sw-fg-3">{nowText}</p>
              </div>
              <ArrowRight className={`h-5 w-5 shrink-0 rotate-90 text-sw-fg-4 ${stacked ? "" : "sm:mb-2 sm:rotate-0"}`} aria-hidden="true" />
              <div className={`min-w-0 ${stacked ? "" : "sm:text-right"}`}>
                <p className="text-xs text-sw-fg-4">Con tus cambios</p>
                {/* !normal-case: .font-display pone mayúsculas ("GS.") y gana a normal-case por orden en globals.css */}
                <p
                  className={`break-words font-display !normal-case tabular-nums ${amountSize(simText, ["text-4xl", "text-3xl", "text-2xl", "text-xl"])} ${sim.netProfit >= 0 ? "text-sw-fg-1" : "text-sw-danger"}`}
                  aria-live="polite"
                >
                  {simText}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full border px-3 py-1 text-sm font-semibold tabular-nums ${
                  delta > 0.5
                    ? "border-sw-success/40 bg-sw-success/10 text-sw-success"
                    : delta < -0.5
                      ? "border-sw-danger/40 bg-sw-danger/10 text-sw-danger"
                      : "border-sw-line-strong text-sw-fg-3"
                }`}
              >
                {touched ? deltaText : "Mueve una palanca"}
              </span>
              {touched && (
                <span className="text-sm text-sw-fg-3">
                  ≈ <span className={`font-semibold tabular-nums ${deltaYear >= 0 ? "text-sw-success" : "text-sw-danger"}`}>{deltaYear >= 0 ? "+" : "−"}{fmt.eur(Math.abs(deltaYear))}</span> al año
                </span>
              )}
            </div>

            {showCombined && (
              <p className="mt-3 rounded-sm border border-sw-secondary/30 bg-sw-secondary/10 px-3 py-2 text-xs leading-relaxed text-sw-fg-2">
                Juntas dan {deltaText}. No es la suma exacta porque las palancas se afectan entre sí.
              </p>
            )}

            <div className="mt-6 space-y-4">
              <CompareBar label="Ingresos netos" a={base.netRevenue} b={sim.netRevenue} />
              <CompareBar label="Margen de contribución" a={base.contribution} b={sim.contribution} />
              <CompareBar label="Beneficio neto" a={base.netProfit} b={sim.netProfit} />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2">
              {base.sessions > 0 && <MiniDelta label="Visitas" a={base.sessions} b={sim.sessions} format={fmt.num} better="up" />}
              <MiniDelta label="Pedidos" a={base.orders} b={sim.orders} format={fmt.num} better="up" />
              <MiniDelta label="Conversión" a={base.conversionRate} b={sim.conversionRate} format={fmt.conv} better="up" />
              <MiniDelta label="Ticket medio" a={base.aov} b={sim.aov} format={fmt.eur2} better="up" />
              <MiniDelta label={`Te queda por ${fmt.one()}`} a={base.cm1PerEuro} b={sim.cm1PerEuro} format={fmt.eur2} better="up" />
              <MiniDelta label="ROAS breakeven" a={base.roasBreakeven} b={sim.roasBreakeven} format={fmt.x} better="down" />
              <MiniDelta label="MER" a={base.mer} b={sim.mer} format={fmt.x} better="up" />
              <MiniDelta label="CAC" a={base.cac} b={sim.cac} format={fmt.eur2} better="down" />
              {base.firstOrderProfit !== null && (
                <MiniDelta
                  label="1.ª compra"
                  a={base.firstOrderProfit}
                  b={sim.firstOrderProfit}
                  format={(v) => (v === null ? "—" : `${v >= 0 ? "+" : "−"}${fmt.eur2(Math.abs(v))}`)}
                  better="up"
                />
              )}
              {base.ltvCac !== null && <MiniDelta label="LTV:CAC" a={base.ltvCac} b={sim.ltvCac} format={fmt.dec} better="up" />}
              {base.ltvMargin !== null && <MiniDelta label="LTV (margen)" a={base.ltvMargin} b={sim.ltvMargin} format={fmt.eur} better="up" />}
            </div>

          </div>
        </div>
      </div>

      {/* Ranking de palancas */}
      <Ranking ranking={ranking} per={per} quick={quick} />

      <p className="mt-6 text-xs leading-relaxed text-sw-fg-4">
        Supuestos del simulador: la publicidad mueve solo las visitas de pago y la palanca de visitas solo las que no pagas. Las dos convierten igual (simplificación). Sin
        anuncios, suponemos que pierdes esas visitas de pago. Los pedidos son visitas × conversión y el ticket medio cambia su importe; descuentos y devoluciones mantienen su peso salvo que
        muevas su palanca; envíos, packaging y comisiones crecen con los pedidos; la recompra suma pedidos de tus clientes que repiten (sus pedidos son tus pedidos menos tus clientes nuevos, porque cada cliente nuevo hace su primer pedido) sin coste de marketing; la palanca de gastos fijos no toca tu sueldo; el coste de devoluciones crece con las devoluciones; la publicidad tiene rendimientos decrecientes (al invertir más, cada euro trae algo menos de visitas y el ROAS baja; al recortar, sube), un supuesto orientativo; el resto de marketing no cambia. En la realidad
        las palancas no son independientes (por ejemplo, menos descuentos puede bajar la conversión).
      </p>
    </div>
  )
}

function LeverCard({
  def,
  value,
  effect,
  base,
  sim,
  disabled,
  block,
  disabledNote,
  details,
  onChange,
}: {
  def: LeverDef
  value: number
  /** Efecto de mover solo esta palanca desde el punto de partida. */
  effect: number
  base: Results
  sim: Results
  disabled: boolean
  /** Motivo de la desactivación (leverAvailability). */
  block?: LeverBlock
  /** Por qué está desactivada (sustituye al texto por defecto). */
  disabledNote?: ReactNode
  /** Líneas propias bajo el deslizador (visitas, publicidad). */
  details?: ReactNode
  onChange: (v: number) => void
}) {
  const Icon = def.icon
  const zero = ((0 - def.min) / (def.max - def.min)) * 100
  const pos = ((value - def.min) / (def.max - def.min)) * 100
  const color = value === 0 ? TRACK : effect >= 0 ? GREEN : RED
  const lo = Math.min(zero, pos)
  const hi = Math.max(zero, pos)
  const fill = `linear-gradient(to right, ${TRACK} 0%, ${TRACK} ${lo}%, ${color} ${lo}%, ${color} ${hi}%, ${TRACK} ${hi}%, ${TRACK} 100%)`
  const active = value !== 0
  const borderClass = !active ? "border-sw-line" : effect >= 0 ? "border-sw-success/40" : "border-sw-danger/40"

  return (
    <div className={`rounded-sm border bg-sw-bg-0 p-4 transition-colors ${borderClass} ${disabled && !disabledNote ? "opacity-50" : ""}`}>
      <div className="flex items-start gap-3">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
            active ? (effect >= 0 ? "border-sw-success/50 text-sw-success" : "border-sw-danger/50 text-sw-danger") : "border-sw-line-strong text-sw-fg-3"
          }`}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-semibold text-sw-fg-1">{def.label}</span>
            <span className={`shrink-0 font-mono text-sm tabular-nums ${active ? "text-sw-fg-1" : "text-sw-fg-4"}`}>
              {value > 0 ? "+" : ""}
              {value}%
            </span>
          </div>
          <p className={`text-xs ${disabled && disabledNote ? "text-sw-fg-2" : "text-sw-fg-4"}`}>
            {disabled
              ? disabledNote ?? (def.key === "repeat" ? REPEAT_BLOCKED[block ?? "noRepeatData"] ?? REPEAT_BLOCKED.noRepeatData : "No has metido inversión en publicidad: prueba el escenario de la sección Marketing")
              : def.hint}
          </p>
        </div>
      </div>

      <input
        type="range"
        min={def.min}
        max={def.max}
        step={def.step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        onDoubleClick={() => onChange(0)}
        aria-label={`${def.label}: cambio en %`}
        className={`${styles.range} mt-3`}
        style={{ "--fill": fill, "--thumb": active ? color : "#7CB3E0", "--glow": active ? `${color}66` : "rgba(124,179,224,0.35)" } as CSSProperties}
      />

      <div className="mt-1 flex flex-wrap items-center justify-between gap-x-2 text-xs">
        {details ?? (
          <span className="min-w-0 tabular-nums text-sw-fg-3">
            {def.show(base)}
            {active && (
              <>
                {" "}→ <span className="text-sw-fg-1">{def.showAfter ? def.showAfter(base, value) : def.show(sim)}</span>
              </>
            )}
          </span>
        )}
        {active && (
          <span className={`ml-auto whitespace-nowrap font-semibold tabular-nums ${effect >= 0 ? "text-sw-success" : "text-sw-danger"}`}>
            <span className="font-normal text-sw-fg-3">Por sí sola: </span>
            {effect >= 0 ? "+" : "−"}
            {fmt.eur(Math.abs(effect))}
          </span>
        )}
      </div>
    </div>
  )
}

/** «A» si no cambia; «A → B» si cambia. */
function change(a: number, b: number) {
  const A = fmt.num(a)
  const B = fmt.num(b)
  return Math.abs(b - a) < 0.5 ? A : `${A} → ${B}`
}

/** Tarjeta de visitas: totales con todas las palancas, y su reparto de pago / sin publicidad. */
function TrafficLines({ t, per, detail }: { t: SimTraffic; per: string; detail: boolean }) {
  if (!t.hasSessions) {
    return <span className="min-w-0 text-sw-fg-3">Sin dato de sesiones: el efecto se calcula en proporción.</span>
  }
  return (
    <span className="min-w-0 space-y-0.5 tabular-nums">
      <span className="block text-sw-fg-2">
        Visitas totales {per}: <span className="font-semibold text-sw-fg-1">{change(t.total0, t.total1)}</span>
      </span>
      {detail && (
        <span className="block text-[11px] text-sw-fg-4">
          De pago: {change(t.paid, t.paid1)} · Sin publicidad: {change(t.organic, t.organic1)}
        </span>
      )}
    </span>
  )
}

/** Tarjeta de publicidad: inversión, visitas de pago y una nota según el dato de visitas de anuncios. */
function AdsLines({
  t,
  spend0,
  spend1,
  onEditField,
}: {
  t: SimTraffic
  spend0: number
  spend1: number
  onEditField: (id: SalesFieldId) => void
}) {
  const link = (text: string, id: SalesFieldId) => (
    <button type="button" onClick={() => onEditField(id)} className="text-sw-secondary underline underline-offset-2 hover:text-sw-fg-1">
      {text}
    </button>
  )
  const note =
    t.adSessionsStatus === "empty" ? (
      <>Reparto estimado a partir de las ventas atribuidas. Para más precisión, {link("indica tus visitas de anuncios en el paso 2", "pc-adSessions")}.</>
    ) : t.adSessionsStatus === "invalid" ? (
      <>El valor de visitas de anuncios que indicaste no es válido. Usamos una estimación a partir de las ventas atribuidas. {link("Corregirlo en el paso 2", "pc-adSessions")}</>
    ) : t.adSessionsStatus === "noSessions" ? (
      <>Para usar este dato, indica también el total de visitas ({link("Sesiones", "pc-sessions")}).</>
    ) : t.paid === 0 && spend0 > 0 ? (
      <>Indicas 0 visitas de anuncios: bajar la publicidad no te quitará ventas en esta simulación.</>
    ) : null
  return (
    <span className="min-w-0 space-y-0.5 tabular-nums">
      <span className="block text-sw-fg-3">
        {fmt.eur(spend0)}
        {Math.abs(spend1 - spend0) >= 0.5 && (
          <>
            {" "}→ <span className="text-sw-fg-1">{fmt.eur(spend1)}</span>
          </>
        )}
      </span>
      {t.hasSessions && (
        <span className="block text-sw-fg-2">
          Visitas de pago: <span className="font-semibold text-sw-fg-1">{t.paid1 === 0 && t.paid > 0 ? `${fmt.num(t.paid)} → 0` : change(t.paid, t.paid1)}</span>
        </span>
      )}
      {note && <span className="block text-[11px] leading-relaxed text-sw-fg-3">{note}</span>}
    </span>
  )
}

function CompareBar({ label, a, b }: { label: string; a: number; b: number }) {
  const max = Math.max(Math.abs(a), Math.abs(b), 1)
  const better = b - a > 0.5
  const worse = b - a < -0.5
  const color = better ? "bg-sw-success" : worse ? "bg-sw-danger" : "bg-sw-secondary"
  return (
    <div>
      <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-2 text-xs">
        <span className="text-sw-fg-3">{label}</span>
        <span className="flex min-w-0 flex-wrap justify-end gap-x-1 tabular-nums text-sw-fg-2">
          <span className="whitespace-nowrap">{fmt.eur(a)} →</span>
          <span className="whitespace-nowrap font-semibold text-sw-fg-1">{fmt.eur(b)}</span>
        </span>
      </div>
      <div className="space-y-1">
        <div className="h-1.5 rounded-[3px] bg-sw-bg-2">
          <div className="h-full rounded-[3px] bg-sw-fg-4" style={{ width: `${(Math.max(0, a) / max) * 100}%` }} />
        </div>
        <div className="h-1.5 rounded-[3px] bg-sw-bg-2">
          <div className={`h-full rounded-[3px] transition-all duration-500 ${color}`} style={{ width: `${(Math.max(0, b) / max) * 100}%` }} />
        </div>
      </div>
    </div>
  )
}

function MiniDelta({
  label,
  a,
  b,
  format,
  better,
}: {
  label: string
  a: number | null
  b: number | null
  format: (v: number | null) => string
  better: "up" | "down"
}) {
  const changed = a !== null && b !== null && Math.abs(b - a) > Math.abs(a) * 0.0005
  const up = changed && (b as number) > (a as number)
  const good = changed && (better === "up" ? up : !up)
  const Arrow = up ? ArrowUpRight : ArrowDownRight
  return (
    <div className="rounded-sm border border-sw-line bg-sw-bg-1/60 px-3 py-2">
      <p className="text-[11px] text-sw-fg-4">{label}</p>
      <p className="mt-0.5 flex items-center gap-1 text-sm font-semibold tabular-nums text-sw-fg-1">
        {format(b)}
        {changed && <Arrow className={`h-3.5 w-3.5 ${good ? "text-sw-success" : "text-sw-danger"}`} aria-label={good ? "mejora" : "empeora"} />}
      </p>
    </div>
  )
}

const RANK_LABEL: Record<LeverKey, string> = {
  traffic: "+10 % visitas sin publicidad",
  conversion: "+10 % conversión",
  aov: "+10 % ticket medio",
  repeat: "+10 % recompra",
  discounts: "−10 % descuentos",
  returns: "−10 % devoluciones",
  cogs: "−10 % coste de producto",
  shipping: "−10 % coste de envío",
  ads: "+10 % publicidad",
  fixed: "−10 % gastos fijos",
}

function Ranking({ ranking, per, quick }: { ranking: { key: LeverKey; delta: number }[]; per: string; quick: boolean }) {
  // En modo rápido no se distingue el tráfico de pago: «+10 % visitas».
  const label = (k: LeverKey) => (quick && k === "traffic" ? "+10 % visitas" : RANK_LABEL[k])
  const max = Math.max(...ranking.map((r) => Math.abs(r.delta)), 1)
  const top = ranking[0]
  return (
    <div className="mt-10 rounded-sm border border-sw-line bg-sw-bg-0 p-5 sm:p-6">
      <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-xl text-sw-fg-1 sm:text-2xl">¿Qué palanca te da más?</h3>
        <span className="text-xs text-sw-fg-4">Beneficio extra {per} al mejorar cada una un 10 %</span>
      </div>
      {top && top.delta > 0 && (
        <p className="mb-5 text-sm text-sw-fg-2">
          En tu caso, la palanca más potente es <strong className="text-sw-success">{label(top.key).replace(/^[+−]10 % /, "")}</strong>: mejorarla un 10 % te
          daría {fmt.eur(top.delta)} más {per}.
        </p>
      )}
      <ol className="space-y-2.5">
        {ranking.map((r, i) => {
          const positive = r.delta >= 0
          return (
            <li key={r.key} className="grid grid-cols-[1.25rem_minmax(0,9.5rem)_1fr_auto] items-center gap-3 text-sm sm:grid-cols-[1.25rem_15rem_1fr_6rem]">
              <span className="font-mono text-xs text-sw-fg-4">{i + 1}</span>
              <span className="truncate text-sw-fg-2">{label(r.key)}</span>
              <span className="h-3 rounded-[4px] bg-sw-bg-2">
                <span
                  className={`block h-full rounded-[4px] ${positive ? "bg-sw-success" : "bg-sw-danger"} ${i === 0 && positive ? "shadow-[0_0_14px_rgba(0,229,138,0.5)]" : ""}`}
                  style={{ width: `${Math.max(2, (Math.abs(r.delta) / max) * 100)}%`, opacity: i === 0 ? 1 : 0.75 }}
                />
              </span>
              <span className={`text-right font-semibold tabular-nums ${positive ? "text-sw-success" : "text-sw-danger"}`}>
                {positive ? "+" : "−"}
                {fmt.eur(Math.abs(r.delta))}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

"use client"
// Simulador de palancas: el usuario mueve indicadores y ve al instante cómo
// cambiaría su beneficio. Toda la lógica está en simulate() (calc.ts).
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import Link from "next/link"
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Megaphone,
  MousePointerClick,
  Package,
  Percent,
  RotateCcw,
  ShoppingBag,
  Sparkles,
  Truck,
  Undo2,
  Users,
  type LucideIcon,
} from "lucide-react"
import { fmt, leverRanking, simulate, ZERO_LEVERS, type Inputs, type LeverKey, type Levers, type Results } from "./calc"
import styles from "./simulator.module.css"

interface LeverDef {
  key: LeverKey
  label: string
  hint: string
  icon: LucideIcon
  min: number
  max: number
  step: number
  show: (r: Results) => string
}

const share = (a: number, b: number) => (b > 0 ? a / b : null)

const LEVERS: LeverDef[] = [
  { key: "traffic", label: "Visitas", hint: "Más tráfico con la misma conversión", icon: Users, min: -50, max: 100, step: 5, show: (r) => fmt.num(r.sessions) },
  { key: "conversion", label: "Tasa de conversión", hint: "Más visitas que terminan comprando", icon: MousePointerClick, min: -50, max: 100, step: 5, show: (r) => fmt.pct(r.conversionRate) },
  { key: "aov", label: "Ticket medio", hint: "Cada pedido vale más (packs, upsells…)", icon: ShoppingBag, min: -30, max: 50, step: 1, show: (r) => fmt.eur2(r.aov) },
  { key: "discounts", label: "Descuentos", hint: "Peso de los descuentos sobre las ventas", icon: Percent, min: -100, max: 100, step: 5, show: (r) => fmt.pct(r.discountPct) },
  { key: "returns", label: "Devoluciones", hint: "Peso de las devoluciones sobre las ventas", icon: Undo2, min: -100, max: 100, step: 5, show: (r) => fmt.pct(r.returnPct) },
  { key: "cogs", label: "Coste de producto", hint: "Negociar con proveedores, cambiar de fabricante…", icon: Package, min: -30, max: 30, step: 1, show: (r) => fmt.pct(share(r.cogs, r.netProductSales)) },
  { key: "shipping", label: "Coste de envío por pedido", hint: "Mejores tarifas de transporte", icon: Truck, min: -50, max: 50, step: 5, show: (r) => fmt.eur2(share(r.shippingPaid, r.orders)) },
  { key: "ads", label: "Inversión en publicidad", hint: "Cada euro extra rinde algo menos que el anterior", icon: Megaphone, min: -100, max: 100, step: 5, show: (r) => fmt.eur(r.adSpend) },
  { key: "fixed", label: "Gastos fijos", hint: "Plataforma, sueldos, alquiler…", icon: Building2, min: -50, max: 50, step: 5, show: (r) => fmt.eur(r.fixed) },
]

const PRESETS: { label: string; levers: Partial<Levers> }[] = [
  { label: "Mejorar la tienda", levers: { conversion: 20, aov: 10, returns: -20 } },
  { label: "Recortar costes", levers: { cogs: -10, shipping: -15, fixed: -10 } },
  { label: "Escalar publicidad", levers: { ads: 50 } },
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

interface Props {
  inputs: Inputs
  base: Results
  per: string
  contactHref: string
}

export default function Simulator({ inputs, base, per, contactHref }: Props) {
  const [levers, setLevers] = useState<Levers>(ZERO_LEVERS)
  const sim = useMemo(() => simulate(inputs, base, levers), [inputs, base, levers])
  const ranking = useMemo(() => leverRanking(inputs, base, 10), [inputs, base])
  // Efecto aislado de cada palanca, para colorear su deslizador
  const isolated = useMemo(() => {
    const out = {} as Record<LeverKey, number>
    for (const l of LEVERS) {
      out[l.key] = levers[l.key] === 0 ? 0 : simulate(inputs, base, { ...ZERO_LEVERS, [l.key]: levers[l.key] }).netProfit - base.netProfit
    }
    return out
  }, [inputs, base, levers])

  const delta = sim.netProfit - base.netProfit
  const deltaYear = sim.projNetProfit - base.projNetProfit
  const touched = Object.values(levers).some((v) => v !== 0)
  const activeCount = Object.values(levers).filter((v) => v !== 0).length
  const sumIsolated = Object.values(isolated).reduce((acc, v) => acc + v, 0)
  const showCombined = activeCount >= 2 && Math.abs(sumIsolated - delta) >= 1
  const animated = useAnimatedNumber(sim.netProfit)
  const set = (k: LeverKey, v: number) => setLevers((l) => ({ ...l, [k]: v }))

  const deltaColor = delta > 0.5 ? "text-sw-success" : delta < -0.5 ? "text-sw-danger" : "text-sw-fg-3"
  const halo = delta > 0.5 ? "rgba(0,229,138,0.18)" : delta < -0.5 ? "rgba(255,77,77,0.18)" : "rgba(124,179,224,0.12)"
  const deltaText = `${delta >= 0 ? "+" : "−"}${fmt.eur(Math.abs(delta))}`

  return (
    <div>
      {/* Tira fija en móvil para no perder de vista el resultado mientras mueves palancas */}
      <div className="sticky top-[68px] z-30 -mx-4 mb-4 border-y border-sw-line bg-sw-bg-0/95 px-4 py-2.5 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-2 whitespace-nowrap text-xs min-[400px]:text-sm">
          <span className="text-sw-fg-3">Beneficio</span>
          <span className="flex items-baseline gap-1.5 tabular-nums">
            <span className="text-sw-fg-3">{fmt.eur(base.netProfit)} →</span>
            <span className={`font-semibold ${sim.netProfit >= 0 ? "text-sw-fg-1" : "text-sw-danger"}`}>{fmt.eur(animated)}</span>
            <span className={`text-xs font-semibold ${deltaColor}`}>{touched ? deltaText : ""}</span>
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
            onClick={() => setLevers({ ...ZERO_LEVERS, ...p.levers })}
            disabled={p.levers.ads !== undefined && base.adSpend === 0}
            className="rounded-full border border-sw-line-strong bg-sw-bg-0 px-3.5 py-1.5 text-sm text-sw-fg-2 transition-colors hover:border-sw-secondary hover:text-sw-fg-1 disabled:opacity-40"
          >
            {p.label}
          </button>
        ))}
        {touched && (
          <button
            type="button"
            onClick={() => setLevers(ZERO_LEVERS)}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-sw-fg-3 transition-colors hover:text-sw-fg-1"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Reiniciar
          </button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        {/* Palancas */}
        <div className="grid gap-3 sm:grid-cols-2">
          {LEVERS.map((l) => (
            <LeverCard
              key={l.key}
              def={l}
              value={levers[l.key]}
              effect={isolated[l.key]}
              base={base}
              sim={sim}
              disabled={l.key === "ads" && base.adSpend === 0}
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
            <div className="mt-3 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs text-sw-fg-4">Ahora</p>
                <p className="text-lg font-semibold tabular-nums text-sw-fg-3">{fmt.eur(base.netProfit)}</p>
              </div>
              <ArrowRight className="mb-2 h-5 w-5 shrink-0 text-sw-fg-4" aria-hidden="true" />
              <div className="text-right">
                <p className="text-xs text-sw-fg-4">Con tus cambios</p>
                <p className={`font-display text-4xl tabular-nums ${sim.netProfit >= 0 ? "text-sw-fg-1" : "text-sw-danger"}`} aria-live="polite">
                  {fmt.eur(animated)}
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
                <strong className="text-sw-fg-1">Las palancas se combinan.</strong> Por separado sumarían {sumIsolated >= 0 ? "+" : "−"}
                {fmt.eur(Math.abs(sumIsolated))}, pero juntas dan {deltaText}
                {delta > sumIsolated
                  ? " porque se potencian: por ejemplo, más pedidos con un ticket más alto multiplican el efecto."
                  : " porque algunas se contrarrestan entre sí."}
              </p>
            )}

            <div className="mt-6 space-y-4">
              <CompareBar label="Ingresos netos" a={base.netRevenue} b={sim.netRevenue} />
              <CompareBar label="Margen de contribución" a={base.contribution} b={sim.contribution} />
              <CompareBar label="Beneficio neto" a={base.netProfit} b={sim.netProfit} />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2">
              <MiniDelta label="Conversión" a={base.conversionRate} b={sim.conversionRate} format={fmt.pct} better="up" />
              <MiniDelta label="Ticket medio" a={base.aov} b={sim.aov} format={fmt.eur2} better="up" />
              <MiniDelta label="Te queda por €" a={base.cm1PerEuro} b={sim.cm1PerEuro} format={fmt.eur2} better="up" />
              <MiniDelta label="ROAS breakeven" a={base.roasBreakeven} b={sim.roasBreakeven} format={fmt.x} better="down" />
              <MiniDelta label="MER" a={base.mer} b={sim.mer} format={fmt.x} better="up" />
              <MiniDelta label="CAC" a={base.cac} b={sim.cac} format={fmt.eur2} better="down" />
            </div>

            {touched && delta > 0.5 && (
              <Link
                href={contactHref}
                className="mt-6 flex items-center justify-center gap-2 rounded-sm bg-sw-brand px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-sw-brand-hover"
              >
                Quiero conseguir esos {fmt.eur(delta)}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Ranking de palancas */}
      <Ranking ranking={ranking} per={per} />

      <p className="mt-6 text-xs leading-relaxed text-sw-fg-4">
        Supuestos del simulador: visitas y conversión cambian el número de pedidos y el ticket medio su importe; descuentos y devoluciones mantienen su peso salvo que
        muevas su palanca; envíos, packaging y comisiones crecen con los pedidos; la publicidad tiene rendimientos decrecientes (al invertir más, el ROAS baja; al recortar, sube), un supuesto orientativo; el resto de marketing no cambia. En la realidad
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
  onChange,
}: {
  def: LeverDef
  value: number
  effect: number
  base: Results
  sim: Results
  disabled: boolean
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
    <div className={`rounded-sm border bg-sw-bg-0 p-4 transition-colors ${borderClass} ${disabled ? "opacity-50" : ""}`}>
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
          <p className="text-xs text-sw-fg-4">{disabled ? "No has metido inversión en publicidad" : def.hint}</p>
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

      <div className="mt-1 flex items-center justify-between gap-2 text-xs">
        <span className="tabular-nums text-sw-fg-3">
          {def.show(base)}
          {active && (
            <>
              {" "}→ <span className="text-sw-fg-1">{def.show(sim)}</span>
            </>
          )}
        </span>
        {active && (
          <span className={`font-semibold tabular-nums ${effect >= 0 ? "text-sw-success" : "text-sw-danger"}`}>
            {effect >= 0 ? "+" : "−"}
            {fmt.eur(Math.abs(effect))}
          </span>
        )}
      </div>
    </div>
  )
}

function CompareBar({ label, a, b }: { label: string; a: number; b: number }) {
  const max = Math.max(Math.abs(a), Math.abs(b), 1)
  const better = b - a > 0.5
  const worse = b - a < -0.5
  const color = better ? "bg-sw-success" : worse ? "bg-sw-danger" : "bg-sw-secondary"
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-2 text-xs">
        <span className="text-sw-fg-3">{label}</span>
        <span className="tabular-nums text-sw-fg-2">
          {fmt.eur(a)} → <span className="font-semibold text-sw-fg-1">{fmt.eur(b)}</span>
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
  traffic: "+10 % visitas",
  conversion: "+10 % conversión",
  aov: "+10 % ticket medio",
  discounts: "−10 % descuentos",
  returns: "−10 % devoluciones",
  cogs: "−10 % coste de producto",
  shipping: "−10 % coste de envío",
  ads: "+10 % publicidad",
  fixed: "−10 % gastos fijos",
}

function Ranking({ ranking, per }: { ranking: { key: LeverKey; delta: number }[]; per: string }) {
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
          En tu caso, la palanca más potente es <strong className="text-sw-success">{RANK_LABEL[top.key].replace(/^[+−]10 % /, "")}</strong>: mejorarla un 10 % te
          daría {fmt.eur(top.delta)} más {per}.
        </p>
      )}
      <ol className="space-y-2.5">
        {ranking.map((r, i) => {
          const positive = r.delta >= 0
          return (
            <li key={r.key} className="grid grid-cols-[1.25rem_minmax(0,9.5rem)_1fr_auto] items-center gap-3 text-sm sm:grid-cols-[1.25rem_12rem_1fr_6rem]">
              <span className="font-mono text-xs text-sw-fg-4">{i + 1}</span>
              <span className="truncate text-sw-fg-2">{RANK_LABEL[r.key]}</span>
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

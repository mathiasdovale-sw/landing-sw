"use client"
import { useEffect, useState } from "react"
import { Search, Megaphone, Home, LayoutGrid, Package, CreditCard } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

// Colores literales para las animate SMIL de color (no aceptan clases Tailwind).
// Reflejan los mismos tokens del proyecto: sw-fg-3 y sw-danger.
const LOST_COLOR = "#888888"
const DANGER_COLOR = "#FF4D4D"

// Carriles de puntos: [inicio del ciclo, fracción del path donde se pierden, radio, si llega a checkout]
const LANES = [
  { begin: 0, stop: 0.22, radius: 5, accent: false },
  { begin: 0.42, stop: 0.305, radius: 5, accent: false },
  { begin: 0.84, stop: 0.39, radius: 5, accent: false },
  { begin: 1.26, stop: 0.475, radius: 5, accent: false },
  { begin: 1.68, stop: 0.56, radius: 5, accent: false },
  { begin: 2.1, stop: 0.645, radius: 5, accent: false },
  { begin: 2.52, stop: 0.73, radius: 5, accent: false },
  { begin: 2.94, stop: 0.815, radius: 5, accent: false },
  { begin: 3.36, stop: 0.9, radius: 5, accent: false },
  { begin: 3.78, stop: 1.0, radius: 6, accent: true },
] as const

const CYCLE = 4.2 // segundos, duración de referencia de un carril completo

function opacityTimingFor(stop: number, accent: boolean) {
  if (accent) {
    // Llega completo y se mantiene visible al arribar a checkout.
    return { values: "0;1;1;1", keyTimes: "0;0.03;0.95;1" }
  }
  const fadeStart = Math.max(stop - 0.03, 0.04)
  return { values: "0;1;1;0;0", keyTimes: `0;0.03;${fadeStart};${stop};1` }
}

// El punto se pone rojo justo antes de perderse — la señal de "venta perdida".
function fillTimingFor(stop: number) {
  const fadeStart = Math.max(stop - 0.03, 0.04)
  const turnRed = Math.max(fadeStart - 0.06, 0.01)
  return {
    values: `${LOST_COLOR};${LOST_COLOR};${DANGER_COLOR};${DANGER_COLOR};${DANGER_COLOR}`,
    keyTimes: `0;${turnRed};${fadeStart};${stop};1`,
  }
}

// "Burst" que marca la venta perdida: un anillo rojo que se expande y se
// apaga justo en el punto y el momento en que el carril desaparece.
function burstTimingFor(stop: number) {
  const peak = Math.min(stop + 0.02, 0.99)
  const fade = Math.min(stop + 0.1, 0.995)
  return {
    keyTimes: `0;${Math.max(stop - 0.01, 0.001)};${peak};${fade};1`,
    radiusValues: "0;0;11;0;0",
    opacityValues: "0;0;0.7;0;0",
  }
}

// Coordenadas del nodo de Checkout en el viewBox del path (ver `nodes` más abajo).
const CHECKOUT_X = 300
const CHECKOUT_Y = 530

export default function FunnelLeakSection() {
  const { t } = useLanguage()
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const nodes = [
    { key: "organic", icon: Search, label: t("funnel.node.organic"), left: "30%", top: "7.8125%", side: "left" },
    { key: "paid", icon: Megaphone, label: t("funnel.node.paid"), left: "70%", top: "7.8125%", side: "right" },
    { key: "home", icon: Home, label: t("funnel.node.home"), left: "50%", top: "35.9375%", side: "right" },
    { key: "collection", icon: LayoutGrid, label: t("funnel.node.collection"), left: "70%", top: "51.5625%", side: "right" },
    { key: "pdp", icon: Package, label: t("funnel.node.pdp"), left: "30%", top: "67.1875%", side: "left" },
    { key: "checkout", icon: CreditCard, label: t("funnel.node.checkout"), left: "50%", top: "82.8125%", side: "left" },
  ] as const

  return (
    <section className="bg-sw-bg-0 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl text-sw-fg-1 sm:text-4xl lg:text-5xl">
            {t("funnel.title")}
          </h2>
        </div>

        {/* Resumen accesible del diagrama para lectores de pantalla */}
        <h2 className="sr-only">{t("funnel.srSummary")}</h2>

        <div
          className="relative mx-auto w-full max-w-md"
          style={{ aspectRatio: "600 / 640" }}
        >
          <svg
            viewBox="0 0 600 640"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {/* Líneas discontinuas de convergencia */}
            <path
              d="M180,80 Q240,110 300,150"
              className="fill-none stroke-sw-line-strong"
              strokeWidth={2}
              strokeDasharray="5 6"
            />
            <path
              d="M420,80 Q360,110 300,150"
              className="fill-none stroke-sw-line-strong"
              strokeWidth={2}
              strokeDasharray="5 6"
            />

            {/* Camino principal */}
            <path
              id="funnel-path"
              d="M300,150 C300,180 300,200 300,230 C300,270 420,290 420,330 C420,370 180,390 180,430 C180,470 300,490 300,530"
              className="fill-none stroke-sw-line-strong"
              strokeWidth={2}
            />

            <defs>
              <filter id="funnel-euro-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Puntos de tráfico viajando por el camino */}
            {!reducedMotion &&
              LANES.map((lane, i) => {
                const { values: opacityValues, keyTimes: opacityKeyTimes } = opacityTimingFor(lane.stop, lane.accent)
                const burst = !lane.accent ? burstTimingFor(lane.stop) : null
                const fill = !lane.accent ? fillTimingFor(lane.stop) : null
                return (
                  <g key={i}>
                    {/* Burst de "venta perdida" — solo en carriles que no llegan */}
                    {burst && (
                      <circle r={0} opacity={0} className="fill-none" stroke={DANGER_COLOR} strokeWidth={2}>
                        <animateMotion
                          dur={`${CYCLE}s`}
                          begin={`${lane.begin}s`}
                          repeatCount="indefinite"
                          calcMode="linear"
                          keyPoints={`0;${lane.stop};${lane.stop}`}
                          keyTimes={`0;${lane.stop};1`}
                        >
                          <mpath href="#funnel-path" />
                        </animateMotion>
                        <animate
                          attributeName="r"
                          dur={`${CYCLE}s`}
                          begin={`${lane.begin}s`}
                          repeatCount="indefinite"
                          values={burst.radiusValues}
                          keyTimes={burst.keyTimes}
                        />
                        <animate
                          attributeName="opacity"
                          dur={`${CYCLE}s`}
                          begin={`${lane.begin}s`}
                          repeatCount="indefinite"
                          values={burst.opacityValues}
                          keyTimes={burst.keyTimes}
                        />
                      </circle>
                    )}

                    <circle
                      r={lane.radius}
                      className={lane.accent ? "fill-sw-brand" : undefined}
                      fill={lane.accent ? undefined : LOST_COLOR}
                      opacity={0}
                    >
                      <animateMotion
                        dur={`${CYCLE}s`}
                        begin={`${lane.begin}s`}
                        repeatCount="indefinite"
                        calcMode="linear"
                        keyPoints={`0;${lane.stop};${lane.stop}`}
                        keyTimes={`0;${lane.stop};1`}
                      >
                        <mpath href="#funnel-path" />
                      </animateMotion>
                      <animate
                        attributeName="opacity"
                        dur={`${CYCLE}s`}
                        begin={`${lane.begin}s`}
                        repeatCount="indefinite"
                        values={opacityValues}
                        keyTimes={opacityKeyTimes}
                      />
                      {fill && (
                        <animate
                          attributeName="fill"
                          dur={`${CYCLE}s`}
                          begin={`${lane.begin}s`}
                          repeatCount="indefinite"
                          values={fill.values}
                          keyTimes={fill.keyTimes}
                        />
                      )}
                      {lane.accent && (
                        <animate
                          attributeName="r"
                          dur={`${CYCLE}s`}
                          begin={`${lane.begin}s`}
                          repeatCount="indefinite"
                          values={`${lane.radius};${lane.radius};${lane.radius + 3};${lane.radius}`}
                          keyTimes="0;0.9;0.97;1"
                        />
                      )}
                    </circle>

                    {/* "+€" — la venta se concreta en Checkout */}
                    {lane.accent && (
                      <g opacity={0}>
                        <animate
                          attributeName="opacity"
                          dur={`${CYCLE}s`}
                          begin={`${lane.begin}s`}
                          repeatCount="indefinite"
                          values="0;0;1;1;0"
                          keyTimes="0;0.92;0.95;0.98;1"
                        />
                        <animateTransform
                          attributeName="transform"
                          type="translate"
                          dur={`${CYCLE}s`}
                          begin={`${lane.begin}s`}
                          repeatCount="indefinite"
                          values="0,0;0,0;0,-46"
                          keyTimes="0;0.92;1"
                        />
                        <text
                          x={CHECKOUT_X + 44}
                          y={CHECKOUT_Y - 18}
                          textAnchor="middle"
                          fontSize={44}
                          filter="url(#funnel-euro-glow)"
                          className="font-display fill-sw-success"
                          style={{ transformOrigin: `${CHECKOUT_X + 44}px ${CHECKOUT_Y - 18}px` }}
                        >
                          +€
                          <animateTransform
                            attributeName="transform"
                            type="scale"
                            dur={`${CYCLE}s`}
                            begin={`${lane.begin}s`}
                            repeatCount="indefinite"
                            values="0.3;0.3;1.3;1"
                            keyTimes="0;0.92;0.95;1"
                          />
                        </text>
                      </g>
                    )}
                  </g>
                )
              })}
          </svg>

          {/* Nodos con ícono y título, superpuestos sobre el mismo lienzo porcentual que el SVG.
              El ícono queda fijado exacto sobre el punto del camino; la etiqueta cuelga al
              costado (no debajo) para no tapar el trazo. */}
          {nodes.map(({ key, icon: Icon, label, left, top, side }) => {
            const isCheckout = key === "checkout"
            const isLeft = side === "left"
            return (
              <div
                key={key}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left, top }}
              >
                <div
                  className={
                    "relative flex items-center justify-center rounded-full border bg-sw-bg-2 " +
                    (isCheckout ? "h-14 w-14 border-sw-brand" : "h-12 w-12 border-sw-line")
                  }
                >
                  <Icon
                    className={isCheckout ? "h-6 w-6 text-sw-brand" : "h-5 w-5 text-sw-fg-2"}
                    aria-hidden="true"
                  />
                  <span
                    className={
                      (isCheckout ? "text-sw-brand " : "text-sw-fg-3 ") +
                      "absolute top-1/2 w-20 -translate-y-1/2 font-mono-label leading-tight " +
                      (isLeft ? "right-full mr-2 text-right" : "left-full ml-2 text-left")
                    }
                    style={{
                      textShadow:
                        "0 0 3px #000000, 0 0 5px #000000",
                    }}
                  >
                    {label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

"use client"
import { useRef, useState } from "react"
import Image from "next/image"
import { ArrowUpRight, Check, ChevronDown, Smartphone } from "lucide-react"
import Testimonial from "./testimonial"
import { getCases, type CaseKey, type CaseStudy } from "@/lib/cases"

// Casos de clientes: captura en un marco de móvil, etiqueta de tipo, alcance,
// testimonio (si existe) y enlace a la tienda en vivo. Los datos viven en lib/cases.ts.
// En móvil (<768 px) los casos van en carrusel horizontal y el alcance se pliega.

const COPY = {
  es: {
    title: "Tiendas que he construido",
    visit: "Ver la tienda",
    showScope: "Ver qué construí",
    hideScope: "Ocultar",
    sameClient: "Mismo cliente",
    sameClientNote: "Mates Ramos Europa y Can Ramos son dos tiendas del mismo cliente.",
    screenshotAlt: "captura de la home de la tienda",
    logoAlt: "Logo de",
    goTo: "Ir al caso",
  },
  en: {
    title: "Stores I've built",
    visit: "Visit the store",
    showScope: "See what I built",
    hideScope: "Hide",
    sameClient: "Same client",
    sameClientNote: "Mates Ramos Europa and Can Ramos are two stores for the same client.",
    screenshotAlt: "screenshot of the store home page",
    logoAlt: "Logo of",
    goTo: "Go to case",
  },
}

/** Captura en un marco de móvil, recortada por abajo para que "asome" del escenario. */
function PhoneShot({ src, alt }: { src?: string; alt: string }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className="absolute left-1/2 top-14 w-[140px] -translate-x-1/2 transition-transform duration-500 ease-out group-hover:-translate-y-2 md:top-8 md:w-[190px]">
      <div className="relative aspect-[9/17] overflow-hidden rounded-[22px] border-[5px] border-[#1c1c1c] bg-sw-bg-0 shadow-[0_20px_50px_rgba(0,0,0,0.55)] md:rounded-[26px] md:border-[6px]">
        {src && !failed ? (
          <Image src={src} alt={alt} fill className="object-cover object-top" sizes="190px" onError={() => setFailed(true)} />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Smartphone className="h-6 w-6 text-sw-fg-4" aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  )
}

/** Placa idéntica para todos los logos: mismo tamaño, radio, fondo y padding; el logo se escala con object-contain. */
function BrandLogo({ src, alt, darken }: { src?: string; alt: string; darken?: boolean }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return null
  return (
    <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-sm bg-white">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="96px"
        className={`object-contain p-2 ${darken ? "brightness-0" : ""}`}
        onError={() => setFailed(true)}
      />
    </div>
  )
}

function CaseCard({ c, locale, sameClient }: { c: CaseStudy; locale: "es" | "en"; sameClient: boolean }) {
  const t = COPY[locale]
  const [open, setOpen] = useState(false)
  const scope = c.scope[locale]
  const listId = `case-scope-${c.key}`
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-sm border border-sw-line bg-sw-bg-2 transition-colors hover:border-sw-line-strong">
      <div className="relative h-48 shrink-0 overflow-hidden border-b border-sw-line bg-[radial-gradient(120%_90%_at_50%_100%,rgba(255,107,0,0.14),transparent_70%)] md:h-72">
        <PhoneShot src={c.image} alt={`${c.name} — ${t.screenshotAlt}`} />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-sw-line-strong bg-sw-bg-0/80 px-3 py-1 font-mono-label text-sw-fg-2 backdrop-blur">
            {c.tag[locale]}
          </span>
          {sameClient && (
            <span className="rounded-full border border-sw-brand/60 bg-sw-bg-0/80 px-3 py-1 font-mono-label text-sw-brand backdrop-blur">
              {t.sameClient}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-7">
        <div className="flex items-center gap-4">
          <BrandLogo src={c.logo} alt={`${t.logoAlt} ${c.name}`} darken={c.logoDarken} />
          <h3 className="min-w-0 font-display text-xl text-sw-fg-1 sm:text-2xl">{c.name}</h3>
        </div>
        <p className="mt-3 leading-snug text-sw-fg-2">{c.summary[locale]}</p>

        {scope.length > 0 && (
          <>
            {/* En móvil el alcance va plegado; en escritorio siempre visible */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={listId}
              className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-sw-fg-1 underline-offset-4 hover:underline md:hidden"
            >
              {open ? t.hideScope : t.showScope}
              <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
            <ul id={listId} className={`mt-4 space-y-2 md:mt-5 md:block ${open ? "block" : "hidden"}`}>
              {scope.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-sw-fg-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sw-brand" aria-hidden="true" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        <Testimonial testimonial={c.testimonial?.[locale]} className="mt-6" />

        {c.url && (
          <a
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex w-fit items-center gap-1.5 pt-6 font-semibold text-sw-brand hover:text-sw-fg-1"
          >
            {t.visit}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  )
}

export default function CaseStudySection({
  locale,
  cases,
  title,
  className = "bg-sw-bg-1",
}: {
  locale: "es" | "en"
  /** Qué casos mostrar y en qué orden. Por defecto, todos. */
  cases?: CaseKey[]
  title?: string
  className?: string
}) {
  const t = COPY[locale]
  const list = getCases(cases)
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  if (list.length === 0) return null

  // "Mismo cliente" solo cuando hay al menos dos tiendas del mismo grupo en esta sección.
  const groupCount = (g?: string) => (g ? list.filter((c) => c.clientGroup === g).length : 0)
  const showSameClient = (c: CaseStudy) => groupCount(c.clientGroup) > 1
  const hasSameClient = list.some(showSameClient)

  const n = list.length
  const carousel = n > 1
  const containerWidth = n >= 3 ? "max-w-7xl" : "max-w-5xl"
  const desktopGrid = n >= 3 ? "md:grid-cols-2 lg:grid-cols-3" : n === 2 ? "md:grid-cols-2" : "md:max-w-xl"

  const onScroll = () => {
    const el = trackRef.current
    if (!el) return
    const cards = Array.from(el.children) as HTMLElement[]
    const center = el.scrollLeft + el.clientWidth / 2
    let best = 0
    cards.forEach((card, i) => {
      const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center)
      if (d < Math.abs(cards[best].offsetLeft + cards[best].offsetWidth / 2 - center)) best = i
    })
    setActive(best)
  }

  const goTo = (i: number) => {
    const el = trackRef.current
    const card = el?.children[i] as HTMLElement | undefined
    if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft - 20, behavior: "smooth" })
  }

  return (
    <section id="casos-reales" className={`scroll-mt-20 py-16 sm:py-20 ${className}`}>
      <div className={`mx-auto px-5 ${containerWidth}`}>
        <h2 className="font-display text-3xl text-sw-fg-1 sm:text-4xl">{title ?? t.title}</h2>
        {hasSameClient && <p className="mt-3 text-sw-fg-3">{t.sameClientNote}</p>}

        {/* Móvil: carrusel con scroll-snap y la siguiente tarjeta asomando. Escritorio: rejilla. */}
        <div
          ref={trackRef}
          onScroll={carousel ? onScroll : undefined}
          className={`mt-10 ${
            carousel
              ? "-mx-5 flex items-start snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:items-stretch md:gap-6 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
              : "grid"
          } ${desktopGrid}`}
        >
          {list.map((c) => (
            <div key={c.key} className={carousel ? "w-[84%] shrink-0 snap-start md:w-auto" : ""}>
              <CaseCard c={c} locale={locale} sameClient={showSameClient(c)} />
            </div>
          ))}
        </div>

        {carousel && (
          <div className="mt-5 flex justify-center gap-2 md:hidden">
            {list.map((c, i) => (
              <button
                key={c.key}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${t.goTo}: ${c.name}`}
                aria-current={i === active}
                className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-sw-brand" : "w-2 bg-sw-line-strong"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

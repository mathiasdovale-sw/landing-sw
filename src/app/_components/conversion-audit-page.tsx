import Link from "next/link"
import { Check, X } from "lucide-react"
import ServiceStructuredData from "./service-structured-data"
import VisualBreadcrumbs from "./visual-breadcrumbs"
import HowIWorkSection from "./how-i-work-section"
import FaqSplit from "./faq-split"
import StickyContactBar from "./sticky-contact-bar"
import { FAQ } from "@/interfaces/faq"

// Página completa de la auditoría de conversión. No usa <ServicePageTemplate />
// porque su maquetación es propia (hero a dos columnas, comparativa, timeline y
// FAQ partida). Toda la página está escrita en primera persona del singular.

interface FunnelRow {
  label: string
  value: string
  /** Ancho de la barra, en % */
  pct: number
  isLeak?: boolean
}

interface AuditCopy {
  hero: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    sub: string
    ctaPrimary: string
    ctaSecondary: string
    meta: string[]
    card: {
      eyebrow: string
      tag: string
      leakTag: string
      rows: FunnelRow[]
      note: string
    }
  }
  marquee: string[]
  includes: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    badEyebrow: string
    bad: string[]
    goodEyebrow: string
    good: { title: string; description: string }[]
  }
  faq: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    intro: string
    linkLabel: string
  }
  sticky: {
    title: string
    price: string
    ctaLabel: string
  }
  structuredData: {
    serviceName: string
    description: string
  }
}

const COPY: Record<"es" | "en", AuditCopy> = {
  es: {
    hero: {
      eyebrow: "Auditoría de conversión · Shopify",
      titleLine1: "Tienes visitas.",
      titleLine2: "Te faltan ventas.",
      sub: "Te digo qué cambiaría en tu tienda para vender más, por qué, y por dónde empezar.",
      ctaPrimary: "Contactar",
      ctaSecondary: "Ver qué incluye",
      meta: ["140€ + IVA", "Auditoría en 7-10 días", "Sin permanencia"],
      card: {
        eyebrow: "Dónde se pierden tus clientes",
        tag: "Ejemplo",
        leakTag: "Fuga",
        rows: [
          { label: "Entran a la tienda", value: "100%", pct: 100 },
          { label: "Ven un producto", value: "58%", pct: 58 },
          { label: "Añaden al carrito", value: "7%", pct: 7, isLeak: true },
          { label: "Llegan al checkout", value: "4%", pct: 4 },
          { label: "Compran", value: "1,3%", pct: 1.3 },
        ],
        note: "La auditoría encuentra tu fuga real — y te dice qué arreglar primero.",
      },
    },
    marquee: [
      "Sin permanencia",
      "Web completa",
      "Listado de tareas",
      "Sin jerga",
      "Próximos pasos",
      "Precio cerrado",
    ],
    includes: {
      eyebrow: "Qué incluye",
      titleLine1: "Un plan claro,",
      titleLine2: "no una lista de 50 sugerencias genéricas.",
      badEyebrow: "Lo que suele llegarte",
      bad: [
        "Un PDF de 80 páginas",
        "Sugerencias sin prioridad",
        "Jerga que nadie entiende",
        "«¿Y ahora qué hago?»",
      ],
      goodEyebrow: "Lo que te entrego con la auditoría",
      good: [
        {
          title: "Web completa",
          description: "Audito toda tu tienda, desde la landing al pago.",
        },
        {
          title: "Listado de tareas",
          description: "Qué arreglar y en qué orden, desde que entran hasta que pagan.",
        },
        {
          title: "Sin jerga, sin relleno",
          description: "Un documento breve y claro, que entiendes a la primera.",
        },
        {
          title: "Próximos pasos concretos",
          description: "Sabes exactamente qué se va a hacer después de leerlo.",
        },
      ],
    },
    faq: {
      eyebrow: "Preguntas",
      titleLine1: "Lo que me",
      titleLine2: "suelen preguntar.",
      intro: "¿Tu duda no está aquí? Escríbeme y te respondo yo, sin comerciales de por medio.",
      linkLabel: "Hacer una pregunta",
    },
    sticky: {
      title: "Auditoría de conversión",
      price: "140€ + IVA",
      ctaLabel: "Contactar",
    },
    structuredData: {
      serviceName: "Auditoría de conversión",
      description:
        "Reviso tu tienda Shopify, detecto qué frena las ventas y te entrego un listado de tareas ordenado por impacto.",
    },
  },
  en: {
    hero: {
      eyebrow: "Conversion audit · Shopify",
      titleLine1: "You have visits.",
      titleLine2: "You're missing sales.",
      sub: "I tell you what I would change in your store to sell more, why, and where to start.",
      ctaPrimary: "Get in touch",
      ctaSecondary: "See what's included",
      meta: ["€140 + VAT", "Audit in 7-10 days", "No lock-in"],
      card: {
        eyebrow: "Where you lose customers",
        tag: "Example",
        leakTag: "Leak",
        rows: [
          { label: "They land on your store", value: "100%", pct: 100 },
          { label: "They view a product", value: "58%", pct: 58 },
          { label: "They add to cart", value: "7%", pct: 7, isLeak: true },
          { label: "They reach checkout", value: "4%", pct: 4 },
          { label: "They buy", value: "1.3%", pct: 1.3 },
        ],
        note: "The audit finds your real leak — and tells you what to fix first.",
      },
    },
    marquee: [
      "No lock-in",
      "Full store",
      "Task list",
      "No jargon",
      "Next steps",
      "Fixed price",
    ],
    includes: {
      eyebrow: "What's included",
      titleLine1: "A clear plan,",
      titleLine2: "not a list of 50 generic suggestions.",
      badEyebrow: "What usually lands in your inbox",
      bad: [
        "An 80-page PDF",
        "Suggestions with no priority",
        "Jargon nobody understands",
        "“So what do I do now?”",
      ],
      goodEyebrow: "What I hand you with the audit",
      good: [
        {
          title: "Full store",
          description: "I audit your whole store, from the landing page to the payment.",
        },
        {
          title: "Task list",
          description: "What to fix and in what order, from the moment they arrive to the moment they pay.",
        },
        {
          title: "No jargon, no filler",
          description: "A short, clear document you understand first time.",
        },
        {
          title: "Concrete next steps",
          description: "You know exactly what will be done after reading it.",
        },
      ],
    },
    faq: {
      eyebrow: "Questions",
      titleLine1: "What people",
      titleLine2: "usually ask me.",
      intro: "Not seeing your question? Write to me and I'll answer you myself, no sales reps in between.",
      linkLabel: "Ask a question",
    },
    sticky: {
      title: "Conversion audit",
      price: "€140 + VAT",
      ctaLabel: "Get in touch",
    },
    structuredData: {
      serviceName: "Conversion audit",
      description:
        "I review your Shopify store, find what's holding sales back and hand you a task list ordered by impact.",
    },
  },
}

export default function ConversionAuditPage({
  locale,
  contactHref,
  faqs,
}: {
  locale: "es" | "en"
  contactHref: string
  faqs: FAQ[]
}) {
  const c = COPY[locale]
  const marqueeContent = c.marquee.join("  +  ") + "  +  "

  return (
    <>
      <ServiceStructuredData
        serviceName={c.structuredData.serviceName}
        serviceType="conversionAudit"
        description={c.structuredData.description}
      />
      <VisualBreadcrumbs />

      {/* Hero */}
      <section className="bg-sw-bg-0 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <span className="font-mono-label text-sw-fg-3">{c.hero.eyebrow}</span>

              <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl">
                <span className="block text-sw-fg-1">{c.hero.titleLine1}</span>
                <span className="block text-sw-secondary">{c.hero.titleLine2}</span>
              </h1>

              <p className="mt-7 max-w-md text-lg leading-relaxed text-sw-fg-2">{c.hero.sub}</p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href={contactHref}
                  className="rounded-sm bg-sw-brand px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-sw-brand-hover"
                >
                  {c.hero.ctaPrimary}
                </Link>
                <a
                  href="#incluye"
                  className="rounded-sm border border-sw-line-strong px-7 py-4 text-base font-semibold text-sw-fg-1 transition-colors hover:border-sw-fg-1"
                >
                  {c.hero.ctaSecondary}
                </a>
              </div>

              <ul className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2">
                {c.hero.meta.map((item, index) => (
                  <li key={item} className="flex items-center gap-4">
                    {index > 0 && (
                      <span aria-hidden="true" className="text-sw-fg-4">
                        ·
                      </span>
                    )}
                    <span
                      className={`font-mono-label ${
                        index === 0 ? "text-sw-secondary" : "text-sw-fg-4"
                      }`}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tarjeta de ejemplo: dónde se pierden los clientes */}
            <div className="rounded-sm border border-sw-line bg-sw-bg-2 p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono-label text-sw-fg-3">{c.hero.card.eyebrow}</span>
                <span className="font-mono-label text-sw-fg-4">{c.hero.card.tag}</span>
              </div>

              <ul className="mt-8 space-y-5">
                {c.hero.card.rows.map((row) => (
                  <li key={row.label}>
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex items-center gap-3 text-sm text-sw-fg-1">
                        {row.label}
                        {row.isLeak && (
                          <span className="rounded-sm border border-sw-brand px-2 py-0.5 font-mono-label text-sw-brand">
                            {c.hero.card.leakTag}
                          </span>
                        )}
                      </span>
                      <span
                        className={`font-mono-label ${
                          row.isLeak ? "text-sw-brand" : "text-sw-fg-1"
                        }`}
                      >
                        {row.value}
                      </span>
                    </div>
                    <div aria-hidden="true" className="mt-2 h-1 w-full bg-sw-bg-3">
                      <div
                        className={`h-full ${row.isLeak ? "bg-sw-brand" : "bg-sw-secondary"}`}
                        style={{ width: `${Math.max(row.pct, 1.5)}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mt-8 border-t border-sw-line pt-6 text-sm leading-relaxed text-sw-secondary">
                {c.hero.card.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cinta */}
      <div className="overflow-hidden whitespace-nowrap border-y border-sw-line bg-sw-secondary py-3">
        <div className="flex w-max animate-marquee">
          <span className="font-mono-label text-black">{marqueeContent}</span>
          <span className="font-mono-label text-black" aria-hidden="true">
            {marqueeContent}
          </span>
        </div>
      </div>

      {/* 01 — Qué incluye */}
      <section id="incluye" className="bg-sw-bg-0 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex items-center justify-between gap-6">
            <span className="font-mono-label text-sw-fg-3">{c.includes.eyebrow}</span>
            <span className="font-mono-label text-sw-secondary">01</span>
          </div>

          <h2 className="mt-6 max-w-3xl font-display text-4xl sm:text-5xl lg:text-6xl">
            <span className="block text-sw-fg-1">{c.includes.titleLine1}</span>
            <span className="block text-sw-secondary">{c.includes.titleLine2}</span>
          </h2>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {/* Lo que suele llegarte */}
            <div className="rounded-sm border border-sw-line p-7 sm:p-8">
              <span className="font-mono-label text-sw-fg-4">{c.includes.badEyebrow}</span>
              <ul className="mt-7 space-y-5">
                {c.includes.bad.map((item) => (
                  <li key={item} className="flex items-center gap-4">
                    <X className="h-4 w-4 flex-shrink-0 text-sw-fg-4" aria-hidden="true" />
                    <span className="text-sw-fg-4 line-through">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lo que te entrego */}
            <div className="rounded-sm border border-sw-secondary bg-sw-secondary-strong p-7 sm:p-8">
              <span className="font-mono-label text-white">{c.includes.goodEyebrow}</span>
              <ul className="mt-7 space-y-6">
                {c.includes.good.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/20"
                    >
                      <Check className="h-3 w-3 text-white" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/85">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Cómo trabajo */}
      <HowIWorkSection
        locale={locale}
        variant="expanded"
        ctaHref={contactHref}
        sectionNumber="02"
      />

      {/* 03 — Preguntas */}
      <FaqSplit
        eyebrow={c.faq.eyebrow}
        sectionNumber="03"
        titleLine1={c.faq.titleLine1}
        titleLine2={c.faq.titleLine2}
        intro={c.faq.intro}
        linkLabel={c.faq.linkLabel}
        linkHref={contactHref}
        faqs={faqs}
      />

      <StickyContactBar
        title={c.sticky.title}
        price={c.sticky.price}
        ctaLabel={c.sticky.ctaLabel}
        ctaHref={contactHref}
      />
    </>
  )
}

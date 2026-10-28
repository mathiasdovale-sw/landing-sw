import Link from "next/link"
import { BarChart3, CalendarCheck, Check, Wrench } from "lucide-react"
import ServiceStructuredData from "./service-structured-data"
import VisualBreadcrumbs from "./visual-breadcrumbs"
import FAQAccordion from "./faq-accordion"
import StickyContactBar from "./sticky-contact-bar"
import { FAQ } from "@/interfaces/faq"

// Página principal de venta: Mejora continua. Un único CTA: contacto (reunión gratis).

const ICONS = [Wrench, BarChart3, CalendarCheck]

const COPY = {
  es: {
    contact: "/es/contacto",
    migrationHref: "/es/migracion-shopify",
    cta: "Pide una reunión gratis",
    sd: {
      name: "Mejora continua para tiendas Shopify",
      description:
        "Servicio mensual sin permanencia (290 € + IVA al mes): al menos 4 mejoras implementadas al mes, informe de facturación por visita y una reunión mensual.",
    },
    eyebrow: "Mejora continua · Para tiendas en Shopify",
    h1: ["Que cada visita", "venda más."],
    lede: "Hago que tu tienda Shopify venda más por cada visita, sin gastar más en anuncios. Cada mes, al menos 4 mejoras implementadas y un informe de cómo evoluciona.",
    priceLabel: "Precio",
    price: "290 €",
    priceSuffix: "+ IVA al mes",
    priceNote: "Sin permanencia: pagas mes a mes y cancelas cuando quieras.",
    includes: [
      { title: "Al menos 4 mejoras implementadas al mes", text: "No te entrego una lista: las implemento yo en tu tienda." },
      { title: "Informe mensual de facturación por visita", text: "Cuánto factura tu tienda por cada visita y cómo evoluciona mes a mes." },
      { title: "Una reunión al mes", text: "Qué se hizo, qué viene y cómo va la facturación por visita." },
    ],
    includesEyebrow: "Qué incluye",
    includesTitle: "Trabajo hecho, no recomendaciones.",
    howEyebrow: "Cómo funciona",
    howTitle: "Empiezo por lo que más frena tus ventas.",
    firstMonthTitle: "El primer mes",
    firstMonthText:
      "Veo cuánto tráfico tiene tu tienda, detecto qué frena más las ventas y lo implemento. Desde el segundo mes, al menos 4 mejoras nuevas cada mes.",
    sourceTitle: "De dónde salen las mejoras: depende de tu tráfico",
    sourceText:
      "Con poco tráfico, mejoras heurísticas (buenas prácticas de experiencia de compra) y datos cualitativos: grabaciones de sesiones reales con Microsoft Clarity, que es gratis para ti. Con mucho tráfico, priorizo los tests A/B: cada cambio se prueba contra la versión actual.",
    typesTitle: "Qué tipo de mejoras entran",
    types: ["Diseño", "Ficha de producto", "Confianza", "Checkout", "Emails automáticos: bienvenida, carrito abandonado, post-compra y reseñas", "Pequeños desarrollos"],
    apartEyebrow: "Qué va aparte",
    apartTitle: "Sin sorpresas.",
    apart: [
      "Las mejoras del mes te las propongo yo, a partir de los datos y de lo que veo en tu tienda.",
      "Si quieres algo que no está en esa propuesta (una sección nueva, una integración, un rediseño), te envío un presupuesto antes de empezar.",
      "Tú decides si se hace. Nada se cobra sin que lo hayas aprobado.",
    ],
    measureEyebrow: "Cómo se mide",
    measureTitle: "En tendencia, durante varios meses.",
    measureText:
      "Lo que se mide es la facturación por visita. Las ventas de un mes dependen de muchas cosas: la temporada, los anuncios, el stock. Por eso miro cómo evoluciona durante varios meses, no el número de un mes suelto.",
    measureText2: "No te prometo cifras. Te prometo el trabajo y que lo veas medido.",
    closingTitle: "Empezamos con una reunión gratis.",
    notShopify: "¿No estás en Shopify?",
    seeMigration: "Mira la migración",
    faqTitle: "Preguntas sobre la mejora continua",
    stickyTitle: "Mejora continua",
    stickyPrice: "290 € + IVA al mes · Sin permanencia",
  },
  en: {
    contact: "/en/contact",
    migrationHref: "/en/shopify-migration",
    cta: "Book a free meeting",
    sd: {
      name: "Continuous improvement for Shopify stores",
      description:
        "Monthly plan with no lock-in (€290 + VAT per month): at least 4 improvements implemented every month, a revenue-per-visit report and a monthly meeting.",
    },
    eyebrow: "Continuous improvement · For Shopify stores",
    h1: ["Make every visit", "sell more."],
    lede: "I make your Shopify store sell more per visit, without spending more on ads. Every month, at least 4 improvements implemented and a report on how it's evolving.",
    priceLabel: "Price",
    price: "€290",
    priceSuffix: "+ VAT per month",
    priceNote: "No lock-in: pay month to month and cancel whenever you want.",
    includes: [
      { title: "At least 4 improvements implemented every month", text: "I don't hand you a list: I implement them in your store myself." },
      { title: "Monthly revenue-per-visit report", text: "How much revenue each visit brings in and how it changes month to month." },
      { title: "One meeting a month", text: "What was done, what's next and how revenue per visit is doing." },
    ],
    includesEyebrow: "What's included",
    includesTitle: "Work done, not recommendations.",
    howEyebrow: "How it works",
    howTitle: "I start with what's holding your sales back the most.",
    firstMonthTitle: "The first month",
    firstMonthText:
      "I check how much traffic your store gets, find what's holding sales back the most and implement it. From the second month, at least 4 new improvements every month.",
    sourceTitle: "Where the improvements come from: it depends on your traffic",
    sourceText:
      "With low traffic, conversion best practices and qualitative data: real session recordings with Microsoft Clarity, which is free for you. With high traffic, I prioritise A/B tests: every change is tested against the current version.",
    typesTitle: "What kind of improvements are included",
    types: ["Design", "Product page", "Trust", "Checkout", "Automated emails: welcome, abandoned cart, post-purchase and reviews", "Small developments"],
    apartEyebrow: "What's billed separately",
    apartTitle: "No surprises.",
    apart: [
      "I propose the month's improvements myself, based on the data and what I see in your store.",
      "If you want something outside that proposal (a new section, an integration, a redesign), I send you a quote before starting.",
      "You decide whether it gets done. Nothing is charged without your approval.",
    ],
    measureEyebrow: "How it's measured",
    measureTitle: "As a trend, over several months.",
    measureText:
      "What gets measured is revenue per visit. A single month's sales depend on many things: the season, ads, stock. That's why I look at how it evolves over several months, not at one month in isolation.",
    measureText2: "I don't promise numbers. I promise the work, and that you'll see it measured.",
    closingTitle: "We start with a free meeting.",
    notShopify: "Not on Shopify?",
    seeMigration: "See the migration",
    faqTitle: "Continuous improvement FAQ",
    stickyTitle: "Continuous improvement",
    stickyPrice: "€290 + VAT per month · No lock-in",
  },
}

function SectionHead({ eyebrow, title, n }: { eyebrow: string; title: string; n: string }) {
  return (
    <>
      <div className="flex items-center justify-between gap-6">
        <span className="font-mono-label text-sw-fg-3">{eyebrow}</span>
        <span className="font-mono-label text-sw-secondary">{n}</span>
      </div>
      <h2 className="mt-6 max-w-3xl font-display text-3xl text-sw-fg-1 sm:text-4xl lg:text-5xl">{title}</h2>
    </>
  )
}

export default function MonthlyPage({ locale, faqs }: { locale: "es" | "en"; faqs: FAQ[] }) {
  const c = COPY[locale]
  return (
    <>
      <ServiceStructuredData serviceName={c.sd.name} serviceType="monthly" description={c.sd.description} />
      <VisualBreadcrumbs />

      {/* Hero */}
      <section className="bg-sw-bg-0 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <span className="font-mono-label text-sw-fg-3">{c.eyebrow}</span>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl">
              <span className="block text-sw-fg-1">{c.h1[0]}</span>
              <span className="block text-sw-secondary">{c.h1[1]}</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-sw-fg-2">{c.lede}</p>
            <Link
              href={c.contact}
              className="mt-9 inline-block rounded-sm bg-sw-brand px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-sw-brand-hover"
            >
              {c.cta}
            </Link>
          </div>

          <div className="rounded-sm border border-sw-line bg-sw-bg-2 p-6 sm:p-8">
            <span className="font-mono-label text-sw-fg-3">{c.priceLabel}</span>
            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-5xl text-sw-fg-1 sm:text-6xl">{c.price}</span>
              <span className="font-mono-label text-sw-fg-3">{c.priceSuffix}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-sw-fg-3">{c.priceNote}</p>
            <ul className="mt-7 space-y-3">
              {c.includes.map((i) => (
                <li key={i.title} className="flex gap-3 text-sm leading-relaxed text-sw-fg-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-sw-secondary" aria-hidden="true" />
                  {i.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 01 — Qué incluye */}
      <section id="incluye" className="bg-sw-bg-1 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHead eyebrow={c.includesEyebrow} n="01" title={c.includesTitle} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {c.includes.map(({ title, text }, idx) => {
              const Icon = ICONS[idx]
              return (
                <div key={title} className="rounded-sm border border-sw-line bg-sw-bg-2 p-6">
                  <Icon className="h-6 w-6 text-sw-secondary" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-semibold text-sw-fg-1">{title}</h3>
                  <p className="mt-2 text-sw-fg-2">{text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 02 — Cómo funciona */}
      <section className="bg-sw-bg-0 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHead eyebrow={c.howEyebrow} n="02" title={c.howTitle} />
          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h3 className="text-lg font-semibold text-sw-secondary">{c.firstMonthTitle}</h3>
              <p className="mt-3 text-lg leading-relaxed text-sw-fg-2">{c.firstMonthText}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sw-secondary">{c.sourceTitle}</h3>
              <p className="mt-3 text-lg leading-relaxed text-sw-fg-2">{c.sourceText}</p>
            </div>
          </div>

          <h3 className="mt-14 text-lg font-semibold text-sw-fg-1">{c.typesTitle}</h3>
          <ul className="mt-5 flex flex-wrap gap-3">
            {c.types.map((t) => (
              <li key={t} className="rounded-sm border border-sw-line-strong px-4 py-2 text-sm text-sw-fg-2">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 — Qué va aparte y cómo se mide */}
      <section className="bg-sw-bg-1 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHead eyebrow={c.apartEyebrow} n="03" title={c.apartTitle} />
            <ol className="mt-10 space-y-5">
              {c.apart.map((rule, i) => (
                <li key={rule} className="flex gap-4">
                  <span className="font-mono-label text-sw-secondary">{String(i + 1).padStart(2, "0")}</span>
                  <span className="leading-relaxed text-sw-fg-2">{rule}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <SectionHead eyebrow={c.measureEyebrow} n="04" title={c.measureTitle} />
            <p className="mt-10 text-lg leading-relaxed text-sw-fg-2">{c.measureText}</p>
            <p className="mt-4 text-lg leading-relaxed text-sw-fg-2">{c.measureText2}</p>
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="bg-sw-bg-0 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="font-display text-3xl text-sw-fg-1 sm:text-4xl lg:text-5xl">{c.closingTitle}</h2>
          <Link
            href={c.contact}
            className="mt-9 inline-block rounded-sm bg-sw-brand px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-sw-brand-hover"
          >
            {c.cta}
          </Link>
          <p className="mt-8 text-sm text-sw-fg-4">
            {c.notShopify}{" "}
            <Link href={c.migrationHref} className="underline underline-offset-2 hover:text-sw-fg-2">
              {c.seeMigration}
            </Link>
            .
          </p>
        </div>
      </section>

      <FAQAccordion faqs={faqs} title={c.faqTitle} className="bg-sw-bg-1" />

      <StickyContactBar title={c.stickyTitle} price={c.stickyPrice} ctaLabel={c.cta} ctaHref={c.contact} />
    </>
  )
}

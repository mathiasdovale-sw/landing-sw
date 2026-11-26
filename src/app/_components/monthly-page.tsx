import Link from "next/link"
import { Check } from "lucide-react"
import ServiceStructuredData from "./service-structured-data"
import VisualBreadcrumbs from "./visual-breadcrumbs"
import FAQAccordion from "./faq-accordion"
import StickyContactBar from "./sticky-contact-bar"
import { FAQ } from "@/interfaces/faq"
import { MAIN_CTA } from "@/lib/commitments"

// Acompañamiento mensual (/mejora-continua): explica cómo funciona el trabajo mensual
// sin publicar planes ni precios. Cada propuesta se adapta al cliente.

const COPY = {
  es: {
    contact: "/es/contacto",
    cta: MAIN_CTA.es,
    sd: {
      name: "Acompañamiento mensual de marketing y tecnología",
      description:
        "Servicio mensual sin permanencia: gestión de anuncios, mejoras de la web y un informe mensual con lo hecho, los resultados y lo siguiente. Propuesta a medida.",
    },
    eyebrow: "Acompañamiento mensual · Anuncios y web",
    h1: ["Marketing y tecnología,", "mejorando cada mes."],
    lede: "Gestionamos tus anuncios, mejoramos tu web y te enseñamos con datos qué funciona. Sin permanencia y con una propuesta adaptada a tu negocio.",
    cardLabel: "Cómo funciona",
    card: [
      "Sin permanencia: pagas mes a mes",
      "Propuesta a medida, por escrito",
      "Informe mensual con lo hecho y los resultados",
      "Nada extra se cobra sin tu aprobación",
    ],
    howEyebrow: "Cómo funciona",
    howTitle: "Trabajo hecho cada mes, con prioridades que decides tú.",
    how: [
      "Definimos juntos qué incluye: anuncios, mejoras técnicas o ambas cosas.",
      "Cada mes hay tareas y reuniones de priorización. Tú decides el orden.",
      "Las tareas pequeñas se entregan en menos de una semana y las medianas en menos de dos.",
      "Cada mes recibes un informe con lo hecho, los resultados y lo siguiente a realizar.",
    ],
    faqTitle: "Preguntas sobre el acompañamiento mensual",
    stickyTitle: "Acompañamiento mensual",
    stickyPrice: "Propuesta a medida · Sin permanencia",
  },
  en: {
    contact: "/en/contact",
    cta: MAIN_CTA.en,
    sd: {
      name: "Monthly marketing and technology support",
      description:
        "Monthly service with no lock-in: ads management, website improvements and a monthly report with what was done, the results and what's next. Tailored proposal.",
    },
    eyebrow: "Monthly support · Ads and website",
    h1: ["Marketing and technology,", "improving every month."],
    lede: "We run your ads, improve your website and show you with data what works. No lock-in and a proposal tailored to your business.",
    cardLabel: "How it works",
    card: [
      "No lock-in: pay month to month",
      "Tailored proposal, in writing",
      "You decide the order of the tasks",
      "Monthly report with what was done and the results",
      "Nothing extra is charged without your approval",
    ],
    howEyebrow: "How it works",
    howTitle: "Work delivered every month, with priorities you set.",
    how: [
      "We agree together what it includes: ads, technical improvements or both.",
      "Every month there are tasks and prioritisation meetings. You decide the order.",
      "Small tasks are delivered in under a week and medium ones in under two. Anything bigger is quoted separately.",
      "Every month you get a report with what was done, the results and what's next.",
    ],
    faqTitle: "Monthly support FAQ",
    stickyTitle: "Monthly support",
    stickyPrice: "Tailored proposal · No lock-in",
  },
}

// Sin numeración de sección: los pasos de "Cómo funciona" ya van numerados.
function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <>
      <span className="font-mono-label text-sw-fg-3">{eyebrow}</span>
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
            <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl">
              <span className="block text-sw-fg-1">{c.h1[0]}</span>{" "}
              <span className="block text-sw-brand">{c.h1[1]}</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-sw-fg-2">{c.lede}</p>
            <Link
              href={c.contact}
              data-hero-cta
              className="mt-9 inline-block rounded-sm bg-sw-brand px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-sw-brand-hover"
            >
              {c.cta}
            </Link>
          </div>

          <div className="rounded-sm border border-sw-line bg-sw-bg-2 p-6 sm:p-8">
            <span className="font-mono-label text-sw-fg-3">{c.cardLabel}</span>
            <ul className="mt-6 space-y-4">
              {c.card.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-sw-fg-1">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-sw-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="incluye" className="bg-sw-bg-1 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHead eyebrow={c.howEyebrow} title={c.howTitle} />
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {c.how.map((step, i) => (
              <li key={step} className="rounded-sm border border-sw-line bg-sw-bg-2 p-6">
                <span className="font-mono-label text-sw-brand">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 leading-relaxed text-sw-fg-1">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FAQAccordion faqs={faqs} title={c.faqTitle} className="bg-sw-bg-0" />

      <StickyContactBar title={c.stickyTitle} price={c.stickyPrice} ctaLabel={c.cta} ctaHref={c.contact} />
    </>
  )
}

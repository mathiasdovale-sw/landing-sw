import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import ServiceStructuredData from "./service-structured-data"
import VisualBreadcrumbs from "./visual-breadcrumbs"
import RelatedServices from "./related-services"
import FAQAccordion from "./faq-accordion"
import AboutMe from "./about-me"
import MobileStickyCta from "./mobile-sticky-cta"
import { FAQ } from "@/interfaces/faq"

// Plantilla de página de servicio (hoy: desarrollo a medida).
// Orden: hero → situaciones → qué incluye → quién soy → cierre → servicios relacionados → preguntas.

export interface ServicePageContent {
  serviceKey: string
  contactHref: string
  eyebrow: string
  title: string
  lede: string
  ctaPrimaryLabel: string
  ctaSecondaryLabel: string
  /** Escenarios posibles (no casos realizados). */
  situations?: { title: string; items: { title: string; description: string }[] }
  includesEyebrow: string
  includesTitle: string
  includes: { title: string; description: string }[]
  includesNote?: string
  closingTitle: string
  closingLede: string
  /** Claves de SERVICES que se muestran en "Servicios relacionados". */
  related: string[]
  faqTitle: string
  faqs: FAQ[]
  structuredData: {
    serviceName: string
    description: string
  }
  locale: 'es' | 'en'
}

export default function ServicePageTemplate({ content }: { content: ServicePageContent }) {
  const c = content

  return (
    <>
      <ServiceStructuredData
        serviceName={c.structuredData.serviceName}
        serviceType={c.serviceKey}
        description={c.structuredData.description}
      />
      <VisualBreadcrumbs />

      {/* Hero */}
      <section className="bg-sw-bg-0 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5">
          <span className="font-mono-label text-sw-fg-3">{c.eyebrow}</span>
          <h1 className="mt-6 max-w-5xl font-display text-[1.75rem] text-sw-fg-1 sm:text-5xl lg:text-6xl">
            {c.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-sw-fg-2 sm:text-xl">
            {c.lede}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={c.contactHref}
              data-hero-cta
              className="rounded-sm bg-sw-brand px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-sw-brand-hover"
            >
              {c.ctaPrimaryLabel}
            </Link>
            <a
              href="#incluye"
              className="rounded-sm border border-sw-line-strong px-7 py-4 text-base font-semibold text-sw-fg-1 transition-colors hover:border-sw-fg-1"
            >
              {c.ctaSecondaryLabel}
            </a>
          </div>
        </div>
      </section>

      {/* Situaciones */}
      {c.situations && (
        <section className="border-t border-sw-line bg-sw-bg-0 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="mb-10 font-display text-3xl text-sw-fg-1 sm:text-4xl">{c.situations.title}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {c.situations.items.map((item) => (
                <div key={item.title} className="rounded-sm border border-sw-line bg-sw-bg-2 p-6">
                  <h3 className="text-lg font-semibold text-sw-fg-1">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-sw-fg-2">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Qué incluye */}
      <section id="incluye" className="bg-sw-bg-1 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 flex items-center justify-between">
            <span className="font-mono-label text-sw-fg-3">{c.includesEyebrow}</span>
          </div>
          <h2 className="mb-10 font-display text-3xl text-sw-fg-1 sm:text-4xl">
            {c.includesTitle}
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {c.includes.map((item) => (
              <div key={item.title} className="flex gap-4">
                <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-sw-brand" />
                <div>
                  <h3 className="text-lg font-semibold text-sw-fg-1">{item.title}</h3>
                  <p className="mt-1 text-sw-fg-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          {c.includesNote && (
            <p className="mt-8 text-sm text-sw-fg-4">{c.includesNote}</p>
          )}
        </div>
      </section>

      <AboutMe locale={c.locale} />

      {/* Closing CTA */}
      <section className="border-t border-sw-line bg-sw-bg-0 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="font-display text-3xl text-sw-fg-1 sm:text-4xl lg:text-5xl">
            {c.closingTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-sw-fg-2">{c.closingLede}</p>
          <div className="mt-9">
            <Link
              href={c.contactHref}
              className="rounded-sm bg-sw-brand px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-sw-brand-hover"
            >
              {c.ctaPrimaryLabel}
            </Link>
          </div>
        </div>
      </section>

      <RelatedServices services={c.related} className="bg-sw-bg-1" />

      <FAQAccordion faqs={c.faqs} title={c.faqTitle} className="bg-sw-bg-0" />

      {/* El formulario está en /contacto: el botón lleva allí con la opción preseleccionada */}
      <MobileStickyCta locale={c.locale} href={c.contactHref} />
    </>
  )
}

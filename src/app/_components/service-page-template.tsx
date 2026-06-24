import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import ServiceStructuredData from "./service-structured-data"
import VisualBreadcrumbs from "./visual-breadcrumbs"
import RelatedServices from "./related-services"
import FAQAccordion from "./faq-accordion"
import { FAQ } from "@/interfaces/faq"

export interface ServicePageContent {
  serviceKey: string
  contactHref: string
  eyebrow: string
  title: string
  lede: string
  priceLabel: string
  priceNote?: string
  ctaPrimaryLabel: string
  ctaSecondaryLabel: string
  includesEyebrow: string
  includesTitle: string
  includes: { title: string; description: string }[]
  closingTitle: string
  closingLede: string
  faqTitle: string
  faqs: FAQ[]
  structuredData: {
    serviceName: string
    description: string
    price?: { currency: string; minPrice?: number; priceRange?: string }
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
        price={c.structuredData.price}
      />
      <VisualBreadcrumbs />

      {/* Hero */}
      <section className="bg-sw-bg-0 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-5 text-center">
          <span className="font-mono-label text-sw-fg-3">{c.eyebrow}</span>
          <h1 className="mt-5 font-display text-4xl text-sw-fg-1 sm:text-5xl lg:text-6xl">
            {c.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-sw-fg-2 sm:text-xl">
            {c.lede}
          </p>
          <div className="mt-8">
            <span className="font-display text-3xl text-sw-brand sm:text-4xl">{c.priceLabel}</span>
            {c.priceNote && (
              <span className="ml-2 font-mono-label text-sw-fg-3">{c.priceNote}</span>
            )}
          </div>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={c.contactHref}
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
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-sw-bg-0 py-16 sm:py-20 lg:py-24">
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

      <RelatedServices currentService={c.serviceKey} className="bg-sw-bg-1" />

      <FAQAccordion faqs={c.faqs} title={c.faqTitle} className="bg-sw-bg-0" />
    </>
  )
}

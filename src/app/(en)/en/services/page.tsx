import type { Metadata } from 'next'
import { generatePageMetadata } from "@/lib/seo-utils"
import AutoBreadcrumbStructuredData from '@/app/_components/auto-breadcrumb-structured-data'
import VisualBreadcrumbs from '@/app/_components/visual-breadcrumbs'
import ServicePaths from '@/app/_components/home/service-paths'
import FAQAccordion from '@/app/_components/faq-accordion'
import { servicesPageFAQsEn } from '@/lib/faqs'

export const metadata: Metadata = generatePageMetadata(
  'services',
  'en',
  'Services: continuous improvement and Shopify migration | SellifyWorks'
)

export default function ServicesPage() {
  return (
    <main>
      <AutoBreadcrumbStructuredData />
      <VisualBreadcrumbs maxWidth="max-w-6xl" />

      {/* Hero */}
      <section className="bg-sw-bg-0 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 text-center">
          <span className="font-mono-label text-sw-fg-3">Services</span>
          <h1 className="mt-5 font-display text-4xl text-sw-fg-1 sm:text-5xl lg:text-6xl">Two paths, depending on where your store is.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-sw-fg-2 sm:text-xl">
            If you're already on Shopify, I make every visit sell more, month after month. If you're on another platform, I migrate your store to Shopify with the
            improvements already done. Either way, we start with a free meeting to understand what's holding your store back.
          </p>
        </div>
      </section>

      <ServicePaths locale="en" contactHref="/en/contact" />

      <FAQAccordion faqs={servicesPageFAQsEn} title="Frequently asked questions" className="bg-sw-bg-0" />
    </main>
  )
}

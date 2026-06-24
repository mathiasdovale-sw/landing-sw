import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from "@/lib/seo-utils"
import AutoBreadcrumbStructuredData from '@/app/_components/auto-breadcrumb-structured-data'
import VisualBreadcrumbs from '@/app/_components/visual-breadcrumbs'
import ServicesSection from '@/app/_components/services-section'
import FAQAccordion from '@/app/_components/faq-accordion'
import { servicesPageFAQsEn } from '@/lib/faqs'

export const metadata: Metadata = generatePageMetadata(
  'services',
  'en',
  'Services & pricing | SellifyWorks'
)

export default function ServicesPage() {
  return (
    <main>
      <AutoBreadcrumbStructuredData />
      <VisualBreadcrumbs maxWidth="max-w-6xl" />

      {/* Hero */}
      <section className="bg-sw-bg-0 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 text-center">
          <span className="font-mono-label text-sw-fg-3">Services & pricing</span>
          <h1 className="mt-5 font-display text-4xl text-sw-fg-1 sm:text-5xl lg:text-6xl">
            Clear pricing, no fine print.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-sw-fg-2 sm:text-xl">
            Every service solves a concrete problem for low-traffic stores. Pick what your store needs now and scale when it makes sense.
          </p>
        </div>
      </section>

      <ServicesSection />

      {/* CTA */}
      <section className="bg-sw-bg-0 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="font-display text-3xl text-sw-fg-1 sm:text-4xl lg:text-5xl">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-sw-fg-2">
            Tell us what's going on with your store and we'll tell you which service makes the most sense for your stage.
          </p>
          <div className="mt-9">
            <Link
              href="/en/contact"
              className="rounded-sm bg-sw-brand px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-sw-brand-hover"
            >
              Let's talk about your store
            </Link>
          </div>
        </div>
      </section>

      <FAQAccordion faqs={servicesPageFAQsEn} className="bg-sw-bg-1" />
    </main>
  )
}

import type { Metadata } from 'next'
import { generatePageMetadata } from "@/lib/seo-utils"
import AutoBreadcrumbStructuredData from '@/app/_components/auto-breadcrumb-structured-data'
import VisualBreadcrumbs from '@/app/_components/visual-breadcrumbs'
import Services from '@/app/_components/home/services'
import FAQAccordion from '@/app/_components/faq-accordion'
import { HomeFAQsEn } from '@/lib/faqs'

export const metadata: Metadata = generatePageMetadata(
  'services',
  'en',
  'Services: ads, technology, analytics and marketing | SellifyWorks'
)

// Services page (not in the menu): the same cards as the home page.
export default function ServicesPage() {
  return (
    <main>
      <AutoBreadcrumbStructuredData />
      <VisualBreadcrumbs maxWidth="max-w-6xl" />

      {/* Hero */}
      <section className="bg-sw-bg-0 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 text-center">
          <span className="font-mono-label text-sw-fg-3">Services</span>
          <h1 className="mt-5 font-display text-4xl text-sw-fg-1 sm:text-5xl lg:text-6xl">Services for small businesses that want to grow online.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-sw-fg-2 sm:text-xl">
            Ads, website, automations and measurement working together so you sell more or win more clients. With one person accountable from start to finish.
          </p>
        </div>
      </section>

      <Services locale="en" />

      <FAQAccordion faqs={HomeFAQsEn} title="Frequently asked questions" className="bg-sw-bg-1" />
    </main>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata } from "@/lib/seo-utils"
import AutoBreadcrumbStructuredData from '@/app/_components/auto-breadcrumb-structured-data'
import VisualBreadcrumbs from '@/app/_components/visual-breadcrumbs'
import ServicesSection from '@/app/_components/services-section'
import FAQAccordion from '@/app/_components/faq-accordion'
import { servicesPageFAQsEs } from '@/lib/faqs'

export const metadata: Metadata = generatePageMetadata(
  'services',
  'es',
  'Servicios | SellifyWorks'
)

export default function ServicesPage() {
  return (
    <main>
      <AutoBreadcrumbStructuredData />
      <VisualBreadcrumbs maxWidth="max-w-6xl" />

      {/* Hero */}
      <section className="bg-sw-bg-0 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 text-center">
          <span className="font-mono-label text-sw-fg-3">Servicios</span>
          <h1 className="mt-5 font-display text-4xl text-sw-fg-1 sm:text-5xl lg:text-6xl">
            Cuatro servicios. Sin relleno.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-sw-fg-2 sm:text-xl">
            Cada servicio resuelve un problema concreto de tiendas con poco tráfico. Sin paquetes genéricos: hablamos de tu tienda y te cotizamos según lo que necesitas.
          </p>
        </div>
      </section>

      <ServicesSection />

      <FAQAccordion faqs={servicesPageFAQsEs} className="bg-sw-bg-1" />
    </main>
  )
}

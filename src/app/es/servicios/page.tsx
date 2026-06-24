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
  'Servicios y precios | SellifyWorks'
)

export default function ServicesPage() {
  return (
    <main>
      <AutoBreadcrumbStructuredData />
      <VisualBreadcrumbs maxWidth="max-w-6xl" />

      {/* Hero */}
      <section className="bg-sw-bg-0 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 text-center">
          <span className="font-mono-label text-sw-fg-3">Servicios y precios</span>
          <h1 className="mt-5 font-display text-4xl text-sw-fg-1 sm:text-5xl lg:text-6xl">
            Precios claros, sin letra pequeña.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-sw-fg-2 sm:text-xl">
            Cada servicio resuelve un problema concreto de tiendas con poco tráfico. Eliges lo que tu tienda necesita ahora y escalas cuando tenga sentido.
          </p>
        </div>
      </section>

      <ServicesSection />

      {/* CTA */}
      <section className="bg-sw-bg-0 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="font-display text-3xl text-sw-fg-1 sm:text-4xl lg:text-5xl">
            ¿No sabes por dónde empezar?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-sw-fg-2">
            Cuéntanos qué está pasando con tu tienda y te decimos qué servicio tiene más sentido para tu etapa.
          </p>
          <div className="mt-9">
            <Link
              href="/es/contacto"
              className="rounded-sm bg-sw-brand px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-sw-brand-hover"
            >
              Hablemos de tu tienda
            </Link>
          </div>
        </div>
      </section>

      <FAQAccordion faqs={servicesPageFAQsEs} className="bg-sw-bg-1" />
    </main>
  )
}

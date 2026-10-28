import type { Metadata } from 'next'
import { generatePageMetadata } from "@/lib/seo-utils"
import AutoBreadcrumbStructuredData from '@/app/_components/auto-breadcrumb-structured-data'
import VisualBreadcrumbs from '@/app/_components/visual-breadcrumbs'
import ServicePaths from '@/app/_components/home/service-paths'
import FAQAccordion from '@/app/_components/faq-accordion'
import { servicesPageFAQsEs } from '@/lib/faqs'

export const metadata: Metadata = generatePageMetadata(
  'services',
  'es',
  'Servicios: mejora continua y migración a Shopify | SellifyWorks'
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
          <h1 className="mt-5 font-display text-4xl text-sw-fg-1 sm:text-5xl lg:text-6xl">Dos caminos, según dónde esté tu tienda.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-sw-fg-2 sm:text-xl">
            Si ya estás en Shopify, hago que cada visita venda más, mes a mes. Si estás en otra plataforma, migro tu tienda a Shopify con las mejoras ya hechas. En
            los dos casos, empezamos con una reunión gratis para entender qué le pasa a tu tienda.
          </p>
        </div>
      </section>

      <ServicePaths locale="es" contactHref="/es/contacto" />

      <FAQAccordion faqs={servicesPageFAQsEs} title="Preguntas frecuentes" className="bg-sw-bg-0" />
    </main>
  )
}

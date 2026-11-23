import type { Metadata } from 'next'
import { generatePageMetadata } from "@/lib/seo-utils"
import AutoBreadcrumbStructuredData from '@/app/_components/auto-breadcrumb-structured-data'
import VisualBreadcrumbs from '@/app/_components/visual-breadcrumbs'
import Services from '@/app/_components/home/services'
import FAQAccordion from '@/app/_components/faq-accordion'
import { HomeFAQsEs } from '@/lib/faqs'

export const metadata: Metadata = generatePageMetadata(
  'services',
  'es',
  'Servicios: anuncios, tecnología, analítica y marketing | SellifyWorks'
)

// Página de servicios (fuera del menú): las mismas tarjetas que la home.
export default function ServicesPage() {
  return (
    <main>
      <AutoBreadcrumbStructuredData />
      <VisualBreadcrumbs maxWidth="max-w-6xl" />

      {/* Hero */}
      <section className="bg-sw-bg-0 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 text-center">
          <span className="font-mono-label text-sw-fg-3">Servicios</span>
          <h1 className="mt-5 font-display text-4xl text-sw-fg-1 sm:text-5xl lg:text-6xl">Servicios para pymes que quieren crecer online.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-sw-fg-2 sm:text-xl">
            Anuncios, web, automatizaciones y medición trabajando juntos para que vendas más o captes más clientes. Con un único responsable de principio a fin.
          </p>
        </div>
      </section>

      <Services locale="es" />

      <FAQAccordion faqs={HomeFAQsEs} title="Preguntas frecuentes" className="bg-sw-bg-1" />
    </main>
  )
}

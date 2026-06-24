import { Metadata } from 'next'
import ServicePageTemplate from '@/app/_components/service-page-template'
import { landingPagesFAQsEs } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'landingPages',
  'es',
  'Optimización de Landing Pages Shopify | SellifyWorks'
)

export default function OptimizacionLandingPages() {
  return (
    <ServicePageTemplate
      content={{
        serviceKey: 'landingPages',
        contactHref: '/es/contacto',
        locale: 'es',
        eyebrow: 'Conversión · Landing pages',
        title: 'Optimización de landing pages',
        lede: 'Rediseñamos tus páginas clave con un único objetivo: que conviertan. Aplicamos heurísticas de CRO probadas.',
        priceLabel: '339€',
        priceNote: '+ IVA · por página',
        ctaPrimaryLabel: 'Habla con un experto',
        ctaSecondaryLabel: 'Ver qué incluye',
        includesEyebrow: 'Qué incluye',
        includesTitle: 'Cada elemento, pensado para vender.',
        includes: [
          { title: 'Jerarquía visual clara', description: 'Lo importante se ve primero, sin distracciones.' },
          { title: 'CTAs que funcionan', description: 'Llamadas a la acción visibles, en el momento correcto.' },
          { title: 'Trust signals', description: 'Reseñas, garantías y señales de confianza donde importan.' },
          { title: 'Flujo de compra optimizado', description: 'Menos fricción entre el interés y el clic en comprar.' },
        ],
        closingTitle: 'Tu página ya tiene tráfico. Que empiece a convertir.',
        closingLede: 'Dinos qué página quieres optimizar primero, normalmente tu producto top o tu home.',
        faqTitle: 'Preguntas sobre optimización de landing pages',
        faqs: landingPagesFAQsEs,
        structuredData: {
          serviceName: 'Optimización de landing pages',
          description: 'Rediseño de páginas clave aplicando heurísticas de CRO probadas, con un único objetivo: convertir.',
          price: { currency: 'EUR', minPrice: 339 },
        },
      }}
    />
  )
}

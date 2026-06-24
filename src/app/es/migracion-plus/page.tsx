import { Metadata } from 'next'
import ServicePageTemplate from '@/app/_components/service-page-template'
import { migrationPlusFAQsEs } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'migrationPlus',
  'es',
  'Migración Plus | SellifyWorks'
)

export default function MigracionPlus() {
  return (
    <ServicePageTemplate
      content={{
        serviceKey: 'migrationPlus',
        contactHref: '/es/contacto',
        locale: 'es',
        eyebrow: 'Fundación · Recomendado',
        title: 'Migración Plus',
        lede: 'Todo lo de Migración + conversion research, para lanzar tu tienda nueva ya optimizada desde el día uno.',
        priceLabel: '3.120€',
        priceNote: '+ IVA',
        ctaPrimaryLabel: 'Habla con un experto',
        ctaSecondaryLabel: 'Ver qué incluye',
        includesEyebrow: 'Qué incluye',
        includesTitle: 'Migración + el research que evita rediseñar dos veces.',
        includes: [
          { title: 'Todo lo de Migración', description: 'Auditoría, diseño, carga de productos y transferencia sin cortar ventas.' },
          { title: 'Conversion research incluido', description: 'Analizamos por qué tus visitantes actuales no compran antes de construir.' },
          { title: 'Decisiones basadas en datos', description: 'El research informa el diseño de la nueva tienda, no al revés.' },
          { title: 'Pensado para tiendas que ya facturan', description: 'Ideal si superas los 4.000€/mes y no quieres perder tiempo optimizando después.' },
        ],
        closingTitle: 'Lanza optimizando desde el primer día.',
        closingLede: 'Si tu tienda ya genera ventas, no tiene sentido migrar a ciegas y optimizar después. Hagámoslo junto.',
        faqTitle: 'Preguntas sobre Migración Plus',
        faqs: migrationPlusFAQsEs,
        structuredData: {
          serviceName: 'Migración Plus',
          description: 'Migración completa a Shopify + conversion research, para lanzar optimizando desde el día uno.',
          price: { currency: 'EUR', minPrice: 3120 },
        },
      }}
    />
  )
}

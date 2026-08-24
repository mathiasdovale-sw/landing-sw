import { Metadata } from 'next'
import ServicePageTemplate from '@/app/_components/service-page-template'
import { migrationFAQsEs } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'migration',
  'es',
  'Migración a Shopify | SellifyWorks'
)

export default function MigracionShopify() {
  return (
    <ServicePageTemplate
      content={{
        serviceKey: 'migration',
        contactHref: '/es/contacto',
        locale: 'es',
        eyebrow: 'Fundación · Migración',
        title: 'Migración a Shopify',
        lede: 'Migramos tu tienda a Shopify sin perder datos ni cortar las ventas. Auditoría, diseño, carga de productos y transferencia, llave en mano.',
        ctaPrimaryLabel: 'Contactar',
        ctaSecondaryLabel: 'Ver qué incluye',
        includesEyebrow: 'Qué incluye',
        includesTitle: 'Todo lo necesario para migrar sin sorpresas.',
        includes: [
          { title: 'Auditoría previa', description: 'Revisamos tu tienda actual, catálogo y configuraciones antes de mover nada.' },
          { title: 'Diseño adaptado', description: 'Tu nueva tienda en Shopify, fiel a tu marca, lista para vender desde el primer día.' },
          { title: 'Carga y copy de productos*', description: 'Subimos tu catálogo completo con fichas de producto cuidadas.' },
          { title: 'Transferencia sin downtime', description: 'Tu tienda actual sigue vendiendo hasta el cambio final, sin cortes.' },
        ],
        includesNote: '*Incluye hasta 25 productos/variantes.',
        closingTitle: '¿Listo para mudarte a Shopify?',
        closingLede: 'Cuéntanos en qué plataforma estás hoy y te decimos exactamente qué implica migrar tu tienda.',
        faqTitle: 'Preguntas sobre la migración',
        faqs: migrationFAQsEs,
        structuredData: {
          serviceName: 'Migración a Shopify',
          description: 'Auditoría, diseño, carga y copy de productos, desarrollo y transferencia a Shopify, sin cortar las ventas.',
        },
      }}
    />
  )
}

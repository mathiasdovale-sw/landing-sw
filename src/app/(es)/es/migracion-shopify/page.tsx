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
        eyebrow: 'Migración + mejoras',
        title: 'Migración a Shopify',
        lede: 'Migramos tu tienda a Shopify sin perder datos ni cortar las ventas, y aprovechamos la mudanza para aplicar mejoras de conversión heurísticas. Llave en mano.',
        ctaPrimaryLabel: 'Contactar',
        ctaSecondaryLabel: 'Ver qué incluye',
        includesEyebrow: 'Qué incluye',
        includesTitle: 'Todo lo necesario para migrar sin sorpresas.',
        includes: [
          { title: 'Mejoras de conversión heurísticas', description: 'Aplicamos criterios de experiencia de usuario en portada, navegación, fichas y checkout: tu tienda nueva sale vendiendo mejor que la anterior.' },
          { title: 'Auditoría previa', description: 'Revisamos tu tienda actual, catálogo y configuraciones antes de mover nada.' },
          { title: 'Diseño adaptado', description: 'Tu nueva tienda en Shopify, fiel a tu marca, lista para vender desde el primer día.' },
          { title: 'Carga y copy de productos', description: 'Subimos tu catálogo completo con fichas de producto cuidadas.' },
          { title: 'Transferencia sin downtime', description: 'Tu tienda actual sigue vendiendo hasta el cambio final, sin cortes.' },
        ],
        closingTitle: '¿Listo para mudarte a Shopify?',
        closingLede: 'Cuéntanos en qué plataforma estás hoy y te decimos exactamente qué implica migrar tu tienda.',
        faqTitle: 'Preguntas sobre la migración',
        faqs: migrationFAQsEs,
        structuredData: {
          serviceName: 'Migración a Shopify',
          description: 'Migración a Shopify con mejoras de conversión heurísticas: diseño, carga y copy de productos, desarrollo y transferencia, sin cortar las ventas.',
        },
      }}
    />
  )
}

import { Metadata } from 'next'
import ServicePageTemplate from '@/app/_components/service-page-template'
import { conversionAuditFAQsEs } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'conversionAudit',
  'es',
  'Auditoría de Conversión Shopify | SellifyWorks'
)

export default function AuditoriaConversion() {
  return (
    <ServicePageTemplate
      content={{
        serviceKey: 'conversionAudit',
        contactHref: '/es/contacto',
        locale: 'es',
        eyebrow: 'Conversión · Auditoría',
        title: 'Auditoría de conversión',
        lede: 'Detectamos exactamente qué está frenando tus ventas y te entregamos un plan de acción priorizado por impacto.',
        priceLabel: '480€',
        priceNote: '+ IVA',
        ctaPrimaryLabel: 'Habla con un experto',
        ctaSecondaryLabel: 'Ver qué incluye',
        includesEyebrow: 'Qué incluye',
        includesTitle: 'Un plan claro, no una lista de 50 sugerencias genéricas.',
        includes: [
          { title: 'Revisión completa del funnel', description: 'Home, producto, carrito y checkout, paso a paso.' },
          { title: 'Priorización por impacto', description: 'Te decimos qué arreglar primero según lo que más vende.' },
          { title: 'Sin jerga, sin relleno', description: 'Un documento que puedes leer y entender en una sentada.' },
          { title: 'Próximos pasos concretos', description: 'Sabes exactamente qué hacer después de leerlo.' },
        ],
        closingTitle: 'Entiende qué está frenando tus ventas.',
        closingLede: 'Antes de invertir en más tráfico, asegúrate de que tu tienda convierte lo que ya tiene.',
        faqTitle: 'Preguntas sobre la auditoría de conversión',
        faqs: conversionAuditFAQsEs,
        structuredData: {
          serviceName: 'Auditoría de conversión',
          description: 'Detectamos qué está frenando tus ventas y entregamos un plan de acción priorizado por impacto.',
          price: { currency: 'EUR', minPrice: 480 },
        },
      }}
    />
  )
}

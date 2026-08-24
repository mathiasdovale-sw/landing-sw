import { Metadata } from 'next'
import ServicePageTemplate from '@/app/_components/service-page-template'
import { conversionAuditFAQsEs } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'conversionAudit',
  'es',
  'Mi tienda Shopify tiene tráfico, no vende — auditoría'
)

export default function AuditoriaConversion() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: conversionAuditFAQsEs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServicePageTemplate
        content={{
          serviceKey: 'conversionAudit',
          contactHref: '/es/contacto',
          locale: 'es',
          eyebrow: 'Conversión · Auditoría',
          title: 'Auditoría de conversión',
          lede: 'Detectamos exactamente qué está frenando tus ventas y te entregamos un listado de tareas segun la etapa del funnel.',
          ctaPrimaryLabel: 'Contactar',
          ctaSecondaryLabel: 'Ver qué incluye',
          includesEyebrow: 'Qué incluye',
          includesTitle: 'Un plan claro, no una lista de 50 sugerencias genéricas.',
          includes: [
            { title: 'Web completa', description: 'Auditamos toda tu tienda' },
            { title: 'Listado de tareas', description: 'Te decimos qué arreglar segun la etapa del funnel.' },
            { title: 'Sin jerga, sin relleno', description: 'Un documento que puedes leer y entender en una sentada.' },
            { title: 'Próximos pasos concretos', description: 'Sabes exactamente qué hacer después de leerlo.' },
          ],
          closingTitle: 'Entiende qué está frenando tus ventas.',
          closingLede: 'Antes de invertir en más tráfico, asegúrate de que tu tienda convierte lo que ya tiene.',
          faqTitle: 'Preguntas sobre la auditoría de conversión',
          faqs: conversionAuditFAQsEs,
          structuredData: {
            serviceName: 'Auditoría de conversión',
            description: 'Detectamos qué está frenando tus ventas, y entregamos un plan de acción segun la etapa del funnel.',
          },
        }}
      />
    </>
  )
}

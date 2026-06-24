import { Metadata } from 'next'
import ServicePageTemplate from '@/app/_components/service-page-template'
import { customDevFAQsEs } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'customDev',
  'es',
  'Desarrollos a Medida en Shopify | SellifyWorks'
)

export default function DesarrollosAMedida() {
  return (
    <ServicePageTemplate
      content={{
        serviceKey: 'customDev',
        contactHref: '/es/contacto',
        locale: 'es',
        eyebrow: 'Fundación · A medida',
        title: 'Desarrollos a medida',
        lede: '¿Necesitas algo que no encaja en lo estándar? Funcionalidad personalizada, integraciones y automatizaciones, construidas sobre tu tienda.',
        priceLabel: 'A medida',
        ctaPrimaryLabel: 'Habla con un experto',
        ctaSecondaryLabel: 'Ver qué incluye',
        includesEyebrow: 'Qué incluye',
        includesTitle: 'Para lo que no tiene checkbox en ningún plan.',
        includes: [
          { title: 'Integraciones', description: 'Conectamos tu tienda con el ERP, CRM o herramienta que ya usas.' },
          { title: 'Automatizaciones', description: 'Eliminamos tareas manuales repetitivas con lógica propia.' },
          { title: 'Funcionalidad a medida', description: 'Construimos lo que tu modelo de negocio necesita y Shopify no trae de fábrica.' },
          { title: 'Presupuesto cerrado', description: 'Evaluamos el alcance y te damos un precio fijo antes de empezar.' },
        ],
        closingTitle: '¿Tienes algo específico en mente?',
        closingLede: 'Cuéntanos qué necesitas y te decimos si es viable, cuánto cuesta y cuánto tarda.',
        faqTitle: 'Preguntas sobre desarrollos a medida',
        faqs: customDevFAQsEs,
        structuredData: {
          serviceName: 'Desarrollos a medida',
          description: 'Funcionalidad personalizada, integraciones y automatizaciones construidas sobre tu tienda Shopify.',
          price: { currency: 'EUR', priceRange: 'A medida' },
        },
      }}
    />
  )
}

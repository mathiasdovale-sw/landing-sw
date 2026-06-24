import { Metadata } from 'next'
import ServicePageTemplate from '@/app/_components/service-page-template'
import { emailCampaignsFAQsEs } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'emailCampaigns',
  'es',
  'Campañas de Email Marketing Shopify | SellifyWorks'
)

export default function CampanasEmailMarketing() {
  return (
    <ServicePageTemplate
      content={{
        serviceKey: 'emailCampaigns',
        contactHref: '/es/contacto',
        locale: 'es',
        eyebrow: 'Recurrencia · Campañas',
        title: 'Campañas mensuales de email',
        lede: 'Estrategia mensual, diseño e implementación. 8 emails al mes que mantienen tu marca presente y generan ventas recurrentes.',
        priceLabel: '250€',
        priceNote: '+ IVA · 8 emails/mes',
        ctaPrimaryLabel: 'Habla con un experto',
        ctaSecondaryLabel: 'Ver qué incluye',
        includesEyebrow: 'Qué incluye',
        includesTitle: 'Tu marca, presente en la bandeja de entrada cada mes.',
        includes: [
          { title: 'Estrategia mensual', description: 'Calendario de envíos alineado con tu producto y promociones.' },
          { title: 'Diseño e implementación', description: 'Cada email, diseñado y listo para enviar.' },
          { title: '8 envíos al mes', description: 'Suficiente para mantenerte presente sin saturar a tu lista.' },
          { title: 'Resultados medibles', description: 'Aperturas, clics y ventas por campaña, claros.' },
        ],
        closingTitle: 'No dejes que tu lista se enfríe.',
        closingLede: 'Una lista de suscriptores sin campañas regulares es una oportunidad de venta que se pierde cada mes.',
        faqTitle: 'Preguntas sobre campañas de email',
        faqs: emailCampaignsFAQsEs,
        structuredData: {
          serviceName: 'Campañas mensuales de email',
          description: 'Estrategia mensual, diseño e implementación de 8 emails al mes para tu tienda Shopify.',
          price: { currency: 'EUR', minPrice: 250 },
        },
      }}
    />
  )
}

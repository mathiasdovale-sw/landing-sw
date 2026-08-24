import { Metadata } from 'next'
import ServicePageTemplate from '@/app/_components/service-page-template'
import { emailAutomationFAQsEs } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'emailAutomation',
  'es',
  'Email Marketing Automation Shopify | SellifyWorks'
)

export default function EmailMarketingAutomation() {
  return (
    <ServicePageTemplate
      content={{
        serviceKey: 'emailAutomation',
        contactHref: '/es/contacto',
        locale: 'es',
        eyebrow: 'Recurrencia · Automation',
        title: 'Email marketing automation',
        lede: 'Flujos que venden solos: popup de bienvenida con descuento, welcome flow, post-compra, solicitud de reseña, carrito abandonado y más.',
        ctaPrimaryLabel: 'Contactar',
        ctaSecondaryLabel: 'Ver qué incluye',
        includesEyebrow: 'Qué incluye',
        includesTitle: 'Automatizaciones que trabajan mientras duermes.',
        includes: [
          { title: 'Welcome flow', description: 'Convierte nuevos suscriptores en primeros compradores.' },
          { title: 'Carrito abandonado', description: 'Recupera ventas que ya casi tenías.' },
          { title: 'Post-compra y reseñas', description: 'Construye confianza y consigue prueba social, automáticamente.' },
          { title: 'Configurado y probado', description: 'Cada flujo queda activo y testeado antes de entregarlo.' },
        ],
        closingTitle: 'Pon tu email marketing en automático.',
        closingLede: 'Elige los flujos que tu tienda necesita ahora, suma más cuando tenga sentido.',
        faqTitle: 'Preguntas sobre email marketing automation',
        faqs: emailAutomationFAQsEs,
        structuredData: {
          serviceName: 'Email marketing automation',
          description: 'Flujos automatizados de email marketing: bienvenida, carrito abandonado, post-compra y más.',
        },
      }}
    />
  )
}

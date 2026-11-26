import { Metadata } from 'next'
import ServicePageTemplate from '@/app/_components/service-page-template'
import { adsFAQsEs } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'
import { MAIN_CTA } from '@/lib/commitments'

export const metadata: Metadata = generatePageMetadata(
  'ads',
  'es',
  'Gestión de Google Ads y Meta Ads orientada a rentabilidad | SellifyWorks'
)

// Página del servicio de anuncios. Misma estructura que desarrollos a medida.
// El argumento es la medición.
export default function Anuncios() {
  return (
    <ServicePageTemplate
      content={{
        serviceKey: 'ads',
        contactHref: '/es/contacto?servicio=ads',
        locale: 'es',
        eyebrow: 'Anuncios · Google y Meta',
        title: 'Anuncios que se miden por lo que te dejan, no por los clics.',
        lede: 'Gestionamos tus campañas en Google y Meta con la medición bien montada desde el primer día, para invertir donde de verdad entra dinero.',
        ctaPrimaryLabel: MAIN_CTA.es,
        ctaSecondaryLabel: 'Ver soluciones',
        ctaSecondaryHref: '/es/#soluciones',
        situations: {
          title: '¿Te suena alguna de estas situaciones?',
          items: [
            { title: 'Inviertes en anuncios y no sabes qué te devuelven', description: 'Montamos el tracking de compras o leads y te enseñamos el retorno por campaña.' },
            { title: 'Tu agencia te reporta clics e impresiones, no ventas', description: 'Optimizamos según la rentabilidad de tu negocio.' },
            { title: 'Los anuncios llevan a una página que no convierte', description: 'Lo detectamos con datos y te proponemos la mejora: como proyecto puntual o dentro del acompañamiento mensual.' },
            { title: 'Te llegan contactos, pero no sabes cuáles acaban comprando', description: 'Conectamos los leads con tu email o CRM para seguirlos hasta la venta.' },
          ],
        },
        includesEyebrow: 'Qué incluye',
        includesTitle: 'Campañas gestionadas y medidas.',
        includes: [
          { title: 'Google Ads y Meta Ads', description: 'Búsqueda, Shopping, Performance Max, Facebook e Instagram, según lo que necesite tu negocio.' },
          { title: 'Tracking de conversiones', description: 'Configuramos y revisamos la medición de compras o leads para saber qué funciona de verdad.' },
          { title: 'Gestión y optimización continua', description: 'Ajustamos campañas, pujas, audiencias y anuncios de forma continua.' },
          { title: 'Reuniones de seguimiento e informe mensual', description: 'Qué se hizo, qué resultados hubo y qué viene después.' },
        ],
        includesNote: 'La inversión en anuncios no está incluida: la pagas tú directamente a cada plataforma.',
        closingTitle: '¿Quieres saber qué te devuelven tus anuncios?',
        closingLede: 'Cuéntanos qué inviertes y dónde, y te enviamos una propuesta a medida.',
        related: ['monthly', 'customDev'],
        faqTitle: 'Preguntas sobre los anuncios',
        faqs: adsFAQsEs,
        structuredData: {
          serviceName: 'Gestión de Google Ads y Meta Ads',
          description: 'Gestión y optimización de campañas en Google Ads y Meta Ads con el tracking de conversiones bien montado, reuniones e informe mensual.',
        },
      }}
    />
  )
}

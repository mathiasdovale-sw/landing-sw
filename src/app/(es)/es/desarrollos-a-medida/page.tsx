import { Metadata } from 'next'
import ServicePageTemplate from '@/app/_components/service-page-template'
import { customDevFAQsEs } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'
import { MAIN_CTA } from '@/lib/commitments'

export const metadata: Metadata = generatePageMetadata(
  'customDev',
  'es',
  'Desarrollo a medida: integraciones y automatizaciones para tu negocio | SellifyWorks'
)

export default function DesarrollosAMedida() {
  return (
    <ServicePageTemplate
      content={{
        serviceKey: 'customDev',
        contactHref: '/es/contacto?servicio=customDev',
        locale: 'es',
        eyebrow: 'Desarrollo a medida · Shopify, WooCommerce, CRM y más',
        title: 'Lo que tu negocio necesita y ninguna herramienta resuelve.',
        lede: 'Integraciones, automatizaciones y funcionalidades a medida. Las construimos y respondemos por ellas. Presupuesto cerrado antes de empezar.',
        ctaPrimaryLabel: MAIN_CTA.es,
        ctaSecondaryLabel: 'Ver qué incluye',
        // Escenarios posibles, no trabajos ya hechos.
        situations: {
          title: '¿Te suena alguna de estas situaciones?',
          items: [
            { title: 'Actualizas el stock a mano', description: 'Tu inventario vive en otro sistema y cada día copias datos a Shopify. Conectamos ambos para que se actualicen solos.' },
            { title: 'Vendes a mayoristas y a particulares', description: 'Necesitas precios, mínimos o condiciones distintas según el cliente. Lo construimos dentro de tu tienda.' },
            { title: 'Tus clientes quieren personalizar el producto', description: 'Medidas, grabados, combinaciones… Creamos el configurador que tu producto necesita.' },
            { title: 'Repites tareas cada vez que entra un pedido', description: 'Avisos, etiquetas, envíos a proveedores. Automatizamos lo repetitivo.' },
            { title: 'Los contactos de tu web se pierden entre el email y el WhatsApp', description: 'Conectamos formularios, WhatsApp y CRM para que no se escape ninguno.' },
            { title: 'Ninguna herramienta hace exactamente lo que necesitas', description: 'O la que hay es cara, lenta o choca con otras. Lo resolvemos con desarrollo propio.' },
          ],
        },
        includesEyebrow: 'Qué incluye',
        includesTitle: 'Lo que construimos.',
        includes: [
          { title: 'Integraciones', description: 'Conectamos tu web o tu tienda con el sistema de gestión, CRM o herramienta que ya usas.' },
          { title: 'Automatizaciones', description: 'Eliminamos tareas manuales repetitivas con lógica propia.' },
          { title: 'Funcionalidad a medida', description: 'Construimos lo que tu negocio necesita y tu plataforma no trae de serie.' },
          { title: 'IA aplicada al negocio', description: 'Usamos IA para quitarte trabajo real: clasificar consultas, responder lo repetitivo o resumir datos.' },
          { title: 'Presupuesto cerrado', description: 'Evaluamos el alcance y te damos un precio fijo antes de empezar.' },
        ],
        monthlyLink: {
          text: '¿Quieres que lo mantengamos y lo sigamos mejorando cada mes?',
          link: 'Mira el acompañamiento mensual.',
          href: '/es/mejora-continua',
        },
        closingTitle: '¿Tienes algo específico en mente?',
        closingLede: 'Cuéntanos qué necesitas y te decimos si es viable, cuánto cuesta y cuánto tarda.',
        related: ['ads', 'newStore', 'migration'],
        faqTitle: 'Preguntas sobre el desarrollo a medida',
        faqs: customDevFAQsEs,
        structuredData: {
          serviceName: 'Desarrollo a medida',
          description: 'Integraciones, automatizaciones y funcionalidades a medida para tu web o tu tienda (Shopify, WooCommerce, CRM y más), con presupuesto cerrado.',
        },
      }}
    />
  )
}

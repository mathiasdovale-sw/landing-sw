import { Metadata } from 'next'
import ServicePageTemplate from '@/app/_components/service-page-template'
import { customDevFAQsEs } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'customDev',
  'es',
  'Desarrollo a medida en Shopify: lo que una app no resuelve | SellifyWorks'
)

export default function DesarrollosAMedida() {
  return (
    <ServicePageTemplate
      content={{
        serviceKey: 'customDev',
        contactHref: '/es/contacto?servicio=customDev',
        locale: 'es',
        eyebrow: 'Desarrollo a medida · Shopify',
        title: 'Lo que tu tienda necesita y ninguna app resuelve.',
        lede: 'Integraciones, automatizaciones y funcionalidades a medida, construidas por un ingeniero que responde por ellas. Presupuesto cerrado antes de empezar.',
        ctaPrimaryLabel: 'Pide una reunión gratis',
        ctaSecondaryLabel: 'Ver qué incluye',
        // Escenarios posibles, no trabajos ya hechos.
        situations: {
          title: '¿Te suena alguna de estas situaciones?',
          items: [
            { title: 'Actualizas el stock a mano', description: 'Tu inventario vive en otro sistema y cada día copias datos a Shopify. Conecto ambos para que se actualicen solos.' },
            { title: 'Vendes a mayoristas y a particulares', description: 'Necesitas precios, mínimos o condiciones distintas según el cliente. Lo construyo dentro de tu tienda.' },
            { title: 'Tus clientes quieren personalizar el producto', description: 'Medidas, grabados, combinaciones… Creo el configurador que tu producto necesita.' },
            { title: 'Repites tareas cada vez que entra un pedido', description: 'Avisos, etiquetas, envíos a proveedores. Automatizo lo repetitivo.' },
            { title: 'Ninguna app hace exactamente lo que necesitas', description: 'O la que hay es cara, lenta o choca con otras. Lo resuelvo con desarrollo propio.' },
          ],
        },
        includesEyebrow: 'Qué incluye',
        includesTitle: 'Lo que construyo.',
        includes: [
          { title: 'Integraciones', description: 'Conecto tu tienda con el sistema de gestión, CRM o herramienta que ya usas.' },
          { title: 'Automatizaciones', description: 'Elimino tareas manuales repetitivas con lógica propia.' },
          { title: 'Funcionalidad a medida', description: 'Construyo lo que tu negocio necesita y Shopify no trae de serie.' },
          { title: 'Presupuesto cerrado', description: 'Evalúo el alcance y te doy un precio fijo antes de empezar.' },
        ],
        closingTitle: '¿Tienes algo específico en mente?',
        closingLede: 'Cuéntame qué necesitas y te digo si es viable, cuánto cuesta y cuánto tarda.',
        related: ['newStore', 'migration'],
        faqTitle: 'Preguntas sobre el desarrollo a medida',
        faqs: customDevFAQsEs,
        structuredData: {
          serviceName: 'Desarrollo a medida en Shopify',
          description: 'Integraciones, automatizaciones y funcionalidades a medida para tu tienda Shopify, con presupuesto cerrado.',
        },
      }}
    />
  )
}

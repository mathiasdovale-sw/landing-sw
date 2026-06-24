import { Metadata } from 'next'
import ServicePageTemplate from '@/app/_components/service-page-template'
import { maintenanceFAQsEs } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'maintenance',
  'es',
  'Mantenimiento Shopify | SellifyWorks'
)

export default function MantenimientoShopify() {
  return (
    <ServicePageTemplate
      content={{
        serviceKey: 'maintenance',
        contactHref: '/es/contacto',
        locale: 'es',
        eyebrow: 'Recurrencia · Mantenimiento',
        title: 'Mantenimiento',
        lede: '10 tareas pequeñas al mes: cambios de imágenes, precios, ajustes de diseño, copy de producto. Tu tienda siempre al día, sin contratar a nadie.',
        priceLabel: '189€',
        priceNote: '+ IVA · al mes',
        ctaPrimaryLabel: 'Habla con un experto',
        ctaSecondaryLabel: 'Ver qué incluye',
        includesEyebrow: 'Qué incluye',
        includesTitle: 'Tu tienda, atendida todos los meses.',
        includes: [
          { title: '10 tareas pequeñas', description: 'Imágenes, precios, ajustes de diseño, copy de producto y más.' },
          { title: 'Sin contratar a nadie', description: 'Nos escribes, lo hacemos, sin procesos de contratación.' },
          { title: 'Priorizado por nosotros', description: 'Evaluamos el tiempo y complejidad de cada tarea con criterio.' },
          { title: 'Tareas grandes, aparte', description: 'Si algo excede el alcance, te lo decimos y lo cotizamos por separado.' },
        ],
        closingTitle: 'Tu tienda no debería quedar abandonada entre proyectos.',
        closingLede: 'Pequeños cambios constantes mantienen tu tienda vendiendo. Nosotros nos encargamos.',
        faqTitle: 'Preguntas sobre mantenimiento',
        faqs: maintenanceFAQsEs,
        structuredData: {
          serviceName: 'Mantenimiento',
          description: '10 tareas pequeñas al mes para mantener tu tienda Shopify siempre al día.',
          price: { currency: 'EUR', minPrice: 189 },
        },
      }}
    />
  )
}

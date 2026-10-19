import { Metadata } from 'next'
import ServicePageTemplate from '@/app/_components/service-page-template'
import { monthlyFAQsEs } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'monthly',
  'es',
  'Mejora continua para tu tienda Shopify | SellifyWorks'
)

export default function MejoraContinua() {
  return (
    <ServicePageTemplate
      content={{
        serviceKey: 'monthly',
        contactHref: '/es/contacto',
        locale: 'es',
        eyebrow: 'Mensual · Sin permanencia',
        title: 'Mejora continua',
        lede: 'Tu tienda ya funciona. Ahora toca que venda más cada mes: analizo cómo navegan tus clientes reales e implemento 4 mejoras al mes, con acompañamiento.',
        ctaPrimaryLabel: 'Contactar',
        ctaSecondaryLabel: 'Ver qué incluye',
        includesEyebrow: 'Qué incluye',
        includesTitle: 'Mejoras basadas en lo que hacen tus clientes, no en suposiciones.',
        includes: [
          { title: 'Grabaciones de sesiones', description: 'Veo cómo navegan tus clientes reales: dónde dudan, dónde se atascan y dónde abandonan.' },
          { title: '4 mejoras al mes', description: 'Cada mes implemento las 4 mejoras con más impacto que salen de esas fricciones.' },
          { title: 'Acompañamiento', description: 'Revisión mensual contigo: qué se hizo, qué se vio y qué viene después. Sin jerga.' },
          { title: 'Sin permanencia', description: 'Pagas mes a mes. Si un mes decides parar, paras.' },
        ],
        includesNote: '¿Tu tienda está muy abandonada o no sabes qué falla? Empieza por la auditoría (140€ + IVA).',
        closingTitle: '¿Tu tienda ya funciona y quieres que venda más?',
        closingLede: 'Cuéntame cómo está tu tienda hoy y te digo si la mejora continua es para ti o si conviene empezar por la auditoría.',
        faqTitle: 'Preguntas sobre la mejora continua',
        faqs: monthlyFAQsEs,
        structuredData: {
          serviceName: 'Mejora continua para tiendas Shopify',
          description: 'Servicio mensual sin permanencia: 4 mejoras al mes basadas en grabaciones de sesiones reales, con acompañamiento.',
        },
      }}
    />
  )
}

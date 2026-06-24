import { Metadata } from 'next'
import ServicePageTemplate from '@/app/_components/service-page-template'
import { conversionResearchFAQsEs } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'conversionResearch',
  'es',
  'Conversion Research para Shopify | SellifyWorks'
)

export default function ConversionResearch() {
  return (
    <ServicePageTemplate
      content={{
        serviceKey: 'conversionResearch',
        contactHref: '/es/contacto',
        locale: 'es',
        eyebrow: 'Conversión · Research',
        title: 'Conversion research',
        lede: 'Google Analytics + investigación cualitativa. Entendemos por qué tus visitantes no compran, con datos, no con intuición.',
        priceLabel: '649€',
        priceNote: '+ IVA',
        ctaPrimaryLabel: 'Habla con un experto',
        ctaSecondaryLabel: 'Ver qué incluye',
        includesEyebrow: 'Qué incluye',
        includesTitle: 'El por qué detrás de tus números.',
        includes: [
          { title: 'Análisis de Google Analytics', description: 'Revisamos el comportamiento real de tus visitantes, no solo el tráfico total.' },
          { title: 'Investigación cualitativa', description: 'Entendemos las dudas y fricciones que les frenan antes de comprar.' },
          { title: 'Mapa de fricciones', description: 'Identificamos en qué punto del recorrido se caen las ventas.' },
          { title: 'Informe accionable', description: 'Conclusiones claras, sin jerga, listas para priorizar.' },
        ],
        closingTitle: 'Deja de adivinar por qué no compran.',
        closingLede: 'Con datos reales en mano, vas a saber exactamente dónde enfocar el esfuerzo.',
        faqTitle: 'Preguntas sobre conversion research',
        faqs: conversionResearchFAQsEs,
        structuredData: {
          serviceName: 'Conversion research',
          description: 'Google Analytics + investigación cualitativa para entender por qué tus visitantes no compran.',
          price: { currency: 'EUR', minPrice: 649 },
        },
      }}
    />
  )
}

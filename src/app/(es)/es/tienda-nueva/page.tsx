import { Metadata } from 'next'
import BuildServicePage from '@/app/_components/build-service-page'
import { newStoreFAQsEs } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'newStore',
  'es',
  'Tienda nueva en Shopify, desde cero y lista para vender | SellifyWorks'
)

export default function TiendaNueva() {
  return <BuildServicePage service="newStore" locale="es" faqs={newStoreFAQsEs} />
}

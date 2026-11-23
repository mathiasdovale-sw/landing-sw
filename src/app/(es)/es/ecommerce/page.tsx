import type { Metadata } from 'next'
import SolutionPage from '@/app/_components/solution-page'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'ecommerce',
  'es',
  'Más ventas online con anuncios, tienda y datos conectados | SellifyWorks'
)

export default function EcommercePage() {
  return <SolutionPage solution="ecommerce" locale="es" />
}

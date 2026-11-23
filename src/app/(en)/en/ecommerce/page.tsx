import type { Metadata } from 'next'
import SolutionPage from '@/app/_components/solution-page'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'ecommerce',
  'en',
  'More online sales with ads, store and data connected | SellifyWorks'
)

export default function EcommercePage() {
  return <SolutionPage solution="ecommerce" locale="en" />
}

import type { Metadata } from 'next'
import SolutionPage from '@/app/_components/solution-page'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'leads',
  'es',
  'Generación de leads: más clientes desde internet | SellifyWorks'
)

export default function LeadsPage() {
  return <SolutionPage solution="leads" locale="es" />
}

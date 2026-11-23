import type { Metadata } from 'next'
import SolutionPage from '@/app/_components/solution-page'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'leads',
  'en',
  'Lead generation: more clients from the internet | SellifyWorks'
)

export default function LeadsPage() {
  return <SolutionPage solution="leads" locale="en" />
}

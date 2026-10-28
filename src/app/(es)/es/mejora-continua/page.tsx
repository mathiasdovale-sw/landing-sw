import { Metadata } from 'next'
import MonthlyPage from '@/app/_components/monthly-page'
import { monthlyFAQsEs } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'monthly',
  'es',
  'Mejora continua para tu tienda Shopify · 290 € + IVA al mes | SellifyWorks'
)

export default function MejoraContinua() {
  return <MonthlyPage locale="es" faqs={monthlyFAQsEs} />
}

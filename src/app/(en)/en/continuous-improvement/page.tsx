import { Metadata } from 'next'
import MonthlyPage from '@/app/_components/monthly-page'
import { monthlyFAQsEn } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'monthly',
  'en',
  'Continuous improvement for your Shopify store · €290 + VAT/month | SellifyWorks'
)

export default function ContinuousImprovement() {
  return <MonthlyPage locale="en" faqs={monthlyFAQsEn} />
}

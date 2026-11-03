import { Metadata } from 'next'
import BuildServicePage from '@/app/_components/build-service-page'
import { migrationFAQsEn } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'migration',
  'en',
  'Shopify migration with improvements, without closing your store | SellifyWorks'
)

export default function ShopifyMigration() {
  return <BuildServicePage service="migration" locale="en" faqs={migrationFAQsEn} />
}

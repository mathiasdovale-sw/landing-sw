import { Metadata } from 'next'
import MigrationPage from '@/app/_components/migration-page'
import { migrationFAQsEn } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'migration',
  'en',
  'Shopify migration with improvements, without closing your store | SellifyWorks'
)

export default function ShopifyMigration() {
  return <MigrationPage locale="en" faqs={migrationFAQsEn} />
}

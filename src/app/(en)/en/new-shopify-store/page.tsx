import { Metadata } from 'next'
import BuildServicePage from '@/app/_components/build-service-page'
import { newStoreFAQsEn } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'newStore',
  'en',
  'A new Shopify store, built from scratch and ready to sell | SellifyWorks'
)

export default function NewShopifyStore() {
  return <BuildServicePage service="newStore" locale="en" faqs={newStoreFAQsEn} />
}

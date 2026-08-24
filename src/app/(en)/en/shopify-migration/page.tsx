import { Metadata } from 'next'
import ServicePageTemplate from '@/app/_components/service-page-template'
import { migrationFAQsEn } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'migration',
  'en',
  'Shopify Migration | SellifyWorks'
)

export default function ShopifyMigration() {
  return (
    <ServicePageTemplate
      content={{
        serviceKey: 'migration',
        contactHref: '/en/contact',
        locale: 'en',
        eyebrow: 'Foundation · Migration',
        title: 'Shopify Migration',
        lede: "We migrate your store to Shopify without losing data or interrupting sales. Audit, design, product upload and handover, turnkey.",
        ctaPrimaryLabel: 'Talk to an expert',
        ctaSecondaryLabel: "See what's included",
        includesEyebrow: "What's included",
        includesTitle: 'Everything you need to migrate without surprises.',
        includes: [
          { title: 'Upfront audit', description: 'We review your current store, catalog and settings before moving anything.' },
          { title: 'Tailored design', description: 'Your new Shopify store, true to your brand, ready to sell from day one.' },
          { title: 'Product upload & copy*', description: 'We upload your full catalog with carefully written product pages.' },
          { title: 'Zero-downtime handover', description: 'Your current store keeps selling until the final switch, no interruptions.' },
        ],
        includesNote: '*Includes up to 25 products/variants.',
        closingTitle: 'Ready to move to Shopify?',
        closingLede: "Tell us what platform you're on today and we'll tell you exactly what migrating your store involves.",
        faqTitle: 'Migration FAQ',
        faqs: migrationFAQsEn,
        structuredData: {
          serviceName: 'Shopify Migration',
          description: 'Audit, design, product upload and copy, development and handover to Shopify, with zero sales downtime.',
        },
      }}
    />
  )
}

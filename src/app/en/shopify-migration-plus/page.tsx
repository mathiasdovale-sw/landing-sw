import { Metadata } from 'next'
import ServicePageTemplate from '@/app/_components/service-page-template'
import { migrationPlusFAQsEn } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'migrationPlus',
  'en',
  'Migration Plus | SellifyWorks'
)

export default function ShopifyMigrationPlus() {
  return (
    <ServicePageTemplate
      content={{
        serviceKey: 'migrationPlus',
        contactHref: '/en/contact',
        locale: 'en',
        eyebrow: 'Foundation · Recommended',
        title: 'Migration Plus',
        lede: 'Everything in Migration + conversion research, so your new store launches already optimized from day one.',
        priceLabel: '€3,120',
        priceNote: '+ VAT',
        ctaPrimaryLabel: 'Talk to an expert',
        ctaSecondaryLabel: "See what's included",
        includesEyebrow: "What's included",
        includesTitle: "Migration plus the research that saves you a redesign.",
        includes: [
          { title: 'Everything in Migration*', description: 'Audit, design, product upload and handover with zero sales downtime.' },
          { title: 'Conversion research included', description: "We analyze why your current visitors aren't buying before we build." },
          { title: 'Data-driven design decisions', description: 'Research informs the new store design, not the other way around.' },
          { title: 'Built for stores already doing volume', description: "Ideal if you're over €4,000/month and don't want a gap before optimizing." },
        ],
        includesNote: '*Includes up to 25 products/variants.',
        closingTitle: 'Launch optimized from day one.',
        closingLede: "If your store is already making sales, migrating blind and optimizing later doesn't make sense. Let's do it together.",
        faqTitle: 'Migration Plus FAQ',
        faqs: migrationPlusFAQsEn,
        structuredData: {
          serviceName: 'Migration Plus',
          description: 'Full Shopify migration + conversion research, to launch optimized from day one.',
          price: { currency: 'EUR', minPrice: 3120 },
        },
      }}
    />
  )
}

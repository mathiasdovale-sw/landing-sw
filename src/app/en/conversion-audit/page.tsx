import { Metadata } from 'next'
import ServicePageTemplate from '@/app/_components/service-page-template'
import { conversionAuditFAQsEn } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'conversionAudit',
  'en',
  'Shopify Conversion Audit | SellifyWorks'
)

export default function ConversionAudit() {
  return (
    <ServicePageTemplate
      content={{
        serviceKey: 'conversionAudit',
        contactHref: '/en/contact',
        locale: 'en',
        eyebrow: 'Conversion · Audit',
        title: 'Conversion audit',
        lede: "We pinpoint exactly what's holding your sales back and hand you an action plan prioritized by impact.",
        priceLabel: '€480',
        priceNote: '+ VAT',
        ctaPrimaryLabel: 'Talk to an expert',
        ctaSecondaryLabel: "See what's included",
        includesEyebrow: "What's included",
        includesTitle: "A clear plan, not a list of 50 generic suggestions.",
        includes: [
          { title: 'Full funnel review', description: 'Home, product, cart and checkout, step by step.' },
          { title: 'Prioritized by impact', description: "We tell you what to fix first based on what sells the most." },
          { title: 'No jargon, no filler', description: 'A document you can read and understand in one sitting.' },
          { title: 'Concrete next steps', description: "You know exactly what to do after reading it." },
        ],
        closingTitle: "Know what's holding your sales back.",
        closingLede: "Before investing in more traffic, make sure your store converts what it already has.",
        faqTitle: 'Conversion audit FAQ',
        faqs: conversionAuditFAQsEn,
        structuredData: {
          serviceName: 'Conversion audit',
          description: "We find what's holding your sales back and hand you a prioritized action plan.",
          price: { currency: 'EUR', minPrice: 480 },
        },
      }}
    />
  )
}

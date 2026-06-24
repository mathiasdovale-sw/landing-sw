import { Metadata } from 'next'
import ServicePageTemplate from '@/app/_components/service-page-template'
import { conversionResearchFAQsEn } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'conversionResearch',
  'en',
  'Conversion Research for Shopify | SellifyWorks'
)

export default function ConversionResearch() {
  return (
    <ServicePageTemplate
      content={{
        serviceKey: 'conversionResearch',
        contactHref: '/en/contact',
        locale: 'en',
        eyebrow: 'Conversion · Research',
        title: 'Conversion research',
        lede: "Google Analytics + qualitative research. We learn why your visitors don't buy — with data, not guesswork.",
        priceLabel: '€649',
        priceNote: '+ VAT',
        ctaPrimaryLabel: 'Talk to an expert',
        ctaSecondaryLabel: "See what's included",
        includesEyebrow: "What's included",
        includesTitle: 'The "why" behind your numbers.',
        includes: [
          { title: 'Google Analytics analysis', description: "We review your visitors' real behavior, not just total traffic." },
          { title: 'Qualitative research', description: 'We understand the doubts and friction that hold them back before buying.' },
          { title: 'Friction map', description: 'We identify exactly where in the journey sales fall off.' },
          { title: 'Actionable report', description: 'Clear conclusions, no jargon, ready to prioritize.' },
        ],
        closingTitle: "Stop guessing why they're not buying.",
        closingLede: "With real data in hand, you'll know exactly where to focus your effort.",
        faqTitle: 'Conversion research FAQ',
        faqs: conversionResearchFAQsEn,
        structuredData: {
          serviceName: 'Conversion research',
          description: "Google Analytics + qualitative research to understand why your visitors aren't buying.",
          price: { currency: 'EUR', minPrice: 649 },
        },
      }}
    />
  )
}

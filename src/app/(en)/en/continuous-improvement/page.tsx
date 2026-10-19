import { Metadata } from 'next'
import ServicePageTemplate from '@/app/_components/service-page-template'
import { monthlyFAQsEn } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'monthly',
  'en',
  'Continuous improvement for your Shopify store | SellifyWorks'
)

export default function ContinuousImprovement() {
  return (
    <ServicePageTemplate
      content={{
        serviceKey: 'monthly',
        contactHref: '/en/contact',
        locale: 'en',
        eyebrow: 'Monthly · No lock-in',
        title: 'Continuous improvement',
        lede: 'Your store already works. Now it needs to sell more every month: I analyse how your real customers browse and implement 4 improvements a month, with ongoing support.',
        ctaPrimaryLabel: 'Get in touch',
        ctaSecondaryLabel: "See what's included",
        includesEyebrow: "What's included",
        includesTitle: 'Improvements based on what your customers do, not on guesses.',
        includes: [
          { title: 'Session recordings', description: 'I watch how your real customers browse: where they hesitate, get stuck and drop off.' },
          { title: '4 improvements a month', description: 'Every month I implement the 4 highest-impact improvements that come out of those friction points.' },
          { title: 'Ongoing support', description: "A monthly review with you: what was done, what we saw and what's next. No jargon." },
          { title: 'No lock-in', description: 'You pay month to month. If you decide to stop one month, you stop.' },
        ],
        includesNote: "Store very neglected or not sure what's wrong? Start with the audit (€140 + VAT).",
        closingTitle: 'Store already working and want it to sell more?',
        closingLede: "Tell me where your store is today and I'll tell you whether continuous improvement fits, or whether it's better to start with the audit.",
        faqTitle: 'Continuous improvement FAQ',
        faqs: monthlyFAQsEn,
        structuredData: {
          serviceName: 'Continuous improvement for Shopify stores',
          description: 'Monthly plan with no lock-in: 4 improvements a month based on real session recordings, with ongoing support.',
        },
      }}
    />
  )
}

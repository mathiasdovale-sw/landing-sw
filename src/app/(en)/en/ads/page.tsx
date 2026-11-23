import { Metadata } from 'next'
import ServicePageTemplate from '@/app/_components/service-page-template'
import { adsFAQsEn } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'
import { MAIN_CTA } from '@/lib/commitments'

export const metadata: Metadata = generatePageMetadata(
  'ads',
  'en',
  'Google Ads and Meta Ads management measured by results | SellifyWorks'
)

// Ads service page. Same structure as custom development; the argument is measurement.
export default function Ads() {
  return (
    <ServicePageTemplate
      content={{
        serviceKey: 'ads',
        contactHref: '/en/contact?servicio=ads',
        locale: 'en',
        eyebrow: 'Ads · Google and Meta',
        title: "Ads measured by what they bring in, not by clicks.",
        lede: 'I run your Google and Meta campaigns with measurement set up properly from day one, so you invest where the money really comes in.',
        ctaPrimaryLabel: MAIN_CTA.en,
        ctaSecondaryLabel: 'See solutions',
        ctaSecondaryHref: '/en/#soluciones',
        situations: {
          title: 'Does any of this sound familiar?',
          items: [
            { title: "You spend on ads and don't know what they return", description: 'I set up purchase or lead tracking and show you the return per campaign.' },
            { title: 'Your agency reports clicks and impressions, not sales', description: "I optimise for your business's profitability." },
            { title: "Your ads lead to a page that doesn't convert", description: 'I improve the landing page as part of the same service.' },
            { title: "You get leads, but don't know which ones end up buying", description: 'I connect leads to your email or CRM so you can follow them through to the sale.' },
          ],
        },
        includesEyebrow: "What's included",
        includesTitle: 'Campaigns managed and measured.',
        includes: [
          { title: 'Google Ads and Meta Ads', description: 'Search, Shopping, Performance Max, Facebook and Instagram, depending on what your business needs.' },
          { title: 'Conversion tracking', description: 'I set up and check purchase or lead tracking so you know what really works.' },
          { title: 'Ongoing management and optimisation', description: 'I keep adjusting campaigns, bids, audiences and ads.' },
          { title: 'Follow-up meetings and a monthly report', description: "What was done, what the results were and what's next." },
        ],
        includesNote: "Ad spend isn't included: you pay it directly to each platform.",
        closingTitle: 'Want to know what your ads are really bringing in?',
        closingLede: "Tell me what you spend and where, and I'll send you a tailored proposal.",
        related: ['monthly', 'customDev'],
        faqTitle: 'Ads FAQ',
        faqs: adsFAQsEn,
        structuredData: {
          serviceName: 'Google Ads and Meta Ads management',
          description: 'Management and optimisation of Google Ads and Meta Ads campaigns with proper conversion tracking, meetings and a monthly report.',
        },
      }}
    />
  )
}

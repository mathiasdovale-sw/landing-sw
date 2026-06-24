import { Metadata } from 'next'
import ServicePageTemplate from '@/app/_components/service-page-template'
import { emailCampaignsFAQsEn } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'emailCampaigns',
  'en',
  'Monthly Email Campaigns | SellifyWorks'
)

export default function EmailMarketingCampaigns() {
  return (
    <ServicePageTemplate
      content={{
        serviceKey: 'emailCampaigns',
        contactHref: '/en/contact',
        locale: 'en',
        eyebrow: 'Recurring · Campaigns',
        title: 'Monthly email campaigns',
        lede: 'Monthly strategy, design and implementation. 8 emails a month that keep your brand top of mind and drive repeat sales.',
        priceLabel: '€250',
        priceNote: '+ VAT · 8 emails/mo',
        ctaPrimaryLabel: 'Talk to an expert',
        ctaSecondaryLabel: "See what's included",
        includesEyebrow: "What's included",
        includesTitle: 'Your brand, in the inbox every month.',
        includes: [
          { title: 'Monthly strategy', description: 'A send calendar aligned with your products and promotions.' },
          { title: 'Design and implementation', description: 'Every email, designed and ready to send.' },
          { title: '8 sends a month', description: 'Enough to stay top of mind without overwhelming your list.' },
          { title: 'Measurable results', description: 'Opens, clicks and sales per campaign, clearly reported.' },
        ],
        closingTitle: "Don't let your list go cold.",
        closingLede: 'A subscriber list without regular campaigns is a sales opportunity lost every month.',
        faqTitle: 'Email campaigns FAQ',
        faqs: emailCampaignsFAQsEn,
        structuredData: {
          serviceName: 'Monthly email campaigns',
          description: 'Monthly strategy, design and implementation of 8 emails a month for your Shopify store.',
          price: { currency: 'EUR', minPrice: 250 },
        },
      }}
    />
  )
}

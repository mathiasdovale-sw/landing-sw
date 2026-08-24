import { Metadata } from 'next'
import ServicePageTemplate from '@/app/_components/service-page-template'
import { emailAutomationFAQsEn } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'emailAutomation',
  'en',
  'Email Marketing Automation | SellifyWorks'
)

export default function EmailMarketingAutomation() {
  return (
    <ServicePageTemplate
      content={{
        serviceKey: 'emailAutomation',
        contactHref: '/en/contact',
        locale: 'en',
        eyebrow: 'Recurring · Automation',
        title: 'Email marketing automation',
        lede: 'Flows that sell on their own: welcome popup with discount, welcome flow, post-purchase, review request, abandoned cart and more.',
        ctaPrimaryLabel: 'Talk to an expert',
        ctaSecondaryLabel: "See what's included",
        includesEyebrow: "What's included",
        includesTitle: 'Automations that work while you sleep.',
        includes: [
          { title: 'Welcome flow', description: 'Turns new subscribers into first-time buyers.' },
          { title: 'Abandoned cart', description: 'Recovers sales you almost had.' },
          { title: 'Post-purchase & reviews', description: 'Builds trust and earns social proof, automatically.' },
          { title: 'Set up and tested', description: 'Every flow is live and tested before we hand it over.' },
        ],
        closingTitle: 'Put your email marketing on autopilot.',
        closingLede: 'Pick the flows your store needs now, add more when it makes sense.',
        faqTitle: 'Email marketing automation FAQ',
        faqs: emailAutomationFAQsEn,
        structuredData: {
          serviceName: 'Email marketing automation',
          description: 'Automated email marketing flows: welcome, abandoned cart, post-purchase and more.',
        },
      }}
    />
  )
}

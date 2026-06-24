import { Metadata } from 'next'
import ServicePageTemplate from '@/app/_components/service-page-template'
import { customDevFAQsEn } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'customDev',
  'en',
  'Custom Shopify Development | SellifyWorks'
)

export default function CustomShopifyDevelopment() {
  return (
    <ServicePageTemplate
      content={{
        serviceKey: 'customDev',
        contactHref: '/en/contact',
        locale: 'en',
        eyebrow: 'Foundation · Custom',
        title: 'Custom development',
        lede: "Need something that doesn't fit the standard scope? Custom functionality, integrations and automations, built on top of your store.",
        priceLabel: 'Custom',
        ctaPrimaryLabel: 'Talk to an expert',
        ctaSecondaryLabel: "See what's included",
        includesEyebrow: "What's included",
        includesTitle: "For what doesn't have a checkbox in any plan.",
        includes: [
          { title: 'Integrations', description: 'We connect your store to the ERP, CRM or tool you already use.' },
          { title: 'Automations', description: 'We eliminate repetitive manual tasks with custom logic.' },
          { title: 'Custom functionality', description: "We build what your business model needs that Shopify doesn't ship with." },
          { title: 'Fixed quote', description: 'We assess the scope and give you a fixed price before starting.' },
        ],
        closingTitle: 'Have something specific in mind?',
        closingLede: "Tell us what you need and we'll tell you if it's feasible, what it costs and how long it takes.",
        faqTitle: 'Custom development FAQ',
        faqs: customDevFAQsEn,
        structuredData: {
          serviceName: 'Custom development',
          description: 'Custom functionality, integrations and automations built on top of your Shopify store.',
          price: { currency: 'EUR', priceRange: 'Custom' },
        },
      }}
    />
  )
}

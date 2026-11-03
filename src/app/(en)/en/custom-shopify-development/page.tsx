import { Metadata } from 'next'
import ServicePageTemplate from '@/app/_components/service-page-template'
import { customDevFAQsEn } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'customDev',
  'en',
  "Custom Shopify development: what an app can't do | SellifyWorks"
)

export default function CustomShopifyDevelopment() {
  return (
    <ServicePageTemplate
      content={{
        serviceKey: 'customDev',
        contactHref: '/en/contact?servicio=customDev',
        locale: 'en',
        eyebrow: 'Custom development · Shopify',
        title: 'What your store needs and no app can do.',
        lede: 'Integrations, automations and custom features, built by an engineer who stands behind them. A fixed quote before we start.',
        ctaPrimaryLabel: 'Book a free meeting',
        ctaSecondaryLabel: "See what's included",
        // Possible scenarios, not past projects.
        situations: {
          title: 'Does any of this sound familiar?',
          items: [
            { title: 'You update stock by hand', description: 'Your inventory lives in another system and every day you copy data into Shopify. I connect both so they update on their own.' },
            { title: 'You sell to wholesalers and consumers', description: 'You need different prices, minimums or terms depending on the customer. I build it into your store.' },
            { title: 'Your customers want to personalise the product', description: 'Sizes, engravings, combinations… I build the configurator your product needs.' },
            { title: 'You repeat tasks every time an order comes in', description: 'Notifications, labels, orders to suppliers. I automate the repetitive work.' },
            { title: 'No app does exactly what you need', description: "Or the one that does is expensive, slow or clashes with others. I solve it with custom development." },
          ],
        },
        includesEyebrow: "What's included",
        includesTitle: 'What I build.',
        includes: [
          { title: 'Integrations', description: 'I connect your store to the management system, CRM or tool you already use.' },
          { title: 'Automations', description: 'I remove repetitive manual tasks with custom logic.' },
          { title: 'Custom functionality', description: "I build what your business needs and Shopify doesn't offer out of the box." },
          { title: 'Fixed quote', description: 'I assess the scope and give you a fixed price before we start.' },
        ],
        closingTitle: 'Have something specific in mind?',
        closingLede: "Tell me what you need and I'll tell you whether it's feasible, what it costs and how long it takes.",
        related: ['newStore', 'migration'],
        faqTitle: 'Custom development FAQ',
        faqs: customDevFAQsEn,
        structuredData: {
          serviceName: 'Custom Shopify development',
          description: 'Integrations, automations and custom functionality for your Shopify store, with a fixed quote.',
        },
      }}
    />
  )
}

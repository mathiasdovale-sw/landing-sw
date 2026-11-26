import { Metadata } from 'next'
import ServicePageTemplate from '@/app/_components/service-page-template'
import { customDevFAQsEn } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'
import { MAIN_CTA } from '@/lib/commitments'

export const metadata: Metadata = generatePageMetadata(
  'customDev',
  'en',
  'Custom development: integrations and automations for your business | SellifyWorks'
)

export default function CustomShopifyDevelopment() {
  return (
    <ServicePageTemplate
      content={{
        serviceKey: 'customDev',
        contactHref: '/en/contact?servicio=customDev',
        locale: 'en',
        eyebrow: 'Custom development · Shopify, WooCommerce, CRM and more',
        title: 'What your business needs and no tool can do.',
        lede: 'Integrations, automations and custom features. We build them and we stand behind them. A fixed quote before we start.',
        ctaPrimaryLabel: MAIN_CTA.en,
        ctaSecondaryLabel: "See what's included",
        // Possible scenarios, not past projects.
        situations: {
          title: 'Does any of this sound familiar?',
          items: [
            { title: 'You update stock by hand', description: 'Your inventory lives in another system and every day you copy data into Shopify. We connect both so they update on their own.' },
            { title: 'You sell to wholesalers and consumers', description: 'You need different prices, minimums or terms depending on the customer. We build it into your store.' },
            { title: 'Your customers want to personalise the product', description: 'Sizes, engravings, combinations… We build the configurator your product needs.' },
            { title: 'You repeat tasks every time an order comes in', description: 'Notifications, labels, orders to suppliers. We automate the repetitive work.' },
            { title: 'Leads from your website get lost between email and WhatsApp', description: 'We connect forms, WhatsApp and your CRM so none slip away.' },
            { title: 'No tool does exactly what you need', description: "Or the one that does is expensive, slow or clashes with others. We solve it with custom development." },
          ],
        },
        includesEyebrow: "What's included",
        includesTitle: 'What we build.',
        includes: [
          { title: 'Integrations', description: 'We connect your website or store to the management system, CRM or tool you already use.' },
          { title: 'Automations', description: 'We remove repetitive manual tasks with custom logic.' },
          { title: 'Custom functionality', description: "We build what your business needs and your platform doesn't offer out of the box." },
          { title: 'AI applied to your business', description: 'We use AI to take real work off your plate: sorting enquiries, answering repetitive questions or summarising data.' },
          { title: 'Fixed quote', description: 'We assess the scope and give you a fixed price before we start.' },
        ],
        monthlyLink: {
          text: 'Want us to maintain it and keep improving it every month?',
          link: 'See monthly support.',
          href: '/en/continuous-improvement',
        },
        closingTitle: 'Have something specific in mind?',
        closingLede: "Tell us what you need and we'll tell you whether it's feasible, what it costs and how long it takes.",
        related: ['ads', 'newStore', 'migration'],
        faqTitle: 'Custom development FAQ',
        faqs: customDevFAQsEn,
        structuredData: {
          serviceName: 'Custom development',
          description: 'Integrations, automations and custom functionality for your website or store (Shopify, WooCommerce, CRM and more), with a fixed quote.',
        },
      }}
    />
  )
}

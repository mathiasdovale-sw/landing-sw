import { Metadata } from 'next'
import ServicePageTemplate from '@/app/_components/service-page-template'
import { maintenanceFAQsEn } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'maintenance',
  'en',
  'Shopify Maintenance | SellifyWorks'
)

export default function ShopifyMaintenance() {
  return (
    <ServicePageTemplate
      content={{
        serviceKey: 'maintenance',
        contactHref: '/en/contact',
        locale: 'en',
        eyebrow: 'Recurring · Maintenance',
        title: 'Maintenance',
        lede: 'Your store always up to date: image swaps, price changes, minor design tweaks, product copy. No hire needed.',
        priceLabel: '€189',
        priceNote: '+ VAT · per month',
        ctaPrimaryLabel: 'Talk to an expert',
        ctaSecondaryLabel: "See what's included",
        includesEyebrow: "What's included",
        includesTitle: 'Your store, taken care of every month.',
        includes: [
          { title: '10 small tasks', description: 'Images, prices, design tweaks, product copy and more.' },
          { title: 'No hiring needed', description: 'You message us, we do it, no hiring process in between.' },
          { title: 'Prioritized by us', description: 'We assess the time and complexity of each task with judgment.' },
          { title: 'Bigger tasks, quoted separately', description: "If something exceeds scope, we'll tell you and quote it separately." },
        ],
        closingTitle: "Your store shouldn't sit abandoned between projects.",
        closingLede: 'Small, constant changes keep your store selling. We handle it.',
        faqTitle: 'Maintenance FAQ',
        faqs: maintenanceFAQsEn,
        structuredData: {
          serviceName: 'Maintenance',
          description: '10 small tasks a month to keep your Shopify store always up to date.',
          price: { currency: 'EUR', minPrice: 189 },
        },
      }}
    />
  )
}

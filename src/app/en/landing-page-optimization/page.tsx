import { Metadata } from 'next'
import ServicePageTemplate from '@/app/_components/service-page-template'
import { landingPagesFAQsEn } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'landingPages',
  'en',
  'Shopify Landing Page Optimization | SellifyWorks'
)

export default function LandingPageOptimization() {
  return (
    <ServicePageTemplate
      content={{
        serviceKey: 'landingPages',
        contactHref: '/en/contact',
        locale: 'en',
        eyebrow: 'Conversion · Landing pages',
        title: 'Landing page optimization',
        lede: 'We redesign your key pages with one goal: converting. Built on proven CRO heuristics.',
        priceLabel: '€339',
        priceNote: '+ VAT · per page',
        ctaPrimaryLabel: 'Talk to an expert',
        ctaSecondaryLabel: "See what's included",
        includesEyebrow: "What's included",
        includesTitle: 'Every element, built to sell.',
        includes: [
          { title: 'Clear visual hierarchy', description: 'What matters shows first, no distractions.' },
          { title: 'CTAs that work', description: 'Visible calls to action, at the right moment.' },
          { title: 'Trust signals', description: 'Reviews, guarantees and trust cues where they matter.' },
          { title: 'Optimized purchase flow', description: 'Less friction between interest and clicking buy.' },
        ],
        closingTitle: "Your page already has traffic. Let's make it convert.",
        closingLede: "Tell us which page you want to optimize first — usually your top product page or your home.",
        faqTitle: 'Landing page optimization FAQ',
        faqs: landingPagesFAQsEn,
        structuredData: {
          serviceName: 'Landing page optimization',
          description: 'Redesign of key pages applying proven CRO heuristics, with one goal: converting.',
          price: { currency: 'EUR', minPrice: 339 },
        },
      }}
    />
  )
}

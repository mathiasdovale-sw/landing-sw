import { Metadata } from 'next'
import AuditAdsLanding from '@/app/_components/audit-ads-landing'

export const metadata: Metadata = {
  title: 'Conversion Audit — €450 + VAT | SellifyWorks',
  description: "Conversion audit for Shopify stores: we tell you what's holding your sales back. You walk away with a prioritized roadmap, not a theoretical report.",
  robots: { index: false, follow: false },
}

export default function AuditAdsPage() {
  return (
    <AuditAdsLanding
      content={{
        locale: 'en',
        contactHref: '/en/contact',
        privacyHref: '/en/privacy-policy',
        cookiesHref: '/en/cookie-policy',
        wordmark: 'SELLIFYWORKS',
        hero: {
          h1: "You have traffic. You don't know why it's not converting.",
          subhead: "Conversion audit for Shopify stores. We tell you what's holding your sales back and what order to fix it in. You walk away with a prioritized roadmap, not a theoretical report.",
          ctaLabel: 'I want my audit — €450 + VAT',
        },
        recognition: {
          question: "Do you get hundreds or thousands of sessions a month and the sales just aren't coming? Have you already tried changing the design, the ads, or the copy, and still don't know if the problem is your store, your product, or your traffic?",
          closing: "That's exactly what we solve before touching anything.",
        },
        caseStudy: {
          company: 'Can Ramos (food products)',
          stats: [
            { value: '35', label: 'concrete findings identified in the audit' },
            { value: '2 weeks', label: 'to deliver the prioritized roadmap' },
            { value: 'x2', label: 'conversion rate after implementing the improvements' },
          ],
          note: "(No promises — this is what we found, and what happened once it was implemented.)",
        },
        includes: {
          eyebrow: 'Full transparency',
          title: "What's included",
          items: [
            { title: 'Full audit of your store', description: 'Your entire store, or a specific page — to be defined before quoting.' },
            { title: 'No jargon, no filler', description: 'A document you can read and understand in one sitting.' },
            { title: 'Prioritized roadmap', description: 'What to fix first, with estimated time and cost.' },
          ],
          priceLine: '€450 + VAT — no surprises after',
          ctaLabel: 'I want my audit',
        },
        noGuarantee: {
          title: "Why we don't guarantee results",
          body: "Nobody can promise you an exact conversion rate — anyone who does isn't being honest. What we do show you is the method, with real cases like Can Ramos.",
        },
        finalCta: {
          title: "You don't know what to look at first. We do.",
          ctaLabel: 'Request my audit — €450 + VAT',
        },
        legal: {
          company: 'SellifyWorks',
          rights: 'All rights reserved.',
          privacy: 'Privacy',
          cookies: 'Cookies',
        },
      }}
    />
  )
}

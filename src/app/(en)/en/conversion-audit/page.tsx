import { Metadata } from 'next'
import ConversionAuditPage from '@/app/_components/conversion-audit-page'
import { conversionAuditFAQsEn } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'conversionAudit',
  'en',
  'My Shopify store has traffic but no sales — audit'
)

export default function ConversionAudit() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: conversionAuditFAQsEn.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ConversionAuditPage
        locale="en"
        contactHref="/en/contact"
        faqs={conversionAuditFAQsEn}
      />
    </>
  )
}

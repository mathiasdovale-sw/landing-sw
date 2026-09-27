import { Metadata } from 'next'
import ConversionAuditPage from '@/app/_components/conversion-audit-page'
import { conversionAuditFAQsEs } from '@/lib/faqs'
import { generatePageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = generatePageMetadata(
  'conversionAudit',
  'es',
  'Mi tienda Shopify tiene tráfico, no vende — auditoría'
)

export default function AuditoriaConversion() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: conversionAuditFAQsEs.map((faq) => ({
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
        locale="es"
        contactHref="/es/contacto"
        faqs={conversionAuditFAQsEs}
      />
    </>
  )
}

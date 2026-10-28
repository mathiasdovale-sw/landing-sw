import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/api'
import { getCanonicalBaseUrl, getAllServicePages, metaDescriptions, seoUrls } from '@/lib/seo-utils'

const serviceNames: Record<string, { es: string; en: string }> = {
  migration: { es: 'Migración a Shopify', en: 'Shopify migration' },
  customDev: { es: 'Desarrollos a medida para Shopify', en: 'Custom Shopify development' },
  monthly: { es: 'Mejora continua (mensual)', en: 'Continuous improvement (monthly)' },
  emailAutomation: { es: 'Email marketing automation', en: 'Email marketing automation' },
}

// llms.txt (https://llmstxt.org): a plain-text map of the site for AI agents and LLM search
export async function GET() {
  const baseUrl = getCanonicalBaseUrl()

  const services = getAllServicePages()
    .map(({ key, es, en }) => [
      `- [${serviceNames[key].en}](${baseUrl}/en${en}): ${metaDescriptions[key].en}`,
      `- [${serviceNames[key].es}](${baseUrl}/es${es}): ${metaDescriptions[key].es}`,
    ].join('\n'))
    .join('\n')

  const postsFor = (locale: 'es' | 'en') =>
    getAllPosts(locale)
      .map(post => `- [${post.title}](${baseUrl}/${locale}/blog/${post.slug}): ${post.description || post.excerpt}`)
      .join('\n')

  const body = `# SellifyWorks

> SellifyWorks is a one-person Shopify agency based in Barcelona, Spain (Mathias). Positioning: more profit from the traffic you already pay for, by making each visit sell more. Main services: a monthly continuous-improvement plan for Shopify stores (at least 4 improvements implemented per month, using conversion best practices and qualitative data for low-traffic stores and A/B tests for high-traffic ones, monthly revenue-per-visit report and a monthly meeting; €290 + VAT per month, no lock-in) and Shopify migrations with conversion improvements included (about 3 weeks, fixed price agreed after reviewing the store). It starts with a free meeting to understand what is holding the store back. One-off services: custom development and email marketing automation. The site is available in Spanish (/es) and English (/en).

## Services

${services}

## Free tools

- [Calculadora de beneficios](${baseUrl}/es/calculadora-rentabilidad): Free Spanish-language calculator for online store owners: net profit, contribution margin, breakeven ROAS, MER, CAC, LTV and a 12-month seasonal projection.

## Blog (English)

${postsFor('en')}

## Blog (Español)

${postsFor('es')}

## About

- [About SellifyWorks](${baseUrl}/en${seoUrls.about.en})
- [Contact](${baseUrl}/en${seoUrls.contact.en})
`

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}

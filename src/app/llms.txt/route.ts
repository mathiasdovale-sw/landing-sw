import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/api'
import { getCanonicalBaseUrl, getAllServicePages, metaDescriptions, seoUrls } from '@/lib/seo-utils'

const serviceNames: Record<string, { es: string; en: string }> = {
  newStore: { es: 'Tienda nueva en Shopify', en: 'New Shopify store' },
  migration: { es: 'Migración a Shopify', en: 'Shopify migration' },
  customDev: { es: 'Desarrollo a medida en Shopify', en: 'Custom Shopify development' },
  monthly: { es: 'Mejora continua (mensual)', en: 'Continuous improvement (monthly)' },
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

> SellifyWorks is a one-person Shopify agency based in Barcelona, Spain: Mathias, a software engineer who builds every project and answers for it. Main services: new Shopify stores built from scratch, migrations to Shopify (about 3 weeks, without closing the store, keeping Google rankings with redirects) and custom development (integrations, automations and features that a theme or app can't handle). Fixed price and delivery date in writing before starting, after a free first meeting. For stores already on Shopify there is also a monthly continuous-improvement plan (€290 + VAT per month). The site is available in Spanish (/es) and English (/en).

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

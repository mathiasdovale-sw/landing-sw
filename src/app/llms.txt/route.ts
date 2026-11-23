import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/api'
import { getCanonicalBaseUrl, getAllServicePages, metaDescriptions, seoUrls } from '@/lib/seo-utils'

const serviceNames: Record<string, { es: string; en: string }> = {
  newStore: { es: 'Tienda nueva en Shopify', en: 'New Shopify store' },
  migration: { es: 'Migración a Shopify', en: 'Shopify migration' },
  customDev: { es: 'Desarrollos a medida', en: 'Custom development' },
  monthly: { es: 'Acompañamiento mensual', en: 'Monthly support' },
  ads: { es: 'Anuncios en Google y Meta', en: 'Google and Meta ads' },
  ecommerce: { es: 'Solución para e-commerce', en: 'E-commerce solution' },
  leads: { es: 'Solución para generación de leads', en: 'Lead generation solution' },
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

> SellifyWorks is a digital growth agency based in Barcelona, Spain, that brings marketing and technology together for small businesses. Mathias, a software engineer, is the single point of contact from start to finish. Services: Google and Meta ads management with proper conversion tracking, new Shopify stores, migrations to Shopify (about 3 weeks, without closing the store, keeping Google rankings), custom development and automations, and monthly support (ads plus ongoing website improvements, no lock-in). Solutions for businesses that sell online (e-commerce) and businesses that win clients online (lead generation). No published prices: every proposal is tailored and sent in writing after a free first meeting. The site is available in Spanish (/es) and English (/en).

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

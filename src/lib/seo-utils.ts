import { locales, defaultLocale } from './i18n'

interface SeoUrl {
  es: string
  en: string
}

// Canonical domain configuration - centralized for consistency
export const CANONICAL_DOMAIN = 'https://www.sellifyworks.com'

// Function to ensure consistent canonical URLs
export function getCanonicalBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL || CANONICAL_DOMAIN
}

// SEO-friendly URL mappings for all pages
export const seoUrls: Record<string, SeoUrl> = {
  home: { es: '/', en: '/' },
  about: { es: '/sobre-nosotros', en: '/about' },
  contact: { es: '/contacto', en: '/contact' },
  blog: { es: '/blog', en: '/blog' },
  privacyPolicy: { es: '/politica-de-privacidad', en: '/privacy-policy' },
  cookiePolicy: { es: '/politica-de-cookies', en: '/cookie-policy' },
  newsletterConfirmed: { es: '/suscripcion-confirmada', en: '/newsletter-confirmed' },
  
  // Services
  shopifyConsulting: { es: '/consultoria-shopify', en: '/shopify-consulting' },
  shopifyDesign: { es: '/diseno-shopify', en: '/shopify-design' },
  shopifyStoreSetup: { es: '/crear-tienda-shopify', en: '/shopify-store-setup' },
  shopifyMigration: { es: '/migracion-shopify', en: '/shopify-migration' },
  shopifyThemeCustomization: { es: '/personalizacion-tema-shopify', en: '/shopify-theme-customization' },
  shopifySeo: { es: '/seo-shopify', en: '/shopify-seo' },
  shopifyCro: { es: '/cro-shopify', en: '/shopify-cro' },
  shopifyAbTesting: { es: '/ab-testing-shopify', en: '/shopify-ab-testing' },
  shopifyGrowthPartner: { es: '/growth-partner-shopify', en: '/shopify-growth-partner' },
  shopifyPlus: { es: '/shopify-plus', en: '/shopify-plus' }
}

// Generate hreflang alternates for a given page
export function generateHreflangs(pageKey: keyof typeof seoUrls, baseUrl?: string) {
  const canonicalBaseUrl = baseUrl || getCanonicalBaseUrl()
  const urls = seoUrls[pageKey]
  if (!urls) return []

  return [
    { hreflang: 'es', href: `${canonicalBaseUrl}/es${urls.es}` },
    { hreflang: 'en', href: `${canonicalBaseUrl}/en${urls.en}` },
    { hreflang: 'x-default', href: `${canonicalBaseUrl}/es${urls.es}` } // Spanish as default
  ]
}

// Get canonical URL for a page
export function getCanonicalUrl(pageKey: keyof typeof seoUrls, locale: string, baseUrl?: string) {
  const canonicalBaseUrl = baseUrl || getCanonicalBaseUrl()
  const urls = seoUrls[pageKey]
  if (!urls) return `${canonicalBaseUrl}/es/` // fallback to home

  const localeUrl = urls[locale as keyof SeoUrl] || urls.es
  return `${canonicalBaseUrl}/${locale}${localeUrl}`
}

// Get all service pages for sitemap generation
export function getAllServicePages() {
  const serviceKeys = Object.keys(seoUrls).filter(key => 
    key.startsWith('shopify') && key !== 'shopifyPlus'
  )
  
  return serviceKeys.map(key => ({
    key,
    es: seoUrls[key as keyof typeof seoUrls].es,
    en: seoUrls[key as keyof typeof seoUrls].en
  }))
}

// Priority mapping for different page types
export const pagePriorities = {
  home: '1.0',
  about: '0.8',
  contact: '0.8',
  blog: '0.7',
  blogPost: '0.6',
  services: '0.9',
  policies: '0.3',
  newsletter: '0.1'
}

// Change frequency mapping
export const changeFrequencies = {
  home: 'daily' as const,
  about: 'monthly' as const,
  contact: 'monthly' as const,
  blog: 'daily' as const,
  blogPost: 'monthly' as const,
  services: 'monthly' as const,
  policies: 'yearly' as const,
  newsletter: 'yearly' as const
}
import { locales, defaultLocale } from './i18n'

interface SeoUrl {
  es: string
  en: string
}

interface MetaDescription {
  es: string
  en: string
}

// Canonical domain configuration - centralized for consistency
export const CANONICAL_DOMAIN = 'https://www.sellifyworks.com'

// Function to ensure consistent canonical URLs
export function getCanonicalBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL || CANONICAL_DOMAIN
}

// Meta descriptions for all pages in both languages
export const metaDescriptions: Record<string, MetaDescription> = {
  home: {
    es: "Tiendas nuevas, migraciones a Shopify y desarrollos a medida. Precio cerrado y una sola persona responsable, desde Barcelona.",
    en: "New stores, migrations to Shopify and custom development. A fixed price and one person accountable, from Barcelona."
  },
  about: {
    es: "Soy Mathias, ingeniero informático en Barcelona y fundador de SellifyWorks. Construyo tiendas Shopify: tiendas nuevas, migraciones y desarrollos a medida.",
    en: "I'm Mathias, a software engineer in Barcelona and the founder of SellifyWorks. I build Shopify stores: new stores, migrations and custom development."
  },
  contact: {
    es: "Pide una reunión gratis para tu tienda Shopify: tienda nueva, migración o desarrollo a medida. Te respondo yo y te paso precio y fecha cerrados, por escrito.",
    en: "Book a free meeting about your Shopify store: a new store, a migration or custom development. I reply myself and send you a fixed price and date, in writing."
  },
  blog: {
    es: "Blog de SellifyWorks: consejos, trucos y estrategias para Shopify. Aprende sobre ecommerce, SEO, conversión y marketing digital para hacer crecer tu tienda online.",
    en: "SellifyWorks blog: tips, tricks and strategies for Shopify. Learn about ecommerce, SEO, conversion and digital marketing to grow your online store."
  },
  privacyPolicy: {
    es: "Política de privacidad de SellifyWorks. Información sobre cómo recopilamos, usamos y protegemos tus datos personales. Transparencia total en el tratamiento de información.",
    en: "SellifyWorks privacy policy. Information about how we collect, use and protect your personal data. Complete transparency in information processing."
  },
  cookiePolicy: {
    es: "Política de cookies de SellifyWorks. Explicación detallada sobre el uso de cookies en nuestro sitio web y cómo puedes gestionarlas según tus preferencias.",
    en: "SellifyWorks cookie policy. Detailed explanation about the use of cookies on our website and how you can manage them according to your preferences."
  },
  newsletterConfirmed: {
    es: "¡Suscripción confirmada! Gracias por unirte a la comunidad SellifyWorks. Recibirás contenido exclusivo sobre Shopify, ecommerce y estrategias de crecimiento.",
    en: "Subscription confirmed! Thanks for joining the SellifyWorks community. You'll receive exclusive content about Shopify, ecommerce and growth strategies."
  },
  services: {
    es: "Tiendas nuevas, migraciones a Shopify y desarrollos a medida. Precio cerrado y una sola persona responsable, desde Barcelona.",
    en: "New stores, migrations to Shopify and custom development. A fixed price and one person accountable, from Barcelona."
  },
  
  // Services meta descriptions
  newStore: {
    es: "Creo tu tienda Shopify desde cero: diseño, catálogo, pagos y envíos configurados. Precio y fecha cerrados antes de empezar.",
    en: "I build your Shopify store from scratch: design, catalogue, payments and shipping set up. Price and date agreed before we start."
  },
  migration: {
    es: "Migro tu tienda a Shopify desde WooCommerce, PrestaShop, Wix o Magento con las mejoras ya hechas, sin cerrar ni un día. En unas 3 semanas, con precio cerrado antes de empezar.",
    en: "I migrate your store to Shopify from WooCommerce, PrestaShop, Wix or Magento with the improvements already done, without closing for a day. In about 3 weeks, with a fixed price."
  },
  customDev: {
    es: "Integraciones, automatizaciones y funcionalidades a medida para tu tienda Shopify. Un ingeniero que lo construye y responde por ello, con precio cerrado.",
    en: "Integrations, automations and custom features for your Shopify store. An engineer who builds it and stands behind it, with a fixed price."
  },
  monthly: {
    es: "Que cada visita de tu tienda Shopify venda más: al menos 4 mejoras al mes, informe de facturación por visita y reunión mensual. 290 € + IVA al mes, sin permanencia.",
    en: "Make every visit to your Shopify store sell more: at least 4 improvements a month, a revenue-per-visit report and a monthly meeting. €290 + VAT per month, no lock-in."
  }
}

// SEO-friendly URL mappings for all pages
export const seoUrls: Record<string, SeoUrl> = {
  home: { es: '/', en: '/' },
  about: { es: '/sobre-nosotros', en: '/about' },
  contact: { es: '/contacto', en: '/contact' },
  services: { es: '/servicios', en: '/services' },
  blog: { es: '/blog', en: '/blog' },
  privacyPolicy: { es: '/politica-de-privacidad', en: '/privacy-policy' },
  cookiePolicy: { es: '/politica-de-cookies', en: '/cookie-policy' },
  newsletterConfirmed: { es: '/suscripcion-confirmada', en: '/newsletter-confirmed' },
  
  // Services
  newStore: { es: '/tienda-nueva', en: '/new-shopify-store' },
  migration: { es: '/migracion-shopify', en: '/shopify-migration' },
  customDev: { es: '/desarrollos-a-medida', en: '/custom-shopify-development' },
  monthly: { es: '/mejora-continua', en: '/continuous-improvement' }
}

// Service keys (subset of seoUrls) used for sitemap / catalog generation
export const SERVICE_PAGE_KEYS = [
  'newStore', 'migration', 'customDev', 'monthly'
] as const

// Generate hreflang alternates for a given page
export function generateHreflangs(pageKey: keyof typeof seoUrls, baseUrl?: string) {
  const canonicalBaseUrl = baseUrl || getCanonicalBaseUrl()
  const urls = seoUrls[pageKey]
  if (!urls) return []

  return [
    { hreflang: 'es-ES', href: `${canonicalBaseUrl}/es${urls.es}` },
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
  return SERVICE_PAGE_KEYS.map(key => ({
    key,
    es: seoUrls[key].es,
    en: seoUrls[key].en
  }))
}

// Get meta description for a specific page and locale
export function getMetaDescription(pageKey: keyof typeof metaDescriptions, locale: string): string {
  const descriptions = metaDescriptions[pageKey]
  if (!descriptions) return metaDescriptions.home[locale as keyof MetaDescription] || metaDescriptions.home.es
  
  return descriptions[locale as keyof MetaDescription] || descriptions.es
}

// Generate metadata object for Next.js Metadata API
export function generatePageMetadata(
  pageKey: keyof typeof metaDescriptions,
  locale: string,
  customTitle?: string,
  customDescription?: string
) {
  const baseUrl = getCanonicalBaseUrl()
  const description = customDescription || getMetaDescription(pageKey, locale)
  const canonical = getCanonicalUrl(pageKey, locale, baseUrl)
  const hreflangs = generateHreflangs(pageKey, baseUrl)
  
  return {
    title: customTitle,
    description,
    canonical,
    alternates: {
      canonical,
      languages: {
        'es-ES': hreflangs.find(h => h.hreflang === 'es-ES')?.href,
        'en': hreflangs.find(h => h.hreflang === 'en')?.href,
        'x-default': hreflangs.find(h => h.hreflang === 'x-default')?.href,
      }
    },
    openGraph: {
      title: customTitle,
      description,
      url: canonical,
      siteName: 'SellifyWorks',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: customTitle,
      description,
    }
  }
}

// Generate metadata for blog posts dynamically
export function generateBlogPostMetadata(
  title: string,
  excerpt: string,
  slug: string,
  locale: string,
  date?: string,
  author?: string,
  coverImage?: string,
  seo: { seoTitle?: string; description?: string; dateModified?: string } = {}
) {
  const baseUrl = getCanonicalBaseUrl()
  const canonical = `${baseUrl}/${locale}/blog/${slug}`
  const summary = seo.description || excerpt
  const description = summary && summary.length > 0 
    ? summary.slice(0, 155) + (summary.length > 155 ? '...' : '')
    : getMetaDescription('blog', locale)
  const fullTitle = seo.seoTitle ? `${seo.seoTitle} | SellifyWorks` : `${title} | SellifyWorks Blog`
  
  const blogHreflangs = [
    { hreflang: 'es-ES', href: `${baseUrl}/es/blog/${slug}` },
    { hreflang: 'en', href: `${baseUrl}/en/blog/${slug}` },
    { hreflang: 'x-default', href: `${baseUrl}/es/blog/${slug}` }
  ]

  return {
    title: fullTitle,
    description,
    canonical,
    alternates: {
      canonical,
      languages: {
        'es-ES': blogHreflangs.find(h => h.hreflang === 'es-ES')?.href,
        'en': blogHreflangs.find(h => h.hreflang === 'en')?.href,
        'x-default': blogHreflangs.find(h => h.hreflang === 'x-default')?.href,
      }
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: 'SellifyWorks',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'article',
      publishedTime: date,
      modifiedTime: seo.dateModified || date,
      authors: author ? [author] : ['SellifyWorks'],
      images: coverImage ? [{
        url: coverImage.startsWith('/') ? `${baseUrl}${coverImage}` : coverImage,
        width: 1200,
        height: 630,
        alt: title
      }] : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: coverImage ? [coverImage.startsWith('/') ? `${baseUrl}${coverImage}` : coverImage] : undefined
    },
    other: {
      'article:author': author || 'SellifyWorks',
      'article:published_time': date,
      'article:modified_time': seo.dateModified || date,
      'article:section': locale === 'es' ? 'Shopify y Ecommerce' : 'Shopify and Ecommerce'
    }
  }
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
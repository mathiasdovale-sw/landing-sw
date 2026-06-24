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
    es: "Agencia experta en Shopify. Diseño, desarrollo, optimización SEO y CRO para tiendas online. Impulsa tus ventas con SellifyWorks, tu partner de crecimiento en ecommerce.",
    en: "Expert Shopify agency. Design, development, SEO and CRO optimization for online stores. Boost your sales with SellifyWorks, your ecommerce growth partner."
  },
  about: {
    es: "Conoce a SellifyWorks, agencia especializada en Shopify. Nuestro equipo de expertos te ayuda a optimizar tu tienda online para maximizar ventas.",
    en: "Meet SellifyWorks, a specialized Shopify agency with years of experience. Our expert team helps you create and optimize your online store to maximize sales."
  },
  contact: {
    es: "Contacta con SellifyWorks para impulsar tu tienda Shopify. Consultoría gratuita, presupuesto sin compromiso. Hablemos de cómo hacer crecer tu ecommerce juntos.",
    en: "Contact SellifyWorks to boost your Shopify store. Free consultation, no-obligation quote. Let's talk about growing your ecommerce business together."
  },
  blog: {
    es: "Blog de SellifyWorks: consejos, trucos y estrategias para Shopify. Aprende sobre ecommerce, SEO, CRO y marketing digital para hacer crecer tu tienda online.",
    en: "SellifyWorks blog: tips, tricks and strategies for Shopify. Learn about ecommerce, SEO, CRO and digital marketing to grow your online store."
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
    es: "Descubre todos nuestros servicios especializados en Shopify: desarrollo, diseño, SEO, CRO, migración y más. Impulsa tu tienda online con nuestros expertos.",
    en: "Discover all our specialized Shopify services: development, design, SEO, CRO, migration and more. Boost your online store with our experts."
  },
  
  // Services meta descriptions
  migration: {
    es: "Migración a Shopify llave en mano: auditoría, diseño, carga de productos y transferencia, sin cortar tus ventas. 2.640€ + IVA.",
    en: "Turnkey Shopify migration: audit, design, product upload and handover, with zero sales downtime. €2,640 + VAT."
  },
  migrationPlus: {
    es: "Migración a Shopify + conversion research para lanzar tu tienda ya optimizada desde el día uno. Ideal para tiendas que facturan +4.000€/mes.",
    en: "Shopify migration + conversion research to launch your store already optimized from day one. Ideal for stores doing over €4,000/month."
  },
  customDev: {
    es: "Desarrollos a medida para Shopify: integraciones, automatizaciones y funcionalidades a medida cuando lo estándar no alcanza.",
    en: "Custom Shopify development: integrations, automations and bespoke functionality when the standard scope isn't enough."
  },
  conversionResearch: {
    es: "Conversion research para Shopify: Google Analytics + investigación cualitativa para entender por qué tus visitantes no compran.",
    en: "Conversion research for Shopify: Google Analytics + qualitative research to understand why your visitors aren't buying."
  },
  conversionAudit: {
    es: "Auditoría de conversión para tiendas Shopify pequeñas. Detectamos qué frena tus ventas y te entregamos un plan de acción priorizado.",
    en: "Conversion audit for small Shopify stores. We find what's holding your sales back and hand you a prioritized action plan."
  },
  landingPages: {
    es: "Optimización de landing pages en Shopify aplicando heurísticas de CRO probadas. 339€ + IVA por página.",
    en: "Shopify landing page optimization applying proven CRO heuristics. €339 + VAT per page."
  },
  emailAutomation: {
    es: "Email marketing automation para Shopify: welcome flow, post-compra, carrito abandonado y más. 149€ + IVA por flujo.",
    en: "Email marketing automation for Shopify: welcome flow, post-purchase, abandoned cart and more. €149 + VAT per flow."
  },
  emailCampaigns: {
    es: "Campañas mensuales de email marketing para Shopify: estrategia, diseño e implementación de 8 emails al mes.",
    en: "Monthly email marketing campaigns for Shopify: strategy, design and implementation of 8 emails a month."
  },
  maintenance: {
    es: "Mantenimiento mensual para tiendas Shopify pequeñas: 10 tareas al mes para mantener tu tienda siempre al día.",
    en: "Monthly maintenance for small Shopify stores: 10 tasks a month to keep your store always up to date."
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
  migration: { es: '/migracion-shopify', en: '/shopify-migration' },
  migrationPlus: { es: '/migracion-plus', en: '/shopify-migration-plus' },
  customDev: { es: '/desarrollos-a-medida', en: '/custom-shopify-development' },
  conversionResearch: { es: '/conversion-research', en: '/conversion-research' },
  conversionAudit: { es: '/auditoria-conversion', en: '/conversion-audit' },
  landingPages: { es: '/optimizacion-landing-pages', en: '/landing-page-optimization' },
  emailAutomation: { es: '/email-marketing-automation', en: '/email-marketing-automation' },
  emailCampaigns: { es: '/campanas-email-marketing', en: '/email-marketing-campaigns' },
  maintenance: { es: '/mantenimiento-shopify', en: '/shopify-maintenance' }
}

// Service keys (subset of seoUrls) used for sitemap / catalog generation
export const SERVICE_PAGE_KEYS = [
  'migration', 'migrationPlus', 'customDev', 'conversionResearch',
  'conversionAudit', 'landingPages', 'emailAutomation', 'emailCampaigns', 'maintenance'
] as const

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
        'es': hreflangs.find(h => h.hreflang === 'es')?.href,
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
  coverImage?: string
) {
  const baseUrl = getCanonicalBaseUrl()
  const canonical = `${baseUrl}/${locale}/blog/${slug}`
  const description = excerpt && excerpt.length > 0 
    ? excerpt.slice(0, 155) + (excerpt.length > 155 ? '...' : '')
    : getMetaDescription('blog', locale)
  
  const blogHreflangs = [
    { hreflang: 'es', href: `${baseUrl}/es/blog/${slug}` },
    { hreflang: 'en', href: `${baseUrl}/en/blog/${slug}` },
    { hreflang: 'x-default', href: `${baseUrl}/es/blog/${slug}` }
  ]
  
  return {
    title: `${title} | SellifyWorks Blog`,
    description,
    canonical,
    alternates: {
      canonical,
      languages: {
        'es': blogHreflangs.find(h => h.hreflang === 'es')?.href,
        'en': blogHreflangs.find(h => h.hreflang === 'en')?.href,
        'x-default': blogHreflangs.find(h => h.hreflang === 'x-default')?.href,
      }
    },
    openGraph: {
      title: `${title} | SellifyWorks Blog`,
      description,
      url: canonical,
      siteName: 'SellifyWorks',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'article',
      publishedTime: date,
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
      title: `${title} | SellifyWorks Blog`,
      description,
      images: coverImage ? [coverImage.startsWith('/') ? `${baseUrl}${coverImage}` : coverImage] : undefined
    },
    other: {
      'article:author': author || 'SellifyWorks',
      'article:published_time': date,
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
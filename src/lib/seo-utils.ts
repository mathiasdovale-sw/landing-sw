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
    es: "Ayudamos a tiendas Shopify que no despegan a pesar de tener tráfico. Te damos un plan de acción claro con nuestra auditoría de conversión.",
    en: "We help Shopify stores that aren't growing despite having traffic. Get a clear action plan with our conversion audit."
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
    es: "Migración a Shopify llave en mano: auditoría, diseño, carga de productos y transferencia, sin cortar tus ventas.",
    en: "Turnkey Shopify migration: audit, design, product upload and handover, with zero sales downtime."
  },
  customDev: {
    es: "Desarrollos a medida para Shopify: integraciones, automatizaciones y funcionalidades a medida cuando lo estándar no alcanza.",
    en: "Custom Shopify development: integrations, automations and bespoke functionality when the standard scope isn't enough."
  },
  conversionAudit: {
    es: "¿Tenés sesiones pero no vendes? Te ayudamos a entender qué frena a tus clientes: auditoría completa y roadmap (listado de tareas) a implementar. Desde 450€ + IVA.",
    en: "Getting sessions but no sales? We help you understand what's stopping your customers with a full store audit and a prioritized roadmap. From €450 + VAT."
  },
  emailAutomation: {
    es: "Email marketing automation para Shopify: welcome flow, post-compra, carrito abandonado y más.",
    en: "Email marketing automation for Shopify: welcome flow, post-purchase, abandoned cart and more."
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
  customDev: { es: '/desarrollos-a-medida', en: '/custom-shopify-development' },
  conversionAudit: { es: '/auditoria-conversion', en: '/conversion-audit' },
  emailAutomation: { es: '/email-marketing-automation', en: '/email-marketing-automation' }
}

// Service keys (subset of seoUrls) used for sitemap / catalog generation
export const SERVICE_PAGE_KEYS = [
  'migration', 'customDev', 'conversionAudit', 'emailAutomation'
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
  coverImage?: string
) {
  const baseUrl = getCanonicalBaseUrl()
  const canonical = `${baseUrl}/${locale}/blog/${slug}`
  const description = excerpt && excerpt.length > 0 
    ? excerpt.slice(0, 155) + (excerpt.length > 155 ? '...' : '')
    : getMetaDescription('blog', locale)
  
  const blogHreflangs = [
    { hreflang: 'es-ES', href: `${baseUrl}/es/blog/${slug}` },
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
        'es-ES': blogHreflangs.find(h => h.hreflang === 'es-ES')?.href,
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
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
    es: "Conoce a SellifyWorks, agencia especializada en Shopify con años de experiencia. Nuestro equipo de expertos te ayuda a crear y optimizar tu tienda online para maximizar ventas.",
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
  
  // Services meta descriptions
  shopifyConsulting: {
    es: "Consultoría experta en Shopify. Auditorías completas, estrategias de crecimiento y optimización de tiendas online. Maximiza el potencial de tu ecommerce con SellifyWorks.",
    en: "Expert Shopify consulting. Complete audits, growth strategies and online store optimization. Maximize your ecommerce potential with SellifyWorks."
  },
  shopifyDesign: {
    es: "Diseño profesional de tiendas Shopify. Interfaces atractivas, responsive y optimizadas para conversión. Crea la mejor experiencia de usuario con SellifyWorks.",
    en: "Professional Shopify store design. Attractive, responsive interfaces optimized for conversion. Create the best user experience with SellifyWorks."
  },
  shopifyStoreSetup: {
    es: "Configuración completa de tiendas Shopify desde cero. Instalación, personalización y optimización para lanzar tu ecommerce exitosamente con SellifyWorks.",
    en: "Complete Shopify store setup from scratch. Installation, customization and optimization to successfully launch your ecommerce with SellifyWorks."
  },
  shopifyMigration: {
    es: "Migración segura a Shopify desde cualquier plataforma. Transferencia completa de datos, productos y configuraciones sin perder información ni ventas.",
    en: "Safe migration to Shopify from any platform. Complete transfer of data, products and configurations without losing information or sales."
  },
  shopifyThemeCustomization: {
    es: "Personalización avanzada de themes Shopify. Modificaciones únicas, funcionalidades custom y optimización para destacar tu marca en el mercado.",
    en: "Advanced Shopify theme customization. Unique modifications, custom functionalities and optimization to make your brand stand out in the market."
  },
  shopifySeo: {
    es: "SEO especializado para Shopify. Optimización técnica, contenido y estructura para mejorar posicionamiento y aumentar tráfico orgánico a tu tienda.",
    en: "Specialized SEO for Shopify. Technical optimization, content and structure to improve rankings and increase organic traffic to your store."
  },
  shopifyCro: {
    es: "Optimización de conversión (CRO) para Shopify. Análisis, testing y mejoras para incrementar ventas y maximizar el valor de cada visitante de tu tienda.",
    en: "Conversion rate optimization (CRO) for Shopify. Analysis, testing and improvements to increase sales and maximize the value of each store visitor."
  },
  shopifyAbTesting: {
    es: "A/B Testing profesional para tiendas Shopify. Pruebas científicas de elementos, páginas y flujos para optimizar conversiones basándose en datos reales.",
    en: "Professional A/B testing for Shopify stores. Scientific testing of elements, pages and flows to optimize conversions based on real data."
  },
  shopifyGrowthPartner: {
    es: "Partner de crecimiento para Shopify. Estrategias integrales de marketing, optimización y escalamiento para impulsar tu ecommerce al siguiente nivel.",
    en: "Growth partner for Shopify. Comprehensive marketing strategies, optimization and scaling to take your ecommerce to the next level."
  },
  shopifyPlus: {
    es: "Servicios especializados en Shopify Plus. Desarrollo enterprise, integraciones avanzadas y soluciones escalables para grandes volúmenes de ventas.",
    en: "Specialized services in Shopify Plus. Enterprise development, advanced integrations and scalable solutions for high sales volumes."
  }
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
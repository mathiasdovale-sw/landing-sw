"use client"
import { usePathname } from 'next/navigation'

// Hook para obtener enlaces localizados basados en la ruta actual
export const useLocalizedLinks = () => {
  const pathname = usePathname()
  
  // Detectar idioma actual
  const currentLocale = pathname.startsWith('/en') ? 'en' : 'es'
  
  // Mapeo de enlaces localizados
  const links = {
    home: currentLocale === 'es' ? '/es/' : '/en/',
    about: currentLocale === 'es' ? '/es/sobre-nosotros' : '/en/about',
    services: currentLocale === 'es' ? '/es/servicios' : '/en/services',
    contact: currentLocale === 'es' ? '/es/contacto' : '/en/contact',
    blog: currentLocale === 'es' ? '/es/blog' : '/en/blog',
    privacyPolicy: currentLocale === 'es' ? '/es/politica-de-privacidad' : '/en/privacy-policy',
    cookiePolicy: currentLocale === 'es' ? '/es/politica-de-cookies' : '/en/cookie-policy',
    newsletterConfirmed: currentLocale === 'es' ? '/es/suscripcion-confirmada' : '/en/newsletter-confirmed',
    // Service pages
    shopifyStoreSetup: currentLocale === 'es' ? '/es/crear-tienda-shopify' : '/en/shopify-store-setup',
    shopifySeo: currentLocale === 'es' ? '/es/seo-shopify' : '/en/shopify-seo',
    shopifyDesign: currentLocale === 'es' ? '/es/diseno-shopify' : '/en/shopify-design',
    shopifyThemeCustomization: currentLocale === 'es' ? '/es/personalizacion-tema-shopify' : '/en/shopify-theme-customization',
    shopifyMigration: currentLocale === 'es' ? '/es/migracion-shopify' : '/en/shopify-migration',
    shopifyCro: currentLocale === 'es' ? '/es/cro-shopify' : '/en/shopify-cro',
    shopifyPlus: currentLocale === 'es' ? '/es/shopify-plus' : '/en/shopify-plus',
    shopifyConsulting: currentLocale === 'es' ? '/es/consultoria-shopify' : '/en/shopify-consulting',
    shopifyGrowthPartner: currentLocale === 'es' ? '/es/growth-partner-shopify' : '/en/shopify-growth-partner',
    shopifyAbTesting: currentLocale === 'es' ? '/es/ab-testing-shopify' : '/en/shopify-ab-testing',
  }
  
  // Función para generar enlaces de posts de blog
  const getBlogPostLink = (slug: string) => {
    return currentLocale === 'es' ? `/es/blog/${slug}` : `/en/blog/${slug}`
  }

  return {
    links,
    currentLocale,
    getBlogPostLink
  }
}
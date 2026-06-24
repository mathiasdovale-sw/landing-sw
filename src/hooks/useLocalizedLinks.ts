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
    migration: currentLocale === 'es' ? '/es/migracion-shopify' : '/en/shopify-migration',
    migrationPlus: currentLocale === 'es' ? '/es/migracion-plus' : '/en/shopify-migration-plus',
    customDev: currentLocale === 'es' ? '/es/desarrollos-a-medida' : '/en/custom-shopify-development',
    conversionResearch: currentLocale === 'es' ? '/es/conversion-research' : '/en/conversion-research',
    conversionAudit: currentLocale === 'es' ? '/es/auditoria-conversion' : '/en/conversion-audit',
    landingPages: currentLocale === 'es' ? '/es/optimizacion-landing-pages' : '/en/landing-page-optimization',
    emailAutomation: currentLocale === 'es' ? '/es/email-marketing-automation' : '/en/email-marketing-automation',
    emailCampaigns: currentLocale === 'es' ? '/es/campanas-email-marketing' : '/en/email-marketing-campaigns',
    maintenance: currentLocale === 'es' ? '/es/mantenimiento-shopify' : '/en/shopify-maintenance',
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
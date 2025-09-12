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
    contact: currentLocale === 'es' ? '/es/contacto' : '/en/contact',
    blog: currentLocale === 'es' ? '/es/blog' : '/en/blog',
    privacyPolicy: currentLocale === 'es' ? '/es/politica-de-privacidad' : '/en/privacy-policy',
    cookiePolicy: currentLocale === 'es' ? '/es/politica-de-cookies' : '/en/cookie-policy',
    newsletterConfirmed: currentLocale === 'es' ? '/es/suscripcion-confirmada' : '/en/newsletter-confirmed',
  }
  
  return {
    links,
    currentLocale
  }
}
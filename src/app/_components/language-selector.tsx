"use client"
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useScrollPreservation } from '@/contexts/ScrollContext'

const LanguageSelector = () => {
  const pathname = usePathname()
  const [currentLocale, setCurrentLocale] = useState<'es' | 'en'>('es')
  const { preserveScrollAndNavigate } = useScrollPreservation()

  // Detectar el idioma actual basado en la URL
  useEffect(() => {
    if (pathname.startsWith('/en')) {
      setCurrentLocale('en')
    } else {
      setCurrentLocale('es')
    }
  }, [pathname])

  // Función para cambiar idioma
  const changeLanguage = (newLocale: 'es' | 'en') => {
    if (newLocale === currentLocale) return

    let newPath = ''
    
    // Mapeo de rutas entre idiomas
    const routeMapping: Record<string, { es: string; en: string }> = {
      '/': { es: '/es/', en: '/en/' },
      '/es/': { es: '/es/', en: '/en/' },
      '/en/': { es: '/es/', en: '/en/' },
      '/es/sobre-nosotros': { es: '/es/sobre-nosotros', en: '/en/about' },
      '/en/about': { es: '/es/sobre-nosotros', en: '/en/about' },
      '/es/contacto': { es: '/es/contacto', en: '/en/contact' },
      '/en/contact': { es: '/es/contacto', en: '/en/contact' },
      '/es/blog': { es: '/es/blog', en: '/en/blog' },
      '/en/blog': { es: '/es/blog', en: '/en/blog' },
      '/es/politica-de-cookies': { es: '/es/politica-de-cookies', en: '/en/cookie-policy' },
      '/en/cookie-policy': { es: '/es/politica-de-cookies', en: '/en/cookie-policy' },
      '/es/politica-de-privacidad': { es: '/es/politica-de-privacidad', en: '/en/privacy-policy' },
      '/en/privacy-policy': { es: '/es/politica-de-privacidad', en: '/en/privacy-policy' },
      '/es/suscripcion-confirmada': { es: '/es/suscripcion-confirmada', en: '/en/newsletter-confirmed' },
      '/en/newsletter-confirmed': { es: '/es/suscripcion-confirmada', en: '/en/newsletter-confirmed' },
      
      // Páginas de servicios Shopify
      '/diseno-shopify': { es: '/es/diseno-shopify', en: '/en/shopify-design' },
      '/es/diseno-shopify': { es: '/es/diseno-shopify', en: '/en/shopify-design' },
      '/en/shopify-design': { es: '/es/diseno-shopify', en: '/en/shopify-design' },
      
      '/shopify-plus': { es: '/es/shopify-plus', en: '/en/shopify-plus' },
      '/es/shopify-plus': { es: '/es/shopify-plus', en: '/en/shopify-plus' },
      '/en/shopify-plus': { es: '/es/shopify-plus', en: '/en/shopify-plus' },
      
      '/migracion-shopify': { es: '/es/migracion-shopify', en: '/en/shopify-migration' },
      '/es/migracion-shopify': { es: '/es/migracion-shopify', en: '/en/shopify-migration' },
      '/en/shopify-migration': { es: '/es/migracion-shopify', en: '/en/shopify-migration' },
      
      '/consultoria-shopify': { es: '/es/consultoria-shopify', en: '/en/shopify-consulting' },
      '/es/consultoria-shopify': { es: '/es/consultoria-shopify', en: '/en/shopify-consulting' },
      '/en/shopify-consulting': { es: '/es/consultoria-shopify', en: '/en/shopify-consulting' },
      
      '/es/seo-shopify': { es: '/es/seo-shopify', en: '/en/shopify-seo' },
      '/en/shopify-seo': { es: '/es/seo-shopify', en: '/en/shopify-seo' },
      
      '/es/cro-shopify': { es: '/es/cro-shopify', en: '/en/shopify-cro' },
      '/en/shopify-cro': { es: '/es/cro-shopify', en: '/en/shopify-cro' },
      
      '/es/ab-testing-shopify': { es: '/es/ab-testing-shopify', en: '/en/shopify-ab-testing' },
      '/en/shopify-ab-testing': { es: '/es/ab-testing-shopify', en: '/en/shopify-ab-testing' },
      
      '/es/growth-partner-shopify': { es: '/es/growth-partner-shopify', en: '/en/shopify-growth-partner' },
      '/en/shopify-growth-partner': { es: '/es/growth-partner-shopify', en: '/en/shopify-growth-partner' },
      
      '/es/crear-tienda-shopify': { es: '/es/crear-tienda-shopify', en: '/en/shopify-store-setup' },
      '/en/shopify-store-setup': { es: '/es/crear-tienda-shopify', en: '/en/shopify-store-setup' },
      
      '/es/personalizacion-tema-shopify': { es: '/es/personalizacion-tema-shopify', en: '/en/shopify-theme-customization' },
      '/en/shopify-theme-customization': { es: '/es/personalizacion-tema-shopify', en: '/en/shopify-theme-customization' },
    }

    // Buscar la ruta correspondiente en el mapeo
    const mapping = routeMapping[pathname]
    if (mapping) {
      newPath = mapping[newLocale]
    } else {
      // Fallback: redirigir a la página principal del idioma seleccionado
      newPath = newLocale === 'es' ? '/es/' : '/en/'
    }

    // Navegar a la nueva ruta preservando el scroll
    preserveScrollAndNavigate(newPath)
  }

  return (
    <div className="flex items-center space-x-1 bg-white rounded-lg p-1">
      <button
        onClick={() => changeLanguage('es')}
        className={`w-8 h-6 rounded-md overflow-hidden transition-all duration-200 hover:scale-110 flex items-center justify-center text-lg ${
          currentLocale === 'es' ? 'ring-2 ring-orange-500 shadow-lg' : 'opacity-70 hover:opacity-100'
        }`}
        aria-label="Español"
        title="Español"
      >
        🇪🇸
      </button>
      
      <button
        onClick={() => changeLanguage('en')}
        className={`w-8 h-6 rounded-md overflow-hidden transition-all duration-200 hover:scale-110 flex items-center justify-center text-lg ${
          currentLocale === 'en' ? 'ring-2 ring-orange-500 shadow-lg' : 'opacity-70 hover:opacity-100'
        }`}
        aria-label="English"
        title="English"
      >
        🇬🇧
      </button>
    </div>
  )
}

export default LanguageSelector

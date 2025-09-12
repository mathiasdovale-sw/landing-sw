"use client"
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const LanguageSelector = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [currentLocale, setCurrentLocale] = useState<'es' | 'en'>('es')

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
    }

    // Buscar la ruta correspondiente en el mapeo
    const mapping = routeMapping[pathname]
    if (mapping) {
      newPath = mapping[newLocale]
    } else {
      // Fallback: redirigir a la página principal del idioma seleccionado
      newPath = newLocale === 'es' ? '/es/' : '/en/'
    }

    router.push(newPath)
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

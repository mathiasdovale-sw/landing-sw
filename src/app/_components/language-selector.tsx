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
    
    // Detectar si estamos en una ruta de blog post dinámico
    const blogPostRegex = /^\/(es|en)\/blog\/(.+)$/
    const blogPostMatch = pathname.match(blogPostRegex)
    
    if (blogPostMatch) {
      // Si estamos en un post específico, preservar el slug
      const slug = blogPostMatch[2]
      newPath = newLocale === 'es' ? `/es/blog/${slug}` : `/en/blog/${slug}`
    } else {
      // Mapeo de rutas entre idiomas para rutas estáticas
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
        
        // Página de servicios
        '/es/servicios': { es: '/es/servicios', en: '/en/services' },
        '/en/services': { es: '/es/servicios', en: '/en/services' },
        
        // Páginas de servicios Shopify
        '/es/migracion-shopify': { es: '/es/migracion-shopify', en: '/en/shopify-migration' },
        '/en/shopify-migration': { es: '/es/migracion-shopify', en: '/en/shopify-migration' },

        '/es/desarrollos-a-medida': { es: '/es/desarrollos-a-medida', en: '/en/custom-shopify-development' },
        '/en/custom-shopify-development': { es: '/es/desarrollos-a-medida', en: '/en/custom-shopify-development' },


        '/es/tienda-nueva': { es: '/es/tienda-nueva', en: '/en/new-shopify-store' },
        '/en/new-shopify-store': { es: '/es/tienda-nueva', en: '/en/new-shopify-store' },

        '/es/mejora-continua': { es: '/es/mejora-continua', en: '/en/continuous-improvement' },
        '/en/continuous-improvement': { es: '/es/mejora-continua', en: '/en/continuous-improvement' },

        '/es/anuncios': { es: '/es/anuncios', en: '/en/ads' },
        '/en/ads': { es: '/es/anuncios', en: '/en/ads' },

        // Soluciones
        '/es/ecommerce': { es: '/es/ecommerce', en: '/en/ecommerce' },
        '/en/ecommerce': { es: '/es/ecommerce', en: '/en/ecommerce' },
        '/es/generacion-de-leads': { es: '/es/generacion-de-leads', en: '/en/lead-generation' },
        '/en/lead-generation': { es: '/es/generacion-de-leads', en: '/en/lead-generation' },
      }

      // Buscar la ruta correspondiente en el mapeo
      const mapping = routeMapping[pathname]
      if (mapping) {
        newPath = mapping[newLocale]
      } else {
        // Fallback: redirigir a la página principal del idioma seleccionado
        newPath = newLocale === 'es' ? '/es/' : '/en/'
      }
    }

    // Navegar a la nueva ruta preservando el scroll
    preserveScrollAndNavigate(newPath)
  }

  return (
    // Pastilla blanca de 32 px dibujada detrás; los botones miden 44 px de alto para el toque.
    <div className="relative -my-1.5 flex items-center gap-1 px-1">
      <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-8 -translate-y-1/2 rounded-lg bg-white" />
      {([
        { code: 'es', flag: '🇪🇸', label: 'Español' },
        { code: 'en', flag: '🇬🇧', label: 'English' },
      ] as const).map((l) => (
        <button
          key={l.code}
          onClick={() => changeLanguage(l.code)}
          className="group relative flex h-11 w-8 items-center justify-center"
          aria-label={l.label}
          title={l.label}
        >
          <span
            className={`flex h-6 w-8 items-center justify-center overflow-hidden rounded-md text-lg transition-all duration-200 group-hover:scale-110 ${
              currentLocale === l.code ? 'ring-2 ring-orange-500 shadow-lg' : 'opacity-70 group-hover:opacity-100'
            }`}
          >
            {l.flag}
          </span>
        </button>
      ))}
    </div>
  )
}

export default LanguageSelector

"use client"
import React, { createContext, useContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

type Language = 'es' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  es: {
    // Navbar
    'nav.about': 'Sobre mí',
    'nav.migration': 'Migración',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacto',
    'nav.newStore': 'Tienda nueva',
    'nav.customDev': 'Desarrollo a medida',
    'nav.cases': 'Casos',

    // Hero

    // Problem + For whom (sección fusionada: afirmación corta + checklist)

    // Funnel leak section (puente visual entre "el problema" y "servicios")

    // Close / CTA

    // Contact Section
    'contact.title': 'Hablemos de tu tienda.',
    'contact.description': 'Cuéntame qué necesitas (una tienda nueva, una migración o algo a medida) y te respondo yo para buscar un hueco.',
    'contact.form.title': 'Tu proyecto',
    'contact.form.name': 'Tu nombre',
    'contact.form.name.label': 'Nombre *',
    'contact.form.email': 'tu@email.com',
    'contact.form.email.label': 'Email *',
    'contact.form.message': 'Cuéntame qué necesitas',
    'contact.form.message.label': 'Mensaje *',
    'contact.form.submit': 'Pedir reunión gratis',
    'contact.form.sending': 'Enviando...',
    'contact.form.success': 'Mensaje enviado. Te escribo para buscar un hueco.',
    'contact.form.name.req': 'Dinos cómo te llamas',
    'contact.form.name.ok': 'Perfecto',
    'contact.form.email.req': 'Necesito tu email',
    'contact.form.email.bad': 'Ese email no parece válido',
    'contact.form.email.ok': 'Email válido',
    'contact.form.company.ok': 'Anotado',
    'contact.form.message.req': 'Cuéntame algo sobre tu tienda',
    'contact.form.url.label': 'URL de tu tienda (opcional)',
    'contact.form.service.label': '¿Qué necesitas? *',
    'contact.form.service.placeholder': 'Elige una opción',
    'contact.form.service.req': 'Elige qué necesitas',
    'contact.form.url': 'tutienda.com',
    'contact.form.url.bad': 'Esa URL no parece válida',
    'contact.form.url.ok': 'Anotada',
    'contact.form.message.short': 'Un poco más de contexto, por favor',
    'contact.form.message.ok': 'Listo',
    'contact.form.err': 'Revisa los campos marcados.',
    'contact.info.email': 'Email',
    'contact.info.location': 'Ubicación',

    // Footer
    'footer.newsletter.title': 'MANTENTE AL DÍA',
    'footer.newsletter.description': 'Recibe consejos de Shopify y ecommerce directamente en tu bandeja de entrada.',
    'footer.newsletter.placeholder': 'tu@email.com',
    'footer.newsletter.button': 'Suscribirme',
    'footer.newsletter.sending': 'Enviando...',
    'footer.newsletter.success': '¡Revisa tu email para confirmar!',
    'footer.newsletter.already': '¡Ya estás suscrito!',
    'footer.newsletter.subscribed': '¡Suscrito!',
    'footer.newsletter.error': 'Error al suscribirse',
    'footer.newsletter.connection_error': 'Error de conexión. Inténtalo de nuevo.',
    'footer.company': 'SELLIFYWORKS',
    'footer.description': 'Tiendas Shopify sin límites, desde Barcelona.',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.privacy': 'Política de Privacidad',
    'footer.cookies': 'Política de Cookies',
    'footer.legal': 'Aviso Legal',
    
    // Footer Services
    'footer.services.title': 'SERVICIOS',
    'footer.services.migration': 'Migración a Shopify',
    'footer.services.customDev': 'Desarrollo a medida',
    'footer.services.newStore': 'Tienda nueva',
    'footer.services.monthly': 'Mejora continua',
    'footer.tools.title': 'HERRAMIENTA GRATIS',
    'footer.tools.calculator': 'Calculadora de beneficios',

    // Services Section

    // Case Study Section
    
    // About Page
    
    // Newsletter Confirmed Page
    'newsletter.confirmed.success.title': '¡Suscripción Confirmada!',
    'newsletter.confirmed.success.message': 'Gracias por confirmar tu suscripción a la newsletter de SellifyWorks. Ahora recibirás consejos sobre Shopify y comercio electrónico.',
    'newsletter.confirmed.already.title': '¡Ya estás suscrito!',
    'newsletter.confirmed.already.message': 'Tu email ya está suscrito a la newsletter de SellifyWorks. No hace falta confirmar de nuevo.',
    'newsletter.confirmed.error.title': 'Error de Confirmación',
    'newsletter.confirmed.error.message': 'Hubo un problema al confirmar tu suscripción. El enlace puede haber expirado o ser inválido.',
    'newsletter.confirmed.back': 'Volver al Inicio',
    'newsletter.confirmed.loading': 'Cargando...',
    
    // 404 Page
    '404.title': 'PÁGINA NO ENCONTRADA',
    '404.description': 'Parece que la página que buscas se fue de vacaciones a una playa remota. Mientras tanto, echa un vistazo a lo que sí hay.',
    '404.suggestion': 'O tal vez me tomé demasiados cafés y moví algo por error... 🤔',
    '404.buttons.home': 'Volver al Inicio',
    '404.buttons.back': 'Página Anterior',
    '404.buttons.contact': 'Contáctanos',
    
    // Privacy Policy Page
    'privacy.title': 'POLÍTICA DE PRIVACIDAD',
    'privacy.subtitle': 'Última actualización: Agosto 2025',
    'privacy.section1.title': 'Información que Recopilamos',
    'privacy.section1.content': 'En SellifyWorks, recopilamos información personal que nos proporcionas voluntariamente cuando te comunicas con nosotros, te suscribes a nuestro newsletter, o utilizas nuestros servicios.',
    'privacy.section2.title': 'Tipos de Datos',
    'privacy.section2.content': 'Los tipos de información personal que podemos recopilar incluyen:',
    'privacy.section2.item1': 'Nombre y apellidos',
    'privacy.section2.item2': 'Dirección de correo electrónico',
    'privacy.section2.item3': 'Número de teléfono',
    'privacy.section2.item4': 'Información sobre tu empresa o proyecto',
    'privacy.section3.title': 'Cómo Utilizamos tu Información',
    'privacy.section3.content': 'Utilizamos la información personal que recopilamos para proporcionarte nuestros servicios, responder a tus consultas, enviarte nuestro newsletter (si te has suscrito), y mejorar nuestros servicios.',
    'privacy.section4.title': 'Protección de Datos',
    'privacy.section4.content': 'Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tu información personal contra el acceso no autorizado, alteración, divulgación o destrucción.',
    'privacy.section5.title': 'Tus Derechos',
    'privacy.section5.content': 'Tienes derecho a acceder, rectificar, eliminar y portar tus datos personales. También puedes oponerte al tratamiento y solicitar la limitación del mismo.',
    'privacy.contact.title': 'Contacto',
    'privacy.contact.content': 'Si tienes preguntas sobre esta política de privacidad, puedes contactarnos en:',
    'privacy.back': 'Volver al Inicio',
    
    // Cookie Policy Page
    'cookies.title': 'POLÍTICA DE COOKIES',
    'cookies.subtitle': 'Última actualización: Agosto 2025',
    'cookies.section1.title': '¿Qué son las Cookies?',
    'cookies.section1.content': 'Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web. Nos ayudan a mejorar tu experiencia de navegación y a entender cómo utilizas nuestro sitio.',
    'cookies.section2.title': 'Tipos de Cookies que Utilizamos',
    'cookies.section2.essential.title': 'Cookies Esenciales',
    'cookies.section2.essential.content': 'Estas cookies son necesarias para el funcionamiento básico del sitio web y no se pueden desactivar.',
    'cookies.section2.analytics.title': 'Cookies de Análisis',
    'cookies.section2.analytics.content': 'Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web recopilando información de forma anónima.',
    'cookies.section2.preferences.title': 'Cookies de Preferencias',
    'cookies.section2.preferences.content': 'Recordamos tus preferencias, como el idioma seleccionado, para mejorar tu experiencia.',
    'cookies.section3.title': 'Control de Cookies',
    'cookies.section3.content': 'Puedes controlar y/o eliminar las cookies como desees. Puedes eliminar todas las cookies que ya están en tu dispositivo y configurar la mayoría de navegadores para evitar que se instalen.',
    'cookies.section4.title': 'Más Información',
    'cookies.section4.content': 'Si desactivas las cookies, es posible que algunas funciones del sitio web no funcionen correctamente.',
    'cookies.contact.title': 'Contacto',
    'cookies.contact.content': 'Si tienes preguntas sobre nuestra política de cookies, puedes contactarnos en:',
    'cookies.back': 'Volver al Inicio',
    
    // Related Services
    'relatedServices.title': 'SERVICIOS RELACIONADOS',
    'relatedServices.subtitle': 'Otras cosas que construyo para tiendas Shopify',
    'relatedServices.learnMore': 'Más información',
    'relatedServices.services.newStore.title': 'Tienda nueva',
    'relatedServices.services.newStore.description': 'Tu tienda Shopify desde cero, lista para vender: diseño, catálogo, pagos y envíos configurados.',
    'relatedServices.services.migration.title': 'Migración a Shopify',
    'relatedServices.services.migration.description': 'Paso tu tienda a Shopify cuidando tu posicionamiento en Google y sin cerrar ni un día.',
    'relatedServices.services.customDev.title': 'Desarrollo a medida',
    'relatedServices.services.customDev.description': 'Funcionalidad personalizada, integraciones y automatizaciones.',

    // Blog
    'blog.title': 'SellifyWorks Blog',
    'blog.subtitle': 'Artículos y consejos sobre Shopify, ecommerce y crecimiento online',
    'blog.moreStories': 'Más Artículos',
    'blog.publishedOn': 'Publicado el',
    'blog.by': 'por',
    'blog.backToBlog': '← Volver al Blog',
  },
  en: {
    // Navbar
    'nav.about': 'About me',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.newStore': 'New store',
    'nav.customDev': 'Custom development',
    'nav.cases': 'Case studies',
    'nav.migration': 'Migration',
    'contact.form.url.label': 'Store URL (optional)',
    'contact.form.service.label': 'What do you need? *',
    'contact.form.service.placeholder': 'Choose an option',
    'contact.form.service.req': 'Choose what you need',
    'contact.form.url': 'yourstore.com',
    'contact.form.url.bad': "That URL doesn't look valid",
    'contact.form.url.ok': 'Got it',

    // Hero

    // Problem + For whom (merged section: short statement + checklist)

    // Funnel leak section (visual bridge between "the problem" and "services")

    // Close / CTA

    // Contact Section
    'contact.title': 'Let\'s talk about your store.',
    'contact.description': 'Tell me what you need (a new store, a migration or something custom) and I\'ll get back to you myself to find a time.',
    'contact.form.title': 'Your project',
    'contact.form.name': 'Your name',
    'contact.form.name.label': 'Name *',
    'contact.form.email': 'your@email.com',
    'contact.form.email.label': 'Email *',
    'contact.form.message': 'Tell me what you need',
    'contact.form.message.label': 'Message *',
    'contact.form.submit': 'Book a free meeting',
    'contact.form.sending': 'Sending...',
    'contact.form.success': 'Message sent. I\'ll get back to you to find a time.',
    'contact.form.name.req': 'Tell me your name',
    'contact.form.name.ok': 'Great',
    'contact.form.email.req': 'I need your email',
    'contact.form.email.bad': 'That email doesn\'t look valid',
    'contact.form.email.ok': 'Valid email',
    'contact.form.company.ok': 'Got it',
    'contact.form.message.req': 'Tell me a bit about your store',
    'contact.form.message.short': 'A little more context, please',
    'contact.form.message.ok': 'Done',
    'contact.form.err': 'Check the highlighted fields.',
    'contact.info.email': 'Email',
    'contact.info.location': 'Location',

    // Footer
    'footer.newsletter.title': 'STAY UP TO DATE',
    'footer.newsletter.description': 'Get Shopify and ecommerce tips straight to your inbox.',
    'footer.newsletter.placeholder': 'your@email.com',
    'footer.newsletter.button': 'Subscribe',
    'footer.newsletter.sending': 'Sending...',
    'footer.newsletter.success': 'Check your email to confirm!',
    'footer.newsletter.already': 'Already subscribed!',
    'footer.newsletter.subscribed': 'Subscribed!',
    'footer.newsletter.error': 'Subscription error',
    'footer.newsletter.connection_error': 'Connection error. Please try again.',
    'footer.company': 'SELLIFYWORKS',
    'footer.description': 'Shopify stores without limits, from Barcelona.',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.cookies': 'Cookie Policy',
    'footer.legal': 'Legal Notice',
    
    // Footer Services
    'footer.services.title': 'SERVICES',
    'footer.services.migration': 'Shopify migration',
    'footer.services.customDev': 'Custom development',
    'footer.services.newStore': 'New store',
    'footer.services.monthly': 'Continuous improvement',
    'footer.tools.title': 'FREE TOOLS',
    'footer.tools.calculator': 'Profitability calculator',

    // Services Section

    // Case Study Section
    
    // About Page
    
    // Newsletter Confirmed Page
    'newsletter.confirmed.success.title': 'Subscription Confirmed!',
    'newsletter.confirmed.success.message': 'Thanks for confirming your subscription to the SellifyWorks newsletter. You will now receive tips on Shopify and e-commerce.',
    'newsletter.confirmed.already.title': 'Already subscribed!',
    'newsletter.confirmed.already.message': 'Your email is already subscribed to the SellifyWorks newsletter. No need to confirm again.',
    'newsletter.confirmed.error.title': 'Confirmation Error',
    'newsletter.confirmed.error.message': 'There was a problem confirming your subscription. The link may have expired or be invalid.',
    'newsletter.confirmed.back': 'Back to Home',
    'newsletter.confirmed.loading': 'Loading...',
    
    // 404 Page
    '404.title': 'PAGE NOT FOUND',
    '404.description': 'It looks like the page you\'re looking for went on vacation to a remote beach. In the meantime, have a look at what is here.',
    '404.suggestion': 'Or maybe I had too many coffees and moved something by mistake... 🤔',
    '404.buttons.home': 'Back to Home',
    '404.buttons.back': 'Previous Page',
    '404.buttons.contact': 'Contact',
    
    // Privacy Policy Page
    'privacy.title': 'PRIVACY POLICY',
    'privacy.subtitle': 'Last updated: August 2025',
    'privacy.section1.title': 'Information We Collect',
    'privacy.section1.content': 'At SellifyWorks, we collect personal information that you voluntarily provide to us when you contact us, subscribe to our newsletter, or use our services.',
    'privacy.section2.title': 'Types of Data',
    'privacy.section2.content': 'The types of personal information we may collect include:',
    'privacy.section2.item1': 'First and last name',
    'privacy.section2.item2': 'Email address',
    'privacy.section2.item3': 'Phone number',
    'privacy.section2.item4': 'Information about your company or project',
    'privacy.section3.title': 'How We Use Your Information',
    'privacy.section3.content': 'We use the personal information we collect to provide our services, respond to your inquiries, send you our newsletter (if you have subscribed), and improve our services.',
    'privacy.section4.title': 'Data Protection',
    'privacy.section4.content': 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure or destruction.',
    'privacy.section5.title': 'Your Rights',
    'privacy.section5.content': 'You have the right to access, rectify, delete and port your personal data. You can also object to processing and request limitation of the same.',
    'privacy.contact.title': 'Contact',
    'privacy.contact.content': 'If you have questions about this privacy policy, you can contact us at:',
    'privacy.back': 'Back to Home',
    
    // Cookie Policy Page
    'cookies.title': 'COOKIE POLICY',
    'cookies.subtitle': 'Last updated: August 2025',
    'cookies.section1.title': 'What are Cookies?',
    'cookies.section1.content': 'Cookies are small text files that are stored on your device when you visit our website. They help us improve your browsing experience and understand how you use our site.',
    'cookies.section2.title': 'Types of Cookies We Use',
    'cookies.section2.essential.title': 'Essential Cookies',
    'cookies.section2.essential.content': 'These cookies are necessary for the basic functioning of the website and cannot be disabled.',
    'cookies.section2.analytics.title': 'Analytics Cookies',
    'cookies.section2.analytics.content': 'They help us understand how visitors interact with our website by collecting information anonymously.',
    'cookies.section2.preferences.title': 'Preference Cookies',
    'cookies.section2.preferences.content': 'We remember your preferences, such as selected language, to improve your experience.',
    'cookies.section3.title': 'Cookie Control',
    'cookies.section3.content': 'You can control and/or delete cookies as you wish. You can delete all cookies that are already on your device and set most browsers to prevent them from being installed.',
    'cookies.section4.title': 'More Information',
    'cookies.section4.content': 'If you disable cookies, some website features may not work properly.',
    'cookies.contact.title': 'Contact',
    'cookies.contact.content': 'If you have questions about our cookie policy, you can contact us at:',
    'cookies.back': 'Back to Home',
    
    // Related Services
    'relatedServices.title': 'RELATED SERVICES',
    'relatedServices.subtitle': 'Other things I build for Shopify stores',
    'relatedServices.learnMore': 'Learn more',
    'relatedServices.services.newStore.title': 'New store',
    'relatedServices.services.newStore.description': 'Your Shopify store from scratch, ready to sell: design, catalogue, payments and shipping set up.',
    'relatedServices.services.migration.title': 'Shopify migration',
    'relatedServices.services.migration.description': 'I move your store to Shopify, protecting your Google rankings and without closing for a single day.',
    'relatedServices.services.customDev.title': 'Custom development',
    'relatedServices.services.customDev.description': 'Custom functionality, integrations and automations.',

    // Blog
    'blog.title': 'SellifyWorks Blog',
    'blog.subtitle': 'Articles and tips about Shopify, ecommerce and online growth',
    'blog.moreStories': 'More Stories',
    'blog.publishedOn': 'Published on',
    'blog.by': 'by',
    'blog.backToBlog': '← Back to Blog',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  // Se deriva del pathname ya en el primer render (incluido SSR) para evitar
  // que /en parpadee en español hasta que el useEffect corrija el estado.
  const [language, setLanguage] = useState<Language>(() => (pathname.startsWith('/en') ? 'en' : 'es'))

  // Mantener sincronizado si el pathname cambia tras la navegación inicial
  useEffect(() => {
    setLanguage(pathname.startsWith('/en') ? 'en' : 'es')
  }, [pathname])

  // Guardar idioma en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['es']] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

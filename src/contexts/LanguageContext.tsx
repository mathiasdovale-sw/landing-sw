"use client"
import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'es' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  es: {
    // Navbar
    'nav.services': 'SERVICES',
    'nav.about': 'ABOUT',
    'nav.contact': 'CONTACT',
    
    // Header
    'header.title.line1': 'MENOS COMPLICACIONES',
    'header.title.line2': 'MÁS CONVERSIONES.',
    'header.shopify.partner': 'AGENCY PARTNER',
    'header.shopify.description': 'Transformamos negocios digitales',
    'header.cta': 'Habla con un experto',
    
    // Contact Section
    'contact.title': 'Contactanos',
    'contact.description': '¿Listo para llevar tu negocio al siguiente nivel? Hablemos sobre cómo podemos ayudarte a crear, optimizar y hacer crecer tu tienda Shopify.',
    'contact.form.title': 'CUÉNTANOS TU PROYECTO',
    'contact.form.name': 'Tu nombre',
    'contact.form.name.label': 'Nombre *',
    'contact.form.email': 'tu@email.com',
    'contact.form.email.label': 'Email *',
    'contact.form.phone': 'Teléfono',
    'contact.form.company': 'Nombre de tu empresa',
    'contact.form.company.label': 'Empresa',
    'contact.form.service.label': 'Servicio de interés',
    'contact.form.service.placeholder': 'Selecciona un servicio',
    'contact.form.service.development': 'Desarrollo de tienda Shopify',
    'contact.form.service.optimization': 'Optimización y mejoras',
    'contact.form.service.migration': 'Migración a Shopify',
    'contact.form.service.maintenance': 'Mantenimiento y soporte',
    'contact.form.service.consulting': 'Consultoría estratégica',
    'contact.form.message': 'Cuéntanos sobre tu proyecto...',
    'contact.form.message.label': 'Mensaje *',
    'contact.form.submit': 'Enviar mensaje',
    'contact.form.sending': 'Enviando...',
    'contact.info.phone': 'Teléfono',
    'contact.info.email': 'Email',
    'contact.info.location': 'Ubicación',
    
    // Footer
    'footer.newsletter.title': 'MANTENTE AL DÍA',
    'footer.newsletter.description': 'Recibe las últimas tendencias de e-commerce, tips de Shopify y noticias de nuestra agencia directamente en tu inbox.',
    'footer.newsletter.placeholder': 'tu@email.com',
    'footer.newsletter.button': 'Suscribirme',
    'footer.newsletter.sending': 'Enviando...',
    'footer.newsletter.success': '¡Revisa tu email para confirmar!',
    'footer.newsletter.already': '¡Ya estás suscrito!',
    'footer.newsletter.subscribed': '¡Suscrito!',
    'footer.newsletter.error': 'Error al suscribirse',
    'footer.newsletter.connection_error': 'Error de conexión. Inténtalo de nuevo.',
    'footer.company': 'SELLIFYWORKS.',
    'footer.description': 'Agencia ecommerce especializada en Shopify. Creamos, optimizamos y hacemos crecer tiendas online que convierten.',
    
    // Services Section
    'services.title': 'NUESTROS SERVICIOS',
    'services.subtitle': 'Soluciones completas para hacer crecer tu negocio en Shopify con estrategias validadas',
    'services.create.title': 'Crear',
    'services.create.description': 'Desarrollamos tu tienda Shopify desde cero con diseño personalizado y funcionalidades avanzadas',
    'services.create.detail1': 'Diseño web personalizado y responsive',
    'services.create.detail2': 'Configuración completa de Shopify',
    'services.create.detail3': 'Integración de pasarelas de pago',
    'services.create.detail4': 'Optimización para dispositivos móviles',
    'services.create.detail5': 'Configuración de productos y categorías',
    'services.create.detail6': 'Implementación de funcionalidades avanzadas',
    'services.strategy.title': 'Estrategia',
    'services.strategy.description': 'Mejoramos el rendimiento y conversión de tu tienda existente para maximizar resultados',
    'services.strategy.detail1': 'Auditoría completa de la tienda',
    'services.strategy.detail2': 'Optimización de velocidad de carga',
    'services.strategy.detail3': 'Mejora de la experiencia de usuario (UX)',
    'services.strategy.detail4': 'Optimización para motores de búsqueda (SEO)',
    'services.strategy.detail5': 'Análisis y mejora del funnel de conversión',
    'services.strategy.detail6': 'Implementación de herramientas de analytics',
    'services.scale.title': 'Escalar',
    'services.scale.description': 'Escalamos tu negocio con estrategias de marketing digital y automatización avanzada',
    'services.scale.detail1': 'Marketing automation y email marketing',
    'services.scale.detail2': 'Integración con plataformas de publicidad',
    'services.scale.detail3': 'Optimización de conversiones avanzada',
    'services.scale.detail4': 'Implementación de programas de fidelización',
    'services.scale.detail5': 'Análisis de datos y reporting personalizado',
    'services.scale.detail6': 'Estrategias de retención de clientes',
    
    // About Page
    'about.hero.title': 'SOBRE NOSOTROS',
    'about.hero.subtitle': 'Creamos experiencias de comercio electrónico excepcionales en Shopify.',
    'about.history.title': 'NUESTRA HISTORIA',
    'about.history.content': 'Este proyecto comenzó con una visión clara: mejorar la experiencia de compra en ecommerce mediante soluciones técnicas de alta calidad, enfocadas en Shopify. A partir de esa idea, SellifyWorks fue creciendo como una consultora técnica orientada a resultados reales, con un modelo de trabajo ágil, escalable y centrado en el cliente.',
    'about.mission.title': 'NUESTRA MISIÓN',
    'about.mission.content': 'Impulsamos negocios en ecommerce a través de soluciones técnicas personalizadas en Shopify. Nos enfocamos en automatizar procesos, optimizar el rendimiento de las tiendas y aplicar metodologías ágiles que aseguren entregas rápidas y de alta calidad.\n\nNuestro objetivo es que cada cliente pueda escalar sin preocuparse por la complejidad técnica, confiando en una consultora que pone la experiencia de usuario y la eficiencia operativa en el centro de cada decisión.',
    'about.values.title': 'NUESTROS VALORES',
    'about.values.subtitle': 'Los principios que guían nuestro trabajo y definen quiénes somos.',
    'about.values.quality.title': 'CALIDAD',
    'about.values.quality.content': 'Aplicamos prácticas de desarrollo como Extreme Programming porque creemos que una buena solución no solo debe funcionar, sino hacerlo bien, rápido y de forma sostenible.',
    'about.values.validation.title': 'VALIDACIÓN',
    'about.values.validation.content': 'Creemos en la importancia de validar ideas y soluciones a través de pruebas constantes y feedback real. Esto nos permite ajustar y mejorar nuestros enfoques, asegurando que siempre estamos en el camino correcto.',
    'about.values.transparency.title': 'TRANSPARENCIA',
    'about.values.transparency.content': 'Creemos en relaciones honestas, en procesos iterativos que permitan evolucionar constantemente, y en el compromiso innegociable de entregar valor en cada entrega.',
    'about.team.title': 'NUESTRO EQUIPO',
    'about.team.subtitle': 'Conoce a las personas que hacen posible el éxito de tu proyecto.',
    'about.team.mathias.role': 'FOUNDER',
    'about.team.mathias.description': 'Ingeniero en informática con mas de 10 años de experiencia en desarrollo de software.',
    'about.cta.title': '¿LISTO PARA TRABAJAR JUNTOS?',
    'about.cta.subtitle': 'Descubre cómo podemos ayudarte a llevar tu negocio al siguiente nivel.',
    'about.cta.button': 'Contactar con nosotros',
    
    // Newsletter Confirmed Page
    'newsletter.confirmed.success.title': '¡Suscripción Confirmada!',
    'newsletter.confirmed.success.message': 'Gracias por confirmar tu suscripción a nuestra newsletter. Ahora recibirás nuestros tips exclusivos sobre Shopify y comercio electrónico.',
    'newsletter.confirmed.already.title': '¡Ya estás suscrito!',
    'newsletter.confirmed.already.message': 'Tu email ya está suscrito a nuestra newsletter. No es necesario confirmar nuevamente.',
    'newsletter.confirmed.error.title': 'Error de Confirmación',
    'newsletter.confirmed.error.message': 'Hubo un problema al confirmar tu suscripción. El enlace puede haber expirado o ser inválido.',
    'newsletter.confirmed.back': 'Volver al Inicio',
    'newsletter.confirmed.loading': 'Cargando...',
    
    // 404 Page
    '404.title': 'PÁGINA NO ENCONTRADA',
    '404.description': 'Parece que la página que buscas se fue de vacaciones a una playa remota. Mientras tanto, ¿qué tal si exploramos juntos lo que sí tenemos?',
    '404.suggestion': 'O tal vez nuestro desarrollador se tomó demasiados cafés y movió algo por error... 🤔',
    '404.buttons.home': 'Volver al Inicio',
    '404.buttons.back': 'Página Anterior',
    '404.buttons.contact': 'Contáctanos',
  },
  en: {
    // Navbar
    'nav.services': 'SERVICES',
    'nav.about': 'ABOUT',
    'nav.contact': 'CONTACT',
    
    // Header
    'header.title.line1': 'LESS COMPLICATIONS',
    'header.title.line2': 'MORE CONVERSIONS.',
    'header.shopify.partner': 'AGENCY PARTNER',
    'header.shopify.description': 'We transform digital businesses',
    'header.cta': 'Talk to an expert',
    
    // Contact Section
    'contact.title': 'Contact Us',
    'contact.description': 'Ready to take your business to the next level? Let\'s talk about how we can help you create, optimize and grow your Shopify store.',
    'contact.form.title': 'TELL US ABOUT YOUR PROJECT',
    'contact.form.name': 'Your name',
    'contact.form.name.label': 'Name *',
    'contact.form.email': 'your@email.com',
    'contact.form.email.label': 'Email *',
    'contact.form.phone': 'Phone',
    'contact.form.company': 'Your company name',
    'contact.form.company.label': 'Company',
    'contact.form.service.label': 'Service of interest',
    'contact.form.service.placeholder': 'Select a service',
    'contact.form.service.development': 'Shopify store development',
    'contact.form.service.optimization': 'Optimization and improvements',
    'contact.form.service.migration': 'Migration to Shopify',
    'contact.form.service.maintenance': 'Maintenance and support',
    'contact.form.service.consulting': 'Strategic consulting',
    'contact.form.message': 'Tell us about your project...',
    'contact.form.message.label': 'Message *',
    'contact.form.submit': 'Send message',
    'contact.form.sending': 'Sending...',
    'contact.info.phone': 'Phone',
    'contact.info.email': 'Email',
    'contact.info.location': 'Location',
    
    // Footer
    'footer.newsletter.title': 'STAY UP TO DATE',
    'footer.newsletter.description': 'Get the latest e-commerce trends, Shopify tips and news from our agency directly in your inbox.',
    'footer.newsletter.placeholder': 'your@email.com',
    'footer.newsletter.button': 'Subscribe',
    'footer.newsletter.sending': 'Sending...',
    'footer.newsletter.success': 'Check your email to confirm!',
    'footer.newsletter.already': 'Already subscribed!',
    'footer.newsletter.subscribed': 'Subscribed!',
    'footer.newsletter.error': 'Subscription error',
    'footer.newsletter.connection_error': 'Connection error. Please try again.',
    'footer.company': 'SELLIFYWORKS.',
    'footer.description': 'E-commerce agency specialized in Shopify. We create, optimize and grow online stores that convert.',
    
    // Services Section
    'services.title': 'OUR SERVICES',
    'services.subtitle': 'Complete solutions to grow your Shopify business with validated strategies',
    'services.create.title': 'Create',
    'services.create.description': 'We develop your Shopify store from scratch with custom design and advanced features',
    'services.create.detail1': 'Custom and responsive web design',
    'services.create.detail2': 'Complete Shopify configuration',
    'services.create.detail3': 'Payment gateway integration',
    'services.create.detail4': 'Mobile device optimization',
    'services.create.detail5': 'Product and category setup',
    'services.create.detail6': 'Advanced functionality implementation',
    'services.strategy.title': 'Strategy',
    'services.strategy.description': 'We improve the performance and conversion of your existing store to maximize results',
    'services.strategy.detail1': 'Complete store audit',
    'services.strategy.detail2': 'Loading speed optimization',
    'services.strategy.detail3': 'User experience (UX) improvement',
    'services.strategy.detail4': 'Search engine optimization (SEO)',
    'services.strategy.detail5': 'Conversion funnel analysis and improvement',
    'services.strategy.detail6': 'Analytics tools implementation',
    'services.scale.title': 'Scale',
    'services.scale.description': 'We scale your business with digital marketing strategies and advanced automation',
    'services.scale.detail1': 'Marketing automation and email marketing',
    'services.scale.detail2': 'Advertising platform integration',
    'services.scale.detail3': 'Advanced conversion optimization',
    'services.scale.detail4': 'Loyalty program implementation',
    'services.scale.detail5': 'Data analysis and custom reporting',
    'services.scale.detail6': 'Customer retention strategies',
    
    // About Page
    'about.hero.title': 'ABOUT US',
    'about.hero.subtitle': 'We create exceptional e-commerce experiences on Shopify.',
    'about.history.title': 'OUR STORY',
    'about.history.content': 'This project started with a clear vision: to improve the shopping experience in e-commerce through high-quality technical solutions focused on Shopify. From that idea, SellifyWorks grew as a results-oriented technical consultancy, with an agile, scalable and customer-centered work model.',
    'about.mission.title': 'OUR MISSION',
    'about.mission.content': 'We drive e-commerce businesses through personalized technical solutions on Shopify. We focus on automating processes, optimizing store performance and applying agile methodologies that ensure fast and high-quality deliveries.\n\nOur goal is for each client to be able to scale without worrying about technical complexity, trusting a consultancy that puts user experience and operational efficiency at the center of every decision.',
    'about.values.title': 'OUR VALUES',
    'about.values.subtitle': 'The principles that guide our work and define who we are.',
    'about.values.quality.title': 'QUALITY',
    'about.values.quality.content': 'We apply development practices like Extreme Programming because we believe that a good solution should not only work, but work well, fast and sustainably.',
    'about.values.validation.title': 'VALIDATION',
    'about.values.validation.content': 'We believe in the importance of validating ideas and solutions through constant testing and real feedback. This allows us to adjust and improve our approaches, ensuring we are always on the right track.',
    'about.values.transparency.title': 'TRANSPARENCY',
    'about.values.transparency.content': 'We believe in honest relationships, in iterative processes that allow constant evolution, and in the non-negotiable commitment to deliver value in every delivery.',
    'about.team.title': 'OUR TEAM',
    'about.team.subtitle': 'Meet the people who make your project\'s success possible.',
    'about.team.mathias.role': 'FOUNDER',
    'about.team.mathias.description': 'Computer engineer with over 10 years of experience in software development.',
    'about.cta.title': 'READY TO WORK TOGETHER?',
    'about.cta.subtitle': 'Discover how we can help you take your business to the next level.',
    'about.cta.button': 'Contact us',
    
    // Newsletter Confirmed Page
    'newsletter.confirmed.success.title': 'Subscription Confirmed!',
    'newsletter.confirmed.success.message': 'Thank you for confirming your subscription to our newsletter. You will now receive our exclusive tips on Shopify and e-commerce.',
    'newsletter.confirmed.already.title': 'Already subscribed!',
    'newsletter.confirmed.already.message': 'Your email is already subscribed to our newsletter. No need to confirm again.',
    'newsletter.confirmed.error.title': 'Confirmation Error',
    'newsletter.confirmed.error.message': 'There was a problem confirming your subscription. The link may have expired or be invalid.',
    'newsletter.confirmed.back': 'Back to Home',
    'newsletter.confirmed.loading': 'Loading...',
    
    // 404 Page
    '404.title': 'PAGE NOT FOUND',
    '404.description': 'It looks like the page you\'re looking for went on vacation to a remote beach. In the meantime, how about we explore together what we do have?',
    '404.suggestion': 'Or maybe our developer had too many coffees and moved something by mistake... 🤔',
    '404.buttons.home': 'Back to Home',
    '404.buttons.back': 'Previous Page',
    '404.buttons.contact': 'Contact Us',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('es')

  // Cargar idioma del localStorage al inicializar
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      setLanguage(savedLanguage)
    }
  }, [])

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

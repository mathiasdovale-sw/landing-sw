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
    'nav.services': 'SERVICES',
    'nav.about': 'ABOUT',
    'nav.contact': 'CONTACT',
    
    // Header
    'header.title.line1': 'MENOS COMPLICACIONES',
    'header.title.line2': 'MÁS CONVERSIONES.',
    'header.shopify.partner': 'Agencia Shopify en España',
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
    'contact.form.success': '¡Mensaje enviado correctamente! Te contactaremos pronto.',
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
    'footer.rights': 'Todos los derechos reservados.',
    'footer.privacy': 'Política de Privacidad',
    'footer.cookies': 'Política de Cookies',
    
    // Footer Services
    'footer.services.title': 'SERVICIOS',
    'footer.services.storeSetup': 'Crear Tienda Shopify',
    'footer.services.seo': 'SEO Shopify',
    'footer.services.design': 'Diseño Shopify',
    'footer.services.themeCustomization': 'Personalización de Tema',
    'footer.services.migration': 'Migración a Shopify',
    'footer.services.cro': 'Optimización de Conversiones',
    'footer.services.plus': 'Shopify Plus',
    'footer.services.consulting': 'Consultoría Shopify',
    'footer.services.growthPartner': 'Growth Partner',
    'footer.services.abTesting': 'A/B Testing',
    
    // Services Section
    'services.title': 'NUESTROS SERVICIOS',
    'services.subtitle': 'En nuestra agencia Shopify ayudamos a marcas y negocios de todos los tamaños a lanzar y hacer crecer su ecommerce.',
    'services.create.title': 'Crear',
    'services.create.description': 'Desarrollamos tu tienda Shopify desde cero con diseño personalizado y funcionalidades avanzadas',
    'services.create.detail1': 'Diseño web personalizado y responsive',
    'services.create.detail1.url': '/diseno-shopify',
    'services.create.detail2': 'Configuración completa de Shopify',
    'services.create.detail2.url': '/crear-tienda-shopify',
    'services.create.detail3': 'Integración de pasarelas de pago',
    'services.create.detail3.url': '/crear-tienda-shopify',
    'services.create.detail4': 'Optimización para dispositivos móviles',
    'services.create.detail4.url': '/diseno-shopify',
    'services.create.detail5': 'Configuración de productos y categorías',
    'services.create.detail5.url': '/crear-tienda-shopify',
    'services.create.detail6': 'Implementación de funcionalidades avanzadas',
    'services.create.detail6.url': '/personalizacion-tema-shopify',
    'services.strategy.title': 'Estrategia',
    'services.strategy.description': 'Mejoramos el rendimiento y conversión de tu tienda existente para maximizar resultados',
    'services.strategy.detail1': 'Auditoría completa de la tienda',
    'services.strategy.detail1.url': '/consultoria-shopify',
    'services.strategy.detail2': 'Optimización de velocidad de carga',
    'services.strategy.detail2.url': '/consultoria-shopify',
    'services.strategy.detail3': 'Mejora de la experiencia de usuario (UX)',
    'services.strategy.detail3.url': '/diseno-shopify',
    'services.strategy.detail4': 'Optimización para motores de búsqueda (SEO)',
    'services.strategy.detail4.url': '/seo-shopify',
    'services.strategy.detail5': 'Análisis y mejora del funnel de conversión',
    'services.strategy.detail5.url': '/cro-shopify',
    'services.strategy.detail6': 'Implementación de herramientas de analytics',
    'services.strategy.detail6.url': '/consultoria-shopify',
    'services.scale.title': 'Escalar',
    'services.scale.description': 'Escalamos tu negocio con estrategias de marketing digital y automatización avanzada',
    'services.scale.detail1': 'Marketing automation y email marketing',
    'services.scale.detail1.url': '/growth-partner-shopify',
    'services.scale.detail2': 'Integración con plataformas de publicidad',
    'services.scale.detail2.url': '/growth-partner-shopify',
    'services.scale.detail3': 'Optimización de conversiones avanzada',
    'services.scale.detail3.url': '/cro-shopify',
    'services.scale.detail4': 'Implementación de programas de fidelización',
    'services.scale.detail4.url': '/growth-partner-shopify',
    'services.scale.detail5': 'Análisis de datos y reporting personalizado',
    'services.scale.detail5.url': '/ab-testing-shopify',
    'services.scale.detail6': 'Estrategias de retención de clientes',
    'services.scale.detail6.url': '/growth-partner-shopify',
    'services.more_info': 'Más información',
    
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
    'relatedServices.subtitle': 'Descubre otros servicios que pueden impulsar tu tienda Shopify',
    'relatedServices.learnMore': 'Más información',
    'relatedServices.services.storeSetup.title': 'Crear Tienda Shopify',
    'relatedServices.services.storeSetup.description': 'Desarrollo completo de tu tienda online desde cero con diseño profesional.',
    'relatedServices.services.design.title': 'Diseño Shopify',
    'relatedServices.services.design.description': 'Diseños únicos y atractivos que convierten visitantes en clientes.',
    'relatedServices.services.themeCustomization.title': 'Personalización de Tema',
    'relatedServices.services.themeCustomization.description': 'Adapta tu tema de Shopify a las necesidades específicas de tu marca.',
    'relatedServices.services.migration.title': 'Migración a Shopify',
    'relatedServices.services.migration.description': 'Migra tu tienda a Shopify sin perder datos ni interrumpir las ventas.',
    'relatedServices.services.seo.title': 'SEO para Shopify',
    'relatedServices.services.seo.description': 'Optimización para motores de búsqueda y mayor visibilidad online.',
    'relatedServices.services.cro.title': 'CRO Shopify',
    'relatedServices.services.cro.description': 'Optimización de conversiones para maximizar las ventas de tu tienda.',
    'relatedServices.services.plus.title': 'Shopify Plus',
    'relatedServices.services.plus.description': 'Soluciones enterprise para negocios de alto volumen y crecimiento.',
    'relatedServices.services.consulting.title': 'Consultoría Shopify',
    'relatedServices.services.consulting.description': 'Asesoramiento estratégico para optimizar y hacer crecer tu negocio.',
    'relatedServices.services.growthPartner.title': 'Growth Partner',
    'relatedServices.services.growthPartner.description': 'Partner de crecimiento integral para escalar tu negocio online.',
    'relatedServices.services.abTesting.title': 'A/B Testing Shopify',
    'relatedServices.services.abTesting.description': 'Pruebas A/B para optimizar la experiencia de usuario y conversiones.',
    
    // Blog
    'blog.title': 'Blog',
    'blog.subtitle': 'Artículos y consejos sobre Shopify, ecommerce y crecimiento online',
    'blog.heroPost': 'Artículo Destacado',
    'blog.moreStories': 'Más Artículos',
    'blog.readMore': 'Leer más',
    'blog.publishedOn': 'Publicado el',
    'blog.by': 'por',
    'blog.backToBlog': '← Volver al Blog',
    'blog.relatedPosts': 'Artículos Relacionados',
    'blog.shareArticle': 'Compartir artículo',
    'blog.tags': 'Etiquetas',
    'blog.categories': 'Categorías',
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
    'contact.form.success': 'Message sent successfully! We will contact you soon.',
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
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.cookies': 'Cookie Policy',
    
    // Footer Services
    'footer.services.title': 'SERVICES',
    'footer.services.storeSetup': 'Shopify Store Setup',
    'footer.services.seo': 'Shopify SEO',
    'footer.services.design': 'Shopify Design',
    'footer.services.themeCustomization': 'Theme Customization',
    'footer.services.migration': 'Shopify Migration',
    'footer.services.cro': 'Conversion Optimization',
    'footer.services.plus': 'Shopify Plus',
    'footer.services.consulting': 'Shopify Consulting',
    'footer.services.growthPartner': 'Growth Partner',
    'footer.services.abTesting': 'A/B Testing',
    
    // Services Section
    'services.title': 'OUR SERVICES',
    'services.subtitle': 'Complete solutions to grow your Shopify business with validated strategies',
    'services.create.title': 'Create',
    'services.create.description': 'We develop your Shopify store from scratch with custom design and advanced features',
    'services.create.detail1': 'Custom and responsive web design',
    'services.create.detail1.url': '/shopify-design',
    'services.create.detail2': 'Complete Shopify configuration',
    'services.create.detail2.url': '/shopify-store-setup',
    'services.create.detail3': 'Payment gateway integration',
    'services.create.detail3.url': '/shopify-store-setup',
    'services.create.detail4': 'Mobile device optimization',
    'services.create.detail4.url': '/shopify-design',
    'services.create.detail5': 'Product and category setup',
    'services.create.detail5.url': '/shopify-store-setup',
    'services.create.detail6': 'Advanced functionality implementation',
    'services.create.detail6.url': '/shopify-theme-customization',
    'services.strategy.title': 'Strategy',
    'services.strategy.description': 'We improve the performance and conversion of your existing store to maximize results',
    'services.strategy.detail1': 'Complete store audit',
    'services.strategy.detail1.url': '/shopify-consulting',
    'services.strategy.detail2': 'Loading speed optimization',
    'services.strategy.detail2.url': '/shopify-consulting',
    'services.strategy.detail3': 'User experience (UX) improvement',
    'services.strategy.detail3.url': '/shopify-design',
    'services.strategy.detail4': 'Search engine optimization (SEO)',
    'services.strategy.detail4.url': '/shopify-seo',
    'services.strategy.detail5': 'Conversion funnel analysis and improvement',
    'services.strategy.detail5.url': '/shopify-cro',
    'services.strategy.detail6': 'Analytics tools implementation',
    'services.strategy.detail6.url': '/shopify-consulting',
    'services.scale.title': 'Scale',
    'services.scale.description': 'We scale your business with digital marketing strategies and advanced automation',
    'services.scale.detail1': 'Marketing automation and email marketing',
    'services.scale.detail1.url': '/shopify-growth-partner',
    'services.scale.detail2': 'Advertising platform integration',
    'services.scale.detail2.url': '/shopify-growth-partner',
    'services.scale.detail3': 'Advanced conversion optimization',
    'services.scale.detail3.url': '/shopify-cro',
    'services.scale.detail4': 'Loyalty program implementation',
    'services.scale.detail4.url': '/shopify-growth-partner',
    'services.scale.detail5': 'Data analysis and custom reporting',
    'services.scale.detail5.url': '/shopify-ab-testing',
    'services.scale.detail6': 'Customer retention strategies',
    'services.scale.detail6.url': '/shopify-growth-partner',
    'services.more_info': 'More information',
    
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
    
    // Privacy Policy Page
    'privacy.title': 'PRIVACY POLICY',
    'privacy.subtitle': 'Last updated: August 2024',
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
    'cookies.subtitle': 'Last updated: August 2024',
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
    'relatedServices.subtitle': 'Discover other services that can boost your Shopify store',
    'relatedServices.learnMore': 'Learn more',
    'relatedServices.services.storeSetup.title': 'Shopify Store Setup',
    'relatedServices.services.storeSetup.description': 'Complete development of your online store from scratch with professional design.',
    'relatedServices.services.design.title': 'Shopify Design',
    'relatedServices.services.design.description': 'Unique and attractive designs that convert visitors into customers.',
    'relatedServices.services.themeCustomization.title': 'Theme Customization',
    'relatedServices.services.themeCustomization.description': 'Adapt your Shopify theme to your brand\'s specific needs.',
    'relatedServices.services.migration.title': 'Shopify Migration',
    'relatedServices.services.migration.description': 'Migrate your store to Shopify without losing data or interrupting sales.',
    'relatedServices.services.seo.title': 'Shopify SEO',
    'relatedServices.services.seo.description': 'Search engine optimization for greater online visibility.',
    'relatedServices.services.cro.title': 'Shopify CRO',
    'relatedServices.services.cro.description': 'Conversion rate optimization to maximize your store\'s sales.',
    'relatedServices.services.plus.title': 'Shopify Plus',
    'relatedServices.services.plus.description': 'Enterprise solutions for high-volume businesses and growth.',
    'relatedServices.services.consulting.title': 'Shopify Consulting',
    'relatedServices.services.consulting.description': 'Strategic advisory to optimize and grow your business.',
    'relatedServices.services.growthPartner.title': 'Growth Partner',
    'relatedServices.services.growthPartner.description': 'Comprehensive growth partnership to scale your online business.',
    'relatedServices.services.abTesting.title': 'A/B Testing Shopify',
    'relatedServices.services.abTesting.description': 'A/B testing to optimize user experience and conversions.',
    
    // Blog
    'blog.title': 'Blog',
    'blog.subtitle': 'Articles and tips about Shopify, ecommerce and online growth',
    'blog.heroPost': 'Featured Article',
    'blog.moreStories': 'More Stories',
    'blog.readMore': 'Read more',
    'blog.publishedOn': 'Published on',
    'blog.by': 'by',
    'blog.backToBlog': '← Back to Blog',
    'blog.relatedPosts': 'Related Posts',
    'blog.shareArticle': 'Share article',
    'blog.tags': 'Tags',
    'blog.categories': 'Categories',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [language, setLanguage] = useState<Language>('es')

  // Detectar idioma desde la URL
  useEffect(() => {
    if (pathname.startsWith('/en')) {
      setLanguage('en')
    } else if (pathname.startsWith('/es')) {
      setLanguage('es')
    } else {
      // Para rutas sin prefijo de idioma, usar español por defecto
      setLanguage('es')
    }
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

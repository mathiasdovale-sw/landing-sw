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
    'nav.services': 'Servicios',
    'nav.about': 'Sobre nosotros',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacto',

    // Hero
    'hero.eyebrow': 'Agencia Shopify · España',
    'hero.title.line1': '¿Tu tienda Shopify',
    'hero.title.line2': 'no despega?',
    'hero.sub': 'Tienes tráfico, pero no convierte. Te ayudamos a identificar qué lo frena con los mismos procesos que usan las grandes — al precio de tu etapa, con procesos potenciados por IA.',
    'hero.cta1': 'Pedir mi auditoría',
    'hero.cta2': 'Ver servicios y precios',
    'hero.stat1.label': 'conversiones al mes — tu punto dulce',
    'hero.stat2.label': 'migración completa a Shopify, llave en mano',
    'hero.stat3.num': 'IA',
    'hero.stat3.label': 'procesos nivel enterprise, precio de marca pequeña',

    // Problem + For whom (sección fusionada: afirmación corta + checklist)
    'problem.eyebrow': 'El problema',
    'problem.title': 'Las agencias persiguen a los grandes.',
    'problem.lede': 'Tu tienda no tiene un problema de producto. Tiene un problema de conversión — y lo sabes si esto te suena:',
    'whom.item1': 'Tienes tráfico, pero las ventas no llegan.',
    'whom.item2': 'No sabes si el problema es tu tienda, tu producto o tu tráfico.',
    'whom.item3': 'Vendes en Shopify o querés migrar — en cualquier caso, tu agencia actual no te está mirando.',
    'whom.item4': 'Quieres crecer y no sabés por dónde empezar.',
    'whom.item5': 'Tu agencia, si la tienes, no está mirando por ti.',
    'whom.foot': 'Justo por eso estamos aquí.',

    // Funnel leak section (puente visual entre "el problema" y "servicios")
    'funnel.title': 'Así se ve un funnel con fugas',
    'funnel.srSummary': 'Diagrama animado: el tráfico llega por búsqueda orgánica y publicidad paga, recorre home, colección, producto y checkout, y la mayoría se pierde antes de completar la compra.',
    'funnel.node.organic': 'Orgánico',
    'funnel.node.paid': 'Paid ads',
    'funnel.node.home': 'Home',
    'funnel.node.collection': 'Colección',
    'funnel.node.pdp': 'Página de producto',
    'funnel.node.checkout': 'Checkout',

    // Close / CTA
    'close.eyebrow': 'Empecemos',
    'close.title': 'Tu tienda se merece algo mejor.',
    'close.cta': 'Empieza con una auditoría',

    // Contact Section
    'contact.title': 'Hablemos.',
    'contact.description': 'Cuéntanos qué está pasando con tu tienda. Te respondemos para coordinar una llamada, sin compromiso.',
    'contact.form.title': 'CUÉNTANOS TU PROYECTO',
    'contact.form.name': 'Tu nombre',
    'contact.form.name.label': 'Nombre *',
    'contact.form.email': 'tu@email.com',
    'contact.form.email.label': 'Email *',
    'contact.form.phone': 'Teléfono',
    'contact.form.company': 'Tu tienda / marca',
    'contact.form.company.label': 'Empresa',
    'contact.form.message': 'Cuéntanos sobre tu proyecto...',
    'contact.form.message.label': 'Mensaje *',
    'contact.form.submit': 'Enviar mensaje',
    'contact.form.sending': 'Enviando...',
    'contact.form.success': '¡Mensaje enviado correctamente! Te contactaremos pronto.',
    'contact.form.name.req': 'Dinos cómo te llamas',
    'contact.form.name.ok': 'Perfecto',
    'contact.form.email.req': 'Necesitamos tu email',
    'contact.form.email.bad': 'Ese email no parece válido',
    'contact.form.email.ok': 'Email válido',
    'contact.form.company.ok': 'Anotado',
    'contact.form.message.req': 'Cuéntanos algo sobre tu tienda',
    'contact.form.message.short': 'Un poco más de contexto, por favor',
    'contact.form.message.ok': 'Listo',
    'contact.form.err': 'Revisa los campos marcados.',
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
    'footer.company': 'SELLIFYWORKS',
    'footer.description': 'Agencia ecommerce especializada en Shopify. Creamos, optimizamos y hacemos crecer tiendas online que convierten.',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.privacy': 'Política de Privacidad',
    'footer.cookies': 'Política de Cookies',
    
    // Footer Services
    'footer.services.title': 'SERVICIOS',
    'footer.services.migration': 'Migración a Shopify',
    'footer.services.customDev': 'Desarrollos a medida',
    'footer.services.conversionAudit': 'Auditoría de conversión',
    'footer.services.emailAutomation': 'Email marketing automation',

    // Services Section
    'services.eyebrow': 'Servicios',
    'services.title': 'Lo que tu tienda necesita, nada más.',
    'services.sub': 'Sin paquetes genéricos ni letra pequeña. Cada servicio resuelve un problema concreto; hablamos y te cotizamos según el alcance real de tu tienda.',
    'services.migration.name': 'Migración a Shopify',
    'services.migration.tagline': 'Para migrar sin perder ventas',
    'services.migration.bullet1': 'Diagnóstico previo sin sorpresas',
    'services.migration.bullet2': 'Carga y copy de todo tu catálogo*',
    'services.migration.bullet3': 'Cero tiempo de inactividad',
    'services.customDev.name': 'Desarrollos a medida',
    'services.customDev.tagline': 'Para lo que no encaja en ningún plan',
    'services.customDev.bullet1': 'Integraciones con tus herramientas',
    'services.customDev.bullet2': 'Automatizaciones a medida',
    'services.customDev.bullet3': 'Presupuesto cerrado antes de empezar',
    'services.conversionAudit.badge': 'Recomendado para empezar',
    'services.conversionAudit.name': 'Auditoría de conversión',
    'services.conversionAudit.tagline': 'Web completa o una sola página, tú decides',
    'services.conversionAudit.bullet1': 'Auditoría de tu tienda completa o de una página puntual',
    'services.conversionAudit.bullet2': 'Priorizado por impacto en ventas',
    'services.conversionAudit.bullet3': 'Próximos pasos concretos',
    'services.emailAutomation.name': 'Email marketing automation',
    'services.emailAutomation.tagline': 'Para vender mientras duermes',
    'services.emailAutomation.bullet1': 'Welcome flow y carrito abandonado',
    'services.emailAutomation.bullet2': 'Post-compra y solicitud de reseña',
    'services.emailAutomation.bullet3': 'Configurado y probado, listo para usar',
    'services.cta': 'Hablemos de tu tienda',
    'services.requestQuote': 'Pedir presupuesto',
    'services.catalogNote': '*Incluye hasta 25 productos/variantes.',

    // Case Study Section
    'casestudy.title': 'Clientes que confiaron en nosotros',
    'casestudy.subtitle': 'Dos formas distintas de trabajar juntos: arreglar lo que ya tenías, o construir algo nuevo desde cero.',
    'casestudy.card1.title': 'Can Ramos',
    'casestudy.card1.line': 'De Wix estancado a Shopify que vende solo.',
    'casestudy.card1.result': 'Migración completa sin pérdida de ventas, con checkout optimizado y welcome flow automático.',
    'casestudy.card2.title': 'Termolar',
    'casestudy.card2.line': 'Lanzamiento de tienda nueva, venta a toda Europa (excepto Reino Unido).',
    'casestudy.card2.result': 'De cero a operativa en 1 mes y medio.',
    'casestudy.cta.title': '¿Tienes tráfico pero no vendes?',
    'casestudy.cta.description': 'Te mostramos exactamente qué está frenando tus conversiones.',
    'casestudy.cta.button': 'Quiero una llamada gratuita',
    'casestudy.cta.viewcase': 'Ver casos reales',
    
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
    'relatedServices.services.migration.title': 'Migración a Shopify',
    'relatedServices.services.migration.description': 'Migra tu tienda a Shopify sin perder datos ni interrumpir las ventas.',
    'relatedServices.services.customDev.title': 'Desarrollos a medida',
    'relatedServices.services.customDev.description': 'Funcionalidad personalizada, integraciones y automatizaciones.',
    'relatedServices.services.conversionAudit.title': 'Auditoría de conversión',
    'relatedServices.services.conversionAudit.description': 'Tu web completa o una página puntual, con un plan priorizado por impacto.',
    'relatedServices.services.emailAutomation.title': 'Email marketing automation',
    'relatedServices.services.emailAutomation.description': 'Flujos automáticos que venden mientras duermes.',

    // Blog
    'blog.title': 'SellifyWorks Blog',
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
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',

    // Hero
    'hero.eyebrow': 'Shopify agency · Spain',
    'hero.title.line1': 'Enterprise-grade Shopify.',
    'hero.title.line2': 'Finally accessible.',
    'hero.sub': 'You\'ve got traffic, but it doesn\'t convert. We help you fix it with the same processes the big brands use — at the price of your stage.',
    'hero.cta1': 'Talk to an expert',
    'hero.cta2': 'See services & pricing',
    'hero.stat1.label': 'conversions/month — our sweet spot',
    'hero.stat2.label': 'full Shopify migration, turnkey',
    'hero.stat3.num': 'AI',
    'hero.stat3.label': 'enterprise process, small-brand cost',

    // Problem + For whom (merged section: short statement + checklist)
    'problem.eyebrow': 'The problem',
    'problem.title': 'Agencies chase the big players.',
    'problem.lede': 'Your store doesn\'t have a product problem. It has a conversion problem — and you\'ll know if this sounds like you:',
    'whom.item1': 'You sell on Shopify — or you want to migrate to it.',
    'whom.item2': 'Traffic comes in, but conversions don\'t follow.',
    'whom.item3': 'You want to grow and don\'t know where to start.',
    'whom.item4': 'You don\'t have an enterprise budget — and you shouldn\'t need one.',
    'whom.item5': 'Your agency, if you have one, isn\'t looking out for you.',
    'whom.foot': 'Exactly who we\'re here for.',

    // Funnel leak section (visual bridge between "the problem" and "services")
    'funnel.title': 'This is what a leaky funnel looks like',
    'funnel.srSummary': 'Animated diagram: traffic arrives through organic search and paid ads, moves through home, collection, product and checkout, and most of it drops off before completing a purchase.',
    'funnel.node.organic': 'Organic',
    'funnel.node.paid': 'Paid ads',
    'funnel.node.home': 'Home',
    'funnel.node.collection': 'Collection',
    'funnel.node.pdp': 'PDP',
    'funnel.node.checkout': 'Checkout',

    // Close / CTA
    'close.eyebrow': 'Let\'s start',
    'close.title': 'Your store deserves better.',
    'close.cta': 'Start with an audit',

    // Contact Section
    'contact.title': 'Let\'s talk.',
    'contact.description': 'Tell us what\'s going on with your store. We\'ll reply to set up a call, no strings attached.',
    'contact.form.title': 'TELL US ABOUT YOUR PROJECT',
    'contact.form.name': 'Your name',
    'contact.form.name.label': 'Name *',
    'contact.form.email': 'your@email.com',
    'contact.form.email.label': 'Email *',
    'contact.form.phone': 'Phone',
    'contact.form.company': 'Your store / brand',
    'contact.form.company.label': 'Company',
    'contact.form.message': 'Tell us about your project...',
    'contact.form.message.label': 'Message *',
    'contact.form.submit': 'Send message',
    'contact.form.sending': 'Sending...',
    'contact.form.success': 'Message sent successfully! We will contact you soon.',
    'contact.form.name.req': 'Tell us your name',
    'contact.form.name.ok': 'Great',
    'contact.form.email.req': 'We need your email',
    'contact.form.email.bad': 'That email doesn\'t look valid',
    'contact.form.email.ok': 'Valid email',
    'contact.form.company.ok': 'Got it',
    'contact.form.message.req': 'Tell us a bit about your store',
    'contact.form.message.short': 'A little more context, please',
    'contact.form.message.ok': 'Done',
    'contact.form.err': 'Check the highlighted fields.',
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
    'footer.company': 'SELLIFYWORKS',
    'footer.description': 'E-commerce agency specialized in Shopify. We create, optimize and grow online stores that convert.',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.cookies': 'Cookie Policy',
    
    // Footer Services
    'footer.services.title': 'SERVICES',
    'footer.services.migration': 'Shopify migration',
    'footer.services.customDev': 'Custom development',
    'footer.services.conversionAudit': 'Conversion audit',
    'footer.services.emailAutomation': 'Email marketing automation',

    // Services Section
    'services.eyebrow': 'Services',
    'services.title': 'Exactly what your store needs, nothing else.',
    'services.sub': "No generic bundles, no fine print. Every service solves a concrete problem; we talk and quote based on your store's real scope.",
    'services.migration.name': 'Shopify migration',
    'services.migration.tagline': 'For migrating without losing sales',
    'services.migration.bullet1': 'Full audit before moving anything',
    'services.migration.bullet2': 'Upload and copy for your whole catalog*',
    'services.migration.bullet3': 'Zero downtime',
    'services.customDev.name': 'Custom development',
    'services.customDev.tagline': 'For what doesn\'t fit any plan',
    'services.customDev.bullet1': 'Integrations with your tools',
    'services.customDev.bullet2': 'Custom automations',
    'services.customDev.bullet3': 'Fixed quote before we start',
    'services.conversionAudit.badge': 'Recommended to start',
    'services.conversionAudit.name': 'Conversion audit',
    'services.conversionAudit.tagline': 'Full site or a single page, your call',
    'services.conversionAudit.bullet1': 'Audit of your whole store or a single page',
    'services.conversionAudit.bullet2': 'Prioritized by sales impact',
    'services.conversionAudit.bullet3': 'Concrete next steps',
    'services.emailAutomation.name': 'Email marketing automation',
    'services.emailAutomation.tagline': 'For selling while you sleep',
    'services.emailAutomation.bullet1': 'Welcome flow and abandoned cart',
    'services.emailAutomation.bullet2': 'Post-purchase and review request',
    'services.emailAutomation.bullet3': 'Set up, tested, ready to go',
    'services.cta': 'Let\'s talk about your store',
    'services.requestQuote': 'Get a quote',
    'services.catalogNote': '*Includes up to 25 products/variants.',

    // Case Study Section
    'casestudy.badge': 'Real case',
    'casestudy.title': 'Clients who trusted us',
    'casestudy.subtitle': 'Two different ways of working together: fixing what you already had, or building something new from scratch.',
    'casestudy.card1.title': 'Can Ramos',
    'casestudy.card1.line': 'From a stuck Wix store to a Shopify that sells itself.',
    'casestudy.card1.result': 'Full migration with zero sales loss, an optimized checkout and an automatic welcome flow.',
    'casestudy.card2.title': 'Termolar',
    'casestudy.card2.line': 'New store launch, selling across Europe (except the UK).',
    'casestudy.card2.result': 'From zero to live in a month and a half.',
    'casestudy.challenge.title': 'The problem',
    'casestudy.challenge.description': 'Slow loading, confusing checkout, zero email marketing. Can Ramos already had customers — every visit that didn\'t convert was money left on the table.',
    'casestudy.solution.title': 'What we did',
    'casestudy.solution.description': 'Migrated to Shopify without losing a single sale or data point. A store with their real identity, checkout upsells, and a welcome flow that sells on its own.',
    'casestudy.results.title': 'The result',
    'casestudy.result1': 'Design with real identity: more trust, more conversions',
    'casestudy.result2': 'Welcome flow selling on autopilot, 24/7',
    'casestudy.result3': 'Higher average ticket with checkout upsells',
    'casestudy.result4': 'Faster loading, fewer checkout drop-offs',
    'casestudy.result5': 'Zero losses: products, customers and SEO intact',
    'casestudy.expertise.title': 'Why it worked',
    'casestudy.expertise.description': 'We audited what was slowing sales down, redesigned with conversion in mind, and automated what used to be manual.',
    'casestudy.expertise.tag1': 'Design with identity',
    'casestudy.expertise.tag2': 'Automated email',
    'casestudy.expertise.tag3': 'Higher average ticket',
    'casestudy.cta.title': 'Is your store limiting you?',
    'casestudy.cta.description': 'If you have traffic but feel you should be selling more, let\'s talk. We\'ll show you what\'s holding back your conversions.',
    'casestudy.cta.button': 'Get a free call',
    'casestudy.cta.viewcase': 'See real cases',
    
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
    'relatedServices.services.migration.title': 'Shopify migration',
    'relatedServices.services.migration.description': 'Migrate your store to Shopify without losing data or interrupting sales.',
    'relatedServices.services.customDev.title': 'Custom development',
    'relatedServices.services.customDev.description': 'Custom functionality, integrations and automations.',
    'relatedServices.services.conversionAudit.title': 'Conversion audit',
    'relatedServices.services.conversionAudit.description': 'Your whole site or a single page, with a plan prioritized by impact.',
    'relatedServices.services.emailAutomation.title': 'Email marketing automation',
    'relatedServices.services.emailAutomation.description': 'Automated flows that sell while you sleep.',

    // Blog
    'blog.title': 'SellifyWorks Blog',
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

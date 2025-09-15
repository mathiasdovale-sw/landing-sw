import { FAQ } from '@/interfaces/faq';

// FAQ específicos para servicios
export const servicesFAQs: FAQ[] = [
  {
    id: 'services-1',
    question: '¿Qué servicios de Shopify ofrecen?',
    answer: 'Ofrecemos desarrollo completo de tiendas Shopify, migración desde otras plataformas, optimización de conversiones, integración de aplicaciones, diseño UX/UI personalizado, y soporte técnico continuo.'
  },
  {
    id: 'services-2',
    question: '¿Trabajan con Shopify Plus?',
    answer: 'Sí, somos partner certificado de Shopify Plus. Trabajamos con empresas de gran volumen que necesitan funcionalidades avanzadas, automatizaciones complejas y soporte enterprise.'
  },
  {
    id: 'services-3',
    question: '¿Pueden integrar sistemas externos con Shopify?',
    answer: 'Por supuesto. Tenemos experiencia integrando ERPs, CRMs, sistemas de inventario, herramientas de marketing y otras aplicaciones de terceros con Shopify a través de APIs y webhooks.'
  }
];

// FAQ específicos para precios
export const pricingFAQs: FAQ[] = [
  {
    id: 'pricing-1',
    question: '¿Cómo calculan el precio de un proyecto?',
    answer: 'El precio se calcula basado en la complejidad del diseño, funcionalidades requeridas, integraciones necesarias y tiempo estimado de desarrollo. Ofrecemos presupuestos detallados sin compromiso.'
  },
  {
    id: 'pricing-2',
    question: '¿Ofrecen planes de pago flexibles?',
    answer: 'Sí, ofrecemos diferentes modalidades de pago adaptadas a tus necesidades: pago único, pagos por hitos del proyecto, o planes de financiamiento para proyectos grandes.'
  },
  {
    id: 'pricing-3',
    question: '¿Hay costos adicionales después del desarrollo?',
    answer: 'Los únicos costos adicionales serían las suscripciones de Shopify, aplicaciones de terceros que elijas usar, y opcionalmente nuestros servicios de mantenimiento y soporte continuo.'
  }
];

// FAQ específicos para soporte técnico
export const supportFAQs: FAQ[] = [
  {
    id: 'support-1',
    question: '¿Qué incluye el soporte técnico?',
    answer: 'Nuestro soporte incluye resolución de problemas técnicos, actualizaciones de seguridad, optimización de rendimiento, backup de datos, y asesoría para mejoras continuas.'
  },
  {
    id: 'support-2',
    question: '¿Cuál es el tiempo de respuesta del soporte?',
    answer: 'Para incidencias críticas respondemos en menos de 4 horas. Para consultas generales, nuestro tiempo de respuesta es de 24-48 horas en días laborables.'
  },
  {
    id: 'support-3',
    question: '¿El soporte está disponible los fines de semana?',
    answer: 'Para emergencias críticas que afecten el funcionamiento de la tienda, ofrecemos soporte de emergencia 24/7. Para consultas regulares, nuestro horario es de lunes a viernes.'
  }
];
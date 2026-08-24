import { Metadata } from 'next'
import AuditAdsLanding from '@/app/_components/audit-ads-landing'

export const metadata: Metadata = {
  title: 'Auditoría de conversión — 450€ + IVA | SellifyWorks',
  description: 'Auditoría de conversión para tiendas Shopify: te decimos qué está frenando tus ventas. Salís con un roadmap priorizado, no con un informe teórico.',
  robots: { index: false, follow: false },
}

export default function AuditoriaAdsPage() {
  return (
    <AuditAdsLanding
      content={{
        locale: 'es',
        contactHref: '/es/contacto',
        privacyHref: '/es/politica-de-privacidad',
        cookiesHref: '/es/politica-de-cookies',
        wordmark: 'SELLIFYWORKS',
        hero: {
          h1: 'Tenés tráfico. No sabés por qué no convierte.',
          subhead: 'Auditoría de conversión para tiendas Shopify. Te decimos qué está frenando tus ventas y en qué orden atacarlo. Salís con un roadmap priorizado, no con un informe teórico.',
          ctaLabel: 'Quiero mi auditoría — 450€ + IVA',
        },
        recognition: {
          question: '¿Tenés cientos o miles de sesiones al mes y las ventas no llegan? ¿Ya probaste cambiar diseño, publicidad o copy, y no sabés si el problema es tu tienda, tu producto o tu tráfico?',
          closing: 'Eso es exactamente lo que resolvemos antes de tocar nada.',
        },
        caseStudy: {
          company: 'Can Ramos (productos alimenticios)',
          stats: [
            { value: '35', label: 'hallazgos concretos identificados en la auditoría' },
            { value: '2 semanas', label: 'para entregar el roadmap priorizado' },
            { value: 'x2', label: 'en tasa de conversión tras implementar las mejoras' },
          ],
          note: '(Sin promesas — esto es lo que encontramos y lo que pasó cuando se ejecutó.)',
        },
        includes: {
          eyebrow: 'Transparencia total',
          title: 'Qué incluye',
          items: [
            { title: 'Auditoría completa de tu tienda', description: 'De tu tienda completa o de una página puntual, a definir antes de cotizar.' },
            { title: 'Sin jerga, sin relleno', description: 'Un documento que podés leer y entender en una sola sentada.' },
            { title: 'Roadmap priorizado', description: 'Qué arreglar primero, con tiempo y costo estimado.' },
          ],
          priceLine: '450€ + IVA — sin sorpresas después',
          ctaLabel: 'Quiero mi auditoría',
        },
        noGuarantee: {
          title: 'Por qué no garantizamos resultados',
          body: 'Nadie puede prometerte una tasa de conversión exacta — quien lo hace, no está siendo honesto. Lo que sí te mostramos es el método, con casos reales como el de Can Ramos.',
        },
        finalCta: {
          title: 'No sabés qué mirar primero. Nosotros sí.',
          ctaLabel: 'Pedir mi auditoría — 450€ + IVA',
        },
        legal: {
          company: 'SellifyWorks',
          rights: 'Todos los derechos reservados.',
          privacy: 'Privacidad',
          cookies: 'Cookies',
        },
      }}
    />
  )
}

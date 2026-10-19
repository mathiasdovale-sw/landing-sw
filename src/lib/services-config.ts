// Fuente única de slugs para los 5 servicios. El copy (nombre,
// descripción, FAQ) vive en LanguageContext.tsx y lib/faqs.ts, indexado por `key`.
// Precio público solo en la auditoría (140€ + IVA); el resto se cotiza a medida.

export interface ServiceConfig {
  key: string
  slugEs: string
  slugEn: string
}

export const SERVICES: ServiceConfig[] = [
  { key: 'conversionAudit', slugEs: 'auditoria-conversion', slugEn: 'conversion-audit' },
  { key: 'monthly', slugEs: 'mejora-continua', slugEn: 'continuous-improvement' },
  { key: 'migration', slugEs: 'migracion-shopify', slugEn: 'shopify-migration' },
  { key: 'customDev', slugEs: 'desarrollos-a-medida', slugEn: 'custom-shopify-development' },
  { key: 'emailAutomation', slugEs: 'email-marketing-automation', slugEn: 'email-marketing-automation' },
]

export function getService(key: string): ServiceConfig {
  const service = SERVICES.find(s => s.key === key)
  if (!service) throw new Error(`Unknown service key: ${key}`)
  return service
}

export function getServicePath(key: string, locale: 'es' | 'en'): string {
  const service = getService(key)
  const slug = locale === 'es' ? service.slugEs : service.slugEn
  return locale === 'es' ? `/es/${slug}` : `/en/${slug}`
}

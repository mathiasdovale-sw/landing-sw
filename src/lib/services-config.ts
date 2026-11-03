// Fuente única de slugs de los servicios. El copy (nombre,
// descripción, FAQ) vive en LanguageContext.tsx y lib/faqs.ts, indexado por `key`.
// Precio público: solo la mejora continua (290 € + IVA/mes). El resto, presupuesto cerrado.

export interface ServiceConfig {
  key: string
  slugEs: string
  slugEn: string
}

export const SERVICES: ServiceConfig[] = [
  { key: 'newStore', slugEs: 'tienda-nueva', slugEn: 'new-shopify-store' },
  { key: 'migration', slugEs: 'migracion-shopify', slugEn: 'shopify-migration' },
  { key: 'customDev', slugEs: 'desarrollos-a-medida', slugEn: 'custom-shopify-development' },
  { key: 'monthly', slugEs: 'mejora-continua', slugEn: 'continuous-improvement' },
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

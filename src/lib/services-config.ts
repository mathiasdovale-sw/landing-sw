// Fuente única de slugs/precios para los 9 servicios. El copy (nombre,
// descripción, FAQ) vive en LanguageContext.tsx y lib/faqs.ts, indexado por `key`.

export type ServiceGroupKey = 'foundation' | 'conversion' | 'recurring'

export interface ServicePrice {
  amount: number | null // null = "a medida" / custom quote
  unitEs?: string // ej. "página", "flujo", "mes"
  unitEn?: string // ej. "page", "flow", "month"
}

export interface ServiceConfig {
  key: string
  group: ServiceGroupKey
  slugEs: string
  slugEn: string
  price: ServicePrice
}

export const SERVICES: ServiceConfig[] = [
  { key: 'migration', group: 'foundation', slugEs: 'migracion-shopify', slugEn: 'shopify-migration', price: { amount: 2640 } },
  { key: 'migrationPlus', group: 'foundation', slugEs: 'migracion-plus', slugEn: 'shopify-migration-plus', price: { amount: 3120 } },
  { key: 'customDev', group: 'foundation', slugEs: 'desarrollos-a-medida', slugEn: 'custom-shopify-development', price: { amount: null } },
  { key: 'conversionResearch', group: 'conversion', slugEs: 'conversion-research', slugEn: 'conversion-research', price: { amount: 649 } },
  { key: 'conversionAudit', group: 'conversion', slugEs: 'auditoria-conversion', slugEn: 'conversion-audit', price: { amount: 480 } },
  { key: 'landingPages', group: 'conversion', slugEs: 'optimizacion-landing-pages', slugEn: 'landing-page-optimization', price: { amount: 339, unitEs: 'página', unitEn: 'page' } },
  { key: 'emailAutomation', group: 'recurring', slugEs: 'email-marketing-automation', slugEn: 'email-marketing-automation', price: { amount: 149, unitEs: 'flujo', unitEn: 'flow' } },
  { key: 'emailCampaigns', group: 'recurring', slugEs: 'campanas-email-marketing', slugEn: 'email-marketing-campaigns', price: { amount: 250, unitEs: 'mes · 8 emails', unitEn: 'month · 8 emails' } },
  { key: 'maintenance', group: 'recurring', slugEs: 'mantenimiento-shopify', slugEn: 'shopify-maintenance', price: { amount: 189, unitEs: 'mes', unitEn: 'month' } },
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

export function getServicesByGroup(group: ServiceGroupKey): ServiceConfig[] {
  return SERVICES.filter(s => s.group === group)
}

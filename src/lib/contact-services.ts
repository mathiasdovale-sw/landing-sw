// Opciones del selector "¿Qué necesitas?" del formulario de contacto.
// Para preseleccionar "¿Qué necesitas?" desde un botón: `?servicio=<value>#contacto` (otra página)
// o `data-service="<value>"` en un enlace a #contacto (misma página).
// Los valores antiguos (newStore, migration, customDev, monthly) siguen funcionando: se traducen con LEGACY_SERVICES.

export type ServiceOption = "ads" | "web" | "dev" | "measurement" | "design" | "unsure"

export const SERVICE_OPTIONS: { value: ServiceOption; label: { es: string; en: string } }[] = [
  { value: "ads", label: { es: "Anuncios", en: "Ads" } },
  { value: "web", label: { es: "Web o tienda", en: "Website or store" } },
  { value: "dev", label: { es: "Desarrollo o automatización", en: "Development or automation" } },
  { value: "measurement", label: { es: "Medición", en: "Measurement" } },
  { value: "design", label: { es: "Diseño o contenido", en: "Design or content" } },
  { value: "unsure", label: { es: "No lo tengo claro", en: "I'm not sure yet" } },
]

const LEGACY_SERVICES: Record<string, ServiceOption> = {
  newStore: "web",
  migration: "web",
  customDev: "dev",
  monthly: "unsure",
  other: "unsure",
}

/** Devuelve la opción válida para un valor (incluidos los antiguos) o null. */
export function toServiceOption(value: unknown): ServiceOption | null {
  if (typeof value !== "string") return null
  if (SERVICE_OPTIONS.some((o) => o.value === value)) return value as ServiceOption
  return LEGACY_SERVICES[value] ?? null
}

export function isServiceOption(value: unknown): value is ServiceOption {
  return SERVICE_OPTIONS.some((o) => o.value === value)
}

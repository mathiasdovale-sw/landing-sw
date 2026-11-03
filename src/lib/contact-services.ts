// Opciones del selector "¿Qué necesitas?" del formulario de contacto.
// Para preseleccionar una desde un botón: `?servicio=<value>#contacto` (otra página)
// o `data-service="<value>"` en un enlace a #contacto (misma página).

export type ServiceOption = "newStore" | "migration" | "customDev" | "other"

export const SERVICE_OPTIONS: { value: ServiceOption; label: { es: string; en: string } }[] = [
  { value: "newStore", label: { es: "Tienda nueva", en: "New store" } },
  { value: "migration", label: { es: "Migración a Shopify", en: "Migration to Shopify" } },
  { value: "customDev", label: { es: "Desarrollo a medida", en: "Custom development" } },
  { value: "other", label: { es: "Otra cosa", en: "Something else" } },
]

export function isServiceOption(value: unknown): value is ServiceOption {
  return SERVICE_OPTIONS.some((o) => o.value === value)
}

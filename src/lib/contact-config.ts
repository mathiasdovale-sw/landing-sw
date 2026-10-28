// Datos de contacto directos.
// WhatsApp: número en formato internacional, solo dígitos (ej. "34600111222").
// Mientras esté vacío, el botón de WhatsApp no se muestra.
export const WHATSAPP_NUMBER = ""

export const WHATSAPP_MESSAGE = "Hola Mathias, te escribo desde la web por mi tienda."

export function whatsappHref(): string | null {
  if (!WHATSAPP_NUMBER) return null
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
}

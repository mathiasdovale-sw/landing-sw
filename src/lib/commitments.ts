// Datos de SellifyWorks que se repiten en varias páginas.
// Si un valor se deja vacío ("" o null), los textos que dependen de él se ocultan
// o pasan a una versión sin ese dato. No hace falta tocar nada más.

type Locale = "es" | "en"

/** Días en los que arreglo sin coste fallos de mi trabajo tras la entrega. */
export const SUPPORT_DAYS: number | null = 45

/** Años desarrollando software. */
export const YEARS_EXPERIENCE: number | null = 7

/** Plazo en el que respondo a un contacto. */
export const REPLY_TIME: Record<Locale, string> = {
  es: "24 horas laborables",
  en: "24 working hours",
}

/** Forma de pago. */
export const PAYMENT_TERMS: Record<Locale, string> = {
  es: "50% al empezar y 50% en la entrega",
  en: "50% upfront and 50% on delivery",
}

/** ¿Ofrezco una muestra de la tienda en Shopify antes de decidir? (no: hay dos revisiones de diseño). */
export const OFFER_SAMPLE = false

export const COMMITMENTS: Record<Locale, string[]> = {
  es: [
    "Precio cerrado antes de empezar",
    "Fecha de entrega por escrito",
    "Sin dejar de vender durante la migración",
    ...(SUPPORT_DAYS ? [`Si algo falla por mi trabajo, lo arreglo sin coste durante ${SUPPORT_DAYS} días`] : []),
  ],
  en: [
    "Fixed price before we start",
    "Delivery date in writing",
    "No lost sales during the migration",
    ...(SUPPORT_DAYS ? [`If something breaks because of my work, I fix it free of charge for ${SUPPORT_DAYS} days`] : []),
  ],
}

/** Paso 5 de "Cómo trabajo". */
export const AFTER_DELIVERY_STEP: Record<Locale, string> = {
  es: SUPPORT_DAYS
    ? `Si algo falla por mi trabajo, lo arreglo sin coste durante ${SUPPORT_DAYS} días.`
    : "Si algo falla por mi trabajo, lo arreglo.",
  en: SUPPORT_DAYS
    ? `If something breaks because of my work, I fix it free of charge for ${SUPPORT_DAYS} days.`
    : "If something breaks because of my work, I fix it.",
}

/** Respuesta a "¿Y después de entregar?" (home y tienda nueva). */
export const AFTER_DELIVERY_ANSWER: Record<Locale, string> = {
  es: SUPPORT_DAYS
    ? `Durante ${SUPPORT_DAYS} días arreglo sin coste cualquier fallo de mi trabajo. Si después quieres seguir mejorando la tienda cada mes, tengo la mejora continua.`
    : "Si algo falla por mi trabajo, lo arreglo. Si después quieres seguir mejorando la tienda cada mes, tengo la mejora continua.",
  en: SUPPORT_DAYS
    ? `For ${SUPPORT_DAYS} days I fix any fault in my work free of charge. If you then want to keep improving the store every month, I offer continuous improvement.`
    : "If something breaks because of my work, I fix it. If you then want to keep improving the store every month, I offer continuous improvement.",
}

/** Primer paso de "Qué pasa después" junto al formulario. */
export const REPLY_STEP: Record<Locale, string> = {
  es: REPLY_TIME.es ? `Te respondo yo en ${REPLY_TIME.es}.` : "Te respondo yo personalmente.",
  en: REPLY_TIME.en ? `I reply myself within ${REPLY_TIME.en}.` : "I reply to you personally.",
}

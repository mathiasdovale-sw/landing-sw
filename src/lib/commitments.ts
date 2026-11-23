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

/** Forma de pago de los proyectos. */
export const PAYMENT_TERMS: Record<Locale, string> = {
  es: "50% al empezar y 50% en la entrega",
  en: "50% upfront and 50% on delivery",
}

/** Forma de pago de los servicios mensuales. */
export const MONTHLY_PAYMENT_TERMS: Record<Locale, string> = {
  es: "por adelantado al inicio de cada mes",
  en: "in advance at the start of each month",
}

/** Llamada principal de toda la web. */
export const MAIN_CTA: Record<Locale, string> = {
  es: "Pide presupuesto sin compromiso",
  en: "Ask for a no-obligation quote",
}

/** ¿Ofrezco una muestra de la tienda en Shopify antes de decidir? (no: hay dos revisiones de diseño). */
export const OFFER_SAMPLE = false

/** Compromisos de la home (y de las páginas de solución). */
export const COMMITMENTS: Record<Locale, { title: string; text: string }[]> = {
  es: [
    { title: "Propuesta a medida.", text: "Precio y alcance por escrito antes de empezar." },
    { title: "Sin permanencia.", text: "Los servicios mensuales se cancelan cuando quieras." },
    { title: "Un único responsable.", text: "Hablas siempre conmigo." },
    ...(SUPPORT_DAYS
      ? [{ title: `${SUPPORT_DAYS} días de garantía.`, text: "Si algo que construyo falla por mi trabajo, lo arreglo gratis." }]
      : []),
  ],
  en: [
    { title: "Tailored proposal.", text: "Price and scope in writing before we start." },
    { title: "No lock-in.", text: "Monthly services can be cancelled whenever you want." },
    { title: "One person accountable.", text: "You always talk to me." },
    ...(SUPPORT_DAYS
      ? [{ title: `${SUPPORT_DAYS}-day guarantee.`, text: "If something I build breaks because of my work, I fix it for free." }]
      : []),
  ],
}

/** Respuesta a "¿Y después de entregar?" (home y tienda nueva). */
export const AFTER_DELIVERY_ANSWER: Record<Locale, string> = {
  es: SUPPORT_DAYS
    ? `Durante ${SUPPORT_DAYS} días arreglo sin coste cualquier fallo de mi trabajo. Después, puedo llevar tus anuncios y seguir mejorando la tienda cada mes con el acompañamiento mensual.`
    : "Si algo falla por mi trabajo, lo arreglo. Después, puedo llevar tus anuncios y seguir mejorando la tienda cada mes con el acompañamiento mensual.",
  en: SUPPORT_DAYS
    ? `For ${SUPPORT_DAYS} days I fix any fault in my work free of charge. After that, I can run your ads and keep improving the store every month with monthly support.`
    : "If something breaks because of my work, I fix it. After that, I can run your ads and keep improving the store every month with monthly support.",
}

/** Primer paso de "Qué pasa después" junto al formulario. */
export const REPLY_STEP: Record<Locale, string> = {
  es: REPLY_TIME.es ? `Te respondo yo en ${REPLY_TIME.es}.` : "Te respondo yo personalmente.",
  en: REPLY_TIME.en ? `I reply myself within ${REPLY_TIME.en}.` : "I reply to you personally.",
}

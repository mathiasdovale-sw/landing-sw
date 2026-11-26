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
    { title: "Un único responsable.", text: "Nos encargamos de todo tu proyecto, sin pasarte de un proveedor a otro." },
    { title: "Todo a tu nombre.", text: "Cuentas, tienda, dominio y código son tuyos desde el primer día." },
  ],
  en: [
    { title: "Tailored proposal.", text: "Price and scope in writing before we start." },
    { title: "No lock-in.", text: "Monthly services can be cancelled whenever you want." },
    { title: "One accountable partner.", text: "We take care of your whole project, with no passing you between suppliers." },
    { title: "Everything in your name.", text: "Accounts, store, domain and code are yours from day one." },
  ],
}

/** Respuesta a "¿Y después de entregar?" (home y tienda nueva). */
export const AFTER_DELIVERY_ANSWER: Record<Locale, string> = {
  es: SUPPORT_DAYS
    ? `Durante ${SUPPORT_DAYS} días arreglamos sin coste cualquier fallo de nuestro trabajo. Después, podemos llevar tus anuncios y seguir mejorando la tienda cada mes con el acompañamiento mensual.`
    : "Si algo falla por nuestro trabajo, lo arreglamos. Después, podemos llevar tus anuncios y seguir mejorando la tienda cada mes con el acompañamiento mensual.",
  en: SUPPORT_DAYS
    ? `For ${SUPPORT_DAYS} days we fix any fault in our work free of charge. After that, we can run your ads and keep improving the store every month with monthly support.`
    : "If something breaks because of our work, we fix it. After that, we can run your ads and keep improving the store every month with monthly support.",
}

/** Primer paso de "Qué pasa después" junto al formulario. */
export const REPLY_STEP: Record<Locale, string> = {
  es: REPLY_TIME.es ? `Te respondemos en ${REPLY_TIME.es}.` : "Te respondemos personalmente.",
  en: REPLY_TIME.en ? `We reply within ${REPLY_TIME.en}.` : "We reply to you personally.",
}

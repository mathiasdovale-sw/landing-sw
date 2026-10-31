// Plan de acción del planificador de campañas: tareas, fases y filtros.
// Cada tarea lleva etiquetas de plantilla, canal, país y opción; solo se muestran
// las que aplican. ★ (star) = imprescindible: si no da tiempo, solo se ven estas.
import type { CurrencyCode } from "./calc"
import { addDays, ddmm, type Country, type TemplateId } from "./campaign-dates"

export type Channel = "ads" | "email" | "sms" | "social" | "influencers"
export const CHANNELS: { value: Channel; label: string }[] = [
  { value: "ads", label: "Anuncios" },
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS" },
  { value: "social", label: "Redes sociales" },
  { value: "influencers", label: "Influencers" },
]

export type Phase = "month" | "twoWeeks" | "week" | "day" | "after"

export interface TaskCtx {
  template: TemplateId
  country: Country
  currency: CurrencyCode
  channels: Channel[]
  earlyAccess: boolean
  start: Date
  end: Date
  days: number
  dateId: string | null
  plannedOrders: number | null
  giftOrders: number | null
  minOrders: number | null
}

export interface TaskDef {
  id: string
  phase: Phase
  star?: boolean
  group: string
  text: string | ((c: TaskCtx) => string)
  templates: TemplateId[]
  /** Se muestra si se eligió alguno de estos canales. */
  channels?: Channel[]
  /** Solo con la opción «lista de acceso anticipado». */
  earlyAccess?: boolean
  when?: (c: TaskCtx) => boolean
  /** Enlace a otra plantilla («Calcula antes si te compensa»). */
  link?: TemplateId
}

const n = (v: number | null) => (v === null ? "—" : new Intl.NumberFormat("es-ES", { maximumFractionDigits: 0 }).format(Math.ceil(v)))
const giftSeason = (c: TaskCtx) => {
  // La campaña cae (en parte) entre el 1 nov y el 31 dic
  const y = c.start.getFullYear()
  const from = new Date(y, 10, 1)
  const to = new Date(y, 11, 31)
  return c.end >= from && c.start <= to
}

const A: TemplateId[] = ["discount"]

export const TASKS: TaskDef[] = [
  // ---------------- A. Fecha de descuentos ----------------
  // Estrategia y oferta
  { id: "a-oferta", phase: "month", star: true, group: "Estrategia y oferta", templates: A, text: "Decide a quién va dirigida la campaña y qué le ofreces (descuento, 3×2, regalo…)." },
  { id: "a-mensaje", phase: "month", group: "Estrategia y oferta", templates: A, when: (c) => c.channels.length > 1, text: "Usa el mismo mensaje y las mismas fechas en la tienda, las redes, los anuncios y el email." },
  {
    id: "a-devoluciones", phase: "month", group: "Estrategia y oferta", templates: A, when: giftSeason,
    text: (c) => `Amplía el plazo de cambios y devoluciones para compras de regalo: ${c.country === "AR" ? "hasta mediados de enero" : "hasta 14 días después de Reyes"}.`,
  },
  // Stock y operaciones
  { id: "a-stock", phase: "month", star: true, group: "Stock y operaciones", templates: A, text: (c) => `Asegura stock para unos ${n(c.plannedOrders)} pedidos, con margen por si va mejor de lo previsto.` },
  { id: "a-proveedores", phase: "month", group: "Stock y operaciones", templates: A, text: "Confirma con tus proveedores que pueden reponer durante la campaña." },
  { id: "a-transporte", phase: "month", star: true, group: "Stock y operaciones", templates: A, text: (c) => `Confirma con tu transportista o almacén que pueden con unos ${n(c.plannedOrders)} pedidos en ${c.days} ${c.days === 1 ? "día" : "días"}.` },
  { id: "a-material", phase: "twoWeeks", group: "Stock y operaciones", templates: A, text: "Revisa que tienes material de envío suficiente (y envoltorio o tarjetas si das regalo)." },
  { id: "a-pasarela", phase: "twoWeeks", star: true, group: "Stock y operaciones", templates: A, text: "Comprueba que tu pasarela de pago y PayPal no tienen límites activos que puedan bloquear cobros." },
  { id: "a-dudas", phase: "week", group: "Stock y operaciones", templates: A, text: "Ten preparadas las respuestas a las dudas habituales: precios, envíos, cambios, devoluciones y financiación." },
  // Anuncios
  { id: "a-creatividades", phase: "month", star: true, group: "Anuncios", templates: A, channels: ["ads"], text: "Prepara las creatividades: para gente nueva y para quien ya visitó tu tienda (retargeting)." },
  { id: "a-tarjetas", phase: "month", group: "Anuncios", templates: A, channels: ["ads"], text: "Ten más de una tarjeta de pago verificada en tus cuentas de anuncios: si una falla, las campañas se paran." },
  { id: "a-aprobados", phase: "twoWeeks", star: true, group: "Anuncios", templates: A, channels: ["ads"], text: (c) => `Sube los anuncios y déjalos aprobados antes del ${ddmm(addDays(c.start, -14))}.` },
  { id: "a-siguen-aprobados", phase: "week", star: true, group: "Anuncios", templates: A, channels: ["ads"], text: (c) => `Comprueba que siguen aprobados el ${ddmm(addDays(c.start, -3))}.` },
  { id: "a-programar-anuncios", phase: "twoWeeks", group: "Anuncios", templates: A, channels: ["ads"], text: (c) => `Programa los anuncios para que arranquen el ${ddmm(c.start)}.` },
  // Acceso anticipado
  { id: "a-acceso-pagina", phase: "month", group: "Acceso anticipado", templates: A, earlyAccess: true, text: "Crea y prueba la página de acceso anticipado (con contraseña) y haz que sea fácil de encontrar." },
  { id: "a-acceso-formulario", phase: "month", group: "Acceso anticipado", templates: A, earlyAccess: true, text: "Activa un formulario o pop-up para que la gente se apunte a la lista." },
  { id: "a-acceso-anuncio", phase: "month", group: "Acceso anticipado", templates: A, earlyAccess: true, channels: ["ads"], text: "Prepara un anuncio para captar apuntados a la lista." },
  { id: "a-acceso-emails", phase: "twoWeeks", group: "Acceso anticipado", templates: A, earlyAccess: true, text: "Monta los emails automáticos de bienvenida a la lista." },
  { id: "a-acceso-tarjeta", phase: "month", group: "Acceso anticipado", templates: A, earlyAccess: true, text: "Incluye una tarjeta con la contraseña de acceso en los pedidos de las semanas previas." },
  // Redes e influencers
  { id: "a-redes-contenido", phase: "month", group: "Redes e influencers", templates: A, channels: ["social"], text: "Prepara el contenido para redes de las semanas de campaña." },
  { id: "a-influencers", phase: "month", group: "Redes e influencers", templates: A, channels: ["influencers"], text: "Elige influencers o microinfluencers y envíales el producto con tiempo para que publiquen durante la campaña." },
  { id: "a-historias", phase: "twoWeeks", group: "Redes e influencers", templates: A, channels: ["social"], text: "Prepara historias para publicar a menudo durante la campaña: preparación de pedidos, guías de regalo, contenido de clientes." },
  { id: "a-sorteo", phase: "twoWeeks", group: "Redes e influencers", templates: A, channels: ["social"], text: "Opcional: organiza un sorteo entre clientes que compartan su experiencia." },
  // Tienda online
  { id: "a-barra", phase: "twoWeeks", star: true, group: "Tienda online", templates: A, text: "Pon una barra de anuncios con la oferta, el envío gratis (si lo hay), el plazo de entrega y los cambios." },
  { id: "a-coleccion", phase: "twoWeeks", group: "Tienda online", templates: A, text: "Crea una página o colección de la campaña. En fechas de regalo, una guía de regalos." },
  { id: "a-umbral", phase: "twoWeeks", group: "Tienda online", templates: A, link: "freeShipping", text: "¿Vas a subir el umbral de envío gratis? Calcula antes si te compensa." },
  { id: "a-regalo", phase: "twoWeeks", group: "Tienda online", templates: A, link: "gift", text: "¿Vas a dar un regalo por compra? Calcula hasta cuánto puede costar." },
  { id: "a-chat", phase: "twoWeeks", group: "Tienda online", templates: A, text: "Si tienes chat, añade respuestas a las dudas de la campaña." },
  { id: "a-envios", phase: "twoWeeks", group: "Tienda online", templates: A, text: "Deja claras las opciones de envío y sus plazos." },
  { id: "a-precios", phase: "week", star: true, group: "Tienda online", templates: A, text: "Programa el cambio de precios para la hora de inicio, sin cerrar la tienda." },
  {
    id: "a-tachado", phase: "week", star: true, group: "Tienda online", templates: A, when: (c) => c.currency === "EUR",
    text: "Revisa que el precio tachado sea el más bajo que has aplicado en los últimos 30 días. Es obligatorio en España.",
  },
  { id: "a-prueba", phase: "week", star: true, group: "Tienda online", templates: A, text: "Haz un pedido de prueba de principio a fin y comprueba que tu tienda aguanta un pico de visitas." },
  // Email y SMS
  { id: "a-emails", phase: "twoWeeks", star: true, group: "Email y SMS", templates: A, channels: ["email"], text: "Prepara y programa todos los emails de la campaña." },
  { id: "a-remitente", phase: "twoWeeks", group: "Email y SMS", templates: A, channels: ["email"], text: "Envía desde un email con tu dominio y con el nombre de una persona como remitente: llegan mejor a la bandeja de entrada." },
  { id: "a-confirmacion", phase: "twoWeeks", group: "Email y SMS", templates: A, channels: ["email"], text: "Decide si tu formulario pide confirmar el email. Sin confirmación entra más gente, pero la lista es de peor calidad." },
  { id: "a-sms", phase: "twoWeeks", star: true, group: "Email y SMS", templates: A, channels: ["sms"], text: "Comprueba que tienes saldo y programa los SMS." },
  { id: "a-exclusiva", phase: "week", group: "Email y SMS", templates: A, channels: ["email", "sms"], text: "Programa una oferta exclusiva para tu lista unos días antes (envío gratis, regalo…)." },
  { id: "a-email-util", phase: "day", group: "Email y SMS", templates: A, channels: ["email"], text: "Además de vender, envía algún email útil: guía de regalos, ideas de uso." },
  // Participación oficial
  {
    id: "a-cace", phase: "month", group: "Participación oficial", templates: A,
    when: (c) => c.currency === "ARS" && (c.dateId === "ar-hot-sale" || c.dateId === "ar-cybermonday"),
    text: "Si quieres usar el nombre y el logo oficiales de Hot Sale o CyberMonday, hazte socio de la CACE y contrata tu participación.",
  },
  {
    id: "a-buen-fin", phase: "month", group: "Participación oficial", templates: A,
    when: (c) => c.currency === "MXN" && c.dateId === "mx-buen-fin",
    text: "Si quieres participar oficialmente en El Buen Fin, registra tu negocio: es gratuito y necesitas RFC.",
  },
  // Después
  { id: "a-comparar", phase: "after", star: true, group: "Después", templates: A, text: "Compara los resultados reales con este plan: vuelve a la calculadora con tus datos de esos días." },
  { id: "a-recuperar", phase: "after", group: "Después", templates: A, text: "Escribe a quien visitó tu tienda y no compró (email o retargeting)." },
  { id: "a-cambios", phase: "after", group: "Después", templates: A, text: "Atiende los cambios y devoluciones con el plazo que anunciaste." },

  // ---------------- B. Captación con anuncios ----------------
  { id: "b-creatividades", phase: "twoWeeks", star: true, group: "Anuncios", templates: ["ads"], text: "Prepara las creatividades." },
  { id: "b-tarjetas", phase: "twoWeeks", group: "Anuncios", templates: ["ads"], text: "Ten más de una tarjeta de pago verificada en tus cuentas de anuncios." },
  { id: "b-aprobados", phase: "week", star: true, group: "Anuncios", templates: ["ads"], text: (c) => `Deja los anuncios aprobados antes del ${ddmm(addDays(c.start, -3))}.` },
  { id: "b-prueba", phase: "week", star: true, group: "Tienda online", templates: ["ads"], text: "Haz un pedido de prueba de principio a fin." },
  { id: "b-mitad", phase: "day", star: true, group: "Durante la campaña", templates: ["ads"], text: "Revisa los resultados a mitad de campaña y para lo que no funcione." },
  { id: "b-comparar", phase: "after", group: "Después", templates: ["ads"], text: "Compara los resultados con este plan." },

  // ---------------- C. Envío gratis desde X ----------------
  { id: "c-umbral", phase: "week", star: true, group: "Tienda online", templates: ["freeShipping"], text: "Configura el umbral de envío gratis en tu tienda." },
  { id: "c-anuncio", phase: "week", star: true, group: "Tienda online", templates: ["freeShipping"], text: "Anúncialo en la barra superior y en la ficha de producto." },
  { id: "c-sugerencias", phase: "twoWeeks", group: "Tienda online", templates: ["freeShipping"], text: "Sugiere productos en el carrito para llegar al umbral." },
  { id: "c-comparar", phase: "after", star: true, group: "Después", templates: ["freeShipping"], text: "Compara el ticket medio antes y después." },

  // ---------------- D. Regalo o pack ----------------
  { id: "d-stock", phase: "month", star: true, group: "Stock y operaciones", templates: ["gift"], text: (c) => `Asegura stock del regalo para unos ${n(c.giftOrders)} pedidos.` },
  { id: "d-regla", phase: "week", star: true, group: "Tienda online", templates: ["gift"], text: "Configura la regla o el pack en tu tienda." },
  { id: "d-anuncio", phase: "week", star: true, group: "Tienda online", templates: ["gift"], text: "Anúncialo en la barra superior." },
  { id: "d-envoltorio", phase: "twoWeeks", group: "Stock y operaciones", templates: ["gift"], text: "Revisa que tienes material de envoltorio." },
  { id: "d-comparar", phase: "after", group: "Después", templates: ["gift"], text: "Compara los resultados con este plan." },

  // ---------------- E. Email a mis clientes ----------------
  { id: "e-segmento", phase: "twoWeeks", group: "Email", templates: ["email"], text: "Elige a quién escribes (todos, quien no compra desde hace tiempo…)." },
  { id: "e-redactar", phase: "week", star: true, group: "Email", templates: ["email"], text: "Redacta el email con un solo mensaje claro." },
  { id: "e-remitente", phase: "twoWeeks", group: "Email", templates: ["email"], text: "Envía desde un email con tu dominio y con el nombre de una persona como remitente." },
  { id: "e-programar", phase: "week", star: true, group: "Email", templates: ["email"], text: "Programa el envío y un recordatorio." },
  { id: "e-medir", phase: "after", star: true, group: "Después", templates: ["email"], text: "Mide los pedidos que trae." },

  // ---------------- F. Influencer o colaboración ----------------
  { id: "f-perfil", phase: "month", group: "Influencer", templates: ["influencer"], text: "Elige el perfil según tu cliente." },
  { id: "f-acuerdo", phase: "month", star: true, group: "Influencer", templates: ["influencer"], text: "Cierra el acuerdo por escrito (pago, comisión, fechas, contenido)." },
  { id: "f-codigo", phase: "twoWeeks", star: true, group: "Influencer", templates: ["influencer"], text: "Crea un código de descuento propio para medir sus ventas." },
  { id: "f-producto", phase: "twoWeeks", star: true, group: "Influencer", templates: ["influencer"], text: "Envía el producto con tiempo." },
  { id: "f-revisar", phase: "after", star: true, group: "Después", templates: ["influencer"], text: (c) => `Revisa las ventas del código frente a los ${n(c.minOrders)} pedidos necesarios.` },
]

/** Tareas que aplican a esta campaña (plantilla, canales, país y opciones). */
export function tasksFor(c: TaskCtx): TaskDef[] {
  return TASKS.filter(
    (t) =>
      t.templates.includes(c.template) &&
      (!t.channels || t.channels.some((ch) => c.channels.includes(ch))) &&
      (!t.earlyAccess || c.earlyAccess) &&
      (!t.when || t.when(c)),
  )
}

export const taskText = (t: TaskDef, c: TaskCtx) => (typeof t.text === "function" ? t.text(c) : t.text)

export interface PhaseInfo {
  phase: Phase | "now"
  label: string
  /** Último día para hacerlo (para saber si ya ha vencido). */
  deadline: Date
}

/** Fases con fecha real, calculadas desde el inicio de la campaña. */
export function phasesFor(start: Date, end: Date): PhaseInfo[] {
  return [
    { phase: "month", label: `1 mes antes (hasta el ${ddmm(addDays(start, -15))})`, deadline: addDays(start, -15) },
    { phase: "twoWeeks", label: `2 semanas antes (hasta el ${ddmm(addDays(start, -8))})`, deadline: addDays(start, -8) },
    { phase: "week", label: `1 semana antes (hasta el ${ddmm(addDays(start, -1))})`, deadline: addDays(start, -1) },
    { phase: "day", label: `El día ${ddmm(start)}`, deadline: end },
    { phase: "after", label: `Después (desde el ${ddmm(addDays(end, 1))})`, deadline: addDays(end, 60) },
  ]
}

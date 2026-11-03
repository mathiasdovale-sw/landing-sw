// Casos de clientes. Solo datos aprobados: no añadas cifras ni testimonios inventados.
// `testimonial` en null = no se muestra. Para añadirlo: { quote, name, role } en cada idioma
// y activa SHOW_TESTIMONIALS en _components/testimonial.tsx.
// `image` es una captura vertical (móvil) de la home de la tienda; si falta, se ve un marco vacío.

type Locale = "es" | "en"

export interface Testimonial {
  quote: string
  name: string
  role: string
}

export type CaseKey = "matesramos" | "canramos" | "termolar"

export interface CaseStudy {
  key: CaseKey
  name: string
  url?: string
  logo?: string
  /** El logo es claro sobre transparente: se oscurece para que se vea en la placa blanca. */
  logoDarken?: boolean
  image?: string
  /** Tiendas del mismo cliente: si se muestran juntas, llevan la etiqueta "Mismo cliente". */
  clientGroup?: string
  tag: Record<Locale, string>
  summary: Record<Locale, string>
  scope: Record<Locale, string[]>
  testimonial: Record<Locale, Testimonial> | null
}

// Orden por defecto: las dos tiendas del mismo cliente juntas (Can Ramos primero) y Termolar al final.
export const CASES: CaseStudy[] = [
  {
    key: "canramos",
    name: "Can Ramos",
    url: "https://canramos.com/",
    logo: "/assets/img/canramos-logo.jpg",
    image: "/assets/img/case-canramos-home.jpg",
    clientGroup: "ramos",
    tag: { es: "Migración", en: "Migration" },
    summary: {
      es: "De Wix a Shopify, sin dejar de vender.",
      en: "From Wix to Shopify, without stopping sales.",
    },
    scope: {
      es: [
        "Migración de Wix a Shopify",
        "Diseño alineado con la marca",
        "Navegación más simple para que sea más fácil comprar",
        "Productos que se suelen comprar juntos y sugerencias para sumar más al pedido",
      ],
      en: [
        "Migration from Wix to Shopify",
        "Design aligned with the brand",
        "Simpler navigation so buying is easier",
        "Products that are often bought together and suggestions to add more to the order",
      ],
    },
    testimonial: null,
  },
  {
    key: "matesramos",
    name: "Mates Ramos Europa",
    url: "https://matesramoseuropa.com/",
    logo: "/assets/img/matesramoseuropa-logo.webp",
    logoDarken: true,
    image: "/assets/img/matesramoseuropa-home.jpg",
    clientGroup: "ramos",
    tag: { es: "Migración", en: "Migration" },
    summary: {
      es: "Migración a Shopify, vendiendo en toda Europa.",
      en: "Migration to Shopify, selling across Europe.",
    },
    scope: {
      es: [
        "Migración de Wix a Shopify",
        "Redirecciones para no perder posicionamiento en Google",
        "Venta en toda Europa",
        "Página de producto con personalización de productos",
      ],
      en: [
        "Migration from Wix to Shopify",
        "Redirects to keep the Google rankings",
        "Selling across Europe",
        "Product page with product personalisation",
      ],
    },
    testimonial: null,
  },
  {
    key: "termolar",
    name: "Termolar",
    url: "https://termolareurope.com/",
    logo: "/assets/img/termolar-logo.jpg",
    image: "/assets/img/case-termolar-home.jpg",
    tag: { es: "Tienda nueva", en: "New store" },
    summary: {
      es: "Tienda nueva desde cero, vendiendo en toda Europa excepto Reino Unido, en unas seis semanas.",
      en: "A new store built from scratch, selling across Europe except the UK, in about six weeks.",
    },
    scope: {
      es: [
        "Tienda creada desde cero",
        "Venta en toda Europa",
        "Productos organizados según su uso",
        "Emails automáticos",
        "Idiomas según el país",
      ],
      en: [
        "Store built from scratch",
        "Selling across Europe",
        "Products organised by how they're used",
        "Automated emails",
        "Languages by country",
      ],
    },
    testimonial: null,
  },
]

export function getCases(keys?: CaseKey[]): CaseStudy[] {
  if (!keys) return CASES
  return keys.map((k) => CASES.find((c) => c.key === k)!).filter(Boolean)
}

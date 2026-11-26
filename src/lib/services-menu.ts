// Menú "Servicios": cuatro verticales con sus enlaces y la franja "Cómo trabajamos".
// Lo usan el desplegable de la barra de navegación y la columna de servicios del footer.

type Locale = "es" | "en"

export interface ServiceLink {
  label: string
  href: string
}

export interface ServiceVertical {
  id: "ads" | "tech" | "analytics" | "creative"
  title: string
  /** Destino de la vertical en el footer. Sin valor, el footer muestra `footerItems`. */
  href?: string
  footerItems?: ServiceLink[]
  items: ServiceLink[]
}

export interface ServicesMenu {
  verticals: ServiceVertical[]
  howWeWork: {
    title: string
    fixedPrice: string
    monthly: ServiceLink
  }
}

const ES = {
  ads: "/es/anuncios",
  newStore: "/es/tienda-nueva",
  migration: "/es/migracion-shopify",
  customDev: "/es/desarrollos-a-medida",
  measurement: "/es/contacto?servicio=measurement",
  design: "/es/contacto?servicio=design",
  monthly: "/es/mejora-continua",
}

const EN = {
  ads: "/en/ads",
  newStore: "/en/new-shopify-store",
  migration: "/en/shopify-migration",
  customDev: "/en/custom-shopify-development",
  measurement: "/en/contact?servicio=measurement",
  design: "/en/contact?servicio=design",
  monthly: "/en/continuous-improvement",
}

export const SERVICES_MENU: Record<Locale, ServicesMenu> = {
  es: {
    verticals: [
      {
        id: "ads",
        title: "Anuncios",
        href: ES.ads,
        items: [
          { label: "Google Ads", href: ES.ads },
          { label: "Meta Ads", href: ES.ads },
        ],
      },
      {
        id: "tech",
        title: "Tecnología",
        footerItems: [
          { label: "Tiendas online", href: ES.newStore },
          { label: "Migración a Shopify", href: ES.migration },
          { label: "Desarrollos a medida", href: ES.customDev },
        ],
        items: [
          { label: "Tiendas online", href: ES.newStore },
          { label: "Migración a Shopify", href: ES.migration },
          { label: "Integraciones y automatizaciones", href: ES.customDev },
          { label: "Landing pages", href: ES.customDev },
          { label: "Desarrollos a medida", href: ES.customDev },
        ],
      },
      {
        id: "analytics",
        title: "Analítica",
        href: ES.measurement,
        items: [
          { label: "Tracking y medición", href: ES.measurement },
          { label: "Paneles de ventas y rentabilidad", href: ES.measurement },
          { label: "Rendimiento publicitario", href: ES.measurement },
        ],
      },
      {
        id: "creative",
        title: "Marketing y creatividad",
        href: ES.design,
        items: [
          { label: "Identidad de marca", href: ES.design },
          { label: "Creatividades para anuncios", href: ES.design },
          { label: "Diseño y contenido", href: ES.design },
          { label: "Email marketing", href: ES.design },
        ],
      },
    ],
    howWeWork: {
      title: "Cómo trabajamos",
      fixedPrice: "Proyectos con precio cerrado",
      monthly: { label: "Acompañamiento mensual", href: ES.monthly },
    },
  },
  en: {
    verticals: [
      {
        id: "ads",
        title: "Ads",
        href: EN.ads,
        items: [
          { label: "Google Ads", href: EN.ads },
          { label: "Meta Ads", href: EN.ads },
        ],
      },
      {
        id: "tech",
        title: "Technology",
        footerItems: [
          { label: "Online stores", href: EN.newStore },
          { label: "Migration to Shopify", href: EN.migration },
          { label: "Custom development", href: EN.customDev },
        ],
        items: [
          { label: "Online stores", href: EN.newStore },
          { label: "Migration to Shopify", href: EN.migration },
          { label: "Integrations and automations", href: EN.customDev },
          { label: "Landing pages", href: EN.customDev },
          { label: "Custom development", href: EN.customDev },
        ],
      },
      {
        id: "analytics",
        title: "Analytics",
        href: EN.measurement,
        items: [
          { label: "Tracking and measurement", href: EN.measurement },
          { label: "Sales and profitability dashboards", href: EN.measurement },
          { label: "Ad performance", href: EN.measurement },
        ],
      },
      {
        id: "creative",
        title: "Marketing & Creative",
        href: EN.design,
        items: [
          { label: "Brand identity", href: EN.design },
          { label: "Ad creatives", href: EN.design },
          { label: "Design and content", href: EN.design },
          { label: "Email marketing", href: EN.design },
        ],
      },
    ],
    howWeWork: {
      title: "How we work",
      fixedPrice: "Fixed-price projects",
      monthly: { label: "Monthly support", href: EN.monthly },
    },
  },
}


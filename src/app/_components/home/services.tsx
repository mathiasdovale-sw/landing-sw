import Link from "next/link"
import { ArrowRight, BarChart3, Code2, Megaphone, Palette } from "lucide-react"

// "Servicios para pymes que quieren crecer online": servicios agrupados por vertical.
// Analítica y Marketing y Creatividad no tienen página propia de momento:
// enlazan al formulario con la opción ya elegida.

interface Vertical {
  name: string
  icon: typeof Megaphone
  items: string[]
  links: { label: string; href: string }[]
  note?: string
}

interface Copy {
  title: string
  intro: string
  verticals: Vertical[]
  monthly: { before: string; link: string; href: string }
}

const COPY: Record<"es" | "en", Copy> = {
  es: {
    title: "Servicios para pymes que quieren crecer online",
    intro: "No aplico soluciones sueltas. Cada acción se decide según lo que necesita tu negocio, y la estrategia va incluida.",
    verticals: [
      {
        name: "Anuncios",
        icon: Megaphone,
        items: ["Google Ads", "Meta Ads", "TikTok Ads", "Pinterest Ads", "Gestión y optimización de campañas"],
        links: [{ label: "Ver anuncios", href: "/es/anuncios" }],
      },
      {
        name: "Tecnología",
        icon: Code2,
        items: [
          "WooCommerce y otros CMS",
          "Landing pages",
          "Integraciones",
          "Automatizaciones",
          "Flujos de email",
          "IA aplicada al negocio",
          "CRO",
        ],
        links: [
          { label: "Tienda nueva", href: "/es/tienda-nueva" },
          { label: "Migración a Shopify", href: "/es/migracion-shopify" },
          { label: "Desarrollos a medida", href: "/es/desarrollos-a-medida" },
        ],
      },
      {
        name: "Analítica",
        icon: BarChart3,
        items: ["Tracking de eventos", "Analítica web", "Paneles de ventas, leads y rentabilidad", "Rendimiento publicitario"],
        links: [{ label: "Pide presupuesto", href: "/es/contacto?servicio=measurement" }],
      },
      {
        name: "Marketing y Creatividad",
        icon: Palette,
        items: ["Identidad de marca", "Rebranding", "Creatividades", "Diseño", "Contenido SEO", "Email marketing"],
        links: [{ label: "Pide presupuesto", href: "/es/contacto?servicio=design" }],
        note: "",
      },
    ],
    monthly: {
      before: "¿Prefieres que lleve tus anuncios y mejore tu web cada mes?",
      link: "Mira el acompañamiento mensual.",
      href: "/es/mejora-continua",
    },
  },
  en: {
    title: "Services for small businesses that want to grow online",
    intro: "I don't apply one-off fixes. Every action is decided based on what your business needs, and the strategy is included.",
    verticals: [
      {
        name: "Ads",
        icon: Megaphone,
        items: ["Google Ads", "Meta Ads", "TikTok Ads", "Pinterest Ads", "Campaign management and optimisation"],
        links: [{ label: "See ads", href: "/en/ads" }],
      },
      {
        name: "Technology",
        icon: Code2,
        items: [
          "WooCommerce and other CMSs",
          "Landing pages",
          "Integrations",
          "Automations",
          "Email flows",
          "AI applied to your business",
          "CRO",
        ],
        links: [
          { label: "New store", href: "/en/new-shopify-store" },
          { label: "Migration to Shopify", href: "/en/shopify-migration" },
          { label: "Custom development", href: "/en/custom-shopify-development" },
        ],
      },
      {
        name: "Analytics",
        icon: BarChart3,
        items: ["Event tracking", "Web analytics", "Sales, leads and profitability dashboards", "Ad performance"],
        links: [{ label: "Ask for a quote", href: "/en/contact?servicio=measurement" }],
      },
      {
        name: "Marketing and Creative",
        icon: Palette,
        items: ["Brand identity", "Rebranding", "Ad creatives", "Design", "SEO content", "Email marketing"],
        links: [{ label: "Ask for a quote", href: "/en/contact?servicio=design" }],
        note: "",
      },
    ],
    monthly: {
      before: "Would you rather I run your ads and improve your website every month?",
      link: "See monthly support.",
      href: "/en/continuous-improvement",
    },
  },
}

export default function Services({ locale }: { locale: "es" | "en" }) {
  const c = COPY[locale]
  return (
    <section id="services-section" className="border-t border-sw-line bg-sw-bg-0 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <h2 className="max-w-3xl font-display text-3xl text-sw-fg-1 sm:text-4xl">{c.title}</h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-sw-fg-2">{c.intro}</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:gap-5">
          {c.verticals.map((v) => {
            const Icon = v.icon
            return (
              <article
                key={v.name}
                className="flex flex-col rounded-sm border border-sw-line bg-sw-bg-2 p-6 transition-colors hover:border-sw-line-strong"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 shrink-0 text-sw-brand" aria-hidden="true" />
                  <h3 className="font-display text-xl text-sw-fg-1 sm:text-2xl">{v.name}</h3>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {v.items.map((item) => (
                    <li key={item} className="rounded-sm border border-sw-line-strong px-3 py-1.5 text-sm text-sw-fg-2">
                      {item}
                    </li>
                  ))}
                </ul>
                {v.note && <p className="mt-4 text-sm italic leading-relaxed text-sw-fg-3">{v.note}</p>}
                <div className="mt-auto flex flex-wrap gap-x-6 gap-y-1 pt-4">
                  {v.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-sw-brand underline-offset-4 hover:underline"
                    >
                      {l.label}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
        <p className="mt-8 text-sm text-sw-fg-3">
          {c.monthly.before}{" "}
          <Link href={c.monthly.href} className="font-semibold text-sw-brand underline-offset-4 hover:underline">
            {c.monthly.link}
          </Link>
        </p>
      </div>
    </section>
  )
}

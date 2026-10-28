import Link from "next/link"
import { ArrowRight, FlaskConical, MousePointerClick } from "lucide-react"

// Home: cómo lo hago. Lo primero es saber cuánto tráfico tiene la tienda,
// porque de eso depende el método. Debajo, los dos caminos según la plataforma.

const COPY = {
  es: {
    eyebrow: "Cómo lo hago",
    title: "Primero, saber cuánto tráfico tiene tu tienda.",
    intro:
      "Lo que funciona para que cada visita venda más depende del tráfico. Por eso lo primero es ver si tu tienda tiene poco o mucho, y según eso elijo el método.",
    methods: [
      {
        label: "Poco tráfico",
        title: "Mejoras heurísticas y datos cualitativos",
        text: "Con pocas visitas, un test A/B tarda meses en dar un resultado fiable. Así que aplico buenas prácticas de experiencia de compra y me guío por grabaciones de sesiones reales: dónde dudan tus clientes, dónde se atascan y dónde abandonan.",
      },
      {
        label: "Mucho tráfico",
        title: "Tests A/B primero",
        text: "Con suficientes visitas, cada cambio se prueba contra la versión actual y se queda el que vende más. Decides con datos, no con opiniones.",
      },
    ],
    paths: [
      { label: "Ya tengo Shopify", name: "Mejora continua", note: "290 € + IVA al mes", href: "/es/mejora-continua" },
      { label: "Estoy en otra plataforma", name: "Migración a Shopify", note: "Precio cerrado tras ver tu tienda", href: "/es/migracion-shopify" },
    ],
    puntual: "¿Necesitas algo puntual (un desarrollo, emails automáticos)?",
    write: "Escríbeme",
  },
  en: {
    eyebrow: "How I do it",
    title: "First, find out how much traffic your store gets.",
    intro:
      "What makes each visit sell more depends on traffic. So the first step is to see whether your store gets little or a lot, and I pick the method based on that.",
    methods: [
      {
        label: "Low traffic",
        title: "Conversion best practices and qualitative data",
        text: "With few visits, an A/B test takes months to give a reliable result. So I apply proven shopping-experience best practices and follow real session recordings: where your customers hesitate, get stuck and drop off.",
      },
      {
        label: "High traffic",
        title: "A/B tests first",
        text: "With enough visits, every change is tested against the current version and the one that sells more stays. You decide with data, not opinions.",
      },
    ],
    paths: [
      { label: "I'm already on Shopify", name: "Continuous improvement", note: "€290 + VAT per month", href: "/en/continuous-improvement" },
      { label: "I'm on another platform", name: "Shopify migration", note: "Fixed price after seeing your store", href: "/en/shopify-migration" },
    ],
    puntual: "Need something one-off (custom development, automated emails)?",
    write: "Get in touch",
  },
}

const ICONS = [MousePointerClick, FlaskConical]

export default function HowIDoIt({ locale, contactHref }: { locale: "es" | "en"; contactHref: string }) {
  const c = COPY[locale]
  return (
    <section id="services-section" className="bg-sw-bg-1 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex items-center justify-between gap-6">
          <span className="font-mono-label text-sw-fg-3">{c.eyebrow}</span>
          <span className="font-mono-label text-sw-fg-3">02</span>
        </div>
        <h2 className="mt-6 max-w-3xl font-display text-4xl text-sw-fg-1 sm:text-5xl lg:text-6xl">{c.title}</h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sw-fg-2">{c.intro}</p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {c.methods.map(({ label, title, text }, i) => {
            const Icon = ICONS[i]
            return (
              <div key={label} className="rounded-sm border border-sw-line bg-sw-bg-2 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-sw-secondary" aria-hidden="true" />
                  <span className="font-mono-label text-sw-secondary">{label}</span>
                </div>
                <h3 className="mt-5 font-display text-2xl text-sw-fg-1 sm:text-3xl">{title}</h3>
                <p className="mt-4 leading-relaxed text-sw-fg-2">{text}</p>
              </div>
            )
          })}
        </div>

        {/* Los dos caminos, en compacto */}
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {c.paths.map((p) => (
            <Link key={p.href} href={p.href} className="group flex items-center justify-between gap-4 rounded-sm border border-sw-line p-5 transition-colors hover:border-sw-secondary">
              <span className="min-w-0">
                <span className="block font-mono-label text-sw-fg-4">{p.label}</span>
                <span className="mt-1 block text-lg font-semibold text-sw-fg-1 group-hover:text-sw-secondary">{p.name}</span>
                <span className="block text-sm text-sw-fg-3">{p.note}</span>
              </span>
              <ArrowRight className="h-5 w-5 shrink-0 text-sw-fg-3 group-hover:text-sw-secondary" aria-hidden="true" />
            </Link>
          ))}
        </div>

        <p className="mt-8 text-sw-fg-2">
          {c.puntual}{" "}
          <a href={contactHref} className="font-semibold text-sw-secondary underline-offset-4 hover:underline">
            {c.write}
          </a>
          .
        </p>
      </div>
    </section>
  )
}

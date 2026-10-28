import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

// Página de servicios: dos caminos según la plataforma + servicios puntuales.

interface Path {
  label: string
  name: string
  price: string
  priceNote: string
  bullets: string[]
  href: string
  linkLabel: string
  highlight?: boolean
}

interface Copy {
  paths: Path[]
  puntualTitle: string
  puntualText: string
  puntual: { label: string; note: string; href: string }[]
  write: string
}

const COPY: Record<"es" | "en", Copy> = {
  es: {
    paths: [
      {
        label: "Ya tengo Shopify",
        name: "Mejora continua",
        price: "290 € + IVA al mes",
        priceNote: "Sin permanencia",
        bullets: [
          "Al menos 4 mejoras implementadas al mes",
          "Informe mensual de facturación por visita",
          "Una reunión al mes: qué se hizo y qué viene",
        ],
        href: "/es/mejora-continua",
        linkLabel: "Ver la mejora continua",
        highlight: true,
      },
      {
        label: "Estoy en otra plataforma",
        name: "Migración con mejoras",
        price: "Precio cerrado tras ver tu tienda",
        priceNote: "En aproximadamente 3 semanas",
        bullets: [
          "Tienda nueva a medida, con las mejoras ya hechas",
          "Tu tienda actual sigue vendiendo hasta el cambio",
          "Cuidado del SEO: URLs y redirecciones 301",
        ],
        href: "/es/migracion-shopify",
        linkLabel: "Ver la migración",
      },
    ],
    puntualTitle: "¿Necesitas algo puntual?",
    puntualText: "Sin pago mensual, con presupuesto cerrado antes de empezar. Escríbeme y te digo cómo encaja.",
    puntual: [
      { label: "Desarrollos a medida", note: "Presupuesto cerrado", href: "/es/desarrollos-a-medida" },
      { label: "Emails automáticos", note: "Presupuesto cerrado", href: "/es/email-marketing-automation" },
    ],
    write: "Escríbeme",
  },
  en: {
    paths: [
      {
        label: "I'm already on Shopify",
        name: "Continuous improvement",
        price: "€290 + VAT per month",
        priceNote: "No lock-in",
        bullets: [
          "At least 4 improvements implemented every month",
          "Monthly revenue-per-visit report",
          "One meeting a month: what was done and what's next",
        ],
        href: "/en/continuous-improvement",
        linkLabel: "See continuous improvement",
        highlight: true,
      },
      {
        label: "I'm on another platform",
        name: "Migration with improvements",
        price: "Fixed price after seeing your store",
        priceNote: "In about 3 weeks",
        bullets: [
          "New custom store, with the improvements already done",
          "Your current store keeps selling until the switch",
          "SEO taken care of: URLs and 301 redirects",
        ],
        href: "/en/shopify-migration",
        linkLabel: "See the migration",
      },
    ],
    puntualTitle: "Need something one-off?",
    puntualText: "No monthly fee, with a fixed quote before we start. Get in touch and I'll tell you how it fits.",
    puntual: [
      { label: "Custom development", note: "Fixed quote", href: "/en/custom-shopify-development" },
      { label: "Automated emails", note: "Fixed quote", href: "/en/email-marketing-automation" },
    ],
    write: "Get in touch",
  },
}

export default function ServicePaths({ locale, contactHref }: { locale: "es" | "en"; contactHref: string }) {
  const c = COPY[locale]
  return (
    <section id="services-section" className="bg-sw-bg-1 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-6 md:grid-cols-2">
          {c.paths.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col rounded-sm border p-6 sm:p-8 ${p.highlight ? "border-sw-secondary bg-sw-bg-2" : "border-sw-line bg-sw-bg-2"}`}
            >
              <span className="inline-block w-fit rounded-sm bg-sw-bg-0 px-3 py-1 font-mono-label text-sw-secondary">{p.label}</span>
              <h3 className="mt-5 font-display text-3xl text-sw-fg-1">{p.name}</h3>
              <p className="mt-3 text-lg font-semibold text-sw-fg-1">{p.price}</p>
              <p className="font-mono-label text-sw-fg-4">{p.priceNote}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm leading-relaxed text-sw-fg-2 sm:text-base">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-sw-secondary" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href={p.href}
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-sm border border-sw-line-strong px-6 py-3 text-sm font-semibold text-sw-fg-1 transition-colors hover:border-sw-fg-1"
              >
                {p.linkLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-sm border border-sw-line bg-sw-bg-0 p-6 sm:p-8">
          <h2 className="font-display text-2xl text-sw-fg-1 sm:text-3xl">{c.puntualTitle}</h2>
          <p className="mt-2 text-sw-fg-2">{c.puntualText}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {c.puntual.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="group block rounded-sm border border-sw-line p-4 transition-colors hover:border-sw-secondary">
                  <span className="flex items-center justify-between gap-2 font-semibold text-sw-fg-1 group-hover:text-sw-secondary">
                    {s.label}
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </span>
                  <span className="mt-1 block font-mono-label text-sw-fg-4">{s.note}</span>
                </Link>
              </li>
            ))}
          </ul>
          <a href={contactHref} className="mt-6 inline-block font-semibold text-sw-secondary underline-offset-4 hover:underline">
            {c.write}
          </a>
        </div>
      </div>
    </section>
  )
}

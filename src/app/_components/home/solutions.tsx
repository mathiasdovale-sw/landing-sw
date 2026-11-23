import Link from "next/link"
import { ArrowRight, ShoppingBag, Users } from "lucide-react"

// "¿Qué necesita tu negocio?": una tarjeta por tipo de negocio, que lleva a su página de solución.

const COPY = {
  es: {
    title: "¿Qué necesita tu negocio?",
    cards: [
      {
        icon: ShoppingBag,
        name: "Vendo online",
        text: "Anuncios pensados para la rentabilidad, una tienda que convierte más y procesos que dejan de ser manuales.",
        href: "/es/ecommerce",
        link: "Ver la solución para e-commerce",
      },
      {
        icon: Users,
        name: "Capto clientes por internet",
        text: "Anuncios que traen contactos, páginas que los convierten y un seguimiento automático de cada lead.",
        href: "/es/generacion-de-leads",
        link: "Ver la solución para generar leads",
      },
    ],
  },
  en: {
    title: "What does your business need?",
    cards: [
      {
        icon: ShoppingBag,
        name: "I sell online",
        text: "Ads built for profitability, a store that converts better and processes that stop being manual.",
        href: "/en/ecommerce",
        link: "See the e-commerce solution",
      },
      {
        icon: Users,
        name: "I get clients online",
        text: "Ads that bring in leads, pages that convert them and automatic follow-up for every lead.",
        href: "/en/lead-generation",
        link: "See the lead generation solution",
      },
    ],
  },
}

export default function Solutions({ locale }: { locale: "es" | "en" }) {
  const c = COPY[locale]
  return (
    <section id="soluciones" className="bg-sw-bg-0 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <h2 className="font-display text-3xl text-sw-fg-1 sm:text-4xl">{c.title}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {c.cards.map((card) => {
            const Icon = card.icon
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group flex flex-col rounded-sm border border-sw-line bg-sw-bg-2 p-6 transition-colors hover:border-sw-brand sm:p-8"
              >
                <Icon className="h-7 w-7 text-sw-brand" aria-hidden="true" />
                <h3 className="mt-5 font-display text-2xl text-sw-fg-1 sm:text-3xl">{card.name}</h3>
                <p className="mt-4 flex-1 text-lg leading-relaxed text-sw-fg-2">{card.text}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sw-brand">
                  {card.link}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

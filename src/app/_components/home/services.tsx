import Link from "next/link"
import { ArrowRight } from "lucide-react"

// "Qué construyo": una tarjeta por servicio.
// Los ejemplos de desarrollo a medida son capacidades, no trabajos ya hechos.

interface Card {
  name: string
  text: string
  href: string
  linkLabel: string
}

interface Copy {
  title: string
  cards: Card[]
  monthly: { before: string; link: string; href: string }
}

const COPY: Record<"es" | "en", Copy> = {
  es: {
    title: "Qué construyo",
    cards: [
      {
        name: "Tienda nueva",
        text: "Tu tienda Shopify desde cero, lista para vender: diseño, catálogo, pagos, envíos y todo configurado.",
        href: "/es/tienda-nueva",
        linkLabel: "Ver la tienda nueva",
      },
      {
        name: "Migración a Shopify",
        text: "Paso tu tienda desde WooCommerce, PrestaShop, Wix, Magento u otra plataforma, cuidando tu posicionamiento en Google y sin cerrar ni un día.",
        href: "/es/migracion-shopify",
        linkLabel: "Ver la migración",
      },
      {
        name: "Desarrollo a medida",
        text: "Lo que una plantilla o una app no resuelven. Por ejemplo: funcionalidades propias en tu tienda, conexión con tu sistema de gestión o stock, o automatizaciones de pedidos.",
        href: "/es/desarrollos-a-medida",
        linkLabel: "Ver el desarrollo a medida",
      },
    ],
    monthly: {
      before: "¿Ya tienes tu tienda y quieres seguir mejorándola cada mes?",
      link: "Mira la mejora continua.",
      href: "/es/mejora-continua",
    },
  },
  en: {
    title: "What I build",
    cards: [
      {
        name: "New store",
        text: "Your Shopify store from scratch, ready to sell: design, catalogue, payments, shipping and everything set up.",
        href: "/en/new-shopify-store",
        linkLabel: "See the new store",
      },
      {
        name: "Migration to Shopify",
        text: "I move your store over from WooCommerce, PrestaShop, Wix, Magento or any other platform, protecting your Google rankings and without closing for a single day.",
        href: "/en/shopify-migration",
        linkLabel: "See the migration",
      },
      {
        name: "Custom development",
        text: "What a theme or an app can't do. For example: your own features in your store, a connection to your management or stock system, or order automations.",
        href: "/en/custom-shopify-development",
        linkLabel: "See custom development",
      },
    ],
    monthly: {
      before: "Already have a store and want to keep improving it every month?",
      link: "See continuous improvement.",
      href: "/en/continuous-improvement",
    },
  },
}

export default function Services({ locale }: { locale: "es" | "en" }) {
  const c = COPY[locale]
  return (
    <section id="services-section" className="bg-sw-bg-0 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <h2 className="mb-10 font-display text-3xl text-sw-fg-1 sm:text-4xl">{c.title}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {c.cards.map((card) => (
            <article
              key={card.name}
              className="flex flex-col rounded-sm border border-sw-line bg-sw-bg-2 p-6 transition-colors hover:border-sw-line-strong sm:p-8"
            >
              <h3 className="font-display text-2xl text-sw-fg-1 sm:text-3xl">{card.name}</h3>
              <p className="mt-4 flex-1 leading-relaxed text-sw-fg-2">{card.text}</p>
              <Link
                href={card.href}
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-sm border border-sw-line-strong px-6 py-3 text-sm font-semibold text-sw-fg-1 transition-colors hover:border-sw-fg-1"
              >
                {card.linkLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
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

import Link from "next/link"
import { Check } from "lucide-react"

// Sección "Cómo trabajo" — un solo componente con dos variantes:
//   - compact:  home (pasos con descripción corta, sin tarjeta de precio)
//   - expanded: página de auditoría (descripciones + tarjeta de precio)
// Tres pasos lineales: Diagnóstico → Mejoras → Acompañamiento. Sin ciclos.

export type HowIWorkVariant = "compact" | "expanded"

interface HowIWorkStep {
  n: string
  title: string
  /** Etiqueta con el servicio que corresponde al paso. */
  tag: string
  description: string
}

export interface HowIWorkCopy {
  eyebrow: string
  titleLine1: string
  titleLine2: string
  intro: string
  steps: HowIWorkStep[]
  note: string
  priceCard: {
    eyebrow: string
    amount: string
    vat: string
    amountNote: string
    bullets: string[]
    ctaLabel: string
  }
  compactCtaLabel: string
}

const COPY: Record<"es" | "en", HowIWorkCopy> = {
  es: {
    eyebrow: "Cómo trabajo",
    titleLine1: "Empiezas donde está tu tienda.",
    titleLine2: "Sin permanencia.",
    intro:
      "Si no sabes qué falla, empezamos por la auditoría. Si tu tienda ya funciona, pasamos directamente a la mejora continua. Precio y fechas claros antes de empezar.",
    steps: [
      {
        n: "01",
        title: "Diagnóstico",
        tag: "Auditoría · 140 € + IVA",
        description:
          "Reviso tu tienda como la vería un cliente y te entrego qué frena las ventas, ordenado por impacto. No necesito acceso a tus métricas.",
      },
      {
        n: "02",
        title: "Mejoras",
        tag: "Implementación · presupuesto cerrado",
        description:
          "Implementas tú las mejoras o me las encargas, con precio y fechas cerrados antes de empezar.",
      },
      {
        n: "03",
        title: "Acompañamiento",
        tag: "Mejora continua · 290 € + IVA al mes",
        description:
          "Si prefieres que lo implemente yo, analizo grabaciones de sesiones reales e implemento al menos 4 mejoras al mes. Sin permanencia: lo dejas cuando quieras.",
      },
    ],
    note: "¿Tu tienda ya está bien? Puedes empezar directamente en el paso 03.",
    priceCard: {
      eyebrow: "Auditoría · pago único",
      amount: "140 €",
      vat: "+ IVA",
      amountNote:
        "Es el precio de la auditoría. Si quieres que implemente las mejoras, se presupuesta aparte.",
      bullets: [
        "Te llega en 7-10 días",
        "Sin necesidad de acceso a tus métricas",
        "Qué arreglar y en qué orden",
        "Después: implementas tú, me lo encargas o pasas a la mejora continua",
      ],
      ctaLabel: "Quiero mi auditoría",
    },
    compactCtaLabel: "Ver cómo es la auditoría",
  },
  en: {
    eyebrow: "How I work",
    titleLine1: "We start where your store is.",
    titleLine2: "No lock-in.",
    intro:
      "If you don't know what's wrong, we start with the audit. If your store already works, we go straight to continuous improvement. Clear price and dates before we start.",
    steps: [
      {
        n: "01",
        title: "Diagnosis",
        tag: "Audit · €140 + VAT",
        description:
          "I go through your store the way a customer would and hand you what's holding sales back, ordered by impact. I don't need access to your metrics.",
      },
      {
        n: "02",
        title: "Improvements",
        tag: "Implementation · fixed quote",
        description:
          "You implement the improvements yourself or hand them to me, with price and dates agreed before we start.",
      },
      {
        n: "03",
        title: "Ongoing support",
        tag: "Continuous improvement · monthly",
        description:
          "Once the store is in good shape, I analyse real session recordings and implement 4 improvements a month. No lock-in: stop whenever you want.",
      },
    ],
    note: "Store already in good shape? You can start straight at step 03.",
    priceCard: {
      eyebrow: "Audit · one-off",
      amount: "€140",
      vat: "+ VAT",
      amountNote:
        "That's the price of the audit. If you want me to implement the improvements, that's quoted separately.",
      bullets: [
        "Delivered in 7-10 days",
        "No access to your metrics needed",
        "What to fix and in what order",
        "Then: do it yourself, hand it to me, or move to continuous improvement",
      ],
      ctaLabel: "I want my audit",
    },
    compactCtaLabel: "See what the audit looks like",
  },
}

/** Home en español: los pasos de la mejora continua. */
export const HOME_ES_COPY: HowIWorkCopy = {
  ...COPY.es,
  titleLine1: "Mes a mes.",
  titleLine2: "Sin permanencia.",
  intro: "Para tiendas que ya están en Shopify. Empezamos con una reunión gratis para entender qué le pasa a tu tienda. Después, pagas mes a mes y cancelas cuando quieras.",
  steps: [
    {
      n: "01",
      title: "Miro tu tienda y te digo qué la frena",
      tag: "Mes 1",
      description: "Veo cuánto tráfico tiene tu tienda para elegir el método, reviso grabaciones de sesiones reales con Microsoft Clarity y detecto dónde abandonan tus clientes.",
    },
    {
      n: "02",
      title: "Lo implemento el primer mes",
      tag: "Mes 1",
      description: "Empiezo por lo que más frena las ventas de tu tienda.",
    },
    {
      n: "03",
      title: "Cada mes, al menos 4 mejoras nuevas y el informe",
      tag: "Desde el mes 2 · 290 € + IVA al mes",
      description: "Al menos 4 mejoras implementadas, el informe de facturación por visita y una reunión para ver qué se hizo y qué viene.",
    },
  ],
  note: "¿Aún no estás en Shopify? Migro tu tienda a Shopify con las mejoras ya hechas y después seguimos mes a mes.",
  compactCtaLabel: "Ver la mejora continua",
}

/** English home: the continuous improvement steps. */
export const HOME_EN_COPY: HowIWorkCopy = {
  ...COPY.en,
  titleLine1: "Month by month.",
  titleLine2: "No lock-in.",
  intro: "For stores already on Shopify. We start with a free meeting to understand what's holding your store back. Then you pay month to month and cancel whenever you want.",
  steps: [
    {
      n: "01",
      title: "I look at your store and tell you what's holding it back",
      tag: "Month 1",
      description: "I check how much traffic your store gets to pick the method, review real session recordings with Microsoft Clarity and find where your customers drop off.",
    },
    {
      n: "02",
      title: "I implement it in the first month",
      tag: "Month 1",
      description: "I start with what's holding your store's sales back the most.",
    },
    {
      n: "03",
      title: "Every month, at least 4 new improvements and the report",
      tag: "From month 2 · €290 + VAT per month",
      description: "At least 4 improvements implemented, the revenue-per-visit report and a meeting to go over what was done and what's next.",
    },
  ],
  note: "Not on Shopify yet? I migrate your store to Shopify with the improvements already done, and then we continue month by month.",
  compactCtaLabel: "See continuous improvement",
}

export default function HowIWorkSection({
  locale,
  variant,
  ctaHref,
  sectionNumber,
  className = "",
  copyOverride,
}: {
  locale: "es" | "en"
  variant: HowIWorkVariant
  ctaHref: string
  /** Número de sección que se muestra a la derecha del eyebrow (ej. "02"). */
  sectionNumber?: string
  className?: string
  /** Textos propios (p. ej. la home en español). */
  copyOverride?: HowIWorkCopy
}) {
  const copy = copyOverride ?? COPY[locale]
  const isExpanded = variant === "expanded"

  return (
    <section className={`bg-sw-bg-0 py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* Columna izquierda: título, intro y (solo ampliada) tarjeta de precio */}
          <div>
            <div className="flex items-center justify-between gap-6">
              <span className="font-mono-label text-sw-fg-3">{copy.eyebrow}</span>
              {sectionNumber && (
                <span className="font-mono-label text-sw-secondary">{sectionNumber}</span>
              )}
            </div>

            <h2 className="mt-6 font-display text-4xl sm:text-5xl">
              <span className="block text-sw-fg-1">{copy.titleLine1}</span>
              <span className="block text-sw-secondary">{copy.titleLine2}</span>
            </h2>

            <p className="mt-5 max-w-md text-lg leading-relaxed text-sw-fg-2">{copy.intro}</p>

            {isExpanded ? (
              <div className="mt-10 rounded-sm border border-sw-line bg-sw-bg-2 p-6 sm:p-8">
                <span className="font-mono-label text-sw-fg-3">{copy.priceCard.eyebrow}</span>
                <div className="mt-5 flex items-baseline gap-3">
                  <span className="font-display text-5xl text-sw-fg-1 sm:text-6xl">
                    {copy.priceCard.amount}
                  </span>
                  <span className="font-mono-label text-sw-fg-3">{copy.priceCard.vat}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-sw-fg-3">
                  {copy.priceCard.amountNote}
                </p>
                <ul className="mt-7 space-y-3">
                  {copy.priceCard.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-sw-fg-2">
                      <Check
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-sw-secondary"
                        aria-hidden="true"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Link
                  href={ctaHref}
                  className="mt-8 inline-block rounded-sm bg-sw-brand px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-sw-brand-hover"
                >
                  {copy.priceCard.ctaLabel}
                </Link>
              </div>
            ) : (
              <Link
                href={ctaHref}
                className="mt-9 inline-block rounded-sm border border-sw-line-strong px-7 py-4 text-base font-semibold text-sw-fg-1 transition-colors hover:border-sw-fg-1"
              >
                {copy.compactCtaLabel}
              </Link>
            )}
          </div>

          {/* Columna derecha: los 3 pasos como timeline vertical */}
          <div>
            <ol>
              {copy.steps.map((step, index) => {
                const isFirst = index === 0
                const isLast = index === copy.steps.length - 1

                return (
                  <li key={step.n} className="relative flex gap-5 pb-10 last:pb-0">
                    {!isLast && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-[19px] top-11 w-px bg-sw-line"
                      />
                    )}

                    <span
                      aria-hidden="true"
                      className={`relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm font-display text-sm ${
                        isFirst
                          ? "bg-sw-brand text-white"
                          : "border border-sw-line bg-sw-bg-2 text-sw-fg-3"
                      }`}
                    >
                      {step.n}
                    </span>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold leading-snug text-sw-secondary">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-sw-fg-2">
                        {step.description}
                      </p>
                      <span className="mt-4 inline-block rounded-sm border border-sw-line-strong px-3 py-2 font-mono-label text-sw-fg-3">
                        {step.tag}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ol>

            <p className="mt-8 rounded-sm border border-sw-line bg-sw-bg-2 p-4 text-sm leading-relaxed text-sw-fg-2">
              {copy.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

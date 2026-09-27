import Link from "next/link"
import { Check, RotateCcw } from "lucide-react"

// Sección "Cómo trabajo" — un solo componente con dos variantes:
//   - compact:  home (solo títulos de paso, sin descripciones, sin tarjeta de precio)
//   - expanded: página de auditoría de conversión (descripciones + tarjeta de precio)
// En ambas el ciclo vuelve del paso 05 al 02: a partir del segundo ciclo no se
// repite la auditoría.

export type HowIWorkVariant = "compact" | "expanded"

interface HowIWorkStep {
  n: string
  title: string
  /** Solo se muestra en la variante ampliada. */
  description: string
  /** Solo en la variante compacta: el punto de decisión tras los pasos 03 y 05. */
  decision?: string
}

interface HowIWorkCopy {
  eyebrow: string
  titleLine1: string
  titleLine2: string
  intro: string
  steps: HowIWorkStep[]
  auditTag: string
  costNotes: [string, string]
  loop: string
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
    titleLine1: "Ciclos cortos.",
    titleLine2: "Decides tú en cada paso.",
    intro:
      "Un método con fechas y presupuesto claros, sin permanencia. La auditoría te llega en 7-10 días; a partir de ahí, cada ciclo de mejora dura entre 2 y 4 semanas.",
    steps: [
      {
        n: "01",
        title: "Analizo tu tienda",
        description: "La reviso como la vería un cliente y detecto qué frena las ventas.",
      },
      {
        n: "02",
        title: "Lista de mejoras",
        description:
          "Te entrego qué cambiaría, ordenado por lo que más impacto puede tener. La primera lista sale de la auditoría; las siguientes, de los resultados del ciclo anterior.",
      },
      {
        n: "03",
        title: "Presupuesto",
        description:
          "Precio y fechas cerrados antes de empezar. ¿Avanzas? Si no te convence, terminamos aquí.",
        decision: "¿Avanzas? Si no te convence, terminamos aquí.",
      },
      {
        n: "04",
        title: "Implemento",
        description: "Hago los cambios en tu tienda.",
      },
      {
        n: "05",
        title: "Resultados",
        description:
          "Revisamos juntos qué ha cambiado. ¿Otro ciclo? Lo decides tú con los datos.",
        decision: "¿Otro ciclo? Lo decides tú con los datos.",
      },
    ],
    auditTag: "Auditoría · solo el 1er ciclo",
    costNotes: [
      "El primer ciclo incluye la auditoría.",
      "Desde el segundo ciclo, solo pagas la implementación.",
    ],
    loop: "Siguiente ciclo: volvemos al paso 02 — sin repetir la auditoría",
    priceCard: {
      eyebrow: "Auditoría · pago único",
      amount: "140€",
      vat: "+ IVA",
      amountNote: "Es el precio de la auditoría. La implementación se presupuesta aparte, en el paso 03.",
      bullets: [
        "Te llega en 7-10 días",
        "Incluida en el primer ciclo",
        "Desde el segundo, solo pagas la implementación",
        "Si no te convence, terminamos ahí",
      ],
      ctaLabel: "Quiero mi auditoría",
    },
    compactCtaLabel: "Ver cómo es la auditoría",
  },
  en: {
    eyebrow: "How I work",
    titleLine1: "Short cycles.",
    titleLine2: "You decide at every step.",
    intro:
      "A method with clear dates and a clear budget, no lock-in. The audit reaches you in 7-10 days; from there, each improvement cycle takes between 2 and 4 weeks.",
    steps: [
      {
        n: "01",
        title: "I analyse your store",
        description: "I go through it the way a customer would and spot what's holding sales back.",
      },
      {
        n: "02",
        title: "List of improvements",
        description:
          "I hand you what I would change, ordered by what can have the most impact. The first list comes from the audit; the later ones come from the previous cycle's results.",
      },
      {
        n: "03",
        title: "Quote",
        description:
          "Price and dates agreed before starting. Moving forward? If you're not convinced, we stop here.",
        decision: "Moving forward? If you're not convinced, we stop here.",
      },
      {
        n: "04",
        title: "I implement",
        description: "I make the changes on your store.",
      },
      {
        n: "05",
        title: "Results",
        description: "We review together what has changed. Another cycle? You decide, with the data.",
        decision: "Another cycle? You decide, with the data.",
      },
    ],
    auditTag: "Audit · first cycle only",
    costNotes: [
      "The first cycle includes the audit.",
      "From the second cycle on, you only pay for the implementation.",
    ],
    loop: "Next cycle: back to step 02 — without repeating the audit",
    priceCard: {
      eyebrow: "Audit · one-off",
      amount: "€140",
      vat: "+ VAT",
      amountNote: "That's the price of the audit. Implementation is quoted separately, at step 03.",
      bullets: [
        "Delivered in 7-10 days",
        "Included in the first cycle",
        "From the second cycle on, you only pay for the implementation",
        "If you're not convinced, we stop there",
      ],
      ctaLabel: "I want my audit",
    },
    compactCtaLabel: "See what the audit looks like",
  },
}

export default function HowIWorkSection({
  locale,
  variant,
  ctaHref,
  sectionNumber,
  className = "",
}: {
  locale: "es" | "en"
  variant: HowIWorkVariant
  ctaHref: string
  /** Número de sección que se muestra a la derecha del eyebrow (ej. "02"). */
  sectionNumber?: string
  className?: string
}) {
  const copy = COPY[locale]
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

          {/* Columna derecha: los 5 pasos como timeline vertical */}
          <div>
            <ol>
              {copy.steps.map((step, index) => {
                const isFirst = index === 0
                const isLast = index === copy.steps.length - 1

                return (
                  <li key={step.n} className="relative flex gap-5 pb-10 last:pb-0">
                    {/* Línea que une los pasos */}
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

                      {isExpanded && (
                        <p className="mt-2 text-sm leading-relaxed text-sw-fg-2">
                          {step.description}
                        </p>
                      )}

                      {/* En la compacta no hay descripciones, así que el punto de
                          decisión se muestra como línea propia */}
                      {!isExpanded && step.decision && (
                        <p className="mt-2 text-sm leading-relaxed text-sw-fg-3">
                          {step.decision}
                        </p>
                      )}

                      {isFirst &&
                        (isExpanded ? (
                          <span className="mt-4 inline-block rounded-sm border border-sw-line-strong px-3 py-2 font-mono-label text-sw-fg-3">
                            {copy.auditTag}
                          </span>
                        ) : (
                          <div className="mt-4 rounded-sm border border-sw-line bg-sw-bg-2 p-4">
                            <p className="text-sm leading-relaxed text-sw-fg-2">
                              {copy.costNotes[0]}
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-sw-fg-2">
                              {copy.costNotes[1]}
                            </p>
                          </div>
                        ))}
                    </div>
                  </li>
                )
              })}
            </ol>

            {/* El ciclo vuelve al paso 02 */}
            <div className="mt-2 flex items-center gap-5">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
                <RotateCcw className="h-4 w-4 text-sw-secondary" aria-hidden="true" />
              </span>
              <span className="font-mono-label text-sw-fg-3">{copy.loop}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

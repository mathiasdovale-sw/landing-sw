import Link from "next/link"
import { AFTER_DELIVERY_STEP } from "@/lib/commitments"

// Sección "Cómo trabajo" de la home: cinco pasos lineales, de la reunión gratis
// a después de entregar, con un único CTA a contacto.

interface HowIWorkStep {
  n: string
  title: string
  description: string
}

interface HowIWorkCopy {
  title: string
  steps: HowIWorkStep[]
  ctaLabel: string
}

const COPY: Record<"es" | "en", HowIWorkCopy> = {
  es: {
    title: "Cómo trabajo",
    steps: [
      { n: "01", title: "Reunión gratis", description: "Me cuentas qué necesitas y miro tu tienda actual." },
      { n: "02", title: "Precio y fecha cerrados", description: "Te paso un presupuesto cerrado y una fecha de entrega por escrito." },
      { n: "03", title: "Ves el diseño antes de construir", description: "Te enseño cómo quedará antes de desarrollar el resto." },
      { n: "04", title: "Construyo y lanzo", description: "Lo desarrollo yo mismo y lo publico sin cortes en tus ventas." },
      { n: "05", title: "Te acompaño después", description: AFTER_DELIVERY_STEP.es },
    ],
    ctaLabel: "Pide una reunión gratis",
  },
  en: {
    title: "How I work",
    steps: [
      { n: "01", title: "Free meeting", description: "You tell me what you need and I look at your current store." },
      { n: "02", title: "Price and date agreed", description: "I send you a fixed quote and a delivery date in writing." },
      { n: "03", title: "You see the design before I build", description: "I show you how it will look before developing the rest." },
      { n: "04", title: "I build and launch", description: "I develop it myself and launch it without interrupting your sales." },
      { n: "05", title: "I stay with you afterwards", description: AFTER_DELIVERY_STEP.en },
    ],
    ctaLabel: "Book a free meeting",
  },
}

export default function HowIWorkSection({
  locale,
  ctaHref,
  className = "",
}: {
  locale: "es" | "en"
  ctaHref: string
  className?: string
}) {
  const copy = COPY[locale]

  return (
    <section className={`bg-sw-bg-0 py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <h2 className="font-display text-4xl text-sw-fg-1 sm:text-5xl">{copy.title}</h2>
            <Link
              href={ctaHref}
              className="mt-9 hidden rounded-sm bg-sw-brand md:inline-block px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-sw-brand-hover"
            >
              {copy.ctaLabel}
            </Link>
          </div>

          {/* Los pasos como timeline vertical */}
          <ol>
            {copy.steps.map((step, index) => {
              const isFirst = index === 0
              const isLast = index === copy.steps.length - 1

              return (
                <li key={step.n} className="relative flex gap-5 pb-10 last:pb-0">
                  {!isLast && (
                    <span aria-hidden="true" className="absolute bottom-0 left-[19px] top-11 w-px bg-sw-line" />
                  )}

                  <span
                    aria-hidden="true"
                    className={`relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm font-display text-sm ${
                      isFirst ? "bg-sw-brand text-white" : "border border-sw-line bg-sw-bg-2 text-sw-fg-3"
                    }`}
                  >
                    {step.n}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold leading-snug text-sw-brand">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-sw-fg-2">{step.description}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

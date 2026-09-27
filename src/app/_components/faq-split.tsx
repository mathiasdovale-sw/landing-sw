"use client"
import Link from "next/link"
import { useState } from "react"
import { FAQ } from "@/interfaces/faq"

// Variante de FAQ a dos columnas: a la izquierda el título y la invitación a
// preguntar, a la derecha el acordeón. Se usa en la página de auditoría; el
// resto del sitio sigue con <FAQAccordion />.
export default function FaqSplit({
  eyebrow,
  sectionNumber,
  titleLine1,
  titleLine2,
  intro,
  linkLabel,
  linkHref,
  faqs,
  className = "",
}: {
  eyebrow: string
  sectionNumber?: string
  titleLine1: string
  titleLine2: string
  intro: string
  linkLabel: string
  linkHref: string
  faqs: FAQ[]
  className?: string
}) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null)

  return (
    <section className={`bg-sw-bg-0 py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <div className="flex items-center justify-between gap-6">
              <span className="font-mono-label text-sw-fg-3">{eyebrow}</span>
              {sectionNumber && (
                <span className="font-mono-label text-sw-secondary">{sectionNumber}</span>
              )}
            </div>

            <h2 className="mt-6 font-display text-4xl sm:text-5xl">
              <span className="block text-sw-fg-1">{titleLine1}</span>
              <span className="block text-sw-secondary">{titleLine2}</span>
            </h2>

            <p className="mt-5 max-w-sm text-lg leading-relaxed text-sw-fg-2">{intro}</p>

            <Link
              href={linkHref}
              className="mt-7 inline-block border-b border-sw-line-strong pb-1 font-mono-label text-sw-secondary transition-colors hover:border-sw-secondary"
            >
              {linkLabel} <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id
              return (
                <div
                  key={faq.id}
                  className={`rounded-sm border transition-colors ${
                    isOpen ? "border-sw-secondary bg-sw-bg-1" : "border-sw-line hover:border-sw-line-strong"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-split-${faq.id}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <h3 className="text-base font-medium text-sw-fg-1 sm:text-lg">
                      {faq.question}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 font-display text-xl text-sw-secondary"
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div id={`faq-split-${faq.id}`} className="px-6 pb-6">
                      <p className="text-sm leading-relaxed text-sw-fg-2 sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

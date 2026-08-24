import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

export interface AuditAdsLandingContent {
  locale: 'es' | 'en'
  contactHref: string
  privacyHref: string
  cookiesHref: string
  wordmark: string
  hero: {
    h1: string
    subhead: string
    ctaLabel: string
  }
  recognition: {
    question: string
    closing: string
  }
  caseStudy: {
    company: string
    stats: { value: string; label: string }[]
    note: string
  }
  includes: {
    eyebrow: string
    title: string
    items: { title: string; description: string }[]
    priceLine: string
    ctaLabel: string
  }
  noGuarantee: {
    title: string
    body: string
  }
  finalCta: {
    title: string
    ctaLabel: string
  }
  legal: {
    company: string
    rights: string
    privacy: string
    cookies: string
  }
}

export default function AuditAdsLanding({ content: c }: { content: AuditAdsLandingContent }) {
  return (
    <div className="min-h-screen bg-sw-bg-0">
      {/* Barra mínima — solo marca, sin navegación */}
      <div className="border-b border-sw-line py-5">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <span className="font-display text-lg text-sw-fg-1">{c.wordmark}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-sw-bg-0 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h1 className="font-display text-4xl text-sw-fg-1 sm:text-5xl lg:text-6xl">
            {c.hero.h1}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-sw-fg-2 sm:text-xl">
            {c.hero.subhead}
          </p>
          <div className="mt-9">
            <Link
              href={c.contactHref}
              className="inline-block rounded-sm bg-sw-brand px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-sw-brand-hover"
            >
              {c.hero.ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* Bloque de reconocimiento */}
      <section className="bg-sw-bg-1 py-14 sm:py-16">
        <div className="mx-auto max-w-2xl px-5 text-center">
          <p className="text-lg leading-relaxed text-sw-fg-2">{c.recognition.question}</p>
          <p className="mt-5 text-lg font-semibold text-sw-fg-1">{c.recognition.closing}</p>
        </div>
      </section>

      {/* Caso real */}
      <section className="bg-sw-bg-0 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5">
          <div className="rounded-sm border border-sw-line bg-sw-bg-2 p-8 sm:p-10">
            <span className="font-mono-label text-sw-fg-3">{c.caseStudy.company}</span>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {c.caseStudy.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-4xl text-sw-secondary sm:text-5xl">
                    {stat.value}
                  </div>
                  <p className="mt-2 text-sm text-sw-fg-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-5 text-center text-sm text-sw-fg-4">{c.caseStudy.note}</p>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="bg-sw-bg-1 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5">
          <span className="font-mono-label text-sw-fg-3">{c.includes.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl text-sw-fg-1 sm:text-4xl">
            {c.includes.title}
          </h2>
          <div className="mt-10 space-y-6">
            {c.includes.items.map((item) => (
              <div key={item.title} className="flex gap-4">
                <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-sw-secondary" />
                <div>
                  <h3 className="text-lg font-semibold text-sw-fg-1">{item.title}</h3>
                  <p className="mt-1 text-sw-fg-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 font-mono-label text-sw-fg-1">{c.includes.priceLine}</p>
          <div className="mt-8">
            <Link
              href={c.contactHref}
              className="inline-block rounded-sm bg-sw-brand px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-sw-brand-hover"
            >
              {c.includes.ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* Por qué no garantizamos resultados */}
      <section className="bg-sw-bg-0 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-5 text-center">
          <h2 className="font-display text-2xl text-sw-fg-1 sm:text-3xl">
            {c.noGuarantee.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-sw-fg-2">
            {c.noGuarantee.body}
          </p>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-sw-bg-1 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl px-5 text-center">
          <h2 className="font-display text-3xl text-sw-fg-1 sm:text-4xl">
            {c.finalCta.title}
          </h2>
          <div className="mt-9">
            <Link
              href={c.contactHref}
              className="inline-block rounded-sm bg-sw-brand px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-sw-brand-hover"
            >
              {c.finalCta.ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* Legal mínimo */}
      <footer className="border-t border-sw-line py-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-3 px-5 text-center sm:flex-row sm:text-left">
          <span className="font-mono-label normal-case tracking-normal text-sw-fg-4">
            2026 {c.legal.company}. {c.legal.rights}
          </span>
          <div className="flex gap-5 text-sm">
            <a href={c.privacyHref} className="text-sw-fg-4 transition-colors hover:text-sw-fg-1">
              {c.legal.privacy}
            </a>
            <a href={c.cookiesHref} className="text-sw-fg-4 transition-colors hover:text-sw-fg-1">
              {c.legal.cookies}
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

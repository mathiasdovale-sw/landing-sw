"use client"
import { useLanguage } from "@/contexts/LanguageContext"

export default function CloseSection() {
  const { t } = useLanguage()

  const scrollToContact = () => {
    const contactSection = document.getElementById('contacto')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="bg-sw-bg-0 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <h2 className="font-display text-5xl leading-[0.95] text-sw-fg-1 sm:text-6xl lg:text-7xl">
          {t('close.title')}
        </h2>
        <div className="mt-12 flex flex-wrap items-end justify-between gap-6">
          <button
            onClick={scrollToContact}
            className="rounded-sm bg-sw-brand px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-sw-brand-hover"
          >
            {t('close.cta')}
          </button>
          <span className="font-mono-label normal-case tracking-normal text-sw-fg-3">
            contact@sellifyworks.com
          </span>
        </div>
      </div>
    </section>
  )
}

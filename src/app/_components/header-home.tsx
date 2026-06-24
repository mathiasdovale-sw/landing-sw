"use client"
import { useLanguage } from "@/contexts/LanguageContext"

const HeaderHome = () => {
  const { t } = useLanguage()

  const scrollToContact = () => {
    const contactSection = document.getElementById('contacto')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-section')
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const stats = [
    { num: t('hero.stat1.num'), label: t('hero.stat1.label') },
    { num: t('hero.stat2.num'), label: t('hero.stat2.label') },
    { num: t('hero.stat3.num'), label: t('hero.stat3.label') },
  ]

  return (
    <section className="bg-sw-bg-0 pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-7 flex items-center gap-3">
          <span className="font-mono-label text-sw-fg-3">{t('hero.eyebrow')}</span>
        </div>

        <h1 className="font-display text-5xl text-sw-fg-1 sm:text-6xl md:text-7xl lg:text-8xl">
          {t('hero.title.line1')}
          <br />
          <span className="text-sw-brand">{t('hero.title.line2')}</span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-sw-fg-2 sm:text-xl">
          {t('hero.sub')}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <button
            onClick={scrollToContact}
            className="rounded-sm bg-sw-brand px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-sw-brand-hover"
          >
            {t('hero.cta1')}
          </button>
          <button
            onClick={scrollToServices}
            className="rounded-sm border border-sw-line-strong px-7 py-4 text-base font-semibold text-sw-fg-1 transition-colors hover:border-sw-fg-1"
          >
            {t('hero.cta2')}
          </button>
        </div>

        <div className="mt-14 flex flex-wrap gap-8 border-t border-sw-line pt-7 sm:gap-16">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-3xl text-sw-fg-1 sm:text-4xl">{stat.num}</div>
              <div className="mt-2 max-w-[24ch] font-mono-label normal-case tracking-normal text-sw-fg-3">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeaderHome

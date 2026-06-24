"use client"
import { useLanguage } from "@/contexts/LanguageContext"

export default function ProblemSection() {
  const { t } = useLanguage()

  const items = [t('whom.item1'), t('whom.item2'), t('whom.item3'), t('whom.item4'), t('whom.item5')]

  return (
    <section className="bg-sw-bg-1 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-12 flex items-center justify-between">
          <span className="font-mono-label text-sw-fg-3">{t('problem.eyebrow')}</span>
          <span className="font-mono-label text-sw-fg-3">01</span>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <h2 className="font-display text-4xl text-sw-fg-1 sm:text-5xl lg:text-6xl">
            {t('problem.title')}
          </h2>

          <div>
            <p className="text-lg leading-relaxed text-sw-fg-1 sm:text-xl">
              {t('problem.lede')}
            </p>

            <ul className="mt-8">
              {items.map((item, index) => (
                <li
                  key={item}
                  className="flex items-baseline gap-4 border-b border-sw-line py-4"
                >
                  <span className="min-w-[24px] font-mono-label text-sw-brand">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-base leading-snug text-sw-fg-2 sm:text-lg">{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-xl text-sw-brand sm:text-2xl">{t('whom.foot')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useLocalizedLinks } from "@/hooks/useLocalizedLinks"
import { getServicesByGroup, ServiceGroupKey } from "@/lib/services-config"

function formatPrice(amount: number, locale: 'es' | 'en') {
  // No depende de datos ICU/Intl (poco fiables en algunos runtimes de Node):
  // agrupa de a miles manualmente con el separador correcto por idioma.
  const separator = locale === 'es' ? '.' : ','
  const grouped = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
  return locale === 'es' ? `${grouped}€` : `€${grouped}`
}

const GROUPS: { key: ServiceGroupKey; num: string }[] = [
  { key: 'foundation', num: '01' },
  { key: 'conversion', num: '02' },
  { key: 'recurring', num: '03' },
]

const cardContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function ServicesSection() {
  const { t, language } = useLanguage()
  const { links } = useLocalizedLinks()
  const router = useRouter()

  const scrollToContact = () => {
    const contactSection = document.getElementById('contacto')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      router.push(links.contact)
    }
  }

  return (
    <section id="services-section" className="bg-sw-bg-1 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl text-sw-fg-1 sm:text-5xl lg:text-6xl">
            {t('services.title')}
          </h2>
          <p className="max-w-md text-lg text-sw-fg-2">{t('services.sub')}</p>
        </div>

        {GROUPS.map((group) => {
          const groupServices = getServicesByGroup(group.key)
          return (
            <div key={group.key} className="mt-14">
              <div className="mb-6 flex flex-wrap items-baseline gap-4">
                <span className="font-mono-label text-sw-fg-3">{group.num}</span>
                <span className="font-display text-2xl text-sw-fg-1 sm:text-3xl">
                  {t(`services.group.${group.key}.name`)}
                </span>
                <span className="ml-auto max-w-[34ch] text-right text-sm text-sw-fg-3">
                  {t(`services.group.${group.key}.desc`)}
                </span>
              </div>

              {/* Cards: scroll horizontal con snap en mobile, grid en desktop */}
              <div className="-mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:overflow-visible sm:px-0">
                <motion.div
                  className="flex snap-x snap-mandatory gap-5 sm:grid sm:snap-none sm:grid-cols-3 sm:gap-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={cardContainerVariants}
                >
                  {groupServices.map((service) => {
                    const href = links[service.key as keyof typeof links] as string
                    const isCustom = service.price.amount === null
                    const unit = language === 'es' ? service.price.unitEs : service.price.unitEn
                    const tag = t(`services.${service.key}.tag`)
                    const hasTag = tag !== `services.${service.key}.tag`
                    const bullets = [
                      t(`services.${service.key}.bullet1`),
                      t(`services.${service.key}.bullet2`),
                      t(`services.${service.key}.bullet3`),
                    ]

                    return (
                      <motion.div
                        key={service.key}
                        variants={cardVariants}
                        whileHover={{ y: -6, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}
                        className="flex min-w-[80vw] shrink-0 snap-center flex-col rounded-sm border border-sw-line bg-sw-bg-2 p-6 sm:min-w-0 sm:shrink"
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className="text-lg font-semibold text-sw-fg-1">
                            {t(`services.${service.key}.name`)}
                          </h3>
                          <div className="text-right">
                            <span className="font-display text-xl text-sw-fg-1">
                              {isCustom ? t(`services.${service.key}.price`) : formatPrice(service.price.amount!, language)}
                            </span>
                            {!isCustom && (
                              <span className="ml-1 font-mono-label text-[11px] normal-case tracking-normal text-sw-fg-3">
                                {t('services.unit.iva')}
                              </span>
                            )}
                          </div>
                        </div>

                        {unit && (
                          <span className="mt-1 font-mono-label text-[11px] normal-case tracking-normal text-sw-fg-4">
                            {unit}
                          </span>
                        )}

                        {hasTag && (
                          <span className="mt-3 inline-block self-start rounded-sm border border-sw-secondary px-2 py-0.5 font-mono-label text-[11px] text-sw-secondary">
                            {tag}
                          </span>
                        )}

                        <p className="mt-3 text-sm text-sw-secondary">
                          {t(`services.${service.key}.tagline`)}
                        </p>

                        <Link
                          href={href}
                          className="mt-5 block rounded-sm border border-sw-line-strong px-4 py-3 text-center text-sm font-semibold text-sw-fg-1 transition-colors hover:border-sw-fg-1"
                        >
                          {t('services.viewDetail')}
                        </Link>

                        <div className="mt-6 flex flex-1 flex-col">
                          {bullets.map((bullet) => (
                            <p
                              key={bullet}
                              className="border-b border-sw-line py-3 text-sm text-sw-fg-2 last:border-b-0"
                            >
                              {bullet}
                            </p>
                          ))}
                        </div>

                        {(service.key === 'migration' || service.key === 'migrationPlus') && (
                          <p className="mt-3 text-xs text-sw-fg-4">{t('services.catalogNote')}</p>
                        )}
                      </motion.div>
                    )
                  })}
                </motion.div>
              </div>
            </div>
          )
        })}

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-sw-fg-4">
          {t('services.note')}
        </p>

        <div className="mt-12">
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-sm bg-sw-brand px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-sw-brand-hover"
          >
            {t('services.cta')}
          </motion.button>
        </div>
      </div>
    </section>
  )
}

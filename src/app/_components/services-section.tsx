"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { MoveRight } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useLocalizedLinks } from "@/hooks/useLocalizedLinks"
import { SERVICES } from "@/lib/services-config"

const cardContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function ServicesSection() {
  const { t } = useLanguage()
  const { links } = useLocalizedLinks()

  return (
    <section id="services-section" className="bg-sw-bg-1 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-6 sm:mb-12">
          <h2 className="font-display text-4xl text-sw-fg-1 sm:text-5xl lg:text-6xl">
            {t('services.title')}
          </h2>
          <p className="max-w-md text-lg text-sw-fg-2">{t('services.sub')}</p>
        </div>

        {/* Hint de swipe: solo mobile, donde las cards son un carrousel horizontal */}
        <div className="mb-3 flex items-center gap-2 text-sw-fg-4 sm:hidden">
          <span className="font-mono-label">{t('services.swipeHint')}</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
            className="flex"
          >
            <MoveRight className="h-4 w-4" aria-hidden="true" />
          </motion.span>
        </div>

        {/* Cards: scroll horizontal con snap en mobile, grid en desktop */}
        <div className="relative -mx-5 sm:mx-0">
          <div className="overflow-x-auto px-5 pb-2 sm:overflow-visible sm:px-0">
            <motion.div
              className="flex snap-x snap-mandatory gap-4 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardContainerVariants}
            >
              {SERVICES.map((service) => {
              const href = links[service.key as keyof typeof links] as string
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
                  className="flex w-[64%] min-w-0 shrink-0 snap-start flex-col rounded-sm border border-sw-line bg-sw-bg-2 p-6 sm:w-auto sm:shrink"
                >
                  {service.key === 'conversionAudit' && (
                    <span className="mb-3 inline-block w-fit rounded-sm bg-sw-bg-0 px-3 py-1 font-mono-label text-sw-secondary">
                      {t('services.conversionAudit.badge')}
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-sw-fg-1">
                    <Link href={href} className="transition-colors hover:text-sw-secondary">
                      {t(`services.${service.key}.name`)}
                    </Link>
                  </h3>

                  <p className="mt-3 text-sm text-sw-secondary">
                    {t(`services.${service.key}.tagline`)}
                  </p>

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

                  <a
                    href={links.contact}
                    className="mt-5 block rounded-sm bg-sw-brand px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-sw-brand-hover"
                  >
                    {t(service.key === 'conversionAudit' ? 'services.requestAudit' : 'services.requestQuote')}
                  </a>
                </motion.div>
              )
              })}
            </motion.div>
          </div>

          {/* Degradado que insinúa que hay más tarjetas fuera de vista, solo mobile */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-sw-bg-1 to-transparent sm:hidden"
            aria-hidden="true"
          />
        </div>

      </div>
    </section>
  )
}

"use client"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import AnimatedStat from "./animated-stat"

const HeaderHome = () => {
  const { t, language } = useLanguage()

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

  const currency = language === 'es' ? { prefix: '', suffix: '€' } : { prefix: '€', suffix: '' }

  return (
    <section className="bg-sw-bg-0 pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
      <div className="mx-auto max-w-7xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-7 flex items-center gap-3"
        >
          <span className="font-mono-label text-sw-fg-3">{t('hero.eyebrow')}</span>
        </motion.div>

        <h1 className="font-display text-5xl text-sw-fg-1 sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {t('hero.title.line1')}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-sw-secondary"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {t('hero.title.line2')}
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-sw-fg-2 sm:text-xl"
        >
          {t('hero.sub')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-sm bg-sw-brand px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-sw-brand-hover"
          >
            {t('hero.cta1')}
          </motion.button>
          <motion.button
            onClick={scrollToServices}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-sm border border-sw-line-strong px-7 py-4 text-base font-semibold text-sw-fg-1 transition-colors hover:border-sw-fg-1"
          >
            {t('hero.cta2')}
          </motion.button>
        </motion.div>

        <div className="mt-14 flex flex-wrap gap-8 border-t border-sw-line pt-7 sm:gap-16">
          <AnimatedStat
            target={1000}
            prefix="<"
            locale={language}
            label={t('hero.stat1.label')}
            delay={0}
          />
          <AnimatedStat
            target={2640}
            prefix={currency.prefix}
            suffix={currency.suffix}
            locale={language}
            label={t('hero.stat2.label')}
            delay={0.15}
          />
          <AnimatedStat
            staticValue={t('hero.stat3.num')}
            locale={language}
            label={t('hero.stat3.label')}
            delay={0.3}
          />
        </div>
      </div>
    </section>
  )
}

export default HeaderHome

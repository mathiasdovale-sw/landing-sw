"use client"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"

export default function CaseStudySection() {
  const { t } = useLanguage()

  const cards = [
    {
      title: t('casestudy.card1.title'),
      line: t('casestudy.card1.line'),
      result: t('casestudy.card1.result'),
    },
    {
      title: t('casestudy.card2.title'),
      line: t('casestudy.card2.line'),
      result: t('casestudy.card2.result'),
    },
  ]

  const scrollToContact = () => {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToCases = () => {
    const casesSection = document.getElementById('casos-reales');
    if (casesSection) {
      casesSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="casos-reales" className="py-16 sm:py-20 lg:py-24 bg-sw-bg-1">
      <div className="max-w-5xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-sw-fg-1 mb-4">
            {t('casestudy.title')}
          </h2>
          <p className="text-lg sm:text-xl text-sw-fg-2 max-w-2xl mx-auto leading-relaxed">
            {t('casestudy.subtitle')}
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div key={card.title} className="rounded-sm border border-sw-line bg-sw-bg-2 p-6 sm:p-8">
              <h3 className="font-display text-2xl sm:text-3xl text-sw-fg-1">
                {card.title}
              </h3>
              <p className="mt-2 text-sw-fg-2 leading-relaxed">
                {card.line}
              </p>
              <p className="mt-4 border-t border-sw-line pt-4 text-sw-secondary leading-relaxed">
                {card.result}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div className="mt-8 bg-sw-bg-0 border border-sw-line rounded-sm p-6 sm:p-8 text-center">
          <h4 className="font-display text-xl sm:text-2xl text-sw-fg-1 mb-3">
            {t('casestudy.cta.title')}
          </h4>
          <p className="text-sw-fg-2 mb-6 text-base sm:text-lg leading-relaxed">
            {t('casestudy.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <motion.button
              onClick={scrollToContact}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-sw-brand hover:bg-sw-brand-hover text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-sm transition-colors text-sm sm:text-base"
            >
              {t('casestudy.cta.button')}
            </motion.button>
            <motion.button
              onClick={scrollToCases}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="border border-sw-line-strong hover:border-sw-fg-1 text-sw-fg-1 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-sm transition-colors text-sm sm:text-base"
            >
              {t('casestudy.cta.viewcase')}
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

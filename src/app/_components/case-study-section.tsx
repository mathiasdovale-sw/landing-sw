"use client"
import { CheckCircle2, TrendingUp, Zap, Shield, Package } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import Image from "next/image"

export default function CaseStudySection() {
  const { t } = useLanguage()

  const results = [
    {
      icon: TrendingUp,
      text: t('casestudy.result1'),
    },
    {
      icon: Zap,
      text: t('casestudy.result2'),
    },
    {
      icon: CheckCircle2,
      text: t('casestudy.result3'),
    },
    {
      icon: Shield,
      text: t('casestudy.result4'),
    },
    {
      icon: Package,
      text: t('casestudy.result5'),
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

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-sw-bg-1">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block mb-4">
            <span className="font-mono-label text-sw-secondary bg-sw-bg-2 px-4 py-2 rounded-sm">
              {t('casestudy.badge')}
            </span>
          </div>

          {/* Client Logo */}
          <div className="flex justify-center mb-6">
            <div className="rounded-sm border border-sw-line p-6" style={{ backgroundColor: '#ffffff' }}>
              <Image
                src="/assets/img/canramos-logo.jpg"
                alt="Can Ramos Logo"
                width={300}
                height={200}
                className="h-16 sm:h-28 w-auto"
                priority
              />
            </div>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-sw-fg-1 mb-4 sm:mb-6 normal-case">
            {t('casestudy.title')}
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-sw-fg-2 max-w-3xl mx-auto leading-relaxed">
            {t('casestudy.subtitle')}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Story */}
          <div className="space-y-6 lg:space-y-8">
            {/* Challenge */}
            <div className="bg-sw-bg-0 rounded-sm p-6 sm:p-8 border border-sw-line">
              <h3 className="font-display text-2xl sm:text-3xl text-sw-fg-1 mb-4 normal-case">
                {t('casestudy.challenge.title')}
              </h3>
              <p className="text-sw-fg-2 leading-relaxed text-base sm:text-lg">
                {t('casestudy.challenge.description')}
              </p>
            </div>

            {/* Solution */}
            <div className="bg-sw-secondary-strong rounded-sm p-6 sm:p-8">
              <h3 className="font-display text-2xl sm:text-3xl text-white mb-4 normal-case">
                {t('casestudy.solution.title')}
              </h3>
              <p className="text-white leading-relaxed text-base sm:text-lg">
                {t('casestudy.solution.description')}
              </p>
            </div>

            {/* Expertise Section */}
            <div className="bg-sw-bg-2 rounded-sm p-6 sm:p-8 border border-sw-line">
              <h3 className="font-display text-2xl sm:text-3xl text-sw-fg-1 mb-4 normal-case">
                {t('casestudy.expertise.title')}
              </h3>
              <p className="text-sw-fg-2 leading-relaxed text-base sm:text-lg mb-4">
                {t('casestudy.expertise.description')}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="font-mono-label text-sw-secondary bg-sw-bg-0 px-3 py-1 rounded-sm">
                  {t('casestudy.expertise.tag1')}
                </span>
                <span className="font-mono-label text-sw-secondary bg-sw-bg-0 px-3 py-1 rounded-sm">
                  {t('casestudy.expertise.tag2')}
                </span>
                <span className="font-mono-label text-sw-secondary bg-sw-bg-0 px-3 py-1 rounded-sm">
                  {t('casestudy.expertise.tag3')}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6 lg:space-y-8">
            <div className="bg-sw-bg-0 rounded-sm p-6 sm:p-8 border border-sw-line">
              <h3 className="font-display text-2xl sm:text-3xl text-sw-fg-1 mb-6 normal-case">
                {t('casestudy.results.title')}
              </h3>
              <div className="space-y-4 sm:space-y-5">
                {results.map((result, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-sw-secondary-strong rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <result.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-sw-fg-2 text-base sm:text-lg leading-relaxed">
                        {result.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-sw-bg-2 border border-sw-line rounded-sm p-6 sm:p-8 text-center">
              <h4 className="font-display text-xl sm:text-2xl text-sw-fg-1 mb-3 normal-case">
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
                <motion.a
                  href="https://www.canramos.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="border border-sw-line-strong hover:border-sw-fg-1 text-sw-fg-1 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-sm transition-colors text-sm sm:text-base inline-flex items-center justify-center"
                >
                  {t('casestudy.cta.viewcase')}
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

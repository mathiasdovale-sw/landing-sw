"use client"
import { CheckCircle2, TrendingUp, Zap, Shield, Package } from "lucide-react"
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
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs sm:text-sm font-semibold text-orange-600 bg-orange-100 px-4 py-2 rounded-full tracking-wide uppercase">
              {t('casestudy.badge')}
            </span>
          </div>
          
          {/* Client Logo */}
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
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

          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-4 sm:mb-6 leading-tight tracking-tight">
            {t('casestudy.title')}
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto font-normal leading-relaxed">
            {t('casestudy.subtitle')}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Story */}
          <div className="space-y-6 lg:space-y-8">
            {/* Challenge */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
                {t('casestudy.challenge.title')}
              </h3>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg font-normal">
                {t('casestudy.challenge.description')}
              </p>
            </div>

            {/* Solution */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                {t('casestudy.solution.title')}
              </h3>
              <p className="text-white leading-relaxed text-base sm:text-lg font-normal">
                {t('casestudy.solution.description')}
              </p>
            </div>

            {/* Expertise Section */}
            <div className="bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                {t('casestudy.expertise.title')}
              </h3>
              <p className="text-gray-200 leading-relaxed text-base sm:text-lg font-normal mb-4">
                {t('casestudy.expertise.description')}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-semibold text-orange-400 bg-orange-950 px-3 py-1 rounded-full">
                  {t('casestudy.expertise.tag1')}
                </span>
                <span className="text-xs font-semibold text-orange-400 bg-orange-950 px-3 py-1 rounded-full">
                  {t('casestudy.expertise.tag2')}
                </span>
                <span className="text-xs font-semibold text-orange-400 bg-orange-950 px-3 py-1 rounded-full">
                  {t('casestudy.expertise.tag3')}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6 lg:space-y-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6">
                {t('casestudy.results.title')}
              </h3>
              <div className="space-y-4 sm:space-y-5">
                {results.map((result, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <result.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-gray-800 text-base sm:text-lg font-normal leading-relaxed">
                        {result.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 sm:p-8 shadow-lg text-center">
              <h4 className="text-xl sm:text-2xl font-extrabold text-white mb-3">
                {t('casestudy.cta.title')}
              </h4>
              <p className="text-gray-200 mb-6 text-base sm:text-lg font-normal leading-relaxed">
                {t('casestudy.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button 
                  onClick={scrollToContact}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  {t('casestudy.cta.button')}
                </button>
                <a
                  href="https://www.canramos.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-gray-100 text-gray-900 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base inline-flex items-center justify-center"
                >
                  {t('casestudy.cta.viewcase')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

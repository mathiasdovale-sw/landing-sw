"use client"
import { useLanguage } from '@/contexts/LanguageContext'

export default function CookiePolicyPage() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-24">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide mb-6"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            {t('cookies.title')}
          </h1>
          <p className="text-gray-400 text-lg">
            {t('cookies.subtitle')}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="space-y-8 text-gray-300">
            
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                {t('cookies.section1.title')}
              </h2>
              <p className="leading-relaxed">
                {t('cookies.section1.content')}
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                {t('cookies.section2.title')}
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">{t('cookies.section2.essential.title')}</h3>
                  <p className="leading-relaxed">{t('cookies.section2.essential.content')}</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">{t('cookies.section2.analytics.title')}</h3>
                  <p className="leading-relaxed">{t('cookies.section2.analytics.content')}</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">{t('cookies.section2.preferences.title')}</h3>
                  <p className="leading-relaxed">{t('cookies.section2.preferences.content')}</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                {t('cookies.section3.title')}
              </h2>
              <p className="leading-relaxed">
                {t('cookies.section3.content')}
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                {t('cookies.section4.title')}
              </h2>
              <p className="leading-relaxed">
                {t('cookies.section4.content')}
              </p>
            </section>

            {/* Contact */}
            <section className="bg-gray-800 rounded-2xl p-6 mt-12">
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                {t('cookies.contact.title')}
              </h2>
              <p className="leading-relaxed mb-4">
                {t('cookies.contact.content')}
              </p>
              <p className="text-orange-400">
                Email: contact@sellifyworks.com
              </p>
            </section>

            {/* Back Button */}
            <div className="text-center pt-8">
              <a
                href="/"
                className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
              >
                {t('cookies.back')}
              </a>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}

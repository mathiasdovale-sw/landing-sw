"use client"
import { useLanguage } from '@/contexts/LanguageContext'

export default function PrivacyPolicyPage() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-24">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide mb-6"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            {t('privacy.title')}
          </h1>
          <p className="text-gray-400 text-lg">
            {t('privacy.subtitle')}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="space-y-8 text-gray-300">
            
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                {t('privacy.section1.title')}
              </h2>
              <p className="leading-relaxed">
                {t('privacy.section1.content')}
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                {t('privacy.section2.title')}
              </h2>
              <p className="leading-relaxed mb-4">
                {t('privacy.section2.content')}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t('privacy.section2.item1')}</li>
                <li>{t('privacy.section2.item2')}</li>
                <li>{t('privacy.section2.item3')}</li>
                <li>{t('privacy.section2.item4')}</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                {t('privacy.section3.title')}
              </h2>
              <p className="leading-relaxed">
                {t('privacy.section3.content')}
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                {t('privacy.section4.title')}
              </h2>
              <p className="leading-relaxed">
                {t('privacy.section4.content')}
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                {t('privacy.section5.title')}
              </h2>
              <p className="leading-relaxed">
                {t('privacy.section5.content')}
              </p>
            </section>

            {/* Contact */}
            <section className="bg-gray-800 rounded-2xl p-6 mt-12">
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                {t('privacy.contact.title')}
              </h2>
              <p className="leading-relaxed mb-4">
                {t('privacy.contact.content')}
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
                {t('privacy.back')}
              </a>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}

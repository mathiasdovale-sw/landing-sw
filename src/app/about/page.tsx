"use client"
import type { Metadata } from "next"
import Image from "next/image"
import { Award, CheckCircle, Eye } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

// export const metadata: Metadata = {
//   title: "Sobre Nosotros - SellifyWorks",
//   description: "Conoce más sobre SellifyWorks y nuestro equipo de expertos en Shopify. Descubre nuestra misión, visión y experiencia en el desarrollo de tiendas online exitosas.",
//   openGraph: {
//     title: "Sobre Nosotros - SellifyWorks",
//     description: "Conoce más sobre SellifyWorks y nuestro equipo de expertos en Shopify.",
//     type: "website",
//   },
// }

export default function AboutPage() {
  const { t } = useLanguage()
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      {/* Hero Section */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-wide mb-6"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              {t('about.hero.title')}
            </h1>
            <p className="text-gray-300 text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
              {t('about.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Nuestra Historia Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide mb-6"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                {t('about.history.title')}
              </h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                {t('about.history.content')}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <Image
                src="/assets/img/rafiki1.svg"
                alt="Agencia Shopify Barcelona - Desarrollo de tiendas online"
                width={200}
                height={160}
                className="w-full h-auto max-w-md"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nuestra Misión Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center justify-center">
                <Image
                  src="/assets/img/Goal-rafiki.svg"
                  alt="Nuestra Misión - SellifyWorks"
                  width={400}
                  height={400}
                  className="w-full h-auto max-w-md"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide mb-6"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                {t('about.mission.title')}
              </h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                 {t('about.mission.content')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide mb-6"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              {t('about.values.title')}
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
              {/* Texto introductorio sobre valores */}
              {t('about.values.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Valor 1 */}
            <div className="bg-gray-800 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {t('about.values.quality.title')}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {t('about.values.quality.content')}
              </p>
            </div>

            {/* Valor 2 */}
            <div className="bg-gray-800 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {t('about.values.validation.title')}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {t('about.values.validation.content')}
              </p>
            </div>

            {/* Valor 3 */}
            <div className="bg-gray-800 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {t('about.values.transparency.title')}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {t('about.values.transparency.content')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide mb-6"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              {t('about.team.title')}
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
              {/* Texto introductorio sobre el equipo */}
              {t('about.team.subtitle')}
            </p>
          </div>

          <div className="flex justify-center">
            <div className="max-w-sm">
              {/* Miembro del equipo 1 */}
              <div className="bg-gray-800 rounded-2xl p-8 text-center">
                <div className="w-24 h-24 mx-auto mb-6 relative overflow-hidden rounded-full">
                  <Image
                    src="/assets/img/mathias.jpeg"
                    alt="Mathias Do Vale"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Mathias Do Vale
                </h3>
                <p className="text-orange-500 font-medium mb-4">{t('about.team.mathias.role')}</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {t('about.team.mathias.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide mb-6"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            {t('about.cta.title')}
          </h2>
          <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
            {t('about.cta.subtitle')}
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
          >
            {t('about.cta.button')}
          </a>
        </div>
      </section>
    </main>
  )
}

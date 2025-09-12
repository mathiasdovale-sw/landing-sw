import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Política de Cookies | SellifyWorks",
  description: "Política de cookies de SellifyWorks. Información sobre el uso de cookies en nuestro sitio web.",
  alternates: {
    canonical: '/es/politica-de-cookies',
    languages: {
      es: '/es/politica-de-cookies',
      en: '/en/cookie-policy',
    },
  },
}

export default function PoliticaDeCookiesPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-24">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide mb-6"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Política de Cookies
          </h1>
          <p className="text-gray-400 text-lg">
            Información sobre el uso de cookies en nuestro sitio web
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="space-y-8 text-gray-300">
            
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                ¿Qué son las cookies?
              </h2>
              <p className="leading-relaxed">
                Las cookies son archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web. Nos ayudan a mejorar la funcionalidad del sitio y tu experiencia de navegación.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                Tipos de cookies que utilizamos
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">Cookies esenciales</h3>
                  <p className="leading-relaxed">Necesarias para el funcionamiento básico del sitio web.</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">Cookies de análisis</h3>
                  <p className="leading-relaxed">Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web.</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">Cookies de preferencias</h3>
                  <p className="leading-relaxed">Recuerdan tus preferencias y configuraciones.</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                Control de cookies
              </h2>
              <p className="leading-relaxed">
                Puedes controlar y gestionar las cookies a través de la configuración de tu navegador. Ten en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad del sitio.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-gray-800 rounded-2xl p-6 mt-12">
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                Contacto
              </h2>
              <p className="leading-relaxed mb-4">
                Si tienes alguna pregunta sobre nuestra política de cookies, no dudes en contactarnos.
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
                Volver al inicio
              </a>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
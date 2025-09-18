import type { Metadata } from 'next'
import VisualBreadcrumbs from '@/app/_components/visual-breadcrumbs';
import { generatePageMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generatePageMetadata(
  'privacyPolicy',
  'es',
  'Política de Privacidad | SellifyWorks'
);

export default function PoliticaDePrivacidadPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      {/* Breadcrumbs */}
      <div className="background-color:#141417ff py-4">
        <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16">
          <VisualBreadcrumbs />
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-24">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide mb-6"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Política de Privacidad
          </h1>
          <p className="text-gray-400 text-lg">
            Información sobre cómo protegemos y utilizamos tus datos personales
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="space-y-8 text-gray-300">
            
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                Información que recopilamos
              </h2>
              <p className="leading-relaxed">
                Recopilamos información cuando te pones en contacto con nosotros a través de nuestros formularios, incluyendo tu nombre, email y mensaje.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                Cómo utilizamos tu información
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Para responder a tus consultas y solicitudes</li>
                <li>Para mejorar nuestros servicios</li>
                <li>Para enviarte información relevante sobre nuestros servicios (solo si lo autorizas)</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                Protección de datos
              </h2>
              <p className="leading-relaxed">
                Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tus datos personales contra el acceso no autorizado, alteración, divulgación o destrucción.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                Tus derechos
              </h2>
              <p className="leading-relaxed">
                Tienes derecho a acceder, rectificar, suprimir y limitar el tratamiento de tus datos personales. También puedes solicitar la portabilidad de tus datos.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-gray-800 rounded-2xl p-6 mt-12">
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                Contacto
              </h2>
              <p className="leading-relaxed mb-4">
                Si tienes alguna pregunta sobre nuestra política de privacidad o quieres ejercer tus derechos, contacta con nosotros.
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
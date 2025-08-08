import type { Metadata } from "next"
import Image from "next/image"
import { Award, CheckCircle, Eye } from "lucide-react"

export const metadata: Metadata = {
  title: "Sobre Nosotros - SellifyWorks",
  description: "Conoce más sobre SellifyWorks y nuestro equipo de expertos en Shopify. Descubre nuestra misión, visión y experiencia en el desarrollo de tiendas online exitosas.",
  openGraph: {
    title: "Sobre Nosotros - SellifyWorks",
    description: "Conoce más sobre SellifyWorks y nuestro equipo de expertos en Shopify.",
    type: "website",
  },
}

export default function AboutPage() {
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
              SOBRE NOSOTROS
            </h1>
            <p className="text-gray-300 text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
              Creamos experiencias de comercio electrónico excepcionales en Shopify.
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
                NUESTRA HISTORIA
              </h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                Este proyecto comenzó con una visión clara: mejorar la experiencia de compra en ecommerce mediante soluciones técnicas de alta calidad, enfocadas en Shopify. A partir de esa idea, SellifyWorks fue creciendo como una consultora técnica orientada a resultados reales, con un modelo de trabajo ágil, escalable y centrado en el cliente.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <Image
                src="/assets/img/shopifyLogo.png"
                alt="Agencia Shopify Barcelona - Desarrollo de tiendas online"
                width={200}
                height={160}
                className="w-48 h-auto sm:w-56 md:w-64 lg:w-72 xl:w-80 rounded-lg shadow-lg mb-3 sm:mb-4"
                priority
              />
              <div className="text-sm sm:text-base md:text-lg lg:text-xl font-medium tracking-widest text-white">AGENCY PARTNER</div>
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
                NUESTRA MISIÓN
              </h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                 Impulsamos negocios en ecommerce a través de soluciones técnicas personalizadas en Shopify. Nos enfocamos en automatizar procesos, optimizar el rendimiento de las tiendas y aplicar metodologías ágiles que aseguren entregas rápidas y de alta calidad.

Nuestro objetivo es que cada cliente pueda escalar sin preocuparse por la complejidad técnica, confiando en una consultora que pone la experiencia de usuario y la eficiencia operativa en el centro de cada decisión.
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
              NUESTROS VALORES
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
              {/* Texto introductorio sobre valores */}
              Los principios que guían nuestro trabajo y definen quiénes somos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Valor 1 */}
            <div className="bg-gray-800 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                CALIDAD
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Aplicamos prácticas de desarrollo como Extreme Programming porque creemos que una buena solución no solo debe funcionar, sino hacerlo bien, rápido y de forma sostenible.
              </p>
            </div>

            {/* Valor 2 */}
            <div className="bg-gray-800 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                VALIDACIÓN
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Creemos en la importancia de validar ideas y soluciones a través de pruebas constantes y feedback real. Esto nos permite ajustar y mejorar nuestros enfoques, asegurando que siempre estamos en el camino correcto.
              </p>
            </div>

            {/* Valor 3 */}
            <div className="bg-gray-800 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                TRANSPARENCIA
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Creemos en relaciones honestas, en procesos iterativos que permitan evolucionar constantemente, y en el compromiso innegociable de entregar valor en cada entrega.
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
              NUESTRO EQUIPO
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
              {/* Texto introductorio sobre el equipo */}
              Conoce a las personas que hacen posible el éxito de tu proyecto.
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
                <p className="text-orange-500 font-medium mb-4">FOUNDER</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Ingeniero en informática con mas de 10 años de experiencia en desarrollo de software.
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
            ¿LISTO PARA TRABAJAR JUNTOS?
          </h2>
          <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
            Descubre cómo podemos ayudarte a llevar tu negocio al siguiente nivel.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
          >
            Contactar con nosotros
          </a>
        </div>
      </section>
    </main>
  )
}

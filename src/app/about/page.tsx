import type { Metadata } from "next"

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
    <main className="min-h-screen" style={{ backgroundColor: '#010314' }}>
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
              {/* Aquí puedes agregar tu texto introductorio */}
              Somos SellifyWorks, especialistas en crear experiencias de comercio electrónico excepcionales en Shopify.
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
                  {/* Aquí puedes agregar el texto sobre vuestra historia */}
                  [Texto sobre la historia de la empresa - para completar]
                </p>
                <p>
                  {/* Más contenido sobre la historia */}
                  [Más detalles sobre el origen y evolución - para completar]
                </p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-2xl p-8 md:p-12">
              {/* Aquí puedes agregar una imagen o contenido visual */}
              <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Imagen/Contenido visual aquí</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestra Misión Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gray-800 rounded-2xl p-8 md:p-12">
                {/* Aquí puedes agregar una imagen o contenido visual */}
                <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Imagen/Contenido visual aquí</p>
                </div>
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
                  {/* Aquí puedes agregar el texto sobre vuestra misión */}
                  [Texto sobre la misión de la empresa - para completar]
                </p>
                <p>
                  {/* Más contenido sobre la misión */}
                  [Más detalles sobre objetivos y valores - para completar]
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
                {/* Aquí puedes agregar un icono */}
                <div className="w-8 h-8 bg-white rounded"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                [VALOR 1]
              </h3>
              <p className="text-gray-300 leading-relaxed">
                [Descripción del primer valor - para completar]
              </p>
            </div>

            {/* Valor 2 */}
            <div className="bg-gray-800 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                {/* Aquí puedes agregar un icono */}
                <div className="w-8 h-8 bg-white rounded"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                [VALOR 2]
              </h3>
              <p className="text-gray-300 leading-relaxed">
                [Descripción del segundo valor - para completar]
              </p>
            </div>

            {/* Valor 3 */}
            <div className="bg-gray-800 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                {/* Aquí puedes agregar un icono */}
                <div className="w-8 h-8 bg-white rounded"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                [VALOR 3]
              </h3>
              <p className="text-gray-300 leading-relaxed">
                [Descripción del tercer valor - para completar]
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Miembro del equipo 1 */}
            <div className="bg-gray-800 rounded-2xl p-8 text-center">
              <div className="w-24 h-24 bg-gray-600 rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                [NOMBRE]
              </h3>
              <p className="text-orange-500 font-medium mb-4">[CARGO]</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                [Breve descripción del miembro del equipo - para completar]
              </p>
            </div>

            {/* Miembro del equipo 2 */}
            <div className="bg-gray-800 rounded-2xl p-8 text-center">
              <div className="w-24 h-24 bg-gray-600 rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                [NOMBRE]
              </h3>
              <p className="text-orange-500 font-medium mb-4">[CARGO]</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                [Breve descripción del miembro del equipo - para completar]
              </p>
            </div>

            {/* Miembro del equipo 3 */}
            <div className="bg-gray-800 rounded-2xl p-8 text-center">
              <div className="w-24 h-24 bg-gray-600 rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                [NOMBRE]
              </h3>
              <p className="text-orange-500 font-medium mb-4">[CARGO]</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                [Breve descripción del miembro del equipo - para completar]
              </p>
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

import { Metadata } from 'next';
import FAQAccordion from '@/app/_components/faq-accordion';
import { abTestingShopifyFAQsEs } from '@/lib/faqs';
import SmoothScrollButton from '@/app/_components/smooth-scroll-button';
import { generatePageMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generatePageMetadata(
  'shopifyAbTesting',
  'es',
  'A/B Testing Shopify | SellifyWorks'
);

export default function ABTestingShopify() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[85vh] text-white flex items-center justify-center py-20 lg:py-32" style={{ backgroundColor: '#141417ff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-white mb-6" style={{ fontFamily: "sans-serif" }}>
              A/B TESTING
              <br />
              <span className="text-orange-300">SHOPIFY</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
              Pruebas A/B especializadas para tiendas Shopify. <strong className="text-white">Validamos cambios con datos reales</strong> 
              para optimizar conversiones y maximizar tus ingresos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/es/contacto" 
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 sm:py-5 sm:px-10 lg:py-6 lg:px-12 rounded-full text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Empezar Testing
              </a>
              <SmoothScrollButton
                href="#services" 
                targetSection="services"
                className="border-2 border-orange-300 text-orange-300 px-8 py-4 sm:py-5 sm:px-10 lg:py-6 lg:px-12 rounded-full font-bold text-lg sm:text-xl hover:bg-orange-300 hover:text-gray-900 transition-all duration-300"
              >
                Ver Qué Testeamos
              </SmoothScrollButton>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
              QUÉ TESTEAMOS
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-light">
              Elementos que optimizamos a través de pruebas A/B basadas en datos
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl border border-gray-700 hover:border-orange-300 transition-all duration-300 hover:bg-gray-800/50">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "sans-serif" }}>HEADLINES Y COPY</h3>
              <p className="text-gray-300 leading-relaxed">
                Testeamos diferentes titulares y textos persuasivos para aumentar conversiones
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-700 hover:border-orange-300 transition-all duration-300 hover:bg-gray-800/50">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "sans-serif" }}>PÁGINAS DE PRODUCTO</h3>
              <p className="text-gray-300 leading-relaxed">
                Optimización del diseño, imágenes y layout de páginas de producto
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-700 hover:border-orange-300 transition-all duration-300 hover:bg-gray-800/50">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "sans-serif" }}>PROCESO DE CHECKOUT</h3>
              <p className="text-gray-300 leading-relaxed">
                Variaciones del flujo de checkout para reducir abandono de carrito
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-700 hover:border-orange-300 transition-all duration-300 hover:bg-gray-800/50">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "sans-serif" }}>CTAS Y BOTONES</h3>
              <p className="text-gray-300 leading-relaxed">
                Diferentes llamadas a la acción y botones de compra para mayor efectividad
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-700 hover:border-orange-300 transition-all duration-300 hover:bg-gray-800/50">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "sans-serif" }}>PRECIOS Y OFERTAS</h3>
              <p className="text-gray-300 leading-relaxed">
                Diferentes estrategias de precios y ofertas promocionales
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-700 hover:border-orange-300 transition-all duration-300 hover:bg-gray-800/50">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "sans-serif" }}>ANÁLISIS DE RENDIMIENTO</h3>
              <p className="text-gray-300 leading-relaxed">
                Análisis estadístico y reporte de resultados de tests y mejoras
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
              PROCESO DE TESTING
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Cómo ejecutamos pruebas A/B científicas para optimizar tu tienda
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: "Bebas Neue, sans-serif" }}>1</div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "sans-serif" }}>HIPÓTESIS</h3>
              <p className="text-gray-600 leading-relaxed">Identificamos oportunidades y creamos hipótesis de testing</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: "Bebas Neue, sans-serif" }}>2</div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "sans-serif" }}>DISEÑO DEL TEST</h3>
              <p className="text-gray-600 leading-relaxed">Diseñamos variaciones y configuramos la prueba A/B</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: "Bebas Neue, sans-serif" }}>3</div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "sans-serif" }}>EJECUCIÓN Y MONITOREO</h3>
              <p className="text-gray-600 leading-relaxed">Ejecutamos el test y monitoreamos hasta obtener significancia estadística</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: "Bebas Neue, sans-serif" }}>4</div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "sans-serif" }}>IMPLEMENTACIÓN</h3>
              <p className="text-gray-600 leading-relaxed">Implementamos las variaciones ganadoras y planificamos próximos tests</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#141417ff' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight" style={{ fontFamily: "sans-serif" }}>
            ¿LISTO PARA TESTEAR Y
            <br />
            <span className="text-orange-300">OPTIMIZAR?</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
            Comienza a tomar decisiones basadas en datos para optimizar las conversiones de tu tienda Shopify
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/es/contacto" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 sm:py-5 sm:px-10 lg:py-6 lg:px-12 rounded-full text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Empezar A/B Testing
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion faqs={abTestingShopifyFAQsEs} />
        </div>
      </section>
    </>
  );
}
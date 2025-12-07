import { Metadata } from 'next';
import FAQAccordion from '@/app/_components/faq-accordion';
import SmoothScrollButton from '@/app/_components/smooth-scroll-button';
import ServiceStructuredData from '@/app/_components/service-structured-data';
import VisualBreadcrumbs from '@/app/_components/visual-breadcrumbs';
import RelatedServices from '@/app/_components/related-services';
import { shopifyPlusFAQsEs } from '@/lib/faqs';
import { generatePageMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generatePageMetadata(
  'shopifyPlus',
  'es',
  'Shopify Plus | SellifyWorks'
);

export default function ShopifyPlus() {
  return (
    <>
      <ServiceStructuredData 
        serviceName="Shopify Plus"
        serviceType="shopifyPlus"
        description="Soluciones avanzadas Shopify Plus para empresas de alto volumen. Desarrollo, configuración y optimización para tiendas enterprise."
        price={{
          currency: "EUR",
          priceRange: "Consultar"
        }}
      />
      <VisualBreadcrumbs />
      {/* Hero Section */}
      <section className="min-h-[85vh] text-white flex items-center justify-center py-20 lg:py-32" style={{ backgroundColor: '#141417ff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-white mb-6" style={{ fontFamily: "sans-serif" }}>
              SHOPIFY
              <br />
              <span className="text-orange-300">PLUS</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
              Soluciones enterprise con Shopify Plus para empresas de gran volumen. <strong className="text-white">Partner Shopify</strong>{' '}
              para escalabilidad avanzada y funcionalidades enterprise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/es/contacto" 
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 sm:py-5 sm:px-10 lg:py-6 lg:px-12 rounded-full text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Migrar a Plus
              </a>
              <SmoothScrollButton 
                href="#services"
                targetSection="services"
                className="border-2 border-orange-300 text-orange-300 px-8 py-4 sm:py-5 sm:px-10 lg:py-6 lg:px-12 rounded-full font-bold text-lg sm:text-xl hover:bg-orange-300 hover:text-gray-900 transition-all duration-300"
              >
                Ver Beneficios
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
              BENEFICIOS DE SHOPIFY PLUS
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-light">
              Funcionalidades enterprise para empresas de alto volumen
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl border border-gray-700">              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "sans-serif" }}>ESCALABILIDAD ENTERPRISE</h3>
              <p className="text-gray-300 leading-relaxed">
                Manejo de tráfico alto y transacciones ilimitadas para empresas grandes
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-700">              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "sans-serif" }}>FLOW AUTOMATIZACIONES</h3>
              <p className="text-gray-300 leading-relaxed">
                Automatización avanzada de procesos de negocio con Shopify Flow
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-700">              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "sans-serif" }}>MÚLTIPLES MERCADOS</h3>
              <p className="text-gray-300 leading-relaxed">
                Gestión de múltiples tiendas, mercados y expansión internacional
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-700">              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "sans-serif" }}>APIS ILIMITADAS</h3>
              <p className="text-gray-300 leading-relaxed">
                Acceso a APIs sin límites e integraciones complejas
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-700">              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "sans-serif" }}>CHECKOUT CUSTOMIZABLE</h3>
              <p className="text-gray-300 leading-relaxed">
                Personalización completa del proceso de checkout y experiencias B2B
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-700">              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "sans-serif" }}>SOPORTE PRIORITARIO</h3>
              <p className="text-gray-300 leading-relaxed">
                Acceso a soporte especializado en Shopify Plus y canales prioritarios
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
              PROCESO DE MIGRACIÓN
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Cómo te ayudamos a migrar o configurar Shopify Plus
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: "Bebas Neue, sans-serif" }}>1</div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "sans-serif" }}>EVALUACIÓN</h3>
              <p className="text-gray-600 leading-relaxed">Analizamos tus necesidades enterprise y volumen de negocio</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: "Bebas Neue, sans-serif" }}>2</div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "sans-serif" }}>ARQUITECTURA</h3>
              <p className="text-gray-600 leading-relaxed">Diseñamos la arquitectura enterprise óptima para tu negocio</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: "Bebas Neue, sans-serif" }}>3</div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "sans-serif" }}>IMPLEMENTACIÓN</h3>
              <p className="text-gray-600 leading-relaxed">Configuramos todas las funcionalidades Plus y automatizaciones</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: "Bebas Neue, sans-serif" }}>4</div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "sans-serif" }}>OPTIMIZACIÓN</h3>
              <p className="text-gray-600 leading-relaxed">Optimizamos performance y configuramos escalabilidad avanzada</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#141417ff' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight" style={{ fontFamily: "sans-serif" }}>
            ¿LISTO PARA SHOPIFY
            <br />
            <span className="text-orange-300">PLUS?</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
            Lleva tu empresa al siguiente nivel con las funcionalidades enterprise de Shopify Plus
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/es/contacto" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 sm:py-5 sm:px-10 lg:py-6 lg:px-12 rounded-full text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Migrar a Plus
            </a>
          </div>
        </div>
      </section>

      {/* Related Services Section */}
      <RelatedServices currentService="shopify-plus" />

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion faqs={shopifyPlusFAQsEs} />
        </div>
      </section>
    </>
  );
}
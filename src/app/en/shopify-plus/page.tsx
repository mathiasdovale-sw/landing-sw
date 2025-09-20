import { Metadata } from 'next';
import FAQAccordion from '@/app/_components/faq-accordion';
import SmoothScrollButton from '@/app/_components/smooth-scroll-button';
import ServiceStructuredData from '@/app/_components/service-structured-data';
import VisualBreadcrumbs from '@/app/_components/visual-breadcrumbs';
import { shopifyPlusFAQsEn } from '@/lib/faqs';
import { generatePageMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generatePageMetadata(
  'shopifyPlus',
  'en',
  'Shopify Plus | SellifyWorks'
);

export default function ShopifyPlus() {
  return (
    <>
      <ServiceStructuredData 
        serviceName="Shopify Plus"
        serviceType="shopifyPlus"
        description="Enterprise solutions with Shopify Plus for high-volume businesses. Certified partner for advanced scalability and custom integrations."
        price={{
          currency: "EUR",
          priceRange: "Consult"
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
              Enterprise solutions with Shopify Plus for high-volume businesses. <strong className="text-white">Shopify Partner for advanced scalability</strong>{' '}
              and enterprise functionalities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/en/contact" 
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 sm:py-5 sm:px-10 lg:py-6 lg:px-12 rounded-full text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Request Consulting
              </a>
              <SmoothScrollButton 
                href="#services"
                targetSection="services"
                className="border-2 border-orange-300 text-orange-300 px-8 py-4 sm:py-5 sm:px-10 lg:py-6 lg:px-12 rounded-full font-bold text-lg sm:text-xl hover:bg-orange-300 hover:text-gray-900 transition-all duration-300"
              >
                See Plus Features
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
              SHOPIFY PLUS FEATURES
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-light">
              Advanced enterprise functionalities for high-volume businesses
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl border border-gray-700 hover:border-orange-300 transition-all duration-300 hover:bg-gray-800/50">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "sans-serif" }}>ENTERPRISE FEATURES</h3>
              <p className="text-gray-300 leading-relaxed">
                Advanced tools designed for high-volume businesses and enterprise needs
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-700 hover:border-orange-300 transition-all duration-300 hover:bg-gray-800/50">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "sans-serif" }}>AUTOMATION WITH FLOW</h3>
              <p className="text-gray-300 leading-relaxed">
                Automate business processes and workflows without coding
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-700 hover:border-orange-300 transition-all duration-300 hover:bg-gray-800/50">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "sans-serif" }}>MULTIPLE MARKETS</h3>
              <p className="text-gray-300 leading-relaxed">
                Manage multiple stores and international markets from one dashboard
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-700 hover:border-orange-300 transition-all duration-300 hover:bg-gray-800/50">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "sans-serif" }}>UNLIMITED APIs</h3>
              <p className="text-gray-300 leading-relaxed">
                Unlimited API calls and customizable checkout for advanced integrations
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-700 hover:border-orange-300 transition-all duration-300 hover:bg-gray-800/50">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "sans-serif" }}>PRIORITY SUPPORT</h3>
              <p className="text-gray-300 leading-relaxed">
                Access to specialized Shopify Plus support and priority channels
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-700 hover:border-orange-300 transition-all duration-300 hover:bg-gray-800/50">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "sans-serif" }}>HIGH PERFORMANCE</h3>
              <p className="text-gray-300 leading-relaxed">
                Enhanced performance and scalability for high-traffic stores
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
              PLUS MIGRATION PROCESS
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light">
              How we migrate your store to Shopify Plus seamlessly
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: "Bebas Neue, sans-serif" }}>1</div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "sans-serif" }}>ELIGIBILITY ASSESSMENT</h3>
              <p className="text-gray-600 leading-relaxed">We evaluate if your business qualifies for Shopify Plus</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: "Bebas Neue, sans-serif" }}>2</div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "sans-serif" }}>MIGRATION PLANNING</h3>
              <p className="text-gray-600 leading-relaxed">We create a detailed migration plan and timeline</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: "Bebas Neue, sans-serif" }}>3</div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "sans-serif" }}>SETUP & CUSTOMIZATION</h3>
              <p className="text-gray-600 leading-relaxed">We configure Plus features and customize your store</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: "Bebas Neue, sans-serif" }}>4</div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "sans-serif" }}>TRAINING & SUPPORT</h3>
              <p className="text-gray-600 leading-relaxed">We train your team and provide ongoing support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#141417ff' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight" style={{ fontFamily: "sans-serif" }}>
            READY TO SCALE WITH
            <br />
            <span className="text-orange-300">SHOPIFY PLUS?</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
            Upgrade to enterprise-level ecommerce with advanced features and dedicated support
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/en/contact" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 sm:py-5 sm:px-10 lg:py-6 lg:px-12 rounded-full text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Upgrade to Plus
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion faqs={shopifyPlusFAQsEn} />
        </div>
      </section>
    </>
  );
}
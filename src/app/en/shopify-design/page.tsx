import { Metadata } from 'next';
import FAQAccordion from '@/app/_components/faq-accordion';
import SmoothScrollButton from '@/app/_components/smooth-scroll-button';
import ServiceStructuredData from '@/app/_components/service-structured-data';
import VisualBreadcrumbs from '@/app/_components/visual-breadcrumbs';
import RelatedServices from '@/app/_components/related-services';
import { disenoShopifyFAQsEn } from '@/lib/faqs';
import { generatePageMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generatePageMetadata(
  'shopifyDesign',
  'en',
  'Professional Shopify Design | SellifyWorks'
);

export default function ShopifyDesign() {
  return (
    <>
      <ServiceStructuredData 
        serviceName="Custom Shopify Design"
        serviceType="shopifyDesign"
        description="We create custom and responsive web designs for your Shopify store. User experience optimized to maximize conversions."
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
              PROFESSIONAL SHOPIFY
              <br />
              <span className="text-orange-300">DESIGN</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
              We create professional and responsive web designs for your Shopify store that not only look amazing, 
              but also <strong className="text-white">convert more visitors into customers</strong>.
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
                View Services
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
              WHAT OUR SERVICE INCLUDES
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-light">
              Complete and optimized design that drives your Shopify store sales
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl border border-gray-700">              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "sans-serif" }}>DESIGN THAT FITS YOUR BUDGET</h3>
              <p className="text-gray-300 leading-relaxed">
                From customized premium templates to 100% unique designs
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-700">              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "sans-serif" }}>MOBILE-FIRST & RESPONSIVE</h3>
              <p className="text-gray-300 leading-relaxed">
                Optimized for all devices, especially mobile
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-700">              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "sans-serif" }}>CONVERSION OPTIMIZED</h3>
              <p className="text-gray-300 leading-relaxed">
                We apply CRO principles to maximize your sales
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-700">              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "sans-serif" }}>SPEED OPTIMIZED</h3>
              <p className="text-gray-300 leading-relaxed">
                Clean and optimized code for ultra-fast loading
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-700">              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "sans-serif" }}>USER-CENTERED UX</h3>
              <p className="text-gray-300 leading-relaxed">
                Intuitive design that guides your customers to purchase
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-700">              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "sans-serif" }}>FULL SHOPIFY INTEGRATION</h3>
              <p className="text-gray-300 leading-relaxed">
                Compatible with all Shopify features and apps
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
              OUR DESIGN PROCESS
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light">
              A proven process that guarantees exceptional results
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: "Bebas Neue, sans-serif" }}>1</div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "sans-serif" }}>ANALYSIS & STRATEGY</h3>
              <p className="text-gray-600 leading-relaxed">We study your brand, competition and objectives</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: "Bebas Neue, sans-serif" }}>2</div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "sans-serif" }}>WIREFRAMES & UX</h3>
              <p className="text-gray-600 leading-relaxed">We create the structure and optimal user flow</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: "Bebas Neue, sans-serif" }}>3</div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "sans-serif" }}>DESIGN & CUSTOMIZATION</h3>
              <p className="text-gray-600 leading-relaxed">We create the perfect design solution for your brand</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: "Bebas Neue, sans-serif" }}>4</div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "sans-serif" }}>DEVELOPMENT & TESTING</h3>
              <p className="text-gray-600 leading-relaxed">We implement on Shopify and optimize everything</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#141417ff' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight" style={{ fontFamily: "sans-serif" }}>
            READY TO TRANSFORM
            <br />
            <span className="text-orange-300">YOUR SHOPIFY STORE?</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
            Get a design that not only looks amazing, but also drives your sales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/en/contact" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 sm:py-5 sm:px-10 lg:py-6 lg:px-12 rounded-full text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Request Free Proposal
            </a>
          </div>
        </div>
      </section>

      {/* Related Services Section */}
      <RelatedServices currentService="shopify-design" />

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion faqs={disenoShopifyFAQsEn} />
        </div>
      </section>
    </>
  );
}
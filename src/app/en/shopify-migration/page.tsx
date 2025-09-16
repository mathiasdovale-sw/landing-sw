import { Metadata } from 'next';
import FAQAccordion from '@/app/_components/faq-accordion';
import SmoothScrollButton from '@/app/_components/smooth-scroll-button';
import { migracionShopifyFAQsEn } from '@/lib/faqs';

export const metadata: Metadata = {
  title: 'Shopify Migration | SellifyWorks',
  description: 'We migrate your existing store to Shopify without losing data. Safe and optimized process to minimize downtime.',
};

export default function ShopifyMigration() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[70vh] text-white flex items-center justify-center py-20 lg:py-32" style={{ backgroundColor: '#141417ff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-white mb-6" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
              SHOPIFY
              <br />
              <span className="text-orange-300">MIGRATION</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
              We migrate your existing store to Shopify without losing data. <strong className="text-white">Safe and optimized process</strong> 
              to minimize downtime and preserve your SEO.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/en/contact" 
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 sm:py-5 sm:px-10 lg:py-6 lg:px-12 rounded-full text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Migration
              </a>
              <SmoothScrollButton 
                href="#services"
                targetSection="services"
                className="border-2 border-orange-300 text-orange-300 px-8 py-4 sm:py-5 sm:px-10 lg:py-6 lg:px-12 rounded-full font-bold text-lg sm:text-xl hover:bg-orange-300 hover:text-gray-900 transition-all duration-300"
              >
                See Migration Process
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
              WHAT MIGRATION INCLUDES
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-light">
              Complete and secure process to move your store to Shopify
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl border border-gray-700 hover:border-orange-300 transition-all duration-300 hover:bg-gray-800/50">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "Bebas Neue, sans-serif" }}>COMPLETE DATA MIGRATION</h3>
              <p className="text-gray-300 leading-relaxed">
                Products, customers, orders and content without data loss
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-700 hover:border-orange-300 transition-all duration-300 hover:bg-gray-800/50">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "Bebas Neue, sans-serif" }}>SEO PRESERVATION</h3>
              <p className="text-gray-300 leading-relaxed">
                301 redirects and URL optimization to maintain your rankings
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-700 hover:border-orange-300 transition-all duration-300 hover:bg-gray-800/50">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "Bebas Neue, sans-serif" }}>PAYMENT SETUP</h3>
              <p className="text-gray-300 leading-relaxed">
                Configuration of payment methods and gateways in Shopify
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-700 hover:border-orange-300 transition-all duration-300 hover:bg-gray-800/50">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "Bebas Neue, sans-serif" }}>PRE-LAUNCH TESTING</h3>
              <p className="text-gray-300 leading-relaxed">
                Exhaustive testing to ensure everything works perfectly
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-700 hover:border-orange-300 transition-all duration-300 hover:bg-gray-800/50">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "Bebas Neue, sans-serif" }}>ADMIN TRAINING</h3>
              <p className="text-gray-300 leading-relaxed">
                Complete training to manage your new Shopify store
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-700 hover:border-orange-300 transition-all duration-300 hover:bg-gray-800/50">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: "Bebas Neue, sans-serif" }}>SECURE PROCESS</h3>
              <p className="text-gray-300 leading-relaxed">
                Secure migration with backups and minimal downtime
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
              MIGRATION PROCESS
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light">
              How we migrate your store to Shopify safely and efficiently
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: "Bebas Neue, sans-serif" }}>1</div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "Bebas Neue, sans-serif" }}>ANALYSIS & PLANNING</h3>
              <p className="text-gray-600 leading-relaxed">We analyze your current store and plan the migration</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: "Bebas Neue, sans-serif" }}>2</div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "Bebas Neue, sans-serif" }}>DATA MIGRATION</h3>
              <p className="text-gray-600 leading-relaxed">We migrate all data, products and configurations</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: "Bebas Neue, sans-serif" }}>3</div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "Bebas Neue, sans-serif" }}>TESTING & OPTIMIZATION</h3>
              <p className="text-gray-600 leading-relaxed">We test everything and optimize for performance</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: "Bebas Neue, sans-serif" }}>4</div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "Bebas Neue, sans-serif" }}>LAUNCH & SUPPORT</h3>
              <p className="text-gray-600 leading-relaxed">We launch your new store and provide training</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#141417ff' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
            READY TO MIGRATE TO
            <br />
            <span className="text-orange-300">SHOPIFY?</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
            Migrate your store safely without losing data or SEO rankings
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/en/contact" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 sm:py-5 sm:px-10 lg:py-6 lg:px-12 rounded-full text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Migration
            </a>
            <a 
              href="tel:+34900000000" 
              className="border-2 border-orange-300 text-orange-300 px-8 py-4 sm:py-5 sm:px-10 lg:py-6 lg:px-12 rounded-full font-bold text-lg sm:text-xl hover:bg-orange-300 hover:text-gray-900 transition-all duration-300"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion faqs={migracionShopifyFAQsEn} />
        </div>
      </section>
    </>
  );
}
import type { Metadata } from 'next'
import VisualBreadcrumbs from '@/app/_components/visual-breadcrumbs';
import { generatePageMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generatePageMetadata(
  'cookiePolicy',
  'en',
  'Cookie Policy | SellifyWorks'
);

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <VisualBreadcrumbs />
      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-24">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide mb-6"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Cookie Policy
          </h1>
          <p className="text-gray-400 text-lg">
            Information about the use of cookies on our website
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="space-y-8 text-gray-300">
            
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                What are cookies?
              </h2>
              <p className="leading-relaxed">
                Cookies are text files that are stored on your device when you visit our website. They help us improve the site's functionality and your browsing experience.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                Types of cookies we use
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">Essential cookies</h3>
                  <p className="leading-relaxed">Necessary for the basic functioning of the website.</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">Analytics cookies</h3>
                  <p className="leading-relaxed">Help us understand how visitors interact with our website.</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">Preference cookies</h3>
                  <p className="leading-relaxed">Remember your preferences and settings.</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                Cookie control
              </h2>
              <p className="leading-relaxed">
                You can control and manage cookies through your browser settings. Please note that disabling certain cookies may affect the site's functionality.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-gray-800 rounded-2xl p-6 mt-12">
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                Contact
              </h2>
              <p className="leading-relaxed mb-4">
                If you have any questions about our cookie policy, please don't hesitate to contact us.
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
                Back to Home
              </a>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
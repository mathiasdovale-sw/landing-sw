import type { Metadata } from 'next'
import VisualBreadcrumbs from '@/app/_components/visual-breadcrumbs';
import { generatePageMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generatePageMetadata(
  'privacyPolicy',
  'en',
  'Privacy Policy | SellifyWorks'
);

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <VisualBreadcrumbs maxWidth="max-w-4xl" />
      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-24">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide mb-6"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-lg">
            Information about how we protect and use your personal data
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="space-y-8 text-gray-300">
            
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                Information we collect
              </h2>
              <p className="leading-relaxed">
                We collect information when you contact us through our forms, including your name, email, and message.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                How we use your information
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>To respond to your inquiries and requests</li>
                <li>To improve our services</li>
                <li>To send you relevant information about our services (only with your authorization)</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                Data protection
              </h2>
              <p className="leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                Your rights
              </h2>
              <p className="leading-relaxed">
                You have the right to access, rectify, delete, and limit the processing of your personal data. You can also request data portability.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-gray-800 rounded-2xl p-6 mt-12">
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                Contact
              </h2>
              <p className="leading-relaxed mb-4">
                If you have any questions about our privacy policy or want to exercise your rights, please contact us.
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
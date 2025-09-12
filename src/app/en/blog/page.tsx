import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Blog | SellifyWorks - Shopify Tips and Strategies",
  description: "Discover the latest trends, tips and strategies to optimize your Shopify store with our specialized articles.",
  alternates: {
    canonical: '/en/blog',
    languages: {
      es: '/es/blog',
      en: '/en/blog',
    },
  },
}

export default function BlogPage() {
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
              BLOG
            </h1>
            <p className="text-gray-300 text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
              Tips, strategies and the latest trends to optimize your Shopify store
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gray-800 rounded-2xl p-8 md:p-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              Coming Soon
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              We're preparing valuable content about Shopify development, online store optimization and ecommerce best practices.
            </p>
            <p className="text-gray-400 mb-8">
              In the meantime, don't hesitate to contact us for any questions about your Shopify project.
            </p>
            <Link
              href="/en/contact"
              className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
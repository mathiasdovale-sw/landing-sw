import type { Metadata } from 'next'
import Link from 'next/link'
import VisualBreadcrumbs from '@/app/_components/visual-breadcrumbs';
import { generatePageMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generatePageMetadata(
  'blog',
  'es',
  'Blog | SellifyWorks - Consejos y Estrategias Shopify'
)

export default function BlogPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <VisualBreadcrumbs />
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
              Consejos, estrategias y las últimas tendencias para optimizar tu tienda Shopify
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
              Próximamente
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Estamos preparando contenido de gran valor sobre desarrollo Shopify, optimización de tiendas online y las mejores prácticas de ecommerce.
            </p>
            <p className="text-gray-400 mb-8">
              Mientras tanto, no dudes en contactarnos para cualquier consulta sobre tu proyecto Shopify.
            </p>
            <Link
              href="/es/contacto"
              className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
            >
              Contactar con nosotros
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
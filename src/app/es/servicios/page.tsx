import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { getDictionary } from '@/lib/dictionaries'
import { generatePageMetadata } from "@/lib/seo-utils";
import AutoBreadcrumbStructuredData from '@/app/_components/auto-breadcrumb-structured-data';
import VisualBreadcrumbs from '@/app/_components/visual-breadcrumbs';
import FAQAccordion from '@/app/_components/faq-accordion';
import { servicesPageFAQsEs } from '@/lib/faqs';

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary('es')
  
  return generatePageMetadata(
    'services',
    'es',
    dict.services.metadata.title
  )
}

export default async function ServicesPage() {
  const dict = await getDictionary('es')
  
  return (
    <main className="min-h-screen">
      <AutoBreadcrumbStructuredData />
      <VisualBreadcrumbs maxWidth="max-w-6xl" />
      
      {/* Hero Section */}
      <section className="min-h-[85vh] text-white flex items-center justify-center py-20 lg:py-32" style={{ backgroundColor: '#141417ff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-white mb-6">
              {dict.services.hero.title}
              <br />
              <span className="text-orange-300">SHOPIFY</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
              {dict.services.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
              NUESTROS SERVICIOS
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-light">
              Soluciones especializadas para hacer crecer tu negocio online
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dict.services.list.map((service, index) => (
              <Link
                key={index}
                href={service.link}
                className="group text-center p-8 rounded-xl border border-gray-700 hover:border-orange-300 transition-all duration-300 hover:bg-gray-800/50"
              >
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-orange-300 transition-colors duration-300" style={{ fontFamily: "sans-serif" }}>
                  {service.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed mb-4">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-center text-orange-300 group-hover:translate-x-1 transition-transform duration-300">
                  <span className="text-sm font-semibold">Ver más</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#141417ff' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight" style={{ fontFamily: "sans-serif" }}>
            ¿LISTO PARA HACER
            <br />
            <span className="text-orange-300">CRECER TU NEGOCIO?</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
            Nuestro equipo de expertos está listo para ayudarte a llevar tu negocio al siguiente nivel. Contáctanos para una consulta gratuita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/es/contacto"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 sm:py-5 sm:px-10 lg:py-6 lg:px-12 rounded-full text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Contactar ahora
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion faqs={servicesPageFAQsEs} />
        </div>
      </section>
    </main>
  )
}
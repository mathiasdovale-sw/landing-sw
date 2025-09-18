import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Award, CheckCircle, Eye } from 'lucide-react'
import { getDictionary } from '@/lib/dictionaries'
import { generatePageMetadata } from "@/lib/seo-utils";
import OrganizationStructuredData from '@/app/_components/organization-structured-data';
import AutoBreadcrumbStructuredData from '@/app/_components/auto-breadcrumb-structured-data';
import VisualBreadcrumbs from '@/app/_components/visual-breadcrumbs';

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary('es')
  
  return generatePageMetadata(
    'about',
    'es',
    dict.about.metadata.title
  )
}

export default async function AboutPage() {
  const dict = await getDictionary('es')
  
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <AutoBreadcrumbStructuredData />
      <VisualBreadcrumbs maxWidth="max-w-6xl" />
      <OrganizationStructuredData 
        description={dict.about.metadata.description}
        specialties={["Desarrollo Shopify", "SEO", "CRO", "Diseño Web", "Consultoría"]}
      />
      {/* Hero Section */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-wide mb-6"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              {dict.about.hero.title}
            </h1>
            <p className="text-gray-300 text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
              {dict.about.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Nuestra Historia Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide mb-6"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                {dict.about.history.title}
              </h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  {dict.about.history.content}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <Image
                src="/assets/img/rafiki1.svg"
                alt="Agencia Shopify Barcelona - Desarrollo de Tiendas Online"
                width={200}
                height={160}
                className="w-full h-auto max-w-md"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nuestra Misión Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center justify-center">
                <Image
                  src="/assets/img/Goal-rafiki.svg"
                  alt="Nuestra Misión - SellifyWorks"
                  width={400}
                  height={400}
                  className="w-full h-auto max-w-md"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide mb-6"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                {dict.about.mission.title}
              </h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  {dict.about.mission.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestros Valores Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide mb-6"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              {dict.about.values.title}
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
              {dict.about.values.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Calidad */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                {dict.about.values.quality.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {dict.about.values.quality.content}
              </p>
            </div>

            {/* Validación */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                {dict.about.values.validation.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {dict.about.values.validation.content}
              </p>
            </div>

            {/* Transparencia */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <Eye className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                {dict.about.values.transparency.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {dict.about.values.transparency.content}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestro Equipo Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide mb-6"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              {dict.about.team.title}
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
              {dict.about.team.subtitle}
            </p>
          </div>

          <div className="flex justify-center">
            <div className="text-center max-w-sm">
              <div className="mb-6">
                <Image
                  src="/assets/img/mathias.jpeg"
                  alt="Mathias Do Vale - Founder SellifyWorks"
                  width={200}
                  height={200}
                  className="w-48 h-48 rounded-full mx-auto object-cover"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Mathias Do Vale
              </h3>
              <p className="text-orange-500 font-medium mb-4">
                {dict.about.team.mathias.role}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {dict.about.team.mathias.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide mb-6"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            {dict.about.cta.title}
          </h2>
          <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
            {dict.about.cta.subtitle}
          </p>
          <Link
            href="/es/contacto"
            className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
          >
            {dict.about.cta.button}
          </Link>
        </div>
      </section>
    </main>
  )
}
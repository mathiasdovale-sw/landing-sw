import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getDictionary } from '@/lib/dictionaries'
import { generatePageMetadata } from "@/lib/seo-utils"
import OrganizationStructuredData from '@/app/_components/organization-structured-data'
import AutoBreadcrumbStructuredData from '@/app/_components/auto-breadcrumb-structured-data'
import VisualBreadcrumbs from '@/app/_components/visual-breadcrumbs'

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary('es')

  return generatePageMetadata(
    'about',
    'es',
    dict.about.metadata.title,
    dict.about.metadata.description
  )
}

export default async function AboutPage() {
  const dict = await getDictionary('es')
  const values = [dict.about.values.outcomes, dict.about.values.data, dict.about.values.honesty]

  return (
    <main>
      <AutoBreadcrumbStructuredData />
      <VisualBreadcrumbs maxWidth="max-w-6xl" />
      <OrganizationStructuredData description={dict.about.metadata.description} />

      {/* Hero */}
      <section className="bg-sw-bg-0 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 text-center">
          <span className="font-mono-label text-sw-fg-3">{dict.about.hero.eyebrow}</span>
          <h1 className="mt-5 font-display text-4xl text-sw-fg-1 sm:text-5xl lg:text-6xl">
            {dict.about.hero.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-sw-fg-2 sm:text-xl">
            {dict.about.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Por qué existimos */}
      <section className="bg-sw-bg-1 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-12 flex items-center justify-between">
            <span className="font-mono-label text-sw-fg-3">{dict.about.why.eyebrow}</span>
            <span className="font-mono-label text-sw-fg-3">01</span>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <h2 className="font-display text-3xl text-sw-fg-1 sm:text-4xl lg:text-5xl">
              {dict.about.why.title}
            </h2>
            <div className="flex flex-col gap-6 pt-2">
              <p className="text-lg leading-relaxed text-sw-fg-2 sm:text-xl">
                {dict.about.why.p1}
              </p>
              <p className="text-lg leading-relaxed text-sw-fg-1 sm:text-xl">
                {dict.about.why.p2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section className="bg-sw-bg-0 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-12 flex items-center justify-between">
            <span className="font-mono-label text-sw-fg-3">{dict.about.values.eyebrow}</span>
            <span className="font-mono-label text-sw-fg-3">02</span>
          </div>

          <h2 className="mb-12 font-display text-3xl text-sw-fg-1 sm:text-4xl lg:text-5xl">
            {dict.about.values.title}
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {values.map((value, index) => (
              <div key={value.title} className="rounded-sm border border-sw-line bg-sw-bg-2 p-6">
                <span className="font-mono-label text-sw-secondary">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-lg font-semibold text-sw-fg-1">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sw-fg-2">{value.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="bg-sw-bg-1 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-12 flex items-center justify-between">
            <span className="font-mono-label text-sw-fg-3">{dict.about.team.eyebrow}</span>
            <span className="font-mono-label text-sw-fg-3">03</span>
          </div>

          <div className="flex flex-col items-center gap-6 rounded-sm border border-sw-line bg-sw-bg-2 p-8 text-center sm:max-w-md sm:mx-auto">
            <Image
              src="/assets/img/mathias.jpeg"
              alt="Mathias Do Vale - Founder SellifyWorks"
              width={112}
              height={112}
              className="h-28 w-28 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-sw-fg-1">Mathias Do Vale</h3>
              <p className="font-mono-label text-sw-secondary">{dict.about.team.mathias.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-sw-fg-2">
                {dict.about.team.mathias.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sw-bg-0 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="font-display text-3xl text-sw-fg-1 sm:text-4xl lg:text-5xl">
            {dict.about.cta.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-sw-fg-2">{dict.about.cta.subtitle}</p>
          <div className="mt-9">
            <Link
              href="/es/contacto"
              className="inline-block rounded-sm bg-sw-brand px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-sw-brand-hover"
            >
              {dict.about.cta.button}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

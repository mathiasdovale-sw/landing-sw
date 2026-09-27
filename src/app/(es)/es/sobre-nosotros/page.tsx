import type { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionaries'
import { generatePageMetadata } from '@/lib/seo-utils'
import AboutPageContent, { type AboutContent } from '@/app/_components/about-page'

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

  return <AboutPageContent content={dict.about as AboutContent} contactHref="/es/contacto" />
}

import type { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionaries'
import { generatePageMetadata } from '@/lib/seo-utils'
import AboutPageContent, { type AboutContent } from '@/app/_components/about-page'

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary('en')

  return generatePageMetadata(
    'about',
    'en',
    dict.about.metadata.title,
    dict.about.metadata.description
  )
}

export default async function AboutPage() {
  const dict = await getDictionary('en')

  return <AboutPageContent content={dict.about as AboutContent} contactHref="/en/contact" />
}

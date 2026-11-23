import Reveal from "@/app/_components/reveal";
import CaseStudySection from "@/app/_components/case-study-section";
import ContactSection from "@/app/_components/contact-section";
import Hero from "@/app/_components/home/hero";
import Commitments from "@/app/_components/home/commitments";
import Services from "@/app/_components/home/services";
import Solutions from "@/app/_components/home/solutions";
import AboutMe from "@/app/_components/about-me";
import MobileStickyCta from "@/app/_components/mobile-sticky-cta";
import type { Metadata } from 'next'
import { HomeFAQsEn } from "@/lib/faqs";
import FAQAccordion from "@/app/_components/faq-accordion";
import { generatePageMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generatePageMetadata(
  'home',
  'en',
  'Digital growth agency for marketing and technology — SellifyWorks'
)

// English home. Same structure as the Spanish one; single repeated CTA: the no-obligation quote (#contacto).
export default function HomePage() {
  return (
    <main>
      <Hero locale="en" />
      <Commitments locale="en" />
      <Reveal><Solutions locale="en" /></Reveal>
      <Reveal><Services locale="en" /></Reveal>
      <Reveal><CaseStudySection locale="en" title="Projects" homeTags /></Reveal>
      <Reveal><AboutMe locale="en" /></Reveal>
      <Reveal>
        <FAQAccordion
          faqs={HomeFAQsEn}
          title="Frequently asked questions"
          className="bg-sw-bg-1"
        />
      </Reveal>
      <Reveal><ContactSection /></Reveal>
      <MobileStickyCta locale="en" />
    </main>
  );
}

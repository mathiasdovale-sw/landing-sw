import Reveal from "@/app/_components/reveal";
import HowIWorkSection from "@/app/_components/how-i-work-section";
import CaseStudySection from "@/app/_components/case-study-section";
import ContactSection from "@/app/_components/contact-section";
import Hero from "@/app/_components/home/hero";
import Commitments from "@/app/_components/home/commitments";
import Services from "@/app/_components/home/services";
import AboutMe from "@/app/_components/about-me";
import MobileStickyCta from "@/app/_components/mobile-sticky-cta";
import Link from "next/link";
import type { Metadata } from 'next'
import { HomeFAQsEn } from "@/lib/faqs";
import FAQAccordion from "@/app/_components/faq-accordion";
import { generatePageMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generatePageMetadata(
  'home',
  'en',
  'Shopify stores without limits — SellifyWorks'
)

// English home. Same structure as the Spanish one; single repeated CTA: the free meeting (#contacto).
export default function HomePage() {
  return (
    <main>
      <Hero locale="en" />
      <Commitments locale="en" />

      <Reveal><CaseStudySection locale="en" /></Reveal>
      <Reveal><AboutMe locale="en" /></Reveal>
      <Reveal><Services locale="en" /></Reveal>
      <Reveal>
        <HowIWorkSection locale="en" ctaHref="#contacto" className="border-t border-sw-line" />
      </Reveal>
      <Reveal>
        <FAQAccordion
          faqs={HomeFAQsEn}
          title="Frequently asked questions"
          className="bg-sw-bg-1"
          footer={
            <>
              Moving your store?{" "}
              <Link href="/en/shopify-migration#preguntas" className="font-semibold text-sw-brand underline-offset-4 hover:underline">
                All the questions about the migration are here.
              </Link>
            </>
          }
        />
      </Reveal>
      <Reveal><ContactSection /></Reveal>
      <MobileStickyCta locale="en" />
    </main>
  );
}

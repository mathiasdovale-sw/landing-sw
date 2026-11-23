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
import { HomeFAQsEs } from "@/lib/faqs";
import FAQAccordion from "@/app/_components/faq-accordion";
import { generatePageMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generatePageMetadata(
  'home',
  'es',
  'Agencia de crecimiento digital que une marketing y tecnología — SellifyWorks'
)

// Home en español. Un único CTA repetido: presupuesto sin compromiso (#contacto).
export default function HomePage() {
  return (
    <main>
      <Hero locale="es" />
      <Commitments locale="es" />
      <Reveal><Solutions locale="es" /></Reveal>
      <Reveal><Services locale="es" /></Reveal>
      <Reveal><CaseStudySection locale="es" title="Proyectos" homeTags /></Reveal>
      <Reveal><AboutMe locale="es" /></Reveal>
      <Reveal>
        <FAQAccordion
          faqs={HomeFAQsEs}
          title="Preguntas frecuentes"
          className="bg-sw-bg-1"
        />
      </Reveal>
      <Reveal><ContactSection /></Reveal>
      <MobileStickyCta locale="es" />
    </main>
  );
}

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
import { HomeFAQsEs } from "@/lib/faqs";
import FAQAccordion from "@/app/_components/faq-accordion";
import { generatePageMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generatePageMetadata(
  'home',
  'es',
  'Tiendas Shopify sin límites — SellifyWorks'
)

// Home en español. Un único CTA repetido: la reunión gratis (#contacto).
export default function HomePage() {
  return (
    <main>
      <Hero locale="es" />
      <Commitments locale="es" />

      <Reveal><CaseStudySection locale="es" /></Reveal>
      <Reveal><AboutMe locale="es" /></Reveal>
      <Reveal><Services locale="es" /></Reveal>
      <Reveal>
        <HowIWorkSection locale="es" ctaHref="#contacto" className="border-t border-sw-line" />
      </Reveal>
      <Reveal>
        <FAQAccordion
          faqs={HomeFAQsEs}
          title="Preguntas frecuentes"
          className="bg-sw-bg-1"
          footer={
            <>
              ¿Vas a migrar tu tienda?{" "}
              <Link href="/es/migracion-shopify#preguntas" className="font-semibold text-sw-brand underline-offset-4 hover:underline">
                Tienes todas las preguntas sobre la migración aquí.
              </Link>
            </>
          }
        />
      </Reveal>
      <Reveal><ContactSection /></Reveal>
      <MobileStickyCta locale="es" />
    </main>
  );
}

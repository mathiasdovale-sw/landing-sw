import Reveal from "@/app/_components/reveal";
import Marquee from "@/app/_components/marquee";
import FunnelLeakSection from "@/app/_components/funnel-leak-section";
import HowIWorkSection, { HOME_ES_COPY } from "@/app/_components/how-i-work-section";
import CaseStudySection from "@/app/_components/case-study-section";
import ContactSection from "@/app/_components/contact-section";
import Hero from "@/app/_components/home/hero";
import Problem from "@/app/_components/home/problem";
import HowIDoIt from "@/app/_components/home/how-i-do-it";
import type { Metadata } from 'next'
import { HomeFAQsEs } from "@/lib/faqs";
import FAQAccordion from "@/app/_components/faq-accordion";
import { generatePageMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generatePageMetadata(
  'home',
  'es',
  'Más beneficio con el mismo tráfico que ya pagas — SellifyWorks'
)

const MARQUEE_ES = ["Mejora continua", "Migración a Shopify", "Facturación por visita", "Sin permanencia"]

// Home en español. CTA principal: la calculadora de beneficios.
export default function HomePage() {
  return (
    <main>
      <Hero locale="es" />
      <Marquee items={MARQUEE_ES} />

      <Reveal><Problem locale="es" /></Reveal>
      <Reveal><FunnelLeakSection /></Reveal>
      <Reveal><HowIDoIt locale="es" contactHref="#contacto" /></Reveal>
      <Reveal>
        <HowIWorkSection locale="es" variant="compact" ctaHref="/es/mejora-continua" copyOverride={HOME_ES_COPY} />
      </Reveal>
      <Reveal><CaseStudySection variant="brief" /></Reveal>
      <Marquee items={MARQUEE_ES} />
      <Reveal><ContactSection /></Reveal>
      <Reveal><FAQAccordion faqs={HomeFAQsEs} title="Preguntas frecuentes" className="bg-sw-bg-1" /></Reveal>
    </main>
  );
}

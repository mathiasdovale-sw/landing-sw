import Link from "next/link";
import HeaderHome from "@/app/_components/header-home";
import Reveal from "@/app/_components/reveal";
import Marquee from "@/app/_components/marquee";
import ProblemSection from "@/app/_components/problem-section";
import FunnelLeakSection from "@/app/_components/funnel-leak-section";
import ServicesSection from "@/app/_components/services-section";
import CaseStudySection from "@/app/_components/case-study-section";
import CloseSection from "@/app/_components/close-section";
import ContactSection from "@/app/_components/contact-section";
import type { Metadata } from 'next'
import { HomeFAQsEs } from "@/lib/faqs";
import FAQAccordion from "@/app/_components/faq-accordion";
import { generatePageMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generatePageMetadata(
  'home',
  'es',
  '¿Tu tienda Shopify no despega? — SellifyWorks'
)

export default function HomePage() {
  return (
    <main>
      <HeaderHome />
      <Marquee />

      <Reveal><ProblemSection /></Reveal>
      <Reveal><FunnelLeakSection /></Reveal>
      <Reveal><ServicesSection /></Reveal>
      <Reveal><CaseStudySection /></Reveal>
      <Marquee />
      <Reveal><CloseSection /></Reveal>
      <Reveal><ContactSection /></Reveal>
      <Reveal>
        <div className="bg-sw-bg-1 px-5 pt-16 text-center sm:pt-20">
          <Link
            href="/es/auditoria-conversion"
            className="font-mono-label text-sw-secondary transition-colors hover:text-sw-fg-1"
          >
            ¿Tenés tráfico pero no vendés? Mirá cómo funciona la auditoría de conversión →
          </Link>
        </div>
      </Reveal>
      <Reveal><FAQAccordion faqs={HomeFAQsEs} className="bg-sw-bg-1" /></Reveal>
    </main>
  );
}

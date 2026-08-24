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
import { HomeFAQsEn } from "@/lib/faqs";
import FAQAccordion from "@/app/_components/faq-accordion";
import { generatePageMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generatePageMetadata(
  'home',
  'en',
  'Is your Shopify store stuck? — SellifyWorks'
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
      <Reveal><FAQAccordion faqs={HomeFAQsEn} className="bg-sw-bg-1" /></Reveal>
    </main>
  );
}

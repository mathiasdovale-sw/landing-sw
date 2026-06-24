import HeaderHome from "../_components/header-home";
import Reveal from "../_components/reveal";
import ProblemSection from "../_components/problem-section";
import ServicesSection from "../_components/services-section";
import CaseStudySection from "../_components/case-study-section";
import CloseSection from "../_components/close-section";
import ContactSection from "../_components/contact-section";
import type { Metadata } from 'next'
import { HomeFAQsEs } from "@/lib/faqs";
import FAQAccordion from "../_components/faq-accordion";
import { generatePageMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generatePageMetadata(
  'home',
  'es',
  'SellifyWorks - Agencia Shopify para tiendas con poco tráfico | España'
)

export default function HomePage() {
  return (
    <main>
      <HeaderHome />

      <Reveal><ProblemSection /></Reveal>
      <Reveal><ServicesSection /></Reveal>
      <Reveal><CaseStudySection /></Reveal>
      <Reveal><CloseSection /></Reveal>
      <Reveal><ContactSection /></Reveal>
      <Reveal><FAQAccordion faqs={HomeFAQsEs} className="bg-sw-bg-1" /></Reveal>
    </main>
  );
}

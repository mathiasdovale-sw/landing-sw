import HeaderHome from "../_components/header-home";
import ProblemSection from "../_components/problem-section";
import ServicesSection from "../_components/services-section";
import CaseStudySection from "../_components/case-study-section";
import CloseSection from "../_components/close-section";
import ContactSection from "../_components/contact-section";
import type { Metadata } from 'next'
import { HomeFAQsEn } from "@/lib/faqs";
import FAQAccordion from "../_components/faq-accordion";
import { generatePageMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generatePageMetadata(
  'home',
  'en',
  'SellifyWorks - Shopify Agency for Low-Traffic Stores | Spain'
)

export default function HomePage() {
  return (
    <main>
      <HeaderHome />

      <ProblemSection />
      <ServicesSection />
      <CaseStudySection />
      <CloseSection />
      <ContactSection />
      <FAQAccordion faqs={HomeFAQsEn} className="bg-sw-bg-1" />
    </main>
  );
}

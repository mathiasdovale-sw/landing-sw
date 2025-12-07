import Container from "@/app/_components/container";
import HeaderHome from "../_components/header-home";
import CaseStudySection from "../_components/case-study-section";
import ServicesSection from "../_components/services-section";
import ContactSection from "../_components/contact-section";
import type { Metadata } from 'next'
import { HomeFAQsEn } from "@/lib/faqs";
import FAQAccordion from "../_components/faq-accordion";
import Divider from "../_components/divider";
import { generatePageMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generatePageMetadata(
  'home',
  'en',
  'SellifyWorks - Shopify Agency Barcelona | Online Store Development'
)

export default function HomePage() {
  return (
    <>
      <main>
        <Container>
          <HeaderHome />
          
        </Container>

        <CaseStudySection />
        <ServicesSection />
        <ContactSection />
        <Divider />
        <FAQAccordion faqs={HomeFAQsEn}/>
      </main>
    </>
  );
}
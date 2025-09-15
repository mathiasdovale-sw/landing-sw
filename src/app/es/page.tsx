import Container from "@/app/_components/container";
import HeaderHome from "../_components/header-home";
import ServicesSection from "../_components/services-section";
import ContactSection from "../_components/contact-section";
import type { Metadata } from 'next'
import { supportFAQs } from "@/lib/faqs";
import FAQAccordion from "../_components/faq-accordion";
import Divider from "../_components/divider";

export const metadata: Metadata = {
  title: "SellifyWorks - Agencia Shopify España | Desarrollo de Tiendas Online",
  description: "Agencia especializada en desarrollo y optimización de tiendas Shopify en España. Creamos experiencias de ecommerce que convierten visitantes en ventas.",
  alternates: {
    canonical: '/es/',
    languages: {
      es: '/es/',
      en: '/en/',
    },
  },
  openGraph: {
    title: "SellifyWorks - Agencia Shopify España",
    description: "Agencia especializada en desarrollo y optimización de tiendas Shopify en España. Creamos experiencias de ecommerce que convierten visitantes en ventas.",
    type: "website",
    locale: "es_ES",
  },
}

export default function HomePage() {
  return (
    <main>
      <Container>
        <HeaderHome />
        
      </Container>

      <ServicesSection />
      <ContactSection />
      <Divider />
      <FAQAccordion faqs={supportFAQs}/>
    </main>
  );
}
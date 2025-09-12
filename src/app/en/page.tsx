import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import HeaderHome from "../_components/header-home";
import ServicesSection from "../_components/services-section";
import ContactSection from "../_components/contact-section";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "SellifyWorks - Shopify Agency Barcelona | Online Store Development",
  description: "Agency specialized in Shopify store development and optimization in Barcelona. We create ecommerce experiences that convert visitors into sales.",
  alternates: {
    canonical: '/en/',
    languages: {
      es: '/es/',
      en: '/en/',
    },
  },
  openGraph: {
    title: "SellifyWorks - Shopify Agency Barcelona",
    description: "Agency specialized in Shopify store development and optimization in Barcelona. We create ecommerce experiences that convert visitors into sales.",
    type: "website",
    locale: "en_US",
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
    </main>
  );
}
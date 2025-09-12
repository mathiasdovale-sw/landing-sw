import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import HeaderHome from "../_components/header-home";
import ServicesSection from "../_components/services-section";
import ContactSection from "../_components/contact-section";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "SellifyWorks - Agencia Shopify Barcelona | Desarrollo de Tiendas Online",
  description: "Agencia especializada en desarrollo y optimización de tiendas Shopify en Barcelona. Creamos experiencias de ecommerce que convierten visitantes en ventas.",
  alternates: {
    canonical: '/es/',
    languages: {
      es: '/es/',
      en: '/en/',
    },
  },
  openGraph: {
    title: "SellifyWorks - Agencia Shopify Barcelona",
    description: "Agencia especializada en desarrollo y optimización de tiendas Shopify en Barcelona. Creamos experiencias de ecommerce que convierten visitantes en ventas.",
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
    </main>
  );
}
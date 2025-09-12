import ContactSection from "@/app/_components/contact-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | SellifyWorks - Agencia Shopify Barcelona",
  description: "Ponte en contacto con SellifyWorks. Agencia especializada en desarrollo y optimización de tiendas Shopify en Barcelona. ¡Hablemos de tu proyecto!",
  openGraph: {
    title: "Contacto | SellifyWorks - Agencia Shopify Barcelona",
    description: "Ponte en contacto con SellifyWorks. Agencia especializada en desarrollo y optimización de tiendas Shopify en Barcelona. ¡Hablemos de tu proyecto!",
    type: "website",
    locale: "es_ES",
  },
  alternates: {
    canonical: '/es/contacto',
    languages: {
      es: '/es/contacto',
      en: '/en/contact',
    },
  },
};

export default function ContactoPage() {
  return (
    <main>
      <ContactSection />
    </main>
  );
}
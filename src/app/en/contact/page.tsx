import ContactSection from "@/app/_components/contact-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | SellifyWorks - Shopify Agency Barcelona",
  description: "Get in touch with SellifyWorks. Agency specialized in Shopify store development and optimization in Barcelona. Let's talk about your project!",
  openGraph: {
    title: "Contact | SellifyWorks - Shopify Agency Barcelona",
    description: "Get in touch with SellifyWorks. Agency specialized in Shopify store development and optimization in Barcelona. Let's talk about your project!",
    type: "website",
    locale: "en_US",
  },
  alternates: {
    canonical: '/en/contact',
    languages: {
      es: '/es/contacto',
      en: '/en/contact',
    },
  },
};

export default function ContactPage() {
  return (
    <main>
      <ContactSection />
    </main>
  );
}
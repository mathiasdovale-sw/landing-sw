import ContactSection from "@/app/_components/contact-section";
import ContactStructuredData from "@/app/_components/contact-structured-data";
import VisualBreadcrumbs from "@/app/_components/visual-breadcrumbs";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generatePageMetadata(
  'contact',
  'es',
  'Contacto | SellifyWorks - Agencia Shopify Barcelona'
);

export default function ContactoPage() {
  return (
    <main>
      <ContactStructuredData />
      <VisualBreadcrumbs />
      <ContactSection />
    </main>
  );
}
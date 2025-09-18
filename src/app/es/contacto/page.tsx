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
      {/* Breadcrumbs */}
      <div className="background-color:#141417ff py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VisualBreadcrumbs />
        </div>
      </div>
      <ContactSection />
    </main>
  );
}
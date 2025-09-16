import { Metadata } from 'next';
import FAQAccordion from '@/app/_components/faq-accordion';
import { migracionShopifyFAQsEs } from '@/lib/faqs';

export const metadata: Metadata = {
  title: 'Migración a Shopify | SellifyWorks',
  description: 'Migramos tu tienda existente a Shopify sin perder datos. Proceso seguro y optimizado para minimizar tiempo de inactividad.',
};

export default function MigracionShopify() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Migración a Shopify
        </h1>
        <div className="prose prose-lg mb-16">
          <p>
            Migramos tu tienda existente a Shopify sin perder datos. Proceso seguro 
            y optimizado para minimizar tiempo de inactividad.
          </p>
          <h2>¿Qué incluye nuestra migración?</h2>
          <ul>
            <li>Migración completa de productos y datos</li>
            <li>Preservación del SEO con redirects 301</li>
            <li>Configuración de pagos y envíos</li>
            <li>Testing exhaustivo pre-lanzamiento</li>
            <li>Capacitación del nuevo admin</li>
          </ul>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <FAQAccordion faqs={migracionShopifyFAQsEs} />
        </div>
      </div>
    </main>
  );
}
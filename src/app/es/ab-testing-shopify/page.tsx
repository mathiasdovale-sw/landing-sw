import { Metadata } from 'next';
import FAQAccordion from '@/app/_components/faq-accordion';
import { abTestingShopifyFAQsEs } from '@/lib/faqs';

export const metadata: Metadata = {
  title: 'A/B Testing Shopify | SellifyWorks',
  description: 'Pruebas A/B especializadas para tiendas Shopify. Validamos cambios con datos reales para optimizar conversiones.',
};

export default function ABTestingShopify() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          A/B Testing Shopify
        </h1>
        <div className="prose prose-lg mb-16">
          <p>
            Pruebas A/B especializadas para tiendas Shopify. Validamos cambios con datos reales 
            para optimizar conversiones.
          </p>
          <h2>¿Qué testeamos en tu tienda?</h2>
          <ul>
            <li>Headlines y copy de conversión</li>
            <li>Diseño de páginas de producto</li>
            <li>Proceso de checkout</li>
            <li>CTAs y botones de compra</li>
            <li>Precios y ofertas</li>
          </ul>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <FAQAccordion faqs={abTestingShopifyFAQsEs} />
        </div>
      </div>
    </main>
  );
}
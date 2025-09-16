import { Metadata } from 'next';
import FAQAccordion from '@/app/_components/faq-accordion';
import { croShopifyFAQsEs } from '@/lib/faqs';

export const metadata: Metadata = {
  title: 'CRO Shopify | SellifyWorks',
  description: 'Optimización de conversiones para tiendas Shopify. Aumentamos tu tasa de conversión y maximizamos los ingresos de tu ecommerce.',
};

export default function CROShopify() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          CRO Shopify
        </h1>
        <div className="prose prose-lg mb-16">
          <p>
            Optimización de conversiones para tiendas Shopify. Aumentamos tu tasa de conversión 
            y maximizamos los ingresos de tu ecommerce.
          </p>
          <h2>¿Qué incluye nuestro servicio CRO?</h2>
          <ul>
            <li>Análisis de funnel de conversión</li>
            <li>Optimización de checkout</li>
            <li>A/B testing de elementos clave</li>
            <li>Mejora de UX y diseño</li>
            <li>Implementación de estrategias de aumento de AOV</li>
          </ul>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <FAQAccordion faqs={croShopifyFAQsEs} />
        </div>
      </div>
    </main>
  );
}
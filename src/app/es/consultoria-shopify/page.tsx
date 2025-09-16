import { Metadata } from 'next';
import FAQAccordion from '@/app/_components/faq-accordion';
import { consultoriaShopifyFAQsEs } from '@/lib/faqs';

export const metadata: Metadata = {
  title: 'Consultoría Shopify | SellifyWorks',
  description: 'Consultoría estratégica especializada en Shopify. Análisis, optimización y estrategias para maximizar el rendimiento de tu tienda.',
};

export default function ConsultoriaShopify() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Consultoría Shopify
        </h1>
        <div className="prose prose-lg mb-16">
          <p>
            Consultoría estratégica especializada en Shopify. Análisis, optimización 
            y estrategias para maximizar el rendimiento de tu tienda.
          </p>
          <h2>¿Qué incluye nuestra consultoría?</h2>
          <ul>
            <li>Auditoría completa de la tienda</li>
            <li>Análisis de conversiones y UX</li>
            <li>Optimización SEO técnico</li>
            <li>Estrategias de crecimiento</li>
            <li>Plan de acción personalizado</li>
          </ul>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <FAQAccordion faqs={consultoriaShopifyFAQsEs} />
        </div>
      </div>
    </main>
  );
}
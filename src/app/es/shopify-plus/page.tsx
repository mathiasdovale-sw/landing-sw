import { Metadata } from 'next';
import FAQAccordion from '@/app/_components/faq-accordion';
import { shopifyPlusFAQsEs } from '@/lib/faqs';

export const metadata: Metadata = {
  title: 'Shopify Plus | SellifyWorks',
  description: 'Soluciones enterprise con Shopify Plus para empresas de gran volumen. Partner certificado para escalabilidad avanzada.',
};

export default function ShopifyPlus() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Shopify Plus
        </h1>
        <div className="prose prose-lg mb-16">
          <p>
            Soluciones enterprise con Shopify Plus para empresas de gran volumen. 
            Como partner certificado, ofrecemos escalabilidad avanzada y funcionalidades enterprise.
          </p>
          <h2>¿Por qué elegir Shopify Plus?</h2>
          <ul>
            <li>Funcionalidades enterprise avanzadas</li>
            <li>Automatizaciones con Flow</li>
            <li>Múltiples tiendas y mercados</li>
            <li>APIs ilimitadas y checkout customizable</li>
            <li>Soporte prioritario 24/7</li>
          </ul>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <FAQAccordion faqs={shopifyPlusFAQsEs} />
        </div>
      </div>
    </main>
  );
}
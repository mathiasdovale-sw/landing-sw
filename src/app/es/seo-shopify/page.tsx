import { Metadata } from 'next';
import FAQAccordion from '@/app/_components/faq-accordion';
import { seoShopifyFAQsEs } from '@/lib/faqs';

export const metadata: Metadata = {
  title: 'SEO para Shopify | SellifyWorks',
  description: 'Optimización SEO especializada para tiendas Shopify. Mejoramos tu posicionamiento en Google y aumentamos el tráfico orgánico.',
};

export default function SEOShopify() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          SEO para Shopify
        </h1>
        <div className="prose prose-lg mb-16">
          <p>
            Optimización SEO especializada para tiendas Shopify. Mejoramos tu posicionamiento 
            en Google y aumentamos el tráfico orgánico.
          </p>
          <h2>¿Qué incluye nuestro SEO?</h2>
          <ul>
            <li>Auditoría SEO técnica completa</li>
            <li>Investigación de palabras clave</li>
            <li>Optimización on-page</li>
            <li>Velocidad y Core Web Vitals</li>
            <li>Schema markup y datos estructurados</li>
          </ul>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <FAQAccordion faqs={seoShopifyFAQsEs} />
        </div>
      </div>
    </main>
  );
}
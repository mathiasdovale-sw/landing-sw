import { Metadata } from 'next';
import FAQAccordion from '@/app/_components/faq-accordion';
import { consultoriaShopifyFAQsEn } from '@/lib/faqs';

export const metadata: Metadata = {
  title: 'Shopify Consulting | SellifyWorks',
  description: 'Strategic consulting specialized in Shopify. Analysis, optimization and strategies to maximize your store performance.',
};

export default function ShopifyConsulting() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Shopify Consulting
        </h1>
        <div className="prose prose-lg mb-16">
          <p>
            Strategic consulting specialized in Shopify. Analysis, optimization 
            and strategies to maximize your store performance.
          </p>
          <h2>What does our consulting include?</h2>
          <ul>
            <li>Complete store audit</li>
            <li>Conversion and UX analysis</li>
            <li>Technical SEO optimization</li>
            <li>Growth strategies</li>
            <li>Personalized action plan</li>
          </ul>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <FAQAccordion faqs={consultoriaShopifyFAQsEn} />
        </div>
      </div>
    </main>
  );
}
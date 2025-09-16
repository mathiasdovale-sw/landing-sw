import { Metadata } from 'next';
import FAQAccordion from '@/app/_components/faq-accordion';
import { croShopifyFAQsEn } from '@/lib/faqs';

export const metadata: Metadata = {
  title: 'Shopify CRO | SellifyWorks',
  description: 'Conversion rate optimization for Shopify stores. We increase your conversion rate and maximize your ecommerce revenue.',
};

export default function ShopifyCRO() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Shopify CRO
        </h1>
        <div className="prose prose-lg mb-16">
          <p>
            Conversion rate optimization for Shopify stores. We increase your conversion rate 
            and maximize your ecommerce revenue.
          </p>
          <h2>What does our CRO service include?</h2>
          <ul>
            <li>Conversion funnel analysis</li>
            <li>Checkout optimization</li>
            <li>A/B testing of key elements</li>
            <li>UX and design improvement</li>
            <li>AOV increase strategies implementation</li>
          </ul>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <FAQAccordion faqs={croShopifyFAQsEn} />
        </div>
      </div>
    </main>
  );
}
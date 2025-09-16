import { Metadata } from 'next';
import FAQAccordion from '@/app/_components/faq-accordion';
import { abTestingShopifyFAQsEn } from '@/lib/faqs';

export const metadata: Metadata = {
  title: 'Shopify A/B Testing | SellifyWorks',
  description: 'A/B testing specialized for Shopify stores. We validate changes with real data to optimize conversions.',
};

export default function ShopifyABTesting() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Shopify A/B Testing
        </h1>
        <div className="prose prose-lg mb-16">
          <p>
            A/B testing specialized for Shopify stores. We validate changes with real data 
            to optimize conversions.
          </p>
          <h2>What do we test in your store?</h2>
          <ul>
            <li>Headlines and conversion copy</li>
            <li>Product page design</li>
            <li>Checkout process</li>
            <li>CTAs and purchase buttons</li>
            <li>Pricing and offers</li>
          </ul>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <FAQAccordion faqs={abTestingShopifyFAQsEn} />
        </div>
      </div>
    </main>
  );
}
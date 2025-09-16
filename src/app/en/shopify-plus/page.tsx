import { Metadata } from 'next';
import FAQAccordion from '@/app/_components/faq-accordion';
import { shopifyPlusFAQsEn } from '@/lib/faqs';

export const metadata: Metadata = {
  title: 'Shopify Plus | SellifyWorks',
  description: 'Enterprise solutions with Shopify Plus for high-volume businesses. Certified partner for advanced scalability.',
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
            Enterprise solutions with Shopify Plus for high-volume businesses. 
            As certified partner, we offer advanced scalability and enterprise functionalities.
          </p>
          <h2>Why choose Shopify Plus?</h2>
          <ul>
            <li>Advanced enterprise functionalities</li>
            <li>Automation with Flow</li>
            <li>Multiple stores and markets</li>
            <li>Unlimited APIs and customizable checkout</li>
            <li>Priority 24/7 support</li>
          </ul>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <FAQAccordion faqs={shopifyPlusFAQsEn} />
        </div>
      </div>
    </main>
  );
}
import { Metadata } from 'next';
import FAQAccordion from '@/app/_components/faq-accordion';
import { growthPartnerFAQsEn } from '@/lib/faqs';

export const metadata: Metadata = {
  title: 'Shopify Growth Partner | SellifyWorks',
  description: 'Growth partner specialized in Shopify. Comprehensive strategies to scale your ecommerce business sustainably.',
};

export default function ShopifyGrowthPartner() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Shopify Growth Partner
        </h1>
        <div className="prose prose-lg mb-16">
          <p>
            Growth partner specialized in Shopify. Comprehensive strategies 
            to scale your ecommerce business sustainably.
          </p>
          <h2>What does our Growth Partnership include?</h2>
          <ul>
            <li>Growth audit and strategy</li>
            <li>Continuous conversion optimization</li>
            <li>Marketing automation</li>
            <li>Advertising campaign management</li>
            <li>Performance analysis and reports</li>
          </ul>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <FAQAccordion faqs={growthPartnerFAQsEn} />
        </div>
      </div>
    </main>
  );
}
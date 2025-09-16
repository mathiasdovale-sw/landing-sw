import { Metadata } from 'next';
import FAQAccordion from '@/app/_components/faq-accordion';
import { disenoShopifyFAQsEn } from '@/lib/faqs';

export const metadata: Metadata = {
  title: 'Custom Shopify Design | SellifyWorks',
  description: 'We create custom and responsive web designs for your Shopify store. User experience optimized to maximize conversions.',
};

export default function ShopifyDesign() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Custom and Responsive Web Design
        </h1>
        <div className="prose prose-lg mb-16">
          <p>
            At SellifyWorks we specialize in creating unique and custom web designs 
            for Shopify stores that not only look amazing, but also convert.
          </p>
          <h2>What does our design service include?</h2>
          <ul>
            <li>Completely custom design</li>
            <li>Mobile device optimization</li>
            <li>Optimized user experience (UX)</li>
            <li>Optimized loading speed</li>
            <li>Shopify integration</li>
          </ul>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <FAQAccordion faqs={disenoShopifyFAQsEn} />
        </div>
      </div>
    </main>
  );
}
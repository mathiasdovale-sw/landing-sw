import { Metadata } from 'next';
import FAQAccordion from '@/app/_components/faq-accordion';
import { crearTiendaShopifyFAQsEn } from '@/lib/faqs';

export const metadata: Metadata = {
  title: 'Shopify Store Setup | SellifyWorks',
  description: 'We create your Shopify store from scratch. Complete setup, custom design and optimization to start selling.',
};

export default function ShopifyStoreSetup() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Shopify Store Setup
        </h1>
        <div className="prose prose-lg mb-16">
          <p>
            We create your Shopify store from scratch. Complete setup, custom design 
            and optimization to start selling.
          </p>
          <h2>What does creating your store include?</h2>
          <ul>
            <li>Complete Shopify setup</li>
            <li>Custom and responsive design</li>
            <li>Product and category configuration</li>
            <li>Payment and shipping methods</li>
            <li>Training to manage your store</li>
          </ul>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <FAQAccordion faqs={crearTiendaShopifyFAQsEn} />
        </div>
      </div>
    </main>
  );
}
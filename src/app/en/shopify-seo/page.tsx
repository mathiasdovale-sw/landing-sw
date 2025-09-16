import { Metadata } from 'next';
import FAQAccordion from '@/app/_components/faq-accordion';
import { seoShopifyFAQsEn } from '@/lib/faqs';

export const metadata: Metadata = {
  title: 'Shopify SEO | SellifyWorks',
  description: 'SEO optimization specialized for Shopify stores. We improve your Google ranking and increase organic traffic.',
};

export default function ShopifySEO() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Shopify SEO
        </h1>
        <div className="prose prose-lg mb-16">
          <p>
            SEO optimization specialized for Shopify stores. We improve your Google ranking 
            and increase organic traffic.
          </p>
          <h2>What does our SEO include?</h2>
          <ul>
            <li>Complete technical SEO audit</li>
            <li>Keyword research</li>
            <li>On-page optimization</li>
            <li>Speed and Core Web Vitals</li>
            <li>Schema markup and structured data</li>
          </ul>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <FAQAccordion faqs={seoShopifyFAQsEn} />
        </div>
      </div>
    </main>
  );
}
import { Metadata } from 'next';
import FAQAccordion from '@/app/_components/faq-accordion';
import { migracionShopifyFAQsEn } from '@/lib/faqs';

export const metadata: Metadata = {
  title: 'Shopify Migration | SellifyWorks',
  description: 'We migrate your existing store to Shopify without losing data. Safe and optimized process to minimize downtime.',
};

export default function ShopifyMigration() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Shopify Migration
        </h1>
        <div className="prose prose-lg mb-16">
          <p>
            We migrate your existing store to Shopify without losing data. Safe and optimized 
            process to minimize downtime.
          </p>
          <h2>What does our migration include?</h2>
          <ul>
            <li>Complete product and data migration</li>
            <li>SEO preservation with 301 redirects</li>
            <li>Payment and shipping configuration</li>
            <li>Exhaustive pre-launch testing</li>
            <li>New admin training</li>
          </ul>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <FAQAccordion faqs={migracionShopifyFAQsEn} />
        </div>
      </div>
    </main>
  );
}
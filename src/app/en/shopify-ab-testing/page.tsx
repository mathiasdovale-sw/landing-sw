import { Metadata } from 'next';

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
        <p>Content for Shopify A/B Testing in English</p>
      </div>
    </main>
  );
}
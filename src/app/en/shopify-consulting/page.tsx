import { Metadata } from 'next';

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
        <p>Content for Shopify consulting in English</p>
      </div>
    </main>
  );
}
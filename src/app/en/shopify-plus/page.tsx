import { Metadata } from 'next';

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
        <p>Content for Shopify Plus in English</p>
      </div>
    </main>
  );
}
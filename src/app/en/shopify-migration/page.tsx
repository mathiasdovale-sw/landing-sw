import { Metadata } from 'next';

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
        <p>Content for Shopify migration in English</p>
      </div>
    </main>
  );
}
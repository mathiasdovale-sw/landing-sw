import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopify CRO | SellifyWorks',
  description: 'Conversion rate optimization for Shopify stores. We increase your conversion rate and maximize your ecommerce revenue.',
};

export default function ShopifyCRO() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Shopify CRO
        </h1>
        <p>Content for Shopify CRO in English</p>
      </div>
    </main>
  );
}
import { Metadata } from 'next';

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
        <p>Content for Shopify SEO in English</p>
      </div>
    </main>
  );
}
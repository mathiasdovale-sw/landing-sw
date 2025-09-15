import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CRO Shopify | SellifyWorks',
  description: 'Optimización de conversiones para tiendas Shopify. Aumentamos tu tasa de conversión y maximizamos los ingresos de tu ecommerce.',
};

export default function CROShopify() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          CRO Shopify
        </h1>
        <p>Contenido para CRO Shopify en español</p>
      </div>
    </main>
  );
}
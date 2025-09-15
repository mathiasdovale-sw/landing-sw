import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'A/B Testing Shopify | SellifyWorks',
  description: 'Pruebas A/B especializadas para tiendas Shopify. Validamos cambios con datos reales para optimizar conversiones.',
};

export default function ABTestingShopify() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          A/B Testing Shopify
        </h1>
        <p>Contenido para A/B Testing Shopify en español</p>
      </div>
    </main>
  );
}
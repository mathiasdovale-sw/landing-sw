import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopify Plus | SellifyWorks',
  description: 'Soluciones enterprise con Shopify Plus para empresas de gran volumen. Partner certificado para escalabilidad avanzada.',
};

export default function ShopifyPlus() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Shopify Plus
        </h1>
        <p>Contenido para Shopify Plus en español</p>
      </div>
    </main>
  );
}
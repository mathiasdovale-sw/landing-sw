import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Consultoría Shopify | SellifyWorks',
  description: 'Consultoría estratégica especializada en Shopify. Análisis, optimización y estrategias para maximizar el rendimiento de tu tienda.',
};

export default function ConsultoriaShopify() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Consultoría Shopify
        </h1>
        <p>Contenido para consultoría Shopify en español</p>
      </div>
    </main>
  );
}
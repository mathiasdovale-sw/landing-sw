import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personalización Tema Shopify | SellifyWorks',
  description: 'Personalizamos temas de Shopify según tus necesidades. Modificaciones avanzadas para crear una experiencia única.',
};

export default function PersonalizacionTemaShopify() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Personalización Tema Shopify
        </h1>
        <p>Contenido para personalización tema Shopify en español</p>
      </div>
    </main>
  );
}
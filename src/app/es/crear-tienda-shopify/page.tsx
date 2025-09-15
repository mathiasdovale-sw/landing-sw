import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crear Tienda Shopify | SellifyWorks',
  description: 'Creamos tu tienda Shopify desde cero. Configuración completa, diseño personalizado y optimización para comenzar a vender.',
};

export default function CrearTiendaShopify() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Crear Tienda Shopify
        </h1>
        <p>Contenido para crear tienda Shopify en español</p>
      </div>
    </main>
  );
}
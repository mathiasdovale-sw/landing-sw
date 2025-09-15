import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diseño Shopify Personalizado | SellifyWorks',
  description: 'Creamos diseños web personalizados y responsive para tu tienda Shopify. Experiencia de usuario optimizada para maximizar conversiones.',
};

export default function DisenoShopify() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Diseño Web Personalizado y Responsive
        </h1>
        <div className="prose prose-lg">
          <p>
            En SellifyWorks nos especializamos en crear diseños web únicos y personalizados 
            para tiendas Shopify que no solo se ven increíbles, sino que también convierten.
          </p>
          <h2>¿Qué incluye nuestro servicio de diseño?</h2>
          <ul>
            <li>Diseño completamente personalizado</li>
            <li>Optimización para dispositivos móviles</li>
            <li>Experiencia de usuario (UX) optimizada</li>
            <li>Velocidad de carga optimizada</li>
            <li>Integración con Shopify</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
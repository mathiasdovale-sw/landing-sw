import { Metadata } from 'next';
import FAQAccordion from '@/app/_components/faq-accordion';
import { crearTiendaShopifyFAQsEs } from '@/lib/faqs';

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
        <div className="prose prose-lg mb-16">
          <p>
            Creamos tu tienda Shopify desde cero. Configuración completa, diseño personalizado 
            y optimización para comenzar a vender.
          </p>
          <h2>¿Qué incluye la creación de tu tienda?</h2>
          <ul>
            <li>Setup completo de Shopify</li>
            <li>Diseño personalizado y responsive</li>
            <li>Configuración de productos y categorías</li>
            <li>Métodos de pago y envío</li>
            <li>Capacitación para administrar tu tienda</li>
          </ul>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <FAQAccordion faqs={crearTiendaShopifyFAQsEs} />
        </div>
      </div>
    </main>
  );
}
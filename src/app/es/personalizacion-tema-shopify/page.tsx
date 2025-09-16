import { Metadata } from 'next';
import FAQAccordion from '@/app/_components/faq-accordion';
import { personalizacionTemaFAQsEs } from '@/lib/faqs';

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
        <div className="prose prose-lg mb-16">
          <p>
            Personalizamos temas de Shopify según tus necesidades. Modificaciones avanzadas 
            para crear una experiencia única.
          </p>
          <h2>¿Qué tipo de personalizaciones hacemos?</h2>
          <ul>
            <li>Diseño y layout personalizados</li>
            <li>Funcionalidades custom</li>
            <li>Secciones nuevas y únicas</li>
            <li>Optimización de rendimiento</li>
            <li>Integración con apps específicas</li>
          </ul>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <FAQAccordion faqs={personalizacionTemaFAQsEs} />
        </div>
      </div>
    </main>
  );
}
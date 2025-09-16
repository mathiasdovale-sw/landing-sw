import { Metadata } from 'next';
import FAQAccordion from '@/app/_components/faq-accordion';
import { growthPartnerFAQsEs } from '@/lib/faqs';

export const metadata: Metadata = {
  title: 'Growth Partner Shopify | SellifyWorks',
  description: 'Partner de crecimiento especializado en Shopify. Estrategias integrales para escalar tu negocio ecommerce de forma sostenible.',
};

export default function GrowthPartnerShopify() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Growth Partner Shopify
        </h1>
        <div className="prose prose-lg mb-16">
          <p>
            Partner de crecimiento especializado en Shopify. Estrategias integrales 
            para escalar tu negocio ecommerce de forma sostenible.
          </p>
          <h2>¿Qué incluye nuestro Growth Partnership?</h2>
          <ul>
            <li>Auditoría y estrategia de crecimiento</li>
            <li>Optimización de conversiones continua</li>
            <li>Automatización de marketing</li>
            <li>Gestión de campañas publicitarias</li>
            <li>Análisis y reportes de performance</li>
          </ul>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <FAQAccordion faqs={growthPartnerFAQsEs} />
        </div>
      </div>
    </main>
  );
}
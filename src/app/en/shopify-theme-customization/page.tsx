import { Metadata } from 'next';
import FAQAccordion from '@/app/_components/faq-accordion';
import { personalizacionTemaFAQsEn } from '@/lib/faqs';

export const metadata: Metadata = {
  title: 'Shopify Theme Customization | SellifyWorks',
  description: 'We customize Shopify themes according to your needs. Advanced modifications to create a unique experience.',
};

export default function ShopifyThemeCustomization() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Shopify Theme Customization
        </h1>
        <div className="prose prose-lg mb-16">
          <p>
            We customize Shopify themes according to your needs. Advanced modifications 
            to create a unique experience.
          </p>
          <h2>What type of customizations do we do?</h2>
          <ul>
            <li>Custom design and layout</li>
            <li>Custom functionalities</li>
            <li>New and unique sections</li>
            <li>Performance optimization</li>
            <li>Integration with specific apps</li>
          </ul>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <FAQAccordion faqs={personalizacionTemaFAQsEn} />
        </div>
      </div>
    </main>
  );
}
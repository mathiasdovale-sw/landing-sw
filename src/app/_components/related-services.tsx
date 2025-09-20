'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

// Tipos para los servicios relacionados
type ServiceKey = 
  | 'shopify-store-setup' 
  | 'shopify-design' 
  | 'shopify-theme-customization'
  | 'shopify-migration'
  | 'shopify-seo'
  | 'shopify-cro'
  | 'shopify-plus'
  | 'shopify-consulting'
  | 'shopify-growth-partner'
  | 'shopify-ab-testing';

type RelatedService = {
  key: ServiceKey;
  titleKey: string;
  descriptionKey: string;
};

// Mapeo de servicios relacionados
const relatedServicesMap: Record<ServiceKey, ServiceKey[]> = {
  'shopify-store-setup': ['shopify-design', 'shopify-theme-customization', 'shopify-seo'],
  'shopify-design': ['shopify-store-setup', 'shopify-theme-customization', 'shopify-cro'],
  'shopify-theme-customization': ['shopify-design', 'shopify-store-setup', 'shopify-cro'],
  'shopify-migration': ['shopify-store-setup', 'shopify-seo', 'shopify-consulting'],
  'shopify-seo': ['shopify-cro', 'shopify-design', 'shopify-consulting'],
  'shopify-cro': ['shopify-seo', 'shopify-ab-testing', 'shopify-design'],
  'shopify-plus': ['shopify-migration', 'shopify-consulting', 'shopify-growth-partner'],
  'shopify-consulting': ['shopify-plus', 'shopify-growth-partner', 'shopify-seo'],
  'shopify-growth-partner': ['shopify-plus', 'shopify-consulting', 'shopify-cro'],
  'shopify-ab-testing': ['shopify-cro', 'shopify-seo', 'shopify-design']
};

// Datos de servicios con claves de traducción
const servicesData: Record<ServiceKey, RelatedService> = {
  'shopify-store-setup': {
    key: 'shopify-store-setup',
    titleKey: 'relatedServices.services.storeSetup.title',
    descriptionKey: 'relatedServices.services.storeSetup.description'
  },
  'shopify-design': {
    key: 'shopify-design',
    titleKey: 'relatedServices.services.design.title',
    descriptionKey: 'relatedServices.services.design.description'
  },
  'shopify-theme-customization': {
    key: 'shopify-theme-customization',
    titleKey: 'relatedServices.services.themeCustomization.title',
    descriptionKey: 'relatedServices.services.themeCustomization.description'
  },
  'shopify-migration': {
    key: 'shopify-migration',
    titleKey: 'relatedServices.services.migration.title',
    descriptionKey: 'relatedServices.services.migration.description'
  },
  'shopify-seo': {
    key: 'shopify-seo',
    titleKey: 'relatedServices.services.seo.title',
    descriptionKey: 'relatedServices.services.seo.description'
  },
  'shopify-cro': {
    key: 'shopify-cro',
    titleKey: 'relatedServices.services.cro.title',
    descriptionKey: 'relatedServices.services.cro.description'
  },
  'shopify-plus': {
    key: 'shopify-plus',
    titleKey: 'relatedServices.services.plus.title',
    descriptionKey: 'relatedServices.services.plus.description'
  },
  'shopify-consulting': {
    key: 'shopify-consulting',
    titleKey: 'relatedServices.services.consulting.title',
    descriptionKey: 'relatedServices.services.consulting.description'
  },
  'shopify-growth-partner': {
    key: 'shopify-growth-partner',
    titleKey: 'relatedServices.services.growthPartner.title',
    descriptionKey: 'relatedServices.services.growthPartner.description'
  },
  'shopify-ab-testing': {
    key: 'shopify-ab-testing',
    titleKey: 'relatedServices.services.abTesting.title',
    descriptionKey: 'relatedServices.services.abTesting.description'
  }
};

interface RelatedServicesProps {
  currentService: ServiceKey;
  className?: string;
}

export default function RelatedServices({ currentService, className = '' }: RelatedServicesProps) {
  const { t, language } = useLanguage();
  
  // Obtener servicios relacionados
  const relatedServiceKeys = relatedServicesMap[currentService] || [];
  const relatedServices = relatedServiceKeys.map(key => servicesData[key]);

  // Construir la URL base según el idioma
  const basePath = language === 'es' ? '/es' : '/en';
  
  // Función para convertir key del servicio a URL
  const getServiceUrl = (serviceKey: ServiceKey): string => {
    if (language === 'es') {
      // Mapeo de URLs en español
      const spanishUrls: Record<ServiceKey, string> = {
        'shopify-store-setup': '/es/crear-tienda-shopify',
        'shopify-design': '/es/diseno-shopify',
        'shopify-theme-customization': '/es/personalizacion-tema-shopify',
        'shopify-migration': '/es/migracion-shopify',
        'shopify-seo': '/es/seo-shopify',
        'shopify-cro': '/es/cro-shopify',
        'shopify-plus': '/es/shopify-plus',
        'shopify-consulting': '/es/consultoria-shopify',
        'shopify-growth-partner': '/es/growth-partner-shopify',
        'shopify-ab-testing': '/es/ab-testing-shopify'
      };
      return spanishUrls[serviceKey];
    }
    
    // URLs en inglés (directas)
    return `/en/${serviceKey}`;
  };

  if (relatedServices.length === 0) return null;

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
            {t('relatedServices.title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light">
            {t('relatedServices.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedServices.map((service) => (
            <Link
              key={service.key}
              href={getServiceUrl(service.key)}
              className="group bg-white p-8 rounded-xl border border-gray-200 hover:border-orange-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300" style={{ fontFamily: "sans-serif" }}>
                  {t(service.titleKey)}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {t(service.descriptionKey)}
                </p>
                <div className="inline-flex items-center text-orange-600 font-semibold group-hover:text-orange-700 transition-colors duration-300">
                  {t('relatedServices.learnMore')}
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
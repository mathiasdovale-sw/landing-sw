"use client"
import { useLanguage } from "@/contexts/LanguageContext";
import { getCanonicalBaseUrl } from "@/lib/seo-utils";

interface ServiceSchemaProps {
  serviceName: string;
  serviceType: 'shopifyConsulting' | 'shopifyDesign' | 'shopifyStoreSetup' | 'shopifyMigration' | 
               'shopifyThemeCustomization' | 'shopifySeo' | 'shopifyCro' | 'shopifyAbTesting' | 
               'shopifyGrowthPartner' | 'shopifyPlus';
  description: string;
  price?: {
    currency: string;
    minPrice?: number;
    priceCurrency?: string;
    priceRange?: string;
  };
}

const ServiceStructuredData = ({ serviceName, serviceType, description, price }: ServiceSchemaProps) => {
  const { language } = useLanguage();
  const baseUrl = getCanonicalBaseUrl();
  
  const serviceCategories = {
    shopifyConsulting: 'Consulting',
    shopifyDesign: 'Web Design',
    shopifyStoreSetup: 'E-commerce Setup',
    shopifyMigration: 'Platform Migration',
    shopifyThemeCustomization: 'Theme Development',
    shopifySeo: 'SEO Services',
    shopifyCro: 'Conversion Optimization',
    shopifyAbTesting: 'A/B Testing',
    shopifyGrowthPartner: 'Growth Marketing',
    shopifyPlus: 'Enterprise Solutions'
  };

  const urls = {
    shopifyConsulting: { es: '/es/consultoria-shopify', en: '/en/shopify-consulting' },
    shopifyDesign: { es: '/es/diseno-shopify', en: '/en/shopify-design' },
    shopifyStoreSetup: { es: '/es/crear-tienda-shopify', en: '/en/shopify-store-setup' },
    shopifyMigration: { es: '/es/migracion-shopify', en: '/en/shopify-migration' },
    shopifyThemeCustomization: { es: '/es/personalizacion-tema-shopify', en: '/en/shopify-theme-customization' },
    shopifySeo: { es: '/es/seo-shopify', en: '/en/shopify-seo' },
    shopifyCro: { es: '/es/cro-shopify', en: '/en/shopify-cro' },
    shopifyAbTesting: { es: '/es/ab-testing-shopify', en: '/en/shopify-ab-testing' },
    shopifyGrowthPartner: { es: '/es/growth-partner-shopify', en: '/en/shopify-growth-partner' },
    shopifyPlus: { es: '/es/shopify-plus', en: '/en/shopify-plus' }
  };

  const serviceUrl = `${baseUrl}${urls[serviceType][language as keyof typeof urls[typeof serviceType]]}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "SellifyWorks",
      "url": baseUrl,
      "logo": `${baseUrl}/assets/img/logoSW.png`,
      "sameAs": [
        // Add social media URLs here when available
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "ES",
        "addressLocality": "Barcelona"
      }
    },
    "serviceType": serviceCategories[serviceType],
    "category": "E-commerce Services",
    "audience": {
      "@type": "BusinessAudience",
      "audienceType": "E-commerce businesses"
    },
    "areaServed": {
      "@type": "Country",
      "name": language === 'es' ? 'España' : 'Spain'
    },
    "url": serviceUrl,
    "offers": price ? {
      "@type": "Offer",
      "priceCurrency": price.currency || "EUR",
      "price": price.minPrice || undefined,
      "priceRange": price.priceRange || undefined,
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString(),
      "url": serviceUrl
    } : undefined,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": language === 'es' ? 'Servicios de Shopify' : 'Shopify Services',
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": serviceName,
            "description": description
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
};

export default ServiceStructuredData;
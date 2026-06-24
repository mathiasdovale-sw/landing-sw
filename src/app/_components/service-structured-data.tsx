"use client"
import { useLanguage } from "@/contexts/LanguageContext";
import { getCanonicalBaseUrl } from "@/lib/seo-utils";
import { getService, getServicePath } from "@/lib/services-config";

interface ServiceSchemaProps {
  serviceName: string;
  serviceType: string;
  description: string;
  price?: {
    currency: string;
    minPrice?: number;
    priceCurrency?: string;
    priceRange?: string;
  };
}

const serviceCategories: Record<string, string> = {
  migration: 'Platform Migration',
  migrationPlus: 'Platform Migration',
  customDev: 'Custom Software Development',
  conversionResearch: 'Conversion Research',
  conversionAudit: 'Conversion Optimization',
  landingPages: 'Conversion Optimization',
  emailAutomation: 'Email Marketing',
  emailCampaigns: 'Email Marketing',
  maintenance: 'Website Maintenance',
};

const ServiceStructuredData = ({ serviceName, serviceType, description, price }: ServiceSchemaProps) => {
  const { language } = useLanguage();
  const baseUrl = getCanonicalBaseUrl();

  const service = getService(serviceType);
  const serviceUrl = `${baseUrl}${getServicePath(serviceType, language as 'es' | 'en')}`;

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
      "sameAs": [],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "ES",
        "addressLocality": "Barcelona"
      }
    },
    "serviceType": serviceCategories[service.key] || 'E-commerce Services',
    "category": "E-commerce Services",
    "audience": {
      "@type": "BusinessAudience",
      "audienceType": "Small e-commerce businesses"
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

"use client"
import { useLanguage } from "@/contexts/LanguageContext";
import { getCanonicalBaseUrl } from "@/lib/seo-utils";

interface OrganizationSchemaProps {
  organizationName?: string;
  description?: string;
  foundedYear?: number;
  employees?: string;
  specialties?: string[];
}

const OrganizationStructuredData = ({ 
  organizationName = "SellifyWorks",
  description,
  foundedYear,
  employees = "2-10",
  specialties = []
}: OrganizationSchemaProps) => {
  const { language } = useLanguage();
  const baseUrl = getCanonicalBaseUrl();
  
  const defaultDescriptions = {
    es: "Agencia especializada en desarrollo y optimización de tiendas Shopify. Ayudamos a empresas a crear experiencias de ecommerce exitosas.",
    en: "Agency specialized in Shopify store development and optimization. We help businesses create successful ecommerce experiences."
  };

  const defaultSpecialties = {
    es: [
      "Migración a Shopify",
      "Optimización de conversión (CRO)",
      "Email marketing automation",
      "Auditoría de conversión",
      "Mantenimiento Shopify",
      "Desarrollos a medida"
    ],
    en: [
      "Shopify Migration",
      "Conversion Rate Optimization",
      "Email Marketing Automation",
      "Conversion Audit",
      "Shopify Maintenance",
      "Custom Development"
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": organizationName,
    "alternateName": "SellifyWorks Agency",
    "description": description || defaultDescriptions[language as keyof typeof defaultDescriptions],
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/assets/img/logoSW.png`,
      "width": 200,
      "height": 60
    },
    "image": `${baseUrl}/assets/img/logoSW.png`,
    "foundingDate": foundedYear ? `${foundedYear}-01-01` : undefined,
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": employees
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Barcelona",
      "addressRegion": "Cataluña",
      "addressCountry": "ES",
      "postalCode": "08000"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Spain"
      },
      {
        "@type": "Country", 
        "name": "Europe"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "41.3851",
        "longitude": "2.1734"
      },
      "geoRadius": "1000000"
    },
    "knowsAbout": specialties.length > 0 ? specialties : defaultSpecialties[language as keyof typeof defaultSpecialties],
    "slogan": language === 'es' ? 
      "Tu partner de crecimiento en Shopify" : 
      "Your Shopify growth partner",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["es", "en"],
      "url": `${baseUrl}/${language}/contacto`
    },
    "sameAs": [
      // Add social media URLs when available
      // "https://www.linkedin.com/company/sellifyworks",
      // "https://twitter.com/sellifyworks"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": language === 'es' ? "Servicios Shopify" : "Shopify Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": language === 'es' ? "Migración a Shopify" : "Shopify Migration",
            "url": `${baseUrl}/${language}/${language === 'es' ? 'migracion-shopify' : 'shopify-migration'}`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": language === 'es' ? "Auditoría de conversión" : "Conversion Audit",
            "url": `${baseUrl}/${language}/${language === 'es' ? 'auditoria-conversion' : 'conversion-audit'}`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": language === 'es' ? "Mantenimiento" : "Maintenance",
            "url": `${baseUrl}/${language}/${language === 'es' ? 'mantenimiento-shopify' : 'shopify-maintenance'}`
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema, null, 2),
      }}
    />
  );
};

export default OrganizationStructuredData;
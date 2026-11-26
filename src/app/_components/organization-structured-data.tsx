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
  employees = "1",
  specialties = []
}: OrganizationSchemaProps) => {
  const { language } = useLanguage();
  const baseUrl = getCanonicalBaseUrl();
  
  const defaultDescriptions = {
    es: "Agencia de crecimiento digital que une marketing y tecnología para pymes: anuncios, web, automatizaciones y medición, con un único responsable. Desde Barcelona.",
    en: "Digital growth agency bringing marketing and technology together for small businesses: ads, website, automations and measurement, with one accountable partner. From Barcelona."
  };

  const defaultSpecialties = {
    es: [
      "Google Ads",
      "Meta Ads",
      "Tienda nueva en Shopify",
      "Migración a Shopify",
      "Desarrollo a medida",
      "Automatizaciones",
      "Analítica web",
      "Generación de leads"
    ],
    en: [
      "Google Ads",
      "Meta Ads",
      "New Shopify store",
      "Shopify Migration",
      "Custom Development",
      "Automations",
      "Web analytics",
      "Lead generation"
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
        "@type": "Place",
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
      "Marketing y tecnología para pymes" :
      "Marketing and technology for small businesses",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["es", "en"],
      "url": `${baseUrl}/${language}/${language === 'es' ? 'contacto' : 'contact'}`
    },
    "sameAs": [
      // Add social media URLs when available
      // "https://www.linkedin.com/company/sellifyworks",
      // "https://twitter.com/sellifyworks"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": language === 'es' ? "Servicios de SellifyWorks" : "SellifyWorks services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": language === 'es' ? "Anuncios en Google y Meta" : "Google and Meta ads",
            "url": `${baseUrl}/${language}/${language === 'es' ? 'anuncios' : 'ads'}`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": language === 'es' ? "Tienda nueva en Shopify" : "New Shopify store",
            "url": `${baseUrl}/${language}/${language === 'es' ? 'tienda-nueva' : 'new-shopify-store'}`
          }
        },
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
            "name": language === 'es' ? "Acompañamiento mensual" : "Monthly support",
            "url": `${baseUrl}/${language}/${language === 'es' ? 'mejora-continua' : 'continuous-improvement'}`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": language === 'es' ? "Desarrollo a medida" : "Custom Development",
            "url": `${baseUrl}/${language}/${language === 'es' ? 'desarrollos-a-medida' : 'custom-shopify-development'}`
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
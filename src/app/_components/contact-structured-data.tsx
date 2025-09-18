"use client"
import { useLanguage } from "@/contexts/LanguageContext";
import { getCanonicalBaseUrl } from "@/lib/seo-utils";

interface ContactSchemaProps {
  organizationName?: string;
  contactTypes?: string[];
  availableLanguages?: string[];
  responseTime?: string;
}

const ContactStructuredData = ({ 
  organizationName = "SellifyWorks",
  contactTypes = ["customer service", "technical support", "sales"],
  availableLanguages = ["es", "en"],
  responseTime = "P1D" // 1 day in ISO 8601 duration format
}: ContactSchemaProps) => {
  const { language } = useLanguage();
  const baseUrl = getCanonicalBaseUrl();
  
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": language === 'es' ? 
      `Contacto - ${organizationName}` : 
      `Contact - ${organizationName}`,
    "description": language === 'es' ? 
      "Ponte en contacto con nuestro equipo de expertos en Shopify para discutir tu proyecto." :
      "Get in touch with our Shopify expert team to discuss your project.",
    "url": `${baseUrl}/${language}/${language === 'es' ? 'contacto' : 'contact'}`,
    "mainEntity": {
      "@type": "Organization",
      "name": organizationName,
      "url": baseUrl,
      "logo": `${baseUrl}/assets/img/logoSW.png`,
      "contactPoint": contactTypes.map(contactType => ({
        "@type": "ContactPoint",
        "contactType": contactType,
        "availableLanguage": availableLanguages,
        "url": `${baseUrl}/${language}/${language === 'es' ? 'contacto' : 'contact'}`,
        "areaServed": ["ES", "EU"],
        "serviceArea": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": "41.3851",
            "longitude": "2.1734"
          },
          "geoRadius": "1000000"
        }
      })),
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Barcelona",
        "addressRegion": "Cataluña", 
        "addressCountry": "ES"
      }
    },
    "potentialAction": {
      "@type": "CommunicateAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/${language}/${language === 'es' ? 'contacto' : 'contact'}`,
        "inLanguage": availableLanguages
      },
      "result": {
        "@type": "Message",
        "expectedResponse": {
          "@type": "Message",
          "expectsAcceptanceOf": {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": language === 'es' ? "Consultoría Shopify" : "Shopify Consulting"
            }
          }
        }
      }
    },
    "about": {
      "@type": "Service",
      "serviceType": "Shopify Development",
      "provider": {
        "@type": "Organization",
        "name": organizationName
      }
    }
  };

  // FAQ Schema for common contact questions
  const contactFAQSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": language === 'es' ? 
          "¿Cuánto tiempo tardan en responder?" : 
          "How long does it take to respond?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": language === 'es' ? 
            "Normalmente respondemos dentro de 24 horas durante días laborables." :
            "We typically respond within 24 hours during business days."
        }
      },
      {
        "@type": "Question", 
        "name": language === 'es' ? 
          "¿Ofrecen consultas gratuitas?" :
          "Do you offer free consultations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": language === 'es' ? 
            "Sí, ofrecemos una consulta inicial gratuita para discutir tu proyecto." :
            "Yes, we offer a free initial consultation to discuss your project."
        }
      },
      {
        "@type": "Question",
        "name": language === 'es' ? 
          "¿En qué idiomas atienden?" :
          "What languages do you support?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": language === 'es' ?
            "Atendemos en español e inglés." :
            "We provide support in Spanish and English."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactSchema, null, 2),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactFAQSchema, null, 2),
        }}
      />
    </>
  );
};

export default ContactStructuredData;
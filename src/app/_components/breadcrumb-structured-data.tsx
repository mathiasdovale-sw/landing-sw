"use client"
import { useLanguage } from "@/contexts/LanguageContext";
import { getCanonicalBaseUrl } from "@/lib/seo-utils";

interface BreadcrumbItem {
  name: string;
  url?: string;
  position: number;
}

interface BreadcrumbStructuredDataProps {
  items: BreadcrumbItem[];
  includeHome?: boolean;
}

const BreadcrumbStructuredData = ({ 
  items, 
  includeHome = true 
}: BreadcrumbStructuredDataProps) => {
  const { language } = useLanguage();
  const baseUrl = getCanonicalBaseUrl();
  
  // Create the full breadcrumb list
  const breadcrumbList: BreadcrumbItem[] = [];
  
  // Add home item if requested
  if (includeHome) {
    breadcrumbList.push({
      name: language === 'es' ? 'Inicio' : 'Home',
      url: `${baseUrl}/${language}`,
      position: 1
    });
  }
  
  // Add provided items with adjusted positions
  const startPosition = includeHome ? 2 : 1;
  items.forEach((item, index) => {
    breadcrumbList.push({
      ...item,
      position: startPosition + index,
      url: item.url || undefined // Don't include URL for current page
    });
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbList.map(item => ({
      "@type": "ListItem",
      "position": item.position,
      "name": item.name,
      ...(item.url && { 
        "item": {
          "@type": "WebPage",
          "@id": item.url,
          "url": item.url,
          "name": item.name
        }
      })
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema, null, 2),
      }}
    />
  );
};

export default BreadcrumbStructuredData;
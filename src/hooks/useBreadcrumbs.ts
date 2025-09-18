import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { getCanonicalBaseUrl } from '@/lib/seo-utils';

interface BreadcrumbItem {
  name: string;
  url?: string;
  position: number;
}

// Translation mappings for common paths
const pathTranslations = {
  es: {
    'sobre-nosotros': 'Sobre Nosotros',
    'contacto': 'Contacto',
    'servicios': 'Servicios',
    'seo-shopify': 'SEO Shopify',
    'diseno-shopify': 'Diseño Shopify',
    'desarrollo-shopify': 'Desarrollo Shopify',
    'migracion-shopify': 'Migración Shopify',
    'optimizacion-shopify': 'Optimización Shopify',
    'mantenimiento-shopify': 'Mantenimiento Shopify',
    'shopify-plus': 'Shopify Plus',
    'auditoria-shopify': 'Auditoría Shopify',
    'integraciones-shopify': 'Integraciones Shopify',
    'apps-shopify': 'Apps Shopify',
    'blog': 'Blog',
    'posts': 'Artículos'
  },
  en: {
    'about': 'About',
    'contact': 'Contact',
    'services': 'Services',
    'seo-shopify': 'SEO Shopify',
    'shopify-design': 'Shopify Design',
    'shopify-development': 'Shopify Development',
    'shopify-migration': 'Shopify Migration',
    'shopify-optimization': 'Shopify Optimization',
    'shopify-maintenance': 'Shopify Maintenance',
    'shopify-plus': 'Shopify Plus',
    'shopify-audit': 'Shopify Audit',
    'shopify-integrations': 'Shopify Integrations',
    'shopify-apps': 'Shopify Apps',
    'blog': 'Blog',
    'posts': 'Posts'
  }
};

export const useBreadcrumbs = (): BreadcrumbItem[] => {
  const pathname = usePathname();
  const { language } = useLanguage();
  const baseUrl = getCanonicalBaseUrl();
  
  // Remove language prefix and split path
  const pathWithoutLang = pathname.replace(`/${language}`, '') || '/';
  const segments = pathWithoutLang.split('/').filter(Boolean);
  
  const breadcrumbs: BreadcrumbItem[] = [];
  let currentPath = `/${language}`;
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Get translated name for this segment
    const translations = pathTranslations[language as keyof typeof pathTranslations];
    const name = translations?.[segment as keyof typeof translations] || 
                 segment.charAt(0).toUpperCase() + segment.slice(1);
    
    // Don't include URL for the last item (current page)
    const isCurrentPage = index === segments.length - 1;
    
    breadcrumbs.push({
      name,
      url: isCurrentPage ? undefined : `${baseUrl}${currentPath}`,
      position: index + 2 // +2 because home is position 1
    });
  });
  
  return breadcrumbs;
};

export default useBreadcrumbs;
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

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
    'consultoria-shopify': 'Consultoría Shopify',
    'cro-shopify': 'CRO Shopify',
    'crear-tienda-shopify': 'Crear Tienda Shopify',
    'personalizacion-tema-shopify': 'Personalización Tema Shopify',
    'growth-partner-shopify': 'Growth Partner Shopify',
    'ab-testing-shopify': 'A/B Testing Shopify',
    'politica-de-privacidad': 'Política de Privacidad',
    'politica-de-cookies': 'Política de Cookies',
    'suscripcion-confirmada': 'Suscripción Confirmada',
    'blog': 'Blog',
    'posts': 'Artículos'
  },
  en: {
    'about': 'About',
    'contact': 'Contact',
    'services': 'Services',
    'shopify-seo': 'Shopify SEO',
    'shopify-design': 'Shopify Design',
    'shopify-development': 'Shopify Development',
    'shopify-migration': 'Shopify Migration',
    'shopify-optimization': 'Shopify Optimization',
    'shopify-maintenance': 'Shopify Maintenance',
    'shopify-plus': 'Shopify Plus',
    'shopify-audit': 'Shopify Audit',
    'shopify-integrations': 'Shopify Integrations',
    'shopify-apps': 'Shopify Apps',
    'shopify-consulting': 'Shopify Consulting',
    'shopify-cro': 'Shopify CRO',
    'shopify-store-setup': 'Shopify Store Setup',
    'shopify-theme-customization': 'Shopify Theme Customization',
    'privacy-policy': 'Privacy Policy',
    'cookie-policy': 'Cookie Policy',
    'newsletter-confirmed': 'Newsletter Confirmed',
    'blog': 'Blog',
    'posts': 'Posts'
  }
};

export const useBreadcrumbs = (): BreadcrumbItem[] => {
  const pathname = usePathname();
  const { language } = useLanguage();
  
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
                 segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    // Don't include URL for the last item (current page)
    const isCurrentPage = index === segments.length - 1;
    
    breadcrumbs.push({
      name,
      url: isCurrentPage ? undefined : currentPath,
      position: index + 2 // +2 because home is position 1
    });
  });
  
  return breadcrumbs;
};

export default useBreadcrumbs;
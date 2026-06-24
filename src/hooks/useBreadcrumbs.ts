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
    'migracion-shopify': 'Migración a Shopify',
    'migracion-plus': 'Migración Plus',
    'desarrollos-a-medida': 'Desarrollos a Medida',
    'conversion-research': 'Conversion Research',
    'auditoria-conversion': 'Auditoría de Conversión',
    'optimizacion-landing-pages': 'Optimización de Landing Pages',
    'email-marketing-automation': 'Email Marketing Automation',
    'campanas-email-marketing': 'Campañas de Email',
    'mantenimiento-shopify': 'Mantenimiento',
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
    'shopify-migration': 'Shopify Migration',
    'shopify-migration-plus': 'Migration Plus',
    'custom-shopify-development': 'Custom Development',
    'conversion-research': 'Conversion Research',
    'conversion-audit': 'Conversion Audit',
    'landing-page-optimization': 'Landing Page Optimization',
    'email-marketing-automation': 'Email Marketing Automation',
    'email-marketing-campaigns': 'Email Campaigns',
    'shopify-maintenance': 'Maintenance',
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
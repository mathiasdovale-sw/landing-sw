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
    'desarrollos-a-medida': 'Desarrollos a Medida',
    'auditoria-conversion': 'Auditoría de Conversión',
    'email-marketing-automation': 'Email Marketing Automation',
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
    'custom-shopify-development': 'Custom Development',
    'conversion-audit': 'Conversion Audit',
    'email-marketing-automation': 'Email Marketing Automation',
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
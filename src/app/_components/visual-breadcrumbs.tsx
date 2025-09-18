"use client"
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import useBreadcrumbs from '@/hooks/useBreadcrumbs';

interface VisualBreadcrumbsProps {
  className?: string;
  showHome?: boolean;
}

const VisualBreadcrumbs = ({ 
  className = '', 
  showHome = true 
}: VisualBreadcrumbsProps) => {
  const { language } = useLanguage();
  const breadcrumbItems = useBreadcrumbs();

  if (breadcrumbItems.length === 0) return null;

  return (
    <nav 
      className={`flex items-center space-x-2 text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      {showHome && (
        <>
          <Link 
            href={`/${language}`}
            className="flex items-center text-gray-400 hover:text-white transition-colors duration-200"
          >
            <Home className="w-4 h-4 mr-1" />
            {language === 'es' ? 'Inicio' : 'Home'}
          </Link>
          {breadcrumbItems.length > 0 && (
            <ChevronRight className="w-4 h-4 text-gray-500" />
          )}
        </>
      )}
      
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;
        
        return (
          <div key={item.position} className="flex items-center">
            {item.url && !isLast ? (
              <Link 
                href={item.url}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-orange-300 font-medium">
                {item.name}
              </span>
            )}
            
            {!isLast && (
              <ChevronRight className="w-4 h-4 text-gray-500 mx-2" />
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default VisualBreadcrumbs;
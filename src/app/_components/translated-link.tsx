'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollPosition } from '@/hooks/useScrollPosition';

interface TranslatedLinkProps {
  textKey: string;
  urlKey: string;
  className?: string;
  children?: React.ReactNode;
  expandedServiceId?: string; // Add this prop
}

export default function TranslatedLink({ textKey, urlKey, className = '', children, expandedServiceId }: TranslatedLinkProps) {
  const { t, language } = useLanguage();
  const { navigateWithScrollSave } = useScrollPosition();
  
  const text = t(textKey);
  const url = t(urlKey);
  
  // Agregar prefijo de idioma si es inglés
  const finalUrl = language === 'en' ? `/en${url}` : `/es${url}`;
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateWithScrollSave(finalUrl, expandedServiceId);
  };
  
  return (
    <Link 
      href={finalUrl} 
      onClick={handleClick}
      className={`text-blue-600 hover:text-blue-800 underline transition-colors cursor-pointer ${className}`}
    >
      {children || text}
    </Link>
  );
}
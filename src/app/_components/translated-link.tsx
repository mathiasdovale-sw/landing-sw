'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface TranslatedLinkProps {
  textKey: string;
  urlKey: string;
  className?: string;
  children?: React.ReactNode;
}

export default function TranslatedLink({ textKey, urlKey, className = '', children }: TranslatedLinkProps) {
  const { t, language } = useLanguage();
  
  const text = t(textKey);
  const url = t(urlKey);
  
  // Agregar prefijo de idioma si es inglés
  const finalUrl = language === 'en' ? `/en${url}` : `/es${url}`;
  
  return (
    <Link 
      href={finalUrl} 
      className={`text-blue-600 hover:text-blue-800 underline transition-colors cursor-pointer ${className}`}
    >
      {children || text}
    </Link>
  );
}
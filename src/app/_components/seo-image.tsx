import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

interface SEOImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  contextualAlt?: {
    es: string;
    en: string;
  };
  semanticRole?: 'logo' | 'hero' | 'service' | 'team' | 'illustration' | 'decorative';
  loading?: 'eager' | 'lazy';
}

const SEOImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className,
  priority = false,
  sizes,
  contextualAlt,
  semanticRole = 'illustration',
  loading = 'lazy'
}: SEOImageProps) => {
  const { language } = useLanguage();
  
  // Generate contextual alt text based on language and semantic role
  const getOptimizedAltText = () => {
    if (contextualAlt) {
      return contextualAlt[language as keyof typeof contextualAlt] || alt;
    }
    
    // Add semantic context based on role
    const semanticPrefixes = {
      es: {
        logo: 'Logo de',
        hero: 'Imagen principal:',
        service: 'Servicio de',
        team: 'Foto de equipo:',
        illustration: 'Ilustración:',
        decorative: ''
      },
      en: {
        logo: 'Logo of',
        hero: 'Hero image:',
        service: 'Service of',
        team: 'Team photo:',
        illustration: 'Illustration:',
        decorative: ''
      }
    };
    
    const prefix = semanticPrefixes[language as keyof typeof semanticPrefixes]?.[semanticRole] || '';
    return prefix ? `${prefix} ${alt}` : alt;
  };

  const optimizedAlt = getOptimizedAltText();
  
  // Don't render alt for purely decorative images
  const finalAlt = semanticRole === 'decorative' ? '' : optimizedAlt;

  return (
    <Image
      src={src}
      alt={finalAlt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
      loading={priority ? 'eager' : loading}
      // Add structured data attributes for better SEO understanding
      itemProp={semanticRole === 'logo' ? 'logo' : undefined}
      role={semanticRole === 'decorative' ? 'presentation' : undefined}
      aria-hidden={semanticRole === 'decorative' ? true : undefined}
    />
  );
};

export default SEOImage;
"use client"
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";

interface BlogCTAProps {
  className?: string;
}

export default function BlogCTA({ className = "" }: BlogCTAProps) {
  const { language } = useLanguage();

  return (
    <div className={` ${className}`}>
      {/* Divider simple */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex-grow border-t border-gray-200"></div>
        <div className="px-4">
          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
        </div>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      {/* CTA Principal */}
      <div 
        className="rounded-xl p-8 md:p-10 text-white text-center"
        style={{ backgroundColor: '#141417ff' }}
      >
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            {language === 'es' 
              ? '¿Listo para optimizar tu eCommerce?' 
              : 'Ready to optimize your eCommerce?'
            }
          </h3>

          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            {language === 'es'
              ? 'En SellifyWorks, diseñamos páginas que no solo se ven bien, sino que convierten.'
              : 'At SellifyWorks, we design pages that not only look good, but convert.'
            }
          </p>

          {/* CTA Button */}
          <a 
            href={`/${language}/contacto`}
            className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-300 group"
          >
            {language === 'es' ? 'Comenzar mi proyecto' : 'Start my project'}
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}
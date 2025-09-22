"use client"
import { useLanguage } from "@/contexts/LanguageContext";

export function Intro() {
  const { t } = useLanguage();
  
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight mt-16 md:pr-8 text-gray-900">
        {t('blog.title')}.
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8 text-gray-600 max-w-md">
        {t('blog.subtitle')}
      </h4>
    </section>
  );
}

"use client"
import Link from "next/link";
import { useLocalizedLinks } from "@/hooks/useLocalizedLinks";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const { links } = useLocalizedLinks();
  const { t } = useLanguage();
  
  return (
    <div className="border-b border-gray-200 mb-16">
      <div className="container mx-auto px-5">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight py-8 flex items-center text-gray-900">
          <Link href={links.blog} className="hover:text-orange-500 transition-colors duration-200">
            {t('blog.backToBlog')}
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default Header;

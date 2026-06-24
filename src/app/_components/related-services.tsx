'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedLinks } from '@/hooks/useLocalizedLinks';
import { SERVICES, getServicesByGroup } from '@/lib/services-config';
import Link from 'next/link';

interface RelatedServicesProps {
  currentService: string;
  className?: string;
}

export default function RelatedServices({ currentService, className = '' }: RelatedServicesProps) {
  const { t } = useLanguage();
  const { links } = useLocalizedLinks();

  const current = SERVICES.find((s) => s.key === currentService);
  if (!current) return null;

  const relatedServices = getServicesByGroup(current.group)
    .filter((s) => s.key !== currentService)
    .slice(0, 3);

  if (relatedServices.length === 0) return null;

  return (
    <section className={`py-16 bg-sw-bg-1 ${className}`}>
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-sw-fg-1 mb-4">
            {t('relatedServices.title')}
          </h2>
          <p className="text-lg md:text-xl text-sw-fg-3 max-w-3xl mx-auto">
            {t('relatedServices.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedServices.map((service) => (
            <Link
              key={service.key}
              href={links[service.key as keyof typeof links]}
              className="group bg-sw-bg-0 p-8 rounded-sm border border-sw-line hover:border-sw-secondary transition-colors"
            >
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-semibold text-sw-fg-1 mb-4 group-hover:text-sw-secondary transition-colors">
                  {t(`relatedServices.services.${service.key}.title`)}
                </h3>
                <p className="text-sw-fg-3 leading-relaxed mb-6">
                  {t(`relatedServices.services.${service.key}.description`)}
                </p>
                <div className="inline-flex items-center text-sw-secondary font-semibold">
                  {t('relatedServices.learnMore')}
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

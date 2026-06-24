'use client';

import { useState } from 'react';
import { FAQ, FAQProps } from '@/interfaces/faq';

// SVG Icons
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronUpIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

export default function FAQAccordion({ faqs, title = 'Preguntas Frecuentes', className = 'bg-sw-bg-0' }: FAQProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className={`py-16 sm:py-20 lg:py-24 px-5 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl text-center text-sw-fg-1 mb-10 sm:text-4xl">
          {title}
        </h2>
        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openItems.has(faq.id);
            return (
              <div
                key={faq.id}
                className="border border-sw-line rounded-sm overflow-hidden transition-colors hover:border-sw-line-strong"
              >
                <button
                  className="w-full px-6 py-4 text-left bg-sw-bg-1 hover:bg-sw-bg-2 focus:outline-none transition-colors duration-200"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-sw-fg-1 pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {isOpen ? (
                        <ChevronUpIcon className="h-5 w-5 text-sw-brand" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5 text-sw-fg-3" />
                      )}
                    </div>
                  </div>
                </button>
                <div
                  id={`faq-answer-${faq.id}`}
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-6 pb-4 pt-2 bg-sw-bg-1">
                    <p className="text-sw-fg-2 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
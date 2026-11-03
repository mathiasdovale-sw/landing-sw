import type React from 'react';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface FAQProps {
  faqs: FAQ[];
  title?: string;
  className?: string;
  /** Ancla de la sección (p. ej. "preguntas"). */
  id?: string;
  /** Línea opcional bajo las preguntas. */
  footer?: React.ReactNode;
}
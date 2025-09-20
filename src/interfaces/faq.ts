export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface FAQProps {
  faqs: FAQ[];
  title?: string;
  className?: string;
}
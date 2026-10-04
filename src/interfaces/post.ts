import { type Author } from "./author";

export type Post = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  preview?: boolean;
  // Optional SEO overrides: shorter <title> and meta description than title/excerpt
  seoTitle?: string;
  description?: string;
  dateModified?: string;
};

import type { Metadata } from "next";

// Metadata compartida por los 3 layouts raíz (top-level, (es) y (en)).
// Cada página real la sobreescribe con generatePageMetadata(); esto solo
// cubre los campos que las páginas no redefinen (verification, robots, etc.)
export const baseMetadata: Metadata = {
  title: "SellifyWorks | Marketing y tecnología para pymes",
  description: "Servicios de marketing digital, publicidad online, desarrollo web y tecnología para pymes, desde Barcelona.",
  keywords: ["Marketing digital", "Publicidad online", "Google Ads", "Meta Ads", "Desarrollo web", "Tecnología", "Ecommerce", "Generación de leads", "Agencia", "SellifyWorks"],
  authors: [{ name: "SellifyWorks" }],
  creator: "SellifyWorks",
  publisher: "SellifyWorks",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://www.sellifyworks.com/",
    title: "SellifyWorks | Marketing y tecnología para pymes",
    description: "Servicios de marketing digital, publicidad online, desarrollo web y tecnología para pymes, desde Barcelona.",
    siteName: "SellifyWorks",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "SellifyWorks - Marketing y tecnología para pymes",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@SellifyWorks",
    creator: "@SellifyWorks",
    title: "SellifyWorks | Marketing y tecnología para pymes",
    description: "Servicios de marketing digital, publicidad online, desarrollo web y tecnología para pymes, desde Barcelona.",
    images: {
      url: "/api/og",
      alt: "SellifyWorks - Marketing y tecnología para pymes",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION, // Agregar en variables de entorno
  },
};

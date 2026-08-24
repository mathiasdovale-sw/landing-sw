import type { Metadata } from "next";

// Metadata compartida por los 3 layouts raíz (top-level, (es) y (en)).
// Cada página real la sobreescribe con generatePageMetadata(); esto solo
// cubre los campos que las páginas no redefinen (verification, robots, etc.)
export const baseMetadata: Metadata = {
  title: "SellifyWorks | Agencia Shopify España",
  description: "Agencia especializada en Shopify. Creamos, optimizamos y hacemos crecer tiendas online que convierten. Partner de Shopify.",
  keywords: ["Shopify", "Ecommerce", "Tienda Online", "Agencia", "SellifyWorks", "Partner Shopify"],
  authors: [{ name: "SellifyWorks" }],
  creator: "SellifyWorks",
  publisher: "SellifyWorks",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: "https://www.sellifyworks.com/",
    languages: {
      'es-ES': 'https://www.sellifyworks.com/es',
      'en': 'https://www.sellifyworks.com/en',
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://www.sellifyworks.com/",
    title: "SellifyWorks | Agencia Shopify España",
    description: "Agencia especializada en Shopify. Creamos, optimizamos y hacemos crecer tiendas online que convierten. Partner de Shopify.",
    siteName: "SellifyWorks",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "SellifyWorks - Agencia Shopify España",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@SellifyWorks",
    creator: "@SellifyWorks",
    title: "SellifyWorks | Agencia Shopify",
    description: "Agencia especializada en Shopify. Creamos, optimizamos y hacemos crecer tiendas online que convierten.",
    images: {
      url: "/api/og",
      alt: "SellifyWorks - Agencia Shopify",
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

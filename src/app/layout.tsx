import Footer from "@/app/_components/footer";
import Navbar from "@/app/_components/navbar";
import NewsletterPopup from "@/app/_components/newsletter-popup-safe";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ScrollProvider } from "@/contexts/ScrollContext";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import cn from "classnames";
import "./globals.css";

const inter = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
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
      'es': 'https://www.sellifyworks.com/es',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Meta tags específicos para WhatsApp y redes sociales */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta name="theme-color" content="#f97316" />
        <meta name="msapplication-TileColor" content="#f97316" />
        
        {/* Precargar la fuente Bebas Neue con alta prioridad */}
        <link 
          rel="preload" 
          href="https://fonts.gstatic.com/s/bebasneue/v9/JTUSjIg69CK48gW7PXooxW5rygbi49c.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=block" rel="stylesheet" />
        
        {/* Google Consent Mode V2 - Must load before any other tracking scripts */}
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Set default consent state - BEFORE loading any tracking scripts
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'functionality_storage': 'granted',
              'personalization_storage': 'denied',
              'security_storage': 'granted',
              'wait_for_update': 500
            });
          `
        }} />

        {/* Google Analytics */}
        {process.env.GOOGLE_ANALYTICS_ID && (
          <>
            <script 
              async 
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
            />
            <script dangerouslySetInnerHTML={{
              __html: `
                gtag('js', new Date());
                gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}', {
                  anonymize_ip: true,
                  allow_google_signals: false,
                  allow_ad_personalization_signals: false
                });
              `
            }} />
          </>
        )}

        {/* Meta Pixel (Facebook Pixel) - Updated for Consent Mode V2 */}
        {process.env.META_PIXEL_ID && (
          <>
            <script dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                
                fbq('consent', 'revoke');
                fbq('init', '${process.env.META_PIXEL_ID}');
                fbq('track', 'PageView');
              `
            }} />
            <noscript>
              <img 
                height="1" 
                width="1" 
                style={{display: 'none'}}
                src={`https://www.facebook.com/tr?id=${process.env.META_PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
          </>
        )}
        
        <script dangerouslySetInnerHTML={{
          __html: `
            // Script inline para evitar FOUT
            (function() {
              if (sessionStorage.getItem('fontsLoaded')) {
                document.documentElement.classList.add('fonts-loaded');
                return;
              }
              
              if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(function() {
                  document.documentElement.classList.add('fonts-loaded');
                  sessionStorage.setItem('fontsLoaded', 'true');
                });
              } else {
                setTimeout(function() {
                  document.documentElement.classList.add('fonts-loaded');
                  sessionStorage.setItem('fontsLoaded', 'true');
                }, 150);
              }
            })();

            // Limpiar atributos de extensiones del navegador antes de la hidratación
            (function() {
              function cleanBrowserExtensionAttributes() {
                const attributesToRemove = [
                  'bis_register',
                  '__processed_e751b9df-856b-4290-af0d-f3b4c2c0deff__',
                  'data-darkreader-mode',
                  'data-darkreader-scheme',
                  'cz-shortcut-listen'
                ];
                
                attributesToRemove.forEach(function(attr) {
                  const elements = document.querySelectorAll('[' + attr + ']');
                  elements.forEach(function(el) {
                    el.removeAttribute(attr);
                  });
                });
              }
              
              // Limpiar al cargar
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', cleanBrowserExtensionAttributes);
              } else {
                cleanBrowserExtensionAttributes();
              }
              
              // Limpiar periódicamente (para extensiones que se añaden después)
              setInterval(cleanBrowserExtensionAttributes, 1000);
            })();
          `
        }} />
        
        <style dangerouslySetInnerHTML={{
          __html: `
            /* CSS crítico para prevenir FOUT */
            html:not(.fonts-loaded) [style*="Bebas Neue"] {
              opacity: 0;
              transition: opacity 0.2s ease-in-out;
            }
            
            html.fonts-loaded [style*="Bebas Neue"] {
              opacity: 1;
            }
            
            /* Fallback rápido si las fuentes no cargan */
            [style*="Bebas Neue"] {
              animation: fadeInFont 0.3s ease-in-out 0.2s both;
            }
            
            @keyframes fadeInFont {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `
        }} />
        
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />

        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        
        {/* CookieYes Integration with Google Consent Mode V2 */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Listen for CookieYes consent changes
            window.addEventListener('cky_updated', function(event) {
              const consent = event.detail;
              
              // Update Google Consent Mode V2
              gtag('consent', 'update', {
                'ad_storage': consent.analytics ? 'granted' : 'denied',
                'ad_user_data': consent.advertisement ? 'granted' : 'denied',
                'ad_personalization': consent.advertisement ? 'granted' : 'denied',
                'analytics_storage': consent.analytics ? 'granted' : 'denied',
                'functionality_storage': 'granted',
                'personalization_storage': consent.functional ? 'granted' : 'denied',
                'security_storage': 'granted'
              });

              // Update Facebook Pixel consent
              if (typeof fbq !== 'undefined') {
                if (consent.advertisement) {
                  fbq('consent', 'grant');
                } else {
                  fbq('consent', 'revoke');
                }
              }
            });

            // Handle initial consent state when CookieYes loads
            window.addEventListener('cky_loaded', function() {
              if (typeof CookieYes !== 'undefined') {
                const activeCategories = CookieYes.getActiveCategories();
                
                gtag('consent', 'update', {
                  'ad_storage': activeCategories.includes('analytics') ? 'granted' : 'denied',
                  'ad_user_data': activeCategories.includes('advertisement') ? 'granted' : 'denied',
                  'ad_personalization': activeCategories.includes('advertisement') ? 'granted' : 'denied',
                  'analytics_storage': activeCategories.includes('analytics') ? 'granted' : 'denied',
                  'functionality_storage': 'granted',
                  'personalization_storage': activeCategories.includes('functional') ? 'granted' : 'denied',
                  'security_storage': 'granted'
                });

                if (typeof fbq !== 'undefined') {
                  if (activeCategories.includes('advertisement')) {
                    fbq('consent', 'grant');
                  } else {
                    fbq('consent', 'revoke');
                  }
                }
              }
            });
          `
        }} />

        <script id="cookieyes" type="text/javascript" src="https://cdn-cookieyes.com/client_data/66ddcee4ff6ed9e3a4552770/script.js"></script> 
      </head>
      <body
        className={cn(inter.className)}
        style={{ backgroundColor: '#141417ff' }}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <ScrollProvider>
            <Navbar />
            <div className="min-h-screen">{children}</div>
            <Footer />    
            <NewsletterPopup />
            {/* <NewsletterTestButton /> */}
          </ScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

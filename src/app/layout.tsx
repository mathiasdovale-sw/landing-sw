import Footer from "@/app/_components/footer";
import Navbar from "@/app/_components/navbar";
import NewsletterPopup from "@/app/_components/newsletter-popup-safe";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ScrollProvider } from "@/contexts/ScrollContext";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
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

        
        {/* Precargar la fuente Bebas Neue con alta prioridad */}
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
              'functionality_storage': 'denied',
              'personalization_storage': 'denied',
              'security_storage': 'granted',
              'wait_for_update': 2000
            });
            gtag('set', 'ads_data_redaction', true);
            gtag('set', 'url_passthrough', true);
          `
        }} />

        {/* Meta Pixel — NOT loaded until advertisement consent is granted.
            Loading fbevents.js before consent can set cookies (GDPR violation). */}
        {process.env.META_PIXEL_ID && (
          <script dangerouslySetInnerHTML={{
            __html: `
              window.__META_PIXEL_ID = '${process.env.META_PIXEL_ID}';
              window.__loadMetaPixel = function() {
                if (window.__metaPixelLoaded) return;
                window.__metaPixelLoaded = true;
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('consent', 'grant');
                fbq('init', window.__META_PIXEL_ID);
                fbq('track', 'PageView');
              };
            `
          }} />
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
        <meta name="msapplication-TileColor" content="#f97316" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#f97316" />

        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        
        {/* CookieYes handles GCM consent updates natively (Support GCM is ON).
            These listeners ONLY handle deferred Meta Pixel loading — no gtag calls. */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Load Meta Pixel when user grants advertisement consent
            window.addEventListener('cky_updated', function(event) {
              var accepted = (event.detail || {}).accepted || [];
              if (accepted.includes('advertisement') && typeof window.__loadMetaPixel === 'function') {
                window.__loadMetaPixel();
              }
            });

            // Returning visitor — load Meta Pixel if advertisement was previously accepted
            window.addEventListener('cky_loaded', function() {
              if (typeof CookieYes !== 'undefined') {
                var cats = CookieYes.getActiveCategories();
                if (cats.includes('advertisement') && typeof window.__loadMetaPixel === 'function') {
                  window.__loadMetaPixel();
                }
              }
            });
          `
        }} />
      </head>
      <body
        className={cn(inter.className)}
        style={{ backgroundColor: '#141417ff' }}
        suppressHydrationWarning
      >
        {/* === ADVANCED CONSENT MODE order: Consent defaults → GTM → CookieYes ===
            GTM fires BEFORE consent is granted, sending cookieless pings for
            conversion modeling even when the user denies cookies.
            CookieYes updates consent state afterwards via GCM integration.
            IMPORTANT: Enable "Allow Google tags to fire before consent" in CookieYes Dashboard.
        */}

        {/* GTM — beforeInteractive so it loads with denied defaults and sends cookieless pings */}
        <Script
          id="_next-gtm-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,l){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              })(window,'dataLayer');
            `,
          }}
        />
        <Script
          id="_next-gtm"
          strategy="beforeInteractive"
          src="https://www.googletagmanager.com/gtm.js?id=GTM-W394L8VN"
        />

        {/* CookieYes CMP — beforeInteractive, loads after GTM to update consent state */}
        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/66ddcee4ff6ed9e3a4552770/script.js"
          strategy="beforeInteractive"
        />

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

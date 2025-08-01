import Footer from "@/app/_components/footer";
import { HOME_OG_IMAGE_URL } from "@/lib/constants";
import Navbar from "@/app/_components/navbar";
import NewsletterPopup from "@/app/_components/newsletter-popup-safe";
import NewsletterTestButton from "@/app/_components/newsletter-test-button";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import cn from "classnames";
import "./globals.css";

const inter = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: `SellifyWorks | Shopify Agency`,
  description: `Shopify agency in Barcelona. We help you sell more on Shopify.`,
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
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

        <script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="06b8e839-4665-4847-bc71-210c298a1027" data-blockingmode="auto" type="text/javascript"></script>
      </head>
      <body
        className={cn(inter.className, "bg-black")}
        suppressHydrationWarning
      >
        <Navbar />
        <div className="min-h-screen">{children}</div>
        <Footer />
        <NewsletterPopup />
        {/* <NewsletterTestButton /> */}
      </body>
    </html>
  );
}

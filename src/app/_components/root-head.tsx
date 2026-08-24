// Contenido de <head> compartido por los 3 layouts raíz (top-level, (es) y (en)).
export default function RootHead() {
  return (
    <>
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
    </>
  );
}

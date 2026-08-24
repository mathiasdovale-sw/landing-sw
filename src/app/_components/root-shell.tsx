import Script from "next/script";
import Footer from "@/app/_components/footer";
import Navbar from "@/app/_components/navbar";
import NewsletterPopup from "@/app/_components/newsletter-popup-safe";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ScrollProvider } from "@/contexts/ScrollContext";

// <body> compartido por los 3 layouts raíz (top-level, (es) y (en)).
export default function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <>
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
        </ScrollProvider>
      </LanguageProvider>
    </>
  );
}

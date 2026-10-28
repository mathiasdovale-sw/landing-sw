import type { Metadata } from "next"
import VisualBreadcrumbs from "@/app/_components/visual-breadcrumbs"
import ProfitCalculator from "@/app/_components/profit-calculator/profit-calculator"
import { getCanonicalBaseUrl } from "@/lib/seo-utils"

// Página solo en español (por ahora). No usa generatePageMetadata porque esa
// función genera hreflang a una versión /en que no existe.
const PATH = "/es/calculadora-rentabilidad"
const TITLE = "Calculadora de beneficios para ecommerce: ¿tu tienda gana o pierde? | SellifyWorks"
const DESCRIPTION =
  "Calculadora de beneficios gratuita para tiendas online: mete tus ventas, costes y marketing y descubre tu beneficio real, margen de contribución, ROAS breakeven, MER, CAC y la proyección a 12 meses."

const canonical = `${getCanonicalBaseUrl()}${PATH}`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: canonical,
    siteName: "SellifyWorks",
    locale: "es_ES",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
}

export default function CalculadoraBeneficiosPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de beneficios",
    url: canonical,
    description: DESCRIPTION,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: "es-ES",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    publisher: { "@type": "Organization", name: "SellifyWorks", url: getCanonicalBaseUrl() },
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VisualBreadcrumbs />

      <section className="bg-sw-bg-0 pb-10 pt-8 sm:pb-12 sm:pt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="font-mono-label text-sw-fg-3">Herramienta gratuita · Calculadora de beneficios</span>
          <h1 className="mt-4 max-w-4xl font-display text-4xl text-sw-fg-1 sm:text-5xl lg:text-6xl">
            ¿Tu tienda online gana o pierde dinero?
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-sw-fg-2">
            Mete tus números y descubre en unos minutos cuánto te queda de verdad, qué canal se paga y qué no, y qué hacer después. Sin registro. Tus números no
            salen de tu navegador; si pides la revisión, solo nos llega tu email.
          </p>
        </div>
      </section>

      <ProfitCalculator />
    </main>
  )
}

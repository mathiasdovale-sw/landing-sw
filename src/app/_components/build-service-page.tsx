import Link from "next/link"
import { Check } from "lucide-react"
import ServiceStructuredData from "./service-structured-data"
import VisualBreadcrumbs from "./visual-breadcrumbs"
import FAQAccordion from "./faq-accordion"
import StickyContactBar from "./sticky-contact-bar"
import ContactSection from "./contact-section"
import CaseStudySection from "./case-study-section"
import AboutMe from "./about-me"
import MobileStickyCta from "./mobile-sticky-cta"
import { FAQ } from "@/interfaces/faq"
import { OFFER_SAMPLE } from "@/lib/commitments"
import type { CaseKey } from "@/lib/cases"
import type { ServiceOption } from "@/lib/contact-services"

// Páginas de "construir": migración a Shopify y tienda nueva. También son landings
// de anuncios: un único CTA, que baja al formulario de esta misma página.
// Orden: hero → (muestra) → plataformas → qué incluye → caso → plazo y precio →
// quién soy → preguntas → contacto → línea de mejora continua.

const FORM = "#contacto"
type Service = "migration" | "newStore"
type Locale = "es" | "en"

interface Copy {
  cta: string
  sd: { name: string; description: string }
  eyebrow: string
  h1: [string, string]
  lede: string
  meta: string[]
  sample?: { title: string; text: string; button: string }
  fromLabel?: string
  platforms?: string[]
  includesEyebrow: string
  includesTitle: string
  includes: { title: string; text: string }[]
  caseKeys: CaseKey[]
  caseTitle: string
  /** Título del bloque de contacto (por defecto, el general: "Hablemos de tu tienda."). */
  contactTitle?: string
  termsEyebrow: string
  /** Dos tarjetas (plazo / precio) o un único texto. */
  terms: { label: string; value: string; note: string }[] | string
  faqTitle: string
  monthly: { text: string; link: string; href: string }
  stickyTitle: string
  stickyPrice: string
}

const COPY: Record<Service, Record<Locale, Copy>> = {
  migration: {
    es: {
      cta: "Pide una reunión gratis",
      sd: {
        name: "Migración a Shopify",
        description:
          "Migración a Shopify desde WooCommerce, PrestaShop, Wix, Magento y otras plataformas, sin cerrar la tienda ni perder posicionamiento. En aproximadamente 3 semanas, con precio cerrado antes de empezar.",
      },
      eyebrow: "Migración a Shopify · Con mejoras",
      h1: ["Pásate a Shopify sin perder Google,", "pedidos ni un día de ventas."],
      lede: "Construyo tu tienda nueva en Shopify en paralelo, con las mejoras ya hechas, y hacemos el cambio cuando todo está revisado.",
      meta: ["Reunión gratis para ver tu tienda", "En aproximadamente 3 semanas", "Precio cerrado antes de empezar"],
      sample: {
        title: "Antes de decidir, mira cómo quedaría tu tienda.",
        text: "Te preparo una muestra de tu tienda en Shopify para que veas el resultado antes de comprometerte.",
        button: "Pide tu muestra",
      },
      fromLabel: "Migro desde",
      platforms: ["WooCommerce / WordPress", "PrestaShop", "Wix", "Magento", "Otras"],
      includesEyebrow: "Qué incluye",
      includesTitle: "No solo cambias de plataforma: sales vendiendo mejor.",
      includes: [
        { title: "Tienda nueva a medida", text: "No parto de una plantilla: la tienda se hace para tu catálogo y tu marca." },
        { title: "Dos revisiones de diseño", text: "Ves el diseño antes de que esté terminado y puedes pedir cambios dos veces." },
        { title: "Carga y textos del catálogo", text: "Subo tus productos con fichas cuidadas." },
        { title: "Mejoras de conversión incluidas", text: "La tienda nueva sale con las mejoras ya hechas: ficha de producto, confianza y checkout." },
        { title: "Cuidado del SEO", text: "Mantengo las URLs cuando es posible y configuro redirecciones 301." },
        { title: "Sin cerrar ni un día", text: "Tu tienda actual sigue vendiendo hasta el cambio final." },
      ],
      caseKeys: ["canramos", "matesramos"],
      caseTitle: "Migraciones que he hecho",
      termsEyebrow: "Plazo y precio",
      terms: [
        { label: "Plazo", value: "Aproximadamente 3 semanas", note: "Depende sobre todo del catálogo. Te doy la fecha antes de empezar." },
        { label: "Precio", value: "Precio cerrado antes de empezar", note: "Te lo doy tras una reunión gratis en la que veo tu tienda. No cambia a mitad de proyecto." },
      ],
      faqTitle: "Preguntas sobre la migración",
      monthly: {
        text: "Cuando tu tienda ya está en Shopify, si quieres seguir mejorándola cada mes, tengo la",
        link: "mejora continua",
        href: "/es/mejora-continua",
      },
      stickyTitle: "Migración a Shopify",
      stickyPrice: "Precio cerrado tras ver tu tienda",
    },
    en: {
      cta: "Book a free meeting",
      sd: {
        name: "Shopify migration",
        description:
          "Migration to Shopify from WooCommerce, PrestaShop, Wix, Magento and other platforms, without closing the store or losing rankings. In about 3 weeks, with a fixed price agreed before starting.",
      },
      eyebrow: "Shopify migration · With improvements",
      h1: ["Switch to Shopify", "without losing Google, orders or a day of sales."],
      lede: "I build your new Shopify store alongside the current one, with the improvements already done, and we switch once everything has been checked.",
      meta: ["Free meeting to look at your store", "In about 3 weeks", "Fixed price before we start"],
      sample: {
        title: "Before you decide, see how your store would look.",
        text: "I prepare a sample of your store on Shopify so you can see the result before committing.",
        button: "Ask for your sample",
      },
      fromLabel: "I migrate from",
      platforms: ["WooCommerce / WordPress", "PrestaShop", "Wix", "Magento", "Others"],
      includesEyebrow: "What's included",
      includesTitle: "You don't just switch platforms: you come out selling better.",
      includes: [
        { title: "New custom store", text: "I don't start from a template: the store is built for your catalogue and your brand." },
        { title: "Two design revisions", text: "You see the design before it's finished and can ask for changes twice." },
        { title: "Catalogue upload and copy", text: "I upload your products with carefully written product pages." },
        { title: "Conversion improvements included", text: "The new store launches with the improvements already done: product page, trust and checkout." },
        { title: "SEO taken care of", text: "I keep URLs whenever possible and set up 301 redirects." },
        { title: "No downtime", text: "Your current store keeps selling until the final switch." },
      ],
      caseKeys: ["canramos", "matesramos"],
      caseTitle: "Migrations I've done",
      termsEyebrow: "Timing and price",
      terms: [
        { label: "Timing", value: "About 3 weeks", note: "It mostly depends on the catalogue. I give you the date before we start." },
        { label: "Price", value: "Fixed price before we start", note: "I give it to you after a free meeting where I look at your store. It doesn't change halfway through." },
      ],
      faqTitle: "Migration FAQ",
      monthly: {
        text: "Once your store is on Shopify, if you want to keep improving it every month, I offer",
        link: "continuous improvement",
        href: "/en/continuous-improvement",
      },
      stickyTitle: "Shopify migration",
      stickyPrice: "Fixed price after seeing your store",
    },
  },
  newStore: {
    es: {
      cta: "Pide una reunión gratis",
      sd: {
        name: "Tienda nueva en Shopify",
        description:
          "Creo tu tienda Shopify desde cero: diseño, catálogo, pagos y envíos configurados. Precio y fecha cerrados antes de empezar.",
      },
      eyebrow: "Tienda nueva · Shopify",
      h1: ["Tu tienda Shopify, lista para vender", "desde el primer día."],
      lede: "La construyo desde cero para tu marca y tu catálogo, con todo configurado. Precio y fecha cerrados antes de empezar.",
      meta: ["Reunión gratis", "Dos revisiones de diseño", "Precio y fecha cerrados antes de empezar"],
      includesEyebrow: "Qué incluye",
      includesTitle: "Todo configurado para empezar a vender.",
      includes: [
        { title: "Diseño a medida", text: "No parto de una plantilla genérica: la tienda se hace para tu marca y tu catálogo." },
        { title: "Dos revisiones de diseño", text: "Ves el diseño antes de que esté terminado y puedes pedir cambios dos veces." },
        { title: "Catálogo cargado", text: "Subo tus productos con fichas cuidadas." },
        { title: "Pagos y envíos configurados", text: "Tarjeta, Bizum y los métodos que necesites; tarifas de envío según tus reglas." },
        { title: "Lista para vender en más países", text: "Si lo necesitas: idiomas, monedas y envíos por mercado." },
        { title: "Tuya desde el primer día", text: "La cuenta, el dominio y todo lo construido quedan a tu nombre." },
      ],
      caseKeys: ["termolar"],
      caseTitle: "Una tienda que he construido",
      contactTitle: "Hablemos de tu proyecto.",
      termsEyebrow: "Plazo y precio",
      terms: "Según el tamaño del catálogo y lo que necesites. Te doy precio y fecha cerrados después de una reunión gratis.",
      faqTitle: "Preguntas sobre la tienda nueva",
      monthly: {
        text: "Cuando tu tienda ya esté vendiendo, si quieres seguir mejorándola cada mes, tengo la",
        link: "mejora continua",
        href: "/es/mejora-continua",
      },
      stickyTitle: "Tienda nueva en Shopify",
      stickyPrice: "Precio y fecha cerrados antes de empezar",
    },
    en: {
      cta: "Book a free meeting",
      sd: {
        name: "New Shopify store",
        description:
          "I build your Shopify store from scratch: design, catalogue, payments and shipping all set up. Price and date agreed before we start.",
      },
      eyebrow: "New store · Shopify",
      h1: ["Your Shopify store, ready to sell", "from day one."],
      lede: "I build it from scratch for your brand and your catalogue, with everything set up. Price and date agreed before we start.",
      meta: ["Free meeting", "Two design revisions", "Price and date agreed before we start"],
      includesEyebrow: "What's included",
      includesTitle: "Everything set up to start selling.",
      includes: [
        { title: "Custom design", text: "I don't start from a generic template: the store is built for your brand and your catalogue." },
        { title: "Two design revisions", text: "You see the design before it's finished and can ask for changes twice." },
        { title: "Catalogue uploaded", text: "I upload your products with carefully written product pages." },
        { title: "Payments and shipping set up", text: "Cards, Bizum and whatever methods you need; shipping rates based on your rules." },
        { title: "Ready to sell in more countries", text: "If you need it: languages, currencies and shipping by market." },
        { title: "Yours from day one", text: "The account, the domain and everything built are in your name." },
      ],
      caseKeys: ["termolar"],
      caseTitle: "A store I've built",
      contactTitle: "Let's talk about your project.",
      termsEyebrow: "Timing and price",
      terms: "Depending on the size of the catalogue and what you need. I give you a fixed price and date after a free meeting.",
      faqTitle: "New store FAQ",
      monthly: {
        text: "Once your store is selling, if you want to keep improving it every month, I offer",
        link: "continuous improvement",
        href: "/en/continuous-improvement",
      },
      stickyTitle: "New Shopify store",
      stickyPrice: "Price and date agreed before we start",
    },
  },
}

function SectionHead({ eyebrow, n }: { eyebrow: string; n: string }) {
  return (
    <div className="flex items-center justify-between gap-6">
      <span className="font-mono-label text-sw-fg-3">{eyebrow}</span>
      <span className="font-mono-label text-sw-brand">{n}</span>
    </div>
  )
}

export default function BuildServicePage({ service, locale, faqs }: { service: Service; locale: Locale; faqs: FAQ[] }) {
  const c = COPY[service][locale]
  const contactService: ServiceOption = service
  return (
    <>
      <ServiceStructuredData serviceName={c.sd.name} serviceType={service} description={c.sd.description} />
      <VisualBreadcrumbs />

      {/* Hero */}
      <section className="bg-sw-bg-0 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5">
          <span className="font-mono-label text-sw-fg-3">{c.eyebrow}</span>
          <h1 className="mt-6 max-w-5xl font-display text-[1.625rem] sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block text-sw-fg-1">{c.h1[0]}</span>
            <span className="block text-sw-brand">{c.h1[1]}</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-sw-fg-2 sm:text-xl">{c.lede}</p>
          <a
            href={FORM}
            data-service={contactService}
            data-hero-cta
            className="mt-9 inline-block rounded-sm bg-sw-brand px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-sw-brand-hover"
          >
            {c.cta}
          </a>
          <ul className="mt-9 flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:gap-x-4 md:gap-y-2">
            {c.meta.map((m, i) => (
              <li key={m} className="flex items-center gap-4">
                {i > 0 && (
                  <span aria-hidden="true" className="hidden text-sw-fg-4 md:inline">
                    ·
                  </span>
                )}
                <span className={`font-mono-label ${i === 0 ? "text-sw-brand" : "text-sw-fg-4"}`}>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Muestra antes de decidir: solo si se ofrece */}
      {OFFER_SAMPLE && c.sample && (
        <section className="bg-sw-bg-0 pb-16">
          <div className="mx-auto max-w-7xl px-5">
            <div className="flex flex-col gap-6 rounded-sm border border-sw-brand bg-sw-bg-2 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <h2 className="font-display text-2xl text-sw-fg-1 sm:text-3xl">{c.sample.title}</h2>
                <p className="mt-2 max-w-2xl text-sw-fg-2">{c.sample.text}</p>
              </div>
              <a
                href={FORM}
                data-service="migration"
                className="shrink-0 rounded-sm bg-sw-brand px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-sw-brand-hover"
              >
                {c.sample.button}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Desde dónde */}
      {c.platforms && (
        <section className="border-y border-sw-line bg-sw-bg-1 py-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 sm:flex-row sm:items-center sm:gap-8">
            <span className="font-mono-label text-sw-fg-3">{c.fromLabel}</span>
            <ul className="flex flex-wrap gap-3">
              {c.platforms.map((p) => (
                <li key={p} className="rounded-sm border border-sw-line-strong px-4 py-2 text-sm text-sw-fg-1">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 01 — Qué incluye */}
      <section id="incluye" className={`bg-sw-bg-0 py-16 sm:py-20 lg:py-24 ${c.platforms ? "" : "border-t border-sw-line"}`}>
        <div className="mx-auto max-w-7xl px-5">
          <SectionHead eyebrow={c.includesEyebrow} n="01" />
          <h2 className="mt-6 max-w-3xl font-display text-3xl text-sw-fg-1 sm:text-4xl lg:text-5xl">{c.includesTitle}</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {c.includes.map((i) => (
              <div key={i.title} className="flex gap-4">
                <Check className="mt-1 h-5 w-5 shrink-0 text-sw-brand" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-semibold text-sw-fg-1">{i.title}</h3>
                  <p className="mt-1 text-sw-fg-2">{i.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Caso */}
      <CaseStudySection locale={locale} cases={c.caseKeys} title={c.caseTitle} />

      {/* 02 — Plazo y precio */}
      <section className="bg-sw-bg-0 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHead eyebrow={c.termsEyebrow} n="02" />
          {typeof c.terms === "string" ? (
            <p className="mt-8 max-w-3xl text-xl font-semibold leading-snug text-sw-fg-1 sm:text-2xl">{c.terms}</p>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {c.terms.map((t) => (
                <div key={t.label} className="min-w-0 rounded-sm border border-sw-line bg-sw-bg-2 p-5 sm:p-8">
                  <span className="font-mono-label text-sw-fg-3">{t.label}</span>
                  <p className="mt-4 break-words font-display text-2xl text-sw-fg-1 [hyphens:auto] sm:text-4xl">{t.value}</p>
                  <p className="mt-3 text-sw-fg-2">{t.note}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <AboutMe locale={locale} className="bg-sw-bg-1" />

      <FAQAccordion faqs={faqs} title={c.faqTitle} className="bg-sw-bg-0" id="preguntas" />

      <ContactSection defaultService={contactService} title={c.contactTitle} />

      {/* Mejora continua: una línea discreta al final */}
      <section className="border-t border-sw-line bg-sw-bg-1 py-8">
        <p className="mx-auto max-w-7xl px-5 text-sm text-sw-fg-3">
          {c.monthly.text}{" "}
          <Link href={c.monthly.href} className="font-semibold text-sw-brand underline-offset-4 hover:underline">
            {c.monthly.link}
          </Link>
          .
        </p>
      </section>

      <StickyContactBar title={c.stickyTitle} price={c.stickyPrice} ctaLabel={c.cta} ctaHref={FORM} />
      <MobileStickyCta locale={locale} service={contactService} />
    </>
  )
}

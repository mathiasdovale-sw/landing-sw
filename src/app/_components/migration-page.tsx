import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import ServiceStructuredData from "./service-structured-data"
import VisualBreadcrumbs from "./visual-breadcrumbs"
import FAQAccordion from "./faq-accordion"
import StickyContactBar from "./sticky-contact-bar"
import ContactSection from "./contact-section"
import { FAQ } from "@/interfaces/faq"

// Migración a Shopify. También es landing de Google Ads: un único CTA, que
// baja al formulario de esta misma página. Sin precios publicados.

const FORM = "#contacto"

const COPY = {
  es: {
    cta: "Pide una reunión gratis",
    sd: {
      name: "Migración a Shopify con mejoras",
      description:
        "Migración a Shopify desde WooCommerce, PrestaShop, Wix, Magento y otras plataformas, con las mejoras de conversión ya hechas y sin cerrar la tienda. En aproximadamente 3 semanas, con precio cerrado antes de empezar.",
    },
    eyebrow: "Migración a Shopify · Con mejoras",
    h1: ["Tu plataforma actual te está", "haciendo perder ventas."],
    lede: "Migro tu tienda a Shopify con las mejoras ya hechas, sin cerrar ni un día.",
    meta: ["Reunión gratis para ver tu tienda", "En aproximadamente 3 semanas", "Precio cerrado antes de empezar"],
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
    termsEyebrow: "Plazo y precio",
    timeLabel: "Plazo",
    time: "Aproximadamente 3 semanas",
    timeNote: "Depende sobre todo del catálogo. Te doy la fecha antes de empezar.",
    priceLabel: "Precio",
    price: "Precio cerrado antes de empezar",
    priceNote: "Te lo doy tras una reunión gratis en la que veo tu tienda. No cambia a mitad de proyecto.",
    afterEyebrow: "Y después",
    afterTitle: "Cuando tu tienda ya está en Shopify, seguimos con la mejora continua.",
    afterText: "Al menos 4 mejoras implementadas al mes e informe de facturación por visita. 290 € + IVA al mes, sin permanencia.",
    afterHref: "/es/mejora-continua",
    afterLink: "Ver la mejora continua",
    faqTitle: "Preguntas sobre la migración",
    stickyTitle: "Migración a Shopify",
    stickyPrice: "Precio cerrado tras ver tu tienda",
  },
  en: {
    cta: "Book a free meeting",
    sd: {
      name: "Shopify migration with improvements",
      description:
        "Migration to Shopify from WooCommerce, PrestaShop, Wix, Magento and other platforms, with the conversion improvements already done and without closing the store. In about 3 weeks, with a fixed price agreed before starting.",
    },
    eyebrow: "Shopify migration · With improvements",
    h1: ["Your current platform is", "costing you sales."],
    lede: "I migrate your store to Shopify with the improvements already done, without closing for a single day.",
    meta: ["Free meeting to look at your store", "In about 3 weeks", "Fixed price before we start"],
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
    termsEyebrow: "Timing and price",
    timeLabel: "Timing",
    time: "About 3 weeks",
    timeNote: "It mostly depends on the catalogue. I give you the date before we start.",
    priceLabel: "Price",
    price: "Fixed price before we start",
    priceNote: "I give it to you after a free meeting where I look at your store. It doesn't change halfway through.",
    afterEyebrow: "And then",
    afterTitle: "Once your store is on Shopify, we continue with continuous improvement.",
    afterText: "At least 4 improvements implemented every month and a revenue-per-visit report. €290 + VAT per month, no lock-in.",
    afterHref: "/en/continuous-improvement",
    afterLink: "See continuous improvement",
    faqTitle: "Migration FAQ",
    stickyTitle: "Shopify migration",
    stickyPrice: "Fixed price after seeing your store",
  },
}

export default function MigrationPage({ locale, faqs }: { locale: "es" | "en"; faqs: FAQ[] }) {
  const c = COPY[locale]
  return (
    <>
      <ServiceStructuredData serviceName={c.sd.name} serviceType="migration" description={c.sd.description} />
      <VisualBreadcrumbs />

      {/* Hero */}
      <section className="bg-sw-bg-0 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5">
          <span className="font-mono-label text-sw-fg-3">{c.eyebrow}</span>
          <h1 className="mt-6 max-w-5xl font-display text-5xl sm:text-6xl lg:text-7xl">
            <span className="block text-sw-fg-1">{c.h1[0]}</span>
            <span className="block text-sw-secondary">{c.h1[1]}</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-sw-fg-2 sm:text-xl">{c.lede}</p>
          <a
            href={FORM}
            className="mt-9 inline-block rounded-sm bg-sw-brand px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-sw-brand-hover"
          >
            {c.cta}
          </a>
          <ul className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2">
            {c.meta.map((m, i) => (
              <li key={m} className="flex items-center gap-4">
                {i > 0 && (
                  <span aria-hidden="true" className="text-sw-fg-4">
                    ·
                  </span>
                )}
                <span className={`font-mono-label ${i === 0 ? "text-sw-secondary" : "text-sw-fg-4"}`}>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Desde dónde */}
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

      {/* 01 — Qué incluye */}
      <section id="incluye" className="bg-sw-bg-0 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex items-center justify-between gap-6">
            <span className="font-mono-label text-sw-fg-3">{c.includesEyebrow}</span>
            <span className="font-mono-label text-sw-secondary">01</span>
          </div>
          <h2 className="mt-6 max-w-3xl font-display text-3xl text-sw-fg-1 sm:text-4xl lg:text-5xl">{c.includesTitle}</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {c.includes.map((i) => (
              <div key={i.title} className="flex gap-4">
                <Check className="mt-1 h-5 w-5 shrink-0 text-sw-secondary" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-semibold text-sw-fg-1">{i.title}</h3>
                  <p className="mt-1 text-sw-fg-2">{i.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — Plazo y precio */}
      <section className="bg-sw-bg-1 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex items-center justify-between gap-6">
            <span className="font-mono-label text-sw-fg-3">{c.termsEyebrow}</span>
            <span className="font-mono-label text-sw-secondary">02</span>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-sm border border-sw-line bg-sw-bg-2 p-6 sm:p-8">
              <span className="font-mono-label text-sw-fg-3">{c.timeLabel}</span>
              <p className="mt-4 font-display text-3xl text-sw-fg-1 sm:text-4xl">{c.time}</p>
              <p className="mt-3 text-sw-fg-2">{c.timeNote}</p>
            </div>
            <div className="rounded-sm border border-sw-line bg-sw-bg-2 p-6 sm:p-8">
              <span className="font-mono-label text-sw-fg-3">{c.priceLabel}</span>
              <p className="mt-4 font-display text-3xl text-sw-fg-1 sm:text-4xl">{c.price}</p>
              <p className="mt-3 text-sw-fg-2">{c.priceNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Y después */}
      <section className="bg-sw-bg-0 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="rounded-sm border border-sw-line p-6 sm:p-8">
            <span className="font-mono-label text-sw-fg-3">{c.afterEyebrow}</span>
            <h2 className="mt-4 font-display text-2xl text-sw-fg-1 sm:text-3xl">{c.afterTitle}</h2>
            <p className="mt-3 max-w-2xl text-sw-fg-2">{c.afterText}</p>
            <Link href={c.afterHref} className="mt-6 inline-flex items-center gap-2 font-semibold text-sw-secondary hover:text-sw-fg-1">
              {c.afterLink}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Formulario a mano */}
      <ContactSection />

      <FAQAccordion faqs={faqs} title={c.faqTitle} className="bg-sw-bg-0" />

      <StickyContactBar title={c.stickyTitle} price={c.stickyPrice} ctaLabel={c.cta} ctaHref={FORM} />
    </>
  )
}

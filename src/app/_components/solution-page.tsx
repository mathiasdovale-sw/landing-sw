import Link from "next/link"
import { ArrowRight } from "lucide-react"
import ServiceStructuredData from "./service-structured-data"
import VisualBreadcrumbs from "./visual-breadcrumbs"
import ContactSection from "./contact-section"
import CaseStudySection from "./case-study-section"
import AboutMe from "./about-me"
import Commitments from "./home/commitments"
import MobileStickyCta from "./mobile-sticky-cta"
import { MAIN_CTA } from "@/lib/commitments"
import type { CaseKey } from "@/lib/cases"

// Páginas de solución por tipo de negocio: /ecommerce y /generacion-de-leads.
// Orden: hero → problemas y qué hago → servicios implicados → prueba → contacto.
// Prueba: casos reales si los hay; si no, perfil y compromisos (nunca resultados inventados).

const FORM = "#contacto"
type Solution = "ecommerce" | "leads"
type Locale = "es" | "en"

interface Copy {
  sd: { name: string; description: string }
  eyebrow: string
  h1: [string, string]
  lede: string
  secondary: { label: string; href: string }
  problemsTitle: string
  problemLabel: string
  solutionLabel: string
  problems: { problem: string; solution: string }[]
  /** Línea opcional bajo la tabla de problemas. */
  problemsNote?: string
  servicesTitle: string
  services: { label: string; text: string; href: string }[]
  /** Casos a mostrar como prueba. Vacío = perfil y compromisos. */
  caseKeys: CaseKey[]
  caseTitle?: string
  proofTitle?: string
  contactTitle: string
}

const COPY: Record<Solution, Record<Locale, Copy>> = {
  ecommerce: {
    es: {
      sd: {
        name: "Crecimiento para e-commerce",
        description:
          "Anuncios en Google y Meta, mejoras de la tienda y automatizaciones, con la medición de ventas e ingresos por canal bien montada.",
      },
      eyebrow: "Solución · Vendo online",
      h1: ["Más ventas online,", "con anuncios, tienda y datos conectados."],
      lede: "Llevo tus anuncios, mejoro tu tienda y automatizo lo que hoy haces a mano, midiendo qué te deja dinero de verdad.",
      secondary: { label: "Ver casos", href: "#casos-reales" },
      problemsTitle: "¿Te suena alguno de estos problemas?",
      problemLabel: "Problema",
      solutionLabel: "Qué hago",
      problems: [
        { problem: "Inviertes en anuncios y no sabes qué venden", solution: "Mido compras e ingresos por canal y optimizo por rentabilidad." },
        { problem: "Muchas visitas, pocas compras", solution: "Mejoro fichas de producto, confianza y checkout con datos de sesiones reales." },
        { problem: "Tu tienda se queda corta", solution: "Tienda nueva o migración a Shopify sin perder ventas ni posicionamiento." },
        { problem: "Pedidos, stock o mayoristas a mano", solution: "Integraciones con tu ERP, facturación o logística y automatización de pedidos." },
      ],
      servicesTitle: "Servicios implicados",
      services: [
        { label: "Anuncios", text: "Google Ads y Meta Ads optimizados por rentabilidad.", href: "/es/anuncios" },
        { label: "Tienda nueva", text: "Tu tienda Shopify desde cero, lista para vender.", href: "/es/tienda-nueva" },
        { label: "Migración a Shopify", text: "Sin cerrar ni un día y cuidando tu posicionamiento.", href: "/es/migracion-shopify" },
        { label: "Desarrollos a medida", text: "Integraciones y automatizaciones que ninguna app resuelve.", href: "/es/desarrollos-a-medida" },
        { label: "Acompañamiento mensual", text: "Anuncios y mejoras de la tienda cada mes, sin permanencia.", href: "/es/mejora-continua" },
      ],
      caseKeys: ["canramos", "matesramos", "termolar"],
      caseTitle: "Tiendas que he construido",
      contactTitle: "Hablemos de tu tienda.",
    },
    en: {
      sd: {
        name: "E-commerce growth",
        description:
          "Google and Meta ads, store improvements and automations, with sales and revenue tracking by channel set up properly.",
      },
      eyebrow: "Solution · I sell online",
      h1: ["More online sales,", "with ads, store and data connected."],
      lede: "I run your ads, improve your store and automate what you do by hand today, measuring what really makes you money.",
      secondary: { label: "See case studies", href: "#casos-reales" },
      problemsTitle: "Do any of these problems sound familiar?",
      problemLabel: "Problem",
      solutionLabel: "What I do",
      problems: [
        { problem: "You spend on ads and don't know what they sell", solution: "I measure purchases and revenue by channel and optimise for profitability." },
        { problem: "Lots of visits, few purchases", solution: "I improve product pages, trust and checkout using real session data." },
        { problem: "Your store is falling short", solution: "A new store or a migration to Shopify without losing sales or rankings." },
        { problem: "Orders, stock or wholesale handled by hand", solution: "Integrations with your ERP, invoicing or logistics, and order automation." },
      ],
      servicesTitle: "Services involved",
      services: [
        { label: "Ads", text: "Google Ads and Meta Ads optimised for profitability.", href: "/en/ads" },
        { label: "New store", text: "Your Shopify store from scratch, ready to sell.", href: "/en/new-shopify-store" },
        { label: "Migration to Shopify", text: "Without closing for a day and protecting your rankings.", href: "/en/shopify-migration" },
        { label: "Custom development", text: "Integrations and automations no app can handle.", href: "/en/custom-shopify-development" },
        { label: "Monthly support", text: "Ads and store improvements every month, no lock-in.", href: "/en/continuous-improvement" },
      ],
      caseKeys: ["canramos", "matesramos", "termolar"],
      caseTitle: "Stores I've built",
      contactTitle: "Let's talk about your store.",
    },
  },
  leads: {
    es: {
      sd: {
        name: "Generación de leads",
        description:
          "Campañas en Google y Meta optimizadas por leads cualificados, landing pages que convierten y seguimiento automático de cada contacto hasta la venta.",
      },
      eyebrow: "Solución · Capto clientes por internet",
      h1: ["Más clientes desde internet,", "con cada contacto medido hasta la venta."],
      lede: "Anuncios que traen contactos, páginas que los convierten y un seguimiento automático para que no se escape ninguno.",
      secondary: { label: "Ver servicios implicados", href: "#servicios-implicados" },
      problemsTitle: "¿Te suena alguno de estos problemas?",
      problemLabel: "Problema",
      solutionLabel: "Qué hago",
      problems: [
        { problem: "Te llegan pocos contactos o de mala calidad", solution: "Campañas en Google y Meta optimizadas por leads cualificados." },
        { problem: "Tu web no convierte las visitas en contactos", solution: "Landing pages pensadas para captar." },
        { problem: "Los contactos se pierden entre email, formularios y WhatsApp", solution: "Los conecto con tu email o CRM y aviso de cada lead nuevo." },
        { problem: "No sabes qué canal te trae clientes", solution: "Panel de leads, coste por lead y conversión a cliente por canal." },
      ],
      problemsNote:
        "Si aún no tienes una web preparada para captar, también la hago: web o landing con formularios conectados desde el primer día.",
      servicesTitle: "Servicios implicados",
      services: [
        { label: "Anuncios", text: "Google Ads y Meta Ads optimizados por leads cualificados.", href: "/es/anuncios" },
        { label: "Desarrollos a medida", text: "Webs, landing pages, formularios, WhatsApp y CRM conectados.", href: "/es/desarrollos-a-medida" },
        { label: "Acompañamiento mensual", text: "Anuncios y mejoras de la web cada mes, sin permanencia.", href: "/es/mejora-continua" },
      ],
      caseKeys: [],
      proofTitle: "Lo que te garantizo",
      contactTitle: "Hablemos de tu negocio.",
    },
    en: {
      sd: {
        name: "Lead generation",
        description:
          "Google and Meta campaigns optimised for qualified leads, landing pages that convert and automatic follow-up of every lead through to the sale.",
      },
      eyebrow: "Solution · I get clients online",
      h1: ["More clients from the internet,", "with every lead measured through to the sale."],
      lede: "Ads that bring in leads, pages that convert them and automatic follow-up so none slip away.",
      secondary: { label: "See the services involved", href: "#servicios-implicados" },
      problemsTitle: "Do any of these problems sound familiar?",
      problemLabel: "Problem",
      solutionLabel: "What I do",
      problems: [
        { problem: "You get few leads, or poor-quality ones", solution: "Google and Meta campaigns optimised for qualified leads." },
        { problem: "Your website doesn't turn visits into leads", solution: "Landing pages built to capture them." },
        { problem: "Leads get lost between email, forms and WhatsApp", solution: "I connect them to your email or CRM and notify you of every new lead." },
        { problem: "You don't know which channel brings you clients", solution: "A dashboard with leads, cost per lead and conversion to client by channel." },
      ],
      problemsNote:
        "If you don't have a website ready to capture leads yet, I'll build that too: a website or landing page with forms connected from day one.",
      servicesTitle: "Services involved",
      services: [
        { label: "Ads", text: "Google Ads and Meta Ads optimised for qualified leads.", href: "/en/ads" },
        { label: "Custom development", text: "Websites, landing pages, forms, WhatsApp and CRM connected.", href: "/en/custom-shopify-development" },
        { label: "Monthly support", text: "Ads and website improvements every month, no lock-in.", href: "/en/continuous-improvement" },
      ],
      caseKeys: [],
      proofTitle: "What I guarantee",
      contactTitle: "Let's talk about your business.",
    },
  },
}

export default function SolutionPage({ solution, locale }: { solution: Solution; locale: Locale }) {
  const c = COPY[solution][locale]
  return (
    <>
      <ServiceStructuredData serviceName={c.sd.name} serviceType={solution} description={c.sd.description} />
      <VisualBreadcrumbs />

      {/* Hero */}
      <section className="bg-sw-bg-0 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5">
          <span className="font-mono-label text-sw-fg-3">{c.eyebrow}</span>
          <h1 className="mt-6 max-w-5xl font-display text-[1.75rem] sm:text-5xl md:text-6xl">
            <span className="block text-sw-fg-1">{c.h1[0]}</span>{" "}
            <span className="block text-sw-brand">{c.h1[1]}</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-sw-fg-2 sm:text-xl">{c.lede}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={FORM}
              data-hero-cta
              className="rounded-sm bg-sw-brand px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-sw-brand-hover"
            >
              {MAIN_CTA[locale]}
            </a>
            <a
              href={c.secondary.href}
              className="rounded-sm border border-sw-line-strong px-7 py-4 text-base font-semibold text-sw-fg-1 transition-colors hover:border-sw-fg-1"
            >
              {c.secondary.label}
            </a>
          </div>
        </div>
      </section>

      {/* Problemas y qué hago */}
      <section className="border-t border-sw-line bg-sw-bg-0 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="font-display text-3xl text-sw-fg-1 sm:text-4xl">{c.problemsTitle}</h2>
          <div className="mt-10 overflow-hidden rounded-sm border border-sw-line">
            <div className="hidden grid-cols-2 border-b border-sw-line bg-sw-bg-1 md:grid">
              <span className="px-6 py-4 font-mono-label text-sw-fg-3">{c.problemLabel}</span>
              <span className="px-6 py-4 font-mono-label text-sw-fg-3">{c.solutionLabel}</span>
            </div>
            <ul>
              {c.problems.map((p) => (
                <li key={p.problem} className="grid border-b border-sw-line bg-sw-bg-2 last:border-b-0 md:grid-cols-2">
                  <p className="px-6 pt-5 text-lg font-semibold text-sw-fg-1 md:py-5">{p.problem}</p>
                  <p className="flex gap-3 px-6 pb-5 pt-2 leading-relaxed text-sw-fg-2 md:py-5">
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-sw-brand" aria-hidden="true" />
                    {p.solution}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          {c.problemsNote && <p className="mt-8 max-w-3xl text-lg leading-relaxed text-sw-fg-2">{c.problemsNote}</p>}
        </div>
      </section>

      {/* Servicios implicados */}
      <section id="servicios-implicados" className="bg-sw-bg-1 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="font-display text-3xl text-sw-fg-1 sm:text-4xl">{c.servicesTitle}</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.services.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="group flex h-full flex-col rounded-sm border border-sw-line bg-sw-bg-2 p-6 transition-colors hover:border-sw-brand"
                >
                  <span className="flex items-center justify-between gap-3 text-lg font-semibold text-sw-fg-1">
                    {s.label}
                    <ArrowRight className="h-4 w-4 shrink-0 text-sw-brand transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                  <span className="mt-2 text-sw-fg-2">{s.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Prueba */}
      {c.caseKeys.length > 0 ? (
        <CaseStudySection locale={locale} cases={c.caseKeys} title={c.caseTitle} />
      ) : (
        <section className="bg-sw-bg-0 pt-16 sm:pt-20">
          <div className="mx-auto max-w-7xl px-5">
            <h2 className="font-display text-3xl text-sw-fg-1 sm:text-4xl">{c.proofTitle}</h2>
          </div>
          <Commitments locale={locale} className="mt-8 border-y border-sw-line bg-sw-bg-1" />
        </section>
      )}

      <AboutMe locale={locale} className="bg-sw-bg-0" />

      <ContactSection title={c.contactTitle} />

      <MobileStickyCta locale={locale} />
    </>
  )
}

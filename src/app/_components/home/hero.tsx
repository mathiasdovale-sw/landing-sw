"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { OFFER_SAMPLE } from "@/lib/commitments"
import { CASES } from "@/lib/cases"

// Hero de la home: posicionamiento + CTA principal (reunión gratis).
const COPY = {
  es: {
    eyebrow: "Especialista en Shopify · Barcelona",
    line1: "Tu tienda Shopify,",
    line2: "sin límites",
    sub: "Desde tiendas nuevas y migraciones hasta desarrollos que una plantilla o una app no resuelven. Precio cerrado y una sola persona responsable.",
    primary: { href: "#contacto", label: "Pide una reunión gratis" },
    secondary: { href: "#casos-reales", label: "Ver casos" },
    sample: { href: "#contacto", label: "Mira cómo quedaría tu tienda" },
  },
  en: {
    eyebrow: "Shopify specialist · Barcelona",
    line1: "Your Shopify store,",
    line2: "without limits",
    sub: "From new stores and migrations to custom builds that a theme or an app can't handle. A fixed price and one person accountable.",
    primary: { href: "#contacto", label: "Book a free meeting" },
    secondary: { href: "#casos-reales", label: "See case studies" },
    sample: { href: "#contacto", label: "See how your store would look" },
  },
}

// Collage de escritorio: los tres mockups de los casos, superpuestos y escalonados.
const COLLAGE = [
  { pos: "left-0 top-16 z-10 -rotate-6", delay: 0.35 },
  { pos: "left-1/2 top-0 z-20 -translate-x-1/2", delay: 0.2 },
  { pos: "right-0 top-24 z-10 rotate-6", delay: 0.5 },
]

function HeroCollage({ locale }: { locale: "es" | "en" }) {
  const shots = CASES.filter((c) => c.image).slice(0, 3)
  return (
    <div className="relative hidden h-[540px] lg:block" aria-hidden="true">
      <div className="absolute inset-x-0 bottom-0 top-10 rounded-full bg-[radial-gradient(closest-side,rgba(255,107,0,0.16),transparent)]" />
      {shots.map((c, i) => (
        <div key={c.key} className={`absolute w-[190px] xl:w-[210px] ${COLLAGE[i].pos}`}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: COLLAGE[i].delay, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[9/17] overflow-hidden rounded-[28px] border-[6px] border-[#1c1c1c] bg-sw-bg-0 shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
          >
            <Image
              src={c.image!}
              alt={`${c.name} — ${locale === "es" ? "captura de la tienda" : "store screenshot"}`}
              fill
              sizes="210px"
              priority={i === 1}
              className="object-cover object-top"
            />
          </motion.div>
        </div>
      ))}
    </div>
  )
}

export default function Hero({ locale }: { locale: "es" | "en" }) {
  const c = COPY[locale]
  return (
    <section className="overflow-hidden bg-sw-bg-0 pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.25fr_1fr]">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-7 flex items-center gap-3"
        >
          <span className="font-mono-label text-sw-fg-3">{c.eyebrow}</span>
        </motion.div>

        <h1 className="font-display text-5xl text-sw-fg-1 sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {c.line1}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-sw-brand"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {c.line2}
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-sw-fg-2 sm:text-xl"
        >
          {c.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-10 flex flex-wrap items-start gap-4"
        >
          <a
            href={c.primary.href}
            data-hero-cta
            className="rounded-sm bg-sw-brand px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-sw-brand-hover"
          >
            {c.primary.label}
          </a>
          {OFFER_SAMPLE ? (
            <div className="flex flex-col items-start gap-3">
              <a
                href={c.sample.href}
                data-service="migration"
                className="rounded-sm border border-sw-line-strong px-7 py-4 text-base font-semibold text-sw-fg-1 transition-colors hover:border-sw-fg-1"
              >
                {c.sample.label}
              </a>
              <a href={c.secondary.href} className="text-sm font-semibold text-sw-brand underline-offset-4 hover:underline">
                {c.secondary.label}
              </a>
            </div>
          ) : (
            <a
              href={c.secondary.href}
              className="rounded-sm border border-sw-line-strong px-7 py-4 text-base font-semibold text-sw-fg-1 transition-colors hover:border-sw-fg-1"
            >
              {c.secondary.label}
            </a>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-12 flex flex-wrap items-center gap-6 border-t border-sw-line pt-7"
        >
          <div className="flex items-center gap-2 opacity-80">
            <Image src="/assets/img/shopifyLogo.png" alt="Shopify Partner" width={110} height={28} className="h-7 w-auto object-contain" />
            <span className="font-mono-label text-sw-fg-3">Shopify Partner</span>
          </div>
        </motion.div>
      </div>

      <HeroCollage locale={locale} />
      </div>
    </section>
  )
}

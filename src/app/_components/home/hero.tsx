"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import HomeCta from "./home-cta"

// Hero de la home: posicionamiento + CTA principal.
const COPY = {
  es: {
    eyebrow: "Especialista en Shopify · España",
    line1: "Más beneficio con el mismo",
    line2: "tráfico que ya pagas.",
    sub: "Hago que tu tienda online venda más por cada visita.",
    // En ES el CTA principal es la calculadora; la reunión gratis va como secundario.
    secondary: { href: "#contacto", label: "Pide una reunión gratis" },
  },
  en: {
    eyebrow: "Shopify specialist · Spain",
    line1: "More profit from the",
    line2: "traffic you already pay for.",
    sub: "I make your online store sell more per visit.",
    // En EN el CTA principal ya es la reunión gratis.
    secondary: { href: "#services-section", label: "See how I work" },
  },
}

export default function Hero({ locale }: { locale: "es" | "en" }) {
  const c = COPY[locale]
  return (
    <section className="bg-sw-bg-0 pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
      <div className="mx-auto max-w-7xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-7 flex items-center gap-3"
        >
          <span className="font-mono-label text-sw-fg-3">{c.eyebrow}</span>
        </motion.div>

        <h1 className="font-display text-5xl text-sw-fg-1 sm:text-6xl md:text-7xl lg:text-8xl">
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
              className="block text-sw-secondary"
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
          <HomeCta locale={locale} />
          <a
            href={c.secondary.href}
            className="rounded-sm border border-sw-line-strong px-7 py-4 text-base font-semibold text-sw-fg-1 transition-colors hover:border-sw-fg-1"
          >
            {c.secondary.label}
          </a>
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
          <div className="hidden h-4 w-px bg-sw-line-strong sm:block" />
          <div className="flex items-center opacity-80">
            <Image
              src="/assets/img/klaviyo-partner-badge-light.webp"
              alt="Klaviyo Partner"
              width={400}
              height={174}
              className="h-11 w-auto object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

"use client"
import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check, MoveRight, Smartphone } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

// Assets por caso: `logo` es opcional (favicon/isotipo del cliente, junto al nombre).
// `image` apunta a una captura vertical (mobile) de la home de la tienda. Subí el
// archivo a esa ruta exacta en /public y aparece solo; si falta, se ve un placeholder.
const CASE_ASSETS: Record<string, { logo?: string; image?: string }> = {
  card1: {
    logo: "/assets/img/canramos-logo.jpg",
    image: "/assets/img/case-canramos-home.jpg",
  },
  card2: {
    logo: "/assets/img/termolar-logo.jpg",
    image: "/assets/img/case-termolar-home.jpg",
  },
}

function CaseScreenshot({ src, alt }: { src?: string; alt: string }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className="flex aspect-[9/17] w-full max-w-[130px] shrink-0 flex-col items-center justify-center gap-2 rounded-md border border-dashed border-sw-line bg-sw-bg-0 sm:max-w-[170px]">
        <Smartphone className="h-6 w-6 text-sw-fg-4" aria-hidden="true" />
      </div>
    )
  }

  return (
    <div className="relative aspect-[9/17] w-full max-w-[130px] shrink-0 overflow-hidden rounded-md border border-sw-line-strong shadow-lg sm:max-w-[170px]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-top"
        sizes="(min-width: 640px) 170px, 130px"
        onError={() => setFailed(true)}
      />
    </div>
  )
}

function CaseLogo({ src, alt }: { src?: string; alt: string }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) return null

  return (
    <Image
      src={src}
      alt={alt}
      width={28}
      height={28}
      className="h-7 w-7 shrink-0 rounded-full border border-sw-line object-cover"
      onError={() => setFailed(true)}
    />
  )
}

export default function CaseStudySection() {
  const { t } = useLanguage()

  const cards = [
    {
      key: "card1",
      title: t('casestudy.card1.title'),
      bullets: [
        t('casestudy.card1.bullet1'),
        t('casestudy.card1.bullet2'),
        t('casestudy.card1.bullet3'),
      ],
    },
    {
      key: "card2",
      title: t('casestudy.card2.title'),
      bullets: [
        t('casestudy.card2.bullet1'),
        t('casestudy.card2.bullet2'),
        t('casestudy.card2.bullet3'),
      ],
    },
  ]

  const scrollToContact = () => {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToCases = () => {
    const casesSection = document.getElementById('casos-reales');
    if (casesSection) {
      casesSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="casos-reales" className="py-16 sm:py-20 lg:py-24 bg-sw-bg-1">
      <div className="max-w-5xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-sw-fg-1 mb-4">
            {t('casestudy.title')}
          </h2>
          <p className="text-lg sm:text-xl text-sw-fg-2 max-w-2xl mx-auto leading-relaxed">
            {t('casestudy.subtitle')}
          </p>
        </div>

        {/* Hint de swipe: solo mobile, donde las cards son un carrousel horizontal */}
        <div className="mb-3 flex items-center gap-2 text-sw-fg-4 sm:hidden">
          <span className="font-mono-label">{t('casestudy.swipeHint')}</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
            className="flex"
          >
            <MoveRight className="h-4 w-4" aria-hidden="true" />
          </motion.span>
        </div>

        {/* Cards: carrousel deslizable con snap en mobile, grid en desktop */}
        <div className="relative -mx-5 sm:mx-0">
          <div className="overflow-x-auto px-5 pb-2 sm:overflow-visible sm:px-0">
            <div className="flex snap-x snap-mandatory gap-4 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6">
              {cards.map((card) => {
                const assets = CASE_ASSETS[card.key]
                return (
                  <div
                    key={card.title}
                    className="flex w-[93%] min-w-0 shrink-0 snap-start gap-4 rounded-sm border border-sw-line bg-sw-bg-2 p-6 sm:w-auto sm:shrink sm:gap-5 sm:p-8"
                  >
                    <CaseScreenshot src={assets.image} alt={`${card.title} — ${t('casestudy.screenshotAlt')}`} />

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-center gap-2">
                        <CaseLogo src={assets.logo} alt={card.title} />
                        <h3 className="min-w-0 break-words font-display text-xl sm:text-2xl text-sw-fg-1">
                          {card.title}
                        </h3>
                      </div>
                      <ul className="mt-4 flex flex-col gap-2.5">
                        {card.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2 text-sm text-sw-fg-2">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sw-secondary" aria-hidden="true" />
                            <span className="leading-snug">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Degradado que insinúa que hay más tarjetas fuera de vista, solo mobile */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-sw-bg-1 to-transparent sm:hidden"
            aria-hidden="true"
          />
        </div>

        {/* CTA Card */}
        <div className="mt-8 bg-sw-bg-0 border border-sw-line rounded-sm p-6 sm:p-8 text-center">
          <h4 className="font-display text-xl sm:text-2xl text-sw-fg-1 mb-3">
            {t('casestudy.cta.title')}
          </h4>
          <p className="text-sw-fg-2 mb-6 text-base sm:text-lg leading-relaxed">
            {t('casestudy.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <motion.button
              onClick={scrollToContact}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-sw-brand hover:bg-sw-brand-hover text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-sm transition-colors text-sm sm:text-base"
            >
              {t('casestudy.cta.button')}
            </motion.button>
            <motion.button
              onClick={scrollToCases}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="border border-sw-line-strong hover:border-sw-fg-1 text-sw-fg-1 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-sm transition-colors text-sm sm:text-base"
            >
              {t('casestudy.cta.viewcase')}
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

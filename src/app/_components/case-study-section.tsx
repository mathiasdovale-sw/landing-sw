"use client"
import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check, MoveRight, Smartphone } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

// Assets por caso: `logo` es opcional (favicon/isotipo del cliente, junto al nombre).
// `image` apunta a una captura vertical (mobile) de la home de la tienda. Subí el
// archivo a esa ruta exacta en /public y aparece solo; si falta, se ve un placeholder.
const CASE_ASSETS: Record<string, { logo?: string; image?: string; logoSize?: { w: number; h: number } }> = {
  card1: {
    logo: "/assets/img/canramos-logo.jpg",
    logoSize: { w: 750, h: 340 }, // logotipo horizontal
    image: "/assets/img/case-canramos-home.jpg",
  },
  card2: {
    logo: "/assets/img/termolar-logo.jpg",
    logoSize: { w: 1024, h: 1024 }, // símbolo cuadrado
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

/** Captura en un marco de móvil, recortada por abajo para que "asome" del escenario. */
function PhoneShot({ src, alt }: { src?: string; alt: string }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className="absolute left-1/2 top-8 w-[170px] -translate-x-1/2 transition-transform duration-500 ease-out group-hover:-translate-y-2 sm:w-[190px]">
      <div className="relative aspect-[9/17] overflow-hidden rounded-[26px] border-[6px] border-[#1c1c1c] bg-sw-bg-0 shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
        {src && !failed ? (
          <Image src={src} alt={alt} fill className="object-cover object-top" sizes="190px" onError={() => setFailed(true)} />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Smartphone className="h-6 w-6 text-sw-fg-4" aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  )
}

/** Logo completo (sin recortar) sobre placa blanca, que es el fondo de los archivos. */
function BrandLogo({ src, alt, size }: { src?: string; alt: string; size?: { w: number; h: number } }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return null
  const wide = size ? size.w / size.h > 1.3 : false
  return (
    <div className={`flex h-14 shrink-0 items-center justify-center rounded-sm bg-white ${wide ? "px-3" : "w-14 p-1.5"}`}>
      <Image
        src={src}
        alt={alt}
        width={size?.w ?? 120}
        height={size?.h ?? 120}
        className={`object-contain ${wide ? "h-10 w-auto max-w-[140px]" : "h-full w-full"}`}
        onError={() => setFailed(true)}
      />
    </div>
  )
}

export default function CaseStudySection({ variant = "full" }: { variant?: "full" | "brief" }) {
  const { t } = useLanguage()

  // Breve: logo, nombre y el resultado clave de cada caso. Sin botones.
  if (variant === "brief") {
    const brief = ["card1", "card2"].map((key) => ({
      key,
      title: t(`casestudy.${key}.title`),
      tag: t(`casestudy.${key}.tag`),
      result: t(`casestudy.${key}.key`),
    }))
    return (
      <section id="casos-reales" className="bg-sw-bg-1 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className="mb-10 font-display text-3xl text-sw-fg-1 sm:text-4xl">{t('casestudy.title.brief')}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {brief.map((c) => (
              <article
                key={c.key}
                className="group overflow-hidden rounded-sm border border-sw-line bg-sw-bg-2 transition-colors hover:border-sw-line-strong"
              >
                {/* Escenario: la captura dentro de un marco de móvil que asoma desde abajo */}
                <div className="relative h-64 overflow-hidden border-b border-sw-line bg-[radial-gradient(120%_90%_at_50%_100%,rgba(124,179,224,0.18),transparent_70%)] sm:h-72">
                  <PhoneShot src={CASE_ASSETS[c.key].image} alt={`${c.title} — ${t('casestudy.screenshotAlt')}`} />
                  <span className="absolute left-4 top-4 rounded-full border border-sw-line-strong bg-sw-bg-0/80 px-3 py-1 font-mono-label text-sw-fg-2 backdrop-blur">
                    {c.tag}
                  </span>
                </div>

                <div className="flex items-center gap-5 p-6 sm:p-7">
                  <BrandLogo src={CASE_ASSETS[c.key].logo} alt={`Logo de ${c.title}`} size={CASE_ASSETS[c.key].logoSize} />
                  <div className="min-w-0">
                    <h3 className="font-display text-xl text-sw-fg-1 sm:text-2xl">{c.title}</h3>
                    <p className="mt-1 leading-snug text-sw-fg-2">{c.result}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

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

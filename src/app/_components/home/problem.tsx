"use client"
import { motion } from "framer-motion"
import HomeCta from "./home-cta"

// Sección del problema: preguntas que el dueño se hace sobre sus números.
// ES: las responde la calculadora. EN: las vemos juntos en la reunión gratis.
const COPY = {
  es: {
    eyebrow: "Tus números",
    title: "¿Sabes cuánto te deja de verdad tu tienda?",
    lede: "Cuatro preguntas que la calculadora te responde en unos minutos, con tus números:",
    questions: [
      "¿Cuánto te queda de cada 100 € que vendes?",
      "¿Tus anuncios se pagan?",
      "¿Cuánto facturas por cada visita?",
      "¿Qué palanca subiría más tu beneficio?",
    ],
  },
  en: {
    eyebrow: "Your numbers",
    title: "Do you know what your store really makes?",
    lede: "Four questions most store owners can't answer. We look at them together in the free meeting:",
    questions: [
      "How much do you keep from every €100 you sell?",
      "Do your ads pay for themselves?",
      "How much revenue does each visit bring in?",
      "Which lever would raise your profit the most?",
    ],
  },
}

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function Problem({ locale }: { locale: "es" | "en" }) {
  const c = COPY[locale]
  return (
    <section className="bg-sw-bg-1 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-12 flex items-center justify-between">
          <span className="font-mono-label text-sw-fg-3">{c.eyebrow}</span>
          <span className="font-mono-label text-sw-fg-3">01</span>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <h2 className="font-display text-4xl text-sw-fg-1 sm:text-5xl lg:text-6xl">{c.title}</h2>

          <div>
            <p className="text-lg leading-relaxed text-sw-fg-1 sm:text-xl">{c.lede}</p>

            <motion.ul
              className="mt-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={listVariants}
            >
              {c.questions.map((q, index) => (
                <motion.li key={q} variants={itemVariants} className="flex items-baseline gap-4 border-b border-sw-line py-4">
                  <span className="min-w-[24px] font-mono-label text-sw-secondary">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-base leading-snug text-sw-fg-2 sm:text-lg">{q}</span>
                </motion.li>
              ))}
            </motion.ul>

            <HomeCta locale={locale} className="mt-10" />
          </div>
        </div>
      </div>
    </section>
  )
}

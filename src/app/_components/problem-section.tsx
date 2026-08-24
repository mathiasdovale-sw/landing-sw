"use client"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function ProblemSection() {
  const { t } = useLanguage()

  const items = [t('whom.item1'), t('whom.item2'), t('whom.item3'), t('whom.item4')]

  return (
    <section className="bg-sw-bg-1 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-12 flex items-center justify-between">
          <span className="font-mono-label text-sw-fg-3">{t('problem.eyebrow')}</span>
          <span className="font-mono-label text-sw-fg-3">01</span>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <h2 className="font-display text-4xl text-sw-fg-1 sm:text-5xl lg:text-6xl">
            {t('problem.title')}
          </h2>

          <div>
            <p className="text-lg leading-relaxed text-sw-fg-1 sm:text-xl">
              {t('problem.lede')}
            </p>

            <motion.ul
              className="mt-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={listVariants}
            >
              {items.map((item, index) => (
                <motion.li
                  key={item}
                  variants={itemVariants}
                  className="flex items-baseline gap-4 border-b border-sw-line py-4"
                >
                  <span className="min-w-[24px] font-mono-label text-sw-secondary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-base leading-snug text-sw-fg-2 sm:text-lg">{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <p className="mt-8 text-xl text-sw-secondary sm:text-2xl">{t('whom.foot')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

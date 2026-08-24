"use client"
import { useEffect, useRef } from "react"
import { motion, useInView, useMotionValue, animate } from "framer-motion"

interface AnimatedStatProps {
  target?: number
  prefix?: string
  suffix?: string
  staticValue?: string
  locale: 'es' | 'en'
  label: string
  delay?: number
}

function formatNumber(value: number, locale: 'es' | 'en') {
  // No depende de Intl/ICU: agrupa de a miles manualmente con el separador correcto.
  const separator = locale === 'es' ? '.' : ','
  return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}

export default function AnimatedStat({
  target,
  prefix = '',
  suffix = '',
  staticValue,
  locale,
  label,
  delay = 0,
}: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const motionValue = useMotionValue(0)
  const displayRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!isInView || target === undefined) return
    const controls = animate(motionValue, target, {
      duration: 1.1,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        if (displayRef.current) {
          displayRef.current.textContent = `${prefix}${formatNumber(latest, locale)}${suffix}`
        }
      },
    })
    return () => controls.stop()
  }, [isInView, target, motionValue, prefix, suffix, locale, delay])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <div className="font-display text-3xl text-sw-fg-1 sm:text-4xl">
        {target !== undefined ? <span ref={displayRef}>{prefix}0{suffix}</span> : staticValue}
      </div>
      <div className="mt-2 max-w-[24ch] font-mono-label normal-case tracking-normal text-sw-fg-3">
        {label}
      </div>
    </motion.div>
  )
}

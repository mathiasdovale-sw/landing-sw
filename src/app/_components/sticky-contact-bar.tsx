"use client"
import Link from "next/link"
import { useEffect, useState } from "react"

// Barra fija inferior con el CTA de contacto. Aparece al dejar atrás el hero y
// se esconde al llegar al final de la página para no tapar el footer.
const SHOW_AFTER_PX = 560
const HIDE_NEAR_END_PX = 360

export default function StickyContactBar({
  title,
  price,
  ctaLabel,
  ctaHref,
}: {
  title: string
  price: string
  ctaLabel: string
  ctaHref: string
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let frame = 0

    const update = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const nearEnd = scrollY + window.innerHeight > docHeight - HIDE_NEAR_END_PX
      setIsVisible(scrollY > SHOW_AFTER_PX && !nearEnd)
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <div
      aria-hidden={!isVisible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-sw-line bg-sw-bg-1/95 backdrop-blur transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:py-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-sw-fg-1 sm:text-base">{title}</p>
          <p className="mt-1 font-mono-label text-sw-fg-4">{price}</p>
        </div>
        <Link
          href={ctaHref}
          tabIndex={isVisible ? undefined : -1}
          className="flex-shrink-0 rounded-sm bg-sw-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sw-brand-hover sm:px-7 sm:text-base"
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  )
}

"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import type { ServiceOption } from "@/lib/contact-services"
import { MAIN_CTA } from "@/lib/commitments"

// Botón fijo inferior solo en móvil (<768 px), que lleva al formulario de contacto.
// - Aparece cuando el botón principal del hero (marcado con `data-hero-cta`) ya no se ve.
// - Se oculta (opacidad + desplazamiento) cuando el formulario (#contacto) o el pie están en pantalla,
//   y mientras el menú móvil está abierto (la navbar marca <html data-mobile-menu="open">).
// - Deja un hueco al final del contenido para no tapar los últimos enlaces de la página.
// - Respeta la zona segura inferior del iPhone.

const LABEL = MAIN_CTA

export default function MobileStickyCta({
  locale,
  href = "#contacto",
  service,
}: {
  locale: "es" | "en"
  href?: string
  /** Opción a preseleccionar en "¿Qué necesitas?" (solo si el formulario está en la misma página). */
  service?: ServiceOption
}) {
  const [heroGone, setHeroGone] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const hero = document.querySelector("[data-hero-cta]")
    const targets = [document.getElementById("contacto"), document.querySelector("footer")].filter(Boolean) as Element[]

    const heroObs = new IntersectionObserver(([e]) => {
      // Solo cuenta como "dejado atrás" si ya está por encima de la pantalla.
      setHeroGone(!e.isIntersecting && e.boundingClientRect.top < 0)
    })
    if (hero) heroObs.observe(hero)
    else setHeroGone(true)

    const visible = new Set<Element>()
    const blockObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)))
      setBlocked(visible.size > 0)
    })
    targets.forEach((t) => blockObs.observe(t))

    const html = document.documentElement
    const syncMenu = () => setMenuOpen(html.dataset.mobileMenu === "open")
    syncMenu()
    const menuObs = new MutationObserver(syncMenu)
    menuObs.observe(html, { attributes: true, attributeFilter: ["data-mobile-menu"] })

    return () => {
      heroObs.disconnect()
      blockObs.disconnect()
      menuObs.disconnect()
    }
  }, [])

  const show = heroGone && !blocked && !menuOpen

  return (
    <>
      {/* Hueco al final del contenido (solo móvil): altura de la barra + margen + zona segura */}
      <div aria-hidden="true" className="h-[calc(96px+env(safe-area-inset-bottom))] md:hidden" />
      <div
        aria-hidden={!show}
        data-mobile-sticky-cta
        className={`fixed inset-x-0 bottom-0 z-40 px-4 transition-all duration-300 md:hidden ${
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
        }`}
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 12px)" }}
      >
        <Link
          href={href}
          data-service={service}
          tabIndex={show ? undefined : -1}
          className="block w-full rounded-sm bg-sw-brand px-6 py-4 text-center text-base font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-colors hover:bg-sw-brand-hover"
        >
          {LABEL[locale]}
        </Link>
      </div>
    </>
  )
}

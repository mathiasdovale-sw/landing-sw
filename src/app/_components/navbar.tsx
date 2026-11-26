"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"
import LanguageSelector from "./language-selector"
import { useLanguage } from "@/contexts/LanguageContext"
import { useLocalizedLinks } from "@/hooks/useLocalizedLinks"
import { CHROMELESS_ROUTES } from "@/lib/chromeless-routes"
import { SERVICES_MENU } from "@/lib/services-menu"

const MotionLink = motion.create(Link)

interface NavLink {
  href: string
  label: string
}

interface NavGroup {
  /** Subtítulo opcional dentro del desplegable (p. ej. "Tecnología"). */
  label?: string
  items: NavLink[]
}

interface NavMenu {
  id: string
  label: string
  groups: NavGroup[]
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  // Móvil: vertical de servicios desplegada (acordeón)
  const [openVertical, setOpenVertical] = useState<string | null>(null)
  const { t } = useLanguage()
  const { links, currentLocale } = useLocalizedLinks()
  const pathname = usePathname()

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    // data-mobile-menu: la barra fija de móvil se oculta mientras el menú está abierto.
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.dataset.mobileMenu = 'open'
    } else {
      document.body.style.overflow = 'unset'
      delete document.documentElement.dataset.mobileMenu
    }

    return () => {
      document.body.style.overflow = 'unset'
      delete document.documentElement.dataset.mobileMenu
    }
  }, [isMenuOpen])

  // Cerrar desplegables al navegar y con Escape
  useEffect(() => {
    setOpenDropdown(null)
  }, [pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenDropdown(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Manejar scroll al cargar la página con hash #services
  useEffect(() => {
    const handleHashScroll = () => {
      if (window.location.hash === '#services') {
        const servicesSection = document.getElementById('services-section')
        if (servicesSection) {
          setTimeout(() => {
            servicesSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            })
          }, 100)
        }
      }
    }

    handleHashScroll()
    window.addEventListener('hashchange', handleHashScroll)

    return () => {
      window.removeEventListener('hashchange', handleHashScroll)
    }
  }, [])

  if (CHROMELESS_ROUTES.includes(pathname)) return null

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const menuLabels = currentLocale === 'en'
    ? { open: 'Open menu', close: 'Close menu' }
    : { open: 'Abrir menú', close: 'Cerrar menú' }
  const closeMenu = () => setIsMenuOpen(false)

  // Servicios va en un mega menú de cuatro verticales; Soluciones, en un desplegable;
  // Casos, Sobre nosotros y Blog, sueltos.
  const servicesMenu = SERVICES_MENU[currentLocale === 'en' ? 'en' : 'es']
  const servicesOpen = openDropdown === 'services'

  const menus: NavMenu[] = [
    {
      id: 'solutions',
      label: t('nav.solutions'),
      groups: [
        {
          items: [
            { href: links.ecommerce, label: t('nav.ecommerce') },
            { href: links.leads, label: t('nav.leads') },
          ],
        },
      ],
    },
  ]

  const navItems: NavLink[] = [
    { href: links.cases, label: t('nav.cases') },
    { href: links.about, label: t('nav.about') },
    { href: links.blog, label: t('nav.blog') },
  ]

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar — el blur vive en este wrapper interno, no en <header>,
          para que no se vuelva containing block del panel mobile fixed. */}
      <div className="border-b border-sw-line bg-sw-bg-0/70 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 py-4 md:px-12 lg:px-8 xl:px-12">
          {/* Logo */}
          <Link
            href="/"
            className="-my-2 inline-flex min-h-11 items-center font-display text-xl text-sw-fg-1 tracking-wide hover:text-sw-fg-2 transition-colors md:text-2xl"
          >
            SELLIFYWORKS<span className="text-sw-brand">.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {/* Servicios: mega menú. El panel se posiciona respecto al <header> (sticky)
                para ocupar su ancho; el -my-8/py-8 extiende la zona de hover hasta su borde inferior. */}
            <div
              className="-my-8 py-8"
              onMouseEnter={() => setOpenDropdown('services')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-controls="nav-services"
                onClick={() => setOpenDropdown(servicesOpen ? null : 'services')}
                className="flex items-center gap-1 whitespace-nowrap font-mono-label text-sw-fg-3 transition-colors hover:text-sw-fg-1"
              >
                {t('nav.services')}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              {servicesOpen && (
                <div id="nav-services" className="absolute inset-x-0 top-full px-6 md:px-12 lg:px-8 xl:px-12">
                  <div className="mx-auto max-w-6xl rounded-sm border border-sw-line bg-sw-bg-1 shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
                    <div className="grid grid-cols-4 gap-2 p-4">
                      {servicesMenu.verticals.map((v) => (
                        <div key={v.id}>
                          <p className="px-3 pb-1 pt-2 font-mono-label text-[11px] text-sw-fg-4">{v.title}</p>
                          {v.items.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={() => setOpenDropdown(null)}
                              className="block rounded-sm px-3 py-2 text-sm text-sw-fg-2 transition-colors hover:bg-sw-bg-2 hover:text-sw-fg-1"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-sw-line px-7 py-4 text-sm">
                      <span className="font-mono-label text-[11px] text-sw-fg-4">{servicesMenu.howWeWork.title}:</span>
                      <span className="text-sw-fg-2">{servicesMenu.howWeWork.fixedPrice}</span>
                      <span aria-hidden="true" className="text-sw-fg-4">·</span>
                      <Link
                        href={servicesMenu.howWeWork.monthly.href}
                        onClick={() => setOpenDropdown(null)}
                        className="text-sw-fg-2 transition-colors hover:text-sw-fg-1"
                      >
                        {servicesMenu.howWeWork.monthly.label} →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {menus.map((menu) => {
              const open = openDropdown === menu.id
              return (
                <div
                  key={menu.id}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(menu.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`nav-${menu.id}`}
                    onClick={() => setOpenDropdown(open ? null : menu.id)}
                    className="flex items-center gap-1 whitespace-nowrap font-mono-label text-sw-fg-3 transition-colors hover:text-sw-fg-1"
                  >
                    {menu.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  {open && (
                    <div id={`nav-${menu.id}`} className="absolute left-0 top-full pt-4">
                      <div className="min-w-[260px] rounded-sm border border-sw-line bg-sw-bg-1 p-2 shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
                        {menu.groups.map((group, gi) => (
                          <div key={gi} className={gi > 0 ? 'mt-1 border-t border-sw-line pt-1' : ''}>
                            {group.label && (
                              <p className="px-3 pb-1 pt-2 font-mono-label text-[11px] text-sw-fg-4">{group.label}</p>
                            )}
                            {group.items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpenDropdown(null)}
                                className="block rounded-sm px-3 py-2 text-sm text-sw-fg-2 transition-colors hover:bg-sw-bg-2 hover:text-sw-fg-1"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap font-mono-label text-sw-fg-3 hover:text-sw-fg-1 transition-colors"
              >
                {item.label}
              </Link>
            ))}

            <LanguageSelector />

            <MotionLink
              href={links.contact}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="whitespace-nowrap rounded-sm bg-sw-brand px-4 py-2 font-mono-label text-white transition-colors hover:bg-sw-brand-hover"
            >
              <span className="xl:hidden">{t('nav.quoteShort')}</span>
              <span className="hidden xl:inline">{t('nav.quote')}</span>
            </MotionLink>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-4 lg:hidden">
            <LanguageSelector />
            <button
              className="z-50 -m-2.5 p-2.5 text-sw-fg-1 transition-colors hover:text-sw-fg-3"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? menuLabels.close : menuLabels.open}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation — hermano del wrapper con blur, así su containing
          block sigue siendo el viewport y el panel cubre toda la pantalla. */}
      <div
        className={`fixed inset-0 z-40 overflow-y-auto bg-sw-bg-0 transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute right-3.5 top-1.5 p-2.5 text-sw-fg-1 transition-colors hover:text-sw-fg-3"
          onClick={closeMenu}
          aria-label={menuLabels.close}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <nav className="flex min-h-full flex-col gap-8 px-6 pb-12 pt-20">
          {/* Servicios: cada vertical es un acordeón; "Cómo trabajamos" al final. */}
          <div>
            <p className="font-mono-label text-sw-fg-4">{t('nav.services')}</p>
            <ul className="mt-2 space-y-1">
              {servicesMenu.verticals.map((v) => {
                const open = openVertical === v.id
                return (
                  <li key={v.id}>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`nav-m-${v.id}`}
                      onClick={() => setOpenVertical(open ? null : v.id)}
                      className="flex min-h-11 w-full items-center justify-between text-left font-display text-xl text-sw-fg-1 transition-colors hover:text-sw-brand sm:text-2xl"
                    >
                      {v.title}
                      <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                    {open && (
                      <ul id={`nav-m-${v.id}`} className="mb-2 border-l border-sw-line pl-4">
                        {v.items.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              className="flex min-h-11 items-center text-base text-sw-fg-2 transition-colors hover:text-sw-brand"
                              onClick={closeMenu}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
            <div className="mt-4 border-t border-sw-line pt-4">
              <p className="font-mono-label text-[11px] text-sw-fg-4">{servicesMenu.howWeWork.title}</p>
              <p className="mt-2 text-base text-sw-fg-2">{servicesMenu.howWeWork.fixedPrice}</p>
              <Link
                href={servicesMenu.howWeWork.monthly.href}
                className="flex min-h-11 items-center text-base text-sw-fg-2 transition-colors hover:text-sw-brand"
                onClick={closeMenu}
              >
                {servicesMenu.howWeWork.monthly.label} →
              </Link>
            </div>
          </div>
          {menus.map((menu) => (
            <div key={menu.id}>
              <p className="font-mono-label text-sw-fg-4">{menu.label}</p>
              <ul className="mt-2 space-y-1">
                {menu.groups.flatMap((g) => g.items).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex min-h-11 items-center font-display text-xl text-sw-fg-1 transition-colors hover:text-sw-brand sm:text-2xl"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <ul className="space-y-1 border-t border-sw-line pt-5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-11 items-center font-display text-xl text-sw-fg-1 transition-colors hover:text-sw-brand sm:text-2xl"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <MotionLink
            href={links.contact}
            whileTap={{ scale: 0.97 }}
            className="rounded-sm bg-sw-brand px-6 py-4 text-center text-base font-semibold text-white"
            onClick={closeMenu}
          >
            {t('nav.quote')}
          </MotionLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar

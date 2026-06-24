"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import LanguageSelector from "./language-selector"
import { useLanguage } from "@/contexts/LanguageContext"
import { useLocalizedLinks } from "@/hooks/useLocalizedLinks"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()
  const { links } = useLocalizedLinks()

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const navItems = [
    { href: links.services, label: t('nav.services') },
    { href: links.about, label: t('nav.about') },
    { href: links.blog, label: t('nav.blog') },
  ]

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar — el blur vive en este wrapper interno, no en <header>,
          para que no se vuelva containing block del panel mobile fixed. */}
      <div className="border-b border-sw-line bg-sw-bg-0/70 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 py-4 md:px-12">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-xl text-sw-fg-1 tracking-wide hover:text-sw-fg-2 transition-colors md:text-2xl"
          >
            SELLIFYWORKS<span className="text-sw-brand">.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono-label text-sw-fg-3 hover:text-sw-fg-1 transition-colors"
              >
                {item.label}
              </Link>
            ))}

            <LanguageSelector />

            <Link
              href={links.contact}
              className="rounded-sm border border-sw-brand px-4 py-2 font-mono-label text-sw-fg-1 transition-colors hover:bg-sw-brand"
            >
              {t('nav.contact')}
            </Link>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-4 md:hidden">
            <LanguageSelector />
            <button
              className="z-50 text-sw-fg-1 transition-colors hover:text-sw-fg-3"
              onClick={toggleMenu}
              aria-label="Toggle menu"
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
        className={`fixed inset-0 z-40 bg-sw-bg-0 transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute right-6 top-4 text-sw-fg-1 transition-colors hover:text-sw-fg-3"
          onClick={closeMenu}
          aria-label="Cerrar menú"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <nav className="flex h-full flex-col items-center justify-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-3xl text-sw-fg-1 hover:text-sw-brand transition-colors"
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={links.contact}
            className="rounded-sm bg-sw-brand px-8 py-4 font-mono-label text-sw-fg-1"
            onClick={closeMenu}
          >
            {t('nav.contact')}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar

"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import LanguageSelector from "./language-selector"
import { useLanguage } from "@/contexts/LanguageContext"
import { useLocalizedLinks } from "@/hooks/useLocalizedLinks"

interface NavItem {
  href: string;
  label: string;
  onClick?: () => void;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()
  const { links } = useLocalizedLinks()
  const router = useRouter()

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup al desmontar el componente
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
          }, 100) // Pequeño delay para asegurar que la página esté cargada
        }
      }
    }

    // Ejecutar al cargar la página
    handleHashScroll()

    // Ejecutar cuando cambie el hash
    window.addEventListener('hashchange', handleHashScroll)

    return () => {
      window.removeEventListener('hashchange', handleHashScroll)
    }
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-section')
    
    if (servicesSection) {
      // Si estamos en la página principal, hacer scroll directo
      servicesSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
      closeMenu()
    } else {
      // Si no estamos en la página principal, navegar primero y luego hacer scroll
      closeMenu()
      router.push(`${links.home}#services`)
    }
  }

  const navItems = [
    { href: links.services, label: t('nav.services') },
    { href: links.about, label: t('nav.about') },
    // { href: links.blog, label: "BLOG" },
    { href: links.contact, label: t('nav.contact') },
  ]

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 relative" style={{ backgroundColor: '#0e0e0fff' }}>
      {/* Logo */}
      <Link 
        href="/" 
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide hover:text-gray-300 transition-colors"
        style={{ fontFamily: "Bebas Neue, sans-serif" }}
      >
        SELLIFYWORKS.
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          item.label === "CONTACT" || item.label === "CONTACTO" ? (
            <Link
              key={item.href}
              href={item.href}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {item.label}
            </Link>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className="text-xl text-gray-100 font-semibold tracking-wide hover:text-white hover:scale-105 transition-all duration-200"
            >
              {item.label}
            </Link>
          )
        ))}
        
        {/* Language Selector */}
        <LanguageSelector />
      </nav>

      {/* Mobile Menu Button and Language Selector */}
      <div className="md:hidden flex items-center space-x-4">
        <LanguageSelector />
        <button 
          className="z-50 relative text-white hover:text-gray-300 transition-colors" 
          onClick={toggleMenu} 
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col text-white items-center justify-center h-full space-y-8">
          {navItems.map((item) => (
            item.label === "CONTACT" || item.label === "CONTACTO" ? (
              <Link
                key={item.href}
                href={item.href}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-5 rounded-full text-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-4xl font-semibold tracking-wide text-gray-100 hover:text-white hover:scale-105 transition-all duration-200"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            )
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar






















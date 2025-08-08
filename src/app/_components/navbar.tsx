"use client"
import { useState, useEffect } from "react"
import Link from "next/link"

interface NavItem {
  href: string;
  label: string;
  onClick?: () => void;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
      window.location.href = '/#services'
    }
  }

  const navItems = [
    { href: "#services", label: "SERVICES", onClick: scrollToServices },
    { href: "/about", label: "ABOUT" },
    // { href: "/posts", label: "BLOG" },
    { href: "/contact", label: "CONTACT" },
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
          item.label === "CONTACT" ? (
            <Link
              key={item.href}
              href={item.href}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {item.label}
            </Link>
          ) : item.onClick ? (
            <button
              key={item.href}
              onClick={item.onClick}
              className="text-lg text-white font-medium tracking-wide hover:text-gray-300 transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className="text-lg text-white font-medium tracking-wide hover:text-gray-300 transition-colors"
            >
              {item.label}
            </Link>
          )
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden z-50 relative text-white hover:text-gray-300 transition-colors" 
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

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col text-white items-center justify-center h-full space-y-8">
          {navItems.map((item) => (
            item.label === "CONTACT" ? (
              <Link
                key={item.href}
                href={item.href}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-5 rounded-full text-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ) : item.onClick ? (
              <button
                key={item.href}
                onClick={item.onClick}
                className="text-3xl font-medium tracking-wide hover:text-gray-300 transition-colors"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-3xl font-medium tracking-wide hover:text-gray-300 transition-colors"
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






















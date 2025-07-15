"use client"
import { useState } from "react"
import Link from "next/link"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const navItems = [
    { href: "/services", label: "SERVICES" },
    { href: "/about", label: "ABOUT" },
    { href: "/blog", label: "BLOG" },
    { href: "/contact", label: "CONTACT" },
  ]

  return (
    <header className="flex items-center justify-between px-6 py-6 md:px-12 relative">
      {/* Logo */}
      <Link 
        href="/" 
        className="text-2xl md:text-3xl font-bold text-white tracking-wide hover:text-gray-300 transition-colors"
        style={{ fontFamily: "Bebas Neue, sans-serif" }}
      >
        SELLIFYWORKS.
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm text-white font-medium tracking-wide hover:text-gray-300 transition-colors"
          >
            {item.label}
          </Link>
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
            <Link
              key={item.href}
              href={item.href}
              className="text-2xl font-medium tracking-wide hover:text-gray-300 transition-colors"
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
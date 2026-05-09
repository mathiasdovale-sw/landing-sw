"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import LanguageSelector from "./language-selector"
import { useLanguage } from "@/contexts/LanguageContext"
import { useLocalizedLinks } from "@/hooks/useLocalizedLinks"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useLanguage()
  const { links } = useLocalizedLinks()
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  useEffect(() => {
    const handle = () => {
      if (window.location.hash === "#services") {
        const el = document.getElementById("services-section")
        if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100)
      }
    }
    handle()
    window.addEventListener("hashchange", handle)
    return () => window.removeEventListener("hashchange", handle)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    setMenuOpen(false)
  }

  const handleServices = () => {
    const el = document.getElementById("services-section")
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      setMenuOpen(false)
    } else {
      setMenuOpen(false)
      router.push(`${links.home}#services`)
    }
  }

  const navLinks = [
    { label: t("nav.services"), action: handleServices },
    { label: t("nav.about"), href: links.about },
    { label: "Blog", href: links.blog },
  ]

  const linkStyle: React.CSSProperties = {
    fontFamily: "var(--sw-font-body)",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--sw-fg-3)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    transition: "color 200ms var(--sw-ease-out)",
  }

  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px clamp(20px, 4vw, 32px)",
        background: scrolled ? "rgba(13,13,13,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--sw-border-soft)" : "1px solid transparent",
        transition: "background 250ms var(--sw-ease-out), border-color 250ms var(--sw-ease-out)",
      }}
    >
      {/* Wordmark */}
      <Link href="/" aria-label="SELLIFYWORKS.">
        <span
          className="sw-display"
          style={{ fontSize: "clamp(18px, 2vw, 26px)", lineHeight: 1, letterSpacing: "-0.01em" }}
        >
          SELLIFYWORKS<span className="sw-dot">.</span>
        </span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex" style={{ gap: 32, alignItems: "center" }}>
        {navLinks.map((item) =>
          item.href ? (
            <Link
              key={item.label}
              href={item.href}
              style={linkStyle as React.CSSProperties}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sw-fg-1)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sw-fg-3)")}
            >
              {item.label}
            </Link>
          ) : (
            <button
              key={item.label}
              onClick={item.action}
              style={linkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sw-fg-1)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sw-fg-3)")}
            >
              {item.label}
            </button>
          )
        )}
        <LanguageSelector />
        <button className="sw-btn sw-btn--primary sw-btn--sm" onClick={() => scrollTo("contacto")}>
          {t("nav.contact")}
        </button>
      </nav>

      {/* Mobile controls */}
      <div className="md:hidden" style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <LanguageSelector />
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ background: "none", border: "none", color: "var(--sw-fg-1)", padding: 0, lineHeight: 0 }}
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className="md:hidden"
        style={{
          position: "fixed", inset: 0, zIndex: 40,
          background: "var(--sw-bg-0)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 40,
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 350ms var(--sw-ease-out)",
        }}
      >
        {navLinks.map((item) =>
          item.href ? (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="sw-display"
              style={{ fontSize: "clamp(40px, 10vw, 64px)" }}
            >
              {item.label}
            </Link>
          ) : (
            <button
              key={item.label}
              onClick={item.action}
              className="sw-display"
              style={{ fontSize: "clamp(40px, 10vw, 64px)", background: "none", border: "none" }}
            >
              {item.label}
            </button>
          )
        )}
        <button className="sw-btn sw-btn--primary sw-btn--lg" onClick={() => scrollTo("contacto")}>
          {t("nav.contact")}
        </button>
      </div>
    </header>
  )
}

export default Navbar

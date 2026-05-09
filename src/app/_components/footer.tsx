"use client"
import { useState } from "react"
import type React from "react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { useLocalizedLinks } from "@/hooks/useLocalizedLinks"

export default function Footer() {
  const { t } = useLanguage()
  const { links } = useLocalizedLinks()
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [subscriptionMessage, setSubscriptionMessage] = useState("")

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSubmitting(true)
    setError("")

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (res.ok) {
        setIsSubscribed(true)
        setEmail("")
        const alreadyMsgs = [
          "Ya estás suscrito a nuestra newsletter",
          "You are already subscribed to our newsletter",
        ]
        setSubscriptionMessage(
          alreadyMsgs.includes(data.message)
            ? t("footer.newsletter.already")
            : t("footer.newsletter.success")
        )
        setTimeout(() => { setIsSubscribed(false); setSubscriptionMessage("") }, 6000)
      } else if (res.status === 409) {
        setIsSubscribed(true)
        setSubscriptionMessage(t("footer.newsletter.already"))
        setEmail("")
        setTimeout(() => { setIsSubscribed(false); setSubscriptionMessage("") }, 4000)
      } else {
        setError(data.error || t("footer.newsletter.error"))
        setTimeout(() => setError(""), 4000)
      }
    } catch {
      setError(t("footer.newsletter.connection_error"))
      setTimeout(() => setError(""), 4000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const serviceLinks = [
    { label: t("footer.services.storeSetup"), href: links.shopifyStoreSetup },
    { label: t("footer.services.seo"), href: links.shopifySeo },
    { label: t("footer.services.design"), href: links.shopifyDesign },
    { label: t("footer.services.themeCustomization"), href: links.shopifyThemeCustomization },
    { label: t("footer.services.migration"), href: links.shopifyMigration },
    { label: t("footer.services.cro"), href: links.shopifyCro },
    { label: t("footer.services.plus"), href: links.shopifyPlus },
    { label: t("footer.services.consulting"), href: links.shopifyConsulting },
    { label: t("footer.services.growthPartner"), href: links.shopifyGrowthPartner },
    { label: t("footer.services.abTesting"), href: links.shopifyAbTesting },
  ]

  const linkHoverStyle = {
    onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) =>
      (e.currentTarget.style.color = "var(--sw-fg-1)"),
    onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) =>
      (e.currentTarget.style.color = "var(--sw-fg-3)"),
  }

  return (
    <footer style={{ background: "var(--sw-bg-0)", borderTop: "1px solid var(--sw-border-soft)" }}>
      {/* Newsletter band */}
      <div style={{ borderBottom: "1px solid var(--sw-border-soft)" }}>
        <div className="sw-container" style={{ padding: "96px clamp(20px, 4vw, 32px)" }}>
          <div className="sw-grid-2" style={{ alignItems: "flex-end" }}>
            <div>
              <h3 className="sw-display" style={{ fontSize: "clamp(36px, 5vw, 80px)" }}>
                {t("footer.newsletter.title")}
                <span className="sw-dot">.</span>
              </h3>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.5,
                  color: "var(--sw-fg-2)",
                  marginTop: 16,
                  maxWidth: "34ch",
                }}
              >
                {t("footer.newsletter.description")}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <form onSubmit={handleSubscribe}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid var(--sw-border)",
                  }}
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("footer.newsletter.placeholder")}
                    disabled={isSubmitting}
                    style={{
                      flex: 1,
                      padding: "14px 0",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: "var(--sw-fg-1)",
                      fontFamily: "var(--sw-font-body)",
                      fontSize: 15,
                      letterSpacing: "-0.01em",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={isSubscribed || isSubmitting}
                    className="sw-btn sw-btn--primary"
                    style={{ flexShrink: 0 }}
                  >
                    {isSubmitting
                      ? t("footer.newsletter.sending")
                      : isSubscribed
                      ? "✓"
                      : t("footer.newsletter.button")}
                  </button>
                </div>
              </form>

              {isSubscribed && subscriptionMessage && (
                <span
                  style={{
                    fontFamily: "var(--sw-font-mono)",
                    fontSize: 11,
                    color: "#4ade80",
                    letterSpacing: "0.04em",
                  }}
                >
                  {subscriptionMessage}
                </span>
              )}
              {error && (
                <span
                  style={{
                    fontFamily: "var(--sw-font-mono)",
                    fontSize: 11,
                    color: "#f87171",
                    letterSpacing: "0.04em",
                  }}
                >
                  {error}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="sw-container" style={{ padding: "64px clamp(20px, 4vw, 32px) 24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 48,
            marginBottom: 64,
          }}
        >
          {/* Company info */}
          <div>
            <span className="sw-display" style={{ fontSize: "clamp(22px, 2.5vw, 32px)" }}>
              SELLIFYWORKS<span className="sw-dot">.</span>
            </span>
            <p style={{ color: "var(--sw-fg-3)", fontSize: 13, marginTop: 12 }}>
              contact@sellifyworks.com
            </p>
            <p style={{ color: "var(--sw-fg-4)", fontSize: 12, marginTop: 4 }}>
              Barcelona · España
            </p>
          </div>

          {/* Link columns */}
          <div style={{ display: "flex", gap: "clamp(24px, 4vw, 56px)", flexWrap: "wrap" }}>
            {/* Services col 1 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span className="sw-eyebrow" style={{ marginBottom: 4 }}>
                {t("footer.services.title")}
              </span>
              {serviceLinks.slice(0, 5).map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  style={{ color: "var(--sw-fg-3)", fontSize: 13, transition: "color 200ms var(--sw-ease-out)" }}
                  {...linkHoverStyle}
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Services col 2 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span className="sw-eyebrow" style={{ marginBottom: 4, opacity: 0 }} aria-hidden>
                ·
              </span>
              {serviceLinks.slice(5).map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  style={{ color: "var(--sw-fg-3)", fontSize: 13, transition: "color 200ms var(--sw-ease-out)" }}
                  {...linkHoverStyle}
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Studio col */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span className="sw-eyebrow" style={{ marginBottom: 4 }}>Studio</span>
              {[
                { label: t("nav.about"), href: links.about },
                { label: "Blog", href: links.blog },
                { label: t("nav.contact"), href: links.contact },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  style={{ color: "var(--sw-fg-3)", fontSize: 13, transition: "color 200ms var(--sw-ease-out)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sw-fg-1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sw-fg-3)")}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: 24,
            borderTop: "1px solid var(--sw-border-soft)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: "var(--sw-font-mono)",
              fontSize: 11,
              color: "var(--sw-fg-4)",
              letterSpacing: "0.04em",
            }}
          >
            © 2026 SELLIFYWORKS. — {t("footer.rights")}
          </span>
          <div style={{ display: "flex", gap: 24 }}>
            {[
              { label: t("footer.privacy"), href: links.privacyPolicy },
              { label: t("footer.cookies"), href: links.cookiePolicy },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  fontFamily: "var(--sw-font-mono)",
                  fontSize: 11,
                  color: "var(--sw-fg-4)",
                  letterSpacing: "0.04em",
                  transition: "color 200ms var(--sw-ease-out)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sw-fg-2)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sw-fg-4)")}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

"use client"
import Image from "next/image"
import { useLanguage } from "@/contexts/LanguageContext"

const HeaderHome = () => {
  const { t, language } = useLanguage()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section
      id="top"
      style={{
        position: "relative",
        minHeight: "100vh",
        padding: "clamp(120px, 14vw, 200px) clamp(20px, 4vw, 32px) 96px",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid var(--sw-border-soft)",
        overflow: "hidden",
        background: "var(--sw-bg-0)",
        /* break out of Container */
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
      }}
    >
      <div className="sw-container" style={{ width: "100%" }}>
        {/* Eyebrow */}
        <span className="sw-eyebrow">
          → {t("header.shopify.partner")} · {language === "es" ? "España" : "Spain"}
        </span>

        {/* Headline */}
        <h1
          className="sw-display"
          data-reveal
          style={{
            fontSize: "clamp(52px, 9.5vw, 148px)",
            marginTop: 24,
            maxWidth: "16ch",
          }}
        >
          {t("header.title.line1")}
          <br />
          {t("header.title.line2")}
          <span className="sw-dot">.</span>
        </h1>

        {/* Subtext */}
        <p
          data-reveal
          style={{
            marginTop: 32,
            maxWidth: 560,
            fontSize: "clamp(16px, 1.4vw, 20px)",
            lineHeight: 1.5,
            letterSpacing: "-0.01em",
            color: "var(--sw-fg-2)",
          }}
        >
          {t("header.shopify.description")}
        </p>

        {/* CTAs */}
        <div
          data-reveal
          style={{ marginTop: 40, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}
        >
          <button
            className="sw-btn sw-btn--primary sw-btn--lg"
            onClick={() => scrollTo("contacto")}
          >
            {t("header.cta")}
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
          <button
            className="sw-btn sw-btn--secondary sw-btn--lg"
            onClick={() => scrollTo("services-section")}
          >
            {t("nav.services")}
          </button>
        </div>

        {/* Shopify badge */}
        <div
          data-reveal
          style={{ marginTop: 72, display: "flex", alignItems: "center", gap: 12 }}
        >
          <Image
            src="/assets/img/shopifyLogo.png"
            alt="Shopify Partner"
            width={32}
            height={24}
            priority
            style={{ filter: "brightness(0) invert(1)", opacity: 0.3 }}
          />
          <span
            style={{
              fontFamily: "var(--sw-font-mono)",
              fontSize: 10,
              color: "var(--sw-fg-4)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Shopify Partner · {language === "es" ? "España" : "Spain"}
          </span>
        </div>
      </div>

      {/* Watermark logo bottom-right — hidden on mobile to avoid overlap */}
      <Image
        src="/assets/img/logoSW.png"
        alt=""
        aria-hidden
        width={160}
        height={160}
        className="hidden md:block"
        style={{
          position: "absolute",
          right: 32,
          bottom: 32,
          opacity: 0.04,
          filter: "brightness(0) invert(1)",
          pointerEvents: "none",
        }}
      />
    </section>
  )
}

export default HeaderHome

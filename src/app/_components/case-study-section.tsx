"use client"
import Image from "next/image"
import { useLanguage } from "@/contexts/LanguageContext"

export default function CaseStudySection() {
  const { t } = useLanguage()

  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const results = [1, 2, 3, 4, 5].map((i) => t(`casestudy.result${i}`))

  return (
    <section
      style={{
        background: "var(--sw-bg-1)",
        borderTop: "1px solid var(--sw-border-soft)",
        borderBottom: "1px solid var(--sw-border-soft)",
      }}
    >
      <div className="sw-container" style={{ padding: "96px 32px" }}>
        {/* Header row */}
        <div
          className="sw-grid-2"
          style={{ alignItems: "flex-start", marginBottom: 64 }}
        >
          <div>
            <span className="sw-eyebrow">→ 01 {t("casestudy.badge")}</span>
            <div style={{ marginTop: 32 }}>
              <Image
                src="/assets/img/canramos-logo.jpg"
                alt="Can Ramos"
                width={180}
                height={80}
                style={{
                  filter: "brightness(0) invert(1)",
                  opacity: 0.65,
                  objectFit: "contain",
                  height: "auto",
                  maxHeight: 64,
                  width: "auto",
                }}
              />
            </div>
          </div>
          <div data-reveal>
            <h2
              className="sw-display"
              style={{ fontSize: "clamp(40px, 6vw, 96px)" }}
            >
              {t("casestudy.title")}
              <span className="sw-dot">.</span>
            </h2>
            <p
              style={{
                fontSize: "clamp(16px, 1.3vw, 20px)",
                lineHeight: 1.45,
                color: "var(--sw-fg-2)",
                marginTop: 20,
                maxWidth: "38ch",
                letterSpacing: "-0.01em",
              }}
            >
              {t("casestudy.subtitle")}
            </p>
          </div>
        </div>

        {/* Card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 2,
          }}
        >
          {/* Challenge */}
          <div className="sw-card" data-reveal>
            <span className="sw-eyebrow">{t("casestudy.challenge.title")}</span>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--sw-fg-2)", marginTop: 8 }}>
              {t("casestudy.challenge.description")}
            </p>
          </div>

          {/* Solution */}
          <div
            className="sw-card"
            data-reveal
            style={{ borderColor: "var(--sw-accent)" }}
          >
            <span className="sw-eyebrow" style={{ color: "var(--sw-accent)" }}>
              {t("casestudy.solution.title")}
            </span>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--sw-fg-2)", marginTop: 8 }}>
              {t("casestudy.solution.description")}
            </p>
          </div>
        </div>

        {/* Results */}
        <div
          className="sw-card"
          data-reveal
          style={{ marginTop: 2 }}
        >
          <span className="sw-eyebrow">{t("casestudy.results.title")}</span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 24,
              marginTop: 8,
            }}
          >
            {results.map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span
                  style={{
                    fontFamily: "var(--sw-font-mono)",
                    fontSize: 11,
                    color: "var(--sw-accent)",
                    letterSpacing: "0.04em",
                    flexShrink: 0,
                    paddingTop: 2,
                  }}
                >
                  0{i + 1}
                </span>
                <span style={{ fontSize: 14, color: "var(--sw-fg-2)", lineHeight: 1.55 }}>{r}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA row */}
        <div style={{ marginTop: 48, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <button className="sw-btn sw-btn--primary" onClick={scrollToContact}>
            {t("casestudy.cta.button")}
          </button>
          <a
            href="https://www.canramos.com"
            target="_blank"
            rel="noopener noreferrer"
            className="sw-btn sw-btn--secondary"
          >
            {t("casestudy.cta.viewcase")}
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden
            >
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

"use client"
import Image from "next/image"
import { useLanguage } from "@/contexts/LanguageContext"

export default function MarqueeSection() {
  const { language } = useLanguage()

  return (
    <section
      aria-label="Clients"
      style={{ borderBlock: "1px solid var(--sw-border-soft)", padding: "clamp(20px, 3vw, 32px) clamp(20px, 4vw, 32px)" }}
    >
      <div
        className="sw-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
          flexWrap: "wrap",
        }}
      >
        <span className="sw-eyebrow">
          → {language === "es" ? "Confían en nosotros" : "Trusted by"}
        </span>

        <div style={{ display: "flex", gap: "clamp(24px, 5vw, 64px)", alignItems: "center", flexWrap: "wrap" }}>
          <Image
            src="/assets/img/canramos-logo.jpg"
            alt="Can Ramos — Carnicería Argentina Gourmet"
            width={140}
            height={56}
            style={{
              height: 56,
              width: "auto",
              opacity: 0.85,
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
            }}
          />
          <span className="sw-brand-name">CLIENT 02.</span>
        </div>

        <span
          style={{
            fontFamily: "var(--sw-font-mono)",
            fontSize: 11,
            color: "var(--sw-fg-3)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          2 brands · 2026
        </span>
      </div>
    </section>
  )
}

"use client"
import { useLanguage } from "@/contexts/LanguageContext"

const content = {
  es: {
    eyebrow: "Qué hacemos",
    title: ["Aceleramos el", "crecimiento en Shopify"],
    subtitle: "Para marcas con menos de 1.000 conversiones al mes.",
    card1: {
      label: "No",
      title: "Atajos",
      sub: "Sin plantillas. Sin copiar y pegar.",
    },
    card2: {
      label: "Sino",
      title: ["Procesos de", "empresa"],
      sub: "Impulsado por IA · precio para tu etapa",
    },
  },
  en: {
    eyebrow: "What we do",
    title: ["We accelerate", "Shopify growth"],
    subtitle: "For brands doing under 1,000 conversions a month.",
    card1: {
      label: "Not",
      title: "Shortcuts",
      sub: "No templates. No copy-paste.",
    },
    card2: {
      label: "But",
      title: ["Enterprise", "processes"],
      sub: "Powered by AI · priced for your stage",
    },
  },
}

export default function WhatWeDoSection() {
  const { language } = useLanguage()
  const c = content[language as keyof typeof content] ?? content.es

  return (
    <section
      id="services-section"
      style={{
        padding: "96px clamp(20px, 4vw, 32px)",
        background: "var(--sw-bg-0)",
        borderBottom: "1px solid var(--sw-border-soft)",
      }}
    >
      <div className="sw-container">
        <div className="sw-grid-2" style={{ alignItems: "flex-start" }}>
          <div>
            <span className="sw-eyebrow">→ 02 {c.eyebrow}</span>
          </div>

          <div data-reveal>
            <h2 className="sw-display" style={{ fontSize: "clamp(48px, 7vw, 96px)" }}>
              {c.title[0]}
              <br />
              {c.title[1]}
              <span className="sw-dot">.</span>
            </h2>

            <p
              style={{
                fontSize: "clamp(17px, 2.5vw, 22px)",
                lineHeight: 1.45,
                letterSpacing: "-0.01em",
                color: "var(--sw-fg-2)",
                marginTop: 32,
                maxWidth: "34ch",
              }}
            >
              {c.subtitle}
            </p>

            {/* Two contrast cards */}
            <div className="sw-grid-cards" style={{ marginTop: 48 }}>
              {/* Card — Not shortcuts */}
              <div
                className="sw-card"
                style={{ minHeight: 220, justifyContent: "space-between" }}
              >
                <span className="sw-eyebrow">{c.card1.label}</span>
                <div
                  className="sw-display"
                  style={{ fontSize: "clamp(36px, 4vw, 48px)", lineHeight: 0.95 }}
                >
                  {c.card1.title}
                  <span className="sw-dot">.</span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--sw-font-mono)",
                    fontSize: 12,
                    color: "var(--sw-fg-3)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {c.card1.sub}
                </span>
              </div>

              {/* Card — Enterprise processes */}
              <div
                className="sw-card"
                style={{
                  minHeight: 220,
                  justifyContent: "space-between",
                  borderColor: "var(--sw-accent)",
                }}
              >
                <span className="sw-eyebrow">{c.card2.label}</span>
                <div
                  className="sw-display"
                  style={{ fontSize: "clamp(36px, 4vw, 48px)", lineHeight: 0.95 }}
                >
                  {c.card2.title[0]}
                  <br />
                  {c.card2.title[1]}
                  <span className="sw-dot">.</span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--sw-font-mono)",
                    fontSize: 12,
                    color: "var(--sw-accent)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {c.card2.sub}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

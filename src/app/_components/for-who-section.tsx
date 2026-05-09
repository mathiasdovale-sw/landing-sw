"use client"
import { useLanguage } from "@/contexts/LanguageContext"

const content = {
  es: {
    eyebrow: "Para quién",
    title: ["Hecho para marcas", "como la tuya"],
    lines: [
      "Tienes una tienda en Shopify.",
      "El tráfico llega, pero las conversiones no.",
      "Quieres crecer pero no sabes por dónde empezar.",
      "Tu agencia — si es que tienes una — no está realmente centrada en ti.",
    ],
    cta: "Para eso estamos exactamente aquí",
  },
  en: {
    eyebrow: "For who",
    title: ["Built for brands", "like yours"],
    lines: [
      "You have a Shopify store.",
      "Traffic is coming in, but conversions aren't.",
      "You want to grow but don't know where to start.",
      "Your agency — if you have one — isn't really focused on you.",
    ],
    cta: "That's exactly who we're here for",
  },
}

export default function ForWhoSection() {
  const { language } = useLanguage()
  const c = content[language as keyof typeof content] ?? content.es

  return (
    <section
      style={{
        padding: "96px clamp(20px, 4vw, 32px)",
        background: "var(--sw-bg-0)",
        borderBottom: "1px solid var(--sw-border-soft)",
      }}
    >
      <div className="sw-container">
        <div className="sw-grid-2" style={{ alignItems: "flex-start" }}>
          <div>
            <span className="sw-eyebrow">→ 04 {c.eyebrow}</span>
          </div>

          <div data-reveal>
            <h2 className="sw-display" style={{ fontSize: "clamp(48px, 7vw, 96px)" }}>
              {c.title[0]}
              <br />
              {c.title[1]}
              <span className="sw-dot">.</span>
            </h2>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "48px 0 0",
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              {c.lines.map((line, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: 24,
                    alignItems: "baseline",
                    borderBottom: "1px solid var(--sw-border-soft)",
                    padding: "24px 0",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--sw-font-mono)",
                      fontSize: 12,
                      color: "var(--sw-fg-3)",
                      letterSpacing: "0.02em",
                      minWidth: 28,
                      flexShrink: 0,
                    }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    style={{
                      fontSize: "clamp(16px, 2.5vw, 22px)",
                      lineHeight: 1.4,
                      letterSpacing: "-0.01em",
                      color: "var(--sw-fg-1)",
                    }}
                  >
                    {line}
                  </span>
                </li>
              ))}
            </ul>

            <p
              style={{
                marginTop: 40,
                fontSize: "clamp(16px, 2.5vw, 22px)",
                lineHeight: 1.45,
                letterSpacing: "-0.01em",
                color: "var(--sw-accent)",
              }}
            >
              {c.cta}
              <span className="sw-dot">.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"
import { useLanguage } from "@/contexts/LanguageContext"

const content = {
  es: {
    eyebrow: "El problema",
    title: ["La mayoría de", "agencias va por", "los grandes"],
    body1:
      "Eso deja a las marcas emergentes atascadas — demasiado grandes para hacerlo solas, demasiado pequeñas para permitirse verdadera expertise.",
    body2: "Creamos SellifyWorks",
    body2end: " para solucionar eso.",
  },
  en: {
    eyebrow: "The problem",
    title: ["Most agencies", "chase the", "big fish"],
    body1:
      "That leaves emerging brands stuck — too big to figure it out alone, too small to afford real expertise.",
    body2: "We built SellifyWorks",
    body2end: " to fix that.",
  },
}

export default function ProblemSection() {
  const { language } = useLanguage()
  const c = content[language as keyof typeof content] ?? content.es

  return (
    <section
      style={{
        padding: "clamp(80px, 12vw, 160px) clamp(20px, 4vw, 32px)",
        background: "var(--sw-bg-1)",
        borderBlock: "1px solid var(--sw-border-soft)",
      }}
    >
      <div className="sw-container">
        <div className="sw-grid-2" style={{ alignItems: "flex-start" }}>
          <div>
            <span className="sw-eyebrow">→ 01 {c.eyebrow}</span>
          </div>

          <div data-reveal>
            <h2
              className="sw-display"
              style={{ fontSize: "clamp(48px, 7vw, 96px)", marginBottom: 48 }}
            >
              {c.title[0]}
              <br />
              {c.title[1]}
              <br />
              {c.title[2]}
              <span className="sw-dot">.</span>
            </h2>

            <p
              style={{
                fontSize: "clamp(17px, 2.5vw, 22px)",
                lineHeight: 1.45,
                letterSpacing: "-0.01em",
                color: "var(--sw-fg-2)",
                maxWidth: "34ch",
                marginBottom: 24,
              }}
            >
              {c.body1}
            </p>

            <p
              style={{
                fontSize: "clamp(17px, 2.5vw, 22px)",
                lineHeight: 1.45,
                letterSpacing: "-0.01em",
                color: "var(--sw-fg-1)",
                maxWidth: "34ch",
              }}
            >
              {c.body2}
              <span className="sw-dot">.</span>
              {c.body2end}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

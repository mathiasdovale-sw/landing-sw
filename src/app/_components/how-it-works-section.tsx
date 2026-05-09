"use client"
import { useLanguage } from "@/contexts/LanguageContext"

const content = {
  es: {
    eyebrow: "Cómo funciona",
    title: ["La IA cambió", "el juego"],
    subtitle:
      "Servicios que antes costaban presupuestos de empresa ahora funcionan de forma eficiente — sin recortar calidad. Hemos rediseñado todo nuestro proceso en torno a ello.",
    cards: [
      {
        n: 1,
        label: "Más",
        body: "Diagnósticos de alto valor. Hojas de ruta priorizadas. Cada recomendación vinculada a un número.",
      },
      {
        n: 2,
        label: "Más rápido",
        body: "De discovery a lanzamiento en semanas, no trimestres. Ciclos de desarrollo comprimidos por herramientas asistidas por IA.",
      },
      {
        n: 3,
        label: "Por menos",
        body: "Rigor de empresa a un precio que se adapta a donde está tu marca ahora mismo — no donde no está.",
      },
    ],
  },
  en: {
    eyebrow: "How it works",
    title: ["AI changed", "the game"],
    subtitle:
      "Services that used to cost enterprise budgets now run lean — without cutting corners. We've rebuilt our entire process around it.",
    cards: [
      {
        n: 1,
        label: "More",
        body: "Higher-leverage diagnostics. Stack-ranked roadmaps. Every recommendation tied to a number.",
      },
      {
        n: 2,
        label: "Faster",
        body: "Discovery-to-live in weeks, not quarters. Build cycles compressed by AI-assisted tooling.",
      },
      {
        n: 3,
        label: "For less",
        body: "Enterprise-grade rigor at a price that fits where your brand is right now — not where it isn't.",
      },
    ],
  },
}

export default function HowItWorksSection() {
  const { language } = useLanguage()
  const c = content[language as keyof typeof content] ?? content.es

  return (
    <section
      style={{
        padding: "96px clamp(20px, 4vw, 32px)",
        background: "var(--sw-bg-1)",
        borderBlock: "1px solid var(--sw-border-soft)",
      }}
    >
      <div className="sw-container">
        {/* Header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 32,
            marginBottom: 64,
          }}
        >
          <div>
            <span className="sw-eyebrow">→ 03 {c.eyebrow}</span>
            <h2
              className="sw-display"
              data-reveal
              style={{ fontSize: "clamp(56px, 8vw, 120px)", marginTop: 16 }}
            >
              {c.title[0]}
              <br />
              {c.title[1]}
              <span className="sw-dot">.</span>
            </h2>
          </div>
          <p
            style={{
              maxWidth: 460,
              fontSize: 18,
              lineHeight: 1.4,
              letterSpacing: "-0.01em",
              color: "var(--sw-fg-2)",
            }}
          >
            {c.subtitle}
          </p>
        </div>

        {/* Three cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
            gap: 2,
          }}
        >
          {c.cards.map((it) => (
            <article
              key={it.n}
              className="sw-card"
              data-reveal
              style={{
                minHeight: 260,
                justifyContent: "space-between",
                background: "var(--sw-bg-0)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span className="sw-eyebrow">
                  → {String(it.n).padStart(2, "0")} {it.label}
                </span>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    background: "var(--sw-accent)",
                    display: "block",
                    flexShrink: 0,
                  }}
                  aria-hidden
                />
              </div>
              <div
                className="sw-display"
                style={{ fontSize: "clamp(40px, 4vw, 56px)", lineHeight: 0.95 }}
              >
                {it.label}
                <span className="sw-dot">.</span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--sw-fg-2)" }}>
                {it.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"
import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"

const content = {
  es: {
    eyebrow: "Última palabra",
    title: ["Tu tienda", "merece algo", "mejor"],
    body: "Deja de conformarte con lo genérico. Obtén un partner construido específicamente para donde vas.",
    placeholder: "tu@tumarca.com",
    button: "Empieza la conversación.",
    buttonSent: "Enviado.",
    footnote: "Respuesta en 24 horas · Hora de Madrid",
  },
  en: {
    eyebrow: "Final word",
    title: ["Your store", "deserves", "better"],
    body: "Stop settling for generic. Get a partner built specifically for where you're going.",
    placeholder: "you@yourbrand.com",
    button: "Start the conversation.",
    buttonSent: "Sent.",
    footnote: "Reply within 24 hours · Madrid time",
  },
}

export default function CtaBlock() {
  const { language } = useLanguage()
  const c = content[language as keyof typeof content] ?? content.es
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || submitting || sent) return
    setSubmitting(true)
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
    } catch {
      /* silent */
    } finally {
      setSent(true)
      setEmail("")
      setSubmitting(false)
    }
  }

  return (
    <section
      id="contacto"
      style={{
        padding: "clamp(80px, 12vw, 160px) clamp(20px, 4vw, 32px)",
        background: "var(--sw-bg-0)",
        borderTop: "1px solid var(--sw-border-soft)",
      }}
    >
      <div className="sw-container">
        <div className="sw-grid-2" style={{ alignItems: "flex-end", gap: 64 }}>
          {/* Left — giant headline */}
          <div>
            <span className="sw-eyebrow">→ {c.eyebrow}</span>
            <h2
              className="sw-display"
              style={{ fontSize: "clamp(64px, 10vw, 152px)", marginTop: 16 }}
            >
              {c.title[0]}
              <br />
              {c.title[1]}
              <br />
              {c.title[2]}
              <span className="sw-dot">.</span>
            </h2>
          </div>

          {/* Right — body + form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32, paddingBottom: 12 }}>
            <p
              style={{
                fontSize: "clamp(17px, 2.5vw, 22px)",
                lineHeight: 1.4,
                letterSpacing: "-0.01em",
                color: "var(--sw-fg-2)",
                maxWidth: 460,
              }}
            >
              {c.body}
            </p>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 12,
                  borderBottom: "1px solid var(--sw-border)",
                }}
              >
                <input
                  type="email"
                  required
                  placeholder={c.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={sent || submitting}
                  style={{
                    flex: 1,
                    padding: "14px 0",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "var(--sw-fg-1)",
                    fontFamily: "var(--sw-font-body)",
                    fontSize: 18,
                    lineHeight: 1.4,
                    letterSpacing: "-0.01em",
                  }}
                />
                <button
                  type="submit"
                  disabled={sent || submitting}
                  className={`sw-btn ${sent ? "sw-btn--accent" : "sw-btn--primary"}`}
                  style={{ flexShrink: 0 }}
                >
                  {submitting ? "…" : sent ? c.buttonSent : (
                    <>
                      {c.button}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
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
                {c.footnote}
              </span>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

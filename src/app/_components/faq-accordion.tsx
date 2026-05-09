"use client"
import { useState } from "react"
import { FAQProps } from "@/interfaces/faq"

export default function FAQAccordion({ faqs, title = "FAQ" }: FAQProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    const next = new Set(openItems)
    next.has(id) ? next.delete(id) : next.add(id)
    setOpenItems(next)
  }

  return (
    <section
      style={{ background: "var(--sw-bg-1)", borderTop: "1px solid var(--sw-border-soft)" }}
    >
      <div className="sw-container" style={{ padding: "96px clamp(20px, 4vw, 32px)" }}>
        <div className="sw-grid-2" style={{ alignItems: "flex-start" }}>
          {/* Left label */}
          <div>
            <span className="sw-eyebrow">→ 04 FAQ</span>
            <h2
              className="sw-display"
              style={{ fontSize: "clamp(40px, 6vw, 80px)", marginTop: 16 }}
            >
              {title}
              <span className="sw-dot">.</span>
            </h2>
          </div>

          {/* Right accordion */}
          <div>
            {faqs.map((faq, i) => {
              const open = openItems.has(faq.id)
              return (
                <div key={faq.id} style={{ borderBottom: "1px solid var(--sw-border-soft)" }}>
                  <button
                    onClick={() => toggle(faq.id)}
                    aria-expanded={open}
                    aria-controls={`faq-${faq.id}`}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "24px 0",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      gap: 24,
                      textAlign: "left",
                    }}
                  >
                    <div style={{ display: "flex", gap: 20, alignItems: "baseline", flex: 1 }}>
                      <span
                        style={{
                          fontFamily: "var(--sw-font-mono)",
                          fontSize: 11,
                          color: "var(--sw-fg-4)",
                          letterSpacing: "0.04em",
                          flexShrink: 0,
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3
                        style={{
                          fontSize: 16,
                          fontWeight: 500,
                          color: "var(--sw-fg-1)",
                          lineHeight: 1.4,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{
                        color: "var(--sw-fg-4)",
                        flexShrink: 0,
                        transform: open ? "rotate(45deg)" : "none",
                        transition: "transform 300ms var(--sw-ease-out)",
                      }}
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>

                  <div
                    id={`faq-${faq.id}`}
                    style={{
                      overflow: "hidden",
                      maxHeight: open ? 400 : 0,
                      opacity: open ? 1 : 0,
                      transition:
                        "max-height 400ms var(--sw-ease-out), opacity 300ms var(--sw-ease-out)",
                      paddingLeft: "clamp(20px, 4vw, 40px)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 15,
                        lineHeight: 1.65,
                        color: "var(--sw-fg-2)",
                        paddingBottom: 24,
                      }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

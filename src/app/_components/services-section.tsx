"use client"
import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import TranslatedLink from "@/app/_components/translated-link"
import { useScrollPosition } from "@/hooks/useScrollPosition"

interface ServiceItemProps {
  serviceId: string
  number: string
  title: string
  description: string
  details: string[]
  isExpanded: boolean
  onToggle: () => void
  t: (key: string) => string
  scrollToContact: () => void
}

function ServiceItem({
  serviceId,
  number,
  title,
  description,
  details,
  isExpanded,
  onToggle,
  t,
  scrollToContact,
}: ServiceItemProps) {
  const serviceKey =
    serviceId === "crear" ? "create" : serviceId === "estrategia" ? "strategy" : "scale"

  return (
    <div
      style={{
        borderBottom: "1px solid var(--sw-border-soft)",
        background: isExpanded ? "var(--sw-bg-1)" : "transparent",
        transition: "background 300ms var(--sw-ease-out)",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "clamp(24px, 4vw, 48px) 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(16px, 3vw, 48px)", flex: 1 }}>
          <span
            style={{
              fontFamily: "var(--sw-font-mono)",
              fontSize: 12,
              color: "var(--sw-fg-4)",
              letterSpacing: "0.04em",
              minWidth: 24,
              flexShrink: 0,
            }}
          >
            {number}
          </span>
          <div>
            <div
              className="sw-display"
              style={{ fontSize: "clamp(28px, 5vw, 72px)" }}
            >
              {title.toUpperCase()}
            </div>
            <p
              style={{
                fontSize: "clamp(14px, 1.1vw, 17px)",
                color: "var(--sw-fg-2)",
                lineHeight: 1.45,
                marginTop: 8,
                letterSpacing: "-0.01em",
              }}
            >
              {description}
            </p>
          </div>
        </div>

        {/* Expand/collapse indicator */}
        <div
          style={{
            width: 36,
            height: 36,
            border: "1px solid var(--sw-border)",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "border-color 200ms var(--sw-ease-out)",
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              color: "var(--sw-fg-3)",
              transform: isExpanded ? "rotate(45deg)" : "none",
              transition: "transform 300ms var(--sw-ease-out)",
            }}
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </button>

      {/* Expanded panel */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: isExpanded ? 600 : 0,
          opacity: isExpanded ? 1 : 0,
          transition: "max-height 500ms var(--sw-ease-out), opacity 400ms var(--sw-ease-out)",
        }}
      >
        <div
          style={{
            paddingLeft: "clamp(40px, 6vw, 72px)",
            paddingBottom: 48,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 16,
            }}
          >
            {details.map((_, i) => (
              <div key={i} className="sw-service-detail" style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span
                  style={{
                    color: "var(--sw-accent)",
                    fontSize: 13,
                    lineHeight: 1.6,
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  →
                </span>
                <TranslatedLink
                  textKey={`services.${serviceKey}.detail${i + 1}`}
                  urlKey={`services.${serviceKey}.detail${i + 1}.url`}
                  expandedServiceId={isExpanded ? serviceId : undefined}
                  className="hover:underline"
                />
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 32,
              paddingTop: 24,
              borderTop: "1px solid var(--sw-border-soft)",
            }}
          >
            <button className="sw-btn sw-btn--primary" onClick={scrollToContact}>
              {t("services.more_info")}
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
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ServicesSection() {
  const { t } = useLanguage()
  const [expandedService, setExpandedService] = useState<string | null>(null)
  const { restoreScrollPosition, clearSavedState } = useScrollPosition()

  useEffect(() => {
    const saved = restoreScrollPosition()
    if (saved) {
      const { scrollPosition, expandedService: savedService } = saved
      if (savedService) setExpandedService(savedService)
      setTimeout(() => {
        window.scrollTo({ top: scrollPosition, behavior: "instant" })
        clearSavedState()
      }, 100)
    }
  }, [restoreScrollPosition, clearSavedState])

  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const services = [
    {
      id: "crear",
      number: "01",
      title: t("services.create.title"),
      description: t("services.create.description"),
      details: Array.from({ length: 6 }, (_, i) => t(`services.create.detail${i + 1}`)),
    },
    {
      id: "estrategia",
      number: "02",
      title: t("services.strategy.title"),
      description: t("services.strategy.description"),
      details: Array.from({ length: 6 }, (_, i) => t(`services.strategy.detail${i + 1}`)),
    },
    {
      id: "escalar",
      number: "03",
      title: t("services.scale.title"),
      description: t("services.scale.description"),
      details: Array.from({ length: 6 }, (_, i) => t(`services.scale.detail${i + 1}`)),
    },
  ]

  return (
    <section
      id="services-section"
      style={{ background: "var(--sw-bg-0)", borderTop: "1px solid var(--sw-border-soft)" }}
    >
      <div className="sw-container" style={{ padding: "96px 32px" }}>
        {/* Section header */}
        <div className="sw-grid-2" style={{ alignItems: "flex-start", marginBottom: 64 }}>
          <div>
            <span className="sw-eyebrow">→ 02 {t("nav.services")}</span>
          </div>
          <div data-reveal>
            <h2 className="sw-display" style={{ fontSize: "clamp(40px, 6vw, 96px)" }}>
              {t("services.title")}
              <span className="sw-dot">.</span>
            </h2>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.45,
                letterSpacing: "-0.01em",
                color: "var(--sw-fg-2)",
                marginTop: 20,
                maxWidth: "38ch",
              }}
            >
              {t("services.subtitle")}
            </p>
          </div>
        </div>

        {/* Accordion list */}
        <div style={{ borderTop: "1px solid var(--sw-border-soft)" }}>
          {services.map((s) => (
            <ServiceItem
              key={s.id}
              serviceId={s.id}
              number={s.number}
              title={s.title}
              description={s.description}
              details={s.details}
              isExpanded={expandedService === s.id}
              onToggle={() => setExpandedService(expandedService === s.id ? null : s.id)}
              t={t}
              scrollToContact={scrollToContact}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

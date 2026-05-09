"use client"
import { useState, useRef, useEffect } from "react"
import { useLanguage } from "@/contexts/LanguageContext"

declare global {
  interface Window {
    grecaptcha: any
    onRecaptchaLoad: () => void
  }
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 0",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid var(--sw-border)",
  outline: "none",
  color: "var(--sw-fg-1)",
  fontFamily: "var(--sw-font-body)",
  fontSize: 15,
  letterSpacing: "-0.01em",
  transition: "border-color 200ms var(--sw-ease-out)",
}

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--sw-font-mono)",
  fontSize: 10,
  color: "var(--sw-fg-3)",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  display: "block",
  marginBottom: 4,
}

export default function ContactSection() {
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })
  const recaptchaRef = useRef<HTMLDivElement>(null)
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)
  const [recaptchaWidgetId, setRecaptchaWidgetId] = useState<number | null>(null)
  const [showLoadingMessage, setShowLoadingMessage] = useState(false)

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    if (!siteKey) return

    const loadingTimer = setTimeout(() => {
      if (!recaptchaLoaded) setShowLoadingMessage(true)
    }, 500)

    window.onRecaptchaLoad = () => {
      try {
        if (recaptchaRef.current && window.grecaptcha) {
          if (recaptchaWidgetId !== null) {
            try { window.grecaptcha.reset(recaptchaWidgetId) } catch { /* silent */ }
          }
          const id = window.grecaptcha.render(recaptchaRef.current, {
            sitekey: siteKey,
            theme: "dark",
            size: "normal",
          })
          setRecaptchaWidgetId(id)
          setRecaptchaLoaded(true)
          setShowLoadingMessage(false)
        }
      } catch {
        setRecaptchaLoaded(false)
        setShowLoadingMessage(false)
      }
    }

    if (window.grecaptcha?.render) {
      clearTimeout(loadingTimer)
      window.onRecaptchaLoad()
      return
    }

    if (!document.querySelector('script[src*="recaptcha"]')) {
      const s = document.createElement("script")
      s.src = "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit"
      s.async = true
      s.defer = true
      s.onload = () =>
        setTimeout(() => {
          if (window.grecaptcha && window.onRecaptchaLoad) {
            clearTimeout(loadingTimer)
            window.onRecaptchaLoad()
          }
        }, 100)
      document.head.appendChild(s)
    } else if (window.grecaptcha) {
      clearTimeout(loadingTimer)
      window.onRecaptchaLoad()
    }

    return () => {
      clearTimeout(loadingTimer)
      if (recaptchaWidgetId !== null && window.grecaptcha) {
        try { window.grecaptcha.reset(recaptchaWidgetId) } catch { /* silent */ }
      }
      setRecaptchaLoaded(false)
      setRecaptchaWidgetId(null)
      setShowLoadingMessage(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const resetRecaptcha = () => {
    try {
      if (!window.grecaptcha || typeof window.grecaptcha.reset !== "function") return
      if (recaptchaWidgetId == null) return
      window.grecaptcha.reset(recaptchaWidgetId)
    } catch { /* silent */ }
  }

  const getRecaptchaToken = (): string | null => {
    try {
      if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) return null
      if (!window.grecaptcha || typeof window.grecaptcha.getResponse !== "function") return null
      if (recaptchaWidgetId == null) return null
      return window.grecaptcha.getResponse(recaptchaWidgetId) || null
    } catch { return null }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    const recaptchaEnabled = !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    const token = getRecaptchaToken()

    if (recaptchaEnabled && recaptchaLoaded && recaptchaWidgetId !== null && !token) {
      setSubmitStatus({ type: "error", message: "Por favor, completa la verificación reCAPTCHA." })
      setIsSubmitting(false)
      return
    }

    const fd = new FormData(e.currentTarget)
    const data = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      company: fd.get("company") as string,
      service: fd.get("service") as string,
      message: fd.get("message") as string,
      recaptchaToken: token || "dev-mode",
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      let result
      try {
        const text = await res.text()
        if (text) result = JSON.parse(text)
        else throw new Error("Respuesta vacía")
      } catch {
        setSubmitStatus({ type: "error", message: "Error al procesar la respuesta del servidor." })
        resetRecaptcha()
        return
      }

      if (res.ok && result.success) {
        setSubmitStatus({ type: "success", message: t("contact.form.success") })
        try { e.currentTarget.reset() } catch { /* silent */ }
        resetRecaptcha()
      } else {
        setSubmitStatus({ type: "error", message: result.error || "Error al enviar el mensaje." })
        resetRecaptcha()
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error desconocido"
      setSubmitStatus({ type: "error", message: `Error de conexión: ${msg}.` })
      resetRecaptcha()
    } finally {
      setIsSubmitting(false)
    }
  }

  const focusInput = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderBottomColor = "var(--sw-fg-1)"
  }
  const blurInput = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderBottomColor = "var(--sw-border)"
  }

  const infoItems = [
    { label: t("contact.info.email"), value: "contact@sellifyworks.com" },
    { label: t("contact.info.phone"), value: "+34 621 640 364" },
    { label: t("contact.info.location"), value: "Barcelona, España" },
  ]

  return (
    <section
      id="contacto"
      style={{ background: "var(--sw-bg-0)", borderTop: "1px solid var(--sw-border-soft)" }}
    >
      <div className="sw-container" style={{ padding: "96px clamp(20px, 4vw, 32px)" }}>
        <div className="sw-grid-2" style={{ alignItems: "flex-start" }}>
          {/* Left — info */}
          <div>
            <span className="sw-eyebrow">→ 03 {t("contact.title")}</span>
            <h2
              className="sw-display"
              style={{ fontSize: "clamp(48px, 7vw, 112px)", marginTop: 16 }}
            >
              {t("contact.title")}
              <span className="sw-dot">.</span>
            </h2>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.45,
                color: "var(--sw-fg-2)",
                marginTop: 24,
                maxWidth: "32ch",
                letterSpacing: "-0.01em",
              }}
            >
              {t("contact.description")}
            </p>

            <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 28 }}>
              {infoItems.map(({ label, value }) => (
                <div key={label}>
                  <span className="sw-eyebrow" style={{ display: "block", marginBottom: 6 }}>
                    {label}
                  </span>
                  <span style={{ fontSize: 15, color: "var(--sw-fg-2)" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div data-reveal>
            <h3
              className="sw-display"
              style={{ fontSize: "clamp(24px, 3vw, 40px)", marginBottom: 40 }}
            >
              {t("contact.form.title")}
            </h3>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {/* Name + Email row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
                <div>
                  <label style={labelStyle}>{t("contact.form.name.label")}</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={t("contact.form.name")}
                    style={inputStyle}
                    onFocus={focusInput}
                    onBlur={blurInput}
                  />
                </div>
                <div>
                  <label style={labelStyle}>{t("contact.form.email.label")}</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={t("contact.form.email")}
                    style={inputStyle}
                    onFocus={focusInput}
                    onBlur={blurInput}
                  />
                </div>
              </div>

              {/* Company */}
              <div style={{ marginTop: 32 }}>
                <label style={labelStyle}>{t("contact.form.company.label")}</label>
                <input
                  type="text"
                  name="company"
                  placeholder={t("contact.form.company")}
                  style={inputStyle}
                  onFocus={focusInput}
                  onBlur={blurInput}
                />
              </div>

              {/* Service */}
              <div style={{ marginTop: 32 }}>
                <label style={labelStyle}>{t("contact.form.service.label")}</label>
                <select
                  name="service"
                  style={{ ...inputStyle, cursor: "pointer" }}
                  onFocus={focusInput}
                  onBlur={blurInput}
                >
                  <option value="" style={{ background: "var(--sw-bg-2)" }}>
                    {t("contact.form.service.placeholder")}
                  </option>
                  <option value="development" style={{ background: "var(--sw-bg-2)" }}>
                    {t("contact.form.service.development")}
                  </option>
                  <option value="optimization" style={{ background: "var(--sw-bg-2)" }}>
                    {t("contact.form.service.optimization")}
                  </option>
                  <option value="migration" style={{ background: "var(--sw-bg-2)" }}>
                    {t("contact.form.service.migration")}
                  </option>
                  <option value="maintenance" style={{ background: "var(--sw-bg-2)" }}>
                    {t("contact.form.service.maintenance")}
                  </option>
                  <option value="consulting" style={{ background: "var(--sw-bg-2)" }}>
                    {t("contact.form.service.consulting")}
                  </option>
                </select>
              </div>

              {/* Message */}
              <div style={{ marginTop: 32 }}>
                <label style={labelStyle}>{t("contact.form.message.label")}</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder={t("contact.form.message")}
                  style={{ ...inputStyle, resize: "none" }}
                  onFocus={focusInput}
                  onBlur={blurInput}
                />
              </div>

              {/* reCAPTCHA */}
              {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                <div style={{ marginTop: 24 }}>
                  <div ref={recaptchaRef} id="recaptcha-container" />
                  {showLoadingMessage && !recaptchaLoaded && (
                    <span
                      style={{
                        fontFamily: "var(--sw-font-mono)",
                        fontSize: 11,
                        color: "var(--sw-fg-3)",
                      }}
                    >
                      Cargando reCAPTCHA...
                    </span>
                  )}
                </div>
              )}

              {/* Submit + status */}
              <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="sw-btn sw-btn--primary sw-btn--lg"
                  style={{ opacity: isSubmitting ? 0.6 : 1 }}
                >
                  {isSubmitting ? t("contact.form.sending") : t("contact.form.submit")}
                  {!isSubmitting && (
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
                  )}
                </button>

                {submitStatus.type && (
                  <span
                    style={{
                      fontSize: 13,
                      lineHeight: 1.4,
                      maxWidth: "32ch",
                      color: submitStatus.type === "success" ? "#4ade80" : "#f87171",
                    }}
                  >
                    {submitStatus.message}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

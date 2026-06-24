"use client"
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useLanguage } from "@/contexts/LanguageContext"

declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaLoad: () => void;
  }
}

type FieldName = 'name' | 'email' | 'company' | 'message'
type FieldStatus = 'idle' | 'valid' | 'invalid'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactSection() {
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })
  const recaptchaRef = useRef<HTMLDivElement>(null)
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)
  const [recaptchaWidgetId, setRecaptchaWidgetId] = useState<number | null>(null)
  const [showLoadingMessage, setShowLoadingMessage] = useState(false)

  const [values, setValues] = useState<Record<FieldName, string>>({
    name: '', email: '', company: '', message: '',
  })
  const [fieldStatus, setFieldStatus] = useState<Record<FieldName, { status: FieldStatus; message: string }>>({
    name: { status: 'idle', message: '' },
    email: { status: 'idle', message: '' },
    company: { status: 'idle', message: '' },
    message: { status: 'idle', message: '' },
  })

  const validateField = (field: FieldName, value: string, live: boolean): boolean => {
    const val = value.trim()

    if (field === 'name') {
      if (!val) {
        setFieldStatus((s) => ({ ...s, name: live ? { status: 'idle', message: '' } : { status: 'invalid', message: t('contact.form.name.req') } }))
        return false
      }
      setFieldStatus((s) => ({ ...s, name: { status: 'valid', message: t('contact.form.name.ok') } }))
      return true
    }

    if (field === 'email') {
      if (!val) {
        setFieldStatus((s) => ({ ...s, email: live ? { status: 'idle', message: '' } : { status: 'invalid', message: t('contact.form.email.req') } }))
        return false
      }
      if (!EMAIL_RE.test(val)) {
        setFieldStatus((s) => ({ ...s, email: { status: 'invalid', message: t('contact.form.email.bad') } }))
        return false
      }
      setFieldStatus((s) => ({ ...s, email: { status: 'valid', message: t('contact.form.email.ok') } }))
      return true
    }

    if (field === 'company') {
      if (!val) {
        setFieldStatus((s) => ({ ...s, company: { status: 'idle', message: '' } }))
        return true
      }
      setFieldStatus((s) => ({ ...s, company: { status: 'valid', message: t('contact.form.company.ok') } }))
      return true
    }

    // message
    if (!val) {
      setFieldStatus((s) => ({ ...s, message: live ? { status: 'idle', message: '' } : { status: 'invalid', message: t('contact.form.message.req') } }))
      return false
    }
    if (val.length < 10) {
      setFieldStatus((s) => ({ ...s, message: { status: 'invalid', message: t('contact.form.message.short') } }))
      return false
    }
    setFieldStatus((s) => ({ ...s, message: { status: 'valid', message: t('contact.form.message.ok') } }))
    return true
  }

  const handleChange = (field: FieldName) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    setValues((v) => ({ ...v, [field]: value }))
    validateField(field, value, true)
  }

  const handleBlur = (field: FieldName) => () => {
    validateField(field, values[field], false)
  }

  // Cargar reCAPTCHA cuando el componente se monta
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    if (!siteKey) return

    const loadingTimer = setTimeout(() => {
      if (!recaptchaLoaded) {
        setShowLoadingMessage(true)
      }
    }, 500)

    window.onRecaptchaLoad = () => {
      try {
        if (recaptchaRef.current && window.grecaptcha) {
          if (recaptchaWidgetId !== null) {
            try {
              window.grecaptcha.reset(recaptchaWidgetId)
            } catch (e) {
              // Silencioso
            }
          }

          const widgetId = window.grecaptcha.render(recaptchaRef.current, {
            sitekey: siteKey,
            theme: 'dark',
            size: 'normal'
          })
          setRecaptchaWidgetId(widgetId)
          setRecaptchaLoaded(true)
          setShowLoadingMessage(false)
        }
      } catch (error) {
        setRecaptchaLoaded(false)
        setShowLoadingMessage(false)
      }
    }

    if (window.grecaptcha && window.grecaptcha.render) {
      clearTimeout(loadingTimer)
      window.onRecaptchaLoad()
      return
    }

    if (!document.querySelector('script[src*="recaptcha"]')) {
      const script = document.createElement('script')
      script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit'
      script.async = true
      script.defer = true
      script.onload = () => {
        setTimeout(() => {
          if (window.grecaptcha && window.onRecaptchaLoad) {
            clearTimeout(loadingTimer)
            window.onRecaptchaLoad()
          }
        }, 100)
      }
      document.head.appendChild(script)
    } else if (window.grecaptcha) {
      clearTimeout(loadingTimer)
      window.onRecaptchaLoad()
    }

    return () => {
      clearTimeout(loadingTimer)
      if (recaptchaWidgetId !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(recaptchaWidgetId)
        } catch (e) {
          // Silencioso
        }
      }
      setRecaptchaLoaded(false)
      setRecaptchaWidgetId(null)
      setShowLoadingMessage(false)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const nameOk = validateField('name', values.name, false)
    const emailOk = validateField('email', values.email, false)
    const messageOk = validateField('message', values.message, false)

    if (!nameOk || !emailOk || !messageOk) {
      setSubmitStatus({ type: 'error', message: t('contact.form.err') })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    const recaptchaEnabled = !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

    const resetRecaptcha = () => {
      try {
        if (typeof window === 'undefined') return
        if (!window.grecaptcha) return
        if (typeof window.grecaptcha.reset !== 'function') return
        if (recaptchaWidgetId === null || recaptchaWidgetId === undefined) return
        window.grecaptcha.reset(recaptchaWidgetId)
      } catch (error) {
        // Completamente silencioso
      }
    }

    const getRecaptchaToken = () => {
      try {
        if (!recaptchaEnabled) return null
        if (typeof window === 'undefined') return null
        if (!window.grecaptcha) return null
        if (typeof window.grecaptcha.getResponse !== 'function') return null
        if (recaptchaWidgetId === null || recaptchaWidgetId === undefined) return null
        const response = window.grecaptcha.getResponse(recaptchaWidgetId)
        return response || null
      } catch (error) {
        return null
      }
    }

    const recaptchaToken = getRecaptchaToken()

    if (recaptchaEnabled && recaptchaLoaded && recaptchaWidgetId !== null && !recaptchaToken) {
      setSubmitStatus({
        type: 'error',
        message: 'Por favor, completa la verificación reCAPTCHA.'
      })
      setIsSubmitting(false)
      return
    }

    const data = {
      name: values.name,
      email: values.email,
      company: values.company,
      message: values.message,
      recaptchaToken: recaptchaToken || 'dev-mode',
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('📤 Datos a enviar:', {
        ...data,
        recaptchaToken: data.recaptchaToken === 'dev-mode' ? 'dev-mode' : '***TOKEN***'
      })
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      let result
      try {
        const responseText = await response.text()
        if (responseText) {
          result = JSON.parse(responseText)
        } else {
          throw new Error('Respuesta vacía del servidor')
        }
      } catch (jsonError) {
        setSubmitStatus({
          type: 'error',
          message: 'Error al procesar la respuesta del servidor.'
        })
        resetRecaptcha()
        return
      }

      if (response.ok && result.success) {
        setSubmitStatus({ type: 'success', message: t('contact.form.success') })
        try {
          e.currentTarget.reset()
        } catch (error) {
          // Silencioso
        }
        setValues({ name: '', email: '', company: '', message: '' })
        setFieldStatus({
          name: { status: 'idle', message: '' },
          email: { status: 'idle', message: '' },
          company: { status: 'idle', message: '' },
          message: { status: 'idle', message: '' },
        })
        resetRecaptcha()
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Error al enviar el mensaje. Inténtalo de nuevo.'
        })
        resetRecaptcha()
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
      setSubmitStatus({
        type: 'error',
        message: `Error de conexión: ${errorMessage}. Por favor, inténtalo de nuevo.`
      })
      resetRecaptcha()
    } finally {
      setIsSubmitting(false)
    }
  }

  const fieldBorderClass = (field: FieldName) => {
    const status = fieldStatus[field].status
    if (status === 'valid') return 'border-sw-success'
    if (status === 'invalid') return 'border-sw-danger'
    return 'border-sw-line-strong'
  }

  const fieldMessageClass = (field: FieldName) => {
    const status = fieldStatus[field].status
    if (status === 'valid') return 'text-sw-success'
    if (status === 'invalid') return 'text-sw-danger'
    return ''
  }

  return (
    <section id="contacto" className="bg-sw-bg-1 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Side - Content */}
          <div>
            <h2 className="font-display text-4xl text-sw-fg-1 sm:text-5xl lg:text-6xl">
              {t('contact.title')}
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-sw-fg-2">
              {t('contact.description')}
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sw-bg-2">
                  <Mail size={18} className="text-sw-fg-1" />
                </div>
                <div>
                  <p className="font-mono-label text-sw-fg-3">{t('contact.info.email')}</p>
                  <p className="text-sw-fg-1">contact@sellifyworks.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sw-bg-2">
                  <Phone size={18} className="text-sw-fg-1" />
                </div>
                <div>
                  <p className="font-mono-label text-sw-fg-3">{t('contact.info.phone')}</p>
                  <p className="text-sw-fg-1">+34 621 640 364</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sw-bg-2">
                  <MapPin size={18} className="text-sw-fg-1" />
                </div>
                <div>
                  <p className="font-mono-label text-sw-fg-3">{t('contact.info.location')}</p>
                  <p className="text-sw-fg-1">Barcelona, España</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="rounded-sm border border-sw-line bg-sw-bg-0 p-8 md:p-10">
            <h3 className="font-display text-2xl text-sw-fg-1 sm:text-3xl">
              {t('contact.form.title')}
            </h3>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 flex items-baseline justify-between font-mono-label text-sw-fg-3">
                    <span>{t('contact.form.name.label')}</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange('name')}
                    onBlur={handleBlur('name')}
                    className={`w-full rounded-sm border bg-sw-bg-2 px-4 py-3 text-sw-fg-1 outline-none transition-colors focus:border-sw-brand ${fieldBorderClass('name')}`}
                    placeholder={t('contact.form.name')}
                  />
                  <span className={`mt-1.5 block min-h-[14px] font-mono-label text-[12px] normal-case tracking-normal ${fieldMessageClass('name')}`}>
                    {fieldStatus.name.message}
                  </span>
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 flex items-baseline justify-between font-mono-label text-sw-fg-3">
                    <span>{t('contact.form.email.label')}</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    className={`w-full rounded-sm border bg-sw-bg-2 px-4 py-3 text-sw-fg-1 outline-none transition-colors focus:border-sw-brand ${fieldBorderClass('email')}`}
                    placeholder={t('contact.form.email')}
                  />
                  <span className={`mt-1.5 block min-h-[14px] font-mono-label text-[12px] normal-case tracking-normal ${fieldMessageClass('email')}`}>
                    {fieldStatus.email.message}
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="company" className="mb-2 block font-mono-label text-sw-fg-3">
                  {t('contact.form.company.label')}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={values.company}
                  onChange={handleChange('company')}
                  onBlur={handleBlur('company')}
                  className={`w-full rounded-sm border bg-sw-bg-2 px-4 py-3 text-sw-fg-1 outline-none transition-colors focus:border-sw-brand ${fieldBorderClass('company')}`}
                  placeholder={t('contact.form.company')}
                />
                <span className={`mt-1.5 block min-h-[14px] font-mono-label text-[12px] normal-case tracking-normal ${fieldMessageClass('company')}`}>
                  {fieldStatus.company.message}
                </span>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block font-mono-label text-sw-fg-3">
                  {t('contact.form.message.label')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={handleChange('message')}
                  onBlur={handleBlur('message')}
                  className={`w-full resize-none rounded-sm border bg-sw-bg-2 px-4 py-3 text-sw-fg-1 outline-none transition-colors focus:border-sw-brand ${fieldBorderClass('message')}`}
                  placeholder={t('contact.form.message')}
                ></textarea>
                <span className={`mt-1.5 block min-h-[14px] font-mono-label text-[12px] normal-case tracking-normal ${fieldMessageClass('message')}`}>
                  {fieldStatus.message.message}
                </span>
              </div>

              {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                <div className="flex justify-center">
                  <div ref={recaptchaRef} id="recaptcha-container"></div>
                  {showLoadingMessage && !recaptchaLoaded && (
                    <div className="text-sm text-sw-fg-3">Cargando reCAPTCHA...</div>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex w-full items-center justify-center rounded-sm px-8 py-4 font-medium text-white transition-colors ${
                  isSubmitting ? 'cursor-not-allowed bg-sw-fg-4' : 'bg-sw-brand hover:bg-sw-brand-hover'
                }`}
              >
                {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
                {!isSubmitting && (
                  <ArrowRight size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
                )}
              </button>

              {submitStatus.type && (
                <div className={`font-mono-label text-[13px] normal-case tracking-normal ${
                  submitStatus.type === 'success' ? 'text-sw-success' : 'text-sw-danger'
                }`}>
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

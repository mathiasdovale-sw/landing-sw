"use client"
import { Mail, MapPin, ArrowRight, MessageCircle } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { whatsappHref } from "@/lib/contact-config"

type FieldName = 'name' | 'email' | 'company' | 'url' | 'message'
type FieldStatus = 'idle' | 'valid' | 'invalid'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// URL de la tienda: basta con un dominio ("mitienda.com"), con o sin https://
const URL_RE = /^(https?:\/\/)?[^\s/.]+(\.[^\s/.]+)+(\/\S*)?$/i

export default function ContactSection() {
  const { t } = useLanguage()
  // Se pide la URL de la tienda (en lugar de "Empresa").
  const waHref = whatsappHref()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  // Campo trampa (antispam): oculto para las personas; solo lo rellenan los bots.
  const [trap, setTrap] = useState('')
  const [values, setValues] = useState<Record<FieldName, string>>({
    name: '', email: '', company: '', url: '', message: '',
  })
  const [fieldStatus, setFieldStatus] = useState<Record<FieldName, { status: FieldStatus; message: string }>>({
    name: { status: 'idle', message: '' },
    email: { status: 'idle', message: '' },
    company: { status: 'idle', message: '' },
    url: { status: 'idle', message: '' },
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

    if (field === 'url') {
      if (!val) {
        setFieldStatus((s) => ({ ...s, url: live ? { status: 'idle', message: '' } : { status: 'invalid', message: t('contact.form.url.req') } }))
        return false
      }
      if (!URL_RE.test(val)) {
        setFieldStatus((s) => ({ ...s, url: live ? { status: 'idle', message: '' } : { status: 'invalid', message: t('contact.form.url.bad') } }))
        return false
      }
      setFieldStatus((s) => ({ ...s, url: { status: 'valid', message: t('contact.form.url.ok') } }))
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const nameOk = validateField('name', values.name, false)
    const emailOk = validateField('email', values.email, false)
    const messageOk = validateField('message', values.message, false)
    const urlOk = validateField('url', values.url, false)

    if (!nameOk || !emailOk || !messageOk || !urlOk) {
      setSubmitStatus({ type: 'error', message: t('contact.form.err') })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    const data = {
      name: values.name,
      email: values.email,
      company: values.company,
      message: values.message,
      storeUrl: values.url.trim(),
      // El campo trampa solo viaja si alguien (un bot) lo ha rellenado
      ...(trap ? { website: trap } : {}),
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('📤 Datos a enviar:', data)
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
        return
      }

      if (response.ok && result.success) {
        setSubmitStatus({ type: 'success', message: t('contact.form.success') })
        // GA4 vía GTM: evento de conversión (activador "Evento personalizado" = generate_lead)
        try {
          const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
          w.dataLayer = w.dataLayer || []
          w.dataLayer.push({ event: 'generate_lead', form_name: 'contacto' })
        } catch (error) {
          // Silencioso
        }
        try {
          e.currentTarget.reset()
        } catch (error) {
          // Silencioso
        }
        setValues({ name: '', email: '', company: '', url: '', message: '' })
        setFieldStatus({
          name: { status: 'idle', message: '' },
          email: { status: 'idle', message: '' },
          company: { status: 'idle', message: '' },
          url: { status: 'idle', message: '' },
          message: { status: 'idle', message: '' },
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Error al enviar el mensaje. Inténtalo de nuevo.'
        })
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
      setSubmitStatus({
        type: 'error',
        message: `Error de conexión: ${errorMessage}. Por favor, inténtalo de nuevo.`
      })
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
                  <MapPin size={18} className="text-sw-fg-1" />
                </div>
                <div>
                  <p className="font-mono-label text-sw-fg-3">{t('contact.info.location')}</p>
                  <p className="text-sw-fg-1">Barcelona, España</p>
                </div>
              </div>
            </div>

            {waHref && (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2 rounded-sm border border-sw-success/60 px-6 py-3 font-semibold text-sw-fg-1 transition-colors hover:bg-sw-success/10"
              >
                <MessageCircle size={18} className="text-sw-success" aria-hidden="true" />
                {t('contact.whatsapp')}
              </a>
            )}
          </div>

          {/* Right Side - Contact Form */}
          <div className="rounded-sm border border-sw-line bg-sw-bg-0 p-8 md:p-10">
            <h3 className="font-display text-2xl text-sw-fg-1 sm:text-3xl">
              {t('contact.form.title')}
            </h3>

            <form onSubmit={handleSubmit} className="relative mt-6 space-y-5" noValidate>
              {/* Campo trampa: fuera de pantalla, sin foco con teclado y oculto a lectores de pantalla. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="contact-website">No rellenes este campo</label>
                <input
                  id="contact-website"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={trap}
                  onChange={(e) => setTrap(e.target.value)}
                />
              </div>
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
                    className={`w-full rounded-sm border bg-sw-bg-2 px-4 py-3 text-sw-fg-1 outline-none transition-colors focus:border-sw-secondary ${fieldBorderClass('name')}`}
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
                    className={`w-full rounded-sm border bg-sw-bg-2 px-4 py-3 text-sw-fg-1 outline-none transition-colors focus:border-sw-secondary ${fieldBorderClass('email')}`}
                    placeholder={t('contact.form.email')}
                  />
                  <span className={`mt-1.5 block min-h-[14px] font-mono-label text-[12px] normal-case tracking-normal ${fieldMessageClass('email')}`}>
                    {fieldStatus.email.message}
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="store-url" className="mb-2 block font-mono-label text-sw-fg-3">
                  {t('contact.form.url.label')}
                </label>
                <input
                  type="text"
                  id="store-url"
                  name="url"
                  inputMode="url"
                  autoComplete="url"
                  value={values.url}
                  onChange={handleChange('url')}
                  onBlur={handleBlur('url')}
                  className={`w-full rounded-sm border bg-sw-bg-2 px-4 py-3 text-sw-fg-1 outline-none transition-colors focus:border-sw-secondary ${fieldBorderClass('url')}`}
                  placeholder={t('contact.form.url')}
                />
                <span className={`mt-1.5 block min-h-[14px] font-mono-label text-[12px] normal-case tracking-normal ${fieldMessageClass('url')}`}>
                  {fieldStatus.url.message}
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
                  className={`w-full resize-none rounded-sm border bg-sw-bg-2 px-4 py-3 text-sw-fg-1 outline-none transition-colors focus:border-sw-secondary ${fieldBorderClass('message')}`}
                  placeholder={t('contact.form.message')}
                ></textarea>
                <span className={`mt-1.5 block min-h-[14px] font-mono-label text-[12px] normal-case tracking-normal ${fieldMessageClass('message')}`}>
                  {fieldStatus.message.message}
                </span>
              </div>


              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className={`flex w-full items-center justify-center rounded-sm px-8 py-4 font-medium text-white transition-colors ${
                  isSubmitting ? 'cursor-not-allowed bg-sw-fg-4' : 'bg-sw-brand hover:bg-sw-brand-hover'
                }`}
              >
                {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
                {!isSubmitting && (
                  <ArrowRight size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
                )}
              </motion.button>

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

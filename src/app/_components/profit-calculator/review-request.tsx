"use client"
// Captura de email de la calculadora. Dos usos:
// - ReviewRequest: "Revisemos tus números juntos" (al final del análisis).
// - HelpRequest: ayuda para rellenar la calculadora (al final del formulario).
// Usan el mismo envío que el formulario de contacto (/api/contact, Brevo), de
// momento sin reCAPTCHA. Solo se envían el email y el origen; los números de la
// calculadora NO salen del navegador.
import { useId, useState, type FormEvent } from "react"
import { ArrowRight, CheckCircle2, LifeBuoy, Loader2 } from "lucide-react"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Source = "calculadora de beneficios" | "calculadora de beneficios (ayuda para rellenarla)"
type Status = "idle" | "sending" | "success" | "invalid" | "error"

interface EmailFormProps {
  source: Source
  submitLabel: string
  successText: string
  /** Texto de la línea legal, antes del enlace a la política de privacidad. */
  legal: string
  /** Analítica (GTM): nombre del formulario en el evento generate_lead. */
  formName: string
  autoFocus?: boolean
}

function EmailForm({ source, submitLabel, successText, legal, formName, autoFocus }: EmailFormProps) {
  const id = useId()
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  // Campo trampa (antispam): oculto para las personas; solo lo rellenan los bots.
  const [trap, setTrap] = useState("")
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = email.trim()
    if (!EMAIL_RE.test(value)) {
      setStatus("invalid")
      return
    }
    setStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Solo email y origen. Nada de los números de la calculadora. El campo
        // trampa solo viaja si alguien (un bot) lo ha rellenado.
        body: JSON.stringify({ type: "review-request", email: value, source, ...(trap ? { website: trap } : {}) }),
      })
      const data = await res.json().catch(() => null)
      if (res.ok && data?.success) {
        setStatus("success")
        try {
          const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
          w.dataLayer = w.dataLayer || []
          w.dataLayer.push({ event: "generate_lead", form_name: formName })
        } catch {
          /* silencioso */
        }
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const invalid = status === "invalid"

  if (status === "success") {
    return (
      <p
        className="flex items-center justify-center gap-2 rounded-sm border border-sw-success/40 bg-sw-success/10 px-4 py-4 text-base font-semibold text-sw-success"
        role="status"
      >
        <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
        {successText}
      </p>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="text-left">
      {/* Campo trampa: fuera de pantalla, sin foco con teclado y oculto a lectores de pantalla. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-web`}>No rellenes este campo</label>
        <input
          id={`${id}-web`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
        />
      </div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-sw-fg-2">
        Tu email
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          autoFocus={autoFocus}
          value={email}
          placeholder="tu@email.com"
          aria-invalid={invalid || undefined}
          aria-describedby={`${id}-msg`}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status !== "sending") setStatus("idle")
          }}
          className={`min-w-0 flex-1 rounded-sm border bg-sw-bg-2 px-4 py-3.5 text-base text-sw-fg-1 outline-none transition-colors placeholder:text-sw-fg-4 focus:border-sw-secondary ${
            invalid ? "border-sw-danger" : "border-sw-line-strong"
          }`}
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-sm bg-sw-brand px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-sw-brand-hover disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Enviando…
            </>
          ) : (
            <>
              {submitLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      <p id={`${id}-msg`} className="mt-2 min-h-[1.25rem] text-sm" role="alert">
        {invalid && <span className="text-sw-danger">Revisa el email: no parece válido.</span>}
        {status === "error" && (
          <span className="text-sw-danger">
            No se ha podido enviar. Inténtalo de nuevo o escríbenos a{" "}
            <a href="mailto:contact@sellifyworks.com" className="underline underline-offset-2">
              contact@sellifyworks.com
            </a>
            .
          </span>
        )}
      </p>

      <p className="mt-1 text-xs leading-relaxed text-sw-fg-4">
        {legal}{" "}
        <a href="/es/politica-de-privacidad" className="underline underline-offset-2 hover:text-sw-fg-2">
          Política de privacidad
        </a>
      </p>
    </form>
  )
}

/** Bloque final: "Revisemos tus números juntos (15 min, gratis)". */
export default function ReviewRequest() {
  return (
    <div className="rounded-sm border border-sw-line-strong bg-sw-bg-0 p-5 sm:p-10">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-display text-2xl text-sw-fg-1 sm:text-4xl">Revisemos tus números juntos (15 min, gratis)</h2>
        <p className="mt-4 text-sw-fg-2">Una videollamada corta para repasar tus resultados y resolver dudas sobre cómo leerlos.</p>
        <div className="mt-7">
          <EmailForm
            source="calculadora de beneficios"
            submitLabel="Pedir la revisión"
            successText="Te escribo para buscar un hueco."
            legal="Solo nos llega tu email, no tus números. Lo usamos para escribirte sobre esta revisión."
            formName="calculadora_beneficios"
          />
        </div>
      </div>
    </div>
  )
}

/**
 * Ayuda mientras se rellena: discreta y plegada. Solo muestra el campo de email
 * cuando la persona la pide, para no interrumpir a quien no la necesita.
 */
export function HelpRequest() {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  return (
    <div className="rounded-sm border border-dashed border-sw-line-strong bg-sw-bg-1 p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <LifeBuoy className="mt-0.5 h-5 w-5 shrink-0 text-sw-secondary" aria-hidden="true" />
          <div>
            <p className="font-semibold text-sw-fg-1">¿No sabes de dónde sacar algún dato?</p>
            <p className="mt-0.5 text-sm text-sw-fg-3">Déjame tu email y te ayudo a rellenar la calculadora.</p>
          </div>
        </div>
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls={panelId}
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-sm border border-sw-line-strong px-4 py-2.5 text-sm font-semibold text-sw-fg-1 transition-colors hover:border-sw-fg-1"
          >
            Pedir ayuda
          </button>
        )}
      </div>
      {open && (
        <div id={panelId} className="mt-4 border-t border-sw-line pt-4">
          <EmailForm
            source="calculadora de beneficios (ayuda para rellenarla)"
            submitLabel="Pedir ayuda"
            successText="Te escribo para ayudarte con la calculadora."
            legal="Solo nos llega tu email, no tus números. Lo usamos para escribirte sobre tu duda."
            formName="calculadora_beneficios_ayuda"
            autoFocus
          />
        </div>
      )}
    </div>
  )
}

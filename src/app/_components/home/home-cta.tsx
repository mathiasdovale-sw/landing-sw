import Link from "next/link"

// CTA principal de la home.
// ES: la calculadora de beneficios. EN: la reunión gratis (la calculadora solo existe en español).
export const CALCULATOR_HREF = "/es/calculadora-rentabilidad"

const COPY = {
  es: { href: CALCULATOR_HREF, label: "Calcula cuánto te queda de verdad", micro: "Gratis, sin registro" },
  en: { href: "#contacto", label: "Book a free meeting", micro: "Free, no strings attached" },
}

export default function HomeCta({ locale, className = "" }: { locale: "es" | "en"; className?: string }) {
  const c = COPY[locale]
  return (
    <div className={`flex flex-col items-start gap-2 ${className}`}>
      <Link
        href={c.href}
        className="rounded-sm bg-sw-brand px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-sw-brand-hover"
      >
        {c.label}
      </Link>
      <span className="font-mono-label text-sw-fg-4">{c.micro}</span>
    </div>
  )
}

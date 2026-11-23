import { Check } from "lucide-react"
import { COMMITMENTS } from "@/lib/commitments"

// Franja de compromisos: debajo del hero de la home y en las páginas de solución.
export default function Commitments({ locale, className = "border-y border-sw-line bg-sw-bg-1" }: { locale: "es" | "en"; className?: string }) {
  return (
    <section className={className}>
      <ul className="mx-auto grid max-w-7xl gap-x-8 gap-y-4 px-5 py-6 sm:grid-cols-2 lg:grid-cols-4">
        {COMMITMENTS[locale].map((item) => (
          <li key={item.title} className="flex items-start gap-3 text-sm leading-snug text-sw-fg-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-sw-brand" aria-hidden="true" />
            <span>
              <strong className="font-semibold text-sw-fg-1">{item.title}</strong> {item.text}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

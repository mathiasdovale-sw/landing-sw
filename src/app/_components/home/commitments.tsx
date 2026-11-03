import { Check } from "lucide-react"
import { COMMITMENTS } from "@/lib/commitments"

// Franja de compromisos justo debajo del hero. Sustituye a la cinta animada.
export default function Commitments({ locale }: { locale: "es" | "en" }) {
  return (
    <section className="border-y border-sw-line bg-sw-bg-1">
      <ul className="mx-auto grid max-w-7xl gap-x-8 gap-y-4 px-5 py-6 sm:grid-cols-2 lg:grid-cols-4">
        {COMMITMENTS[locale].map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-snug text-sw-fg-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-sw-brand" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

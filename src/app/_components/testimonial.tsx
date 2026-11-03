import type { Testimonial as TestimonialData } from "@/lib/cases"

// Cita de un cliente. Si no hay testimonio, no se pinta nada.
// Por ahora no hay testimonios: no se muestran en ninguna página aunque haya datos.
export const SHOW_TESTIMONIALS = false

export default function Testimonial({ testimonial, className = "" }: { testimonial?: TestimonialData | null; className?: string }) {
  if (!SHOW_TESTIMONIALS || !testimonial || !testimonial.quote) return null
  return (
    <figure className={`border-l-2 border-sw-brand pl-4 ${className}`}>
      <blockquote className="leading-relaxed text-sw-fg-1">“{testimonial.quote}”</blockquote>
      <figcaption className="mt-2 font-mono-label text-sw-fg-3">
        {testimonial.name}
        {testimonial.role && <span className="text-sw-fg-4"> · {testimonial.role}</span>}
      </figcaption>
    </figure>
  )
}

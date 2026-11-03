import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { YEARS_EXPERIENCE } from "@/lib/commitments"

// Bloque "Quién soy" reutilizable: foto, nombre, texto corto y enlace a Sobre mí.

const COPY = {
  es: {
    eyebrow: "Quién soy",
    name: "Mathias Do Vale",
    role: "Ingeniero informático · Barcelona",
    intro: "Soy Mathias, ingeniero informático en Barcelona.",
    experience: YEARS_EXPERIENCE
      ? `Llevo ${YEARS_EXPERIENCE} años desarrollando software para fintech, clientes en Estados Unidos y el sector público.`
      : "",
    rest: "Desde 2024 construyo tiendas Shopify. Hablas conmigo y lo construyo yo.",
    link: "Conóceme",
    href: "/es/sobre-nosotros",
    alt: "Mathias Do Vale, fundador de SellifyWorks",
  },
  en: {
    eyebrow: "Who I am",
    name: "Mathias Do Vale",
    role: "Software engineer · Barcelona",
    intro: "I'm Mathias, a software engineer in Barcelona.",
    experience: YEARS_EXPERIENCE
      ? `I've spent ${YEARS_EXPERIENCE} years building software for fintech, clients in the United States and the public sector.`
      : "",
    rest: "Since 2024 I've been building Shopify stores. You talk to me, and I'm the one who builds it.",
    link: "Get to know me",
    href: "/en/about",
    alt: "Mathias Do Vale, founder of SellifyWorks",
  },
}

export default function AboutMe({ locale, className = "bg-sw-bg-0" }: { locale: "es" | "en"; className?: string }) {
  const c = COPY[locale]
  const text = [c.intro, c.experience, c.rest].filter(Boolean).join(" ")
  return (
    <section className={`py-16 sm:py-20 ${className}`}>
      <div className="mx-auto max-w-7xl px-5">
        {/* Móvil: foto arriba a ancho completo (máx. ~60 % del alto de pantalla). Escritorio: foto vertical a la izquierda, ~1/3. */}
        <div className="grid overflow-hidden rounded-sm border border-sw-line bg-sw-bg-2 md:grid-cols-[1fr_2fr]">
          <div className="relative aspect-[4/5] max-h-[60vh] w-full md:aspect-auto md:max-h-none md:min-h-[420px]">
            <Image
              src="/assets/img/mathias-vertical.jpg"
              alt={c.alt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover object-[50%_25%]"
            />
          </div>
          <div className="min-w-0 self-center p-6 sm:p-10 lg:p-14">
            <span className="font-mono-label text-sw-fg-3">{c.eyebrow}</span>
            <p className="mt-3 font-display text-2xl text-sw-fg-1 sm:text-3xl">{c.name}</p>
            <p className="mt-1 font-mono-label text-sw-brand">{c.role}</p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-sw-fg-2">{text}</p>
            <Link
              href={c.href}
              className="mt-6 inline-flex items-center gap-2 font-semibold text-sw-brand hover:text-sw-fg-1"
            >
              {c.link}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

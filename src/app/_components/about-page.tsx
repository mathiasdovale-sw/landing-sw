import fs from "node:fs"
import path from "node:path"
import Image from "next/image"
import Link from "next/link"
import { ImageIcon } from "lucide-react"
import OrganizationStructuredData from "./organization-structured-data"
import AutoBreadcrumbStructuredData from "./auto-breadcrumb-structured-data"
import VisualBreadcrumbs from "./visual-breadcrumbs"

// Página "Sobre nosotros" compartida por /es/sobre-nosotros y /en/about.
// El copy vive en src/dictionaries/{es,en}.json bajo la clave `about`.

// Foto vertical 4:5. Mientras el archivo no exista se muestra el marco vacío en
// lugar de una imagen rota.
const PHOTO_SRC = "/assets/img/mathias-vertical.jpg"

// Retrato circular del hero: la foto que ya usaba la página antes del rediseño.
const AVATAR_SRC = "/assets/img/mathias.jpeg"

function photoExists() {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", PHOTO_SRC))
  } catch {
    return false
  }
}

interface TimelineItem {
  year: string
  title: string
  description: string
  tags: string[]
  highlight?: boolean
}

export interface AboutContent {
  metadata: { title: string; description: string }
  hero: { titleLine1: string; titleLine2: string; subtitle: string }
  journey: {
    eyebrow: string
    photoAlt: string
    photoPlaceholder: string
    name: string
    role: string
    titleLine1: string
    titleLine2: string
    body: string
    card: { eyebrow: string; text: string }
  }
  timeline: { eyebrow: string; range: string; items: TimelineItem[] }
  cta: { title: string; subtitle: string; button: string }
}

export default function AboutPageContent({
  content,
  contactHref,
}: {
  content: AboutContent
  contactHref: string
}) {
  const c = content
  const hasPhoto = photoExists()

  return (
    <main>
      <AutoBreadcrumbStructuredData />
      <VisualBreadcrumbs maxWidth="max-w-7xl" />
      <OrganizationStructuredData description={c.metadata.description} />

      {/* Hero */}
      <section className="bg-sw-bg-0 py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
            <div>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl">
                <span className="block text-sw-fg-1">{c.hero.titleLine1}</span>
                <span className="block text-sw-secondary">{c.hero.titleLine2}</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-sw-fg-2 sm:text-xl">
                {c.hero.subtitle}
              </p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <Image
                src={AVATAR_SRC}
                alt={c.journey.photoAlt}
                width={640}
                height={640}
                priority
                className="h-56 w-56 rounded-full object-cover sm:h-72 sm:w-72 lg:h-80 lg:w-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mi recorrido */}
      <section className="bg-sw-bg-1 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <span className="font-mono-label text-sw-fg-3">{c.journey.eyebrow}</span>

          <div className="mt-12 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* Foto + identidad */}
            <div>
              <div className="aspect-[4/5] w-full overflow-hidden rounded-sm border border-sw-line bg-sw-bg-2">
                {hasPhoto ? (
                  <Image
                    src={PHOTO_SRC}
                    alt={c.journey.photoAlt}
                    width={640}
                    height={800}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-5 text-center">
                    <ImageIcon className="h-6 w-6 text-sw-fg-4" aria-hidden="true" />
                    <span className="font-mono-label text-sw-fg-4">
                      {c.journey.photoPlaceholder}
                    </span>
                  </div>
                )}
              </div>

              <p className="mt-6 text-lg font-semibold text-sw-fg-1">{c.journey.name}</p>
              <p className="mt-1 font-mono-label text-sw-secondary">{c.journey.role}</p>
            </div>

            {/* Texto + tarjeta */}
            <div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl">
                <span className="block text-sw-fg-1">{c.journey.titleLine1}</span>
                <span className="block text-sw-secondary">{c.journey.titleLine2}</span>
              </h2>

              <p className="mt-8 max-w-xl text-lg leading-relaxed text-sw-fg-2">
                {c.journey.body}
              </p>

              <div className="mt-10 rounded-sm bg-sw-secondary-strong p-7 sm:p-8">
                <span className="font-mono-label text-white/70">{c.journey.card.eyebrow}</span>
                <p className="mt-4 font-display text-2xl leading-tight text-white sm:text-3xl">
                  {c.journey.card.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Línea de tiempo */}
      <section className="bg-sw-bg-0 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex items-center gap-5">
            <span className="flex-shrink-0 font-mono-label text-sw-fg-3">
              {c.timeline.eyebrow}
            </span>
            <span aria-hidden="true" className="h-px flex-1 bg-sw-line" />
            <span className="flex-shrink-0 font-mono-label text-sw-brand">
              {c.timeline.range}
            </span>
          </div>

          <ol className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.timeline.items.map((item, index) => {
              const isHighlighted = Boolean(item.highlight)
              // "Después" / "Later" es más largo que un año: se baja un escalón
              // de tamaño para que no se desborde de la tarjeta.
              const yearSize =
                item.year.length > 4 ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl"

              return (
                <li
                  key={item.year + item.title}
                  className={`flex flex-col rounded-sm border p-6 ${
                    isHighlighted
                      ? "border-sw-secondary bg-sw-secondary-strong"
                      : "border-sw-line bg-sw-bg-2"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      aria-hidden="true"
                      className={`font-mono-label ${
                        isHighlighted ? "text-white/70" : "text-sw-fg-4"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-sw-brand"
                    />
                  </div>

                  <p
                    className={`mt-4 break-words font-display ${yearSize} ${
                      isHighlighted ? "text-white" : "text-sw-fg-1"
                    }`}
                  >
                    {item.year}
                  </p>

                  <h3
                    className={`mt-4 text-lg font-semibold leading-snug ${
                      isHighlighted ? "text-white" : "text-sw-fg-1"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`mt-2 text-sm leading-relaxed ${
                      isHighlighted ? "text-white/85" : "text-sw-fg-2"
                    }`}
                  >
                    {item.description}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2 pt-2">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className={`rounded-sm border px-2.5 py-1 font-mono-label ${
                          isHighlighted
                            ? "border-white/40 text-white"
                            : "border-sw-line-strong text-sw-secondary"
                        }`}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sw-bg-1 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="font-display text-3xl text-sw-fg-1 sm:text-4xl lg:text-5xl">
            {c.cta.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-sw-fg-2">{c.cta.subtitle}</p>
          <div className="mt-9">
            <Link
              href={contactHref}
              className="inline-block rounded-sm bg-sw-brand px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-sw-brand-hover"
            >
              {c.cta.button}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

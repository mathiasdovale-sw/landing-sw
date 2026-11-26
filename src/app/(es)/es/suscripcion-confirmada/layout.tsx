import type { Metadata } from "next"

// Página de confirmación del newsletter: no se indexa (la página es cliente y no puede exportar metadata).
export const metadata: Metadata = {
  title: "Suscripción confirmada | SellifyWorks",
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}

import type { Metadata } from "next"

// Newsletter confirmation page: not indexed (the page is a client component and cannot export metadata).
export const metadata: Metadata = {
  title: "Subscription confirmed | SellifyWorks",
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}

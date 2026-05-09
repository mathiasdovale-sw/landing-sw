import HeaderHome from "../_components/header-home"
import MarqueeSection from "../_components/marquee-section"
import ProblemSection from "../_components/problem-section"
import WhatWeDoSection from "../_components/what-we-do-section"
import HowItWorksSection from "../_components/how-it-works-section"
import ForWhoSection from "../_components/for-who-section"
import CtaBlock from "../_components/cta-block"
import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/seo-utils"

export const metadata: Metadata = generatePageMetadata(
  "home",
  "en",
  "SellifyWorks - Shopify Agency Barcelona | Online Store Development"
)

export default function HomePage() {
  return (
    <main>
      <HeaderHome />
      <MarqueeSection />
      <ProblemSection />
      <WhatWeDoSection />
      <HowItWorksSection />
      <ForWhoSection />
      <CtaBlock />
    </main>
  )
}

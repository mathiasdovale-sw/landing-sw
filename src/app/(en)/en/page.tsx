import Reveal from "@/app/_components/reveal";
import Marquee from "@/app/_components/marquee";
import FunnelLeakSection from "@/app/_components/funnel-leak-section";
import HowIWorkSection, { HOME_EN_COPY } from "@/app/_components/how-i-work-section";
import CaseStudySection from "@/app/_components/case-study-section";
import ContactSection from "@/app/_components/contact-section";
import Hero from "@/app/_components/home/hero";
import Problem from "@/app/_components/home/problem";
import HowIDoIt from "@/app/_components/home/how-i-do-it";
import type { Metadata } from 'next'
import { HomeFAQsEn } from "@/lib/faqs";
import FAQAccordion from "@/app/_components/faq-accordion";
import { generatePageMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generatePageMetadata(
  'home',
  'en',
  'More profit from the traffic you already pay for — SellifyWorks'
)

const MARQUEE_EN = ["Continuous improvement", "Shopify migration", "Revenue per visit", "No lock-in"]

// English home. Same structure as the Spanish one, without the calculator
// (Spanish only for now): the main CTA is the free meeting.
export default function HomePage() {
  return (
    <main>
      <Hero locale="en" />
      <Marquee items={MARQUEE_EN} />

      <Reveal><Problem locale="en" /></Reveal>
      <Reveal><FunnelLeakSection /></Reveal>
      <Reveal><HowIDoIt locale="en" contactHref="#contacto" /></Reveal>
      <Reveal>
        <HowIWorkSection locale="en" variant="compact" ctaHref="/en/continuous-improvement" copyOverride={HOME_EN_COPY} />
      </Reveal>
      <Reveal><CaseStudySection variant="brief" /></Reveal>
      <Marquee items={MARQUEE_EN} />
      <Reveal><ContactSection /></Reveal>
      <Reveal><FAQAccordion faqs={HomeFAQsEn} title="Frequently asked questions" className="bg-sw-bg-1" /></Reveal>
    </main>
  );
}

"use client"
import { useLanguage } from "@/contexts/LanguageContext"
import { SERVICES } from "@/lib/services-config"

export default function Marquee() {
  const { t } = useLanguage()
  const content = SERVICES.map((s) => t(`services.${s.key}.name`)).join(' ✦ ') + ' ✦ '

  return (
    <div className="overflow-hidden whitespace-nowrap border-y border-sw-line bg-sw-secondary py-3">
      <div className="flex w-max animate-marquee">
        <span className="font-display text-sm text-black sm:text-base">{content}</span>
        <span className="font-display text-sm text-black sm:text-base" aria-hidden="true">{content}</span>
      </div>
    </div>
  )
}

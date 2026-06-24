"use client"
import { useState } from "react"
import type React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { useLocalizedLinks } from "@/hooks/useLocalizedLinks"
import { SERVICES } from "@/lib/services-config"

import { ArrowRight } from "lucide-react"

export default function Footer() {
  const { t } = useLanguage()
  const { links } = useLocalizedLinks()
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [subscriptionMessage, setSubscriptionMessage] = useState("")

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubscribed(true)
        setEmail("")

        const alreadySubscribedES = 'Ya estás suscrito a nuestra newsletter'
        const alreadySubscribedEN = 'You are already subscribed to our newsletter'

        if (data.message === alreadySubscribedES || data.message === alreadySubscribedEN) {
          setSubscriptionMessage(t('footer.newsletter.already'))
        } else {
          setSubscriptionMessage(t('footer.newsletter.success'))
        }

        setTimeout(() => {
          setIsSubscribed(false)
          setSubscriptionMessage('')
        }, 6000)
      } else {
        if (response.status === 409) {
          setIsSubscribed(true)
          setSubscriptionMessage(t('footer.newsletter.already'))
          setEmail("")

          setTimeout(() => {
            setIsSubscribed(false)
            setSubscriptionMessage('')
          }, 4000)
        } else {
          setError(data.error || t('footer.newsletter.error'))
          setTimeout(() => setError(""), 4000)
        }
      }
    } catch (error) {
      setError(t('footer.newsletter.connection_error'))
      setTimeout(() => setError(""), 4000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-sw-bg-0 text-sw-fg-1">
      {/* Newsletter Section */}
      <div className="border-b border-sw-line">
        <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-3xl text-sw-fg-1 sm:text-4xl">
                {t('footer.newsletter.title')}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-sw-fg-3">
                {t('footer.newsletter.description')}
              </p>
            </div>

            <div>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletter.placeholder')}
                  required
                  disabled={isSubmitting}
                  className="flex-1 rounded-sm border border-sw-line-strong bg-sw-bg-2 px-6 py-4 text-sw-fg-1 outline-none transition-colors focus:border-sw-brand disabled:opacity-50"
                />
                <motion.button
                  type="submit"
                  disabled={isSubscribed || isSubmitting}
                  whileHover={!isSubscribed && !isSubmitting ? { scale: 1.03 } : {}}
                  whileTap={!isSubscribed && !isSubmitting ? { scale: 0.97 } : {}}
                  className="group flex items-center justify-center rounded-sm bg-sw-brand px-8 py-4 font-medium text-white transition-colors hover:bg-sw-brand-hover disabled:opacity-50"
                >
                  {isSubmitting ? t('footer.newsletter.sending') : isSubscribed ? (subscriptionMessage || t('footer.newsletter.subscribed')) : t('footer.newsletter.button')}
                  {!isSubscribed && !isSubmitting && (
                    <ArrowRight size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
                  )}
                </motion.button>
              </form>

              {isSubscribed && subscriptionMessage && (
                <p className="mt-4 text-sm text-sw-success">{subscriptionMessage}</p>
              )}

              {error && (
                <p className="mt-3 text-sm text-sw-danger">{error}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 py-12 md:py-16">
        <div className="grid items-start gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="font-display text-2xl text-sw-fg-1">
              {t('footer.company')}<span className="text-sw-brand">.</span>
            </div>
            <p className="mt-4 max-w-md leading-relaxed text-sw-fg-3">
              {t('footer.description')}
            </p>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="mb-4 font-mono-label text-sw-fg-3">{t('footer.services.title')}</h4>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SERVICES.map((service) => (
                <li key={service.key}>
                  <a
                    href={links[service.key as keyof typeof links]}
                    className="text-sm text-sw-fg-2 transition-colors hover:text-sw-brand"
                  >
                    {t(`footer.services.${service.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo */}
          <div className="flex justify-start md:justify-end">
            <Image
              src="/assets/img/logoSW.png"
              alt="SellifyWorks Logo"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-12 border-t border-sw-line pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="font-mono-label normal-case tracking-normal text-sw-fg-3">
              2026 {t('footer.company')}. {t('footer.rights')}
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              <a href={links.privacyPolicy} className="text-sw-fg-3 transition-colors hover:text-sw-fg-1">
                {t('footer.privacy')}
              </a>
              <a href={links.cookiePolicy} className="text-sw-fg-3 transition-colors hover:text-sw-fg-1">
                {t('footer.cookies')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

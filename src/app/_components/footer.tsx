"use client"
import { useState } from "react"
import type React from "react"
import Image from "next/image"

import { ArrowRight } from "lucide-react"

export default function Footer() {
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
        
        // Verificar el mensaje específico del backend
        if (data.message === 'Ya estás suscrito a nuestra newsletter') {
          setSubscriptionMessage('¡Ya estás suscrito!')
        } else {
          setSubscriptionMessage('¡Revisa tu email para confirmar!')
        }
        
        setTimeout(() => {
          setIsSubscribed(false)
          setSubscriptionMessage('')
        }, 6000)
      } else {
        // Manejar diferentes tipos de errores
        if (response.status === 409) {
          // Usuario ya existe - mostrar mensaje específico
          setIsSubscribed(true)
          setSubscriptionMessage('¡Ya suscrito!')
          setEmail("")
          
          setTimeout(() => {
            setIsSubscribed(false)
            setSubscriptionMessage('')
          }, 4000)
        } else {
          setError(data.error || 'Error al suscribirse')
          setTimeout(() => setError(""), 4000)
        }
      }
    } catch (error) {
      setError('Error de conexión. Inténtalo de nuevo.')
      setTimeout(() => setError(""), 4000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="text-white" style={{ backgroundColor: '#141417ff' }}>
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide mb-4"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                MANTENTE AL DÍA
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Recibe las últimas tendencias de e-commerce, tips de Shopify y noticias de nuestra agencia directamente
                en tu inbox.
              </p>
            </div>

            <div>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-4 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:border-transparent transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isSubscribed || isSubmitting}
                  className="bg-white text-black px-8 py-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center group disabled:opacity-50"
                >
                  {isSubmitting ? "Enviando..." : isSubscribed ? (subscriptionMessage || "¡Suscrito!") : "Suscribirse"}
                  {!isSubscribed && !isSubmitting && (
                    <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
              </form>
              
              {/* Success message */}
              {isSubscribed && subscriptionMessage && (
                <div className="overflow-hidden transition-all duration-500 ease-out max-h-20 opacity-100 mt-4">
                  <span className="text-green-400 text-sm md:text-base leading-relaxed group-hover/item:text-green-300 transition-colors">
                    {subscriptionMessage}
                  </span>
                </div>
              )}
              
              {/* Error message */}
              {error && (
                <p className="text-red-400 text-sm mt-3">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-start">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div
              className="text-2xl md:text-3xl font-bold tracking-wide mb-4"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              SELLIFYWORKS.
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Agencia ecommerce especializada en Shopify. Creamos, optimizamos y hacemos crecer tiendas
              online que convierten.
            </p>
          </div>
          
          {/* Logo */}
          <div className="flex justify-center md:justify-end">
            <Image
              src="/assets/img/logoSW.png"
              alt="SellifyWorks Logo"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
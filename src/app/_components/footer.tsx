"use client"
import { useState } from "react"
import type React from "react"

import { ArrowRight, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-black text-white">
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
                  className="flex-1 px-6 py-4 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:border-transparent transition-colors"
                />
                <button
                  type="submit"
                  disabled={isSubscribed}
                  className="bg-white text-black px-8 py-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center group disabled:opacity-50"
                >
                  {isSubscribed ? "¡Suscrito!" : "Suscribirse"}
                  {!isSubscribed && (
                    <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div
              className="text-2xl md:text-3xl font-bold tracking-wide mb-4"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              SELLIFYWORKS.
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Agencia especializada en Shopify con sede en Barcelona. Creamos, optimizamos y hacemos crecer tiendas
              online que convierten.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">Servicios</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Crear tiendas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Optimización
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Marketing digital
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Consultoría
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-lg mb-4">Empresa</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Casos de éxito
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          {/* <p>&copy; 2024 SellifyWorks. Todos los derechos reservados.</p> */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Política de privacidad
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Términos de servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
"use client"
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react"

export default function ContactSection() {
  return (
    <section className="bg-white text-black py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Content */}
          <div>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide mb-6"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              LET'S TALK
            </h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
              ¿Listo para llevar tu negocio al siguiente nivel? Hablemos sobre cómo podemos ayudarte a crear, optimizar
              y hacer crecer tu tienda Shopify.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">hello@sellifyworks.com</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-medium">Teléfono</p>
                  <p className="text-gray-600">+34 123 456 789</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-medium">Ubicación</p>
                  <p className="text-gray-600">Barcelona, España</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-gray-50 p-8 md:p-10 rounded-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
              CUÉNTANOS TU PROYECTO
            </h3>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                  placeholder="Nombre de tu empresa"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  Servicio de interés
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="crear">Crear - Nueva tienda Shopify</option>
                  <option value="optimizar">Optimizar - Mejorar tienda existente</option>
                  <option value="crecer">Crecer - Marketing y escalamiento</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors resize-none"
                  placeholder="Cuéntanos sobre tu proyecto..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center group"
              >
                Enviar mensaje
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
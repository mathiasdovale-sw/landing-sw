"use client"
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { useState, useRef, useEffect } from "react"

// Declarar grecaptcha globalmente
declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaLoad: () => void;
  }
}

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })
  const recaptchaRef = useRef<HTMLDivElement>(null)
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)
  const [recaptchaWidgetId, setRecaptchaWidgetId] = useState<number | null>(null)
  const [showLoadingMessage, setShowLoadingMessage] = useState(false)

  // Cargar reCAPTCHA cuando el componente se monta
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    if (!siteKey) return

    // Mostrar mensaje de carga después de un pequeño delay
    const loadingTimer = setTimeout(() => {
      if (!recaptchaLoaded) {
        setShowLoadingMessage(true)
      }
    }, 500)

    // Función que se ejecuta cuando reCAPTCHA se carga
    window.onRecaptchaLoad = () => {
      try {
        if (recaptchaRef.current && window.grecaptcha) {
          // Limpiar cualquier widget existente antes de crear uno nuevo
          if (recaptchaWidgetId !== null) {
            try {
              window.grecaptcha.reset(recaptchaWidgetId)
            } catch (e) {
              // Silencioso
            }
          }
          
          const widgetId = window.grecaptcha.render(recaptchaRef.current, {
            sitekey: siteKey,
            theme: 'light',
            size: 'normal'
          })
          setRecaptchaWidgetId(widgetId)
          setRecaptchaLoaded(true)
          setShowLoadingMessage(false) // Ocultar mensaje de carga
        }
      } catch (error) {
        // Silencioso - si falla, simplemente no tenemos reCAPTCHA
        setRecaptchaLoaded(false)
        setShowLoadingMessage(false)
      }
    }

    // Verificar si reCAPTCHA ya está disponible
    if (window.grecaptcha && window.grecaptcha.render) {
      clearTimeout(loadingTimer)
      window.onRecaptchaLoad()
      return
    }

    // Cargar el script de reCAPTCHA si no existe
    if (!document.querySelector('script[src*="recaptcha"]')) {
      const script = document.createElement('script')
      script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit'
      script.async = true
      script.defer = true
      script.onload = () => {
        // Pequeño delay para asegurar que grecaptcha esté disponible
        setTimeout(() => {
          if (window.grecaptcha && window.onRecaptchaLoad) {
            clearTimeout(loadingTimer)
            window.onRecaptchaLoad()
          }
        }, 100)
      }
      document.head.appendChild(script)
    } else if (window.grecaptcha) {
      // Si ya está cargado, ejecutar directamente
      clearTimeout(loadingTimer)
      window.onRecaptchaLoad()
    }

    return () => {
      // Cleanup
      clearTimeout(loadingTimer)
      if (recaptchaWidgetId !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(recaptchaWidgetId)
        } catch (e) {
          // Silencioso
        }
      }
      setRecaptchaLoaded(false)
      setRecaptchaWidgetId(null)
      setShowLoadingMessage(false)
    }
  }, []) // Solo ejecutar una vez al montar

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    const recaptchaEnabled = !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

    // Función helper para resetear reCAPTCHA - ultra robusta
    const resetRecaptcha = () => {
      try {
        // Verificar que tenemos todo lo necesario
        if (typeof window === 'undefined') return
        if (!window.grecaptcha) return
        if (typeof window.grecaptcha.reset !== 'function') return
        if (recaptchaWidgetId === null || recaptchaWidgetId === undefined) return
        
        // Intentar el reset
        window.grecaptcha.reset(recaptchaWidgetId)
      } catch (error) {
        // Completamente silencioso - cualquier error es ignorado
      }
    }

    // Obtener token de reCAPTCHA - ultra robusto
    const getRecaptchaToken = () => {
      try {
        // Verificaciones previas
        if (!recaptchaEnabled) return null
        if (typeof window === 'undefined') return null
        if (!window.grecaptcha) return null
        if (typeof window.grecaptcha.getResponse !== 'function') return null
        if (recaptchaWidgetId === null || recaptchaWidgetId === undefined) return null
        
        // Intentar obtener la respuesta
        const response = window.grecaptcha.getResponse(recaptchaWidgetId)
        return response || null
      } catch (error) {
        // Cualquier error devuelve null
        return null
      }
    }

    const recaptchaToken = getRecaptchaToken()
    
    // Solo validar reCAPTCHA si está completamente funcional (modo muy permisivo)
    if (recaptchaEnabled && recaptchaLoaded && recaptchaWidgetId !== null && !recaptchaToken) {
      setSubmitStatus({
        type: 'error',
        message: 'Por favor, completa la verificación reCAPTCHA.'
      })
      setIsSubmitting(false)
      return
    }

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      service: formData.get('service') as string,
      message: formData.get('message') as string,
      recaptchaToken: recaptchaToken || 'dev-mode',
    }

    // Solo logear en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('📤 Datos a enviar:', {
        ...data,
        recaptchaToken: data.recaptchaToken === 'dev-mode' ? 'dev-mode' : '***TOKEN***'
      })
    }

    try {
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      console.log('Response status:', response.status)
      
      // Solo mostrar detalles completos en desarrollo
      if (process.env.NODE_ENV === 'development') {
        console.log('Response headers:', Object.fromEntries(response.headers.entries()))
      }
      
      let result
      try {
        const responseText = await response.text()
        
        // Solo logear respuesta completa en desarrollo
        if (process.env.NODE_ENV === 'development') {
          console.log('Raw response:', responseText)
        }
        
        if (responseText) {
          result = JSON.parse(responseText)
          if (process.env.NODE_ENV === 'development') {
            console.log('Parsed response body:', result)
          }
        } else {
          throw new Error('Respuesta vacía del servidor')
        }
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError)
        setSubmitStatus({
          type: 'error',
          message: 'Error al procesar la respuesta del servidor.'
        })
        resetRecaptcha()
        return
      }

      if (response.ok && result.success) {
        setSubmitStatus({
          type: 'success',
          message: '¡Mensaje enviado correctamente! Te contactaremos pronto.'
        })
        // Limpiar el formulario y reCAPTCHA de forma segura
        try {
          e.currentTarget.reset()
        } catch (error) {
          // Silencioso - el reset del formulario a veces puede fallar
        }
        resetRecaptcha()
      } else {
        console.error('Error response:', result)
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Error al enviar el mensaje. Inténtalo de nuevo.'
        })
        resetRecaptcha()
      }
    } catch (error) {
      console.error('Error en handleSubmit:', error)
      
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
      console.error('Error details:', {
        name: error instanceof Error ? error.name : 'UnknownError',
        message: errorMessage,
        stack: error instanceof Error ? error.stack : undefined
      })
      
      setSubmitStatus({
        type: 'error',
        message: `Error de conexión: ${errorMessage}. Por favor, inténtalo de nuevo.`
      })
      resetRecaptcha()
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <section className="bg-white text-gray-700 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Content */}
          <div>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide mb-6"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
            Contactanos
            </h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
              ¿Listo para llevar tu negocio al siguiente nivel? Hablemos sobre cómo podemos ayudarte a crear, optimizar
              y hacer crecer tu tienda Shopify.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mr-4">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">mathias.dovale@sellifyworks.com</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mr-4">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-medium">Teléfono</p>
                  <p className="text-gray-600">+34 621 640 364</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mr-4">
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

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  <option value="crecer">Crecer - Growth Partner</option>
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

              {/* reCAPTCHA */}
              {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                <div className="flex justify-center">
                  <div ref={recaptchaRef} id="recaptcha-container"></div>
                  {showLoadingMessage && !recaptchaLoaded && (
                    <div className="text-gray-500 text-sm">Cargando reCAPTCHA...</div>
                  )}
                </div>
              )}

              {!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 text-sm">
                    <strong>Modo desarrollo:</strong> reCAPTCHA no configurado. 
                    Ver <code>CONTACT_SETUP.md</code> para configurar la protección anti-bot.
                  </p>
                  <p className="text-yellow-600 text-xs mt-1">
                    NEXT_PUBLIC_RECAPTCHA_SITE_KEY = {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || 'undefined'}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-4 rounded-lg font-medium transition-colors flex items-center justify-center group ${
                  isSubmitting 
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                {!isSubmitting && (
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                )}
              </button>

              {/* Mensaje de estado */}
              {submitStatus.type && (
                <div className={`p-4 rounded-lg ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
"use client"
import { useState, useEffect } from "react"
import { X, Mail } from "lucide-react"
import dynamic from "next/dynamic"

// Hook personalizado para manejar localStorage de forma segura
function useLocalStorage(key: string, initialValue: string | null = null) {
  const [storedValue, setStoredValue] = useState<string | null>(initialValue)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key)
        setStoredValue(item)
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
    }
    setIsLoaded(true)
  }, [key])

  const setValue = (value: string | null) => {
    try {
      setStoredValue(value)
      if (typeof window !== 'undefined') {
        if (value === null) {
          window.localStorage.removeItem(key)
        } else {
          window.localStorage.setItem(key, value)
        }
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue, isLoaded] as const
}

function NewsletterPopupContent() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  
  const [hasSeenPopup, setHasSeenPopup, isLocalStorageLoaded] = useLocalStorage("newsletterPopupSeen")

  // Función para testing - forzar mostrar popup
  const forceShowPopup = () => {
    setHasSeenPopup(null)
    setIsVisible(true)
  }

  // Agregar evento de teclado para testing (Ctrl+Shift+N)
  useEffect(() => {
    if (!isLocalStorageLoaded) return

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'N') {
        console.log('Force showing newsletter popup via keyboard shortcut')
        forceShowPopup()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isLocalStorageLoaded])

  useEffect(() => {
    // Solo ejecutar después de que localStorage esté cargado
    if (!isLocalStorageLoaded) return

    console.log('Newsletter popup check:', { hasSeenPopup }) // Debug log
    
    if (!hasSeenPopup) {
      console.log('Setting timer for newsletter popup') // Debug log
      const timer = setTimeout(() => {
        console.log('Showing newsletter popup') // Debug log
        setIsVisible(true)
      }, 3000) // 3 segundos para testing

      return () => {
        console.log('Clearing newsletter popup timer') // Debug log
        clearTimeout(timer)
      }
    } else {
      console.log('Newsletter popup already seen, not showing') // Debug log
    }
  }, [hasSeenPopup, isLocalStorageLoaded])

  const handleClose = () => {
    setIsVisible(false)
    setHasSeenPopup("true")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Validar email antes de enviar
      if (!email || email.trim() === '') {
        setError('Por favor ingresa un email válido')
        setIsSubmitting(false)
        return
      }

      const emailData = { email: email.trim() }
      console.log('Sending email data:', emailData) // Debug log

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      })

      let data
      try {
        data = await response.json()
      } catch (parseError) {
        console.error('Response parsing error:', parseError)
        setError('Error en la respuesta del servidor')
        return
      }

      if (response.ok) {
        setIsSuccess(true)
        setEmail("")
        
        // Verificar el mensaje específico del backend
        if (data.message === 'Ya estás suscrito a nuestra newsletter') {
          setSuccessMessage('¡Ya estás suscrito a nuestra newsletter!')
        } else {
          setSuccessMessage('¡Revisa tu email para confirmar tu suscripción!')
        }
        
        // Cerrar popup después de mostrar éxito
        setTimeout(() => {
          handleClose()
        }, 4000)
      } else {
        // Manejar diferentes tipos de errores
        if (response.status === 409) {
          // Usuario ya existe - mostrar mensaje específico
          setIsSuccess(true)
          setSuccessMessage('¡Ya estás suscrito a nuestra newsletter!')
          setEmail("")
          
          setTimeout(() => {
            handleClose()
          }, 3000)
        } else {
          setError(data.error || 'Error al suscribirse')
        }
      }
    } catch (error) {
      console.error('Newsletter submission error:', error)
      setError('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // No renderizar nada hasta que localStorage esté cargado
  if (!isLocalStorageLoaded || !isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto relative animate-in fade-in zoom-in duration-300">
        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          data-testid="close-button"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          {!isSuccess ? (
            <>
              {/* Icono */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-black to-cyan-500 rounded-full flex items-center justify-center">
                  <Mail size={28} className="text-white" />
                </div>
              </div>

              {/* Título */}
              <h2 
                className="text-2xl md:text-3xl font-bold text-center text-black mb-3"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                ¡NO TE PIERDAS NUESTROS CONSEJOS!
              </h2>

              {/* Descripción */}
              <p className="text-gray-600 text-center mb-6 leading-relaxed">
                Suscríbete a nuestra newsletter y recibe tips exclusivos sobre Shopify, 
                estrategias de conversión y las últimas tendencias del e-commerce.
              </p>

              {/* Formulario */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-black to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Suscribiendo..." : "Suscribirme Gratis"}
                </button>
              </form>

              {/* Error message */}
              {error && (
                <p className="text-red-500 text-sm text-center mt-3">
                  {error}
                </p>
              )}

              {/* Nota */}
              <p className="text-xs text-gray-500 text-center mt-4">
                No spam. Puedes darte de baja en cualquier momento.
              </p>
            </>
          ) : (
            /* Estado de éxito */
            <div className="text-center" data-testid="success-state">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 
                className="text-2xl font-bold text-black mb-2"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
                data-testid="success-title"
              >
                {successMessage || '¡BIENVENIDO A BORDO!'}
              </h2>
              <div className="overflow-hidden transition-all duration-500 ease-out max-h-20 opacity-100">
                <span className="text-gray-700 text-sm md:text-base leading-relaxed group-hover/item:text-black transition-colors" data-testid="success-message">
                  {successMessage === '¡Ya estás suscrito a nuestra newsletter!' 
                    ? 'No te preocupes, ya recibes nuestros consejos exclusivos.'
                    : successMessage === '¡Ya estás suscrito!'
                    ? 'Gracias por ser parte de nuestra comunidad.'
                    : 'Te has suscrito exitosamente. Revisa tu email para confirmar.'
                  }
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Exportar el componente con dynamic import para evitar problemas de SSR
const NewsletterPopup = dynamic(() => Promise.resolve(NewsletterPopupContent), {
  ssr: false
})

export default NewsletterPopup

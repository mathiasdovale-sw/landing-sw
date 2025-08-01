'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'

function NewsletterConfirmedContent() {
  const searchParams = useSearchParams()
  const status = searchParams.get('status')

  const getMessage = () => {
    switch (status) {
      case 'success':
        return {
          title: '¡Suscripción Confirmada!',
          message: 'Gracias por confirmar tu suscripción a nuestra newsletter. Ahora recibirás nuestros tips exclusivos sobre Shopify y comercio electrónico.',
          type: 'success'
        }
      case 'already-subscribed':
        return {
          title: '¡Ya estás suscrito!',
          message: 'Tu email ya está suscrito a nuestra newsletter. No es necesario confirmar nuevamente.',
          type: 'info'
        }
      default:
        return {
          title: 'Error de Confirmación',
          message: 'Hubo un problema al confirmar tu suscripción. El enlace puede haber expirado o ser inválido.',
          type: 'error'
        }
    }
  }

  const { title, message, type } = getMessage()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
          type === 'success' ? 'bg-green-100' : 
          type === 'info' ? 'bg-blue-100' : 
          'bg-red-100'
        }`}>
          {type === 'success' && (
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {type === 'info' && (
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {type === 'error' && (
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        
        <p className="text-gray-600 mb-8">
          {message}
        </p>
        
        <Link 
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  )
}

export default function NewsletterConfirmed() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    }>
      <NewsletterConfirmedContent />
    </Suspense>
  )
}

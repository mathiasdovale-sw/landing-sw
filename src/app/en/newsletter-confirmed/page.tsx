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
          title: 'Subscription confirmed!',
          message: 'Thank you for subscribing to our newsletter. You will receive valuable content about Shopify and ecommerce.',
          type: 'success'
        }
      case 'already-subscribed':
        return {
          title: 'Already subscribed',
          message: 'Your email is already registered in our newsletter.',
          type: 'info'
        }
      default:
        return {
          title: 'Subscription error',
          message: 'There was a problem processing your subscription. Please try again.',
          type: 'error'
        }
    }
  }

  const { title, message, type } = getMessage()

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500'
      case 'info':
        return 'bg-blue-500'
      case 'error':
        return 'bg-red-500'
      default:
        return 'bg-orange-500'
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="bg-gray-800 rounded-2xl p-8 md:p-12">
          <div className={`w-16 h-16 ${getBgColor()} rounded-full flex items-center justify-center mx-auto mb-6`}>
            {type === 'success' && (
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {type === 'info' && (
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {type === 'error' && (
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          
          <h1
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            {title}
          </h1>
          
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            {message}
          </p>
          
          <Link
            href="/en"
            className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}

export default function NewsletterConfirmedPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="text-white">Loading...</div>
      </main>
    }>
      <NewsletterConfirmedContent />
    </Suspense>
  )
}
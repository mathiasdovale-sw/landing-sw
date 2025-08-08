"use client"
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Home, ArrowLeft, Coffee } from 'lucide-react'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="max-w-4xl mx-auto text-center">
        
        {/* 404 Giant Number */}
        <div className="relative mb-8">
          <h1 
            className="text-9xl md:text-[12rem] lg:text-[15rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 select-none animate-gradient"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            404
          </h1>
          
          {/* Floating Elements */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="animate-float delay-100">
              <Coffee size={40} className="text-orange-400 opacity-70" />
            </div>
          </div>
          
          <div className="absolute top-1/4 left-1/4 animate-pulse delay-300">
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-float"></div>
          </div>
          
          <div className="absolute top-1/3 right-1/4 animate-bounce delay-500">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
          </div>
          
          <div className="absolute bottom-1/4 left-1/3 animate-rotate-slow">
            <div className="w-4 h-4 bg-orange-300 rounded-full"></div>
          </div>
          
          <div className="absolute top-1/2 right-1/3 animate-float delay-1000">
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-4">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            {t('404.title')}
          </h2>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t('404.description')}
          </p>
          
          <p className="text-gray-400 text-base md:text-lg">
            {t('404.suggestion')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors group"
          >
            <Home size={20} className="mr-2" />
            {t('404.buttons.home')}
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors border border-gray-700 group"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            {t('404.buttons.back')}
          </button>
          
          <Link 
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-transparent text-orange-400 font-medium rounded-lg hover:bg-orange-500/10 transition-colors border border-orange-500"
          >
            {t('404.buttons.contact')}
          </Link>
        </div>
      </div>
    </div>
  )
}

"use client"
import { useLanguage } from '@/contexts/LanguageContext'

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center space-x-1 bg-white rounded-lg p-1">
      <button
        onClick={() => setLanguage('es')}
        className={`w-8 h-6 rounded-md overflow-hidden transition-all duration-200 hover:scale-110 flex items-center justify-center text-lg ${
          language === 'es' ? 'ring-2 ring-orange-500 shadow-lg' : 'opacity-70 hover:opacity-100'
        }`}
        aria-label="Español"
        title="Español"
      >
        🇪🇸
      </button>
      
      <button
        onClick={() => setLanguage('en')}
        className={`w-8 h-6 rounded-md overflow-hidden transition-all duration-200 hover:scale-110 flex items-center justify-center text-lg ${
          language === 'en' ? 'ring-2 ring-orange-500 shadow-lg' : 'opacity-70 hover:opacity-100'
        }`}
        aria-label="English"
        title="English"
      >
        🇬🇧
      </button>
    </div>
  )
}

export default LanguageSelector

"use client"
import { useEffect, useState } from 'react'

export function useFontLoaded(fontFamily: string, timeout: number = 3000) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Verificar si la fuente ya está disponible
    if (document.fonts && document.fonts.check) {
      // Usar la Font Loading API si está disponible
      const checkFont = () => {
        try {
          if (document.fonts.check(`16px "${fontFamily}"`)) {
            setIsLoaded(true)
            return true
          }
          return false
        } catch (e) {
          return false
        }
      }

      // Verificar inmediatamente
      if (checkFont()) {
        return
      }

      // Escuchar el evento de carga de fuentes
      const handleFontLoad = () => {
        if (checkFont()) {
          setIsLoaded(true)
        }
      }

      document.fonts.addEventListener('loadingdone', handleFontLoad)
      
      // Timeout de respaldo
      const timeoutId = setTimeout(() => {
        setIsLoaded(true)
      }, timeout)

      return () => {
        document.fonts.removeEventListener('loadingdone', handleFontLoad)
        clearTimeout(timeoutId)
      }
    } else {
      // Fallback para navegadores que no soportan Font Loading API
      const timeoutId = setTimeout(() => {
        setIsLoaded(true)
      }, timeout)

      return () => clearTimeout(timeoutId)
    }
  }, [fontFamily, timeout])

  return isLoaded
}

export function FontLoader({ children }: { children: React.ReactNode }) {
  const bebasNeueLoaded = useFontLoaded('Bebas Neue')
  
  useEffect(() => {
    if (bebasNeueLoaded && typeof window !== 'undefined') {
      document.documentElement.classList.add('fonts-loaded')
    }
  }, [bebasNeueLoaded])

  return <>{children}</>
}

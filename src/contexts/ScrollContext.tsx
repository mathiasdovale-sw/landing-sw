'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface ScrollContextType {
  preserveScrollAndNavigate: (path: string) => void;
}

const ScrollContext = createContext<ScrollContextType | null>(null);

export const useScrollPreservation = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollPreservation must be used within ScrollProvider');
  }
  return context;
};

interface ScrollProviderProps {
  children: ReactNode;
}

export const ScrollProvider = ({ children }: ScrollProviderProps) => {
  const router = useRouter();
  const pathname = usePathname();

  // Efecto para interceptar y deshabilitar el scroll automático de Next.js
  useEffect(() => {
    // Override del comportamiento de scroll del navegador
    const preventAutoScroll = () => {
      const savedPosition = sessionStorage.getItem('language-change-scroll-position');
      if (savedPosition) {
        // Prevenir el scroll automático del navegador
        if ('scrollRestoration' in history) {
          history.scrollRestoration = 'manual';
        }
      }
    };

    preventAutoScroll();

    return () => {
      // Restaurar el comportamiento normal al limpiar
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
      }
    };
  }, []);

  useEffect(() => {
    const restoreScroll = () => {
      const savedPosition = sessionStorage.getItem('language-change-scroll-position');
      if (savedPosition) {
        const position = parseInt(savedPosition, 10);
        console.log('ScrollProvider: Restaurando scroll a', position);
        
        // Deshabilitar el scroll automático del navegador temporalmente
        const originalScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';
        
        // Forzar el scroll inmediatamente
        window.scrollTo(0, position);
        
        // Múltiples intentos para asegurar que funcione
        const timeouts = [0, 1, 10, 16, 50, 100, 150, 200];
        timeouts.forEach((delay) => {
          setTimeout(() => {
            window.scrollTo(0, position);
          }, delay);
        });
        
        // Restaurar el comportamiento de scroll original
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = originalScrollBehavior;
          sessionStorage.removeItem('language-change-scroll-position');
        }, 250);
      }
    };

    // Restaurar inmediatamente al cambiar pathname
    restoreScroll();

    // También al cargar completamente
    const handleLoad = () => restoreScroll();
    
    // Evento para cuando termine la navegación de Next.js
    const handleRouteChange = () => {
      setTimeout(restoreScroll, 0);
    };

    window.addEventListener('load', handleLoad);
    
    // Escuchar cambios en el historial
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [pathname]);

  const preserveScrollAndNavigate = (path: string) => {
    const currentPosition = window.scrollY;
    console.log('ScrollProvider: Guardando posición', currentPosition);
    sessionStorage.setItem('language-change-scroll-position', currentPosition.toString());
    
    // Usar replace para evitar entrada en historial
    router.replace(path);
  };

  return (
    <ScrollContext.Provider value={{ preserveScrollAndNavigate }}>
      {children}
    </ScrollContext.Provider>
  );
};
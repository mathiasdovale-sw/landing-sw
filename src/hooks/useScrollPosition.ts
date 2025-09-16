'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function useScrollPosition() {
  const router = useRouter();
  const pathname = usePathname();

  const saveScrollPosition = (expandedServiceId?: string) => {
    const scrollPosition = window.scrollY;
    sessionStorage.setItem('homeScrollPosition', scrollPosition.toString());
    sessionStorage.setItem('homeScrollPath', window.location.pathname);
    
    // Save the expanded service ID if provided
    if (expandedServiceId) {
      sessionStorage.setItem('homeExpandedService', expandedServiceId);
    }
  };

  const restoreScrollPosition = () => {
    // Only restore if we're on a home page and coming from a service page
    const isHomePage = pathname === '/' || pathname === '/es' || pathname === '/en';
    if (!isHomePage) return null;

    const savedPosition = sessionStorage.getItem('homeScrollPosition');
    const savedPath = sessionStorage.getItem('homeScrollPath');
    const savedExpandedService = sessionStorage.getItem('homeExpandedService');
    
    if (savedPosition && savedPath) {
      // Check if we're returning to the same home page we left from
      const currentPath = window.location.pathname;
      if (savedPath === currentPath || 
          (savedPath === '/' && currentPath === '/') ||
          (savedPath === '/es' && currentPath === '/es') ||
          (savedPath === '/en' && currentPath === '/en')) {
        
        // Return both scroll position and expanded service
        return {
          scrollPosition: parseInt(savedPosition, 10),
          expandedService: savedExpandedService
        };
      }
    }
    
    return null;
  };

  const clearSavedState = () => {
    sessionStorage.removeItem('homeScrollPosition');
    sessionStorage.removeItem('homeScrollPath');
    sessionStorage.removeItem('homeExpandedService');
  };

  const navigateWithScrollSave = (url: string, expandedServiceId?: string) => {
    saveScrollPosition(expandedServiceId);
    router.push(url);
  };

  useEffect(() => {
    // Restore scroll position when component mounts (page loads)
    restoreScrollPosition();

    // Handle browser navigation (back/forward buttons)
    const handleBeforeUnload = () => {
      // Don't save position when navigating away from home pages
      const isHomePage = pathname === '/' || pathname === '/es' || pathname === '/en';
      if (!isHomePage) {
        clearSavedState();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname]);

  return {
    saveScrollPosition,
    restoreScrollPosition,
    navigateWithScrollSave,
    clearSavedState,
  };
}
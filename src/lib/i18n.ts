export const defaultLocale = 'es' as const
export const locales = ['es', 'en'] as const

export type Locale = (typeof locales)[number]

export const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
}

// Mapeo de rutas específicas (opcional para futuro)
export const pathnames = {
  '/about': {
    es: '/about',
    en: '/about',
  },
} as const
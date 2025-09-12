import type { Locale } from './i18n'

const dictionaries = {
  es: () => import('../dictionaries/es.json').then((module) => module.default),
  en: () => import('../dictionaries/en.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]?.() ?? dictionaries.es()
}
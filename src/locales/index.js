import fr from 'locales/fr'
import en from 'locales/en'

const locales = { fr, en }

export default (LANG = 'fr') => key => {
  if (!key) return
  if (Array.isArray(key)) key = key[0]

  return locales.hasOwnProperty(LANG)
    ? locales[LANG][key] || key
    : key
}

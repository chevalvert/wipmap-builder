const locales = { fr: {}, en: {} }

locales.fr['loading'] = 'chargement'
locales.fr['loading.config'] = 'récupération de la configuration'
locales.fr['loading.connection'] = 'en attente de connection'
locales.fr['loading.fetching-agent'] = 'récupération de l\'explorateur'
locales.fr['loading.fetching-plotter'] = 'récupération du plotter'
locales.fr['loading.generating'] = 'génération de la nouvelle carte'
locales.fr['loading.map'] = 'génération de la carte'
locales.fr['loading.sprites'] = 'pré-chargement des images'
locales.fr['loading.waiting-for-server'] = 'en attente de connection'
locales.fr['loading.waiting-for-plotter'] = 'en attente du plotter'

locales.fr['error'] = 'erreur'
locales.fr['error.noslot'] = 'plus de place disponible'

locales.fr['generation'] = 'génération'
locales.fr['rendering'] = 'rendu'
locales.fr['textures'] = 'textures'
locales.fr['export'] = 'export'
locales.fr['vorowidth'] = 'largeur de la grille'
locales.fr['voroheight'] = 'hauteur de la grille'
locales.fr['jitter'] = ''

locales.fr['sprites.undefined'] = 'Glissez-déposez vos fichiers'

export default (LANG = 'fr') => key => {
  if (!key) return
  if (Array.isArray(key)) key = key[0]

  if (!locales.hasOwnProperty(LANG)) return key

  const locale = locales[LANG][key.toLowerCase()]
  return locale !== undefined
    ? Array.isArray(locale)
      ? locale[Math.floor(Math.random() * locale.length)]
      : locale
    : key
}

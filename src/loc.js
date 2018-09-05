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

locales.fr['ui.draw'] = 'dessiner'
locales.fr['ui.generate'] = 'dessiner'
locales.fr['ui.progress'] = 'objets'
locales.fr['ui.random'] = 'aléatoire'
locales.fr['ui.undo'] = '←'
locales.fr['ui.validate'] = 'valider'

locales.fr['ui.landmark-generator.context'] = 'biome = '
locales.fr['ui.landmark-generator.modifier-density'] = 'objet.densité = '
locales.fr['ui.landmark-generator.modifier-length'] = 'objet.nombre  = '
locales.fr['ui.landmark-generator.modifier-order'] = 'objet.chaos   = '
locales.fr['ui.landmark-generator.type'] = 'objet = '
locales.fr['ui.landmark-generator.variable'] = '  objet.'

locales.fr['gameover'] = 'game over'
locales.fr['gameover.message'] = 'nouvelle carte dans %s...'
locales.fr['gameover.message.remote'] = 'en attente d\'une nouvelle carte'

locales.fr['biome.desert'] = 'le désert'
locales.fr['biome.forest'] = 'la forêt'
locales.fr['biome.jungle'] = 'la jungle'
locales.fr['biome.plains'] = 'une plaine'
locales.fr['biome.swamp'] = 'un marais'
locales.fr['biome.taiga'] = 'la taïga'
locales.fr['biome.tundra'] = 'la tundra'
locales.fr['biome.water'] = ['la mer', 'un lac', 'un étang']

export default (key, LANG = 'fr') => {
  if (!key) return
  if (Array.isArray(key)) key = key[0]

  const locale = locales[LANG][key.toLowerCase()]
  return locale !== undefined
    ? Array.isArray(locale)
      ? locale[Math.floor(Math.random() * locale.length)]
      : locale
    : key
}

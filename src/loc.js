const locales = { fr: {}, en: {} }

locales.fr['loading'] = 'chargement'
locales.fr['loading.map'] = 'génération de la carte'

locales.fr['error'] = 'erreur'

locales.fr['gui.panel.generation'] = `génération`
locales.fr['gui.panel.generation.seed'] = `seed`
locales.fr['gui.panel.generation.x'] = `x`
locales.fr['gui.panel.generation.y'] = `y`
locales.fr['gui.panel.generation.voronoiWidth'] = `largeur de la grille`
locales.fr['gui.panel.generation.voronoiHeight'] = `hauteur de la grille`
locales.fr['gui.panel.generation.jitter'] = `déformation de la grille`
locales.fr['gui.panel.generation.distortion'] = `déformation des cellules`
locales.fr['gui.panel.generation.gradient'] = `dégradé des frontières`
locales.fr['gui.panel.generation.poissonDensity'] = `densité de points`
locales.fr['gui.panel.generation.water'] = `niveau de l'eau`

locales.fr['gui.panel.rendering'] = `rendu`
locales.fr['gui.panel.rendering.width'] = `largeur du canvas`
locales.fr['gui.panel.rendering.height'] = `hauteur du canvas`
locales.fr['gui.panel.rendering.smooth'] = `antialiasing`
locales.fr['gui.panel.rendering.renderBiomesTexture'] = `afficher les textures`
locales.fr['gui.panel.rendering.renderPoisson'] = `afficher les points`
locales.fr['gui.panel.rendering.renderVoronoiCells'] = `afficher la grille`
locales.fr['gui.panel.rendering.renderVoronoiSites'] = `affiche le centre des cellules`
locales.fr['gui.panel.rendering.scale'] = `échelle des sprites`
locales.fr['gui.panel.rendering.voronoiColor'] = `couleur de la grille`
locales.fr['gui.panel.rendering.backgroundColor'] = `couleur de l'arrière-plan`
locales.fr['gui.panel.rendering.backgroundAlpha'] = `transparence de l'arrière-plan`

locales.fr['gui.panel.legend'] = `légende`
locales.fr['gui.panel.legend.DESERT'] = `désert [DESERT]`
locales.fr['gui.panel.legend.FOREST'] = `forêt [FOREST]`
locales.fr['gui.panel.legend.MOUNTAINS'] = `montagnes [MOUNTAINS]`
locales.fr['gui.panel.legend.PLAINS'] = `plaines [PLAINS]`
locales.fr['gui.panel.legend.SWAMP'] = `marais [SWAMP]`
locales.fr['gui.panel.legend.WATER'] = `eau [WATER]`

locales.fr['gui.panel.textures'] = `textures`
locales.fr['gui.panel.textures.texturesDescriber'] = ` `
locales.fr['gui.panel.textures.spritesList'] = `liste des sprites`
locales.fr['gui.panel.textures.spritesList.empty'] = `Glissez-déposez une ou plusieurs images pour commencer`

locales.fr['gui.panel.export'] = `export`
locales.fr['gui.panel.export.png'] = `exporter l'image`
locales.fr['gui.panel.export.json'] = `exporter la configuration`
locales.fr['gui.panel.export.loadJSON'] = `importer une configuration`
locales.fr['gui.panel.export.loadJSON.browse'] = `parcourir les fichiers...`

locales.fr['gui.panel.view'] = `échelle`
locales.fr['gui.panel.view.canvasScale'] = `échelle du canvas`

export default (LANG = 'fr') => key => {
  if (!key) return
  if (Array.isArray(key)) key = key[0]

  return locales.hasOwnProperty(LANG)
    ? locales[LANG][key] || key
    : key
}

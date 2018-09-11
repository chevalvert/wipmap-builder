import localize from 'loc'

import fps from 'fps-indicator'
import FileSaver from 'file-saver'
import Color from 'color'

import Renderer from 'wipmap-renderer'
import generate from 'wipmap-generate'

import canvas from 'controllers/canvas'
import GUI from 'controllers/gui'
import uploader from 'controllers/images-uploader'
import sprites from 'controllers/sprites-manager'
import textures from 'controllers/textures-manager'
import hotkeys from 'hotkeys-js'

import error from 'utils/error'
import loading from 'utils/loading-wrapper'
import filename from 'utils/filename'

import flatten from 'utils/array-flatten'
import unique from 'utils/array-unique'

if (!window.isProduction) fps()
const L = localize(window.lang)

let map

const settings = {
  x: 0,
  y: 0,
  generation: {
    seed: 'wipmap',
    width: 3,
    height: 3,
    decimals: 3,

    jitter: 0.4,
    distortion: 0.9,
    gradient: 0.8,

    poissonDensity: 0.4,

    probablities: {
      water: 0,
      forest: 0
    },

    biomesMap: [
      ['SWAMP', 'FOREST', 'SWAMP'],
      ['MOUNTAINS', 'PLAINS', 'FOREST'],
      ['MOUNTAINS', 'DESERT', 'DESERT']
    ]
  },
  rendering: {
    smooth: true,
    forceUpdate: true,
    debugPerf: !window.isProduction,
    drawBoundingBox: false,

    renderBiomesTexture: true,
    renderLandmarks: true,

    renderPoisson: false,
    renderVoronoiCells: false,
    renderVoronoiSites: false,
    scale: 1,
    colors: {
      background: '#ffffff',
      voronoi: '#AAAAAA',
      'SWAMP': '#cc65bb',
      'FOREST': '#1dca63',
      'MOUNTAINS': '#a1b575',
      'PLAINS': '#abf1ac',
      'DESERT': '#fffc92',
      'WATER': '#85e3ff'
    }
  }
}

const gui = GUI({
  'gui.panel.generation': [
    ['gui.panel.generation.seed', 'addText', [settings.generation.seed], updateSettings(settings.generation, 'seed')],
    ['gui.panel.generation.x', 'addNumber', [0, 100, settings.x, 1], updateSettings(settings, 'x')],
    ['gui.panel.generation.y', 'addNumber', [0, 100, settings.y, 1], updateSettings(settings, 'y')],
    ['gui.panel.generation.voronoiWidth', 'addRange', [2, 20, settings.generation.width, 1], updateSettings(settings.generation, 'width')],
    ['gui.panel.generation.voronoiHeight', 'addRange', [2, 20, settings.generation.height, 1], updateSettings(settings.generation, 'height')],
    ['gui.panel.generation.jitter', 'addRange', [0, 1, settings.generation.jitter, 0.01], updateSettings(settings.generation, 'jitter')],
    ['gui.panel.generation.distortion', 'addRange', [0, 1, settings.generation.distortion, 0.01], updateSettings(settings.generation, 'distortion')],
    ['gui.panel.generation.gradient', 'addRange', [0, 1, settings.generation.gradient, 0.01], updateSettings(settings.generation, 'gradient')],
    ['gui.panel.generation.poissonDensity', 'addRange', [0, 10, settings.generation.poissonDensity, 0.01], updateSettings(settings.generation, 'poissonDensity')],
    ['gui.panel.generation.water', 'addRange', [0, 1, settings.generation.probablities.water, 0.01], updateSettings(settings.generation.probablities, 'water')]
  ],
  'gui.panel.rendering': [
    ['gui.panel.rendering.width', 'addNumber', [0, Number.POSITIVE_INFINITY, canvas.width, 1], v => canvas.resize({ width: v })],
    ['gui.panel.rendering.height', 'addNumber', [0, Number.POSITIVE_INFINITY, canvas.height, 1], v => canvas.resize({ height: v })],
    ['gui.panel.rendering.smooth', 'addBoolean', [settings.rendering.smooth], updateSettings(settings.rendering, 'smooth', false), 0],
    ['gui.panel.rendering.renderBiomesTexture', 'addBoolean', [settings.rendering.renderBiomesTexture], updateSettings(settings.rendering, 'renderBiomesTexture', false), -1],
    ['gui.panel.rendering.renderPoisson', 'addBoolean', [settings.rendering.renderPoisson], updateSettings(settings.rendering, 'renderPoisson', false), -1],
    ['gui.panel.rendering.renderVoronoiCells', 'addBoolean', [settings.rendering.renderVoronoiCells], updateSettings(settings.rendering, 'renderVoronoiCells', false), -1],
    ['gui.panel.rendering.renderVoronoiSites', 'addBoolean', [settings.rendering.renderVoronoiSites], updateSettings(settings.rendering, 'renderVoronoiSites', false), -1],
    ['gui.panel.rendering.scale', 'addNumber', [0, Number.POSITIVE_INFINITY, settings.rendering.scale, 0.01], updateSettings(settings.rendering, 'scale', false)],
    ['gui.panel.rendering.voronoiColor', 'addColor', [settings.rendering.colors.voronoi], updateSettings(settings.rendering.colors, 'voronoi', false), -1],
    ['gui.panel.rendering.backgroundColor', 'addColor', [settings.rendering.colors.background], updateSettings(settings.rendering.colors, 'background', false), -1],
    ['gui.panel.rendering.backgroundAlpha', 'addRange', [0, 255, 255, 1], a => updateSettings(settings.rendering.colors, 'background', false)(Color(settings.rendering.colors.background).alpha(a / 255).string()), -1]
  ],
  'gui.panel.legend': [
    ...[...unique(flatten(settings.generation.biomesMap)), 'WATER'].map(biome => {
      return ['gui.panel.legend.' + biome, 'addColor', [settings.rendering.colors[biome]], updateSettings(settings.rendering.colors, biome, false)]
    })
  ],
  'gui.panel.textures': [
    ['gui.panel.textures.texturesDescriber', 'addJSON', L`gui.panel.textures.texturesDescriber.placeholder`, textures.fromJSON, 1000],
    ['gui.panel.textures.spritesList', 'addHTML', `<ol><li>${L`gui.panel.textures.spritesList.empty`}</li></ol>`]
  ],
  'gui.panel.export': [
    ['gui.panel.export.png', 'addButton', [], () => map.renderer.toBlob(blob => FileSaver.saveAs(blob, filename('wipmap')))],
    ['gui.panel.export.json', 'addButton', [], () => FileSaver.saveAs(gui.toBlob(), filename('wipmap'))],
    ['gui.panel.export.loadJSON', 'addFileChooser', [L`gui.panel.export.loadJSON.browse`, 'application/json'], file => {
      gui.disable()
      gui.fromFile(file, () => {
        gui.enable()
        updateMap()
      })
    }]
  ],
  'gui.panel.view': [
    ['gui.panel.view.canvasScale', 'addRange', [0, 1, 1, 0.01], canvas.scale, -1]
  ]
}, {
  container: document.body,
  localize: localize(window.lang)
})

hotkeys('h', gui.toggle)
hotkeys('w', () => gui.setValue('gui.panel.rendering', 'gui.panel.rendering.renderVoronoiCells', !settings.rendering.renderVoronoiCells))

hotkeys('left', () => gui.setValue('gui.panel.generation', 'x', Math.max(0, settings.x - 1)))
hotkeys('up', () => gui.setValue('gui.panel.generation', 'y', Math.max(0, settings.y - 1)))
hotkeys('right', () => gui.setValue('gui.panel.generation', 'x', settings.x + 1))
hotkeys('down', () => gui.setValue('gui.panel.generation', 'y', settings.y + 1))

hotkeys('shift+left', () => gui.setValue('gui.panel.generation', 'x', Math.max(0, settings.x - Math.floor(settings.generation.width / 2))))
hotkeys('shift+up', () => gui.setValue('gui.panel.generation', 'y', Math.max(0, settings.y - Math.floor(settings.generation.height / 2))))
hotkeys('shift+right', () => gui.setValue('gui.panel.generation', 'x', settings.x + Math.floor(settings.generation.width / 2)))
hotkeys('shift+down', () => gui.setValue('gui.panel.generation', 'y', settings.y + Math.floor(settings.generation.height / 2)))

uploader({
  dropzone: document.documentElement,
  callback: sprites.add
})

loading(L`loading`, [
  // NOTE: enabling after gui.debounceDelay
  () => new Promise(resolve => window.setTimeout(resolve, 300)),
  L`loading.map`, () => {
    gui.enable()
    gui.show()
    gui.setValue('gui.panel.textures', 'gui.panel.textures.spritesList', sprites.toHTML(L`gui.panel.textures.spritesList.empty`))

    textures.watch(updateMap)
    canvas.watch(() => updateMap(false))
    sprites.watch(() => {
      gui.setValue('gui.panel.textures', 'gui.panel.textures.spritesList', sprites.toHTML(L`gui.panel.textures.spritesList.empty`))
      updateMap(true)
    })

    updateMap(true)
  }
]).catch(error)

function updateSettings (o, key, regenerate = true) {
  return value => {
    o[key] = value
    if (gui && gui.enabled) updateMap(regenerate)
  }
}

function updateMap (regenerate = true) {
  if (!regenerate) return map && map.renderer.update([], settings.rendering)

  map = generate(settings.x, settings.y, settings.generation)
  map.renderer = new Renderer(canvas.element, {
    map,
    seed: map.seed,
    textures: textures.toObject(),
    spritesheets: sprites.toSpritesheets()
  })

  updateMap(false)
}

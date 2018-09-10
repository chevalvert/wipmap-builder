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
  [L`generation`]: [
    ['seed', 'addText', [settings.generation.seed], updateSettings(settings.generation, 'seed')],
    ['x', 'addNumber', [0, 100, settings.x, 1], updateSettings(settings, 'x')],
    ['y', 'addNumber', [0, 100, settings.y, 1], updateSettings(settings, 'y')],

    [L`vorowidth`, 'addRange', [2, 20, settings.generation.width, 1], updateSettings(settings.generation, 'width')],
    [L`voroheight`, 'addRange', [2, 20, settings.generation.height, 1], updateSettings(settings.generation, 'height')],

    [L`jitter`, 'addRange', [0, 1, settings.generation.jitter, 0.01], updateSettings(settings.generation, 'jitter')],
    [L`distortion`, 'addRange', [0, 1, settings.generation.distortion, 0.01], updateSettings(settings.generation, 'distortion')],
    [L`gradient`, 'addRange', [0, 1, settings.generation.gradient, 0.01], updateSettings(settings.generation, 'gradient')],
    [L`poissonDensity`, 'addRange', [0, 10, settings.generation.poissonDensity, 0.01], updateSettings(settings.generation, 'poissonDensity')],

    [L`water`, 'addRange', [0, 1, settings.generation.probablities.water, 0.01], updateSettings(settings.generation.probablities, 'water')]
  ],
  [L`rendering`]: [
    [L`width`, 'addNumber', [0, Number.POSITIVE_INFINITY, canvas.width, 1], v => canvas.resize({ width: v })],
    [L`height`, 'addNumber', [0, Number.POSITIVE_INFINITY, canvas.height, 1], v => canvas.resize({ height: v })],
    [L`smooth`, 'addBoolean', [settings.rendering.smooth], updateSettings(settings.rendering, 'smooth', false)],
    [L`renderBiomesTexture`, 'addBoolean', [settings.rendering.renderBiomesTexture], updateSettings(settings.rendering, 'renderBiomesTexture', false)],
    [L`renderPoisson`, 'addBoolean', [settings.rendering.renderPoisson], updateSettings(settings.rendering, 'renderPoisson', false)],
    [L`renderVoronoiCells`, 'addBoolean', [settings.rendering.renderVoronoiCells], updateSettings(settings.rendering, 'renderVoronoiCells', false)],
    [L`renderVoronoiSites`, 'addBoolean', [settings.rendering.renderVoronoiSites], updateSettings(settings.rendering, 'renderVoronoiSites', false)],
    [L`scale`, 'addNumber', [0, Number.POSITIVE_INFINITY, settings.rendering.scale, 0.01], updateSettings(settings.rendering, 'scale', false)],
    [L`voronoiColor`, 'addColor', [settings.rendering.colors.voronoi], updateSettings(settings.rendering.colors, 'voronoi', false)],
    [L`backgroundColor`, 'addColor', [settings.rendering.colors.background], updateSettings(settings.rendering.colors, 'background', false)],
    [L`backgroundAlpha`, 'addRange', [0, 255, 255, 1], a => updateSettings(settings.rendering.colors, 'background', false)(Color(settings.rendering.colors.background).alpha(a / 255).string())]
  ],
  [L`legend`]: [
    ...[...unique(flatten(settings.generation.biomesMap)), 'WATER'].map(biome => {
      return [biome, 'addColor', [settings.rendering.colors[biome]], updateSettings(settings.rendering.colors, biome, false)]
    })
  ],
  [L`textures`]: [
    [L`json`, 'addJSON', [''], textures.fromJSON, 1000],
    [L`sprites`, 'addHTML', `<ol><li>${L`sprites.undefined`}</li></ol>`]
  ],
  [L`export`]: [
    [L`save as PNG`, 'addButton', [], () => map.renderer.toBlob(blob => FileSaver.saveAs(blob, filename('wipmap')))],
    [L`save as JSON`, 'addButton', [], () => FileSaver.saveAs(gui.toBlob(), filename('wipmap'))],
    [L`load json`, 'addFileChooser', [L`browse file`, 'application/json'], file => {
      gui.disable()
      gui.fromFile(file, () => {
        gui.enable()
        updateMap()
      })
    }]
  ],
  [L`view`]: [
    [L`canvas.scale`, 'addRange', [0, 1, 1, 0.01], canvas.scale, -1]
  ]
}, document.body)

hotkeys('h', gui.toggle)
hotkeys('w', () => gui.panels[L`rendering`].setValue(L`renderVoronoiCells`, !settings.rendering.renderVoronoiCells))

hotkeys('left', () => gui.panels[L`generation`].setValue('x', Math.max(0, settings.x - 1)))
hotkeys('up', () => gui.panels[L`generation`].setValue('y', Math.max(0, settings.y - 1)))
hotkeys('right', () => gui.panels[L`generation`].setValue('x', settings.x + 1))
hotkeys('down', () => gui.panels[L`generation`].setValue('y', settings.y + 1))

hotkeys('shift+left', () => gui.panels[L`generation`].setValue('x', Math.max(0, settings.x - Math.floor(settings.generation.width / 2))))
hotkeys('shift+up', () => gui.panels[L`generation`].setValue('y', Math.max(0, settings.y - Math.floor(settings.generation.height / 2))))
hotkeys('shift+right', () => gui.panels[L`generation`].setValue('x', settings.x + Math.floor(settings.generation.width / 2)))
hotkeys('shift+down', () => gui.panels[L`generation`].setValue('y', settings.y + Math.floor(settings.generation.height / 2)))

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
    gui.panels[L`textures`].setValue(L`sprites`, sprites.toHTML(L`sprites.undefined`))
    canvas.watch(() => updateMap(false))
    sprites.watch(() => {
      gui.panels[L`textures`].setValue(L`sprites`, sprites.toHTML(L`sprites.undefined`))
      updateMap(true)
    })
    textures.watch(updateMap)
  },
  L`rendering.map`, updateMap
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

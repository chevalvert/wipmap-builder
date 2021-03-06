import localize from 'locales'

import fps from 'fps-indicator'
import FileSaver from 'file-saver'
import Color from 'color'
import hotkeys from 'hotkeys-js'

import Renderer from 'wipmap-renderer'

import settings, { settings as SETTINGS } from 'controllers/settings'

import StopWatch from 'components/stopwatch'

import canvas from 'controllers/canvas'
import GUI from 'controllers/gui'
import uploader from 'controllers/images-uploader'
import sprites from 'controllers/sprites-manager'
import textures from 'controllers/textures-manager'
import generateMap from 'controllers/map-generator'

import error from 'utils/error'
import loading from 'utils/loading-wrapper'
import filename from 'utils/filename'

import flatten from 'utils/array-flatten'
import unique from 'utils/array-unique'

if (!window.isProduction) fps()
const L = localize(!~window.location.hash.indexOf('#noloc') && window.lang)

let map

const gui = GUI({
  'gui.panel.generation': [
    ['gui.panel.generation.seed', 'addText', [SETTINGS.generation.seed], settings.update('generation.seed')],
    ['gui.panel.generation.x', 'addNumber', [0, 100, SETTINGS.x, 1], v => v && settings.update('x')(v)],
    ['gui.panel.generation.y', 'addNumber', [0, 100, SETTINGS.y, 1], v => v && settings.update('y')(v)],
    ['gui.panel.generation.voronoiWidth', 'addRange', [2, 20, SETTINGS.generation.width, 1], settings.update('generation.width')],
    ['gui.panel.generation.voronoiHeight', 'addRange', [2, 20, SETTINGS.generation.height, 1], settings.update('generation.height')],
    ['gui.panel.generation.jitter', 'addRange', [0, 1, SETTINGS.generation.jitter, 0.01], settings.update('generation.jitter')],
    ['gui.panel.generation.distortion', 'addRange', [0, 1, SETTINGS.generation.distortion, 0.01], settings.update('generation.distortion')],
    ['gui.panel.generation.gradient', 'addRange', [0, 1, SETTINGS.generation.gradient, 0.01], settings.update('generation.gradient')],
    ['gui.panel.generation.poissonDensity', 'addRange', [0, 100, SETTINGS.generation.poissonDensity, 0.01], settings.update('generation.poissonDensity')],
    ['gui.panel.generation.water', 'addRange', [0, 1, SETTINGS.generation.probablities.water, 0.01], settings.update('generation.probablities.water')]
  ],
  'gui.panel.rendering': [
    ['gui.panel.rendering.width', 'addNumber', [0, Number.POSITIVE_INFINITY, canvas.width, 1], v => {
      settings.update('rendering.width', false)(v)
      canvas.resize({ width: v })
    }],
    ['gui.panel.rendering.height', 'addNumber', [0, Number.POSITIVE_INFINITY, canvas.height, 1], v => {
      settings.update('rendering.height', false)(v)
      canvas.resize({ height: v })
    }],
    ['gui.panel.rendering.smooth', 'addBoolean', [SETTINGS.rendering.smooth], settings.update('rendering.smooth', false), 0],
    ['gui.panel.rendering.renderBiomesTexture', 'addBoolean', [SETTINGS.rendering.renderBiomesTexture], settings.update('rendering.renderBiomesTexture', false), -1],
    ['gui.panel.rendering.renderPoisson', 'addBoolean', [SETTINGS.rendering.renderPoisson], settings.update('rendering.renderPoisson', false), -1],
    ['gui.panel.rendering.renderVoronoiCells', 'addBoolean', [SETTINGS.rendering.renderVoronoiCells], settings.update('rendering.renderVoronoiCells', false), -1],
    ['gui.panel.rendering.renderVoronoiSites', 'addBoolean', [SETTINGS.rendering.renderVoronoiSites], settings.update('rendering.renderVoronoiSites', false), -1],
    ['gui.panel.rendering.scale', 'addNumber', [0, Number.POSITIVE_INFINITY, SETTINGS.rendering.scale, 0.01], settings.update('rendering.scale', false)],
    ['gui.panel.rendering.voronoiColor', 'addColor', [SETTINGS.rendering.colors.voronoi], settings.update('rendering.colors.voronoi', false), -1],
    ['gui.panel.rendering.backgroundColor', 'addColor', [SETTINGS.rendering.colors.background], settings.update('rendering.colors.background', false), -1],
    ['gui.panel.rendering.backgroundAlpha', 'addRange', [0, 255, 255, 1], a => settings.update('rendering.colors.background', false)(Color(SETTINGS.rendering.colors.background).alpha(a / 255).string()), -1]
  ],
  'gui.panel.legend': [
    ...[...unique(flatten(SETTINGS.generation.biomesMap)), 'WATER'].map(biome => {
      return ['gui.panel.legend.' + biome, 'addColor', [SETTINGS.rendering.colors[biome]], settings.update('rendering.colors.' + biome, false), 100]
    })
  ],
  'gui.panel.textures': [
    ['gui.panel.textures.texturesDescriber', 'addJSON', L`gui.panel.textures.texturesDescriber.placeholder`, textures.fromJSON, 1000],
    ['gui.panel.textures.spritesList', 'addHTML', `<ol><li>${L`gui.panel.textures.spritesList.empty`}</li></ol>`]
  ],
  'gui.panel.export': [
    ['gui.panel.export.png', 'addButton', [], exportImage],
    ['gui.panel.export.json', 'addButton', [], () => FileSaver.saveAs(settings.toBlob(), filename('wipmap'))],
    ['gui.panel.export.loadJSON', 'addFileChooser', [L`gui.panel.export.loadJSON.browse`, 'application/json'], file => {
      gui.disable()
      gui.fromFile(file, settings.GUI_CORRESPONDENCE_TABLE, () => {
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
  localize: L
})

hotkeys('ctrl+h,h', () => {
  gui.toggle()
  if (!window.isProduction) return
  const preview = Object.assign({}, SETTINGS, {
    rendering: Object.assign({}, SETTINGS.rendering, {
      renderBiomesTexture: true,
      renderPoisson: false,
      renderVoronoiCells: false,
      renderVoronoiSites: false
    })
  })
  updateMap(false, gui.visible ? SETTINGS : preview)
})

hotkeys('w', () => {
  gui.disable()
  const debug = SETTINGS.rendering.renderVoronoiSites
  gui.setValue('gui.panel.rendering', 'gui.panel.rendering.renderVoronoiSites', !debug)
  gui.setValue('gui.panel.rendering', 'gui.panel.rendering.renderVoronoiCells', !debug)
  gui.enable()
  updateMap(false)
})

hotkeys('ctrl+s,cmd+s', e => {
  e.preventDefault()
  exportImage()
})
hotkeys('left', e => gui.setValue('gui.panel.generation', 'gui.panel.generation.x', Math.max(0, SETTINGS.x - 1)) && e.preventDefault())
hotkeys('up', e => gui.setValue('gui.panel.generation', 'gui.panel.generation.y', Math.max(0, SETTINGS.y - 1)) && e.preventDefault())
hotkeys('right', e => gui.setValue('gui.panel.generation', 'gui.panel.generation.x', SETTINGS.x + 1) && e.preventDefault())
hotkeys('down', e => gui.setValue('gui.panel.generation', 'gui.panel.generation.y', SETTINGS.y + 1) && e.preventDefault())
hotkeys('shift+left', e => gui.setValue('gui.panel.generation', 'gui.panel.generation.x', Math.max(0, SETTINGS.x - Math.floor(SETTINGS.generation.width / 2))) && e.preventDefault())
hotkeys('shift+up', e => gui.setValue('gui.panel.generation', 'gui.panel.generation.y', Math.max(0, SETTINGS.y - Math.floor(SETTINGS.generation.height / 2))) && e.preventDefault())
hotkeys('shift+right', e => gui.setValue('gui.panel.generation', 'gui.panel.generation.x', SETTINGS.x + Math.floor(SETTINGS.generation.width / 2)) && e.preventDefault())
hotkeys('shift+down', e => gui.setValue('gui.panel.generation', 'gui.panel.generation.y', SETTINGS.y + Math.floor(SETTINGS.generation.height / 2)) && e.preventDefault())

uploader({
  dropzone: document.documentElement,
  callback: sprites.add
})

const stopwatch = new StopWatch('rendered in ', 'ms')
if (!window.isProduction) stopwatch.mount(document.querySelector('main'))

loading(L`loading`, [
  // NOTE: enabling after gui.debounceDelay
  () => new Promise(resolve => window.setTimeout(resolve, 300)),
  L`loading.map`, () => {
    gui.enable()
    gui.show()
    gui.setValue('gui.panel.textures', 'gui.panel.textures.spritesList', sprites.toHTML(L`gui.panel.textures.spritesList.empty`))

    settings.watch((regenerate = true) => {
      if (gui && gui.enabled) updateMap(regenerate)
    })

    textures.watch(() => {
      const tex = textures.toObject()
      if (map && map.renderer) map.renderer.textures = tex
      settings.update('textures', false)(tex)
    })

    canvas.watch(() => updateMap(false))
    sprites.watch(() => {
      gui.setValue('gui.panel.textures', 'gui.panel.textures.spritesList', sprites.toHTML(L`gui.panel.textures.spritesList.empty`))
      updateMap(true)
    })

    updateMap(true)
  }
]).catch(error)

function exportImage () {
  map.renderer.toBlob(blob => FileSaver.saveAs(blob, filename('wipmap')))
}

function updateMap (regenerate = true, opts = SETTINGS) {
  if (!regenerate) return map && map.renderer.update([], opts.rendering)

  Promise.resolve()
    .then(() => document.querySelector('main').classList.add('is-rendering'))
    .then(stopwatch.start)
    .then(() => generateMap(opts.x, opts.y, opts.generation))
    .then(response => {
      map = response
      document.querySelector('main').classList.remove('is-rendering')
      map.renderer = new Renderer(canvas.element, {
        map,
        seed: map.seed,
        textures: opts.textures,
        spritesheets: sprites.toSpritesheets()
      })
      updateMap(false)
    })
    .then(stopwatch.stop)
    .catch(error)
}

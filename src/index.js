import L from 'loc'
import fps from 'fps-indicator'

import Renderer from 'wipmap-renderer'
import generate from 'wipmap-generate'

import GUI from 'controllers/gui'
import uploader from 'controllers/images-uploader'
import sprites from 'controllers/sprites-manager'
import textures from 'controllers/textures-manager'

import error from 'utils/error'
import loading from 'utils/loading-wrapper'

if (!window.isProduction) fps()

let map

const canvas = document.querySelector('.map-canvas')
updateCanvasSize({ width: 800, height: 600 })

const settings = {
  x: 0,
  y: 0,
  generation: {
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
      ['PLAINS', 'PLAINS', 'PLAINS'],
      ['PLAINS', 'PLAINS', 'PLAINS'],
      ['PLAINS', 'PLAINS', 'PLAINS']
    ]
  },
  rendering: {
    forceUpdate: true,
    debugPerf: !window.isProduction,
    drawBoundingBox: false,

    renderBiomesTexture: true,
    renderLandmarks: true,

    renderPoisson: false,
    renderVoronoiCells: false,
    renderVoronoiSites: false
  }
}

const gui = GUI({
  generation: [
    ['x', 'addNumber', [0, 100, settings.x, 1], updateSettings(settings, 'x')],
    ['y', 'addNumber', [0, 100, settings.y, 1], updateSettings(settings, 'y')],

    ['vorowidth', 'addRange', [0, 10, settings.generation.width, 1], updateSettings(settings.generation, 'width')],
    ['voroheight', 'addRange', [0, 10, settings.generation.height, 1], updateSettings(settings.generation, 'height')],

    ['jitter', 'addRange', [0, 1, settings.generation.jitter, 0.01], updateSettings(settings.generation, 'jitter')],
    ['distortion', 'addRange', [0, 1, settings.generation.distortion, 0.01], updateSettings(settings.generation, 'distortion')],
    ['gradient', 'addRange', [0, 1, settings.generation.gradient, 0.01], updateSettings(settings.generation, 'gradient')],
    ['poissonDensity', 'addRange', [0, 1, settings.generation.poissonDensity, 0.01], updateSettings(settings.generation, 'poissonDensity')],

    ['water', 'addRange', [0, 1, settings.generation.probablities.water, 0.01], updateSettings(settings.generation.probablities, 'water')],
  ],
  rendering: [
    ['width', 'addNumber', [0, Number.POSITIVE_INFINITY, canvas.width, 1], v => updateCanvasSize({ width: v })],
    ['height', 'addNumber', [0, Number.POSITIVE_INFINITY, canvas.height, 1], v => updateCanvasSize({ height: v })],
    ...Object.entries(settings.rendering).map(([key, value]) => (
      [key, 'addBoolean', [value], updateSettings(settings.rendering, key, false)]
    ))
  ],
  textures: [
    // TODO: custom QS.addJSON: like addTextArea but with parsing validation (css .is-valid)
    ['json', 'addTextArea', [''], textures.fromJSON],
    ['sprites', 'addTextArea', [''], sprites.updateFromFilenames]
  ]
}, document.body)

uploader({
  dropzone: document.documentElement,
  callback: (image, filename) => {
    console.log(image, filename)
    sprites.add(image, filename)
    gui.panels.textures.setValue('sprites', sprites.filenames.join('\n'))
  }
})

loading(L`loading`, [
  L`loading.map`, () => {
    gui.enable()
    gui.show()
    updateMap()
    sprites.watch(updateMap)
    textures.watch(updateMap)
  }
]).catch(error)

function updateSettings (o, key, regenerate = true) {
  return value => {
    o[key] = value
    if (gui && gui.enabled) updateMap(regenerate)
  }
}

function updateCanvasSize ({ width, height } = {}) {
  canvas.width = width || canvas.width
  canvas.height = height || canvas.height
  canvas.style.width = canvas.width + 'px'
  canvas.style.height = canvas.height + 'px'
  updateMap(false)
}

function updateMap (regenerate = true) {
  if (!regenerate) return map && map.renderer.update([], settings.rendering)

  map = generate(settings.x, settings.y, settings.generation)
  map.renderer = new Renderer(canvas, {
    map,
    seed: map.seed,
    textures: textures.toObject(),
    spritesheets: sprites.toSpritesheets()
  })

  updateMap(false)
}

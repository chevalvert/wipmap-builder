import Emitter from 'tiny-emitter'
import setByKeyPath from 'keypather/set'

/* global Blob */

const events = new Emitter()
const NS = '__SETTINGS.'

const SETTINGS = {
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
    width: 800,
    height: 800,
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
  },
  textures: {}
}

const GUI_CORRESPONDENCE_TABLE = {
  'gui.panel.generation/gui.panel.generation.seed': 'generation.seed',
  'gui.panel.generation/gui.panel.generation.x': 'x',
  'gui.panel.generation/gui.panel.generation.y': 'y',
  'gui.panel.generation/gui.panel.generation.voronoiWidth': 'generation.width',
  'gui.panel.generation/gui.panel.generation.voronoiHeight': 'generation.height',
  'gui.panel.generation/gui.panel.generation.jitter': 'generation.jitter',
  'gui.panel.generation/gui.panel.generation.distortion': 'generation.distortion',
  'gui.panel.generation/gui.panel.generation.gradient': 'generation.gradient',
  'gui.panel.generation/gui.panel.generation.poissonDensity': 'generation.poissonDensity',
  'gui.panel.generation/gui.panel.generation.water': 'generation.probablities.water',
  'gui.panel.rendering/gui.panel.rendering.width': 'rendering.width',
  'gui.panel.rendering/gui.panel.rendering.height': 'rendering.height',
  'gui.panel.rendering/gui.panel.rendering.smooth': 'rendering.smooth',
  'gui.panel.rendering/gui.panel.rendering.renderBiomesTexture': 'rendering.renderBiomesTexture',
  'gui.panel.rendering/gui.panel.rendering.renderPoisson': 'rendering.renderPoisson',
  'gui.panel.rendering/gui.panel.rendering.renderVoronoiCells': 'rendering.renderVoronoiCells',
  'gui.panel.rendering/gui.panel.rendering.renderVoronoiSites': 'rendering.renderVoronoiSites',
  'gui.panel.rendering/gui.panel.rendering.scale': 'rendering.scale',
  'gui.panel.rendering/gui.panel.rendering.voronoiColor': 'rendering.colors.voronoi',

  // TODO
  // 'gui.panel.rendering/gui.panel.rendering.backgroundColor': 'rendering.colors.background',
  // 'gui.panel.rendering/gui.panel.rendering.backgroundAlpha': 'rendering.colors.background',

  'gui.panel.legend/gui.panel.legend.DESERT': 'rendering.colors.DESERT',
  'gui.panel.legend/gui.panel.legend.FOREST': 'rendering.colors.FOREST',
  'gui.panel.legend/gui.panel.legend.MOUNTAINS': 'rendering.colors.MOUNTAINS',
  'gui.panel.legend/gui.panel.legend.PLAINS': 'rendering.colors.PLAINS',
  'gui.panel.legend/gui.panel.legend.SWAMP': 'rendering.colors.SWAMP',
  'gui.panel.legend/gui.panel.legend.WATER': 'rendering.colors.WATER',
  'gui.panel.textures/gui.panel.textures.texturesDescriber': 'textures'
}

if (!window.isProduction) window.settings = SETTINGS

export const settings = SETTINGS
export default {
  GUI_CORRESPONDENCE_TABLE,
  watch: callback => events.on(NS + 'update', callback),
  update: (key, ...args) => value => {
    setByKeyPath(SETTINGS, key, value)
    events.emit(NS + 'update', ...args)
  },
  toBlob: () => new Blob([JSON.stringify(SETTINGS, null, 2)], { type: 'application/json' }),
  toJSON: () => JSON.stringify(SETTINGS, null, 2)
}

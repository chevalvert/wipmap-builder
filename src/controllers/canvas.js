import Emitter from 'tiny-emitter'
import noop from 'utils/noop'

const events = new Emitter()
const NS = '__CANVAS.'

const canvas = document.querySelector('.map-canvas')
updateSize({ width: 800, height: 600 })

export default {
  get element () { return canvas },
  get width () { return canvas.width },
  get height () { return canvas.height },

  watch: callback => events.on(NS + 'resize', callback),

  scale: percent => {
    canvas.style.transform = `translate(-50%, -50%) scale(${percent})`
  },

  resize: updateSize
}

function updateSize ({ width, height } = {}, callback = noop) {
  canvas.width = width || canvas.width
  canvas.height = height || canvas.height
  canvas.style.width = canvas.width + 'px'
  canvas.style.height = canvas.height + 'px'

  events.emit(NS + 'resize', canvas)

  callback()
}

import Emitter from 'tiny-emitter'

let textures = {}

const events = new Emitter()
const NS = '__TEXTURES-MANAGER.'

export default {
  watch: callback => events.on(NS + 'update', callback),

  fromJSON: json => {
    try {
      textures = JSON.parse(typeof json === 'string' ? json : JSON.stringify(json))
      events.emit(NS + 'update', textures)
    } catch (e) {
      console.warn(e)
    }
  },

  toObject: () => textures
}

import Emitter from 'tiny-emitter'

const sprites = {}

const events = new Emitter()
const NS = '__SPRITES-MANAGER.'

export default {
  get images () { return Object.values(sprites) },
  get filenames () { return Object.keys(sprites) },
  watch: callback => events.on(NS + 'update', callback),

  add: (image, filename) => {
    sprites[filename] = image
    events.emit(NS + 'update', sprites)
  },

  updateFromFilenames: filenames => {
    for (let key in sprites) {
      if (!filenames.includes(key)) delete sprites[key]
    }
    events.emit(NS + 'update', sprites)
  },

  toHTML (fallback) {
    const filenames = Object.keys(sprites).length
      ? Object.keys(sprites)
      : [fallback]
    return `<ol class='sprites-list'>
      ${filenames.map(filename => `<li class='sprites-list--item'>${filename}</li>`).join('\n')}
    </ol>`
  },

  // NOTE: this is used for legacy support
  toSpritesheets: () => {
    const spritesheets = {}

    Object.entries(sprites).forEach(([filename, image]) => {
      spritesheets[filename] = image
      spritesheets[filename].name = filename
      spritesheets[filename].length = 1
    })

    return spritesheets
  }
}

import QuickSettings from 'quicksettings'
import noop from 'utils/noop'
import makeIndetable from 'utils/make-textarea-indentable'
import makeAutoHeight from 'utils/make-textarea-autoheight'

/* global Blob, FileReader, localStorage */

const NS = 'WIPMAP.'

export default (tree, {
  DOMContainer = document.body,
  localize = key => key
} = {}) => {
  const panels = {}
  let enabled = false
  let visible = true

  QuickSettings.useExtStyleSheet()
  const qsStore = QuickSettings.create(0, 0).hide()

  Object.entries(tree).forEach(([title, panelControls]) => {
    const x = Object.keys(panels).length * 205
    const y = 0
    const panel = QuickSettings.create(x, y, localize(title), DOMContainer).hide()
    panel.debouncedCallbacks = {}

    // Adding the controls to the panel
    panelControls.forEach(([name, method, args, callback, debounceDelay = 300]) => {
      const debouncedCallback = debounceDelay > 0
        ? value => {
          window.clearTimeout(panel.debouncedCallbacks[name])
          panel.debouncedCallbacks[name] = window.setTimeout(() => callback(value), debounceDelay)
        }
        : callback

      if (method === 'addJSON') addJSONInput(panel, name, args, debouncedCallback)
      else panel[method](localize(name), ...args, debouncedCallback)
    })

    // NOTE: implementing custom collapsing behavior with persistent storage capabilities
    panel.setCollapsible(false)
    qsStore.addBoolean(title + '-collapsed', false, value => panel[value ? 'collapse' : 'expand']())
    panel._titleBar.addEventListener('dblclick', () => qsStore.setValue(title + '-collapsed', !panel._collapsed), true)

    // NOTE: adding persistent storage capabilities to panel position
    qsStore.addText(title + '-position', x + ';' + y, value => panel.setPosition(...value.split(';').map(v => +v)))
    panel._titleBar.addEventListener('mouseup', () => qsStore.setValue(title + '-position', panel._panel.offsetLeft + ';' + panel._panel.offsetTop))

    panels[title] = panel
  })

  save()

  const api = {
    get panels () { return panels },
    setValue: (panelName, controlName, value) => panels[panelName].setValue(localize(controlName), value),

    get enabled () { return enabled },
    enable () { enabled = true },
    disable () { enabled = false },

    save,

    show,
    hide,
    toggle: () => visible ? hide() : show(),

    toObject: () => Object.entries(panels).reduce((json, [name, panel]) => {
      json[name] = panel.getValuesAsJSON()
      return json
    }, {}),

    toBlob: () => new Blob([JSON.stringify(api.toObject(), null, 2)], { type: 'application/json' }),

    fromJSON: json => {
      try {
        json = JSON.parse(typeof json === 'string' ? json : JSON.stringify(json))

        localStorage.clear()
        Object.keys(json).forEach(key => {
          const value = typeof json === 'string' ? json[key] : JSON.stringify(json[key])
          localStorage.setItem(NS + key, value)
        })
        save()
      } catch (e) {
        console.warn(e)
      }
    },

    fromFile: (file, callback = noop) => {
      if (!file) return
      const fReader = new FileReader()
      fReader.onload = () => {
        try {
          const json = JSON.parse(fReader.result)
          api.fromJSON(json)
          callback()
        } catch (e) {
          console.warn(e)
        }
      }
      fReader.readAsText(file)
    }
  }
  return api

  function show () {
    Object.values(panels).forEach(panel => panel.show())
    visible = true
  }

  function hide () {
    Object.values(panels).forEach(panel => panel.hide())
    visible = false
  }

  function addJSONInput (panel, name, placeholder, callback = noop) {
    panel.addTextArea(localize(name), placeholder, string => {
      try {
        const json = JSON.parse(string)
        element.classList.remove('is-invalid')
        callback(json)
      } catch (e) {
        element.classList.add('is-invalid')
      }
    })

    const element = panel._controls[localize(name)].control
    if (!element) return
    element.classList.add('qs_json')

    qsStore.addText(name + '-size', element.offsetWidth, size => {
      const [w, h] = size.split(';')
      element.style.width = w + 'px'
      element.style.height = h + 'px'
    })

    element.addEventListener('mouseup', () => {
      qsStore.setValue(name + '-size', element.offsetWidth + ';' + element.offsetHeight)
    })

    makeIndetable(element, 2)
    makeAutoHeight(element, () => qsStore.setValue(name + '-size', element.offsetWidth + ';' + element.offsetHeight))
  }

  function save () {
    ;[
      ...Object.entries(panels),
      ['qsstore', qsStore]
    ].forEach(([name, panel]) => {
      try {
        panel.saveInLocalStorage(NS + name)
      } catch (e) {
        console.warn(e)
      }
    })
  }
}

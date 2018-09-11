import QuickSettings from 'quicksettings'
import noop from 'utils/noop'
import makeIndetable from 'utils/make-textarea-indentable'
import makeAutoHeight from 'utils/make-textarea-autoheight'
import getByKeyPath from 'keypather/get'

/* global FileReader */

const NS = 'WIPMAP.'

export default (tree, {
  DOMContainer = document.body,
  localize = key => key,
  replacer = inputID => inputID
} = {}) => {
  const panels = {}
  let enabled = false
  let visible = true

  QuickSettings.useExtStyleSheet()
  const qsStore = QuickSettings.create(0, 0).hide()

  // NOTE: QS uses direct text label as internal identifier,
  // so localization won't properly work in some use case.
  const internalIDs = {}
  const _localize = localize
  localize = value => {
    internalIDs[value] = _localize(value)
    return internalIDs[value]
  }

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
    setValue,

    get enabled () { return enabled },
    enable () { enabled = true },
    disable () { enabled = false },

    save,

    show,
    hide,
    toggle: () => visible ? hide() : show(),

    fromJSON: (json, correspondenceTable) => {
      try {
        json = JSON.parse(typeof json === 'string' ? json : JSON.stringify(json))

        Object.entries(correspondenceTable).forEach(([guiPath, settingsPath]) => {
          const [panelID, inputID] = guiPath.split('/')
          const inputName = internalIDs[inputID]
          if (!panelID || !inputName) return

          const value = getByKeyPath(json, settingsPath)
          setValue(panelID, inputName, typeof value === 'object' ? JSON.stringify(value, null, 2) : value)
        })
      } catch (e) {
        console.warn(e)
      }
    },

    fromFile: (file, correspondenceTable, callback = noop) => {
      if (!file) return
      const fReader = new FileReader()
      fReader.onload = () => {
        try {
          const json = JSON.parse(fReader.result)
          api.fromJSON(json, correspondenceTable)
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

  function setValue (panelName, controlName, value) {
    console.log(panelName, controlName, value)
    return panels[panelName].setValue(localize(controlName), value)
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

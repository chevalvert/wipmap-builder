import QuickSettings from 'quicksettings'

export default (tree, DOMContainer = document.body) => {
  const panels = {}
  let enabled = false

  const qsStore = QuickSettings.create(0, 0).hide()

  Object.entries(tree).forEach(([title, panelControls]) => {
    const x = Object.keys(panels).length * 205
    const y = 0
    const panel = QuickSettings.create(x, y, title, DOMContainer).hide()

    // Adding the controls to the panel
    panelControls.forEach(([name, method, args, callback]) => {
      panel[method](name, ...args, callback)
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

  ;[
    ...Object.entries(panels),
    ['qsstore', qsStore]
  ].forEach(([name, panel]) => {
    try {
      panel.saveInLocalStorage('WIPMAP-' + name)
    } catch (e) {
      console.warn(e)
    }
  })

  const api = {
    get panels () { return panels },
    get enabled () { return enabled },

    enable () { enabled = true },
    disable () { enabled = false },

    show,
    hide
  }
  return api

  function show () {
    Object.values(panels).forEach(panel => panel.show())
  }

  function hide () {
    Object.values(panels).forEach(panel => panel.hide())
  }
}

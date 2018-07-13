import noop from 'utils/noop'

/* global FileReader Image */

export default ({
  dropzone = document.documentElement,
  callback = noop
} = {}) => {
  dropzone.addEventListener('dragover', e => e.preventDefault(), false)
  dropzone.addEventListener('drop', e => {
    e.stopPropagation()
    e.preventDefault()

    ;[...e.dataTransfer.items].forEach(handleItem)
  })

  function handleItem (item) {
    if (item.kind !== 'file') return

    // NOTE: WebKit/chromium needs 'webkit' prefix (since Chrome 21)
    const entry = item.webkitGetAsEntry()

    if (!entry.isDirectory) return makeFile(entry)

    const reader = entry.createReader()
    reader.readEntries(entries => entries.forEach(makeFile))
  }

  function makeFile (entry) {
    entry.file(file => {
      const reader = new FileReader()
      reader.onload = function () {
        const image = new Image()
        image.onload = () => callback(image, entry.name)
        image.src = this.result
      }
      reader.readAsDataURL(file)
    })
  }
}

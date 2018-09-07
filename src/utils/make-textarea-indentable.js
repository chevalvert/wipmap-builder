export default (element, indentSize) => element.addEventListener('keydown', function (e) {
  if (e.keyCode === 9 || e.which === 9) {
    e.preventDefault()
    const start = this.selectionStart
    this.value = this.value.substring(0, this.selectionStart) + new Array(indentSize).fill(' ').join('') + this.value.substring(this.selectionEnd)
    this.selectionEnd = start + indentSize
  }
})

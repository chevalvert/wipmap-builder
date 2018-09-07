import noop from 'utils/noop'

export default (element, callback = noop) => element.addEventListener('input', function () {
  this.style.height = ''
  this.style.height = this.scrollHeight + 'px'
  callback(this)
})

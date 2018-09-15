import bel from 'bel'
import DomComponent from 'abstractions/DomComponent'

export default class StopWatch extends DomComponent {
  constructor (prefix, suffix) {
    super()
    this.prefix = prefix
    this.suffix = suffix
    this.bindFuncs(['start', 'stop'])
  }

  render () {
    return bel`<div class='stopwatch'></div>`
  }

  start () {
    if (this.mounted) this.startTime = Date.now()
  }

  stop () {
    this.duration = Date.now() - this.startTime
    if (this.mounted) this.refs.base.innerHTML = this.prefix + this.duration + this.suffix
  }
}

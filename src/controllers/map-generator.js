import Worker from 'worker-loader!worker'
import generate from 'wipmap-generate'

let worker = new Worker()
const generateWithWorker = (x, y, opts) => new Promise((resolve, reject) => {
  worker.terminate()

  worker = new Worker()
  worker.onmessage = e => resolve(e.data)
  worker.onerror = e => reject(e.message)

  worker.postMessage([x, y, opts])
})

export default window.Worker
  ? generateWithWorker
  : (x, y, opts) => Promise.resolve(generate(x, y, opts))

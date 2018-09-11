import generate from 'wipmap-generate'

/* global self */

self.onmessage = e => self.postMessage(generate(...e.data))

const flatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? flatten(v) : v)))
export default flatten

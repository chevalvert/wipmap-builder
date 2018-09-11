const path = require('path')
const paths = require('./paths.config')

module.exports = {
  entry: [
    path.join(paths.src, 'index.js'),
    path.join(paths.src, 'index.scss')
  ],
  output: {
    publicPath: paths.public,
    filename: '[hash].js',
    chunkFilename: '[hash].[id].chunk.js'
  },
  resolve: {
    alias: {
      components: paths.components,
      abstractions: paths.abstractions,
      controllers: paths.controllers,
      pages: paths.pages,
      utils: paths.utils,
      loc: path.join(paths.src, 'loc.js'),
      worker: path.join(paths.src, 'worker.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        include: paths.src
      }
    ]
  },
  plugins: []
}

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
      abstractions: paths.abstractions,
      components: paths.components,
      controllers: paths.controllers,
      locales: paths.locales,
      pages: paths.pages,
      utils: paths.utils,
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

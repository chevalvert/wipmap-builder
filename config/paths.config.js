const path = require('path')
const appEnv = process.env.APP_ENV || process.env.NODE_ENV || 'development'

let publicPaths = {
  development: '/',
  ghpages: '/wipmap-builder/',
  preprod: '/',
  production: '/'
}

module.exports = {
  // Used by the devServer and base href
  public: publicPaths[appEnv] || publicPaths.development,

  // Used by the module bundler
  root: path.join(__dirname, '..'),
  src: path.join(__dirname, '..', 'src'),
  build: path.join(__dirname, '..', 'build'),
  static: path.join(__dirname, '..', 'static'),

  // Node-Resolve aliases
  abstractions: path.join(__dirname, '..', 'src', 'abstractions'),
  components: path.join(__dirname, '..', 'src', 'components'),
  controllers: path.join(__dirname, '..', 'src', 'controllers'),
  locales: path.join(__dirname, '..', 'src', 'locales'),
  pages: path.join(__dirname, '..', 'src', 'pages'),
  utils: path.join(__dirname, '..', 'src', 'utils'),

  // Generating page from content and layouts
  layouts: path.join(__dirname, '..', 'src', 'pages'),
  partials: path.join(__dirname, '..', 'src', 'pages')
}

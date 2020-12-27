const mix = require('laravel-mix')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

// Vuetify scss and sass weback config
// eslint-disable-next-line no-undef
Mix.listen('configReady', config => {
  const scssRule = config.module.rules.find(r => r.test.toString() === /\.scss$/.toString())
  const scssOptions = scssRule.loaders.find(l => l.loader === 'sass-loader').options
  scssOptions.data = '@import "./resources/styles/styles.scss";'

  const sassRule = config.module.rules.find(r => r.test.toString() === /\.sass$/.toString())
  const sassOptions = sassRule.loaders.find(l => l.loader === 'sass-loader').options
  sassOptions.data = '@import "./resources/styles/styles.scss"'
})

mix.options({
  extractVueStyles: true
})

mix.browserSync('task-app.test')

mix.js('resources/js/app.js', 'public/js')
  .js('resources/js/welcome.js', 'public/js')
  .postCss('resources/css/app.css', 'public/css', [
    require('postcss-import'),
    require('tailwindcss')
  ])
  .webpackConfig(require('./webpack.config'))

// Runs vuetify-loader after other webpack config has been run
mix.extend('vuetify', new class {
  webpackConfig (config) {
    config.plugins.push(new VuetifyLoaderPlugin())
  }
}())

mix.vuetify()

const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve('resources/js')
    }
  },
  plugins: [
    new ESLintPlugin({
      useEslintrc: true
    })
  ]
}

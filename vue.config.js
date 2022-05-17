const path = require('path')

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        // 想要在全域性使用，路徑根據具體需求更改
        path.resolve(__dirname, 'src/assets/scss/config/_variables.scss'),
        path.resolve(__dirname, 'src/assets/scss/config/_typography.scss'),
        path.resolve(__dirname, 'src/assets/scss/config/_reusable.scss')
      ]
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Invoice_App/'
    : '/'
}

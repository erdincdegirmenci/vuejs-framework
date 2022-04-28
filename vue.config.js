var path = require('path')

module.exports = {
  devServer: {
    port: 8081
  },
  runtimeCompiler: true,
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.resolve('src'),
        Components: path.resolve(__dirname, 'src/components'),
        Actions: path.resolve(__dirname, 'src/store/actions'),
        Utils: path.resolve(__dirname, 'src/utils'),
        Services: path.resolve(__dirname, 'src/services'),
        Customcontrols: path.resolve(__dirname, 'src/components/customcontrols'),
        Partialpages: path.resolve(__dirname, 'src/components/partialpages'),
        Helpers: path.resolve(__dirname, 'src/library/helpers'),
        Images: path.resolve(__dirname, 'src/assets/images')
      }
    }
  },

  transpileDependencies: [
    'vuetify'
  ]
}

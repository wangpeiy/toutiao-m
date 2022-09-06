const { defineConfig } = require('@vue/cli-service')
const { resolve } = require('path')
const cpns = resolve(__dirname, 'src/components')
const views = resolve(__dirname, 'src/views')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      port: 8888,
      open: true,
      host: 'localhost'
    },
    resolve: {
      alias: { cpns, views }
    }
  }
})

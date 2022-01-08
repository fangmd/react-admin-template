/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { merge } = require('webpack-merge')

const webpackConfigBase = require('./webpack.base.config')

const webpackConfigDev = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    app: [path.join(__dirname, '../src', 'index.tsx')],
  },
  output: {
    filename: 'static/js/bundle.js',
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../build'),
      staticOptions: {},
      // Don't be confused with `devMiddleware.publicPath`, it is `publicPath` for static directory
      // Can be:
      // publicPath: ['/static-public-path-one/', '/static-public-path-two/'],
      // publicPath: '/static-public-path/',
      // Can be:
      // serveIndex: {} (options for the `serveIndex` option you can find https://github.com/expressjs/serve-index)
      serveIndex: true,
      // Can be:
      // watch: {} (options for the `watch` option you can find https://github.com/paulmillr/chokidar)
      watch: true,
    },
    compress: true,
    allowedHosts: 'all',
    port: 4002,
    hot: 'only',
    historyApiFallback: true, // router history 模式下需要
    proxy: {
      '/user': 'http://api.fangmingdong.com/',
    },
  },
}

const baseConfig = webpackConfigBase('development')

module.exports = merge(baseConfig, webpackConfigDev)

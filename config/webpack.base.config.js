/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const imageInlineSizeLimit = parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT || '10000')
const ConfigEnvWebpackPlugin = require('config-env-webpack-plugin')

module.exports = function (webpackEnv) {
  // const isEnvDevelopment = process.env.NODE_ENV === 'development'
  const isEnvProduction = process.env.NODE_ENV.includes('production')
  // console.log('process.env.NODE_ENV', process.env.NODE_ENV)

  return {
    mode: isEnvProduction ? 'production' : 'development',
    target: 'web',
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        process: 'process/browser',
        '@': path.join(__dirname, '../src'),
      },
    },
    output: {
      assetModuleFilename: 'static/media/[hash][ext][query]',
    },
    cache: {
      type: 'filesystem', // 使用文件缓存, 加快启动速度/打包速度
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: [/\.avif$/],
              type: 'asset',
              parser: {
                dataUrlCondition: {
                  maxSize: 20 * 1024, // 20kb
                },
              },
            },
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              type: 'asset',
              parser: {
                dataUrlCondition: {
                  maxSize: 20 * 1024, // 20kb
                },
              },
            },
            {
              test: /\.(ts|js)x?$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader?cacheDirectory=true',
              },
            },
            {
              test: /\.css$/,
              include: /\.module\.css$/,
              use: [
                {
                  loader: isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                  options: isEnvProduction
                    ? {
                        publicPath: '../../',
                      }
                    : {},
                },
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                    modules: true,
                  },
                },
              ],
            },
            {
              test: /\.css$/,
              exclude: /\.module\.css$/,
              use: [
                {
                  loader: isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                  options: isEnvProduction
                    ? {
                        publicPath: '../../',
                      }
                    : {},
                },
                {
                  loader: 'css-loader',
                },
                {
                  loader: 'postcss-loader',
                },
              ],
            },
            {
              test: /\.less$/,
              use: [
                {
                  loader: isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                  options: isEnvProduction
                    ? {
                        publicPath: '../../',
                      }
                    : {},
                },
                {
                  loader: 'css-loader',
                  options: {
                    // sourceMap: true,
                    // modules: true,
                    // localIdentName: "[local]___[hash:base64:5]",
                  },
                },
                {
                  loader: 'postcss-loader',
                },
                {
                  loader: 'less-loader',
                  options: {
                    lessOptions: {
                      javascriptEnabled: true,
                    },
                  },
                },
              ],
            },
            {
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              type: 'asset/resource',
            },
          ],
        },
      ],
    },
    plugins: [
      new ConfigEnvWebpackPlugin(),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '../public', 'index.html'),
        favicon: 'public/favicon.ico',
      }),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
      new copyWebpackPlugin({
        patterns: [
          {
            from: path.join(__dirname, '../public'),
            to: './',
            filter: async (resourcePath) => {
              // console.log(resourcePath)
              const isIndexHtml = resourcePath.endsWith('/public/index.html')
              if (isIndexHtml) {
                return false
              }
              return true
            },
          },
        ],
      }),
      new AntdDayjsWebpackPlugin(),
    ],
  }
}

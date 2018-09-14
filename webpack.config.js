const path = require('path') // lấy đường dẫn tuyệt đối của thư mục
const Vendor = ['react', 'react-dom']
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpackServeWaitpage = require('webpack-serve-waitpage')
const historyFallback = require('connect-history-api-fallback')

const mode = process.env.WEBPACK_SERVE ? 'development' : 'production'

const history = options => (ctx, next) =>
  new Promise((resolve, reject) =>
    historyFallback(options)(
      ctx.req,
      ctx.res,
      err => (err ? reject(err) : resolve(next()))
    )
  )

const config = {
  mode,
  entry: {
    bundle: './src/index.js',
    vendor: Vendor
  },
  output: {
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        exclude: /node_modules/,
        test: /\.(js|jsx)$/
      },
      {
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
        test: /\.css$/
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new HardSourceWebpackPlugin(),
    new WebpackBuildNotifierPlugin({
      suppressCompileStart: false,
      suppressSuccess: false,
    }),
  ],
  serve: {
    port: 9000,
    hotClient: true,
    open: true,
    add(app, middleware, options) {
      app.use(webpackServeWaitpage(options, { theme: 'dark' }))
      app.use(history())
    },
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx'],
  }
}

module.exports = config;

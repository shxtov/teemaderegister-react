const CompressionPlugin = require('compression-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const BUILD_DIR = path.resolve(__dirname, './dist')
const SRC_DIR = path.resolve(__dirname, './src')

const PRODUCTION = process.env.NODE_ENV === 'production'

console.log('Running webpack in ' + process.env.NODE_ENV)

const entry = {
  app: [SRC_DIR + '/index.js'],
  // TODO add other vendor files
  vendor: ['react', 'react-dom', 'react-router-dom']
}

const plugins = [
  new ExtractTextPlugin('css/style-[contenthash:10].css'),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor'],
    minChunks: 1
  }),
  new HtmlWebpackPlugin({
    //hash: DEVELOPMENT ? true : false, // if needed to force remove caching issues while in dev
    template: SRC_DIR + '/index.html',
    minify: {
      collapseWhitespace: PRODUCTION ? true : false // this is for minifying HTML in PRODUCTION
    }
  })
]

// ANTD
const fs = require('fs')

const lessToJs = require('less-vars-to-js')
const themeVariables = lessToJs(
  fs.readFileSync(SRC_DIR + '/stylesheets/ant-default-vars.less', 'utf8')
)

if (PRODUCTION) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false,
        drop_console: true
      },
      minimize: true,
      sourceMap: true
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240, // only if file size > 10.24 kb
      minRatio: 0.8
    })
  )
}

const scssLoader = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader?sourceMap', 'sass-loader?sourceMap']
})

const devServer = {
  proxy: {
    // proxy URLs to backend development server
    '/api': 'http://localhost:3000'
  },
  host: 'localhost',
  port: 3446, // add preferred port
  contentBase: BUILD_DIR,
  compress: true,
  historyApiFallback: true,
  hot: true,
  inline: true,
  noInfo: true
}

module.exports = {
  devtool: PRODUCTION ? 'source-map' : 'source-map',
  stats: 'normal',
  entry: entry,
  plugins: plugins,
  //externals: {
  //	jquery: "jQuery" //jquery is external and available at the global variable jQuery
  //},
  module: {
    loaders: [
      {
        test: /\.js$/,
        //  loaders: ['babel-loader'],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [['import', { libraryName: 'antd', style: true }]]
          }
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['url-loader?limit=10240&name=media/[hash:10].[ext]'], // embed images size > 10kb
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: scssLoader,
        exclude: /node_modules/
      },
      // FOR ANTD1
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            query: {
              modifyVars: themeVariables
            }
          }
        ]
      }
    ]
  },
  output: {
    path: BUILD_DIR,
    publicPath: PRODUCTION ? '/' : '/',
    filename: PRODUCTION ? 'js/[name]-[hash:10].js' : 'js/[name].js'
  },
  devServer: devServer
}

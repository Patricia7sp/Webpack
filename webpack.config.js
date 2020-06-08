const modoDev = process.env.NODE_ENV !== 'production'
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports= {
  mode:  modoDev ? 'development' : 'production', // se for ModeDev realiza em modo de desenvolvimento e se nao realiza  o mode no modo de producao
  entry: './src/principal.js',
  output: {
    filename: 'principal.js',  
    path: __dirname + '/public' // pasta de destino que serao gravados os arquivos gerados
  },
  
  devServer: {
    contentBase: "./public",
    port: 3007,
  },

  plugins: [ // mudancas dos plugins
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
         cache: true,
         parallel: true // executando de uma forma mais rapida possivel
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  },
  module: {
    rules: [{
      test: /\.s?[ac]ss$/,
      use: [
           MiniCssExtractPlugin.loader,
          //'style-loader', //adiciona  css  a dom injetando a tag <style>
          'css-loader' , // interpreta @import, url() e imagem
          'sass-loader'
      ]
    }, {
       test: /\.(png|jpg|svg|jpg|gif)$/,
       use: ['file-loader']

    }]
  }
}
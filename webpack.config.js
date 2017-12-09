'use strict';

const { resolve } = require('path')

module.exports = {
  entry: './public/React/',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /jsx?$/,
        include: resolve(__dirname, './public/React'),
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};

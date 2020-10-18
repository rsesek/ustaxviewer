// Copyright 2020 Blue Static <https://www.bluestatic.org>
// This program is free software licensed under the GNU General Public License,
// version 3.0. The full text of the license can be found in LICENSE.txt.
// SPDX-License-Identifier: GPL-3.0-only

const path = require('path');
const webpack = require('webpack');

const ROOT = path.resolve(__dirname, 'src');

module.exports = {
  entry: {
    main: './src/index.tsx'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [
      ROOT,
      'node_modules'
    ]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['solid'] }
          },
          'ts-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              localsConvention: 'camelCaseOnly',
              modules: {
                localIdentName: '[path][name]_[local]_[hash:base64:2]'
              }
            }
          }
        ]
      }
    ]
  },

  devServer: {
    contentBase: 'public/'
  },

  devtool: 'eval-cheap-module-source-map',

  plugins: [
    new (require('html-webpack-plugin'))({
      inject: true,
      template: 'public/index.html'
    }),
  ]
};

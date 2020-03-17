#!/usr/bin/env ts-node
// Copyright 2020 Blue Static <https://www.bluestatic.org>
// This program is free software licensed under the GNU General Public License,
// version 3.0. The full text of the license can be found in LICENSE.txt.
// SPDX-License-Identifier: GPL-3.0-only

const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const isTypescript = process.argv[1].endsWith('ts');

const args = process.argv.slice(2);
if (args.length != 1) {
  throw new Error('Usage: ustaxviewer path/to/taxreturn');
}

const TAX_RETURN_PATH = path.resolve(args[0]);

const ROOT = (() => {
  let r = path.resolve(__dirname, '..');
  return isTypescript ? r : path.resolve(r, '..');
})();
const DISTROOT = path.resolve(__dirname);
const PUBLIC = path.resolve(ROOT, 'public');

const babelLoader = {
  loader: 'babel-loader',
  options: { presets: [ require('babel-preset-solid') ] }
};

const compiler = webpack({
  entry: {
    main: path.resolve(DISTROOT, isTypescript ? 'main.tsx' : 'main.jsx')
  },

  context: ROOT,

  mode: isTypescript ? 'development' : 'production',

  resolve: {
    extensions: [ '.tsx', '.ts', '.jsx', '.js' ],
    modules: [
      DISTROOT,
      'node_modules',
    ]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          babelLoader,
          'ts-loader'
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [ babelLoader ]
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
    contentBase: PUBLIC,
    port: 8488
  },

  devtool: 'cheap-module-eval-source-map',

  plugins: [
    new (require('html-webpack-plugin'))({
      inject: true,
      template: path.resolve(PUBLIC, 'index.html')
    }),
    new webpack.DefinePlugin({
      TAX_RETURN_PATH: JSON.stringify(TAX_RETURN_PATH),
    }),
  ]
});

const server = new WebpackDevServer(compiler, compiler.options.devServer);

server.listen(8488, 'localhost', () => {
  console.log(`ustaxviewer for ${TAX_RETURN_PATH} at http://localhost:8488`);
});

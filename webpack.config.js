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

  devtool: 'cheap-module-eval-source-map',

  plugins: [
    new (require('html-webpack-plugin'))({
      inject: true,
      template: 'public/index.html'
    }),
  ]
};

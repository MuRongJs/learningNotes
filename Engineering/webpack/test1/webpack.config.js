const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(jpg|png|bmp|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            esModule: false,
            name: '[hash:10].[ext]',
            limit: 8*1024
          }
        }, 'file-loader']
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({template: './src/index.html'})
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'static'),
    writeToDisk: true,
    port: 8080,
    open: true,
    compress: true,
    publicPath: '/assets'
  }
}
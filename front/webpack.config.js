const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/html/index.html",
  filename: "./index.html"
});

module.exports = {
  entry: './src/js/index.js',
  devServer: {
    watchOptions: {
        poll: true
    },
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
      }

    ]
  },
  plugins: [htmlWebpackPlugin]
};

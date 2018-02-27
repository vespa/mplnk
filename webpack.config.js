const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ["./src/js/App.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js"
  },
  devServer: {
    contentBase: "./dist",
    historyApiFallback: true,
  },
  resolve:{
      alias:{
        actions: path.resolve(__dirname, "src/js/actions/"),
        components: path.resolve(__dirname, "src/js/components/"),
        containers: path.resolve(__dirname, "src/js/containers/"),
        reducers: path.resolve(__dirname, "src/js/reducers/"),
        helpers: path.resolve(__dirname, "src/js/helpers/"),
        config: path.resolve(__dirname, "src/js/config/")
      }
  },
  module: {
    rules: [
      { 
        test: /\.json$/, 
        loader: "file-loader",
        options: {
          name: '[path][name].[ext]?[hash]',
        }   
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']          

      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
        { from: './src/img/' , to: "img/"}
    ]),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    //new UglifyJsPlugin()
  ]
};
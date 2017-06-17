var path = require("path");

module.exports = {
  // webpack folder's entry js - excluded from jekll's build process.
  entry: "./src/webpack/entry.js",
  output: {
    // we're going to put the generated file in the assets folder so jekyll will grab it.
      path: path.resolve('src/assets/js/'),
      filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
    ],
  },
  plugins: [],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.css'],
  }
};

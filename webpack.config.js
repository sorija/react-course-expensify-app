//load 'path' module for Node
const path = require('path');
//join in the absolute(current) path with local path('public')
console.log(path.join(__dirname, 'public'));

//entry point
//where to output final bundle
module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  //loader
  //tells webpack to run babel whenever it sees .js file
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.s?css$/, 
      //'use' allows to specify an array of loaders
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  //source map for debugging
  devtool: 'cheap-module-eval-source-map',
  //server
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    //tells dev-server that routing will be handled via client-side code
    //and it should return index.html for any 404
    historyApiFallback: true
  }
};

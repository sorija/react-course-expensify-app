const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');

  return {
    entry: './src/app.js',
    output: {
      //join in the absolute(current) path with local path('public')
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
        // define how extract will work (with what plugins)
        use: CSSExtract.extract({
          use: [
            // no longer need 'style-loader'(handled in-lining of styles)
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }]
    },
    plugins: [
      CSSExtract
    ],
    //source map for debugging
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    //server
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      //tells dev-server that routing will be handled via client-side code
      //and it should return index.html for any 404
      historyApiFallback: true
    }
  }
}


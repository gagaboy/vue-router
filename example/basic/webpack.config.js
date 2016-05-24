module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', './example/basic/example.js']
  },
  output: {
    path: './example/basic',
    filename: 'example.build.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        exclude: /node_modules|vue\/dist/,
        loader: 'babel?optional[]=runtime&loose=true'
      }
    ]
  },
  devtool: 'source-map'
}

const path = require('path')

module.exports = {
  entry: {
    popup: path.join(__dirname, 'src/components/popup/index.tsx'),
    eventPage: path.join(__dirname, 'src/eventPage.ts'),
    content: path.join(__dirname, 'src/components/content/index.tsx'),
  },
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: [
          // {
          //   loader: 'babel-loader',
          //   options: {
          //     cacheDirectory: true,
          //   },
          // },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // Creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // Translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // Compiles Sass to CSS
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
}

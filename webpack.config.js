// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // Change to 'production' for production builds
  entry: './src/index.ts',
  devtool: 'inline-source-map', // Useful for debugging
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'], // Resolve these file extensions
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Use a custom HTML template
    }),
  ],
  devServer: {
    static: './dist',
    open: true, // Automatically open the browser
  },
};

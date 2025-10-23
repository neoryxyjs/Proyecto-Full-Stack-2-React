export default {
  mode: 'development',
  module: {
    rules: [
      { 
        test: /\.[jt]sx?$/, 
        exclude: /node_modules/, 
        use: 'babel-loader' 
      }
    ]
  },
  resolve: { 
    extensions: ['.js', '.jsx', '.ts', '.tsx'] 
  },
  devtool: 'inline-source-map'
};


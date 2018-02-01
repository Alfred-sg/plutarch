module.exports = {
  entry: {
    index: './src/index.js',
  },
  extra: {
    dll: {
      include: ["react","react-dom","redux","react-redux","react-router","dva"]
    },
    // babelPlugins: [
    //   [ 
    //     require.resolve('babel-plugin-transform-runtime'),
    //     {
    //       "helpers": false,
    //       "polyfill": false,
    //       "regenerator": true,
    //       "moduleName": "babel-runtime"
    //     }
    //   ]
    // ]
  }
}
module.exports = {
  entry: {
    index: 'src/index'
  },
  module: {
    babel: {
      plugins: [
        [
          require.resolve('babel-plugin-import'),
          {
            "libraryName": "antd",
            "style": 'css'
          }
        ]
      ]
    }
  }
};
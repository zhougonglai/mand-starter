const path = require("path");
const resolve = file => path.resolve(__dirname, file);

module.exports = {
  css: {
    sourceMap: true,
    loaderOptions: {
      stylus: {
        import: [resolve("./src/assets/theme.custom")]
      }
    }
  },
  devServer: {
    proxy: "https://www.easy-mock.com/mock/5cbd107d08c37e59eb3df85f/api"
  },
  pwa: {
    workboxOptions: {
      importWorkboxFrom: "local"
    }
  }
};

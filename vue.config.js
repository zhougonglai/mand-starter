const path = require("path");
const resolve = file => path.resolve(__dirname, file);

const config = {
  productionSourceMap: false,
  css: {
    sourceMap: process.env.NODE_ENV === "development",
    loaderOptions: {
      stylus: {
        import: [resolve("./src/assets/theme.custom")]
      }
    }
  },
  devServer: {
    proxy: "http://ywm.nnn.com/",
    compress: true
  }
  // pwa: {
  //   assetsVersion: "2019/8/13-1",
  //   themeColor: "#C158FE",
  //   msTileColor: "#111A34",
  //   workboxOptions: {
  //     importWorkboxFrom: "local",
  //     cacheId: "nnplayer",
  //     skipWaiting: true,
  //     clientsClaim: true,
  //     exclude: ["index.html"],
  //     navigateFallback: "/sign/in",
  //     navigateFallbackWhitelist: [/^\/sign/]
  //   }
  // }
};

module.exports = config;

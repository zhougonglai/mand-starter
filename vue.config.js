const path = require("path");
const SkeletonWebpackPlugin = require("vue-skeleton-webpack-plugin");
const resolve = file => path.resolve(__dirname, file);

const config = {
  productionSourceMap: false,
  css: {
    // extract: true,
    sourceMap: process.env.NODE_ENV === "development",
    loaderOptions: {
      stylus: {
        import: [resolve("./src/assets/theme.custom")]
      }
    }
  },
  devServer: {
    proxy: {
      "/baseUrl": {
        target: "https://yuewanapi.nn.com"
      }
    },
    compress: true
  },
  configureWebpack: {
    plugins: [
      new SkeletonWebpackPlugin({
        webpackConfig: {
          entry: {
            app: path.join(__dirname, "./src/skeleton.js")
          }
        },
        minimize: true,
        quiet: true,
        router: {
          mode: "history",
          routes: [
            {
              path: "/",
              skeletonId: "skeleton-home"
            },
            {
              path: "/sign/in",
              skeletonId: "skeleton-sign"
            }
          ]
        }
      })
    ]
  }
  // https 前暂停使用
  // pwa: {
  //   assetsVersion: "2019/8/13-1",
  //   themeColor: "#C158FE",
  //   msTileColor: "#111A34",
  //   appleMobileWebAppCapable: "yes",
  //   appleMobileWebAppStatusBarStyle: "black",
  //   workboxOptions: {
  //     swDest: "sw.js",
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

const path = require("path");
const resolve = file => path.resolve(__dirname, file);

const config = {
  css: {
    sourceMap: true,
    loaderOptions: {
      stylus: {
        import: [resolve("./src/assets/theme.custom")]
      }
    }
  },
  devServer: {
    proxy: "http://ywm.nnn.com/",
    compress: true
  },

  pwa: {
    assetsVersion: "2019/8/13-1",
    themeColor: "#C158FE",
    msTileColor: "#111A34",
    workboxOptions: {
      importWorkboxFrom: "local",
      cacheId: "nnplayer",
      skipWaiting: true,
      clientsClaim: true,
      exclude: ["index.html"],
      navigateFallback: "/sign/in",
      navigateFallbackWhitelist: [/^\/sign/]
    }
  }
};

// const routers = {
//   "/": "nn约玩",
//   "/sign/in": "登录",
//   "/sign/up": "注册",
//   "/basic_info": "基本信息",
//   "/service_info": "服务信息"
// };

// const pluginOptions = {
//   prerenderSpa: {
//     registry: undefined,
//     renderRoutes: Object.keys(routers),
//     useRenderEvent: true,
//     headless: true,
//     onlyProduction: true,
//     postProcess: renderedRoute => {
//       // Defer scripts and tell Vue it's been server rendered to trigger hydration
//       renderedRoute.html = renderedRoute.html.replace(
//         /<title>[^<]*<\/title>/i,
//         "<title>" + routers[renderedRoute.route] + "</title>"
//       );
//       return renderedRoute;
//     }
//   }
// };

module.exports = config;
// module.exports =
//   process.env.NODE_ENV === "production"
//     ? Object.assign({}, config, { pluginOptions })
//     : config;

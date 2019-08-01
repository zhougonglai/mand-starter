const path = require("path");
const resolve = file => path.resolve(__dirname, file);

// const routers = {
//   "/": "nn约玩",
//   "/search": "找陪玩",
//   "/account": "我的",
//   "/binding": "绑定NN约玩账号",
//   "/sign/in": "登录",
//   "/sign/up": "注册",
//   "/basicinfo": "基本信息",
//   "/serviceinfo": "服务信息"
// };

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

  // pluginOptions: {
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
  // }
};

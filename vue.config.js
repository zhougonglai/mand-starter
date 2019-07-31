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
  },

  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        "/",
        "/home",
        "/search",
        "/account",
        "/binding",
        "/sign/in",
        "/sign/up",
        "/protocol",
        "/basicinfo",
        "/serviceinfo"
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    }
  }
};

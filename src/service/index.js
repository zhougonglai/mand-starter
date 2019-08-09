import axios from "axios";
import { Toast } from "mand-mobile";

import signApi from "./signApi";
import uploadApi from "./uploadApi";
import playerApi from "./playerApi";
import gameApi from "./gameApi";

const instance = axios.create({
  baseURL: "/baseUrl",
  timeout: 6000
});

instance.interceptors.request.use(
  config => {
    Toast.loading("加载中", 0, false);
    return config;
  },
  () => {
    Toast.hide();
    Toast.failed("请求错误, 请稍后再试!");
  }
);

instance.interceptors.response.use(
  res => {
    Toast.hide();
    return res.data;
  },
  () => {
    Toast.hide();
    Toast.failed("服务器响应失效");
  }
);

const Http = {};

const APIS = Object.assign({}, signApi, uploadApi, playerApi, gameApi);

for (let key in APIS) {
  let api = APIS[key];

  Http[key] = async function(params, isFormData = false, config = {}) {
    let newParams = {};

    if (params && isFormData) {
      newParams = new FormData();
      for (let key in params) {
        newParams.append(key, params[key]);
      }
    } else {
      newParams = params;
    }

    let response = {};

    if (
      api.method === "put" ||
      api.method === "post" ||
      api.method === "patch"
    ) {
      try {
        response = await instance[api.method](api.url, newParams, config);
      } catch (err) {
        response = err;
      }
    } else if (api.method === "delete" || api.method === "get") {
      config.params = newParams;
      try {
        response = await instance[api.method](api.url, config);
      } catch (err) {
        response = err;
      }
    }

    return response;
  };
}

export default Http;

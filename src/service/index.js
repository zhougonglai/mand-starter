import axios from "axios";
import store from "@/store";
import router from "@/router";
import { Toast } from "mand-mobile";

import signApi from "./signApi";
import uploadApi from "./uploadApi";
import playerApi from "./playerApi";
import gameApi from "./gameApi";
import wechat from "./wechat";

import MemberController from "./MemberController";
import OrderMemberController from "./OrderMemberController";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL
});

instance.interceptors.request.use(
  config => {
    Toast.hide();
    const { token } = store.getters;
    // const { loading } = store.state;
    if (token) config.headers["Authorization"] = token;
    // if (!loading) {
    //   Toast.loading("加载中", 0, false);
    //   store.dispatch("setLoading", true);
    // }
    return config;
  },
  err => {
    store.dispatch("setLoading", false);
    Toast.hide();
    Toast.failed("请求错误, 请稍后再试!");
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  res => {
    // store.dispatch("setLoading", false);
    // Toast.hide();
    const { rtnCode } = res.data;
    if (rtnCode && rtnCode === "999") {
      router.replace({
        name: "sign_in",
        query: { redirect: router.history.current.name }
      });
    }
    return res.data;
  },
  err => {
    // store.dispatch("setLoading", false);
    Toast.hide();
    Toast.failed("服务器响应失效");
    return Promise.reject(err);
  }
);

const Http = {};

const APIS = Object.assign(
  {},
  signApi,
  uploadApi,
  playerApi,
  gameApi,
  wechat,
  MemberController,
  OrderMemberController
);

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

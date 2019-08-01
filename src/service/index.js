import axios from "axios";

import signApi from "./signApi";

const instance = axios.create({
  baseURL: "https://www.easy-mock.com/mock/5cbd107d08c37e59eb3df85f/api",
  timeout: 6000
});

const Http = {};

for (let key in signApi) {
  let api = signApi[key];

  Http[key] = async function(params, isFormData = false, config = {}) {
    let newParams = {};

    if (params && isFormData) {
      newParams = new FormData();
      for (let key in newParams) {
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

import router from "./router";
import store from "./store";

const whiteList = ["home", "search", "sign_in", "sign_up", "forget_password"];

router.beforeEach((to, from, next) => {
  const { token } = store.getters;
  if (whiteList.indexOf(to.name) >= 0) {
    next();
  } else if (token) {
    next();
  } else {
    next({ name: "sign_in", query: { ...to.query, redirect: to.name } });
  }
});

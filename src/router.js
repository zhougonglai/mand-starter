import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    // to, from, savedPosition;
    return { y: 0 };
  },
  routes: [
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "root" */ "@/views/root/Root.vue"),
      children: [
        {
          path: "",
          name: "home",
          meta: {
            title: "首页",
            keepAlive: true
          },
          component: () =>
            import(/* webpackChunkName: "home" */ "@/views/root/Home.vue")
        },
        {
          path: "search",
          name: "search",
          meta: {
            title: "找陪玩",
            keepAlive: true
          },
          component: () =>
            import(/* webpackChunkName: "search" */ "@/views/root/Search.vue")
        },
        {
          path: "account",
          name: "account",
          meta: {
            title: "我的"
          },
          component: () =>
            import(/* webpackChunkName: "account" */ "@/views/root/Account.vue")
        }
      ]
    },
    {
      path: "/sign",
      name: "sign",
      component: () =>
        import(/* webpackChunkName: "sign" */ "@/views/sign/index.vue"),
      children: [
        {
          path: "in",
          name: "sign_in",
          meta: {
            title: "登录",
            keepAlive: true
          },
          component: () =>
            import(/* webpackChunkName: "sign_in" */ "@/views/sign/SignIn.vue")
        },
        {
          path: "up",
          name: "sign_up",
          meta: {
            title: "注册",
            keepAlive: true
          },
          component: () =>
            import(/* webpackChunkName: "sign_up" */ "@/views/sign/SignUp.vue")
        }
      ]
    },
    {
      path: "/forget_password",
      name: "forget_password",
      meta: {
        title: "找回密码"
      },
      component: () =>
        import(/* webpackChunkName: "forget_password" */ "@/views/sign/ForgetPassword.vue")
    }
  ]
});

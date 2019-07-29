import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "Root" */ "./views/root/Root.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () =>
            import(/* webpackChunkName: "Home" */ "./views/root/Home.vue")
        },
        {
          path: "search",
          name: "search",
          component: () =>
            import(/* webpackChunkName: "Search" */ "./views/root/Search.vue")
        },
        {
          path: "account",
          name: "account",
          component: () =>
            import(/* webpackChunkName: "Account" */ "./views/root/Account.vue")
        }
      ]
    },
    {
      path: "/binding",
      name: "binding",
      component: () =>
        import(/* webpackChunkName: "binding" */ "./views/Binding.vue")
    },
    {
      path: "/sign",
      name: "sign",
      component: () =>
        import(/* webpackChunkName: "Sign" */ "./views/sign/index.vue"),
      children: [
        {
          path: "in",
          name: "sign_in",
          component: () =>
            import(/* webpackChunkName: "SignIn" */ "./views/sign/SignIn.vue")
        },
        {
          path: "up",
          name: "sign_up",
          component: () =>
            import(/* webpackChunkName: "SignUp" */ "./views/sign/SignUp.vue")
        }
      ]
    }
  ]
});

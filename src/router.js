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
        import(/* webpackChunkName: "root" */ "@/views/root/Root.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () =>
            import(/* webpackChunkName: "home" */ "@/views/root/Home.vue")
        },
        {
          path: "search",
          name: "search",
          component: () =>
            import(/* webpackChunkName: "search" */ "@/views/root/Search.vue")
        },
        {
          path: "account",
          name: "account",
          component: () =>
            import(/* webpackChunkName: "account" */ "@/views/root/Account.vue")
        }
      ]
    },
    {
      path: "/binding",
      name: "binding",
      component: () =>
        import(/* webpackChunkName: "binding" */ "@/views/Binding.vue")
    },
    {
      path: "/basic_info",
      name: "basic_info",
      component: () =>
        import(/* webpackChunkName: "basic_info" */ "@/views/artboard/BasicInfo.vue")
    },
    {
      path: "/service_info",
      name: "service_info",
      component: () =>
        import(/* webpackChunkName: "service_info" */ "@/views/artboard/ServiceInfo.vue")
    },
    {
      path: "/result_page",
      name: "result_page",
      component: () =>
        import(/* webpackChunkName: "result_page" */ "@/views/artboard/ResultPage.vue")
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
          component: () =>
            import(/* webpackChunkName: "sign_in" */ "@/views/sign/SignIn.vue")
        },
        {
          path: "up",
          name: "sign_up",
          component: () =>
            import(/* webpackChunkName: "sign_up" */ "@/views/sign/SignUp.vue")
        }
      ]
    },
    {
      path: "/forget_password",
      name: "forget_password",
      component: () =>
        import(/* webpackChunkName: "forget_password" */ "@/views/sign/ForgetPassword.vue")
    }
  ]
});

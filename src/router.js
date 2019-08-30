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
      meta: {
        keepAlive: true
      },
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
            title: "我的",
            keepAlive: true
          },
          component: () =>
            import(/* webpackChunkName: "account" */ "@/views/root/Account.vue")
        }
      ]
    },
    {
      path: "/basic_info",
      name: "basic_info",
      meta: {
        title: "基本信息",
        keepAlive: true
      },
      component: () =>
        import(/* webpackChunkName: "basic_info" */ "@/views/artboard/BasicInfo.vue")
    },
    {
      path: "/service_info",
      name: "service_info",
      meta: {
        title: "服务信息",
        keepAlive: true
      },
      component: () =>
        import(/* webpackChunkName: "service_info" */ "@/views/artboard/ServiceInfo.vue")
    },
    {
      path: "/wallet",
      name: "wallet",
      meta: {
        title: "我的钱包",
        keepAlive: false
      },
      component: () =>
        import(/* webpackChunkName: "wallet" */ "@/views/account/Wallet.vue")
    },
    {
      path: "/account/details",
      name: "account_details",
      meta: {
        title: "个人资料",
        keepAlive: true
      },
      component: () =>
        import(/* webpackChunkName: "account_details" */ "@/views/account/Details.vue")
    },
    {
      path: "/account/nickname",
      name: "account_nickname",
      meta: {
        title: "昵称",
        keepAlive: true
      },
      component: () =>
        import(/* webpackChunkName: "account_nickname" */ "@/views/account/NickName.vue")
    },
    {
      path: "/account/avatar",
      name: "account_avatar",
      meta: {
        title: "上传头像",
        keepAlive: false
      },
      component: () =>
        import(/* webpackChunkName: "account_avatar" */ "@/views/account/Avatar.vue")
    },
    {
      path: "/result_page",
      name: "result_page",
      meta: {
        title: "陪玩入驻审核结果",
        keepAlive: false
      },
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
        title: "找回密码",
        keepAlive: false
      },
      component: () =>
        import(/* webpackChunkName: "forget_password" */ "@/views/sign/ForgetPassword.vue")
    }
    //  骨架屏 和 loading 测试路径
    // {
    //   path: "/loading",
    //   name: "loading",
    //   component: () => import("@/components/public/RouteLoading.vue")
    // },
    // {
    //   path: "/skeleton_sign",
    //   name: "skeleton_sign",
    //   component: () => import("@/components/skeleton/SkeletonSign.vue")
    // },
    // {
    //   path: "/skeleton_home",
    //   name: "skeleton_home",
    //   component: () => import("@/components/skeleton/SkeletonHome.vue")
    // }
  ]
});

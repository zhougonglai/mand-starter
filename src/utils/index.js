export default {
  appId: "wxb2050880192fddb7",
  wx_authorize() {
    window.open(
      `https://open.weixin.qq.com/connect/oauth2/authorize
       ?appid=wxb2050880192fddb7&redirect_uri=http://localhost:8080&response_type=code&scope=snsapi_userinfo#wechat_redirect
      `
    );
  }
};

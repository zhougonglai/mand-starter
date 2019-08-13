const SIGN_API = {
  login: {
    method: "post",
    url: "/member/login"
  },
  autoLogin: {
    method: "post",
    url: "/member/login-openId"
  },
  exchangeCode: {
    method: "get",
    url: "/wx/exchange-openId"
  },
  register: {
    method: "post",
    url: "/member/register"
  },
  findPwd: {
    method: "post",
    url: "/member/findPwd"
  },
  checkImageShow: {
    method: "get",
    url: "/verification/checkImageShow"
  },
  imgCode: {
    method: "get",
    url: "/verification/imgCode"
  },
  phoneAuthenticateNoLogin: {
    method: "post",
    url: "/verification/phoneAuthenticateNoLogin"
  }
};

export default SIGN_API;

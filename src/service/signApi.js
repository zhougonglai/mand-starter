const SIGN_API = {
  login: {
    method: "post",
    url: "/auth/login"
  },
  logout: {
    method: "post",
    url: "/auth/logout"
  },
  token: {
    method: "post",
    url: "/token"
  }
};

export default SIGN_API;

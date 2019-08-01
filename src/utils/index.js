// import axios from 'axios';

// axios.defaults.baseURL = ''

// export const request = axios;

export const appId = "wxb2050880192fddb7";
export const wx_authorize = () => {
  window.open(
    `
      https://open.weixin.qq.com/connect/oauth2/authorize
       ?appid=${appId}&redirect_uri=http://localhost:8080&response_type=code&scope=snsapi_userinfo#wechat_redirect
    `
  );
};
export const wxConfig = ({
  debug = true,
  appId,
  timestamp,
  nonceStr,
  signature
}) => {
  window.wx.config({
    debug,
    appId,
    timestamp,
    nonceStr,
    signature,
    jsApiList: [
      // “分享给朋友”及“分享到QQ”
      "updateAppMessageShareData",
      // “分享到朋友圈”及“分享到QQ空间”
      "updateTimelineShareData",
      // 分享到腾讯微博
      "onMenuShareWeibo",
      // 分享到QQ空间
      "onMenuShareQZone",
      // 开始录音
      "startRecord",
      // 停止录音
      "stopRecord",
      // 监听录音自动停止
      "onVoiceRecordEnd",
      // 播放语音
      "playVoice",
      // 暂停播放
      "pauseVoice",
      // 停止播放
      "stopVoice",
      // 监听语音播放完毕
      "onVoicePlayEnd",
      // 拍照或从手机相册中选图
      "chooseImage",
      // 预览图片接口
      "previewImage",
      // 关闭窗口
      "closeWindow"
    ]
  });
};

export const wxShareMessage = ({ title, desc, link, imgUrl }) => {
  window.wx.ready(() => {
    window.wx.updateAppMessageShareData({
      title,
      desc,
      link,
      imgUrl
    });
  });
};
export const wxShareTimeline = ({ title, link, imgUrl }) => {
  window.wx.ready(() => {
    window.wx.updateTimelineShareData({
      title,
      link,
      imgUrl
    });
  });
};

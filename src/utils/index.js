import device from "current-device";

export default {
  appId: "wxb2050880192fddb7",
  wx_authorize() {
    window.open(
      `https://open.weixin.qq.com/connect/oauth2/authorize
       ?appid=wxb2050880192fddb7&redirect_uri=http://localhost:8080&response_type=code&scope=snsapi_userinfo#wechat_redirect
      `
    );
  },
  wxConfig({ debug = true, appId, timestamp, nonceStr, signature }) {
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
  },
  wxShareMessage({ title, desc, link, imgUrl }) {
    window.wx.ready(() => {
      window.wx.updateAppMessageShareData({
        title,
        desc,
        link,
        imgUrl
      });
    });
  },
  wxShareTimeline({ title, link, imgUrl }) {
    window.wx.ready(() => {
      window.wx.updateTimelineShareData({
        title,
        link,
        imgUrl
      });
    });
  },
  getUserMedia: async constraints => {
    return await navigator.mediaDevices.getUserMedia(constraints);
  },
  device
};

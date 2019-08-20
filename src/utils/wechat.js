/**
 * 微信配置
 * @param {*} config
 */
export const wxConfig = ({
  debug = process.env.NODE_ENV !== "production",
  appId,
  timestamp,
  nonceStr,
  signature
}) => {
  window.wx.config({
    debug,
    appId,
    timestamp: parseInt(timestamp),
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
      // 上传录音
      "uploadVoice",
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
      // 上传语音接口
      "uploadVoice",
      // 拍照或从手机相册中选图
      "chooseImage",
      // 预览图片接口
      "previewImage",
      // 关闭窗口
      "closeWindow"
    ]
  });
};

/**
 *
 * @param {*} 分享朋友 | QQ
 */
export const wxShareMessage = ({
  title,
  desc,
  link,
  imgUrl,
  success = () => {}
}) => {
  window.wx.ready(() => {
    window.wx.updateAppMessageShareData({
      title,
      desc,
      link,
      imgUrl,
      success
    });
  });
};

/**
 * 分享朋友圈 / QQ空间
 * @param {*}
 */
export const wxShareTimeline = ({
  title,
  link,
  imgUrl,
  success = () => {}
}) => {
  window.wx.ready(() => {
    window.wx.updateTimelineShareData({
      title,
      link,
      imgUrl,
      success
    });
  });
};

/**
 *  微信环境判断
 */
export const isWx = () => navigator.userAgent.includes("MicroMessenger");

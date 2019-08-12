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

export const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
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

export const isWx = () => navigator.userAgent.includes("MicroMessenger");

export const round = (n, decimals = 0) =>
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

export const citys = [
  {
    value: "北京市",
    label: "北京市",
    children: [
      {
        value: "北京市",
        label: "北京市",
        children: [
          { value: "东城区", label: "东城区" },
          { value: "西城区", label: "西城区" },
          {
            value: "朝阳区",
            label: " 朝阳区"
          },
          { value: "丰台区", label: "丰台区" },
          { value: "石景山区", label: "石景山区" },
          {
            value: "海淀区",
            label: "海淀区"
          },
          { value: "顺义区", label: "顺义区" },
          { value: "通州区", label: "通州区" },
          {
            value: "大兴区",
            label: "大兴区"
          },
          { value: "房山区", label: "房山区" },
          { value: "门头沟区", label: "门头沟区" },
          {
            value: "昌平区",
            label: "昌平区"
          },
          { value: "平谷区", label: "平谷区" },
          { value: "密云区", label: "密云区" },
          {
            value: "怀柔 区",
            label: "怀柔区"
          },
          { value: "延庆区", label: "延庆区" }
        ]
      }
    ]
  },
  {
    value: "天津市",
    label: "天津市",
    children: [
      {
        value: "天津市",
        label: "天津市",
        children: [
          { value: "和平区", label: "和平区" },
          { value: "河东区", label: "河东区" },
          {
            value: "河西区",
            label: "河西区"
          },
          { value: "南开区", label: "南开区" },
          { value: "河北区", label: "河北区" },
          {
            value: "红桥区",
            label: "红桥区"
          },
          { value: "东丽区", label: "东丽区" },
          { value: "西青区", label: "西青区" },
          {
            value: "津南区",
            label: "津南区"
          },
          { value: "北辰区", label: "北辰区" },
          { value: "武清区", label: "武清区" },
          {
            value: "宝坻区",
            label: "宝坻区"
          },
          { value: "宁河区", label: "宁河区" },
          { value: "静海区", label: "静海区" },
          { value: "蓟州区", label: "蓟州区" },
          { value: "汉沽区", label: "汉沽区" },
          { value: "滨海新区", label: "滨海新区" }
        ]
      }
    ]
  },
  {
    value: "河北省",
    label: "河北省",
    children: [
      {
        value: "石家庄",
        label: "石家庄",
        children: [
          { value: "长安区", label: "长安区" },
          { value: "桥西区", label: "桥西区" },
          {
            value: "新华区",
            label: "新华区"
          },
          { value: "井陉矿区", label: "井陉矿区" },
          { value: "裕华区", label: "裕华区" },
          {
            value: "藁城区",
            label: "藁城区"
          },
          { value: "鹿泉区", label: "鹿泉区" },
          { value: "栾城区", label: "栾城区" },
          {
            value: "井陉县",
            label: "井陉县"
          },
          { value: "正定县", label: "正定县" },
          { value: "行唐县", label: "行唐县" },
          {
            value: "灵寿县",
            label: "灵寿县"
          },
          { value: "高邑县", label: "高邑县" },
          { value: "深泽县", label: "深泽县" },
          {
            value: "赞皇县",
            label: "赞皇县"
          },
          { value: "无极县", label: "无极县" },
          { value: "平山县", label: "平山县" },
          {
            value: "元氏县",
            label: "元氏县"
          },
          { value: "赵县", label: "赵县" },
          { value: "晋州市", label: "晋州市" },
          {
            value: "新乐市",
            label: "新乐市"
          },
          { value: "辛集市", label: "辛集市" }
        ]
      },
      {
        value: "唐山",
        label: "唐山",
        children: [
          { value: "路北区", label: "路北区" },
          { value: "路南区", label: "路南区" },
          {
            value: "古冶区",
            label: "古冶区"
          },
          { value: "开平区", label: "开平区" },
          { value: "丰南区", label: "丰南区" },
          {
            value: "丰润区",
            label: "丰润区"
          },
          { value: "曹妃甸区", label: "曹妃甸区" },
          { value: "滦县", label: "滦县" },
          {
            value: "滦南县",
            label: "滦南县"
          },
          { value: "乐亭县", label: "乐亭县" },
          { value: "迁西县", label: "迁西县" },
          {
            value: "玉田县",
            label: "玉田县"
          },
          { value: "遵化市", label: "遵化市" },
          { value: "迁安市", label: "迁安市" }
        ]
      },
      {
        value: "秦皇岛",
        label: "秦皇岛",
        children: [
          { value: "海港区", label: "海港区" },
          { value: "山海关区", label: "山海关区" },
          {
            value: "北戴河区",
            label: "北戴河区"
          },
          { value: "抚宁区", label: "抚宁区" },
          { value: "青 龙满族自治县", label: "青龙满族自治县" },
          {
            value: "昌黎县",
            label: "昌黎县"
          },
          { value: "卢龙县", label: "卢龙县" }
        ]
      },
      {
        value: "邯郸",
        label: "邯郸",
        children: [
          { value: "邯山区", label: "邯山区" },
          { value: "丛台区", label: "丛台区" },
          {
            value: "复兴区",
            label: "复兴区"
          },
          { value: "峰峰矿区", label: "峰峰矿区" },
          { value: "肥乡区", label: "肥乡区" },
          {
            value: "永年区",
            label: "永年区"
          },
          { value: "临漳县", label: "临漳县" },
          { value: "成安县", label: "成安县" },
          {
            value: "大名县",
            label: "大名县"
          },
          { value: "涉县", label: "涉县" },
          { value: "磁县", label: "磁县" },
          {
            value: "邱县",
            label: "邱县"
          },
          { value: "鸡泽县", label: "鸡泽县" },
          { value: "广平县", label: "广平县" },
          {
            value: "馆陶县",
            label: "馆陶县"
          },
          { value: "曲周县", label: "曲周县" },
          { value: "武安市", label: "武安市" },
          { value: "魏县", label: "魏县" }
        ]
      },
      {
        value: "邢台",
        label: "邢台",
        children: [
          { value: "桥东区", label: "桥东区" },
          { value: "桥西区", label: "桥西区" },
          {
            value: "邢台县",
            label: "邢台县"
          },
          { value: "临城县", label: "临城县" },
          { value: "内丘县", label: "内丘县" },
          {
            value: "柏乡县",
            label: "柏乡县"
          },
          { value: "隆 尧县", label: "隆尧县" },
          { value: "任县", label: "任县" },
          {
            value: "南和县",
            label: "南和县"
          },
          { value: "巨鹿县", label: "巨鹿县" },
          { value: "新河县", label: "新河县" },
          {
            value: "广宗县",
            label: "广宗县"
          },
          { value: "平 乡县", label: "平乡县" },
          { value: "威县", label: "威县" },
          {
            value: "清河县",
            label: "清河县"
          },
          { value: "临西县", label: "临西县" },
          { value: "南宫市", label: "南宫市" },
          {
            value: "沙河市",
            label: "沙河市"
          },
          { value: "宁 晋县", label: "宁晋县" }
        ]
      },
      {
        value: "保定",
        label: "保定",
        children: [
          { value: "竞秀区", label: "竞秀区" },
          { value: "莲池区", label: "莲池区" },
          {
            value: "满城区",
            label: "满城区"
          },
          { value: "清苑区", label: "清苑区" },
          { value: "徐水区", label: "徐水区" },
          {
            value: "涞水县",
            label: "涞水县"
          },
          { value: "阜平县", label: "阜平县" },
          { value: "定兴县", label: "定兴县" },
          {
            value: "唐县",
            label: "唐县"
          },
          { value: "高阳县", label: "高阳县" },
          { value: "容城县", label: "容城县" },
          {
            value: "涞源县",
            label: "涞源县"
          },
          { value: "望都县", label: "望都县" },
          { value: "安新县", label: "安新县" },
          {
            value: "易县",
            label: "易县"
          },
          { value: "曲阳县", label: "曲阳县" },
          { value: "蠡县", label: "蠡县" },
          {
            value: "顺平县",
            label: "顺平县"
          },
          { value: "博野县", label: "博野县" },
          { value: "雄县", label: "雄县" },
          {
            value: "安国市",
            label: "安国市"
          },
          { value: "高碑店市", label: "高碑店市" },
          { value: "涿州市", label: "涿州市" },
          { value: "定州市", label: "定州市" }
        ]
      },
      {
        value: "张家口",
        label: "张家口",
        children: [
          { value: "桥东区", label: "桥东区" },
          { value: "桥西区", label: "桥西区" },
          {
            value: "宣化区",
            label: "宣化区"
          },
          { value: "下花园区", label: "下花园区" },
          { value: "崇礼区", label: "崇礼区" },
          {
            value: "万全区",
            label: "万全区"
          },
          { value: "张北县", label: "张北县" },
          { value: "康保县", label: "康保县" },
          {
            value: "沽源县",
            label: "沽源县"
          },
          { value: "尚义县", label: "尚义县" },
          { value: "蔚县", label: "蔚县" },
          {
            value: "阳原县",
            label: "阳原县"
          },
          { value: "怀安县", label: "怀安县" },
          { value: "涿鹿县", label: "涿鹿县" },
          {
            value: "赤城县",
            label: "赤城县"
          },
          { value: "怀来县", label: "怀来县" }
        ]
      },
      {
        value: "承德",
        label: "承德",
        children: [
          { value: "双桥区", label: "双桥区" },
          { value: "双滦区", label: "双滦区" },
          {
            value: "鹰手营子矿区",
            label: "鹰手营子矿 区"
          },
          { value: "承德县", label: "承德县" },
          { value: "兴隆县", label: "兴隆县" },
          {
            value: "滦平县",
            label: "滦平县"
          },
          { value: "隆化县", label: "隆化县" },
          { value: "丰宁满族自治县", label: "丰宁满族自治县" },
          {
            value: "宽城满族自治县",
            label: "宽城满族自治县"
          },
          { value: "围场满族蒙古族自治县", label: "围场满族蒙古族自治县" },
          { value: "平泉市", label: "平泉市" }
        ]
      },
      {
        value: "沧州",
        label: "沧州",
        children: [
          { value: "运河区", label: "运河区" },
          { value: "新华区", label: "新华区" },
          {
            value: "沧县",
            label: "沧县"
          },
          { value: "青县", label: "青县" },
          { value: "东光县", label: "东光县" },
          {
            value: "海兴县",
            label: "海兴县"
          },
          { value: "盐山县", label: "盐山县" },
          { value: "肃宁县", label: "肃宁县" },
          {
            value: "南皮县",
            label: "南皮县"
          },
          { value: "吴桥县", label: "吴桥县" },
          { value: "献县", label: "献县" },
          {
            value: "孟村回族自治县",
            label: "孟村回族自治县"
          },
          { value: "泊头市", label: "泊头市" },
          { value: "黄骅市", label: "黄骅市" },
          {
            value: "河间市",
            label: "河间市"
          },
          { value: "任丘市", label: "任丘市" }
        ]
      },
      {
        value: "廊坊",
        label: "廊坊",
        children: [
          { value: "广阳区", label: "广阳区" },
          { value: "安次区", label: "安次区" },
          {
            value: "固安县",
            label: "固安县"
          },
          { value: "永清县", label: "永清县" },
          { value: "香河县", label: "香河县" },
          {
            value: "大城县",
            label: "大城县"
          },
          { value: "文安县", label: "文安县" },
          { value: " 大厂回族自治县", label: "大厂回族自治县" },
          {
            value: "霸州市",
            label: "霸州市"
          },
          { value: "三河市", label: "三河市" }
        ]
      },
      {
        value: "衡水",
        label: "衡水",
        children: [
          { value: "桃城区", label: "桃城区" },
          { value: "冀州区", label: "冀州区" },
          {
            value: "枣强县",
            label: "枣强县"
          },
          { value: "武邑县", label: "武邑县" },
          { value: "武强县", label: "武强县" },
          {
            value: "饶阳县",
            label: "饶阳县"
          },
          { value: "安平县", label: "安平县" },
          { value: "故城县", label: "故城县" },
          {
            value: "阜城县",
            label: "阜城县"
          },
          { value: "深州市", label: "深州市" },
          { value: "景县", label: "景县" }
        ]
      }
    ]
  },
  {
    value: "山西省",
    label: "山西省",
    children: [
      {
        value: "太原",
        label: "太原",
        children: [
          { value: "小店区", label: "小店区" },
          { value: "迎泽区", label: "迎泽区" },
          {
            value: "杏花岭区",
            label: "杏花岭区"
          },
          { value: "尖草坪区", label: "尖草坪区" },
          { value: "万柏林区", label: "万柏林区" },
          {
            value: "晋源区",
            label: "晋源区"
          },
          { value: "清徐县", label: "清徐县" },
          { value: "阳曲县", label: "阳曲县" },
          {
            value: "娄烦县",
            label: "娄烦县"
          },
          { value: "古交市", label: "古交市" }
        ]
      },
      {
        value: "大同",
        label: "大同",
        children: [
          { value: "平城区", label: "平城区" },
          { value: "云冈区", label: "云冈区" },
          { value: "矿区", label: "矿区" },
          { value: "南郊区", label: "南郊区" },
          {
            value: "云州区",
            label: "云州区"
          },
          { value: "新荣区", label: "新荣区" },
          { value: "阳高县", label: "阳高县" },
          {
            value: "天镇县",
            label: "天镇县"
          },
          { value: "广灵县", label: "广灵县" },
          { value: "灵丘县", label: "灵丘县" },
          {
            value: "浑源县",
            label: "浑源县"
          },
          { value: "左云县", label: "左云县" }
        ]
      },
      {
        value: "朔州",
        label: "朔州",
        children: [
          { value: "朔城区", label: "朔城区" },
          { value: "平鲁区", label: "平鲁区" },
          {
            value: "山阴县",
            label: "山阴县"
          },
          { value: "应县", label: "应县" },
          { value: "右玉县", label: "右玉县" },
          { value: "怀仁市", label: "怀仁市" }
        ]
      },
      {
        value: "忻州",
        label: "忻 州",
        children: [
          { value: "忻府区", label: "忻府区" },
          { value: "定襄县", label: "定襄县" },
          {
            value: "五台县",
            label: "五台县"
          },
          { value: "代县", label: "代县" },
          { value: "繁峙县", label: "繁峙县" },
          {
            value: "宁武县",
            label: "宁武县"
          },
          { value: "静乐县", label: "静乐县" },
          { value: "神池县", label: "神池县" },
          {
            value: "五寨县",
            label: "五寨县"
          },
          { value: "岢岚县", label: "岢岚县" },
          { value: "河曲县", label: "河曲县" },
          {
            value: "保德县",
            label: "保德县"
          },
          { value: "偏关县", label: "偏关县" },
          { value: "原平市", label: "原平市" }
        ]
      },
      {
        value: "阳泉",
        label: "阳泉",
        children: [
          { value: "城区", label: "城区" },
          { value: "矿区", label: "矿区" },
          {
            value: "郊区",
            label: "郊区"
          },
          { value: "平定县", label: "平定县" },
          { value: "盂县", label: "盂县" }
        ]
      },
      {
        value: "吕梁",
        label: "吕梁",
        children: [
          { value: "离石区", label: "离石区" },
          { value: "文水县", label: "文水县" },
          {
            value: "交城县",
            label: "交城县"
          },
          { value: "兴县", label: "兴县" },
          { value: "临县", label: "临县" },
          {
            value: "柳林县",
            label: "柳林县"
          },
          { value: "石楼县", label: "石楼县" },
          { value: "岚县", label: "岚县" },
          {
            value: "方山县",
            label: "方山县"
          },
          { value: "中阳县", label: "中阳县" },
          { value: "交口县", label: "交口县" },
          {
            value: "孝义市",
            label: "孝义市"
          },
          { value: "汾阳市", label: "汾阳市" }
        ]
      },
      {
        value: "晋中",
        label: "晋中",
        children: [
          { value: "榆次区", label: "榆次区" },
          { value: "榆社县", label: "榆社县" },
          {
            value: "左权县",
            label: "左权县"
          },
          { value: "和顺县", label: "和顺县" },
          { value: "昔阳县", label: "昔阳县" },
          {
            value: "寿阳县",
            label: "寿阳县"
          },
          { value: "太谷县", label: "太谷县" },
          { value: "祁县", label: "祁县" },
          {
            value: "平遥县",
            label: "平遥县"
          },
          { value: "灵石县", label: "灵石县" },
          { value: "介休市", label: "介休市" }
        ]
      },
      {
        value: "长治",
        label: "长治",
        children: [
          { value: "潞州区", label: "潞州区" },
          { value: "潞城区", label: "潞城区" },
          {
            value: "屯留区",
            label: "屯留区"
          },
          { value: "上党区", label: "上党区" },
          { value: "襄垣县", label: "襄垣县" },
          {
            value: "平顺县",
            label: " 平顺县"
          },
          { value: "黎城县", label: "黎城县" },
          { value: "壶关县", label: "壶关县" },
          {
            value: "长子县",
            label: "长子县"
          },
          { value: "武乡县", label: "武乡县" },
          { value: "沁县", label: "沁县" },
          { value: "沁源县", label: " 沁源县" },
          { value: "长治县", label: " 长治县" },
          { value: "城区", label: " 城区" }
        ]
      },
      {
        value: "晋城",
        label: "晋城",
        children: [
          { value: "城区", label: "城区" },
          { value: "沁水县", label: "沁水县" },
          {
            value: "阳城县",
            label: "阳城县"
          },
          { value: "陵川县", label: "陵川县" },
          { value: "泽州县", label: "泽州县" },
          { value: "高平市", label: "高平市" }
        ]
      },
      {
        value: "临汾",
        label: "临汾",
        children: [
          { value: "尧都区", label: "尧都区" },
          { value: "曲沃县", label: "曲沃县" },
          {
            value: "翼城县",
            label: "翼城县"
          },
          { value: "襄汾县", label: "襄汾县" },
          { value: "洪洞县", label: "洪洞县" },
          {
            value: "古县",
            label: "古县"
          },
          { value: "安泽县", label: "安泽县" },
          { value: "浮山县", label: "浮山县" },
          {
            value: "吉县",
            label: "吉县"
          },
          { value: "乡宁县", label: "乡宁县" },
          { value: "大宁县", label: "大宁县" },
          {
            value: "隰县",
            label: "隰县"
          },
          { value: "永和县", label: "永和县" },
          { value: "蒲县", label: "蒲县" },
          {
            value: "汾西县",
            label: "汾西县"
          },
          { value: "侯马市", label: "侯马市" },
          { value: "霍州市", label: "霍州市" }
        ]
      },
      {
        value: "运城",
        label: "运城",
        children: [
          { value: "盐湖区", label: "盐湖区" },
          { value: "临猗县", label: "临猗县" },
          {
            value: "万荣县",
            label: "万荣县"
          },
          { value: "闻喜县", label: "闻喜县" },
          { value: "稷山县", label: "稷山县" },
          {
            value: "新绛县",
            label: "新绛县"
          },
          { value: "绛县", label: "绛县" },
          { value: "垣曲县", label: "垣曲县" },
          {
            value: "夏县",
            label: "夏县"
          },
          { value: "平陆县", label: "平陆县" },
          { value: "芮城县", label: "芮城县" },
          {
            value: "永济市",
            label: "永济市"
          },
          { value: "河津市", label: "河津市" }
        ]
      }
    ]
  },
  {
    value: "内蒙古自治区",
    label: "内蒙古自治区",
    children: [
      {
        value: "呼和浩特",
        label: "呼和浩特",
        children: [
          { value: "回民区", label: "回民区" },
          { value: "新城区", label: "新城区" },
          {
            value: "玉泉区",
            label: "玉泉区"
          },
          { value: "赛罕区", label: "赛罕区" },
          { value: "土默特左旗", label: "土默特左旗" },
          {
            value: "托克托县",
            label: "托克托县"
          },
          { value: "和林格尔县", label: "和林格尔县" },
          { value: "武川县", label: "武川县" },
          { value: "清水河县", label: "清水河县" }
        ]
      },
      {
        value: "包头",
        label: "包头",
        children: [
          { value: "昆都仑区", label: "昆都仑区" },
          { value: "东河区", label: "东河区" },
          {
            value: "青山区",
            label: "青山区"
          },
          { value: "石拐区", label: "石拐区" },
          { value: "九原区", label: "九原区" },
          {
            value: "白云鄂博矿区",
            label: "白云鄂博矿区"
          },
          { value: "土默特右旗", label: "土默特右旗" },
          { value: "固阳县", label: "固阳县" },
          {
            value: "达尔罕茂明安联合旗",
            label: "达尔罕茂明安联合旗"
          }
        ]
      },
      {
        value: "乌海",
        label: "乌海",
        children: [
          { value: "海勃湾区", label: "海勃湾区" },
          { value: "海南区", label: "海南区" },
          {
            value: "乌达区",
            label: "乌达区"
          }
        ]
      },
      {
        value: "赤峰",
        label: "赤峰",
        children: [
          { value: "红山区", label: "红山区" },
          { value: "元宝山区", label: "元宝山区" },
          {
            value: "松山区",
            label: "松山区"
          },
          { value: "阿鲁科尔沁旗", label: "阿鲁科尔沁旗" },
          { value: "巴林左旗", label: "巴林左旗" },
          {
            value: "巴林右旗",
            label: "巴林右旗"
          },
          { value: "林西县", label: "林西县" },
          { value: "克什克腾旗", label: "克什克腾旗" },
          {
            value: "翁牛特旗",
            label: "翁牛特旗"
          },
          { value: "喀喇沁旗", label: "喀喇沁旗" },
          { value: "宁城县", label: "宁城县" },
          { value: "敖汉旗", label: "敖汉旗" }
        ]
      },
      {
        value: "通辽",
        label: "通辽",
        children: [
          { value: "科尔沁区", label: "科尔沁区" },
          { value: "霍林郭勒市", label: "霍林郭勒市" },
          {
            value: "科尔沁左翼中旗",
            label: "科尔沁左翼中旗"
          },
          { value: "科尔沁左翼后旗", label: "科尔沁左翼后旗" },
          { value: "开鲁县", label: "开鲁县" },
          {
            value: "库伦旗",
            label: "库伦旗"
          },
          { value: "奈曼旗", label: "奈曼旗" },
          { value: "扎鲁特旗", label: "扎鲁特旗" }
        ]
      },
      {
        value: "鄂尔多斯",
        label: "鄂尔多斯",
        children: [
          { value: "康巴什区", label: "康巴什区" },
          { value: "东胜区", label: "东胜区" },
          {
            value: "准格尔旗",
            label: "准格尔旗"
          },
          { value: "达拉特旗", label: "达拉特旗" },
          { value: "鄂托克前旗", label: "鄂托克前旗" },
          {
            value: "鄂托克旗",
            label: "鄂托克旗"
          },
          { value: "杭锦旗", label: "杭锦旗" },
          { value: "乌审旗", label: "乌审旗" },
          { value: "伊金霍洛旗", label: "伊金霍洛旗" }
        ]
      },
      {
        value: "呼伦贝尔",
        label: "呼伦贝尔",
        children: [
          { value: "海拉尔区", label: "海拉尔区" },
          { value: "扎 赉诺尔区", label: "扎赉诺尔区" },
          {
            value: "满洲里市",
            label: "满洲里市"
          },
          { value: "牙克石市", label: "牙克石市" },
          { value: "扎兰屯市", label: "扎兰屯市" },
          {
            value: "额尔古纳市",
            label: "额尔古纳市"
          },
          { value: "根河市", label: "根河市" },
          { value: "阿荣旗", label: "阿荣旗" },
          {
            value: "鄂伦春自治旗",
            label: "鄂伦春自治旗"
          },
          { value: "莫力达瓦达斡尔族自治旗", label: "莫力达瓦达斡尔族��治旗" },
          {
            value: "鄂温克族自治旗",
            label: "鄂温克族自治旗"
          },
          { value: "陈巴尔虎旗", label: "陈巴尔虎旗" },
          { value: "新巴尔虎左旗", label: "新巴尔虎左旗" },
          {
            value: "新巴尔虎右旗",
            label: "新巴尔虎右旗"
          }
        ]
      },
      {
        value: "巴彦淖尔",
        label: "巴彦淖尔",
        children: [
          { value: "临河区", label: "临河区" },
          { value: "五原县", label: "五原县" },
          {
            value: "磴口县",
            label: "磴口县"
          },
          { value: "乌拉特前旗", label: "乌拉特前旗" },
          { value: "乌拉特中旗", label: "乌拉特中旗" },
          {
            value: "乌拉特后旗",
            label: "乌拉特后旗"
          },
          { value: "杭锦后旗", label: "杭锦后旗" }
        ]
      },
      {
        value: "乌兰察布",
        label: "乌兰察布",
        children: [
          { value: "集宁区", label: "集宁区" },
          { value: "丰镇市", label: "丰镇市" },
          {
            value: "卓资县",
            label: "卓资县"
          },
          { value: " 化德县", label: "化德县" },
          { value: "商都县", label: "商都县" },
          {
            value: "兴和县",
            label: "兴和县"
          },
          { value: "凉城县", label: "凉城县" },
          { value: "察哈尔右翼前旗", label: "察哈尔右翼前旗" },
          {
            value: "察哈尔右翼中旗",
            label: "察哈尔右翼中旗"
          },
          { value: "察哈尔右翼后旗", label: "察哈尔右翼后旗" },
          { value: "四子王旗", label: "四子王旗" }
        ]
      },
      {
        value: "兴安盟",
        label: "兴安盟",
        children: [
          { value: "乌兰浩特市", label: "乌兰浩特市" },
          { value: "阿尔山市", label: "阿尔山市" },
          {
            value: "科尔沁右翼前旗",
            label: "科尔沁右翼前旗"
          },
          { value: "科尔沁右翼中旗", label: "科尔沁右翼中旗" },
          { value: "扎赉特旗", label: "扎赉特旗" },
          {
            value: "突泉县",
            label: "突泉县"
          }
        ]
      },
      {
        value: "锡林郭勒",
        label: "锡林郭勒",
        children: [
          { value: "锡林浩特市", label: "锡林浩特市" },
          { value: "二连浩特市", label: "二连浩特市" },
          {
            value: "阿巴嘎旗",
            label: "阿巴嘎旗"
          },
          { value: "苏尼特左旗", label: "苏尼特左旗" },
          { value: "苏尼特右旗", label: "苏尼特右旗" },
          {
            value: "东乌珠穆沁旗",
            label: "东乌珠穆沁旗"
          },
          { value: "西乌珠穆沁旗", label: "西乌珠穆沁旗" },
          { value: "太仆寺旗", label: "太仆寺旗" },
          {
            value: "镶黄旗",
            label: "镶黄旗"
          },
          { value: "正镶白旗", label: "正镶白旗" },
          { value: "正蓝旗", label: "正蓝旗" },
          { value: "多伦县", label: "多伦县" }
        ]
      },
      {
        value: "阿拉善盟",
        label: "阿拉善盟",
        children: [
          { value: "阿拉善左旗", label: "阿拉善左旗" },
          { value: "阿拉善右旗", label: "阿拉善右旗" },
          {
            value: "额济纳旗",
            label: "额济纳旗"
          }
        ]
      }
    ]
  },
  {
    value: "辽宁省",
    label: "辽宁省",
    children: [
      {
        value: "沈阳",
        label: "沈阳",
        children: [
          { value: "和平区", label: "和平区" },
          { value: "沈河区", label: "沈河区" },
          {
            value: "大东区",
            label: "大东区"
          },
          { value: "皇姑区", label: "皇姑区" },
          { value: "铁西区", label: "铁西区" },
          {
            value: "苏家屯区",
            label: "苏家屯区"
          },
          { value: "浑南区", label: "浑南区" },
          { value: "沈北新区", label: "沈北新区" },
          {
            value: "于洪区",
            label: "于洪区"
          },
          { value: "辽中区", label: "辽中区" },
          { value: "新民市", label: "新民市" },
          {
            value: "康平县",
            label: "康平县"
          },
          { value: "法库县", label: "法库县" }
        ]
      },
      {
        value: "大连",
        label: "大连",
        children: [
          { value: "中山区", label: "中山区" },
          { value: "西岗区", label: "西岗区" },
          {
            value: "沙河口区",
            label: "沙河口区"
          },
          { value: "甘井子区", label: "甘井子区" },
          { value: "旅顺口区", label: "旅顺口区" },
          {
            value: "金州区",
            label: "金州区"
          },
          { value: "普兰店区", label: "普兰店区" },
          { value: "瓦房店市", label: "瓦房店市" },
          {
            value: "庄河市",
            label: "庄河市"
          },
          { value: "长海县", label: "长海县" }
        ]
      },
      {
        value: "鞍山",
        label: "鞍山",
        children: [
          { value: "铁东区", label: "铁东区" },
          { value: "铁西区", label: "铁西区" },
          {
            value: "立山区",
            label: "立山区"
          },
          { value: "千山区", label: "千山区" },
          { value: "海城市", label: "海城市" },
          {
            value: "台安县",
            label: "台安县"
          },
          { value: "岫岩满族自治县", label: "岫岩满族自治县" }
        ]
      },
      {
        value: "抚顺",
        label: "抚顺",
        children: [
          { value: "新抚区", label: "新抚区" },
          { value: "顺城区", label: "顺城区" },
          {
            value: "望花区",
            label: "望花区"
          },
          { value: "东洲区", label: "东洲区" },
          { value: "抚顺县", label: "抚顺县" },
          {
            value: "新宾满族自治县",
            label: "新宾满族自治县"
          },
          { value: "清原满族自治县", label: "清原满族自治县" }
        ]
      },
      {
        value: "本溪",
        label: "本溪",
        children: [
          { value: "平山区", label: "平山区" },
          { value: "溪湖区", label: "溪湖区" },
          {
            value: "明山区",
            label: "明山区"
          },
          { value: "南芬区", label: "南芬区" },
          { value: "本溪满族自治县", label: "本溪满族自治县" },
          {
            value: "桓仁满族自治县",
            label: "桓仁满族自治县"
          }
        ]
      },
      {
        value: "丹东",
        label: "丹东",
        children: [
          { value: "元宝区", label: "元宝区" },
          { value: "振兴区", label: "振兴区" },
          {
            value: "振安区",
            label: "振安区"
          },
          { value: "东港市", label: "东港市" },
          { value: "凤城市", label: "凤城市" },
          { value: "宽甸满族自治县", label: "宽甸满族自治县" }
        ]
      },
      {
        value: "锦州",
        label: "锦州",
        children: [
          { value: "古塔区", label: "古塔区" },
          { value: "凌河区", label: "凌河区" },
          {
            value: "太和区",
            label: "太和区"
          },
          { value: "凌海市", label: "凌海市" },
          { value: "北镇市", label: "北镇市" },
          {
            value: "黑山县",
            label: "黑山县"
          },
          { value: "义县", label: "义 县" }
        ]
      },
      {
        value: "营口",
        label: "营口",
        children: [
          { value: "站前区", label: "站前区" },
          { value: "西市区", label: "西市区" },
          {
            value: "鲅鱼圈区",
            label: "鲅鱼圈区"
          },
          { value: "老边区", label: "老边区" },
          { value: "盖州市", label: "盖州市" },
          { value: "大石桥市", label: "大石桥市" }
        ]
      },
      {
        value: "阜新",
        label: "阜新",
        children: [
          { value: "海州区", label: "海州区" },
          { value: "新邱区", label: "新邱区" },
          {
            value: "太平区",
            label: "太平区"
          },
          { value: "清河门区", label: "清河门区" },
          { value: "细河区", label: "细河区" },
          { value: "花园口经济区", label: "花园口经济区" },
          {
            value: "阜新蒙古族自治县",
            label: "阜新蒙古族自治县"
          },
          { value: "彰武县", label: "彰武县" }
        ]
      },
      {
        value: "辽阳",
        label: "辽阳",
        children: [
          { value: "白塔区", label: "白塔区" },
          { value: "文圣区", label: "文圣区" },
          {
            value: "宏伟区",
            label: "宏伟区"
          },
          { value: "弓长岭区", label: "弓长岭区" },
          { value: "太子河区", label: "太子河区" },
          {
            value: "灯塔市",
            label: "灯塔市"
          },
          { value: "辽阳县", label: "辽阳县" }
        ]
      },
      {
        value: "盘锦",
        label: "盘锦",
        children: [
          { value: "双台子区", label: "双台子区" },
          { value: "兴隆台区", label: "兴隆台区" },
          {
            value: "大洼区",
            label: "大洼区"
          },
          { value: "盘山县", label: "盘山县" }
        ]
      },
      {
        value: "铁岭",
        label: "铁岭",
        children: [
          { value: "银州区", label: "银州区" },
          { value: "清河区", label: "清河区" },
          {
            value: "调兵山市",
            label: "调兵山市"
          },
          { value: "开原市", label: "开原市" },
          { value: "铁岭县", label: "铁岭县" },
          {
            value: "昌图县",
            label: "昌图县"
          },
          { value: "西丰县", label: "西丰县" }
        ]
      },
      {
        value: "朝阳",
        label: "朝阳",
        children: [
          { value: "双塔区", label: "双塔区" },
          { value: "龙城区", label: "龙城区" },
          {
            value: "北票市",
            label: "北票市"
          },
          { value: "凌源市", label: "凌源市" },
          { value: "朝阳县", label: "朝阳县" },
          {
            value: "建平县",
            label: "建平县"
          },
          { value: "喀喇沁左翼蒙古族自治县", label: "喀喇沁左翼蒙古族自治县" }
        ]
      },
      {
        value: "葫芦岛",
        label: "葫芦岛",
        children: [
          { value: "连山区", label: "连山区" },
          { value: "龙港区", label: "龙港区" },
          {
            value: "南票区",
            label: "南票区"
          },
          { value: "兴城市", label: "兴城市" },
          { value: "绥中县", label: "绥中县" },
          { value: "建昌县", label: "建昌县" }
        ]
      }
    ]
  },
  {
    value: "吉林省",
    label: "吉林省",
    children: [
      {
        value: "长春",
        label: "长春",
        children: [
          { value: "南关区", label: "南关区" },
          { value: "朝阳区", label: "朝阳区" },
          {
            value: "绿园区",
            label: "绿园区"
          },
          { value: "二道区", label: "二道区" },
          { value: "双阳区", label: "双阳区" },
          {
            value: "宽城区",
            label: "宽城区"
          },
          { value: "九台区", label: "九台区" },
          { value: "榆树市", label: "榆树市" },
          {
            value: "德惠市",
            label: "德惠市"
          },
          { value: "农安县", label: "农安县" }
        ]
      },
      {
        value: "吉林",
        label: "吉林",
        children: [
          { value: "船营区", label: "船营区" },
          { value: "龙潭区", label: "龙潭区" },
          {
            value: "昌邑区",
            label: "昌邑区"
          },
          { value: "丰满区", label: "丰满区" },
          { value: "磐石市", label: "磐石市" },
          {
            value: "桦甸市",
            label: "桦甸市"
          },
          { value: "蛟河市", label: "蛟河市" },
          { value: "舒兰市", label: "舒兰市" },
          { value: "永吉县", label: "永吉县" }
        ]
      },
      {
        value: "四平",
        label: "四平",
        children: [
          { value: "铁西区", label: "铁西区" },
          { value: "铁东区", label: "铁东区" },
          {
            value: "双辽市",
            label: "双辽市"
          },
          { value: "梨树县", label: "梨树县" },
          { value: "伊通满族自治县", label: "伊通满族自治县" }
        ]
      },
      { value: "公主岭", label: "公主岭" },
      {
        value: "辽源",
        label: "辽源",
        children: [
          { value: "龙山区", label: "龙山区" },
          { value: "西安区", label: "西安区" },
          {
            value: "东丰县",
            label: "东丰县"
          },
          { value: "东辽县", label: "东辽县" }
        ]
      },
      {
        value: "通化",
        label: "通化",
        children: [
          { value: "东昌区", label: "东昌区" },
          { value: "二道江区", label: "二道江区" },
          {
            value: "集安市",
            label: "集安市"
          },
          { value: "通化县", label: "通化县" },
          { value: "辉南县", label: "辉南县" },
          {
            value: "柳河县",
            label: "柳河县"
          },
          { value: "梅河口市", label: "梅河口市" }
        ]
      },
      {
        value: "白山",
        label: "白山",
        children: [
          { value: "浑江区", label: "浑江区" },
          { value: "江源区", label: "江源区" },
          {
            value: "临江市",
            label: "临江市"
          },
          { value: "抚松县", label: "抚松县" },
          { value: "靖宇县", label: "靖宇县" },
          {
            value: "长白朝鲜族自治县",
            label: "长白朝鲜族自治县"
          }
        ]
      },
      {
        value: "白城",
        label: "白城",
        children: [
          { value: "洮北区", label: "洮北区" },
          { value: "洮南市", label: "洮南市" },
          {
            value: "大安市",
            label: "大安市"
          },
          { value: "镇赉县", label: "镇赉县" },
          { value: "通榆县", label: "通榆县" }
        ]
      },
      {
        value: "松原",
        label: "松原",
        children: [
          { value: "宁江区", label: "宁江区" },
          { value: "扶余市", label: "扶余市" },
          {
            value: "乾安县",
            label: "乾安县"
          },
          { value: "长岭县", label: "长岭县" },
          { value: "前郭尔罗斯蒙古族自治县", label: "前郭尔罗斯蒙古族自治县" }
        ]
      },
      {
        value: "延边",
        label: "延边",
        children: [
          { value: "延吉市", label: "延吉市" },
          { value: "图们市", label: "图们市" },
          {
            value: "敦化市",
            label: "敦 化市"
          },
          { value: "和龙市", label: "和龙市" },
          { value: "珲春市", label: "珲春市" },
          {
            value: "龙井市",
            label: "龙井市"
          },
          { value: "汪清县", label: "汪清县" },
          { value: "安图县", label: "安图县" }
        ]
      }
    ]
  },
  {
    value: "黑龙江省",
    label: "黑龙江省",
    children: [
      {
        value: "哈尔滨",
        label: "哈尔滨",
        children: [
          { value: "道里区", label: "道里区" },
          { value: "南岗区", label: "南岗区" },
          {
            value: "道外区",
            label: "道外区"
          },
          { value: "平房区", label: "平房区" },
          { value: "松北区", label: "松北区" },
          {
            value: "香坊区",
            label: "香坊区"
          },
          { value: "呼兰区", label: "呼兰区" },
          { value: "阿城区", label: "阿城区" },
          {
            value: "双城区",
            label: "双城区"
          },
          { value: "依兰县", label: " 依兰县" },
          { value: "方正县", label: "方正县" },
          {
            value: "宾县",
            label: "宾县"
          },
          { value: "巴彦县", label: "巴彦县" },
          { value: "木兰县", label: "木兰县" },
          {
            value: "通河县",
            label: "通河县"
          },
          { value: "延寿县", label: " 延寿县" },
          { value: "尚志市", label: "尚志市" },
          { value: "五常市", label: "五常市" }
        ]
      },
      {
        value: "齐齐哈尔",
        label: "齐齐哈尔",
        children: [
          { value: "龙沙区", label: "龙沙区" },
          { value: "建华区", label: "建华区" },
          {
            value: "铁锋区",
            label: "铁锋区"
          },
          { value: "昂昂溪区", label: "昂昂溪区" },
          { value: "富拉尔基区", label: "富拉尔基区" },
          {
            value: "碾子山区",
            label: "碾子山区"
          },
          { value: "梅里斯达斡尔族区", label: "梅里斯达斡尔族区" },
          { value: "讷河市", label: "讷河市" },
          {
            value: "龙江县",
            label: "龙江县"
          },
          { value: "依安县", label: "依安县" },
          { value: "泰来县", label: "泰来县" },
          {
            value: "甘南县",
            label: "甘南县"
          },
          { value: "富裕县", label: "富裕县" },
          { value: "克山县", label: "克山县" },
          {
            value: "克东县",
            label: "克东县"
          },
          { value: "拜泉县", label: "拜泉县" }
        ]
      },
      {
        value: "牡丹江",
        label: "牡丹江",
        children: [
          { value: "东安区", label: "东安区" },
          { value: "阳明区", label: "阳明区" },
          {
            value: "爱民区",
            label: "爱民区"
          },
          { value: "西安区", label: "西安区" },
          { value: "东宁市", label: "东宁市" },
          {
            value: "林口县",
            label: "林口县"
          },
          { value: "绥芬河市", label: "绥芬河市" },
          { value: "海林市", label: "海林市" },
          {
            value: "宁安市",
            label: "宁安市"
          },
          { value: "穆棱市", label: "穆棱市" }
        ]
      },
      {
        value: "佳木斯",
        label: "佳木斯",
        children: [
          { value: "前进区", label: "前进区" },
          { value: "向阳区", label: "向阳区" },
          {
            value: "东风区",
            label: "东风区"
          },
          { value: "郊区", label: "郊区" },
          { value: "同江市", label: "同江市" },
          {
            value: "富锦市",
            label: "富锦市"
          },
          { value: "桦南县", label: "桦南县" },
          { value: "桦川县", label: "桦川县" },
          {
            value: "汤原县",
            label: "汤原县"
          },
          { value: "抚远市", label: "抚远市" }
        ]
      },
      {
        value: "大庆",
        label: "大庆",
        children: [
          { value: "萨尔图区", label: "萨尔图区" },
          { value: "龙凤区", label: "龙凤区" },
          {
            value: "让胡路区",
            label: "让胡路区"
          },
          { value: "红岗区", label: "红岗区" },
          { value: "大同区", label: "大同区" },
          {
            value: "肇州县",
            label: "肇州县"
          },
          { value: "肇源县", label: "肇源县" },
          { value: "林甸县", label: "林甸县" },
          {
            value: "杜尔伯特蒙古族自治县",
            label: "杜尔伯特蒙古族自治县"
          }
        ]
      },
      {
        value: "鸡西",
        label: "鸡西",
        children: [
          { value: "鸡冠区", label: "鸡冠区" },
          { value: "城子河区", label: "城子河区" },
          {
            value: "恒山区",
            label: "恒山区"
          },
          { value: "滴道区", label: "滴道区" },
          { value: "梨树区", label: "梨树区" },
          {
            value: "麻山区",
            label: "麻山区"
          },
          { value: "虎林市", label: "虎林市" },
          { value: "密山市", label: "密山市" },
          { value: "鸡东县", label: "鸡东县" }
        ]
      },
      {
        value: "双鸭山",
        label: "双鸭山",
        children: [
          { value: "尖山区", label: "尖山区" },
          { value: "岭东区", label: "岭东区" },
          {
            value: "四方台区",
            label: "四方台区"
          },
          { value: "宝山区", label: "宝山区" },
          { value: "集贤县", label: "集贤县" },
          {
            value: "友谊县",
            label: "友谊县"
          },
          { value: "宝清县", label: "宝清县" },
          { value: "饶河县", label: "饶河县" }
        ]
      },
      {
        value: "伊春",
        label: "伊春",
        children: [
          { value: "伊春区", label: "伊春区" },
          { value: "南岔区", label: "南岔区" },
          {
            value: "友好区",
            label: "友好区"
          },
          { value: "西林区", label: "西林区" },
          { value: "翠峦区", label: "翠峦区" },
          {
            value: "新青区",
            label: "新青区"
          },
          { value: "美溪区", label: "美溪区" },
          { value: "金山屯 区", label: "金山屯区" },
          {
            value: "五营区",
            label: "五营区"
          },
          { value: "乌马河区", label: "乌马河区" },
          { value: "汤旺河区", label: "汤旺河区" },
          {
            value: "带岭区",
            label: "带岭区"
          },
          { value: "乌伊岭区", label: "乌伊岭区" },
          { value: "红星区", label: "红星区" },
          {
            value: "上甘岭区",
            label: "上甘岭区"
          },
          { value: "嘉荫县", label: "嘉荫县" },
          { value: "铁力市", label: "铁力市" }
        ]
      },
      {
        value: "七台河",
        label: "七台河",
        children: [
          { value: "新兴区", label: "新兴区" },
          { value: "桃山区", label: "桃山区" },
          {
            value: "茄子河区",
            label: "茄子河区"
          },
          { value: "金沙新区", label: "金沙新区" },
          { value: "勃利县", label: "勃利县" }
        ]
      },
      {
        value: "鹤岗",
        label: "鹤岗",
        children: [
          { value: "兴山区", label: "兴山区" },
          { value: "向阳区", label: "向阳区" },
          {
            value: "工农区",
            label: "工农区"
          },
          { value: "南山区", label: "南山区" },
          { value: "兴安区", label: "兴安区" },
          {
            value: "东山区",
            label: " 东山区"
          },
          { value: "萝北县", label: "萝北县" },
          { value: "绥滨县", label: "绥滨县" }
        ]
      },
      {
        value: "黑河",
        label: "黑河",
        children: [
          { value: "爱辉区", label: "爱辉区" },
          { value: "北安市", label: "北安市" },
          {
            value: "五大连池市",
            label: "五大连池市"
          },
          { value: "嫩江县", label: "嫩江县" },
          { value: "孙吴县", label: "孙吴县" },
          { value: "逊克县", label: "逊克县" }
        ]
      },
      {
        value: "绥化",
        label: "绥化",
        children: [
          { value: "北林区", label: "北林区" },
          { value: "望奎县", label: "望奎县" },
          {
            value: "兰西县",
            label: "兰西县"
          },
          { value: "青冈县", label: "青冈县" },
          { value: "庆安县", label: "庆安县" },
          {
            value: "明水县",
            label: "明水县"
          },
          { value: "绥棱县", label: "绥 棱县" },
          { value: "安达市", label: "安达市" },
          {
            value: "肇东市",
            label: "肇东市"
          },
          { value: "海伦市", label: "海伦市" }
        ]
      },
      {
        value: "大兴安岭",
        label: "大兴安岭",
        children: [
          { value: "加格达奇区", label: "加格达奇区" },
          { value: "松岭区", label: "松岭区" },
          {
            value: "呼中区",
            label: "呼中区"
          },
          { value: "新林区", label: "新林区" },
          { value: "漠河市", label: "漠河市" },
          {
            value: "塔河县",
            label: "塔河县"
          },
          { value: "呼玛县", label: "呼玛县" }
        ]
      }
    ]
  },
  {
    value: "上海市",
    label: "上海市",
    children: [
      {
        value: "上海市",
        label: "上海市",
        children: [
          { value: "黄浦区", label: "黄浦区" },
          { value: "徐汇区", label: "徐汇区" },
          {
            value: "长宁区",
            label: "长宁区"
          },
          { value: "静安区", label: "静安区" },
          { value: "普陀区", label: "普陀区" },
          {
            value: "虹口区",
            label: "虹口区"
          },
          { value: "杨浦区", label: "杨浦区" },
          { value: "闵行区", label: "闵行区" },
          {
            value: "宝山区",
            label: "宝山区"
          },
          { value: "嘉定区", label: "嘉定区" },
          { value: "金山区", label: "金山区" },
          {
            value: "松江区",
            label: "松江区"
          },
          { value: "青浦区", label: "青浦区" },
          { value: "奉贤区", label: "奉贤区" },
          {
            value: "崇明区",
            label: "崇明区"
          },
          { value: "浦东新区", label: "浦东新区" }
        ]
      }
    ]
  },
  {
    value: "江苏省",
    label: "江苏省",
    children: [
      {
        value: "南京",
        label: "南京",
        children: [
          { value: "玄武区", label: "玄武区" },
          { value: "秦淮区", label: "秦淮区" },
          {
            value: "鼓楼区",
            label: "鼓楼区"
          },
          { value: "建邺 区", label: "建邺区" },
          { value: "栖霞区", label: "栖霞区" },
          {
            value: "雨花台区",
            label: "雨花台区"
          },
          { value: "江宁区", label: "江宁区" },
          { value: "浦口区", label: "浦口区" },
          {
            value: "六合区",
            label: "六合区"
          },
          { value: "溧水区", label: "溧水区" },
          { value: "高淳区", label: "高淳区" }
        ]
      },
      {
        value: "无锡",
        label: "无锡",
        children: [
          { value: "滨湖区", label: "滨湖区" },
          { value: "梁溪区", label: "梁溪区" },
          {
            value: "新吴区",
            label: "新吴 区"
          },
          { value: "锡山区", label: "锡山区" },
          { value: "惠山区", label: "惠山区" },
          {
            value: "江阴市",
            label: "江阴市"
          },
          { value: "宜兴市", label: "宜兴市" }
        ]
      },
      {
        value: "徐州",
        label: "徐州",
        children: [
          { value: "云龙区", label: "云龙区" },
          { value: "鼓楼区", label: "鼓楼区" },
          {
            value: "贾汪区",
            label: "贾汪区"
          },
          { value: "泉山区", label: "泉山区" },
          { value: "铜山区", label: "铜山区" },
          {
            value: "丰县",
            label: "丰县"
          },
          { value: "沛县", label: "沛县" },
          { value: "睢宁县", label: "睢宁县" },
          {
            value: "邳州市",
            label: "邳州市"
          },
          { value: "新沂市", label: "新沂市" }
        ]
      },
      {
        value: "常州",
        label: "常州",
        children: [
          { value: "天宁区", label: "天宁区" },
          { value: "钟楼区", label: "钟楼区" },
          {
            value: "新北区",
            label: "新北区"
          },
          { value: "武进区", label: "武进区" },
          { value: "金坛区", label: "金坛区" },
          { value: "溧阳市", label: "溧阳市" }
        ]
      },
      {
        value: "苏州",
        label: "苏州",
        children: [
          { value: "姑苏区", label: "姑苏区" },
          { value: "虎丘区", label: "虎丘区" },
          {
            value: "吴中区",
            label: "吴中区"
          },
          { value: "相城区", label: "相城区" },
          { value: "吴江区", label: "吴江区" },
          {
            value: "昆山市",
            label: "昆山市"
          },
          { value: "常熟市", label: "常熟市" },
          { value: "张家港市", label: "张家港市" },
          { value: "太仓市", label: "太仓市" }
        ]
      },
      {
        value: "南通",
        label: "南通",
        children: [
          { value: "崇川区", label: "崇川区" },
          { value: "港闸区", label: "港闸区" },
          {
            value: "通州区",
            label: "通州区"
          },
          { value: "如东县", label: "如东县" },
          { value: "如皋市", label: "如皋市" },
          {
            value: "海门市",
            label: "海门市"
          },
          { value: "启东市", label: "启东市" },
          { value: "海安市", label: "海安市" }
        ]
      },
      {
        value: "连云港",
        label: "连云港",
        children: [
          { value: "连云区", label: "连云区" },
          { value: "海州区", label: "海州区" },
          {
            value: "赣榆区",
            label: "赣榆区"
          },
          { value: "东海县", label: "东海县" },
          { value: "灌云县", label: "灌云县" },
          { value: "灌南县", label: "灌南县" }
        ]
      },
      {
        value: "淮安",
        label: "淮安",
        children: [
          { value: "清江浦区", label: "清江浦区" },
          { value: "淮安区", label: "淮安区" },
          {
            value: "淮阴区",
            label: "淮阴区"
          },
          { value: "洪泽区", label: "洪泽区" },
          { value: "涟水县", label: "涟水县" },
          {
            value: "盱眙县",
            label: "盱眙县"
          },
          { value: "金湖县", label: "金湖县" }
        ]
      },
      {
        value: "盐城",
        label: "盐城",
        children: [
          { value: "亭湖区", label: "亭湖区" },
          { value: "盐都区", label: "盐都区" },
          {
            value: "大丰区",
            label: "大丰区"
          },
          { value: "响水县", label: "响水县" },
          { value: "滨海县", label: "滨海县" },
          {
            value: "阜宁县",
            label: "阜宁县"
          },
          { value: "射阳县", label: "射阳县" },
          { value: "建湖县", label: "建湖县" },
          { value: "东台市", label: "东台市" }
        ]
      },
      {
        value: "扬州",
        label: "扬州",
        children: [
          { value: "广陵区", label: "广陵区" },
          { value: "邗江区", label: "邗江区" },
          {
            value: "江都区",
            label: "江都区"
          },
          { value: "宝应县", label: "宝应县" },
          { value: "仪征市", label: "仪征市" },
          { value: "高邮市", label: "高邮市" }
        ]
      },
      {
        value: "镇江",
        label: "镇江",
        children: [
          { value: "京口区", label: "京口区" },
          { value: "润州区", label: "润州区" },
          {
            value: "丹徒区",
            label: "丹徒区"
          },
          { value: "丹阳市", label: "丹阳市" },
          { value: "扬中市", label: "扬中市" },
          { value: "句容市", label: "句容市" }
        ]
      },
      {
        value: "泰州",
        label: "泰州",
        children: [
          { value: "海陵区", label: "海陵区" },
          { value: "高港区", label: "高港区" },
          {
            value: "姜堰区",
            label: "姜堰区"
          },
          { value: "兴化市", label: "兴化市" },
          { value: "靖江市", label: "靖江市" },
          { value: "泰兴市", label: "泰兴市" }
        ]
      },
      {
        value: "宿迁",
        label: "宿迁",
        children: [
          { value: "宿城区", label: "宿城区" },
          { value: "宿豫区", label: "宿豫区" },
          {
            value: "沭阳县",
            label: "沭阳县"
          },
          { value: "泗阳县", label: "泗阳县" },
          { value: "泗洪县", label: "泗洪县" }
        ]
      }
    ]
  },
  {
    value: "浙江省",
    label: "浙江省",
    children: [
      {
        value: "杭州",
        label: "杭州",
        children: [
          { value: "上城区", label: "上城区" },
          { value: "下城区", label: "下城区" },
          {
            value: "江干区",
            label: "江干区"
          },
          { value: "拱墅区", label: "拱墅区" },
          { value: "西湖区", label: "西湖区" },
          {
            value: "滨江区",
            label: "滨江区"
          },
          { value: "余杭区", label: "余杭区" },
          { value: "萧山区", label: "萧山区" },
          {
            value: "富阳区",
            label: "富阳区"
          },
          { value: "临安区", label: "临安区" },
          { value: "建德市", label: "建德市" },
          {
            value: "桐庐县",
            label: "桐庐县"
          },
          { value: "淳安县", label: "淳安县" }
        ]
      },
      {
        value: "宁波",
        label: "宁波",
        children: [
          { value: "海曙区", label: "海曙区" },
          { value: "江北区", label: "江北区" },
          {
            value: "北仑区",
            label: "北仑区"
          },
          { value: "镇海区", label: "镇海区" },
          { value: "鄞州区", label: "鄞州区" },
          {
            value: "奉化区",
            label: "奉化区"
          },
          { value: "余姚市", label: "余姚市" },
          { value: "慈溪市", label: "慈溪市" },
          {
            value: "象山县",
            label: "象山县"
          },
          { value: "宁海县", label: "宁海县" }
        ]
      },
      {
        value: "温州",
        label: "温州",
        children: [
          { value: "鹿城区", label: "鹿城区" },
          { value: "龙湾区", label: "龙湾区" },
          {
            value: "瓯海区",
            label: "瓯海区"
          },
          { value: "洞头区", label: "洞头区" },
          { value: "瑞安市", label: "瑞安市" },
          {
            value: "乐清市",
            label: "乐清市"
          },
          { value: "永嘉县", label: "永嘉县" },
          { value: "平阳县", label: "平阳县" },
          {
            value: "苍南县",
            label: "苍南县"
          },
          { value: "文成县", label: "文成县" },
          { value: "泰顺县", label: "泰顺县" }
        ]
      },
      {
        value: "绍兴",
        label: "绍兴",
        children: [
          { value: "越城区", label: "越城区" },
          { value: "柯桥区", label: "柯桥区" },
          {
            value: "上虞区",
            label: "上虞区"
          },
          { value: "诸暨市", label: "诸暨市" },
          { value: "嵊州市", label: "嵊州市" },
          { value: "新昌县", label: "新昌县" }
        ]
      },
      {
        value: "湖州",
        label: "湖州",
        children: [
          { value: "吴兴区", label: "吴兴区" },
          { value: "南浔区", label: "南浔区" },
          {
            value: "德清县",
            label: "德清县"
          },
          { value: "长兴县", label: "长兴县" },
          { value: "安吉县", label: "安吉县" }
        ]
      },
      {
        value: "嘉兴",
        label: "嘉兴",
        children: [
          { value: "南湖区", label: "南湖区" },
          { value: "秀洲区", label: "秀洲区" },
          {
            value: "海宁市",
            label: "海宁市"
          },
          { value: "平湖市", label: "平湖市" },
          { value: "桐乡市", label: "桐乡市" },
          {
            value: "嘉善县",
            label: "嘉善县"
          },
          { value: "海盐县", label: "海盐县" }
        ]
      },
      {
        value: "金华",
        label: "金华",
        children: [
          { value: "婺城区", label: "婺城区" },
          { value: "金东区", label: "金东 区" },
          {
            value: "兰溪市",
            label: "兰溪市"
          },
          { value: "东阳市", label: "东阳市" },
          { value: "永康市", label: "永康市" },
          {
            value: "义乌市",
            label: "义乌市"
          },
          { value: "武义县", label: "武义县" },
          { value: "浦江县", label: " 浦江县" },
          { value: "磐安县", label: "磐安县" }
        ]
      },
      {
        value: "衢州",
        label: "衢州",
        children: [
          { value: "柯城区", label: "柯城区" },
          { value: "衢江区", label: "衢江区" },
          {
            value: "江山市",
            label: "江山市"
          },
          { value: "常山县", label: "常山县" },
          { value: "开化县", label: "开化县" },
          { value: "龙游县", label: "龙游县" }
        ]
      },
      {
        value: "台州",
        label: "台州",
        children: [
          { value: "椒江区", label: "椒江区" },
          { value: "黄岩区", label: "黄岩区" },
          {
            value: "路桥区",
            label: "路桥区"
          },
          { value: "临海市", label: "临海市" },
          { value: "温岭市", label: "温岭市" },
          {
            value: "玉环市",
            label: "玉环市"
          },
          { value: "三门县", label: "三门县" },
          { value: "天台县", label: "天台县" },
          { value: "仙居县", label: "仙居县" }
        ]
      },
      {
        value: "丽水",
        label: "丽水",
        children: [
          { value: "莲都区", label: "莲都区" },
          { value: "龙泉市", label: "龙泉市" },
          {
            value: "青田县",
            label: "青田县"
          },
          { value: "缙云县", label: "缙云县" },
          { value: "遂昌县", label: "遂昌县" },
          {
            value: "松阳县",
            label: "松阳县"
          },
          { value: "云和县", label: "云和县" },
          { value: "庆元县", label: "庆元县" },
          { value: "景宁畲族自治县", label: "景宁畲族自治县" }
        ]
      },
      {
        value: "舟山",
        label: "舟山",
        children: [
          { value: "定海区", label: "定海区" },
          { value: "普陀区", label: "普陀区" },
          {
            value: "岱山县",
            label: "岱山县"
          },
          { value: "嵊泗县", label: "嵊泗县" }
        ]
      }
    ]
  },
  {
    value: "安徽省",
    label: "安徽省",
    children: [
      {
        value: "合肥",
        label: "合肥",
        children: [
          { value: "瑶海区", label: "瑶海区" },
          { value: "庐阳区", label: "庐阳区" },
          {
            value: "蜀山区",
            label: "蜀山区"
          },
          { value: "包河区", label: "包河区" },
          { value: "肥东县", label: "肥东县" },
          {
            value: "肥西县",
            label: "肥西县"
          },
          { value: "长丰县", label: "长丰县" },
          { value: "庐江县", label: "庐江县" },
          { value: "巢湖市", label: "巢湖市" }
        ]
      },
      {
        value: "芜湖",
        label: "芜湖",
        children: [
          { value: "镜湖区", label: "镜湖区" },
          { value: "弋江区", label: "弋江区" },
          {
            value: "鸠江区",
            label: "鸠江区"
          },
          { value: "三山区", label: "三山区" },
          { value: "无为县", label: "无为县" },
          {
            value: "芜湖县",
            label: "芜 湖县"
          },
          { value: "繁昌县", label: "繁昌县" },
          { value: "南陵县", label: "南陵县" }
        ]
      },
      {
        value: "蚌埠",
        label: "蚌埠",
        children: [
          { value: "龙子湖区", label: "龙子湖区" },
          { value: "蚌山区", label: "蚌山区" },
          {
            value: "禹会区",
            label: "禹会区"
          },
          { value: "淮上区", label: "淮上区" },
          { value: "五河县", label: "五河县" },
          {
            value: "固镇县",
            label: "固镇县"
          },
          { value: "怀远县", label: "怀远县" }
        ]
      },
      {
        value: "淮南",
        label: "淮南",
        children: [
          { value: "大通区", label: "大通区" },
          { value: "田家庵区", label: "田家庵区" },
          {
            value: "谢家集区",
            label: "谢家集区"
          },
          { value: "八公山区", label: "八公山区" },
          { value: "潘集区", label: "潘集区" },
          {
            value: "凤台县",
            label: "凤台县"
          },
          { value: "寿县", label: "寿县" }
        ]
      },
      {
        value: "马鞍山",
        label: "马鞍山",
        children: [
          { value: "花山区", label: "花山区" },
          { value: "雨山区", label: "雨山区" },
          {
            value: "博望区",
            label: "博望区"
          },
          { value: "含 山县", label: "含山县" },
          { value: "和县", label: "和县" },
          { value: "当涂县", label: "当涂县" }
        ]
      },
      {
        value: "淮北",
        label: "淮北",
        children: [
          { value: "相山区", label: "相山区" },
          { value: "杜集区", label: "杜集区" },
          {
            value: "烈山区",
            label: "烈山区"
          },
          { value: "濉溪县", label: "濉溪县" }
        ]
      },
      {
        value: "铜陵",
        label: "铜陵",
        children: [
          { value: "铜官区", label: "铜官区" },
          { value: "郊区", label: "郊区" },
          {
            value: "义安区",
            label: "义安 区"
          },
          { value: "枞阳县", label: "枞阳县" }
        ]
      },
      {
        value: "安庆",
        label: "安庆",
        children: [
          { value: "迎江区", label: "迎江区" },
          { value: "大观区", label: "大观区" },
          {
            value: "宜秀区",
            label: "宜秀区"
          },
          { value: "桐城市", label: "桐城市" },
          { value: "潜山市", label: "潜山市" },
          {
            value: "怀宁县",
            label: "怀宁县"
          },
          { value: "太湖县", label: "太湖县" },
          { value: "宿松县", label: "宿松县" },
          {
            value: "望江县",
            label: "望江县"
          },
          { value: "岳西县", label: "岳西县" }
        ]
      },
      {
        value: "黄山",
        label: "黄山",
        children: [
          { value: "屯溪区", label: "屯溪区" },
          { value: "黄山区", label: "黄山区" },
          {
            value: "徽州区",
            label: "徽州区"
          },
          { value: "歙县", label: "歙县" },
          { value: "休宁县", label: "休宁县" },
          {
            value: "黟县",
            label: "黟县"
          },
          { value: "祁门县", label: "祁门县" }
        ]
      },
      {
        value: "阜阳",
        label: "阜阳",
        children: [
          { value: "颍州区", label: "颍州区" },
          { value: "颍泉区", label: "颍泉区" },
          {
            value: "颍东区",
            label: "颍东区"
          },
          { value: "颍上县", label: "颍上县" },
          { value: "界首市", label: "界首市" },
          {
            value: "临泉县",
            label: "临泉县"
          },
          { value: "阜南县", label: "阜南县" },
          { value: "太和县", label: "太和县" }
        ]
      },
      {
        value: "宿州",
        label: "宿州",
        children: [
          { value: "埇桥区", label: "埇桥区" },
          { value: "萧县", label: "萧县" },
          {
            value: "砀山县",
            label: "砀山县"
          },
          { value: "灵璧县", label: "灵璧县" },
          { value: "泗县", label: "泗县" }
        ]
      },
      {
        value: "滁州",
        label: "滁州",
        children: [
          { value: "琅琊区", label: "琅琊区" },
          { value: "南谯区", label: "南谯区" },
          {
            value: "天长市",
            label: "天长市"
          },
          { value: "明光市", label: "明光市" },
          { value: "全椒县", label: "全椒县" },
          {
            value: "来安县",
            label: "来安县"
          },
          { value: "凤阳县", label: "凤阳县" },
          { value: "定远县", label: "定远县" }
        ]
      },
      {
        value: "六安",
        label: "六安",
        children: [
          { value: "金安区", label: "金安区" },
          { value: "裕安区", label: "裕安区" },
          {
            value: "叶集区",
            label: "叶集区"
          },
          { value: "霍邱县", label: "霍邱县" },
          { value: "霍山县", label: "霍山县" },
          {
            value: "金寨县",
            label: "金寨县"
          },
          { value: "舒城县", label: "舒城县" }
        ]
      },
      {
        value: "宣城",
        label: "宣城",
        children: [
          { value: "宣州区", label: "宣州区" },
          { value: "郎溪县", label: "郎溪县" },
          {
            value: "广德县",
            label: "广德县"
          },
          { value: "宁国市", label: "宁国市" },
          { value: "泾县", label: "泾县" },
          {
            value: "绩溪县",
            label: "绩溪县"
          },
          { value: "旌德县", label: "旌德县" }
        ]
      },
      {
        value: "池州",
        label: "池州",
        children: [
          { value: "贵池区", label: "贵池区" },
          { value: "青阳县", label: "青阳县" },
          {
            value: "石台县",
            label: "石台县"
          },
          { value: "东至县", label: "东至县" }
        ]
      },
      {
        value: "亳州",
        label: "亳州",
        children: [
          { value: "谯城区", label: "谯城区" },
          { value: "蒙城县", label: "蒙城县" },
          {
            value: "涡阳县",
            label: "涡阳县"
          },
          { value: "利辛县", label: "利辛县" }
        ]
      }
    ]
  },
  {
    value: "福建省",
    label: "福建省",
    children: [
      {
        value: "福州",
        label: "福州",
        children: [
          { value: "鼓楼区", label: "鼓楼区" },
          { value: "台江区", label: "台江区" },
          {
            value: "仓山区",
            label: "仓山区"
          },
          { value: "马尾区", label: "马尾区" },
          { value: "晋安区", label: "晋安区" },
          {
            value: "长乐区",
            label: "长乐区"
          },
          { value: "福清市", label: "福清市" },
          { value: "闽侯县", label: "闽侯县" },
          {
            value: "连江县",
            label: "连江县"
          },
          { value: "罗源县", label: "罗源县" },
          { value: "闽清县", label: "闽清县" },
          { value: "永泰县", label: "永泰县" },
          { value: "平潭县", label: "平潭县" }
        ]
      },
      {
        value: "厦门",
        label: "厦门",
        children: [
          { value: "思明区", label: "思明区" },
          { value: "海沧区", label: "海沧区" },
          {
            value: "湖里区",
            label: "湖里区"
          },
          { value: "集美区", label: "集美区" },
          { value: "同安区", label: "同安区" },
          { value: "翔安区", label: "翔安区" }
        ]
      },
      {
        value: "漳州",
        label: "漳州",
        children: [
          { value: "芗城区", label: "芗城区" },
          { value: "龙文区", label: "龙文区" },
          {
            value: "漳州招商局经济技术开发区",
            label: "漳州招商局经济技术开发区"
          },
          { value: "漳州台商投资区", label: "漳州台商投资区" },
          {
            value: "漳州高新技术产业开发区",
            label: "漳州高新技术产业开发区"
          },
          { value: "常山华侨经济开发区", label: "常山华侨经济开发区" },
          { value: "古雷港经济开发区", label: "古雷港经济开发区" },
          {
            value: "龙海市",
            label: "龙海市"
          },
          { value: "漳浦县", label: "漳浦县" },
          { value: "南靖县", label: "南靖县" },
          {
            value: "云霄县",
            label: "云霄县"
          },
          { value: "平和县", label: "平和县" },
          { value: "华安县", label: "华安县" },
          {
            value: "长泰县",
            label: "长泰县"
          },
          { value: "诏安县", label: "诏安县" },
          { value: "东山县", label: "东山县" }
        ]
      },
      {
        value: "泉州",
        label: "泉州",
        children: [
          { value: "丰泽区", label: "丰泽区" },
          { value: "鲤城区", label: "鲤城区" },
          {
            value: "洛江区",
            label: "洛江区"
          },
          { value: "泉港区", label: "泉港区" },
          { value: "泉州经济技术开发区", label: "泉州经济技术开发区" },
          {
            value: "泉州台商投资区",
            label: "泉州台商投资区"
          },
          { value: "泉州高新技术产业开发区", label: "泉州高新技术产业开发区" },
          { value: "石狮市", label: "石狮市" },
          {
            value: "晋江市",
            label: "晋江市"
          },
          { value: "南安市", label: "南安市" },
          { value: "惠安县", label: "惠安县" },
          {
            value: "安溪县",
            label: "安溪县"
          },
          { value: "永春县", label: "永春县" },
          { value: "德化县", label: "德化县" },
          { value: "金门县", label: "金门县" }
        ]
      },
      {
        value: "三明",
        label: "三明",
        children: [
          { value: "梅列区", label: "梅列区" },
          { value: "三元区", label: "三元区" },
          {
            value: "永安市",
            label: " 永安市"
          },
          { value: "明溪县", label: "明溪县" },
          { value: "清流县", label: "清流县" },
          {
            value: "宁化县",
            label: "宁化县"
          },
          { value: "大田县", label: "大田县" },
          { value: "尤溪县", label: "尤溪县" },
          {
            value: "沙县",
            label: "沙县"
          },
          { value: "将乐县", label: "将乐县" },
          { value: "泰宁县", label: "泰宁县" },
          { value: "建宁县", label: "建宁县" }
        ]
      },
      {
        value: "莆田",
        label: "莆田",
        children: [
          { value: "城厢区", label: "城厢区" },
          { value: "涵江区", label: "涵江区" },
          {
            value: "荔城区",
            label: "荔城区"
          },
          { value: "秀屿区", label: "秀屿区" },
          { value: "仙游县", label: "仙游县" }
        ]
      },
      {
        value: "南平",
        label: "南平",
        children: [
          { value: "延平区", label: "延平区" },
          { value: "建阳区", label: "建阳区" },
          {
            value: "邵武市",
            label: "邵武市"
          },
          { value: "武夷山市", label: "武夷山市" },
          { value: "建瓯市", label: "建瓯市" },
          {
            value: "顺昌县",
            label: "顺昌县"
          },
          { value: "浦城县", label: "浦城县" },
          { value: "光泽县", label: "光泽县" },
          {
            value: "松溪县",
            label: "松溪县"
          },
          { value: "政和县", label: "政和县" }
        ]
      },
      {
        value: "龙岩",
        label: "龙岩",
        children: [
          { value: "新罗区", label: "新罗区" },
          { value: "永定区", label: "永定区" },
          {
            value: "漳平市",
            label: "漳平市"
          },
          { value: "长汀县", label: "长汀县" },
          { value: "上杭县", label: "上杭县" },
          {
            value: "武平县",
            label: "武平县"
          },
          { value: "连城县", label: "连城县" }
        ]
      },
      {
        value: "宁德",
        label: "宁德",
        children: [
          { value: "蕉城区", label: "蕉城区" },
          { value: "东侨经济技术开发区", label: "东侨经济技术开发区" },
          {
            value: "福安市",
            label: "福安市"
          },
          { value: "福鼎市", label: "福鼎市" },
          { value: "霞浦县", label: "霞浦县" },
          {
            value: "古田县",
            label: "古田县"
          },
          { value: "屏南县", label: "屏南县" },
          { value: "寿宁县", label: "寿宁县" },
          {
            value: "周宁县",
            label: "周宁县"
          },
          { value: "柘荣县", label: "柘荣县" }
        ]
      },
      {
        value: "平潭综合 实验区",
        label: "平潭综合实验区",
        children: [{ value: "平潭县", label: "平潭县" }]
      }
    ]
  },
  {
    value: "江西省",
    label: "江西省",
    children: [
      {
        value: "南昌",
        label: "南昌",
        children: [
          { value: "东湖区", label: "东湖区" },
          { value: "西湖区", label: "西湖区" },
          {
            value: "青云谱区",
            label: "青云谱区"
          },
          { value: "湾里区", label: "湾里区" },
          { value: "青山湖区", label: "青山湖区" },
          {
            value: "新建区",
            label: "新建区"
          },
          { value: "南昌县", label: "南 昌县" },
          { value: "安义县", label: "安义县" },
          { value: "进贤县", label: "进贤县" }
        ]
      },
      {
        value: "九江",
        label: "九江",
        children: [
          { value: "浔阳区", label: "浔阳区" },
          { value: "濂溪区", label: "濂溪区" },
          {
            value: "柴桑区",
            label: "柴桑区"
          },
          { value: "永修县", label: "永修县" },
          { value: "德安县", label: "德安县" },
          {
            value: "都昌县",
            label: "都昌县"
          },
          { value: "湖口县", label: "湖口县" },
          { value: "彭泽县", label: "彭泽县" },
          {
            value: "武宁 县",
            label: "武宁县"
          },
          { value: "修水县", label: "修水县" },
          { value: "瑞昌市", label: "瑞昌市" },
          {
            value: "共青城市",
            label: "共青城市"
          },
          { value: "庐山市", label: "庐山市" }
        ]
      },
      {
        value: "上饶",
        label: "上饶",
        children: [
          { value: "信州区", label: "信州区" },
          { value: "广丰区", label: "广丰区" },
          {
            value: "上饶县",
            label: "上饶县"
          },
          { value: "玉山县", label: "玉山县" },
          { value: "铅山县", label: "铅山县" },
          {
            value: "横峰县",
            label: "横峰 县"
          },
          { value: "弋阳县", label: "弋阳县" },
          { value: "余干县", label: "余干县" },
          {
            value: "鄱阳县",
            label: "鄱阳县"
          },
          { value: "万年县", label: "万年县" },
          { value: "婺源县", label: "婺源县" },
          { value: "德兴市", label: " 德兴市" }
        ]
      },
      {
        value: "抚州",
        label: "抚州",
        children: [
          { value: "临川区", label: "临川区" },
          { value: "东乡区", label: "东乡区" },
          {
            value: "南城县",
            label: "南城县"
          },
          { value: "黎川县", label: "黎川县" },
          { value: "南丰县", label: "南丰县" },
          {
            value: "崇仁县",
            label: "崇仁县"
          },
          { value: "乐安县", label: "乐安县" },
          { value: "宜黄县", label: "宜黄县" },
          {
            value: "金溪县",
            label: "金溪县"
          },
          { value: "资溪县", label: "资溪县" },
          { value: "广 昌县", label: "广昌县" }
        ]
      },
      {
        value: "宜春",
        label: "宜春",
        children: [
          { value: "袁州区", label: "袁州区" },
          { value: "高安市", label: "高安市" },
          {
            value: "丰城市",
            label: "丰城市"
          },
          { value: "樟树市", label: "樟树市" },
          { value: "奉新县", label: "奉新县" },
          {
            value: "万载县",
            label: "万载县"
          },
          { value: "上高县", label: "上高县" },
          { value: "宜丰县", label: "宜丰县" },
          {
            value: "靖安县",
            label: "靖安县"
          },
          { value: "铜鼓县", label: "铜鼓县" }
        ]
      },
      {
        value: "吉安",
        label: "吉安",
        children: [
          { value: "吉州区", label: "吉州区" },
          { value: "青原区", label: "青原区" },
          {
            value: "吉安县",
            label: "吉安县"
          },
          { value: "井冈山市", label: "井冈山市" },
          { value: "吉水县", label: "吉水县" },
          {
            value: "新干县",
            label: "新干县"
          },
          { value: "永丰县", label: "永丰县" },
          { value: "泰和县", label: "泰和县" },
          {
            value: "遂川县",
            label: "遂川县"
          },
          { value: "万安县", label: "万安县" },
          { value: "安福县", label: "安福县" },
          {
            value: "永新县",
            label: "永新县"
          },
          { value: "峡江县", label: "峡江县" }
        ]
      },
      {
        value: "赣州",
        label: "赣州",
        children: [
          { value: "章贡区", label: "章贡区" },
          { value: "南康区", label: "南康区" },
          {
            value: "赣县区",
            label: "赣县区"
          },
          { value: "信丰县", label: "信丰县" },
          { value: "大余县", label: "大余县" },
          {
            value: "龙南县",
            label: "龙南县"
          },
          { value: "定南县", label: "定南县" },
          { value: "全南县", label: "全南县" },
          {
            value: "寻乌县",
            label: "寻乌县"
          },
          { value: "安远县", label: "安远县" },
          { value: "瑞金市", label: "瑞金市" },
          {
            value: "宁都县",
            label: "宁都县"
          },
          { value: "于都县", label: "于都县" },
          { value: "会昌县", label: "会昌县" },
          {
            value: "石城县",
            label: "石城县"
          },
          { value: "上犹县", label: "上犹县" },
          { value: "兴国县", label: "兴国县" },
          { value: "崇义县", label: "崇义县" }
        ]
      },
      {
        value: "景德镇",
        label: "景德镇",
        children: [
          { value: "珠山区", label: "珠山区" },
          { value: "昌江区", label: "昌江区" },
          {
            value: "浮梁县",
            label: "浮梁县"
          },
          { value: "乐平市", label: "乐平市" }
        ]
      },
      {
        value: "萍乡",
        label: "萍乡",
        children: [
          { value: "安源区", label: "安源区" },
          { value: "湘东区", label: "湘东区" },
          {
            value: "莲花县",
            label: "莲花县"
          },
          { value: "上栗县", label: "上栗县" },
          { value: "芦溪县", label: "芦溪县" }
        ]
      },
      {
        value: "新余",
        label: "新余",
        children: [
          { value: "渝水区", label: "渝水 区" },
          { value: "分宜县", label: "分宜县" }
        ]
      },
      {
        value: "鹰潭",
        label: "鹰潭",
        children: [
          { value: "月湖区", label: "月湖区" },
          { value: "余江区", label: "余江区" },
          {
            value: "贵溪市",
            label: "贵溪市"
          }
        ]
      }
    ]
  },
  {
    value: "山东省",
    label: "山东省",
    children: [
      {
        value: "济南",
        label: "济南",
        children: [
          { value: "历下区", label: "历下区" },
          { value: "市中区", label: "市中区" },
          {
            value: "槐荫区",
            label: "槐荫区"
          },
          { value: "天桥区", label: "天桥区" },
          { value: "历城区", label: "历城区" },
          {
            value: "长清区",
            label: "长清区"
          },
          { value: "章丘区", label: "章丘区" },
          { value: "济阳区", label: "济阳区" },
          {
            value: "平阴县",
            label: "平阴县"
          },
          { value: "商河县", label: " 商河县" }
        ]
      },
      {
        value: "青岛",
        label: "青岛",
        children: [
          { value: "市南区", label: "市南区" },
          { value: "市北区", label: "市北区" },
          {
            value: "李沧区",
            label: "李沧区"
          },
          { value: "城阳区", label: "城阳区" },
          { value: "崂山区", label: "崂山区" },
          {
            value: "黄岛区",
            label: "黄岛区"
          },
          { value: "即墨区", label: "即墨区" },
          { value: "胶州市", label: "胶州市" },
          {
            value: "平度市",
            label: "平度市"
          },
          { value: "莱西市", label: "莱西市" }
        ]
      },
      {
        value: " 淄博",
        label: "淄博",
        children: [
          { value: "张店区", label: "张店区" },
          { value: "淄川区", label: "淄川区" },
          {
            value: "周村区",
            label: "周村区"
          },
          { value: "博山区", label: "博山区" },
          { value: "临淄区", label: "临淄区" },
          {
            value: "桓台县",
            label: "桓台县"
          },
          { value: "高青县", label: "高青县" },
          { value: "沂源县", label: "沂源县" }
        ]
      },
      {
        value: "枣庄",
        label: "枣庄",
        children: [
          { value: "薛城区", label: "薛城区" },
          { value: "市中区", label: "市中区" },
          {
            value: "峄城区",
            label: "峄城区"
          },
          { value: "山亭区", label: "山亭区" },
          { value: "台儿庄区", label: "台儿庄区" },
          { value: "滕州市", label: "滕州市" }
        ]
      },
      {
        value: "东营",
        label: "东营",
        children: [
          { value: "东营区", label: "东营区" },
          { value: "河口区", label: "河口区" },
          {
            value: "垦利区",
            label: "垦利区"
          },
          { value: "广饶县", label: "广饶县" },
          { value: "利津县", label: "利津县" }
        ]
      },
      {
        value: "烟台",
        label: "烟台",
        children: [
          { value: "莱山区", label: "莱山区" },
          { value: "芝罘区", label: "芝罘区" },
          {
            value: "福山区",
            label: "福山区"
          },
          { value: "牟平区", label: "牟平区" },
          { value: "龙口市", label: "龙口市" },
          {
            value: "莱阳市",
            label: "莱阳市"
          },
          { value: "莱州市", label: "莱州市" },
          { value: "蓬莱市", label: "蓬莱市" },
          {
            value: "招远市",
            label: "招远市"
          },
          { value: "栖霞市", label: "栖霞市" },
          { value: "海阳市", label: "海阳市" },
          { value: "长岛县", label: " 长岛县" }
        ]
      },
      {
        value: "潍坊",
        label: "潍坊",
        children: [
          { value: "奎文区", label: "奎文区" },
          { value: "潍城区", label: "潍城区" },
          {
            value: "寒亭区",
            label: "寒亭区"
          },
          { value: "坊子区", label: "坊子区" },
          { value: "诸城市", label: "诸城市" },
          {
            value: "青州市",
            label: "青州市"
          },
          { value: "寿光市", label: "寿光市" },
          { value: "安丘市", label: "安丘市" },
          {
            value: "昌邑市",
            label: "昌邑市"
          },
          { value: "高密市", label: "高密市" },
          { value: "临 朐县", label: "临朐县" },
          { value: "昌乐县", label: "昌乐县" }
        ]
      },
      {
        value: "济宁",
        label: "济宁",
        children: [
          { value: "任城区", label: "任城区" },
          { value: "兖州区", label: "兖州区" },
          {
            value: "邹城市",
            label: "邹城市"
          },
          { value: "曲阜市", label: "曲阜市" },
          { value: "嘉祥县", label: "嘉祥县" },
          {
            value: "汶上县",
            label: "汶上县"
          },
          { value: "梁山县", label: "梁山县" },
          { value: "微山县", label: "微山县" },
          {
            value: "鱼台县",
            label: "鱼台县"
          },
          { value: "金乡县", label: "金乡县" },
          { value: "泗水县", label: "泗水县" }
        ]
      },
      {
        value: "泰安",
        label: "泰安",
        children: [
          { value: "泰山区", label: "泰山区" },
          { value: "岱岳区", label: "岱岳区" },
          {
            value: "新泰市",
            label: "新泰市"
          },
          { value: "肥城市", label: "肥城市" },
          { value: "宁阳县", label: "宁阳县" },
          { value: "东平县", label: "东平县" }
        ]
      },
      {
        value: "威海",
        label: "威海",
        children: [
          { value: "环翠区", label: "环翠区" },
          { value: "文登区", label: "文登区" },
          {
            value: "荣成市",
            label: "荣成市"
          },
          { value: "乳山市", label: "乳山市" }
        ]
      },
      {
        value: "日照",
        label: "日照",
        children: [
          { value: "东港区", label: "东港区" },
          { value: "岚山区", label: "岚山区" },
          {
            value: "五莲县",
            label: "五莲县"
          },
          { value: "莒县", label: "莒县" }
        ]
      },
      {
        value: "滨州",
        label: "滨州",
        children: [
          { value: "滨城区", label: "滨城区" },
          { value: "沾化区", label: "沾化区" },
          {
            value: "邹平市",
            label: "邹平市"
          },
          { value: "惠民县", label: "惠民县" },
          { value: "博兴县", label: "博兴县" },
          {
            value: "阳信县",
            label: "阳信县"
          },
          { value: "无棣县", label: "无棣县" }
        ]
      },
      {
        value: "德州",
        label: "德州",
        children: [
          { value: "德城 区", label: "德城区" },
          { value: "陵城区", label: "陵城区" },
          {
            value: "乐陵市",
            label: "乐陵市"
          },
          { value: "禹城市", label: "禹城市" },
          { value: "临邑县", label: "临邑县" },
          {
            value: "平原县",
            label: "平原县"
          },
          { value: " 夏津县", label: "夏津县" },
          { value: "武城县", label: "武城县" },
          {
            value: "庆云县",
            label: "庆云县"
          },
          { value: "宁津县", label: "宁津县" },
          { value: "齐河县", label: "齐河县" }
        ]
      },
      {
        value: "聊城",
        label: "聊城",
        children: [
          { value: "东昌府区", label: "东昌府区" },
          { value: "临清市", label: "临清市" },
          {
            value: "茌平县",
            label: "茌平县"
          },
          { value: "东阿县", label: "东阿县" },
          { value: "高唐县", label: "高唐县" },
          {
            value: "阳谷县",
            label: " 阳谷县"
          },
          { value: "冠县", label: "冠县" },
          { value: "莘县", label: "莘县" }
        ]
      },
      {
        value: "临沂",
        label: "临沂",
        children: [
          { value: "兰山区", label: "兰山区" },
          { value: "河东区", label: "河东区" },
          {
            value: "罗庄区",
            label: "罗庄区"
          },
          { value: "兰陵县", label: "兰陵县" },
          { value: "郯城县", label: "郯城县" },
          {
            value: "莒南县",
            label: "莒南县"
          },
          { value: "沂水县", label: "沂水县" },
          { value: "蒙阴县", label: "蒙阴县" },
          {
            value: "平邑县",
            label: "平邑县"
          },
          { value: "沂南县", label: "沂南县" },
          { value: "临沭县", label: "临沭县" },
          { value: "费县", label: "费县" }
        ]
      },
      {
        value: "菏泽",
        label: "菏泽",
        children: [
          { value: "牡丹区", label: "牡丹区" },
          { value: "定陶区", label: "定陶区" },
          {
            value: "曹县",
            label: "曹县"
          },
          { value: "单县", label: "单县" },
          { value: "巨野县", label: "巨野县" },
          {
            value: "成武县",
            label: "成武县"
          },
          { value: "郓城县", label: "郓城县" },
          { value: "鄄城县", label: "鄄城县" },
          { value: "东明县", label: "东明县" }
        ]
      },
      {
        value: "莱芜",
        label: "莱芜",
        children: [
          { value: "莱城区", label: "莱城区" },
          { value: "钢城区", label: "钢城区" }
        ]
      }
    ]
  },
  {
    value: "河南省",
    label: "河南省",
    children: [
      {
        value: "郑州",
        label: "郑州",
        children: [
          { value: "中原区", label: "中原区" },
          { value: "郑东新区", label: "郑东新区" },
          {
            value: "二七区",
            label: "二七区"
          },
          {
            value: "金水区",
            label: "金水区"
          },
          { value: "惠济区", label: "惠济区" },
          { value: "管城回 族区", label: "管城回族区" },
          {
            value: "上街区",
            label: "上街区"
          },
          { value: "巩义市", label: "巩义市" },
          { value: "新郑市", label: "新郑市" },
          {
            value: "登封市",
            label: "登封市"
          },
          { value: "荥阳市", label: "荥阳市" },
          { value: "新密市", label: "新密市" },
          { value: "中牟县", label: "中牟县" }
        ]
      },
      {
        value: "开封",
        label: "开封",
        children: [
          { value: "龙亭区", label: "龙亭区" },
          { value: "鼓楼区", label: "鼓楼区" },
          {
            value: "禹王台区",
            label: " 禹王台区"
          },
          { value: "顺河回族区", label: "顺河回族区" },
          { value: "祥符区", label: "祥符区" },
          {
            value: "兰考县",
            label: "兰考县"
          },
          { value: "通许县", label: "通许县" },
          { value: "杞县", label: "杞县" },
          { value: "尉氏县", label: "尉氏县" }
        ]
      },
      {
        value: "洛阳",
        label: "洛阳",
        children: [
          { value: "涧西区", label: "涧西区" },
          { value: "西工区", label: "西工区" },
          {
            value: "老城区",
            label: "老城区"
          },
          { value: "廛河回族区", label: "廛河回族区" },
          { value: "洛龙区", label: "洛龙区" },
          {
            value: "吉利区",
            label: "吉利区"
          },
          { value: "偃师市", label: "偃师市" },
          { value: "宜阳县", label: "宜阳县" },
          {
            value: "孟津县",
            label: "孟津县"
          },
          { value: "新安县", label: "新安县" },
          { value: "洛宁县", label: "洛宁县" },
          {
            value: "栾川县",
            label: "栾川县"
          },
          { value: "伊川县", label: "伊川县" },
          { value: "汝阳县", label: "汝阳县" },
          { value: "嵩县", label: "嵩县" }
        ]
      },
      {
        value: "平顶山",
        label: "平顶山",
        children: [
          { value: "新华区", label: "新华区" },
          { value: "卫东区", label: "卫东区" },
          {
            value: "石龙区",
            label: "石龙区"
          },
          { value: "湛河区", label: "湛河区" },
          { value: "汝州市", label: "汝州市" },
          {
            value: "舞钢市",
            label: "舞钢市"
          },
          { value: "鲁山县", label: "鲁山县" },
          { value: "宝丰县", label: "宝丰县" },
          {
            value: "叶县",
            label: "叶县"
          },
          { value: "郏县", label: "郏县" }
        ]
      },
      {
        value: "安阳",
        label: "安阳",
        children: [
          { value: "文峰 区", label: "文峰区" },
          { value: "北关区", label: "北关区" },
          {
            value: "殷都区",
            label: "殷都区"
          },
          { value: "龙安区", label: "龙安区" },
          { value: "林州市", label: "林州市" },
          {
            value: "安阳县",
            label: "安阳县"
          },
          { value: " 滑县", label: "滑县" },
          { value: "汤阴县", label: "汤阴县" },
          { value: "内黄县", label: "内黄县" }
        ]
      },
      {
        value: "鹤壁",
        label: "鹤壁",
        children: [
          { value: "鹤山区", label: "鹤山区" },
          { value: "山城区", label: "山城区" },
          {
            value: "淇滨区",
            label: "淇滨区"
          },
          { value: "浚县", label: "浚县" },
          { value: "淇县", label: "淇县" }
        ]
      },
      {
        value: "新乡",
        label: "新乡",
        children: [
          { value: "红旗区", label: "红旗区" },
          { value: "卫滨区", label: "卫滨区" },
          {
            value: "牧野区",
            label: "牧野区"
          },
          { value: "凤泉区", label: "凤泉区" },
          { value: "卫辉市", label: "卫辉市" },
          {
            value: "辉县市",
            label: "辉县市"
          },
          { value: "新乡县", label: "新乡县" },
          { value: "长垣县", label: "长垣县" },
          {
            value: "获嘉县",
            label: "获嘉县"
          },
          { value: "原阳县", label: "原阳县" },
          { value: "延津县", label: "延津县" },
          { value: "封丘县", label: "封丘县" }
        ]
      },
      {
        value: "焦作",
        label: "焦作",
        children: [
          { value: "山阳区", label: "山阳区" },
          { value: "中站区", label: "中站区" },
          {
            value: "解放区",
            label: "解放区"
          },
          { value: "马村区", label: "马村区" },
          { value: "沁阳市", label: "沁阳市" },
          {
            value: "孟州市",
            label: "孟州市"
          },
          { value: "修武 县", label: "修武县" },
          { value: "博爱县", label: "博爱县" },
          {
            value: "武陟县",
            label: "武陟县"
          },
          { value: "温县", label: "温县" }
        ]
      },
      {
        value: "濮阳",
        label: "濮阳",
        children: [
          { value: "华龙区", label: "华龙区" },
          { value: "濮阳县", label: "濮阳县" },
          {
            value: "清丰县",
            label: "清丰县"
          },
          { value: "南乐县", label: "南乐县" },
          { value: "台前县", label: "台前县" },
          { value: "范县", label: "范县" }
        ]
      },
      {
        value: "许昌",
        label: "许昌",
        children: [
          { value: "魏都区", label: "魏都区" },
          { value: "建安区", label: "建安区" },
          {
            value: "禹州市",
            label: "禹州市"
          },
          { value: "长葛市", label: "长葛市" },
          { value: "鄢陵县", label: "鄢陵县" },
          { value: "襄城县", label: "襄城县" }
        ]
      },
      {
        value: "漯河",
        label: "漯河",
        children: [
          { value: "郾城区", label: "郾城区" },
          { value: "源汇区", label: "源汇区" },
          {
            value: "召陵区",
            label: "召陵区"
          },
          { value: "舞阳县", label: "舞阳县" },
          { value: "临颍县", label: "临颍县" }
        ]
      },
      {
        value: "三门峡",
        label: "三门峡",
        children: [
          { value: "湖滨区", label: "湖滨区" },
          { value: "陕州区", label: "陕州区" },
          {
            value: "灵宝市",
            label: "灵宝市"
          },
          { value: "义马市", label: "义马市" },
          { value: "渑池县", label: "渑池县" },
          { value: "卢氏县", label: "卢氏县" }
        ]
      },
      {
        value: "商丘",
        label: "商丘",
        children: [
          { value: "睢阳区", label: "睢阳区" },
          { value: "梁园区", label: "梁园区" },
          {
            value: "永城市",
            label: " 永城市"
          },
          { value: "民权县", label: "民权县" },
          { value: "宁陵县", label: "宁陵县" },
          {
            value: "柘城县",
            label: "柘城县"
          },
          { value: "虞城县", label: "虞城县" },
          { value: "夏邑县", label: "夏邑县" },
          { value: "睢县", label: "睢县" }
        ]
      },
      {
        value: "周口",
        label: "周口",
        children: [
          { value: "川汇区", label: "川汇区" },
          { value: "项城市", label: "项城市" },
          {
            value: "鹿邑县",
            label: "鹿邑县"
          },
          { value: "扶沟县", label: "扶沟县" },
          { value: "西华县", label: "西华县" },
          {
            value: "商水县",
            label: "商水县"
          },
          { value: "沈丘县", label: "沈丘县" },
          { value: "淮阳县", label: "淮阳县" },
          {
            value: "郸城县",
            label: "郸城县"
          },
          { value: "太康县", label: "太康县" }
        ]
      },
      {
        value: "驻马店",
        label: "驻马店",
        children: [
          { value: "驿城区", label: "驿城区" },
          { value: "新蔡县", label: "新蔡县" },
          {
            value: "西平县",
            label: "西平县"
          },
          { value: "遂平县", label: "遂平县" },
          { value: "平舆县", label: "平舆县" },
          {
            value: "上蔡县",
            label: "上蔡县"
          },
          { value: "正阳县", label: "正阳县" },
          { value: "泌阳县", label: "泌阳县" },
          {
            value: "确山县",
            label: "确山县"
          },
          { value: "汝南县", label: "汝南县" }
        ]
      },
      {
        value: "南阳",
        label: "南阳",
        children: [
          { value: "宛城区", label: "宛城区" },
          { value: "卧龙区", label: "卧龙区" },
          {
            value: "邓州市",
            label: "邓州市"
          },
          { value: "南召县", label: "南召县" },
          { value: "西峡县", label: "西峡县" },
          {
            value: "方城县",
            label: "方城县"
          },
          { value: "镇平县", label: "镇平县" },
          { value: "内乡县", label: "内乡县" },
          {
            value: "淅川县",
            label: "淅川县"
          },
          { value: "社旗县", label: "社旗县" },
          { value: "唐河县", label: "唐河县" },
          {
            value: "新野县",
            label: "新野县"
          },
          { value: "桐柏县", label: "桐柏县" }
        ]
      },
      {
        value: "信阳",
        label: "信阳",
        children: [
          { value: "浉河区", label: "浉河区" },
          { value: "平桥区", label: "平桥区" },
          {
            value: "固始县",
            label: "固始县"
          },
          { value: "罗山县", label: "罗山县" },
          { value: "光山县", label: "光山县" },
          {
            value: "潢川县",
            label: "潢川县"
          },
          { value: "淮滨县", label: "淮滨县" },
          { value: "商城县", label: "商城县" },
          {
            value: "新县",
            label: "新县"
          },
          { value: "息县", label: "息县" }
        ]
      },
      { value: "济源", label: "济源" }
    ]
  },
  {
    value: "湖北省",
    label: "湖北省",
    children: [
      {
        value: "武汉",
        label: "武汉",
        children: [
          { value: "江岸区", label: "江岸区" },
          { value: "江汉区", label: "江汉区" },
          {
            value: "硚口区",
            label: "硚口区"
          },
          { value: "汉阳区", label: "汉阳区" },
          { value: "武昌区", label: "武昌区" },
          {
            value: "青山区",
            label: "青山区"
          },
          { value: "洪山区", label: "洪山区" },
          { value: "东西湖区", label: "东西湖区" },
          {
            value: "汉南区",
            label: "汉南区"
          },
          { value: "蔡甸区", label: "蔡甸区" },
          { value: "江夏区", label: "江夏区" },
          {
            value: "黄陂区",
            label: "黄陂区"
          },
          { value: "新洲区", label: "新洲区" }
        ]
      },
      {
        value: "黄石",
        label: "黄石",
        children: [
          { value: "大冶市", label: "大冶市" },
          { value: "阳新县", label: "阳新县" },
          {
            value: "黄石港区",
            label: "黄石港区"
          },
          { value: "西塞山区", label: "西塞山区" },
          { value: "下陆区", label: "下陆区" },
          { value: "铁山区", label: "铁山区" }
        ]
      },
      {
        value: "十堰",
        label: "十堰",
        children: [
          { value: "茅箭区", label: "茅箭区" },
          { value: "张湾区", label: "张湾区" },
          {
            value: "十堰经济技术开发区",
            label: "十堰经济技术开发区"
          },
          { value: "郧阳区", label: "郧阳区" },
          { value: "郧西县", label: "郧西县" },
          {
            value: "竹山县",
            label: "竹山县"
          },
          { value: "竹溪县", label: "竹溪县" },
          { value: "房县", label: "房县" },
          { value: "丹江口市", label: "丹江口市" }
        ]
      },
      {
        value: "宜昌",
        label: "宜昌",
        children: [
          { value: "远安县", label: "远安县" },
          { value: "兴山县", label: "兴山县" },
          {
            value: "秭归县",
            label: "秭归县"
          },
          { value: "长阳土家族自治县", label: "长阳土家族自治县" },
          { value: "五峰土家族自治县", label: "五峰土家族自治县" },
          {
            value: "宜都市",
            label: "宜都市"
          },
          { value: "枝江市", label: "枝江市" },
          { value: "当阳市", label: "当阳市" },
          {
            value: "夷陵区",
            label: "夷陵区"
          },
          { value: "西陵区", label: "西陵区" },
          { value: "伍家岗区", label: "伍家岗区" },
          {
            value: "点军区",
            label: "点军区"
          },
          { value: "猇亭区", label: "猇亭区" }
        ]
      },
      {
        value: "襄阳",
        label: "襄阳",
        children: [
          { value: "襄城区", label: "襄城区" },
          { value: "樊城区", label: "樊城区" },
          {
            value: "襄州区",
            label: "襄州区"
          },
          { value: "枣阳市", label: "枣阳市" },
          { value: "南漳县", label: "南漳县" },
          {
            value: "保康县",
            label: "保康县"
          },
          { value: "谷城县", label: "谷城县" },
          { value: "宜城市", label: "宜城市" },
          { value: "老河口市", label: "老河口市" }
        ]
      },
      {
        value: "鄂州",
        label: "鄂州",
        children: [
          { value: "梁子湖区", label: "梁子湖区" },
          { value: "华容区", label: "华容区" },
          {
            value: "鄂城区",
            label: "鄂城区"
          }
        ]
      },
      {
        value: "荆门",
        label: "荆门",
        children: [
          { value: "东宝区", label: "东宝区" },
          { value: "掇刀区", label: "掇刀区" },
          {
            value: "钟祥市",
            label: "钟祥市"
          },
          { value: "京山市", label: "京山市" },
          { value: "沙洋县", label: "沙洋县" }
        ]
      },
      {
        value: "孝感",
        label: "孝感",
        children: [
          { value: "孝南区", label: "孝南区" },
          { value: "汉川市", label: "汉川市" },
          {
            value: "应城市",
            label: "应城市"
          },
          { value: "安陆市", label: "安陆市" },
          { value: "云梦县", label: "云梦县" },
          {
            value: "孝昌县",
            label: "孝昌县"
          },
          { value: "大悟县", label: "大悟县" }
        ]
      },
      {
        value: "荆州",
        label: "荆州",
        children: [
          { value: "荆州区", label: "荆州区" },
          { value: "沙市区", label: "沙市区" },
          {
            value: "江陵县",
            label: "江陵县"
          },
          { value: "松滋市", label: "松滋市" },
          { value: "公安县", label: "公安县" },
          {
            value: "石首市",
            label: "石首市"
          },
          { value: "监利县", label: "监利县" },
          { value: "洪湖市", label: "洪湖市" }
        ]
      },
      {
        value: "黄冈",
        label: "黄冈",
        children: [
          { value: "黄州区", label: "黄州区" },
          { value: "麻城市", label: "麻城市" },
          {
            value: "武穴市",
            label: "武穴市"
          },
          { value: "团风县", label: "团风县" },
          { value: "浠水县", label: "浠水县" },
          {
            value: "罗田县",
            label: "罗田县"
          },
          { value: "英山县", label: "英山县" },
          { value: "蕲春县", label: "蕲春县" },
          {
            value: "黄梅县",
            label: "黄梅县"
          },
          { value: "红安县", label: "红安县" },
          { value: "龙感湖管理区", label: "龙感湖管理区" }
        ]
      },
      {
        value: "咸宁",
        label: "咸宁",
        children: [
          { value: "咸安区", label: "咸安区" },
          { value: "通山县", label: "通山县" },
          {
            value: "通城县",
            label: "通城县"
          },
          { value: "嘉鱼县", label: "嘉鱼县" },
          { value: "崇阳县", label: "崇阳县" },
          { value: "赤壁市", label: "赤壁市" }
        ]
      },
      {
        value: "随州",
        label: "随州",
        children: [
          { value: "曾都区", label: "曾都区" },
          { value: "随县", label: "随县" },
          { value: "广水市", label: "广水市" }
        ]
      },
      {
        value: "恩施",
        label: "恩施",
        children: [
          { value: "恩施市", label: "恩施市" },
          { value: "利川市", label: "利川市" },
          {
            value: "建始县",
            label: "建始县"
          },
          { value: "巴东县", label: "巴东 县" },
          { value: "宣恩县", label: "宣恩县" },
          {
            value: "咸丰县",
            label: "咸丰县"
          },
          { value: "来凤县", label: "来凤县" },
          { value: "鹤峰县", label: "鹤峰县" }
        ]
      },
      { value: "仙桃", label: "仙桃" },
      { value: "潜江", label: "潜江" },
      { value: "天门", label: "天门" },
      {
        value: "神农架",
        label: "神农架"
      }
    ]
  },
  {
    value: "湖南省",
    label: "湖南省",
    children: [
      {
        value: "长沙",
        label: "长沙",
        children: [
          { value: "芙蓉区", label: "芙蓉区" },
          { value: "天心 区", label: "天心区" },
          {
            value: "岳麓区",
            label: "岳麓区"
          },
          { value: "开福区", label: "开福区" },
          { value: "雨花区", label: "雨花区" },
          {
            value: "望城区",
            label: "望城区"
          },
          { value: "宁乡市", label: "宁乡市" },
          { value: " 浏阳市", label: "浏阳市" },
          { value: "长沙县", label: "长沙县" }
        ]
      },
      {
        value: "株洲",
        label: "株洲",
        children: [
          { value: "天元区", label: "天元区" },
          { value: "芦淞区", label: "芦淞区" },
          {
            value: "荷塘区",
            label: "荷塘区"
          },
          { value: "石峰区", label: "石峰区" },
          { value: "渌口区", label: "渌口区" },
          {
            value: "攸县",
            label: "攸县"
          },
          { value: "茶陵县", label: "茶陵县" },
          { value: "炎陵县", label: "炎陵县" },
          { value: "醴陵市", label: "醴陵市" }
        ]
      },
      {
        value: "湘潭",
        label: "湘潭",
        children: [
          { value: "雨湖区", label: "雨湖区" },
          { value: "岳塘区", label: "岳塘区" },
          {
            value: "湘乡市",
            label: "湘乡市"
          },
          { value: "韶山市", label: "韶山市" },
          { value: "湘潭县", label: "湘潭县" }
        ]
      },
      {
        value: "衡阳",
        label: "衡阳",
        children: [
          { value: "雁峰区", label: "雁峰区" },
          { value: "石鼓区", label: "石鼓区" },
          {
            value: "珠晖区",
            label: "珠晖区"
          },
          { value: "蒸湘区", label: "蒸湘区" },
          { value: "南岳区", label: "南岳区" },
          {
            value: "衡阳县",
            label: "衡阳县"
          },
          { value: "衡南县", label: "衡南县" },
          { value: "衡山县", label: "衡山县" },
          {
            value: "衡东县",
            label: "衡东县"
          },
          { value: "祁东县", label: "祁东县" },
          { value: "耒阳市", label: "耒阳市" },
          { value: "常宁市", label: "常宁市" }
        ]
      },
      {
        value: "邵阳",
        label: "邵阳",
        children: [
          { value: "双清区", label: "双清区" },
          { value: "大祥区", label: "大祥区" },
          {
            value: "北塔区",
            label: "北塔区"
          },
          { value: "邵东县", label: "邵东县" },
          { value: "新邵县", label: "新邵县" },
          {
            value: "邵阳县",
            label: "邵阳县"
          },
          { value: "隆回县", label: "隆回县" },
          { value: "洞口县", label: "洞口县" },
          {
            value: "绥宁县",
            label: "绥宁县"
          },
          { value: "新宁县", label: "新宁县" },
          { value: "城步苗族自治县", label: "城步苗族自治县" },
          { value: "武冈市", label: "武冈市" }
        ]
      },
      {
        value: "岳阳",
        label: "岳阳",
        children: [
          { value: "岳阳楼区", label: "岳阳楼区" },
          { value: "岳阳经济技术开发区", label: "岳阳经济技术开发区" },
          {
            value: "云溪区",
            label: "云溪区"
          },
          { value: "君山区", label: "君山区" },
          { value: "湘阴县", label: "湘阴县" },
          {
            value: "岳阳县",
            label: "岳阳县"
          },
          { value: "华 容县", label: "华容县" },
          { value: "平江县", label: "平江县" },
          {
            value: "汨罗市",
            label: "汨罗市"
          },
          { value: "临湘市", label: "临湘市" }
        ]
      },
      {
        value: "常德",
        label: "常德",
        children: [
          { value: "武陵区", label: "武陵区" },
          { value: "鼎城区", label: "鼎城区" },
          {
            value: "安乡县",
            label: "安乡县"
          },
          { value: "汉寿县", label: "汉寿县" },
          { value: "桃源县", label: "桃源县" },
          {
            value: "临澧县",
            label: "临澧县"
          },
          { value: "石门县", label: "石门县" },
          { value: "澧县", label: "澧县" },
          { value: "津市市", label: "津市市" }
        ]
      },
      {
        value: "张家界",
        label: "张家界",
        children: [
          { value: "永定区", label: "永定区" },
          { value: "武陵源区", label: "武陵源区" },
          {
            value: "慈利县",
            label: "慈利县"
          },
          { value: "桑植县", label: "桑植县" }
        ]
      },
      {
        value: "益阳",
        label: "益阳",
        children: [
          { value: "安化县", label: "安化县" },
          { value: "桃江县", label: "桃江县" },
          {
            value: "南县",
            label: "南县"
          },
          { value: "沅江市", label: "沅江市" },
          { value: "资阳区", label: "资阳区" },
          {
            value: "赫山区",
            label: "赫山区"
          },
          { value: "大通湖区", label: "大通湖区" }
        ]
      },
      {
        value: "娄底",
        label: "娄底",
        children: [
          { value: "娄星区", label: "娄星区" },
          { value: "冷水江市", label: "冷水江市" },
          {
            value: "涟源市",
            label: "涟源市"
          },
          { value: "双峰县", label: "双峰县" },
          { value: "新化县", label: "新化县" }
        ]
      },
      {
        value: "郴州",
        label: "郴州",
        children: [
          { value: "北湖区", label: "北湖区" },
          { value: "苏仙区", label: "苏仙区" },
          {
            value: "桂阳县",
            label: "桂阳县"
          },
          { value: "宜章县", label: "宜章县" },
          { value: "永兴县", label: "永兴县" },
          {
            value: "嘉禾县",
            label: "嘉禾县"
          },
          { value: "临 武县", label: "临武县" },
          { value: "汝城县", label: "汝城县" },
          {
            value: "桂东县",
            label: "桂东县"
          },
          { value: "安仁县", label: "安仁县" },
          { value: "资兴市", label: "资兴市" }
        ]
      },
      {
        value: "永州",
        label: "永州",
        children: [
          { value: "零陵区", label: "零陵区" },
          { value: "冷水滩区", label: "冷水滩区" },
          {
            value: "双牌县",
            label: "双牌县"
          },
          { value: "祁阳县", label: "祁阳县" },
          { value: "东安县", label: "东安县" },
          {
            value: "道县",
            label: "道县"
          },
          { value: "宁远县", label: "宁远县" },
          { value: "新田县", label: "新田县" },
          {
            value: "蓝山县",
            label: "蓝山县"
          },
          { value: "江永县", label: "江永县" },
          { value: "江华瑶族自治县", label: "江华瑶族自治县" }
        ]
      },
      {
        value: "怀化",
        label: "怀化",
        children: [
          { value: "鹤城区", label: "鹤城区" },
          { value: "中方县", label: "中方县" },
          {
            value: "洪江市",
            label: "洪江市"
          },
          { value: "沅陵县", label: "沅陵县" },
          { value: "辰溪县", label: "辰溪县" },
          {
            value: "溆浦县",
            label: "溆浦县"
          },
          { value: "会同县", label: "会同县" },
          { value: "麻阳苗族自治县", label: "麻阳苗族自治县" },
          {
            value: "新晃侗族自治县",
            label: "新晃侗族自治县"
          },
          { value: "芷江侗族自治县", label: "芷江侗族自治县" },
          { value: "靖州苗族侗族自治县", label: "靖州苗族侗族自治县" },
          {
            value: "通道侗族自治县",
            label: "通道侗族自治县"
          },
          { value: "洪江管理区", label: "洪江管理区" }
        ]
      },
      {
        value: "湘西",
        label: "湘西",
        children: [
          { value: "吉首市", label: "吉首市" },
          { value: "泸溪县", label: "泸溪县" },
          {
            value: "凤凰县",
            label: "凤凰县"
          },
          { value: "花垣县", label: "花垣县" },
          { value: "保靖县", label: "保靖县" },
          {
            value: "古丈县",
            label: "古丈县"
          },
          { value: "永顺县", label: "永顺县" },
          { value: "龙山县", label: "龙山县" }
        ]
      }
    ]
  },
  {
    value: "广东省",
    label: "广东省",
    children: [
      {
        value: "广州",
        label: "广州",
        children: [
          { value: "越秀区", label: "越秀区" },
          { value: "荔湾区", label: "荔湾区" },
          {
            value: "海珠区",
            label: "海珠区"
          },
          { value: "天河区", label: "天河区" },
          { value: "白云区", label: "白云区" },
          {
            value: "黄埔区",
            label: "黄埔区"
          },
          { value: "花都区", label: "花都区" },
          { value: "番禺区", label: "番禺区" },
          {
            value: "南沙区",
            label: "南沙区"
          },
          { value: "增城区", label: "增城区" },
          { value: "从化区", label: "从化区" }
        ]
      },
      {
        value: "深圳",
        label: "深圳",
        children: [
          { value: "福田区", label: "福田区" },
          { value: "罗湖区", label: "罗湖区" },
          {
            value: "南山区",
            label: "南山区"
          },
          { value: "盐田区", label: "盐田区" },
          { value: "宝安区", label: "宝安区" },
          {
            value: "龙岗区",
            label: "龙岗区"
          },
          { value: "龙华区", label: "龙华区" },
          { value: "坪山区", label: "坪山区" },
          { value: "光明区", label: "光明区" }
        ]
      },
      {
        value: "珠海",
        label: "珠海",
        children: [
          { value: "香洲区", label: "香洲区" },
          { value: "斗门区", label: "斗门区" },
          {
            value: "金湾区",
            label: " 金湾区"
          }
        ]
      },
      {
        value: "汕头",
        label: "汕头",
        children: [
          { value: "金平区", label: "金平区" },
          { value: "龙湖区", label: "龙湖区" },
          {
            value: "濠江区",
            label: "濠江区"
          },
          { value: "潮南区", label: "潮南区" },
          { value: "潮阳区", label: "潮阳区" },
          {
            value: "澄海区",
            label: "澄海区"
          },
          { value: "南澳县", label: "南澳县" }
        ]
      },
      {
        value: "佛山",
        label: "佛山",
        children: [
          { value: "禅城区", label: "禅城区" },
          { value: "高明区", label: "高明区" },
          {
            value: "三水区",
            label: "三水区"
          },
          { value: "南海区", label: "南海区" },
          { value: "顺德区", label: "顺德区" }
        ]
      },
      {
        value: "韶关",
        label: "韶关",
        children: [
          { value: "浈江区", label: "浈江区" },
          { value: "武江区", label: " 武江区" },
          {
            value: "曲江区",
            label: "曲江区"
          },
          { value: "乐昌市", label: "乐昌市" },
          { value: "南雄市", label: "南雄市" },
          {
            value: "始兴县",
            label: "始兴县"
          },
          { value: "仁化县", label: "仁化县" },
          { value: "翁源县", label: "翁源县" },
          {
            value: "新丰县",
            label: "新丰县"
          },
          { value: "乳源瑶族自治县", label: "乳源瑶族自治县" }
        ]
      },
      {
        value: "湛江",
        label: "湛江",
        children: [
          { value: "赤坎区", label: "赤坎区" },
          { value: "霞山区", label: "霞山区" },
          {
            value: "坡头区",
            label: "坡头区"
          },
          { value: "麻章区", label: "麻章区" },
          { value: "廉江市", label: "廉江市" },
          {
            value: "吴川市",
            label: "吴川市"
          },
          { value: "雷州市", label: "雷州市" },
          { value: "遂溪县", label: "遂溪 县" },
          { value: "徐闻县", label: "徐闻县" }
        ]
      },
      {
        value: "肇庆",
        label: "肇庆",
        children: [
          { value: "端州区", label: "端州区" },
          { value: "鼎湖区", label: "鼎湖区" },
          {
            value: "高要区",
            label: "高要区"
          },
          { value: "四会市", label: "四会市" },
          { value: "广宁县", label: "广宁县" },
          {
            value: "怀集县",
            label: "怀集县"
          },
          { value: "封开县", label: "封开县" },
          { value: "德庆县", label: "德庆县" }
        ]
      },
      {
        value: "江门",
        label: "江门",
        children: [
          { value: "江海区", label: "江海区" },
          { value: "蓬江区", label: "蓬江区" },
          {
            value: "新会区",
            label: "新会区"
          },
          { value: "台山市", label: "台山市" },
          { value: "鹤山市", label: "鹤山��" },
          {
            value: "开平市",
            label: "开平市"
          },
          { value: "恩平市", label: "恩平市" }
        ]
      },
      {
        value: "茂名",
        label: "茂名",
        children: [
          { value: "茂南区", label: "茂南区" },
          { value: "电白区", label: "电白区" },
          {
            value: "高州市",
            label: "高州市"
          },
          { value: "化州市", label: "化州市" },
          { value: "信宜市", label: "信宜市" }
        ]
      },
      {
        value: "惠州",
        label: "惠州",
        children: [
          { value: "惠城区", label: "惠城区" },
          { value: "惠阳区", label: "惠阳区" },
          {
            value: "博罗县",
            label: "博罗县"
          },
          { value: "龙门县", label: "龙门县" },
          { value: "惠东县", label: "惠东县" }
        ]
      },
      {
        value: "梅州",
        label: "梅州",
        children: [
          { value: "梅江区", label: "梅江区" },
          { value: "梅县区", label: "梅县区" },
          {
            value: "兴宁市",
            label: "兴宁市"
          },
          { value: "大埔县", label: "大埔县" },
          { value: "丰顺县", label: "丰顺县" },
          {
            value: "五华县",
            label: "五华县"
          },
          { value: "平远县", label: "平远县" },
          { value: "蕉岭县", label: "蕉岭县" }
        ]
      },
      {
        value: "汕尾",
        label: "汕尾",
        children: [
          { value: "城区", label: "城区" },
          { value: "陆丰市", label: "陆丰市" },
          {
            value: "海丰县",
            label: "海丰县"
          },
          { value: "陆河县", label: "陆河县" }
        ]
      },
      {
        value: "河源",
        label: "河源",
        children: [
          { value: "源城区", label: "源城区" },
          { value: "龙川县", label: "龙川县" },
          {
            value: "连平县",
            label: "连平县"
          },
          { value: "东源县", label: "东源县" },
          { value: "和平县", label: "和平县" },
          { value: "紫金县", label: "紫金县" }
        ]
      },
      {
        value: "阳江",
        label: "阳江",
        children: [
          { value: "江城区", label: "江城区" },
          { value: "阳东区", label: "阳东区" },
          {
            value: "阳春市",
            label: "阳春市"
          },
          { value: "阳西县", label: "阳西县" }
        ]
      },
      {
        value: "清远",
        label: "清远",
        children: [
          { value: "清城区", label: "清城区" },
          { value: "清新区", label: "清新区" },
          {
            value: "英德市",
            label: "英德市"
          },
          { value: "连州市", label: "连州市" },
          { value: "佛冈县", label: "佛冈县" },
          {
            value: "阳山县",
            label: "阳 山县"
          },
          { value: "连山壮族瑶族自治县", label: "连山壮族瑶族自治县" },
          { value: "连南瑶族自治县", label: "连南瑶族自治县" }
        ]
      },
      { value: "东莞", label: "东莞" },
      { value: "中山", label: "中山" },
      {
        value: "潮州",
        label: "潮州",
        children: [
          { value: "湘桥区", label: "湘桥区" },
          { value: "潮安县", label: "潮安县" },
          {
            value: "饶平县",
            label: "饶平县"
          }
        ]
      },
      {
        value: "揭阳",
        label: "揭阳",
        children: [
          { value: "榕城区", label: "榕城区" },
          { value: "揭 东区", label: "揭东区" },
          {
            value: "普宁市",
            label: "普宁市"
          },
          { value: "惠来县", label: "惠来县" },
          { value: "揭西县", label: "揭西县" }
        ]
      },
      {
        value: "云浮",
        label: "云浮",
        children: [
          { value: "云城区", label: "云城区" },
          { value: "云安区", label: "云安区" },
          {
            value: "罗定市",
            label: "罗定市"
          },
          { value: "新兴县", label: "新兴县" },
          { value: "郁南县", label: "郁南县" }
        ]
      }
    ]
  },
  {
    value: "广西省",
    label: "广西省",
    children: [
      {
        value: "南宁",
        label: "南宁",
        children: [
          { value: "青秀区", label: "青秀区" },
          { value: "兴宁区", label: "兴宁区" },
          {
            value: "西乡塘区",
            label: "西乡塘区"
          },
          { value: "江南区", label: "江南区" },
          { value: "良庆区", label: "良庆区" },
          {
            value: "邕宁区",
            label: "邕宁区"
          },
          { value: "武鸣区", label: "武鸣区" },
          { value: "隆安县", label: "隆安县" },
          {
            value: "马山县",
            label: "马山县"
          },
          { value: "上林县", label: "上林县" },
          { value: "宾阳县", label: "宾阳县" },
          { value: "横县", label: "横县" }
        ]
      },
      {
        value: "柳州",
        label: "柳州",
        children: [
          { value: "柳北区", label: "柳北区" },
          { value: "柳南区", label: "柳南区" },
          {
            value: "柳江区",
            label: "柳江区"
          },
          { value: "城中区", label: "城中区" },
          { value: "鱼峰区", label: "鱼峰区" },
          {
            value: "鹿寨县",
            label: "鹿寨县"
          },
          { value: "柳城县", label: "柳城县" },
          { value: "融安县", label: "融安县" },
          {
            value: "融水苗族自治县",
            label: "融水苗族自治县"
          },
          { value: "三江侗族自治县", label: "三江侗族自治县" }
        ]
      },
      {
        value: "桂林",
        label: "桂林",
        children: [
          { value: "象山区", label: "象山区" },
          { value: "秀峰区", label: "秀峰区" },
          {
            value: "叠彩区",
            label: "叠彩区"
          },
          { value: "七星区", label: "七星区" },
          { value: "雁山区", label: "雁山区" },
          {
            value: "临桂区",
            label: "临桂区"
          },
          { value: "阳朔县", label: "阳朔县" },
          { value: "灵川县", label: "灵川县" },
          {
            value: "全州县",
            label: "全州县"
          },
          { value: "平乐县", label: "平乐县" },
          { value: "兴安县", label: "兴安县" },
          {
            value: "灌阳县",
            label: "灌阳县"
          },
          { value: "荔浦市", label: "荔浦市" },
          { value: "资源县", label: "资源县" },
          {
            value: "永福县",
            label: "永福县"
          },
          { value: "龙胜各族 自治县", label: "龙胜各族自治县" },
          { value: "恭城瑶族自治县", label: "恭城瑶族自治县" }
        ]
      },
      {
        value: "梧州",
        label: "梧州",
        children: [
          { value: "长洲区", label: "长洲区" },
          { value: "万秀区", label: "万秀区" },
          {
            value: "龙 圩区",
            label: "龙圩区"
          },
          { value: "岑溪市", label: "岑溪市" },
          { value: "苍梧县", label: "苍梧县" },
          {
            value: "蒙山县",
            label: "蒙山县"
          },
          { value: "藤县", label: "藤县" }
        ]
      },
      {
        value: "北海",
        label: "北海",
        children: [
          { value: "海城区", label: "海城区" },
          { value: "银海区", label: "银海区" },
          {
            value: "铁山港区",
            label: "铁山港区"
          },
          { value: "合浦县", label: "合浦县" }
        ]
      },
      {
        value: "防城港",
        label: "防城港",
        children: [
          { value: "港口区", label: "港口区" },
          { value: "防城区", label: "防城区" },
          {
            value: "东兴市",
            label: "东兴市"
          },
          { value: "上思县", label: "上思县" }
        ]
      },
      {
        value: "钦州",
        label: "钦州",
        children: [
          { value: "钦南区", label: "钦南区" },
          { value: "钦北区", label: "钦北区" },
          {
            value: "灵山县",
            label: "灵山县"
          },
          { value: "浦北县", label: "浦北县" }
        ]
      },
      {
        value: "贵港",
        label: "贵港",
        children: [
          { value: "港北区", label: "港北区" },
          { value: "港南区", label: "港南区" },
          {
            value: "覃塘区",
            label: "覃塘区"
          },
          { value: "桂平市", label: "桂平市" },
          { value: "平南县", label: "平南县" }
        ]
      },
      {
        value: "玉林",
        label: "玉林",
        children: [
          { value: "玉州区", label: "玉州区" },
          { value: "福绵区", label: "福绵区" },
          {
            value: "北流市",
            label: "北流市"
          },
          { value: "容县", label: "容县" },
          { value: "陆川县", label: "陆川县" },
          {
            value: "博白县",
            label: "博白县"
          },
          { value: "兴业县", label: "兴业县" }
        ]
      },
      {
        value: "百色",
        label: "百色",
        children: [
          { value: "右江区", label: "右江区" },
          { value: "靖西市", label: "靖西市" },
          {
            value: "田阳县",
            label: "田阳县"
          },
          { value: "田东县", label: "田东县" },
          { value: "平果县", label: "平果县" },
          {
            value: " 德保县",
            label: "德保县"
          },
          { value: "那坡县", label: "那坡县" },
          { value: "凌云县", label: "凌云县" },
          {
            value: "乐业县",
            label: "乐业县"
          },
          { value: "田林县", label: "田林县" },
          { value: "西林县", label: "西林县" },
          { value: "隆林各族自治县", label: "隆林各族自治县" }
        ]
      },
      {
        value: "贺州",
        label: "贺州",
        children: [
          { value: "八步区", label: "八步区" },
          { value: "平桂区", label: "平桂区" },
          {
            value: "昭平县",
            label: "昭平县"
          },
          { value: "钟山县", label: "钟山县" },
          { value: "富川瑶族自治县", label: "富川瑶族自治县" }
        ]
      },
      {
        value: "河池",
        label: "河池",
        children: [
          { value: "宜州区", label: "宜州区" },
          { value: "金城江区", label: "金城江区" },
          {
            value: "南丹县",
            label: "南丹县"
          },
          { value: "天峨县", label: "天峨县" },
          { value: "凤山县", label: "凤山县" },
          {
            value: "东兰县",
            label: "东兰县"
          },
          { value: "巴马瑶族自治县", label: "巴马瑶族自治县" },
          { value: "都安瑶族自治县", label: "都安瑶族 自治县" },
          {
            value: "大化瑶族自治县",
            label: "大化瑶族自治县"
          },
          { value: "罗城仫佬族自治县", label: "罗城仫佬族自治县" },
          { value: "环江毛南族自治县", label: "环江毛南族自治县" }
        ]
      },
      {
        value: "来宾",
        label: "来宾",
        children: [
          { value: "兴宾区", label: "兴宾区" },
          { value: "合山市", label: "合山市" },
          {
            value: "象州县",
            label: "象州县"
          },
          { value: "武宣县", label: "武宣县" },
          { value: "忻城县", label: "忻城县" },
          { value: "金秀瑶族自治县", label: "金秀瑶族自治县" }
        ]
      },
      {
        value: "崇左",
        label: "崇左",
        children: [
          { value: "江洲区", label: "江洲区" },
          { value: "凭祥市", label: "凭祥市" },
          {
            value: "扶绥县",
            label: "扶绥县"
          },
          { value: "宁明县", label: "宁明县" },
          { value: "龙州县", label: "龙州县" },
          {
            value: "大新县",
            label: "大新县"
          },
          { value: "天等县", label: "天等县" }
        ]
      }
    ]
  },
  {
    value: "海南省",
    label: "海南省",
    children: [
      {
        value: "海口",
        label: "海口",
        children: [
          { value: "秀英区", label: "秀英区" },
          { value: "龙华区", label: "龙华区" },
          {
            value: "琼山区",
            label: "琼山区"
          },
          { value: "美兰区", label: "美兰区" }
        ]
      },
      {
        value: "三亚",
        label: "三亚",
        children: [
          { value: "崖州区", label: "崖州区" },
          { value: "天涯区", label: "天涯区" },
          {
            value: "吉阳区",
            label: "吉阳区"
          },
          { value: "海棠区", label: "海棠区" }
        ]
      },
      { value: "三沙", label: "三沙" },
      { value: "儋州", label: "儋州" },
      {
        value: "定安县",
        label: "定安县"
      },
      { value: " 屯昌县", label: "屯昌县" },
      { value: "澄迈县", label: "澄迈县" },
      {
        value: "临高县",
        label: "临高县"
      },
      { value: "五指山", label: "五指山" },
      { value: "文昌", label: "文昌" },
      { value: "琼海", label: "琼海" },
      {
        value: "万宁",
        label: "万宁"
      },
      { value: "东方", label: "东方" },
      { value: "白沙县", label: "白沙县" },
      {
        value: "昌江县",
        label: "昌江县"
      },
      { value: "乐东县", label: "乐东县" },
      { value: "陵水县", label: "陵水县" },
      {
        value: "保亭县",
        label: "保亭县"
      },
      { value: "琼中县", label: "琼中县" },
      {
        value: "洋浦经济开发区",
        label: "洋浦经济开发区",
        children: [
          { value: "干冲区", label: "干冲区" },
          { value: "新英湾区", label: "新英湾区" },
          {
            value: "三都区",
            label: "三都区"
          }
        ]
      }
    ]
  },
  {
    value: "重庆市",
    label: "重庆市",
    children: [
      {
        value: "重庆市",
        label: "重庆市",
        children: [
          { value: "渝中区", label: "渝中区" },
          { value: "万州区", label: "万州区" },
          {
            value: "涪陵区",
            label: "涪陵 区"
          },
          { value: "大渡口区", label: "大渡口区" },
          { value: "江北区", label: "江北区" },
          {
            value: "沙坪坝区",
            label: "沙坪坝区"
          },
          { value: "九龙坡区", label: "九龙坡区" },
          { value: "南岸区", label: "南岸区" },
          {
            value: "北碚区",
            label: "北碚区"
          },
          { value: "綦江区", label: "綦江区" },
          { value: "大足区", label: "大足区" },
          {
            value: "渝北区",
            label: "渝北区"
          },
          { value: "巴南区", label: "巴南区" },
          { value: "黔江区", label: "黔江区" },
          {
            value: "长寿 区",
            label: "长寿区"
          },
          { value: "江津区", label: "江津区" },
          { value: "合川区", label: "合川区" },
          {
            value: "永川区",
            label: "永川区"
          },
          { value: "南川区", label: "南川区" },
          { value: "璧山区", label: "璧山区" },
          {
            value: " 铜梁区",
            label: "铜梁区"
          },
          { value: "潼南区", label: "潼南区" },
          { value: "荣昌区", label: "荣昌区" },
          {
            value: "开州区",
            label: "开州区"
          },
          { value: "梁平区", label: "梁平区" },
          { value: "武隆区", label: "武隆区" },
          {
            value: "城口县",
            label: "城口县"
          },
          { value: "丰都县", label: "丰都县" },
          { value: "垫江县", label: "垫江县" },
          {
            value: "忠县",
            label: "忠县"
          },
          { value: "云阳县", label: "云阳县" },
          { value: "奉节县", label: "奉节县" },
          {
            value: "巫山县",
            label: "巫山县"
          },
          { value: "巫溪县", label: "巫溪县" },
          { value: "石柱土家族自治县", label: "石柱土家族自治县" },
          {
            value: "秀山土家族苗族自治县",
            label: "秀山土家族苗族自治县"
          },
          { value: "酉阳土家族苗族自治县", label: "酉阳土家族苗族自治县" },
          { value: "彭水苗族土家族自治县", label: "彭水苗族土家族自治县" }
        ]
      }
    ]
  },
  {
    value: "四川省",
    label: "四川省",
    children: [
      {
        value: "成都",
        label: "成都",
        children: [
          { value: "锦江区", label: "锦江区" },
          { value: "青羊区", label: "青羊区" },
          {
            value: "高新区",
            label: "高新区"
          },
          {
            value: "金牛区",
            label: "金牛区"
          },
          { value: "武侯区", label: "武侯区" },
          { value: "成华区", label: "成华区" },
          {
            value: "青白江区",
            label: "青白江区"
          },
          { value: "龙泉驿区", label: "龙泉驿区" },
          { value: "新都区", label: "新都区" },
          {
            value: "温江区",
            label: "温江区"
          },
          { value: "双流区", label: "双流区" },
          { value: "天府新区", label: "天府新区" },
          { value: "郫都区", label: "郫都区" },
          {
            value: "金堂县",
            label: "金堂县"
          },
          { value: "大邑县", label: "大邑县" },
          { value: "蒲江县", label: "蒲江县" },
          {
            value: "新津县",
            label: "新津县"
          },
          { value: "都江堰市", label: "都江堰市" },
          { value: "彭州市", label: "彭州市" },
          {
            value: "崇州市",
            label: "崇州市"
          },
          { value: "邛崃市", label: "邛崃市" },
          { value: "简阳市", label: "简阳市" }
        ]
      },
      {
        value: "绵阳",
        label: "绵阳",
        children: [
          { value: "涪城区", label: "涪城区" },
          { value: "游仙区", label: "游仙区" },
          {
            value: "安州区",
            label: "安州区"
          },
          { value: "梓潼县", label: "梓潼县" },
          { value: "三台县", label: "三台县" },
          {
            value: "盐亭县",
            label: "盐亭县"
          },
          { value: "平武县", label: "平武县" },
          { value: "江油市", label: "江油市" },
          { value: "北川羌族自治县", label: "北川羌族自治县" }
        ]
      },
      {
        value: "自贡",
        label: "自贡",
        children: [
          { value: "自流井区", label: "自流井区" },
          { value: "贡井区", label: "贡井区" },
          {
            value: "大安区",
            label: "大安区"
          },
          { value: "沿滩区", label: "沿滩区" },
          { value: "荣县", label: "荣县" },
          { value: "富顺县", label: "富顺县" }
        ]
      },
      {
        value: "攀枝花",
        label: "攀枝花",
        children: [
          { value: "东区", label: "东区" },
          { value: "西区", label: "西区" },
          {
            value: "仁和区",
            label: "仁和区"
          },
          { value: "米易县", label: "米易县" },
          { value: "盐边县", label: "盐边县" }
        ]
      },
      {
        value: "泸州",
        label: "泸州",
        children: [
          { value: "江阳区", label: "江阳区" },
          { value: "龙马潭区", label: "龙马潭区" },
          {
            value: "纳溪区",
            label: "纳溪区"
          },
          { value: "泸县", label: "泸县" },
          { value: "合江县", label: "合江县" },
          {
            value: "叙永县",
            label: "叙永县"
          },
          { value: "古蔺县", label: "古蔺县" }
        ]
      },
      {
        value: "德阳",
        label: "德阳",
        children: [
          { value: "旌阳区", label: "旌阳区" },
          { value: "罗江区", label: "罗江区" },
          {
            value: "广汉市",
            label: "广汉市"
          },
          { value: "什邡市", label: "什邡市" },
          { value: "绵竹市", label: "绵竹市" },
          { value: "中江县", label: "中江县" }
        ]
      },
      {
        value: "广元",
        label: "广元",
        children: [
          { value: "利州区", label: "利州区" },
          { value: "昭化区", label: "昭化区" },
          {
            value: "朝天区",
            label: "朝天区"
          },
          { value: "旺苍县", label: "旺苍县" },
          { value: "青川县", label: "青川县" },
          {
            value: "剑阁县",
            label: "剑阁县"
          },
          { value: "苍溪县", label: "苍溪县" }
        ]
      },
      {
        value: "遂宁",
        label: "遂宁",
        children: [
          { value: "船山区", label: "船山区" },
          { value: "安居区", label: "安居区" },
          {
            value: "射洪县",
            label: "射洪县"
          },
          { value: "蓬溪县", label: "蓬溪县" },
          { value: "大英县", label: "大英县" }
        ]
      },
      {
        value: "内江",
        label: "内江",
        children: [
          { value: "市中区", label: "市中区" },
          { value: "东兴区", label: "东兴区" },
          {
            value: "资中县",
            label: "资中县"
          },
          { value: "威远县", label: "威远县" },
          { value: "隆昌县", label: "隆昌县" }
        ]
      },
      {
        value: "乐山",
        label: "乐山",
        children: [
          { value: "市中区", label: "市中区" },
          { value: "沙湾区", label: "沙湾区" },
          {
            value: "五通桥区",
            label: "五通桥区"
          },
          { value: "金口河区", label: "金口河区" },
          { value: "犍为县", label: "犍为县" },
          {
            value: "井研县",
            label: "井研县"
          },
          { value: "夹江县", label: "夹江县" },
          { value: "沐川县", label: "沐川县" },
          {
            value: "峨眉山市",
            label: "峨眉山市"
          },
          { value: "峨边彝族自治县", label: "峨边彝族自治县" },
          { value: "马边彝族自治县", label: "马边彝族自治县" }
        ]
      },
      {
        value: "资阳",
        label: "资阳",
        children: [
          { value: "雁江区", label: "雁江区" },
          { value: "安岳县", label: "安岳县" },
          {
            value: "乐至县",
            label: "乐至县"
          }
        ]
      },
      {
        value: "宜宾",
        label: "宜宾",
        children: [
          { value: "叙州区", label: "叙州区" },
          { value: "翠屏区", label: "翠屏区" },
          {
            value: "南溪区",
            label: "南溪区"
          },
          { value: "江安县", label: "江安县" },
          { value: "长宁县", label: "长宁县" },
          {
            value: "高县",
            label: "高县"
          },
          { value: "筠连县", label: "筠连县" },
          { value: "珙县", label: "珙县" },
          {
            value: "兴文县",
            label: "兴文县"
          },
          { value: "屏山县", label: "屏山县" }
        ]
      },
      {
        value: "南充",
        label: "南充",
        children: [
          { value: "顺庆区", label: "顺庆区" },
          { value: "高坪区", label: "高坪区" },
          {
            value: "嘉陵区",
            label: "嘉陵区"
          },
          { value: "西充县", label: "西充县" },
          { value: "南部县", label: "南部县" },
          {
            value: "蓬安县",
            label: "蓬安县"
          },
          { value: "营山县", label: "营山县" },
          { value: "仪陇县", label: "仪陇县" },
          { value: "阆中市", label: "阆中市" }
        ]
      },
      {
        value: "达州",
        label: "达州",
        children: [
          { value: "通川区", label: "通川区" },
          { value: "达川区", label: "达川区" },
          {
            value: "宣汉县",
            label: "宣汉县"
          },
          { value: "开江县", label: "开江县" },
          { value: "大竹县", label: "大竹县" },
          {
            value: "渠县",
            label: "渠县"
          },
          { value: "万源市", label: "万源市" }
        ]
      },
      {
        value: "雅安",
        label: "雅安",
        children: [
          { value: "雨城区", label: "雨城区" },
          { value: "名山区", label: "名山区" },
          {
            value: " 荥经县",
            label: "荥经县"
          },
          { value: "汉源县", label: "汉源县" },
          { value: "石棉县", label: "石棉县" },
          {
            value: "天全县",
            label: "天全县"
          },
          { value: "芦山县", label: "芦山县" },
          { value: "宝兴县", label: "宝兴县" }
        ]
      },
      {
        value: "阿坝",
        label: "阿坝",
        children: [
          { value: "马尔康市", label: "马尔康市" },
          { value: "金川县", label: "金川县" },
          {
            value: "小金县",
            label: "小金县"
          },
          { value: "阿坝县", label: "阿坝县" },
          { value: "若尔盖县", label: "若尔盖县" },
          {
            value: "红原县",
            label: "红原县"
          },
          { value: "壤塘县", label: "壤塘县" },
          { value: "汶川县", label: "汶川县" },
          {
            value: "理县",
            label: "理县"
          },
          { value: "茂县", label: "茂县" },
          { value: "松潘县", label: "松潘县" },
          {
            value: "九寨沟县",
            label: "九寨沟县"
          },
          { value: "黑水县", label: "黑水县" }
        ]
      },
      {
        value: "甘孜",
        label: "甘孜",
        children: [
          { value: "康定市", label: "康定市" },
          { value: "泸定县", label: "泸定县" },
          {
            value: "丹巴县",
            label: "丹巴县"
          },
          { value: "九龙县", label: "九龙县" },
          { value: "雅江县", label: "雅江县" },
          {
            value: "道孚县",
            label: "道孚县"
          },
          { value: "炉霍县", label: "炉霍县" },
          { value: "甘孜县", label: "甘孜县" },
          {
            value: " 新龙县",
            label: "新龙县"
          },
          { value: "德格县", label: "德格县" },
          { value: "白玉县", label: "白玉县" },
          {
            value: "石渠县",
            label: "石渠县"
          },
          { value: "色达县", label: "色达县" },
          { value: "理塘县", label: "理塘县" },
          {
            value: "巴塘县",
            label: "巴塘县"
          },
          { value: "乡城县", label: "乡城县" },
          { value: "稻城县", label: "稻城县" },
          { value: "得荣县", label: "得荣县" }
        ]
      },
      {
        value: "凉山",
        label: "凉山",
        children: [
          { value: "西昌市", label: "西昌 市" },
          { value: "德昌县", label: "德昌县" },
          {
            value: "会理县",
            label: "会理县"
          },
          { value: "会东县", label: "会东县" },
          { value: "宁南县", label: "宁南县" },
          {
            value: "普格县",
            label: "普格县"
          },
          { value: "布拖县", label: " 布拖县" },
          { value: "昭觉县", label: "昭觉县" },
          {
            value: "金阳县",
            label: "金阳县"
          },
          { value: "雷波县", label: "雷波县" },
          { value: "美姑县", label: "美姑县" },
          {
            value: "甘洛县",
            label: "甘洛县"
          },
          { value: "越西县", label: "越西县" },
          { value: "喜德县", label: "喜德县" },
          {
            value: "冕宁县",
            label: "冕宁县"
          },
          { value: "盐源县", label: "盐源县" },
          { value: "木里藏族自治县", label: "木里藏族自治县" }
        ]
      },
      {
        value: "广安",
        label: "广安",
        children: [
          { value: "广安区", label: "广安区" },
          { value: "前锋区", label: "前锋区" },
          {
            value: "邻水县",
            label: "邻水县"
          },
          { value: "武胜县", label: "武胜县" },
          { value: "岳池县", label: "岳池县" },
          { value: "华蓥市", label: "华蓥 市" }
        ]
      },
      {
        value: "巴中",
        label: "巴中",
        children: [
          { value: "巴州区", label: "巴州区" },
          { value: "恩阳区", label: "恩阳区" },
          {
            value: "平昌县",
            label: "平昌县"
          },
          { value: "通江县", label: "通江县" },
          { value: "南江县", label: "南江县" }
        ]
      },
      {
        value: "眉山",
        label: "眉山",
        children: [
          { value: "东坡区", label: "东坡区" },
          { value: "彭山区", label: "彭山区" },
          {
            value: "仁寿县",
            label: "仁寿县"
          },
          { value: "丹棱县", label: "丹棱县" },
          { value: "青神县", label: "青神县" },
          { value: "洪雅县", label: "洪雅县" }
        ]
      }
    ]
  },
  {
    value: "贵州省",
    label: "贵州省",
    children: [
      {
        value: "贵阳",
        label: "贵阳",
        children: [
          { value: "观山湖区", label: "观山湖区" },
          { value: "南明区", label: "南明区" },
          {
            value: "云岩区",
            label: "云岩区"
          },
          { value: "花溪区", label: "花溪区" },
          { value: "乌当区", label: "乌当区" },
          {
            value: "白云区",
            label: "白云区"
          },
          { value: "清镇市", label: "清镇市" },
          { value: "开 阳县", label: "开阳县" },
          {
            value: "息烽县",
            label: "息烽县"
          },
          { value: "修文县", label: "修文县" }
        ]
      },
      {
        value: "遵义",
        label: "遵义",
        children: [
          { value: "汇川区", label: "汇川区" },
          { value: "红花岗区", label: "红花岗区" },
          {
            value: "播州区",
            label: "播州区"
          },
          { value: "赤水市", label: "赤水市" },
          { value: "仁怀市", label: "仁怀市" },
          {
            value: "桐梓县",
            label: "桐梓县"
          },
          { value: "绥阳县", label: "绥阳县" },
          { value: "正安县", label: "正 安县" },
          {
            value: "道真仡佬族苗族自治县",
            label: "道真仡佬族苗族自治县"
          },
          { value: "务川仡佬族苗族自治县", label: "务川仡佬族苗族自治县" },
          { value: "凤冈县", label: "凤冈县" },
          {
            value: "湄潭县",
            label: "湄潭县"
          },
          { value: "余庆县", label: "余庆县" },
          { value: "习水县", label: "习水县" }
        ]
      },
      {
        value: "六盘水",
        label: "六盘水",
        children: [
          { value: "钟山区", label: "钟山区" },
          { value: "盘州市", label: "盘州市" },
          {
            value: "六枝特区",
            label: "六枝特区"
          },
          { value: "水城县", label: "水城县" }
        ]
      },
      {
        value: "安顺",
        label: "安顺",
        children: [
          { value: "西秀区", label: "西秀区" },
          { value: "平坝区", label: "平坝区" },
          {
            value: "镇宁布依族苗族自治县",
            label: "镇宁布依族苗族 自治县"
          },
          { value: "普定县", label: "普定县" },
          { value: "关岭布依族苗族自治县", label: "关岭布依族苗族自治县" },
          {
            value: "紫云苗族布依族自治县",
            label: "紫云苗族布依族自治县"
          }
        ]
      },
      {
        value: "毕节",
        label: "毕节",
        children: [
          { value: "七星关区", label: "七星关区" },
          { value: "赫章县", label: "赫章县" },
          {
            value: "威宁彝族回族苗族自治县",
            label: "威宁彝族回族苗族自治县"
          },
          { value: "纳雍县", label: "纳雍县" },
          { value: "织金县", label: "织金县" },
          {
            value: "黔西县",
            label: "黔西县"
          },
          { value: "金沙县", label: "金沙县" },
          { value: "大方县", label: "大方县" }
        ]
      },
      {
        value: "铜仁",
        label: "铜仁",
        children: [
          { value: "碧江区", label: "碧江区" },
          { value: "万山区", label: "万山区" },
          {
            value: "江口县",
            label: "江口县"
          },
          { value: "玉屏侗族自治县", label: "玉屏侗族自治县" },
          { value: "石阡县", label: "石阡县" },
          {
            value: "思南县",
            label: "思南县"
          },
          { value: "印江土家族苗族自治县", label: "印江土家族苗族自治县" },
          { value: "德江县", label: "德江县" },
          {
            value: "沿河土家族自治县",
            label: "沿河土家族自治县"
          },
          { value: "松桃苗族自治县", label: "松桃苗族自治县" }
        ]
      },
      {
        value: "黔东南",
        label: "黔东南",
        children: [
          { value: "凯里市", label: "凯里市" },
          { value: "镇远县", label: "镇远县" },
          {
            value: "黄平县",
            label: "黄平县"
          },
          { value: "施秉县", label: "施秉县" },
          { value: "三穗县", label: "三穗县" },
          {
            value: "岑巩县",
            label: "岑巩县"
          },
          { value: "天柱县", label: "天柱县" },
          { value: "锦屏县", label: "锦屏县" },
          {
            value: "剑河县",
            label: "剑河县"
          },
          { value: "台江县", label: "台江县" },
          { value: "黎平县", label: "黎平县" },
          {
            value: "榕江县",
            label: "榕江县"
          },
          { value: "从江县", label: "从江县" },
          { value: "雷山县", label: "雷山县" },
          {
            value: "麻江县",
            label: "麻江县"
          },
          { value: "丹寨县", label: "丹寨县" }
        ]
      },
      {
        value: "黔南",
        label: "黔南",
        children: [
          { value: "都匀市", label: "都匀市" },
          { value: "福泉市", label: "福泉市" },
          {
            value: "荔波县",
            label: "荔波县"
          },
          { value: "贵定县", label: "贵定县" },
          { value: "瓮安县", label: "瓮安县" },
          {
            value: "独山县",
            label: "独山县"
          },
          { value: "平塘县", label: "平塘县" },
          { value: "罗甸县", label: "罗甸县" },
          {
            value: "长顺县",
            label: "长顺县"
          },
          { value: "龙里县", label: "龙里县" },
          { value: "惠水县", label: "惠水县" },
          { value: "三都水族自治县", label: "三都水族自治县" }
        ]
      },
      {
        value: "黔西南",
        label: "黔西南",
        children: [
          { value: "兴义市", label: "兴义市" },
          { value: "兴仁市", label: "兴仁市" },
          {
            value: "普安县",
            label: "普安县"
          },
          { value: "晴隆县", label: "晴隆县" },
          { value: "贞丰县", label: " 贞丰县" },
          {
            value: "望谟县",
            label: "望谟县"
          },
          { value: "册亨县", label: "册亨县" },
          { value: "安龙县", label: "安龙县" }
        ]
      }
    ]
  },
  {
    value: "云南省",
    label: "云南省",
    children: [
      {
        value: "昆明",
        label: "昆明",
        children: [
          { value: "呈贡区", label: "呈贡区" },
          { value: "盘龙区", label: "盘龙区" },
          {
            value: "五华区",
            label: "五华区"
          },
          { value: "官渡区", label: "官渡区" },
          { value: "西山区", label: "西山区" },
          {
            value: "晋宁区",
            label: "晋宁区"
          },
          { value: "东川区", label: "东川区" },
          { value: "安宁市", label: "安宁市" },
          {
            value: "富民县",
            label: "富民县"
          },
          { value: "宜良县", label: "宜良县" },
          { value: "嵩明县", label: "嵩明县" },
          {
            value: "石林彝族自治县",
            label: "石林彝族自治县"
          },
          { value: "禄劝彝族苗族自治县", label: "禄劝彝族苗族自治县" },
          { value: "寻甸回族彝族自治县", label: "寻甸回族彝族自治县" }
        ]
      },
      {
        value: "曲靖",
        label: "曲靖",
        children: [
          { value: "麒麟区", label: "麒麟区" },
          { value: "沾益区", label: "沾益区" },
          {
            value: "马龙区",
            label: "马龙区"
          },
          { value: "宣威市", label: "宣威市" },
          { value: "富源县", label: "富源县" },
          {
            value: "罗平县",
            label: "罗平县"
          },
          { value: "师宗县", label: "师宗县" },
          { value: "陆良县", label: "陆良县" },
          { value: "会泽县", label: "会泽县" }
        ]
      },
      {
        value: "玉溪",
        label: "玉溪",
        children: [
          { value: "红塔区", label: "红塔区" },
          { value: "江川区", label: "江川区" },
          {
            value: "澄江县",
            label: "澄江县"
          },
          { value: "通海县", label: "通海县" },
          { value: "华宁县", label: "华宁县" },
          {
            value: "易门县",
            label: "易门县"
          },
          { value: "峨山彝族自治县", label: "峨山彝族自治县" },
          {
            value: "新平彝族傣族自治县",
            label: "新 平彝族傣族自治县"
          },
          {
            value: "元江哈尼族彝族傣族自治县",
            label: "元江哈尼族彝族傣族自治县"
          }
        ]
      },
      {
        value: "昭通",
        label: "昭通",
        children: [
          { value: "昭阳区", label: "昭阳区" },
          { value: "水富市", label: "水富市" },
          {
            value: "鲁甸县",
            label: "鲁甸县"
          },
          { value: "巧家县", label: "巧家县" },
          { value: "盐津县", label: "盐津县" },
          {
            value: "大关县",
            label: "大关县"
          },
          { value: "永善县", label: "永善县" },
          { value: "绥江县", label: "绥江县" },
          {
            value: "镇雄县",
            label: "镇雄县"
          },
          { value: "彝良县", label: "彝良县" },
          { value: "威信县", label: "威信县" }
        ]
      },
      {
        value: "保山",
        label: "保山",
        children: [
          { value: "隆阳区", label: "隆阳区" },
          { value: "腾冲市", label: "腾冲 市" },
          {
            value: "施甸县",
            label: "施甸县"
          },
          { value: "龙陵县", label: "龙陵县" },
          { value: "昌宁县", label: "昌宁县" }
        ]
      },
      {
        value: "丽江",
        label: "丽江",
        children: [
          { value: "古城区", label: "古城区" },
          { value: "永胜县", label: "永胜县" },
          {
            value: "华坪县",
            label: "华坪县"
          },
          { value: "玉龙纳西族自治县", label: "玉龙纳西族自治县" },
          { value: "宁蒗彝族自治县", label: "宁蒗彝族自治县" }
        ]
      },
      {
        value: "普洱",
        label: "普洱",
        children: [
          { value: " 思茅区", label: "思茅区" },
          {
            value: "宁洱哈尼族彝族自治县",
            label: "宁洱哈尼族彝族自治县"
          },
          { value: "墨江哈尼族自治县", label: "墨江哈尼族自治县" },
          { value: "景东彝族自治县", label: "景东彝族自治县" },
          {
            value: "景谷傣族彝族 自治县",
            label: "景谷傣族彝族自治县"
          },
          {
            value: "镇沅彝族哈尼族拉祜族自治县",
            label: "镇沅彝族哈尼族拉祜族自治县"
          },
          {
            value: "江城哈尼族彝族自治县",
            label: "江城哈尼族彝族自治县"
          },
          {
            value: "孟连傣族拉祜族佤族自治县",
            label: "孟连傣族拉祜族佤族自治县"
          },
          {
            value: "澜沧拉祜族自治县",
            label: "澜沧拉祜族自治县"
          },
          { value: "西盟佤族自治县", label: "西盟佤族自治县" }
        ]
      },
      {
        value: "临沧",
        label: "临沧",
        children: [
          { value: "临翔区", label: "临翔区" },
          { value: "凤庆县", label: "凤庆县" },
          {
            value: "云县",
            label: "云县"
          },
          { value: "永德县", label: "永德县" },
          { value: "镇康县", label: "镇康县" },
          {
            value: "双江拉祜族佤族布朗族傣族自治县",
            label: "双江拉祜族佤族布朗族傣族自治县"
          },
          { value: "耿马傣族佤族自治县", label: "耿马傣族佤族自治县" },
          { value: "沧源佤族自治县", label: "沧源佤族自治县" }
        ]
      },
      {
        value: "德宏",
        label: "德宏",
        children: [
          { value: "芒市", label: "芒市" },
          { value: "瑞丽市", label: "瑞丽市" },
          {
            value: "梁河县",
            label: "梁河县"
          },
          { value: "盈江县", label: "盈江县" },
          { value: "陇川县", label: "陇川县" }
        ]
      },
      {
        value: "怒江",
        label: "怒江",
        children: [
          { value: "泸水市", label: "泸水市" },
          { value: "福 贡县", label: "福贡县" },
          {
            value: "贡山独龙族怒族自治县",
            label: "贡山独龙族怒族自治县"
          },
          { value: "兰坪白族普米族自治县", label: "兰坪白族普米族自治县" }
        ]
      },
      {
        value: "迪庆",
        label: "迪庆",
        children: [
          { value: "香格里拉市", label: "香格里拉市" },
          { value: "德钦县", label: "德钦县" },
          {
            value: "维西傈僳族自治县",
            label: "维西傈僳族自治县"
          }
        ]
      },
      {
        value: "大理",
        label: "大理",
        children: [
          { value: "大理市", label: "大理市" },
          { value: "祥云县", label: "祥云县" },
          {
            value: "宾川县",
            label: "宾川县"
          },
          { value: "弥渡县", label: "弥渡县" },
          { value: "永平县", label: "永平县" },
          {
            value: "云龙县",
            label: "云龙县"
          },
          { value: "洱源县", label: "洱源县" },
          { value: "剑川县", label: "剑川县" },
          {
            value: "鹤庆县",
            label: "鹤庆县"
          },
          { value: "漾濞彝族自治县", label: "漾濞彝族自治县" },
          { value: "南涧彝族自治县", label: "南涧彝族自治县" },
          {
            value: "巍山彝族回族自治县",
            label: "巍山彝族回族自治县"
          }
        ]
      },
      {
        value: "楚雄",
        label: "楚雄",
        children: [
          { value: "楚雄市", label: "楚雄市" },
          { value: "双柏县", label: "双柏县" },
          {
            value: "牟定县",
            label: "牟定县"
          },
          { value: "南华县", label: "南华县" },
          { value: "姚安县", label: "姚安县" },
          {
            value: "大姚县",
            label: "大姚县"
          },
          { value: "永仁县", label: "永仁县" },
          { value: "元谋县", label: "元谋县" },
          {
            value: "武定县",
            label: "武定县"
          },
          { value: "禄丰县", label: "禄丰县" }
        ]
      },
      {
        value: "红河",
        label: "红河",
        children: [
          { value: "蒙自市", label: "蒙自市" },
          { value: "个旧市", label: "个旧市" },
          {
            value: "开远市",
            label: "开远市"
          },
          { value: "弥勒市", label: "弥勒市" },
          { value: "建水县", label: "建水县" },
          {
            value: " 石屏县",
            label: "石屏县"
          },
          { value: "泸西县", label: "泸西县" },
          { value: "绿春县", label: "绿春县" },
          {
            value: "元阳县",
            label: "元阳县"
          },
          { value: "红河县", label: "红河县" },
          { value: "金平苗族瑶族傣族自治县", label: "金平苗族瑶族傣族自治县" },
          {
            value: "河口瑶族自治县",
            label: "河口瑶族自治县"
          },
          { value: "屏边苗族自治县", label: "屏边苗族自治县" }
        ]
      },
      {
        value: "文山",
        label: "文山",
        children: [
          { value: "文山市", label: "文山市" },
          { value: "砚山县", label: "砚山县" },
          {
            value: "西畴县",
            label: "西畴县"
          },
          { value: "麻栗坡县", label: "麻栗坡县" },
          { value: "马关县", label: "马关县" },
          {
            value: "丘北县",
            label: "丘北县"
          },
          { value: "广南县", label: "广南县" },
          { value: "富宁县", label: "富宁县" }
        ]
      },
      {
        value: "西双版纳",
        label: "西双版纳",
        children: [
          { value: "景洪市", label: "景洪市" },
          { value: "勐海县", label: "勐海县" },
          {
            value: "勐腊县",
            label: "勐腊县"
          }
        ]
      }
    ]
  },
  {
    value: "西藏自治区",
    label: "西藏自治区",
    children: [
      {
        value: "拉萨",
        label: "拉萨",
        children: [
          { value: "城关区", label: "城关区" },
          { value: "堆龙德庆区", label: "堆龙德庆区" },
          {
            value: "达孜区",
            label: "达孜区"
          },
          { value: "林周县", label: "林周县" },
          { value: "尼木县", label: "尼木县" },
          {
            value: "当雄县",
            label: "当雄县"
          },
          { value: "曲水县", label: "曲水县" },
          { value: "墨竹工卡县", label: "墨竹工卡县" }
        ]
      },
      {
        value: "日喀则",
        label: "日喀则",
        children: [
          { value: "桑珠孜区", label: "桑珠孜区" },
          { value: "南木林县", label: "南木林县" },
          {
            value: "江孜县",
            label: "江孜县"
          },
          { value: "定日县", label: "定日县" },
          { value: "萨迦县", label: "萨迦县" },
          {
            value: "拉孜县",
            label: "拉孜县"
          },
          { value: "昂仁县", label: "昂仁县" },
          { value: "谢通门县", label: "谢通门县" },
          {
            value: "白朗县",
            label: "白朗县"
          },
          { value: "仁布县", label: "仁布县" },
          { value: "康马县", label: "康马县" },
          {
            value: "定结县",
            label: "定结县"
          },
          { value: "仲巴县", label: "仲巴县" },
          { value: "亚东县", label: "亚东县" },
          {
            value: "吉隆县",
            label: "吉隆县"
          },
          { value: "聂拉木县", label: "聂拉木县" },
          { value: "萨嘎县", label: "萨嘎县" },
          { value: "岗巴县", label: "岗巴县" }
        ]
      },
      {
        value: "昌都",
        label: "昌都",
        children: [
          { value: "卡若区", label: "卡若区" },
          { value: "察雅县", label: "察雅县" },
          {
            value: "左贡县",
            label: "左贡县"
          },
          { value: "芒康县", label: "芒康县" },
          { value: "洛隆县", label: "洛隆县" },
          {
            value: "边坝县",
            label: "边坝县"
          },
          { value: "江达县", label: "江达县" },
          { value: "贡觉县", label: "贡觉县" },
          {
            value: "丁青县",
            label: "丁青县"
          },
          { value: "八宿县", label: "八宿县" },
          { value: "类乌齐县", label: "类乌齐县" }
        ]
      },
      {
        value: "林芝",
        label: "林芝",
        children: [
          { value: "巴宜区", label: "巴宜区" },
          { value: "米林县", label: "米林县" },
          {
            value: "墨脱县",
            label: "墨脱县"
          },
          { value: "察隅县", label: "察隅县" },
          { value: "波密县", label: "波密县" },
          {
            value: "朗县",
            label: "朗县"
          },
          { value: "工布江达县", label: "工布江达县" }
        ]
      },
      {
        value: "山南",
        label: "山南",
        children: [
          { value: "乃东区", label: "乃东区" },
          { value: "扎囊县", label: "扎囊县" },
          {
            value: "贡嘎县",
            label: "贡嘎县"
          },
          { value: "桑日县", label: "桑日县" },
          { value: "琼结县", label: "琼结县" },
          {
            value: "洛扎县",
            label: "洛扎县"
          },
          { value: "加查县", label: "加查县" },
          { value: "隆子县", label: "隆子县" },
          {
            value: "曲松县",
            label: "曲松县"
          },
          { value: "措美县", label: "措美县" },
          { value: "错那县", label: "错那县" },
          { value: "浪卡子县", label: "浪卡子县" }
        ]
      },
      {
        value: "那曲",
        label: "那曲",
        children: [
          { value: "色尼区", label: "色尼区" },
          { value: "申扎县", label: "申扎县" },
          {
            value: "班戈县",
            label: "班戈县"
          },
          { value: "聂荣县", label: "聂荣县" },
          { value: "安多县", label: "安多县" },
          {
            value: "嘉黎县",
            label: "嘉黎县"
          },
          { value: "巴青县", label: "巴青县" },
          { value: "比如县", label: "比如县" },
          {
            value: "索县",
            label: "索县"
          },
          { value: "尼玛县", label: "尼玛县" }
        ]
      },
      {
        value: "阿里",
        label: "阿里",
        children: [
          { value: "噶尔县", label: "噶尔县" },
          { value: "普兰县", label: "普兰县" },
          {
            value: "札达县",
            label: "札达县"
          },
          { value: "日土县", label: "日土县" },
          { value: "革吉县", label: "革吉县" },
          {
            value: "改则县",
            label: "改则县"
          },
          { value: "措勤县", label: "措勤县" }
        ]
      }
    ]
  },
  {
    value: "陕西省",
    label: "陕西省",
    children: [
      {
        value: "西安",
        label: "西安",
        children: [
          { value: "未央区", label: "未央区" },
          { value: "新城区", label: "新城区" },
          {
            value: "碑林区",
            label: "碑林区"
          },
          { value: "莲湖区", label: "莲湖区" },
          { value: "灞桥区", label: "灞桥区" },
          {
            value: "雁塔区",
            label: "雁塔区"
          },
          { value: "阎良区", label: "阎良区" },
          { value: "临潼区", label: "临潼区" },
          {
            value: "长安区",
            label: "长安区"
          },
          { value: "高陵区", label: "高陵区" },
          { value: "鄠邑区", label: "鄠邑区" },
          {
            value: "蓝田县",
            label: "蓝田县"
          },
          { value: "周至县", label: "周至县" }
        ]
      },
      {
        value: "宝鸡",
        label: "宝鸡",
        children: [
          { value: "渭滨区", label: "渭滨区" },
          { value: "金台区", label: "金台区" },
          {
            value: "陈仓区",
            label: "陈仓区"
          },
          {
            value: "宝鸡国家高新技术产业开发区",
            label: "宝鸡国家高新技术产业开发区"
          },
          {
            value: "宝鸡蟠龙新区",
            label: "宝 鸡蟠龙新区"
          },
          { value: "宝鸡陆港新区", label: "宝鸡陆港新区" },
          { value: "蔡家坡经济技术开发区", label: "蔡家坡经济技术开发区" },
          {
            value: "岐山县",
            label: "岐山县"
          },
          { value: "扶风县", label: "扶风县" },
          { value: "眉县", label: "眉县" },
          {
            value: "凤翔县",
            label: "凤翔县"
          },
          { value: "陇县", label: "陇县" },
          { value: "千阳县", label: "千阳县" },
          {
            value: "麟游县",
            label: "麟游县"
          },
          { value: "凤县", label: "凤县" },
          { value: "太白县", label: "太白县" }
        ]
      },
      {
        value: "咸阳",
        label: "咸阳",
        children: [
          { value: "秦都区", label: "秦都区" },
          { value: "杨陵区", label: "杨陵区" },
          { value: "渭城区", label: "渭城区" },
          {
            value: "兴平市",
            label: "兴平市"
          },
          { value: "彬州市", label: "彬州市" },
          { value: "三原县", label: "三原县" },
          {
            value: "泾阳县",
            label: "泾阳县"
          },
          { value: "乾县", label: "乾县" },
          { value: "礼泉县", label: "礼泉县" },
          {
            value: "永寿县",
            label: "永寿县"
          },
          { value: "长武县", label: "长武县" },
          { value: "旬邑县", label: "旬邑县" },
          {
            value: "淳化县",
            label: "淳化县"
          },
          { value: "武功县", label: "武功县" }
        ]
      },
      {
        value: "铜川",
        label: "铜川",
        children: [
          { value: "王益区", label: "王益区" },
          { value: "印台区", label: "印台区" },
          {
            value: "耀州区",
            label: "耀州区"
          },
          { value: "宜君县", label: "宜君县" }
        ]
      },
      {
        value: "渭南",
        label: "渭南",
        children: [
          { value: "临渭区", label: "临渭区" },
          { value: "华州区", label: "华州区" },
          {
            value: "潼关县",
            label: "潼关县"
          },
          { value: "大荔县", label: "大荔县" },
          { value: "蒲城县", label: "蒲城县" },
          {
            value: "白水县",
            label: "白水县"
          },
          { value: "合阳县", label: "合阳县" },
          { value: "澄城县", label: "澄城县" },
          {
            value: "富平县",
            label: " 富平县"
          },
          { value: "韩城市", label: "韩城市" },
          { value: "华阴市", label: "华阴市" }
        ]
      },
      {
        value: "延安",
        label: "延安",
        children: [
          { value: "宝塔区", label: "宝塔区" },
          { value: "安塞区", label: "安塞区" },
          {
            value: "黄陵县",
            label: "黄陵县"
          },
          { value: "黄龙县", label: "黄龙县" },
          { value: "宜川县", label: "宜川县" },
          {
            value: "洛川县",
            label: "洛川县"
          },
          { value: "富县", label: "富县" },
          { value: "延长县", label: "延长县" },
          {
            value: "甘泉县",
            label: "甘泉县"
          },
          { value: "延川县", label: "延川县" },
          { value: "吴起县", label: "吴起县" },
          {
            value: "子长县",
            label: "子长县"
          },
          { value: "志丹县", label: "志丹县" }
        ]
      },
      {
        value: "榆林",
        label: "榆林",
        children: [
          { value: "榆阳区", label: "榆阳区" },
          { value: "横山区", label: "横山区" },
          {
            value: "神木市",
            label: "神木市"
          },
          { value: "府谷县", label: "府谷县" },
          { value: "靖边县", label: "靖边县" },
          {
            value: "定边县",
            label: "定边县"
          },
          { value: "绥德县", label: "绥德县" },
          { value: "米脂县", label: "米脂县" },
          {
            value: "佳县",
            label: "佳县"
          },
          { value: "吴堡县", label: "吴堡县" },
          { value: "清涧县", label: "清涧县" },
          { value: "子洲县", label: "子洲县" }
        ]
      },
      {
        value: "汉中",
        label: "汉中",
        children: [
          { value: "汉台区", label: "汉台区" },
          { value: "南郑区", label: "南郑区" },
          {
            value: "城固县",
            label: "城固县"
          },
          { value: "洋县", label: "洋县" },
          { value: "西乡县", label: "西乡县" },
          {
            value: "勉县",
            label: "勉县"
          },
          { value: "宁强县", label: "宁强县" },
          { value: "略阳县", label: "略阳县" },
          {
            value: "镇巴县",
            label: "镇巴县"
          },
          { value: "留坝县", label: "留坝县" },
          { value: "佛坪县", label: "佛坪 县" }
        ]
      },
      {
        value: "安康",
        label: "安康",
        children: [
          { value: "汉滨区", label: "汉滨区" },
          {
            value: "安康国家高新技术产业开发区",
            label: "安康国家高新技术产业开发区"
          },
          { value: "白河县", label: "白河县" },
          { value: "汉阴县", label: "汉阴县" },
          {
            value: "石泉县",
            label: "石泉县"
          },
          { value: "宁陕县", label: "宁陕县" },
          { value: "紫阳县", label: "紫阳县" },
          {
            value: "岚皋县",
            label: "岚皋县"
          },
          { value: "平利县", label: "平利县" },
          { value: "镇坪县", label: "镇坪县" },
          { value: "旬阳县", label: "旬阳县" }
        ]
      },
      {
        value: "商洛",
        label: "商洛",
        children: [
          { value: "商州区", label: "商州区" },
          { value: "洛南县", label: "洛南县" },
          {
            value: "丹凤县",
            label: "丹凤县"
          },
          { value: "商南县", label: "商南县" },
          { value: "山阳县", label: "山阳县" },
          {
            value: "镇安县",
            label: "镇安县"
          },
          { value: "柞水县", label: "柞水县" }
        ]
      }
    ]
  },
  {
    value: "甘肃省",
    label: "甘肃省",
    children: [
      {
        value: "兰州",
        label: "兰州",
        children: [
          { value: "城关区", label: "城关区" },
          { value: "七里河区", label: "七里河区" },
          {
            value: "西固区",
            label: "西固区"
          },
          { value: "安宁区", label: "安宁区" },
          { value: "红古区", label: "红古区" },
          { value: "兰州新区", label: "兰州新区" },
          {
            value: "永登县",
            label: "永登县"
          },
          { value: "皋兰县", label: "皋兰县" },
          { value: "榆中县", label: "榆中县" }
        ]
      },
      { value: "嘉峪关", label: "嘉峪关" },
      {
        value: "金昌",
        label: "金昌",
        children: [
          { value: "金川区", label: "金川区" },
          { value: "永昌县", label: "永昌县" }
        ]
      },
      {
        value: "白银",
        label: "白银",
        children: [
          { value: "白银区", label: "白银区" },
          { value: "平川区", label: "平川区" },
          {
            value: "靖远县",
            label: "靖远县"
          },
          { value: "会宁县", label: "会宁县" },
          { value: "景泰县", label: "景泰县" }
        ]
      },
      {
        value: "天水",
        label: "天水",
        children: [
          { value: "秦州区", label: "秦州区" },
          { value: "麦积区", label: "麦积区" },
          {
            value: "甘谷县",
            label: "甘谷县"
          },
          { value: " 武山县", label: "武山县" },
          { value: "秦安县", label: "秦安县" },
          {
            value: "清水县",
            label: "清水县"
          },
          { value: "张家川回族自治县", label: "张家川回族自治县" }
        ]
      },
      {
        value: "武威",
        label: "武威",
        children: [
          { value: "凉州区", label: "凉州区" },
          { value: "民勤县", label: "民勤县" },
          {
            value: "古浪县",
            label: "古浪县"
          },
          { value: "天祝藏族自治县", label: "天祝藏族自治县" }
        ]
      },
      {
        value: "张掖",
        label: "张掖",
        children: [
          { value: "甘州区", label: "甘州区" },
          { value: "民乐县", label: "民乐县" },
          {
            value: "临泽县",
            label: "临泽县"
          },
          { value: "高台县", label: "高台县" },
          { value: "山丹县", label: "山丹县" },
          {
            value: "肃南裕固族自治县",
            label: "肃南裕固族自治县"
          }
        ]
      },
      {
        value: "平凉",
        label: "平凉",
        children: [
          { value: "崆峒区", label: "崆峒区" },
          { value: "泾川县", label: "泾川县" },
          {
            value: "灵台县",
            label: "灵台县"
          },
          { value: "崇信县", label: "崇信县" },
          { value: "庄浪县", label: "庄 浪县" },
          {
            value: "静宁县",
            label: "静宁县"
          },
          { value: "华亭市", label: "华亭市" }
        ]
      },
      {
        value: "酒泉",
        label: "酒泉",
        children: [
          { value: "肃州区", label: "肃州区" },
          { value: "玉门市", label: "玉门市" },
          {
            value: "敦煌市",
            label: "敦煌市"
          },
          { value: "金塔县", label: "金塔县" },
          { value: "瓜州县", label: "瓜州县" },
          {
            value: "肃北蒙古族自治县",
            label: "肃北蒙古族自治县"
          },
          { value: "阿克塞哈萨克族自治县", label: "阿克塞哈萨克族自治县" }
        ]
      },
      {
        value: "庆阳",
        label: "庆阳",
        children: [
          { value: "西峰区", label: "西峰区" },
          { value: "庆城县", label: "庆城县" },
          {
            value: "环县",
            label: "环县"
          },
          { value: "华池县", label: "华池县" },
          { value: "合水县", label: "合水县" },
          {
            value: "正宁县",
            label: "正宁县"
          },
          { value: "宁县", label: "宁县" },
          { value: "镇原县", label: "镇原县" }
        ]
      },
      {
        value: "定西",
        label: "定西",
        children: [
          { value: "安定区", label: "安定区" },
          { value: "通渭县", label: "通渭县" },
          {
            value: "临洮县",
            label: "临洮县"
          },
          { value: "漳县", label: "漳县" },
          { value: "岷县", label: "岷县" },
          {
            value: "渭源县",
            label: "渭源县"
          },
          { value: "陇西县", label: "陇西县" }
        ]
      },
      {
        value: "陇南",
        label: "陇南",
        children: [
          { value: "武都区", label: "武都区" },
          { value: "成县", label: "成县" },
          {
            value: "文县",
            label: "文县"
          },
          { value: "宕昌县", label: "宕昌县" },
          { value: "康县", label: "康县" },
          {
            value: "西和县",
            label: "西和县"
          },
          { value: "礼县", label: "礼县" },
          { value: "徽县", label: "徽县" },
          { value: "两当县", label: "两当县" }
        ]
      },
      {
        value: "临夏",
        label: "临夏",
        children: [
          { value: "临夏市", label: "临夏市" },
          { value: "临夏县", label: "临夏县" },
          {
            value: "永靖县",
            label: "永靖县"
          },
          { value: "广河县", label: "广河县" },
          { value: "和政县", label: "和政县" },
          {
            value: "康乐县",
            label: "康乐县"
          },
          { value: "东乡族自治县", label: "东乡族自治县" },
          {
            value: "积 石山保安族东乡族撒拉族自治县",
            label: "积石山保安族东乡族撒拉族自治县"
          }
        ]
      },
      {
        value: "甘南",
        label: "甘南",
        children: [
          { value: "夏河县", label: "夏河县" },
          { value: "玛曲县", label: "玛曲县" },
          {
            value: "碌曲县",
            label: "碌曲县"
          },
          { value: "卓尼县", label: "卓尼县" },
          { value: "迭部县", label: "迭部县" },
          {
            value: "临潭县",
            label: "临潭县"
          },
          { value: "舟曲县", label: "舟曲县" },
          { value: "合作市", label: "合作市" }
        ]
      }
    ]
  },
  {
    value: "青海省",
    label: "青海省",
    children: [
      {
        value: "西宁",
        label: "西宁",
        children: [
          { value: "城中区", label: "城中区" },
          { value: "城东区", label: "城东区" },
          {
            value: "城西区",
            label: "城西区"
          },
          { value: "城北区", label: "城北区" },
          { value: "大通回族土族自治县", label: "大通回族土族自治县" },
          {
            value: "湟中县",
            label: "湟中县"
          },
          { value: "湟源县", label: "湟源县" }
        ]
      },
      {
        value: "海东",
        label: "海东",
        children: [
          { value: "乐都区", label: "乐都区" },
          { value: "平安区", label: "平安区" },
          {
            value: "民和回族土族自治县",
            label: "民和回族土族自治县"
          },
          { value: "互助土族自治县", label: "互助土族自治县" },
          { value: "化隆回族自治县", label: "化隆回族自治县" },
          {
            value: "循化撒拉族自治 县",
            label: "循化撒拉族自治县"
          }
        ]
      },
      {
        value: "海北",
        label: "海北",
        children: [
          { value: "海晏县", label: "海晏县" },
          { value: "祁连县", label: "祁连县" },
          {
            value: "刚察县",
            label: "刚察县"
          },
          { value: "门源回族自治县", label: "门源回族自治县" }
        ]
      },
      {
        value: "黄南",
        label: "黄南",
        children: [
          { value: "同仁县", label: "同仁县" },
          { value: "尖扎县", label: "尖扎县" },
          {
            value: "泽库县",
            label: "泽库县"
          },
          { value: "河南蒙古族自治县", label: "河 南蒙古族自治县" }
        ]
      },
      {
        value: "海南",
        label: "海南",
        children: [
          { value: "共和县", label: "共和县" },
          { value: "同德县", label: "同德县" },
          {
            value: "贵德县",
            label: "贵德县"
          },
          { value: "兴海县", label: "兴海县" },
          { value: "贵南县", label: "贵南县" }
        ]
      },
      {
        value: "果洛",
        label: "果洛",
        children: [
          { value: "玛沁县", label: "玛沁县" },
          { value: "班玛县", label: "班玛县" },
          {
            value: "甘德县",
            label: "甘德县"
          },
          { value: "达日县", label: "达日县" },
          { value: "久治县", label: "久治县" },
          { value: "玛多县", label: "玛多县" }
        ]
      },
      {
        value: "玉树",
        label: "玉树",
        children: [
          { value: "玉树市", label: "玉树市" },
          { value: "杂多县", label: "杂多县" },
          {
            value: "称多县",
            label: "称多县"
          },
          { value: "治多县", label: "治多县" },
          { value: "囊谦县", label: "囊谦县" },
          { value: "曲麻莱县", label: "曲麻莱县" }
        ]
      },
      {
        value: "海西",
        label: "海西",
        children: [
          { value: "德令哈市", label: "德令哈市" },
          { value: "格尔木市", label: "格尔木市" },
          {
            value: "茫崖市",
            label: "茫崖市"
          },
          { value: "天峻县", label: "天峻县" },
          { value: "都兰县", label: "都兰县" },
          { value: "乌兰县", label: "乌兰县" }
        ]
      }
    ]
  },
  {
    value: "宁夏回族自治区",
    label: "宁夏回族自治区",
    children: [
      {
        value: "银川",
        label: "银川",
        children: [
          { value: "兴庆区", label: "兴庆区" },
          { value: "金凤区", label: "金凤区" },
          {
            value: "西夏区",
            label: "西夏区"
          },
          { value: "灵武市", label: "灵武市" },
          { value: "永宁县", label: "永宁县" },
          { value: "贺兰县", label: "贺兰县" }
        ]
      },
      {
        value: "石嘴山",
        label: "石嘴山",
        children: [
          { value: "大武口区", label: "大武口区" },
          { value: "惠农区", label: "惠农区" },
          {
            value: "平罗县",
            label: "平罗县"
          }
        ]
      },
      {
        value: "吴忠",
        label: "吴忠",
        children: [
          { value: "利通区", label: "利通区" },
          { value: "红寺堡区", label: "红寺堡区" },
          {
            value: "青铜峡市",
            label: "青铜峡市"
          },
          { value: "同心县", label: "同心县" },
          { value: "盐池县", label: "盐池县" }
        ]
      },
      {
        value: "固原",
        label: "固原",
        children: [
          { value: "原州区", label: "原州区" },
          { value: "西吉县", label: "西吉县" },
          {
            value: "隆德县",
            label: "隆德县"
          },
          { value: "泾源县", label: "泾源县" },
          { value: "彭阳县", label: "彭阳县" }
        ]
      },
      {
        value: "中卫",
        label: "中卫",
        children: [
          { value: "沙坡头区", label: "沙坡头区" },
          { value: "中宁县", label: "中宁县" },
          {
            value: "海原县",
            label: "海原县"
          }
        ]
      }
    ]
  },
  {
    value: "新疆维吾尔自治区",
    label: "新疆维吾尔自治区",
    children: [
      {
        value: "乌鲁木齐",
        label: "乌鲁木齐",
        children: [
          { value: "水磨沟区", label: "水磨沟区" },
          { value: "天山区", label: "天山区" },
          {
            value: "沙依巴克区",
            label: "沙依巴克区"
          },
          { value: "新市区", label: "新市区" },
          { value: "头屯河区", label: "头屯河区" },
          {
            value: "达坂城区",
            label: "达坂城区"
          },
          { value: "米东区", label: "米东区" },
          { value: "乌鲁木齐县", label: "乌鲁木齐县" }
        ]
      },
      {
        value: "克拉玛依",
        label: "克拉玛依",
        children: [
          { value: "克拉玛依区", label: "克拉玛依区" },
          { value: "独山子区", label: "独山子区" },
          {
            value: "白碱滩区",
            label: "白碱滩区"
          },
          { value: "乌尔禾区", label: "乌尔 禾区" }
        ]
      },
      {
        value: "吐鲁番",
        label: "吐鲁番",
        children: [
          { value: "高昌区", label: "高昌区" },
          { value: "鄯善县", label: "鄯善县" },
          {
            value: "托克逊县",
            label: "托克逊县"
          }
        ]
      },
      {
        value: "哈密",
        label: "哈密",
        children: [
          { value: "伊州区", label: "伊州区" },
          { value: "伊吾县", label: "伊吾县" },
          {
            value: "巴里坤哈萨克自治县",
            label: "巴里坤哈萨克自治县"
          }
        ]
      },
      {
        value: "阿克苏",
        label: "阿克苏",
        children: [
          { value: "阿克苏市", label: "阿克苏市" },
          { value: "温宿县", label: "温宿县" },
          {
            value: "库车县",
            label: "库车县"
          },
          { value: "沙雅县", label: "沙雅县" },
          { value: "新和县", label: "新和县" },
          {
            value: "拜城县",
            label: "拜城县"
          },
          { value: "乌什县", label: "乌 什县" },
          { value: "阿瓦提县", label: "阿瓦提县" },
          { value: "柯坪县", label: "柯坪县" }
        ]
      },
      {
        value: "喀什",
        label: "喀什",
        children: [
          { value: "喀什市", label: "喀什市" },
          { value: "疏附县", label: "疏附县" },
          {
            value: "疏勒县",
            label: "疏勒县"
          },
          { value: "英吉沙县", label: "英吉沙县" },
          { value: "泽普县", label: "泽普县" },
          {
            value: "莎车县",
            label: "莎车县"
          },
          { value: "叶城县", label: "叶城县" },
          { value: "麦盖提县", label: "麦盖提县" },
          {
            value: "岳普湖县",
            label: "岳普湖县"
          },
          { value: "伽师县", label: "伽师县" },
          { value: "巴楚县", label: "巴楚县" },
          {
            value: "塔什库尔干塔吉克自治县",
            label: "塔什库尔干塔吉克自治县"
          }
        ]
      },
      {
        value: "和田",
        label: "和田",
        children: [
          { value: "和田市", label: "和田市" },
          { value: "和田县", label: "和田县" },
          {
            value: "墨玉县",
            label: "墨玉县"
          },
          { value: "皮山县", label: "皮山县" },
          { value: "洛浦县", label: "洛浦县" },
          {
            value: "策勒县",
            label: "策勒县"
          },
          { value: "于田县", label: "于田县" },
          { value: "民丰县", label: "民丰县" }
        ]
      },
      {
        value: "昌吉",
        label: "昌吉",
        children: [
          { value: "昌吉市", label: "昌吉市" },
          { value: "阜康市", label: "阜康市" },
          {
            value: "呼图壁县",
            label: "呼图壁县"
          },
          { value: "玛纳斯县", label: "玛纳斯县" },
          { value: "奇台县", label: "奇台县" },
          {
            value: "吉木萨尔县",
            label: "吉木萨尔县"
          },
          { value: "木垒哈萨克自治县", label: "木垒哈萨克自治县" }
        ]
      },
      {
        value: "博尔塔 拉",
        label: "博尔塔拉",
        children: [
          { value: "博乐市", label: "博乐市" },
          { value: "阿拉山口市", label: "阿拉山口市" },
          {
            value: "精河县",
            label: "精河县"
          },
          { value: "温泉县", label: "温泉县" }
        ]
      },
      {
        value: "巴音",
        label: "巴音",
        children: [
          { value: "库尔勒市", label: "库尔勒市" },
          { value: "焉耆回族自治县", label: "焉耆回族自治县" },
          {
            value: "轮台县",
            label: "轮台县"
          },
          { value: "尉犁县", label: "尉犁县" },
          { value: "若羌县", label: "若羌县" },
          {
            value: "且末县",
            label: "且末县"
          },
          { value: "和静县", label: "和静县" },
          { value: "和硕县", label: "和硕县" },
          { value: "博湖县", label: "博湖县" }
        ]
      },
      {
        value: "克孜勒",
        label: "克孜勒",
        children: [
          { value: "阿图什市", label: "阿图什市" },
          { value: "阿克陶县", label: "阿克陶县" },
          {
            value: "阿合奇县",
            label: "阿合奇县"
          },
          { value: "乌恰县", label: "乌恰县" }
        ]
      },
      {
        value: "伊犁",
        label: "伊犁",
        children: [
          { value: "伊宁市", label: "伊宁 市" },
          { value: "奎屯市", label: "奎屯市" },
          {
            value: "伊宁县",
            label: "伊宁县"
          },
          { value: "霍尔果斯市", label: "霍尔果斯市" },
          { value: "尼勒克县", label: "尼勒克县" },
          {
            value: "伊宁县",
            label: "伊宁县"
          },
          { value: "霍城县", label: "霍城县" },
          { value: "巩留县", label: "巩留县" },
          {
            value: "新源县",
            label: "新源县"
          },
          { value: "昭苏县", label: "昭苏县" },
          { value: "特克斯县", label: "特克斯县" },
          {
            value: "察布查尔锡伯自治县",
            label: "察布查尔锡伯自治县"
          }
        ]
      },
      {
        value: "塔城",
        label: "塔城",
        children: [
          { value: "塔城市", label: "塔城市" },
          { value: "乌苏市", label: "乌苏市" },
          {
            value: "额敏县",
            label: "额敏县"
          },
          { value: "沙湾县", label: "沙湾县" },
          { value: "托里县", label: "托里县" },
          {
            value: "裕民县",
            label: "裕民县"
          },
          { value: "和布克赛尔蒙古自治县", label: "和布克赛尔蒙古自治县" }
        ]
      },
      {
        value: "阿勒泰",
        label: "阿勒泰",
        children: [
          { value: "阿勒泰市", label: "阿勒泰市" },
          { value: "布尔津县", label: "布尔津县" },
          {
            value: "富蕴县",
            label: "富蕴县"
          },
          { value: "福海县", label: "福海县" },
          { value: "哈巴河县", label: "哈巴河县" },
          {
            value: "青河县",
            label: "青河县"
          },
          { value: "吉木乃县", label: "吉 木乃县" }
        ]
      },
      { value: "石河子", label: "石河子" },
      { value: "阿拉尔", label: "阿拉尔" },
      {
        value: "图木舒克",
        label: "图木舒克"
      },
      { value: "五家渠", label: "五家渠" },
      { value: "北屯", label: "北屯" },
      {
        value: "铁门关",
        label: "铁门关"
      },
      { value: "双河", label: "双河" },
      { value: "可克达拉", label: "可克达拉" },
      { value: "昆玉", label: "昆玉" }
    ]
  },
  {
    value: "香港",
    label: "香港",
    children: [{ value: "香港", label: "香港" }]
  },
  {
    value: "澳门",
    label: "澳门",
    children: [{ value: "澳门", label: "澳门" }]
  },
  { value: "台湾", label: "台湾", children: [{ value: "台湾", label: "台湾" }] }
];

export const numList = (n = 0, length = 10, to) => {
  const list = Object.keys(Array.from({ length }));
  return list.slice(n, to ? to : list.length);
};

export const countryCode = {
  top_country: [
    {
      code: 86,
      name: "中国",
      group: "Z",
      ico: "https://picture.leigod.com/mobile_area_code/1_5/cn.png",
      iso_code: "cn"
    },
    {
      code: 1,
      name: "美国",
      group: "M",
      ico: "https://picture.leigod.com/mobile_area_code/1_5/us.png",
      iso_code: "us"
    },
    {
      code: 81,
      name: "日本",
      group: "R",
      ico: "https://picture.leigod.com/mobile_area_code/1_5/jp.png",
      iso_code: "jp"
    },
    {
      code: 82,
      name: "韩国",
      group: "H",
      ico: "https://picture.leigod.com/mobile_area_code/1_5/kr.png",
      iso_code: "kr"
    },
    {
      code: 61,
      name: "澳大利亚",
      group: "A",
      ico: "https://picture.leigod.com/mobile_area_code/1_5/au.png",
      iso_code: "au"
    },
    {
      code: 852,
      name: "中国香港",
      group: "X",
      ico: "https://picture.leigod.com/mobile_area_code/1_5/hk.png",
      iso_code: "hk"
    },
    {
      code: 853,
      name: "中国澳门",
      group: "A",
      ico: "https://picture.leigod.com/mobile_area_code/1_5/mo.png",
      iso_code: "mo"
    },
    {
      code: 886,
      name: "中国台湾",
      group: "T",
      ico: "https://picture.leigod.com/mobile_area_code/1_5/tw.png",
      iso_code: "tw"
    }
  ],
  list_country: [
    {
      group: "A",
      country: [
        {
          code: 20,
          group: "A",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/eg.png",
          iso_code: "eg",
          name: "埃及"
        },
        {
          code: 43,
          group: "A",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/at.png",
          iso_code: "at",
          name: "奥地利"
        },
        {
          code: 54,
          group: "A",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ar.png",
          iso_code: "ar",
          name: "阿根廷"
        },
        {
          code: 93,
          group: "A",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/af.png",
          iso_code: "af",
          name: "阿富汗"
        },
        {
          code: 213,
          group: "A",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/dz.png",
          iso_code: "dz",
          name: "阿尔及利亚"
        },
        {
          code: 244,
          group: "A",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ao.png",
          iso_code: "ao",
          name: "安哥拉"
        },
        {
          code: 247,
          group: "A",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ac.png",
          iso_code: "ac",
          name: "阿森松"
        },
        {
          code: 251,
          group: "A",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/et.png",
          iso_code: "et",
          name: "埃塞俄比亚"
        },
        {
          code: 297,
          group: "A",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/aw.png",
          iso_code: "aw",
          name: "阿鲁巴"
        },
        {
          code: 353,
          group: "A",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ie.png",
          iso_code: "ie",
          name: "爱尔兰"
        },
        {
          code: 355,
          group: "A",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/al.png",
          iso_code: "al",
          name: "阿尔巴尼亚"
        },
        {
          code: 372,
          group: "A",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ee.png",
          iso_code: "ee",
          name: "爱沙尼亚"
        },
        {
          code: 376,
          group: "A",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ad.png",
          iso_code: "ad",
          name: "安道尔共和国"
        },
        {
          code: 968,
          group: "A",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/om.png",
          iso_code: "om",
          name: "阿曼"
        },
        {
          code: 971,
          group: "A",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ae.png",
          iso_code: "ae",
          name: "阿拉伯联合酋长国"
        },
        {
          code: 994,
          group: "A",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/az.png",
          iso_code: "az",
          name: "阿塞拜疆"
        },
        {
          code: 1264,
          group: "A",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ai.png",
          iso_code: "ai",
          name: "安圭拉岛"
        },
        {
          code: 1268,
          group: "A",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ag.png",
          iso_code: "ag",
          name: "安提瓜和巴布达"
        }
      ]
    },
    {
      group: "B",
      country: [
        {
          code: 32,
          group: "B",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/be.png",
          iso_code: "be",
          name: "比利时"
        },
        {
          code: 48,
          group: "B",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/pl.png",
          iso_code: "pl",
          name: "波兰"
        },
        {
          code: 55,
          group: "B",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/br.png",
          iso_code: "br",
          name: "巴西"
        },
        {
          code: 92,
          group: "B",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/pk.png",
          iso_code: "pk",
          name: "巴基斯坦"
        },
        {
          code: 226,
          group: "B",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/bf.png",
          iso_code: "bf",
          name: "布基纳法索"
        },
        {
          code: 229,
          group: "B",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/bj.png",
          iso_code: "bj",
          name: "贝宁"
        },
        {
          code: 257,
          group: "B",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/bi.png",
          iso_code: "bi",
          name: "布隆迪"
        },
        {
          code: 267,
          group: "B",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/bw.png",
          iso_code: "bw",
          name: "博茨瓦纳"
        },
        {
          code: 354,
          group: "B",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/is.png",
          iso_code: "is",
          name: "冰岛"
        },
        {
          code: 359,
          group: "B",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/bg.png",
          iso_code: "bg",
          name: "保加利亚"
        },
        {
          code: 375,
          group: "B",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/by.png",
          iso_code: "by",
          name: "白俄罗斯"
        },
        {
          code: 387,
          group: "B",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ba.png",
          iso_code: "ba",
          name: "波斯尼亚和黑塞哥维那"
        },
        {
          code: 501,
          group: "B",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/bz.png",
          iso_code: "bz",
          name: "伯利兹"
        },
        {
          code: 507,
          group: "B",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/pa.png",
          iso_code: "pa",
          name: "巴拿马"
        },
        {
          code: 591,
          group: "B",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/bo.png",
          iso_code: "bo",
          name: "玻利维亚"
        },
        {
          code: 595,
          group: "B",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/py.png",
          iso_code: "py",
          name: "巴拉圭"
        },
        {
          code: 675,
          group: "B",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/pg.png",
          iso_code: "pg",
          name: "巴布亚新几内亚"
        },
        {
          code: 970,
          group: "B",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ps.png",
          iso_code: "ps",
          name: "巴勒斯坦"
        },
        {
          code: 973,
          group: "B",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/bh.png",
          iso_code: "bh",
          name: "巴林"
        },
        {
          code: 975,
          group: "B",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/bt.png",
          iso_code: "bt",
          name: "不丹"
        },
        {
          code: 1242,
          group: "B",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/bs.png",
          iso_code: "bs",
          name: "巴哈马"
        },
        {
          code: 1246,
          group: "B",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/bb.png",
          iso_code: "bb",
          name: "巴巴多斯"
        },
        {
          code: 1441,
          group: "B",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/bm.png",
          iso_code: "bm",
          name: "百慕大群岛"
        },
        {
          code: 1787,
          group: "B",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/pr.png",
          iso_code: "pr",
          name: "波多黎各"
        }
      ]
    },
    {
      group: "C",
      country: [
        {
          code: 240,
          group: "C",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/gq.png",
          iso_code: "gq",
          name: "赤道几内亚"
        },
        {
          code: 850,
          group: "C",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/kp.png",
          iso_code: "kp",
          name: "朝鲜"
        }
      ]
    },
    {
      group: "D",
      country: [
        {
          code: 45,
          group: "D",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/dk.png",
          iso_code: "dk",
          name: "丹麦"
        },
        {
          code: 49,
          group: "D",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/de.png",
          iso_code: "de",
          name: "德国"
        },
        {
          code: 228,
          group: "D",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/tg.png",
          iso_code: "tg",
          name: "多哥"
        },
        {
          code: 684,
          group: "D",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/as.png",
          iso_code: "as",
          name: "东萨摩亚(美)"
        },
        {
          code: 760,
          group: "D",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/tl.png",
          iso_code: "tl",
          name: "东帝汶"
        },
        {
          code: 1767,
          group: "D",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/do2.png",
          iso_code: "do2",
          name: "多米尼加"
        },
        {
          code: 1890,
          group: "D",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/do.png",
          iso_code: "do",
          name: "多米尼加共和国"
        }
      ]
    },
    {
      group: "E",
      country: [
        {
          code: 7,
          group: "E",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ru.png",
          iso_code: "ru",
          name: "俄罗斯"
        },
        {
          code: 291,
          group: "E",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/er.png",
          iso_code: "er",
          name: "厄立特里亚"
        },
        {
          code: 593,
          group: "E",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ec.png",
          iso_code: "ec",
          name: "厄瓜多尔"
        }
      ]
    },
    {
      group: "F",
      country: [
        {
          code: 33,
          group: "F",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/fr.png",
          iso_code: "fr",
          name: "法国"
        },
        {
          code: 63,
          group: "F",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ph.png",
          iso_code: "ph",
          name: "菲律宾"
        },
        {
          code: 238,
          group: "F",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/cv.png",
          iso_code: "cv",
          name: "佛得角"
        },
        {
          code: 298,
          group: "F",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/fo.png",
          iso_code: "fo",
          name: "法罗群岛"
        },
        {
          code: 358,
          group: "F",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/fi.png",
          iso_code: "fi",
          name: "芬兰"
        },
        {
          code: 594,
          group: "F",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/gf.png",
          iso_code: "gf",
          name: "法属圭亚那"
        },
        {
          code: 679,
          group: "F",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/fj.png",
          iso_code: "fj",
          name: "斐济"
        },
        {
          code: 689,
          group: "F",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/pf.png",
          iso_code: "pf",
          name: "法属波利尼西亚"
        }
      ]
    },
    {
      group: "G",
      country: [
        {
          code: 45,
          group: "G",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/gl.png",
          iso_code: "gl",
          name: "格陵兰"
        },
        {
          code: 53,
          group: "G",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/cu.png",
          iso_code: "cu",
          name: "古巴"
        },
        {
          code: 57,
          group: "G",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/co.png",
          iso_code: "co",
          name: "哥伦比亚"
        },
        {
          code: 220,
          group: "G",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/gm.png",
          iso_code: "gm",
          name: "冈比亚"
        },
        {
          code: 242,
          group: "G",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/cg.png",
          iso_code: "cg",
          name: "刚果"
        },
        {
          code: 243,
          group: "G",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/cd.png",
          iso_code: "cd",
          name: "刚果民主共和国"
        },
        {
          code: 506,
          group: "G",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/cr.png",
          iso_code: "cr",
          name: "哥斯达黎加"
        },
        {
          code: 590,
          group: "G",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/gp.png",
          iso_code: "gp",
          name: "瓜德罗普岛"
        },
        {
          code: 592,
          group: "G",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/gy.png",
          iso_code: "gy",
          name: "圭亚那"
        },
        {
          code: 995,
          group: "G",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ge.png",
          iso_code: "ge",
          name: "格鲁吉亚"
        },
        {
          code: 1671,
          group: "G",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/gu.png",
          iso_code: "gu",
          name: "关岛"
        },
        {
          code: 1809,
          group: "G",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/gd.png",
          iso_code: "gd",
          name: "格林纳达"
        }
      ]
    },
    {
      group: "H",
      country: [
        {
          code: 31,
          group: "H",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/nl.png",
          iso_code: "nl",
          name: "荷兰"
        },
        {
          code: 327,
          group: "H",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/kz.png",
          iso_code: "kz",
          name: "哈萨克斯坦"
        },
        {
          code: 382,
          group: "H",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/me.png",
          iso_code: "me",
          name: "黑山共和国"
        },
        {
          code: 504,
          group: "H",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/hn.png",
          iso_code: "hn",
          name: "洪都拉斯"
        },
        {
          code: 509,
          group: "H",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ht.png",
          iso_code: "ht",
          name: "海地"
        },
        {
          code: 599,
          group: "H",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/an.png",
          iso_code: "an",
          name: "荷属安的列斯群岛"
        }
      ]
    },
    {
      group: "J",
      country: [
        {
          code: 224,
          group: "J",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/gn.png",
          iso_code: "gn",
          name: "几内亚"
        },
        {
          code: 233,
          group: "J",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/gh.png",
          iso_code: "gh",
          name: "加纳"
        },
        {
          code: 241,
          group: "J",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ga.png",
          iso_code: "ga",
          name: "加蓬"
        },
        {
          code: 245,
          group: "J",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/gw.png",
          iso_code: "gw",
          name: "几内亚比绍"
        },
        {
          code: 253,
          group: "J",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/dj.png",
          iso_code: "dj",
          name: "吉布提"
        },
        {
          code: 263,
          group: "J",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/zw.png",
          iso_code: "zw",
          name: "津巴布韦"
        },
        {
          code: 420,
          group: "J",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/cz.png",
          iso_code: "cz",
          name: "捷克共和国"
        },
        {
          code: 855,
          group: "J",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/kh.png",
          iso_code: "kh",
          name: "柬埔寨"
        },
        {
          code: 996,
          group: "J",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/kg.png",
          iso_code: "kg",
          name: "吉尔吉斯斯坦"
        }
      ]
    },
    {
      group: "K",
      country: [
        {
          code: 225,
          group: "K",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ci.png",
          iso_code: "ci",
          name: "科特迪瓦"
        },
        {
          code: 237,
          group: "K",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/cm.png",
          iso_code: "cm",
          name: "喀麦隆"
        },
        {
          code: 254,
          group: "K",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ke.png",
          iso_code: "ke",
          name: "肯尼亚"
        },
        {
          code: 269,
          group: "K",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/cmr.png",
          iso_code: "cmr",
          name: "科摩罗"
        },
        {
          code: 385,
          group: "K",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/hr.png",
          iso_code: "hr",
          name: "克罗地亚"
        },
        {
          code: 682,
          group: "K",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ck.png",
          iso_code: "ck",
          name: "库克群岛"
        },
        {
          code: 965,
          group: "K",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/kw.png",
          iso_code: "kw",
          name: "科威特"
        },
        {
          code: 974,
          group: "K",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/qa.png",
          iso_code: "qa",
          name: "卡塔尔"
        },
        {
          code: 1345,
          group: "K",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ky.png",
          iso_code: "ky",
          name: "开曼群岛"
        }
      ]
    },
    {
      group: "L",
      country: [
        {
          code: 40,
          group: "L",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ro.png",
          iso_code: "ro",
          name: "罗马尼亚"
        },
        {
          code: 218,
          group: "L",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ly.png",
          iso_code: "ly",
          name: "利比亚"
        },
        {
          code: 231,
          group: "L",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/lr.png",
          iso_code: "lr",
          name: "利比里亚"
        },
        {
          code: 250,
          group: "L",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/rw.png",
          iso_code: "rw",
          name: "卢旺达"
        },
        {
          code: 262,
          group: "L",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/re.png",
          iso_code: "re",
          name: "留尼汪岛"
        },
        {
          code: 266,
          group: "L",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ls.png",
          iso_code: "ls",
          name: "莱索托"
        },
        {
          code: 352,
          group: "L",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/lu.png",
          iso_code: "lu",
          name: "卢森堡"
        },
        {
          code: 370,
          group: "L",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/lt.png",
          iso_code: "lt",
          name: "立陶宛"
        },
        {
          code: 371,
          group: "L",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/lv.png",
          iso_code: "lv",
          name: "拉脱维亚"
        },
        {
          code: 423,
          group: "L",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/li.png",
          iso_code: "li",
          name: "列支敦士登"
        },
        {
          code: 856,
          group: "L",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/la.png",
          iso_code: "la",
          name: "老挝"
        },
        {
          code: 961,
          group: "L",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/lb.png",
          iso_code: "lb",
          name: "黎巴嫩"
        }
      ]
    },
    {
      group: "M",
      country: [
        {
          code: 51,
          group: "M",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/pe.png",
          iso_code: "pe",
          name: "秘鲁"
        },
        {
          code: 52,
          group: "M",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/mx.png",
          iso_code: "mx",
          name: "墨西哥"
        },
        {
          code: 60,
          group: "M",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/my.png",
          iso_code: "my",
          name: "马来西亚"
        },
        {
          code: 95,
          group: "M",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/mm.png",
          iso_code: "mm",
          name: "缅甸"
        },
        {
          code: 212,
          group: "M",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ma.png",
          iso_code: "ma",
          name: "摩洛哥"
        },
        {
          code: 222,
          group: "M",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/rm.png",
          iso_code: "rm",
          name: "毛里塔尼亚"
        },
        {
          code: 223,
          group: "M",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ml.png",
          iso_code: "ml",
          name: "马里"
        },
        {
          code: 230,
          group: "M",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/mu.png",
          iso_code: "mu",
          name: "毛里求斯"
        },
        {
          code: 258,
          group: "M",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/mz.png",
          iso_code: "mz",
          name: "莫桑比克"
        },
        {
          code: 261,
          group: "M",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/mg.png",
          iso_code: "mg",
          name: "马达加斯加"
        },
        {
          code: 265,
          group: "M",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/mw.png",
          iso_code: "mw",
          name: "马拉维"
        },
        {
          code: 356,
          group: "M",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/mt.png",
          iso_code: "mt",
          name: "马耳他"
        },
        {
          code: 373,
          group: "M",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/md.png",
          iso_code: "md",
          name: "摩尔多瓦"
        },
        {
          code: 377,
          group: "M",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/mc.png",
          iso_code: "mc",
          name: "摩纳哥"
        },
        {
          code: 389,
          group: "M",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/mk.png",
          iso_code: "mk",
          name: "马其顿"
        },
        {
          code: 596,
          group: "M",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/mq.png",
          iso_code: "mq",
          name: "马提尼克"
        },
        {
          code: 880,
          group: "M",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/bd.png",
          iso_code: "bd",
          name: "孟加拉国"
        },
        {
          code: 960,
          group: "M",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/mv.png",
          iso_code: "mv",
          name: "马尔代夫"
        },
        {
          code: 976,
          group: "M",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/mn.png",
          iso_code: "mn",
          name: "蒙古"
        },
        {
          code: 1664,
          group: "M",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ms.png",
          iso_code: "ms",
          name: "蒙特塞拉特"
        },
        {
          code: 1670,
          group: "M",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/mp.png",
          iso_code: "mp",
          name: "马里亚纳群岛"
        }
      ]
    },
    {
      group: "N",
      country: [
        {
          code: 27,
          group: "N",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/za.png",
          iso_code: "za",
          name: "南非"
        },
        {
          code: 47,
          group: "N",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/no.png",
          iso_code: "no",
          name: "挪威"
        },
        {
          code: 211,
          group: "N",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ss.png",
          iso_code: "ss",
          name: "南苏丹"
        },
        {
          code: 227,
          group: "N",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ne.png",
          iso_code: "ne",
          name: "尼日尔"
        },
        {
          code: 234,
          group: "N",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ng.png",
          iso_code: "ng",
          name: "尼日利亚"
        },
        {
          code: 264,
          group: "N",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/na.png",
          iso_code: "na",
          name: "纳米比亚"
        },
        {
          code: 381,
          group: "N",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/yu.png",
          iso_code: "yu",
          name: "南斯拉夫"
        },
        {
          code: 505,
          group: "N",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ni.png",
          iso_code: "ni",
          name: "尼加拉瓜"
        },
        {
          code: 674,
          group: "N",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/nr.png",
          iso_code: "nr",
          name: "瑙鲁"
        },
        {
          code: 977,
          group: "N",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/np.png",
          iso_code: "np",
          name: "尼泊尔"
        }
      ]
    },
    {
      group: "P",
      country: [
        {
          code: 351,
          group: "P",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/pt.png",
          iso_code: "pt",
          name: "葡萄牙"
        }
      ]
    },
    {
      group: "R",
      country: [
        {
          code: 41,
          group: "R",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ch.png",
          iso_code: "ch",
          name: "瑞士"
        },
        {
          code: 46,
          group: "R",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/se.png",
          iso_code: "se",
          name: "瑞典"
        }
      ]
    },
    {
      group: "S",
      country: [
        {
          code: 94,
          group: "S",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/lk.png",
          iso_code: "lk",
          name: "斯里兰卡"
        },
        {
          code: 221,
          group: "S",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/sn.png",
          iso_code: "sn",
          name: "塞内加尔"
        },
        {
          code: 232,
          group: "S",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/sl.png",
          iso_code: "sl",
          name: "塞拉利昂"
        },
        {
          code: 239,
          group: "S",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/st.png",
          iso_code: "st",
          name: "圣多美和普林西比"
        },
        {
          code: 248,
          group: "S",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/sc.png",
          iso_code: "sc",
          name: "塞舌尔"
        },
        {
          code: 249,
          group: "S",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/sd.png",
          iso_code: "sd",
          name: "苏丹"
        },
        {
          code: 252,
          group: "S",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/so.png",
          iso_code: "so",
          name: "索马里"
        },
        {
          code: 268,
          group: "S",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/sz.png",
          iso_code: "sz",
          name: "斯威士兰"
        },
        {
          code: 357,
          group: "S",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/cy.png",
          iso_code: "cy",
          name: "塞浦路斯"
        },
        {
          code: 378,
          group: "S",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/sm.png",
          iso_code: "sm",
          name: "圣马利诺"
        },
        {
          code: 381,
          group: "S",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/rs.png",
          iso_code: "rs",
          name: "塞尔维亚"
        },
        {
          code: 386,
          group: "S",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/si.png",
          iso_code: "si",
          name: "斯洛文尼亚"
        },
        {
          code: 421,
          group: "S",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/sk.png",
          iso_code: "sk",
          name: "斯洛伐克"
        },
        {
          code: 503,
          group: "S",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/sv.png",
          iso_code: "sv",
          name: "萨尔瓦多"
        },
        {
          code: 508,
          group: "S",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/pm.png",
          iso_code: "pm",
          name: "圣皮埃尔和密克隆"
        },
        {
          code: 597,
          group: "S",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/sr.png",
          iso_code: "sr",
          name: "苏里南"
        },
        {
          code: 677,
          group: "S",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/sb.png",
          iso_code: "sb",
          name: "所罗门群岛"
        },
        {
          code: 685,
          group: "S",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ws.png",
          iso_code: "ws",
          name: "萨摩亚"
        },
        {
          code: 966,
          group: "S",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/sa.png",
          iso_code: "sa",
          name: "沙特阿拉伯"
        },
        {
          code: 1758,
          group: "S",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/lc.png",
          iso_code: "lc",
          name: "圣卢西亚岛"
        },
        {
          code: 1784,
          group: "S",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/vc.png",
          iso_code: "vc",
          name: "圣文森特格林纳丁斯"
        },
        {
          code: 1869,
          group: "S",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/kn.png",
          iso_code: "kn",
          name: "圣基茨和尼维斯"
        }
      ]
    },
    {
      group: "T",
      country: [
        {
          code: 66,
          group: "T",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/th.png",
          iso_code: "th",
          name: "泰国"
        },
        {
          code: 90,
          group: "T",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/tr.png",
          iso_code: "tr",
          name: "土耳其"
        },
        {
          code: 216,
          group: "T",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/tn.png",
          iso_code: "tn",
          name: "突尼斯"
        },
        {
          code: 255,
          group: "T",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/tz.png",
          iso_code: "tz",
          name: "坦桑尼亚"
        },
        {
          code: 676,
          group: "T",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/to.png",
          iso_code: "to",
          name: "汤加"
        },
        {
          code: 992,
          group: "T",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/tj.png",
          iso_code: "tj",
          name: "塔吉克斯坦"
        },
        {
          code: 993,
          group: "T",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/tm.png",
          iso_code: "tm",
          name: "土库曼斯坦"
        },
        {
          code: 1649,
          group: "T",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/tc.png",
          iso_code: "tc",
          name: "特克斯和凯克斯群岛"
        },
        {
          code: 1809,
          group: "T",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/tt.png",
          iso_code: "tt",
          name: "特立尼达和多巴哥"
        }
      ]
    },
    {
      group: "W",
      country: [
        {
          code: 58,
          group: "W",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ve.png",
          iso_code: "ve",
          name: "委内瑞拉"
        },
        {
          code: 233,
          group: "W",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/uz.png",
          iso_code: "uz",
          name: "乌兹别克斯坦"
        },
        {
          code: 256,
          group: "W",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ug.png",
          iso_code: "ug",
          name: "乌干达"
        },
        {
          code: 380,
          group: "W",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ua.png",
          iso_code: "ua",
          name: "乌克兰"
        },
        {
          code: 502,
          group: "W",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/gt.png",
          iso_code: "gt",
          name: "危地马拉"
        },
        {
          code: 598,
          group: "W",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/uy.png",
          iso_code: "uy",
          name: "乌拉圭"
        },
        {
          code: 673,
          group: "W",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/bn.png",
          iso_code: "bn",
          name: "文莱"
        },
        {
          code: 678,
          group: "W",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/vu.png",
          iso_code: "vu",
          name: "瓦努阿图"
        }
      ]
    },
    {
      group: "X",
      country: [
        {
          code: 30,
          group: "X",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/gr.png",
          iso_code: "gr",
          name: "希腊"
        },
        {
          code: 34,
          group: "X",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/es.png",
          iso_code: "es",
          name: "西班牙"
        },
        {
          code: 36,
          group: "X",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/hu.png",
          iso_code: "hu",
          name: "匈牙利"
        },
        {
          code: 64,
          group: "X",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/nz.png",
          iso_code: "nz",
          name: "新西兰"
        },
        {
          code: 65,
          group: "X",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/sg.png",
          iso_code: "sg",
          name: "新加坡"
        },
        {
          code: 687,
          group: "X",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/nc.png",
          iso_code: "nc",
          name: "新喀里多尼亚"
        },
        {
          code: 963,
          group: "X",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/sy.png",
          iso_code: "sy",
          name: "叙利亚"
        }
      ]
    },
    {
      group: "Y",
      country: [
        {
          code: 39,
          group: "Y",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/it.png",
          iso_code: "it",
          name: "意大利"
        },
        {
          code: 44,
          group: "Y",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/gb.png",
          iso_code: "gb",
          name: "英国"
        },
        {
          code: 62,
          group: "Y",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/id.png",
          iso_code: "id",
          name: "印度尼西亚"
        },
        {
          code: 84,
          group: "Y",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/vn.png",
          iso_code: "vn",
          name: "越南"
        },
        {
          code: 91,
          group: "Y",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/in.png",
          iso_code: "in",
          name: "印度"
        },
        {
          code: 98,
          group: "Y",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ir.png",
          iso_code: "ir",
          name: "伊朗"
        },
        {
          code: 374,
          group: "Y",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/am.png",
          iso_code: "am",
          name: "亚美尼亚"
        },
        {
          code: 962,
          group: "Y",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/jo.png",
          iso_code: "jo",
          name: "约旦"
        },
        {
          code: 964,
          group: "Y",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/iq.png",
          iso_code: "iq",
          name: "伊拉克"
        },
        {
          code: 967,
          group: "Y",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/ye.png",
          iso_code: "ye",
          name: "也门"
        },
        {
          code: 972,
          group: "Y",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/il.png",
          iso_code: "il",
          name: "以色列"
        },
        {
          code: 1284,
          group: "Y",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/vg.png",
          iso_code: "vg",
          name: "英属维尔京群岛"
        },
        {
          code: 1876,
          group: "Y",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/jm.png",
          iso_code: "jm",
          name: "牙买加"
        }
      ]
    },
    {
      group: "Z",
      country: [
        {
          code: 44,
          group: "Z",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/je.png",
          iso_code: "je",
          name: "泽西"
        },
        {
          code: 56,
          group: "Z",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/cl.png",
          iso_code: "cl",
          name: "智利"
        },
        {
          code: 235,
          group: "Z",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/td.png",
          iso_code: "td",
          name: "乍得"
        },
        {
          code: 236,
          group: "Z",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/cf.png",
          iso_code: "cf",
          name: "中非共和国"
        },
        {
          code: 243,
          group: "Z",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/zr.png",
          iso_code: "zr",
          name: "扎伊尔"
        },
        {
          code: 260,
          group: "Z",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/zm.png",
          iso_code: "zm",
          name: "赞比亚"
        },
        {
          code: 350,
          group: "Z",
          ico: "https://picture.leigod.com/mobile_area_code/1_5/gi.png",
          iso_code: "gi",
          name: "直布罗陀"
        }
      ]
    }
  ]
};

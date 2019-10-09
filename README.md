# NN约玩 mobile

> platform (目标平台)

- `wechat`
- `mobile browser`
- `android app`(PWA)

> tree (项目结构)

```
├─assets (资源文件)
│  └─images
├─components  (组件)
│  ├─public
│  └─skeleton (骨架屏)
├─config  (配置)
├─service (服务)
├─permission.js (权限)
├─registerServiceWorker.js (PWA注册机)
├─skeleton.js (骨架屏注册)
├─index.styl (全局样式)
├─store (数据)
│  └─modules
├─utils (工具)
└─views (视图)
    ├─account (个人中心)
    ├─artboard  (服务申请)
    ├─root  (首页)
    └─sign  (注册/登录)
```

> project package

- request: [axios](https://github.com/axios/axios)
- user-agent: [current-device](https://github.com/matthewhudson/current-device)
- utils: [lodash](https://www.html.cn/doc/lodash/)
- UI: [mand-mobile](https://didi.github.io/mand-mobile/#/zh-CN/home)
- WebRTC: [recordrtc](https://github.com/muaz-khan/RecordRTC)
- cropper: [vue-cropperjs](https://github.com/Agontuk/vue-cropperjs)


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

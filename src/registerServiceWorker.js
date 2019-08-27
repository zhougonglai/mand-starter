/* eslint-disable no-console */
import { register, unregister } from "register-service-worker";

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js?timestamp=${Date.now()}`, {
    ready(registration) {
      if (window.SW_TURN_OFF) {
        unregister();
      }
      console.log("Service worker 激活成功", registration, self);
    },
    registered(registration) {
      console.log("Service worker 注册成功.", registration);
    },
    cached(registration) {
      console.log("缓存文件已经缓存完成", registration);
    },
    updatefound(registration) {
      console.log("新的版本正在更新中", registration);
    },
    updated(registration) {
      registration.update();
      window.dispatchEvent(new Event("sw.update"));
      console.log("新的版本已经更新完毕,请刷新", registration);
    },
    offline() {
      console.log("应用已经离线");
    },
    error(error) {
      console.error("注册发生错误", error);
    }
  });

  self.addEventListener("install", () => {
    self.skipWaiting();
  });

  self.addEventListener("activate", event => {
    event.waitUntil(self.clients.claim());
    console.log("claim", self.clients);
  });
}

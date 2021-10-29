// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "@/store/index";

import ElementUI, { Switch } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import $http from "./config/httpConfig";
Vue.use(ElementUI);
import baseUrl from "@/config/baseUrl";
import * as echarts from "echarts";
Vue.use(echarts);

import "@/styles/index.scss"; // global css

Vue.config.productionTip = false;

Vue.prototype.$echarts = echarts;
Vue.prototype.baseUrl = baseUrl;
Vue.prototype.$http = "";

/**
 * 路由权限拦截
 */
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("USER_TOKEN");
  if (token && token != "undefined") {
    if (to.path == "/login") {
      // 已经登录过，不允许回到登录页面
      next(from.fullPath);
    } else {
      if (!store.state.permission.hasGetRoute) {
        store.dispatch("permission/GET_PERMISSION").then(res => {
          next();
        });
      } else {
        next();
      }
    }
  } else {
    localStorage.clear();
    if (to.path == "/login") {
      next();
    } else {
      next("/login");
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});

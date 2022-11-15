import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
(() => import("@/assets/iconfont/iconfont.css"))(); // 引入自定义图标
import * as echarts from "echarts";
import { loginout } from "@/util/publicapis/index.js";
// 引入vue-echarts
import ECharts from "vue-echarts";
import "echarts";
Vue.component("ECharts", ECharts);

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts; // 挂载echarts
Vue.prototype.$loginout = loginout; // 挂载登出功能
window.__proto__.$loginout = loginout; // 挂载登出功能

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

// 引入mockjs
require('./mockjs/mock')
import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import Loading from "./components/loading/loading";
Vue.use(Loading);

Vue.config.productionTip = false;
Vue.filter("format_quantity", (v) => {
  let param = {};
  if (v > 100000000) {
    param.v = (v / 100000000).toFixed(1);
    param.u = "亿";
  } else if (v > 10000) {
    param.v = (v / 10000).toFixed(2);
    param.u = "万";
  } else {
    param.v = v;
    param.u = "";
  }
  return "♫ " + param.v + param.u;
});
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

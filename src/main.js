import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import { Lazyload } from 'vant';
import 'lib-flexible';
import {get} from "./interceptor";


Vue.config.productionTip = false;
Vue.use(Lazyload);


Vue.prototype.get = get;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");


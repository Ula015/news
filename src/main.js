import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Notifications from "vue-notification";
import velocity from "velocity-animate";
import { VueMaskDirective } from "v-mask";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;
Vue.directive("mask", VueMaskDirective);
Vue.use(Notifications, { velocity }, BootstrapVue, IconsPlugin);
Vue.use(IconsPlugin);
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

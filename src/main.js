import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import { mapActions } from "vuex";

import "./common/element-ui";
import "./style/public.scss";

Vue.config.productionTip = false

new Vue({
  created() {
    window.vueInstance = this;
    this.refreshPage();
  },
  methods: {
    ...mapActions(["refreshPage"])
  },
  router,
  store,
  render: h => h(App)
}).$mount("#app")
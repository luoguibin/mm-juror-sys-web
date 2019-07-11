import Vue from "vue";

import ElementUI from "element-ui";
import "./style/theme-chalk/index.css";

Vue.use(ElementUI);

import App from "./App.vue";
import router from "./router";
import store from "./store";
import { mapActions } from "vuex";

import "./style/main.scss";
import "./mock";

Vue.config.productionTip = false
import moment from "moment";
Vue.filter("timeFilter", function (value) {
  if (typeof value === "number") {
    return moment(value).format("YYYY-MM-DD  HH:mm:ss");
  } else {
    return value
  }
})

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
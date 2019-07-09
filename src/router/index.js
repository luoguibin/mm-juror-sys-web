import Vue from "vue";
import Router from "vue-router";
import Error404 from "../page/error404";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: "/error404",
      name: "error404",
      component: Error404
    }
  ]
})

export default router;
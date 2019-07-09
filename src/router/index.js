import Vue from "vue";
import Router from "vue-router";
import Error404 from "../page/error404";
import Login from "../page/login"

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: "/error404",
      name: "error404",
      component: Error404
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
})

export default router;
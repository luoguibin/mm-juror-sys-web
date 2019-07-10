import Vue from "vue";
import Router from "vue-router";
import store from "../store";
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

router.beforeEach((to, from, next) => {
  // console.log("router.beforeEach:  " + from.fullPath + " --> " + to.fullPath);
  const userInfo = store.state.user.userInfo;
  if (to.name === "login") {
    if (userInfo) {
      next(false);
    } else {
      next();
    }
  } else {
    const meta = to.meta;
    if (Object.keys(meta).length) {
      if (meta.isAuth) {
        if (userInfo) {
          next();
        } else {
          next({
            path: "/login", query: {
              redirect: from.fullPath
            }
          });
        }
      } else {
        next();
      }
    } else {
      if (userInfo) {
        next();
      } else {
        const o = {
          path: "/login"
        }
        if (to.name !== "login" && to.fullPath !== "/") {
          o.query = {
            redirect: to.fullPath
          }
        }
        next(o);
      }
    }
  }

});

router.afterEach((to, from) => {
  // console.log("router.afterEach");
});

router.onError(err => {
  console.error("onError", err)
});

export default router;
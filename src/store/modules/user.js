import { loginByAccount, logoutAccount, getUserMenu } from "@/http/api/user";
import router from "../../router";
import Error404 from "@/page/error404";
import { Message } from "element-ui";

export default {
    // namespaced: true,
    state: {
        userInfo: JSON.parse(sessionStorage.getItem("mm-juror-userinfo")) || { authType: "ADMIN", username: "admin", pw: "123456" },
        menu: JSON.parse(sessionStorage.getItem("mm-juror-menu")) || {
            routers: [{
                name: "hello",
                componentPath: "hello",
                path: "/hello"
            }]
        }
    },
    getters: {
        authType: state => {
            if (state.userInfo) {
                return state.userInfo.authType;
            } else {
                return "";
            }
        }
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
            if (userInfo) {
                // todo: 打开另一个标签登录问题
                document.cookie += "testNum:100";
                sessionStorage.setItem("mm-juror-userinfo", JSON.stringify(userInfo));
            } else {
                sessionStorage.removeItem("mm-juror-userinfo");
            }
        },
        setUserMenu(state, menu) {
            state.menu = menu;
            if (menu && menu.routers) {
                sessionStorage.setItem("mm-juror-menu", JSON.stringify(menu));
            } else {
                sessionStorage.removeItem("mm-juror-menu");
            }
        }
    },
    actions: {
        async loginByAccount(context, account) {
            try {
                const { data } = await loginByAccount(account);
                if (data.code === 200) {
                    const { content: userInfo } = data;
                    context.commit("setUserInfo", userInfo);
                    return userInfo;
                } else {
                    Message.error({
                        message: data.msg || "登录失败"
                    });
                    return null;
                }
            } catch (error) {
                console.error("Store::loginByAccount", error);
            }
        },

        async getUserMenu(context) {
            try {
                const { data: menu } = await getUserMenu({ authType: context.getters.authType });
                context.dispatch("setUserMenu", menu);
                return menu;
            } catch (error) {
                console.error("Store::setUserMenu", error);
                return error
            }
        },

        /**
         * 刷新界面后重新设置用户路由信息
         * @param {*} context 
         */
        refreshPage(context) {
            if (context.state.userInfo) {
                context.dispatch("setUserMenu", context.state.menu);
            }
        },

        /**
         * 退出登录
         * @param {*} context 
         */
        logout(context) {
            logoutAccount().finally(() => {
                localStorage.removeItem("gd-job-userinfo");
                sessionStorage.clear();
                context.commit("setUserInfo");
                context.commit("setUserMenu");
                window.location.reload();
            });
        },

        /**
         * 设置用户菜单
         * @param {*} context 
         * @param {*} menu 用户菜单对象
         */
        setUserMenu(context, menu) {
            const children = [],
                newRouters = [
                    {
                        path: "/home",
                        name: "home",
                        component: () => import("@/page/home/index"),
                        meta: {
                            isAuth: true
                        },
                        children
                    }
                ];

            menu.routers.forEach(o => {
                if (o.level) {
                    newRouters.push({
                        path: "/" + o.path,
                        name: o.name,
                        component: () => import("@/views/" + o.componentPath + "index")
                            .catch(() => Error404),
                        meta: o.meta
                    })
                } else {
                    children.push({
                        path: o.path,
                        name: o.name,
                        // index结尾打包，减少打包后的js文件个数
                        component: () => import("@/views/" + o.componentPath + "index")
                            .catch(() => Error404),
                        meta: o.meta || {}
                    });
                }
            });
            newRouters.push({ path: "/*", redirect: "/home" });
            router.addRoutes(newRouters)

            context.commit("setUserMenu", menu);
        }
    }
}
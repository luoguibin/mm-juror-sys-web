import request from "../index";

export const loginByAccount = data =>
    request({
        url: "/v1/user/login",
        method: "post",
        data
    })

export const createAccount = data =>
    request({
        url: "/v1/user/create",
        method: "post",
        data
    })

export const logoutAccount = () => {
    return new Promise(function (resolve, reject) {
        resolve({
            code: 1000,
            msg: "退出成功"
        })
    })
}

export const getUserMenu = ({ authType }) => {
    const menu = {
        routers: [
            {
                name: "home",
                componentPath: "home/",
                title: "首页",
                path: "home"
            },
            {
                name: "random-panel",
                componentPath: "random-panel/",
                title: "随机抽取",
                path: "random-panel",
                parent: "home"
            },
            {
                name: "juror-manage",
                componentPath: "juror-manage/",
                title: "陪审员信息",
                path: "juror-manage",
                parent: "home"
            },
            {
                name: "case-manage",
                componentPath: "case-manage/",
                title: "案件管理",
                path: "case-manage",
                parent: "home"
            }]
    }
    return new Promise(function (resolve, reject) {
        if (authType === "ADMIN") {
            menu.routers.push({
                name: "user-manage",
                componentPath: "user-manage/",
                path: "user-manage",
                title: "用户管理",
                parent: "home"
            })
        }
        resolve(menu);
    })
}
import request from "../index";

export const loginByAccount = data => {
    return new Promise(function (resolve, reject) {
        resolve({
            data: {
                code: 1000,
                data: {
                    ...data,
                    token: "helloworld",
                    name: "liming",
                    authType: data.id === 15688888888 ? "ADMIN" : "NORMAL"
                },
                msg: "登录成功"
            }
        })
    })

    // return request({
    //     url: "/v1/user/login",
    //     method: "post",
    //     data
    // })
}

export const createAccount = data =>
    request({
        url: "/v1/user/create",
        method: "post",
        data
    })

export const updateAccount = data =>
    request({
        url: "/v1/user/update",
        method: "post",
        data,
        params: {
            token: true
        }
    })

export const deleteAccount = params =>
    request({
        url: "/v1/user/delete",
        method: "delete",
        params
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

export const getUserList = params => {
    return new Promise(function (resolve, reject) {
        resolve({
            data: {
                data: [
                    { id: 1, name: "name01", authType: "ADMIN", timeCreate: new Date().toJSON() },
                    { id: 2, name: "name02", authType: "NORMAL", timeCreate: new Date().toJSON() },
                    { id: 3, name: "name03", authType: "ADMIN", timeCreate: new Date().toJSON() }
                ],
                total: 300,
                code: 1000,
                msg: "获取成功"
            }
        })
    })
    // return request({
    //     url: "/v1/user/query-list",
    //     method: "get",
    //     params
    // })
}
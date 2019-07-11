import request from "../index";
import apiData from "./data";

export const loginByAccount = data => {
    return new Promise(function (resolve, reject) {
        const user = apiData.users.find(o => {
            return o.id === data.id;
        })
        if (user && user.pw === data.pw) {
            resolve({
                data: {
                    code: 1000,
                    data: {
                        ...user,
                        token: "helloworld" + new Date().getTime()
                    },
                    msg: "登录成功"
                }
            })
        } else {
            resolve({
                data: {
                    code: 1001,
                    msg: "账号或密码错误"
                }
            })
        }

    })

    // return request({
    //     url: "/v1/user/login",
    //     method: "post",
    //     data
    // })
}

export const createAccount = data => {
    return new Promise(function (resolve, reject) {
        const user = apiData.addUser(data)
        resolve({
            data: {
                code: user ? 1000 : 10001,
                msg: user ? "新增成功" : "新增失败"
            }
        })
    })
    // request({
    //     url: "/v1/user/create",
    //     method: "post",
    //     data
    // })
}

export const updateAccount = data => {
    return new Promise(function (resolve, reject) {
        const flag = apiData.updateUser(data)
        resolve({
            data: {
                code: flag ? 1000 : 10001,
                msg: flag ? "更新成功" : "更新失败"
            }
        })
    })
    // request({
    //     url: "/v1/user/update",
    //     method: "post",
    //     data,
    //     params: {
    //         token: true
    //     }
    // })
}


export const deleteAccount = params => {
    return new Promise(function (resolve, reject) {
        const flag = apiData.deleteUser(params)
        resolve({
            data: {
                code: flag ? 1000 : 10001,
                msg: flag ? "删除成功" : "删除失败"
            }
        })
    })
    // request({
    //     url: "/v1/user/delete",
    //     method: "delete",
    //     params
    // })    
}

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
        const page = params.page || 1;
        const limit = params.limit || 10;
        const start = (page - 1) * limit;
        resolve({
            data: {
                data: apiData.users.slice(start, start + limit),
                total: apiData.userTotal(),
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
import request from "../index";

export const apiTest = (params, data) => 
    request({
        url: "/api/user/test",
        method: "post",
        params, 
        data
    })

export const loginByAccount = data => {
    return request({
        url: "/api/user/login",
        method: "post",
        data: {
            id: data.id,
            pw: data.pw
        }
    })
}

export const createAccount = data => {
    return request({
        url: "/api/user/create",
        method: "post",
        data
    })
}

export const updateAccount = data => {
    return request({
        url: "/api/user/modify",
        method: "post",
        data,
        params: {
            token: true
        }
    })
}


export const deleteAccount = params => {
    return request({
        url: "/api/user/delete",
        method: "delete",
        params
    })    
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

        ]
    }
    return new Promise(function (resolve, reject) {
        if (authType >= 5) {
            menu.routers.push({
                name: "case-manage",
                componentPath: "case-manage/",
                title: "案件管理",
                path: "case-manage",
                parent: "home"
            });
            menu.routers.push({
                name: "juror-manage",
                componentPath: "juror-manage/",
                title: "陪审员信息",
                path: "juror-manage",
                parent: "home"
            });
            menu.routers.push({
                name: "user-manage",
                componentPath: "user-manage/",
                path: "user-manage",
                title: "用户管理",
                parent: "home"
            })
        } else {
            menu.routers.push({
                name: "user-case",
                componentPath: "user-case/",
                path: "user-case",
                title: "我的案件",
                parent: "home"
            })
        }
        resolve(menu);
    })
}

export const getUserList = params => {
    return request({
        url: "/api/user/query",
        method: "get",
        params
    })
}
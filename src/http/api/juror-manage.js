import request from "../index";

export const getJurors = params => {
    return request({
        url: "/api/juror/query",
        method: "get",
        params
    })
}

export const getLowJurors = params => {
    return request({
        url: "/api/juror/query-low",
        method: "get",
        params
    })
}

export const getUndertakers = params => {
    return request({
        url: "/api/juror/query-takers",
        method: "get",
        params
    })
}

export const deleteJuror = params => {
    return request({
        url: "/api/juror/delete",
        method: "delete",
        params
    })
}

export const saveJuror = data => {
    return request({
        url: "/api/juror/modify",
        method: "post",
        data
    })
}

export const getCityJurors = params => {
    return request({
        url: "/api/juror/query-city-jurors",
        method: "get",
        params
    })
}
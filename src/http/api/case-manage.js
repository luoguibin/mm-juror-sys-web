import request from "../index";

export const getLawCases = params => {
    return request({
        url: "/api/case/query",
        method: "get",
        params
    })
}

export const getLawCasesByJurorId = params => {
    return request({
        url: "/api/case/query-by-jurorid",
        method: "get",
        params
    })
}

export const getLawCase = params => {
    return request({
        url: "/api/case/query-one",
        method: "get",
        params
    })
}

export const deleteLawCase = params => {
    return request({
        url: "/api/case/delete",
        method: "delete",
        params
    })
}

export const saveLawCase = data => {
    return request({
        url: "/api/case/modify",
        method: "post",
        data
    })
}

export const getCaseConfig = () => {
    return request({
        url: "/api/case/config",
        method: "get"
    })
}
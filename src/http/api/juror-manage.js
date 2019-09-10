import apiData from "./data";
import request from "../index";

export const getJurors = params => {
    console.log(JSON.stringify(params));
    return request({
        url: "/api/juror/query",
        method: "get",
        params
    })
    return new Promise(function (resolve, reject) {
        const id = params.id;
        if (id) {
            const juror = apiData.jurors.find(o => {
                return o.id === id;
            });
            if (juror) {
                juror.servantUnit = apiData.findServantUnit(juror.servantUnitId)
            }
            resolve({
                data: {
                    code: juror ? 1000 : 1001,
                    msg: juror ? "查询成功" : "查询失败",
                    data: juror ? JSON.parse(JSON.stringify([juror])) : []
                }
            })
            return;
        }
        const page = params.page || 1;
        const limit = params.limit || 10;
        const start = (page - 1) * limit;
        const orderType = params.orderType;
        if (!orderType) {
            const temp = apiData.jurors;
            const result = temp.slice(start, start + limit);
            result.forEach(o => {
                o.servantUnit = apiData.findServantUnit(o.servantUnitId)
            });
            resolve({
                data: {
                    code: 1000,
                    msg: "获取成功",
                    total: temp.length,
                    data: JSON.parse(JSON.stringify(result))
                }
            })
        } else {
            const tempJurors = apiData.jurors.filter(o => true);
            if (orderType === 1) {
                tempJurors.sort(function (a, b) {
                    return a.caseCount < b.caseCount ? 1 : -1;
                })
            } else {
                tempJurors.sort(function (a, b) {
                    return a.caseCount > b.caseCount ? 1 : -1;
                })
            }
            const result = tempJurors.slice(start, start + limit);
            result.forEach(o => {
                o.servantUnit = apiData.findServantUnit(o.servantUnitId)
            });
            resolve({
                data: {
                    code: 1000,
                    msg: "获取成功",
                    total: tempJurors.length,
                    data: JSON.parse(JSON.stringify(result))
                }
            })
        }
    })
}

export const getLowJurors = params => {
    console.log(JSON.stringify(params));
    return request({
        url: "/api/juror/query-low",
        method: "get",
        params
    })
    return new Promise(function (resolve, reject) {
        const result = apiData.getLowJurors(params),
            flag = result.length;
        resolve({
            data: {
                code: flag ? 1000 : 1001,
                msg: flag ? "获取成功" : "获取失败",
                data: JSON.parse(JSON.stringify(result))
            }
        })
    })
}

export const getUndertakers = params => {
    console.log(JSON.stringify(params));
    return request({
        url: "/api/juror/query-takers",
        method: "get",
        params
    })
    return new Promise(function (resolve, reject) {
        resolve({
            data: {
                code: 1000,
                data: {
                    undertakers: JSON.parse(JSON.stringify(apiData.undertakers)),
                    servantUnits: JSON.parse(JSON.stringify(apiData.servantUnits))
                },
                msg: "获取成功"
            }
        })
    })
}

export const deleteJuror = params => {
    console.log(JSON.stringify(params));
    return request({
        url: "/api/juror/delete",
        method: "delete",
        params
    })
    return new Promise(function (resolve, reject) {
        const index = apiData.jurors.findIndex(o => o.id === params.id);
        if (index >= 0) {
            apiData.jurors.splice(index, 1);
        }
        resolve({
            data: {
                code: index >= 0 ? 1000 : 1001,
                msg: index >= 0 ? "删除成功" : "删除失败"
            }
        })
    })
}

export const saveJuror = data => {
    console.log(JSON.stringify(data));
    return request({
        url: "/api/juror/modify",
        method: "post",
        data
    })
    return new Promise(function (resolve, reject) {
        const flag = apiData.saveJuror(data);
        resolve({
            data: {
                code: flag ? 1000 : 1001,
                msg: flag ? "保存成功" : "保存失败"
            }
        })
    })
}

export const getCityJurors = params => {
    console.log(JSON.stringify(params));
    return request({
        url: "/api/juror/query-city-jurors",
        method: "get",
        params
    })
    return new Promise(function (resolve, reject) {
        const result = apiData.jurors.filter(o => {
            const prefix = ("" + o.servantUnitId).substring(0, 4);
            const cityId = +prefix;
            return cityId === params.cityId;
        })
        resolve({
            data: {
                code: 1000,
                data: result,
                msg: "获取成功"
            }
        })
    })
}
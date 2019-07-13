import apiData from "./data";

export const getJurors = params => {
    return new Promise(function (resolve, reject) {
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
                    data: result
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
                    data: result
                }
            })
        }
    })
}

export const getLowJurors = data => {
    return new Promise(function (resolve, reject) {
        const result = apiData.getLowJurors(),
            flag = result.length;
        resolve({
            data: {
                code: flag ? 1000 : 1001,
                msg: flag ? "获取成功" : "获取失败",
                data: result
            }
        })
    })
}

export const getUndertakers = params => {
    return new Promise(function (resolve, reject) {
        resolve({
            data: {
                code: 1000,
                data: {
                    undertakers: apiData.undertakers,
                    servantUnits: apiData.servantUnits
                },
                msg: "获取成功"
            }
        })
    })
}
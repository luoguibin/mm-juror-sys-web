import apiData from "./data";

export const getJurors = params => {
    return new Promise(function (resolve, reject) {
        const page = params.page || 1;
        const limit = params.limit || 10;
        const start = (page - 1) * limit;
        const orderType = params.orderType;
        if (orderType === -1) {
            resolve({
                data: {
                    code: 1000,
                    msg: "获取成功",
                    total: apiData.jurorTotal(),
                    data: apiData.jurors.slice(start, start + limit)
                }
            })
        } else {
            const tempJurors = apiData.jurors.filter(o => true);
            if (orderType === 0) {
                tempJurors.sort(function (a, b) {
                    return a.caseCount < b.caseCount ? 1 : -1;
                })
            } else {
                tempJurors.sort(function (a, b) {
                    return a.caseCount > b.caseCount ? 1 : -1;
                })
            }
            resolve({
                data: {
                    code: 1000,
                    msg: "获取成功",
                    total: tempJurors.length,
                    data: tempJurors.slice(start, start + limit)
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
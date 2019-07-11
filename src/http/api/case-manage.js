import apiData from "./data";

export const getLawCases = params => {
    return new Promise(function (resolve, reject) {
        const page = params.page || 1;
        const limit = params.limit || 10;
        const start = (page - 1) * limit;

        if (params.status === -1) {
            resolve({
                data: {
                    code: 1000,
                    msg: "获取成功",
                    total: apiData.lawCaseTotal(),
                    data: apiData.lawCases.slice(start, start + limit)
                }
            })
        } else {
            const tempDatas = apiData.lawCases.filter(o => o.status === params.status);
            resolve({
                data: {
                    code: 1000,
                    msg: "获取成功",
                    total: tempDatas.length,
                    data: tempDatas.slice(start, start + limit)
                }
            })
        }
    })
}

export const getLawCase = params => {
    return new Promise(function (resolve, reject) {
        const lawCase = apiData.getLawCase(params);
        resolve({
            data: {
                code: lawCase ? 1000 : 1001,
                msg: lawCase ? "查询成功" : "未查询到对应数据",
                data: lawCase
            }
        })
    })
}

export const saveLawCaseJurors = params => {
    return new Promise(function (resolve, reject) {
        const flag = apiData.saveCaseJurors(params);
        resolve({
            data: {
                code: flag ? 1000 : 1001,
                msg: flag ? "保存成功" : "保存失败"
            }
        })
    })
}
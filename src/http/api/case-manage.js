import apiData from "./data";

export const getLawCases = params => {
    return new Promise(function (resolve, reject) {
        const id = params.id;
        if (id) {
            const lawCase = apiData.lawCases.find(o => {
                if (!params.status) {
                    return o.id === id;
                } else {
                    return o.id === id && o.status === params.status;
                }
            });
            if (lawCase) {
                apiData.refreshLawCase(lawCase);
            }
            resolve({
                data: {
                    code: lawCase ? 1000 : 1001,
                    msg: lawCase ? "查询成功" : "查询失败",
                    data: lawCase ? [lawCase] : []
                }
            })
            return;
        }
        const page = params.page || 1;
        const limit = params.limit || 10;
        const start = (page - 1) * limit;

        if (!params.status) {
            const result = apiData.lawCases.slice(start, start + limit);
            result.forEach(o => {
                apiData.refreshLawCase(o);
            });
            resolve({
                data: {
                    code: 1000,
                    msg: "获取成功",
                    total: apiData.lawCases.length,
                    data: result
                }
            })
        } else {
            const tempDatas = apiData.lawCases.filter(o => o.status === params.status);
            const result = tempDatas.slice(start, start + limit);
            result.forEach(o => {
                apiData.refreshLawCase(o);
            });
            resolve({
                data: {
                    code: 1000,
                    msg: "获取成功",
                    total: tempDatas.length,
                    data: result
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

export const deleteLawCase = params => {
    return new Promise(function (resolve, reject) {
        const index = apiData.lawCases.findIndex(o => o.id === params.id);
        if (index >= 0) {
            apiData.lawCases.splice(index, 1);
        }
        resolve({
            data: {
                code: index >= 0 ? 1000 : 1001,
                msg: index >= 0 ? "删除成功" : "删除失败"
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

export const saveLawCase = data => {
    return new Promise(function (resolve, reject) {
        const flag = apiData.saveLawCase(data);
        resolve({
            data: {
                code: flag ? 1000 : 1001,
                msg: flag ? "保存成功" : "保存失败"
            }
        })
    })
}

export const getCaseConfig = () => {
    return new Promise(function (resolve, reject) {
        resolve({
            data: {
                code: 1000,
                data: {
                    servantUnits: apiData.servantUnits,
                    caseTypes: apiData.caseTypes,
                    statuses: apiData.statuses,
                    caseProvinces: apiData.caseProvinces
                },
                msg: "获取成功"
            }
        })
    })
}
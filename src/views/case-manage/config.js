export const CaseUtil = {

    caseProvinceMap: {
        440000: "粤0904"
    },

    getCaseProvinces() {
        const results = [],
            caseMap = this.caseProvinceMap;
        Object.keys(caseMap).forEach(key => {
            results.push({ value: key, label: caseMap[key] })
        });
        return results;
    },

    caseTypeMap: {
        1001: "民初",
        1002: "民终",
        1003: "刑初",
        1004: "刑终"
    },

    getCaseTypes() {
        const results = [],
            caseMap = this.caseTypeMap;
        Object.keys(caseMap).forEach(key => {
            results.push({ value: key, label: caseMap[key] })
        });
        return results;
    },

    // caseYear: new Date().getFullYear(),
    // caseCode: 100,

    makeTitle(lawCase) {
        // （2019）粤0904刑初1514号
        const caseProvince = this.caseProvinceMap[lawCase.caseProvince],
            caseType = this.caseTypeMap[lawCase.caseType];
        return `(${lawCase.caseYear})${caseProvince}${caseType}${lawCase.caseCode}号`
    },

    statusMap: {
        1: "可审办",
        2: "已分配",
        3: "已完结"
    },

    makeStatus(val) {
        if (this.statusMap[val]) {
            return this.statusMap[val];
        } else {
            return "其他"
        }
    }
}
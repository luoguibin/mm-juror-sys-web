export const CaseUtil = {

    caseProvinceMap: {},
    caseProvinces: [],

    caseTypeMap: {},
    caseTypes: [],

    statuses: [],
    statusMap: {},

    servantUnits: [],
    servantUnitMap: {},

    resetMap() {
        this.caseProvinces.forEach(o => {
            this.caseProvinceMap[o.id] = o.name;
        });
        this.caseTypes.forEach(o => {
            this.caseTypeMap[o.id] = o.name;
        });
        this.statuses.forEach(o => {
            this.statusMap[o.id] = o.name;
        });
        this.servantUnits.forEach(o => {
            this.servantUnitMap[o.id] = o.name;
        });
    },

    // caseYear: new Date().getFullYear(),
    // caseCode: 100,
    // （2019）粤0904刑初1514号
    makeTitle(lawCase) {
        const caseProvince = this.caseProvinceMap[lawCase.caseProvince],
            caseType = this.caseTypeMap[lawCase.caseType];
        return `(${lawCase.caseYear})${caseProvince}${caseType}${lawCase.caseCode}号`
    },

    makeStatus(val) {
        if (this.statusMap[val]) {
            return this.statusMap[val];
        } else {
            return "其他"
        }
    }
}
import Mock from "mockjs";

const apiData = {
    // 数据初始化时间
    currentTime: new Date().getTime(),

    // 城市
    cities: [
        { id: 1000, name: "广东省广州市" },
        { id: 1020, name: "广东省茂名市" }
    ],

    // 承办机构
    servantUnits: [
        { id: 102000001, cityId: 1020, name: "刑事审判庭", direct: 1 },
        { id: 102010001, cityId: 1020, name: "少年审判庭", direct: 1 },
        { id: 102010002, cityId: 1020, name: "民一庭", direct: 1 },
        { id: 102010003, cityId: 1020, name: "民二庭", direct: 1 },
        { id: 102010004, cityId: 1020, name: "民四庭", direct: 1 },
        { id: 102010005, cityId: 1020, name: "立案庭", direct: 1 },
        { id: 102010006, cityId: 1020, name: "审判管理办公室", direct: 1 },
        { id: 102010007, cityId: 1020, name: "审判监督庭", direct: 1 },
        { id: 102010008, cityId: 1020, name: "院领导", direct: 1 },
        { id: 102010009, cityId: 1020, name: "研究室", direct: 1 },
        { id: 102010010, cityId: 1020, name: "沙朗法庭", direct: 0 },
        { id: 102010011, cityId: 1020, name: "七径法庭", direct: 0 },
        { id: 102010012, cityId: 1020, name: "林头法庭", direct: 0 },
        { id: 102010013, cityId: 1020, name: "岭门法庭", direct: 0 },
        { id: 102010014, cityId: 1020, name: "电城法庭", direct: 0 },
    ],

    // 案件类型
    caseTypes: [
        { id: 1001, name: "刑辖" },
        { id: 1002, name: "民辖" },
        { id: 1003, name: "民辖终" },
        { id: 1004, name: "民辖监" },
        { id: 1005, name: "行辖" },
        { id: 1006, name: "行辖终" },
        { id: 1007, name: "赔辖" },
        { id: 1008, name: "赔辖终" },
        { id: 1009, name: "刑初" },
        { id: 1010, name: "刑终" },
        { id: 1011, name: "刑监" },
        { id: 1012, name: "刑申" },
        { id: 1013, name: "刑抗" },
        { id: 1014, name: "刑再" },
        { id: 1015, name: "刑没" },
        { id: 1016, name: "刑核" },
        { id: 1017, name: "刑医" },
        { id: 1018, name: "刑医解" },
        { id: 1019, name: "刑医复" },
        { id: 1020, name: "刑医监" },
        { id: 1021, name: "刑止" },
        { id: 1022, name: "刑止调" },
        { id: 1023, name: "刑止核" },
        { id: 1024, name: "刑更" },
        { id: 1025, name: "刑更监" },
        { id: 1026, name: "刑更备" },
        { id: 1027, name: "刑他" },
        { id: 1028, name: "民初" },
        { id: 1029, name: "民终" },
        { id: 1030, name: "民监" },
        { id: 1031, name: "民申" },
        { id: 1032, name: "民抗" },
        { id: 1033, name: "民再" },
        { id: 1034, name: "民撤" },
        { id: 1035, name: "民特" },
        { id: 1036, name: "民特监" },
        { id: 1037, name: "民催" },
        { id: 1038, name: "民督" },
        { id: 1039, name: "民督监" },
        { id: 1040, name: "民破" },
        { id: 1041, name: "民算" },
        { id: 1042, name: "民他" },
        { id: 1043, name: "行初" },
        { id: 1044, name: "行终" },
        { id: 1045, name: "行监" },
        { id: 1046, name: "行申" },
        { id: 1047, name: "行抗" },
        { id: 1048, name: "行再" },
        { id: 1049, name: "行审" },
        { id: 1050, name: "行审复" },
        { id: 1051, name: "行他" },
        { id: 1052, name: "行赔初" },
        { id: 1053, name: "行赔终" },
        { id: 1054, name: "行赔监" },
        { id: 1055, name: "行赔申" },
        { id: 1056, name: "行赔抗" },
        { id: 1057, name: "行赔再" },
        { id: 1058, name: "法赔" },
        { id: 1059, name: "委赔" },
        { id: 1060, name: "委赔监" },
        { id: 1061, name: "委赔提" },
        { id: 1062, name: "委赔再" },
        { id: 1063, name: "赔他" },
        { id: 1064, name: "司救刑" },
        { id: 1065, name: "司救民" },
        { id: 1066, name: "司救行" },
        { id: 1067, name: "司救赔" },
        { id: 1068, name: "司救执" },
        { id: 1069, name: "司救访" },
        { id: 1070, name: "司救他" },
        { id: 1071, name: "认台" },
        { id: 1072, name: "认港" },
        { id: 1073, name: "认澳" },
        { id: 1074, name: "认复" },
        { id: 1075, name: "认他" },
        { id: 1076, name: "请台送" },
        { id: 1077, name: "请港送" },
        { id: 1078, name: "请澳送" },
        { id: 1079, name: "台请送" },
        { id: 1080, name: "港请送" },
        { id: 1081, name: "澳请送" },
        { id: 1082, name: "请台调" },
        { id: 1083, name: "请港调" },
        { id: 1084, name: "请澳调" },
        { id: 1085, name: "台请调" },
        { id: 1086, name: "港请调" },
        { id: 1087, name: "澳请调" },
        { id: 1088, name: "请移管" },
        { id: 1089, name: "助移管" },
        { id: 1090, name: "请移赃" },
        { id: 1091, name: "助移赃" },
        { id: 1092, name: "协外认" },
        { id: 1093, name: "协他" },
        { id: 1094, name: "协外送" },
        { id: 1095, name: "请外送" },
        { id: 1096, name: "协外调" },
        { id: 1097, name: "请外调" },
        { id: 1098, name: "请外移" },
        { id: 1099, name: "协外移" },
        { id: 1100, name: "请外引" },
        { id: 1101, name: "协外引" },
        { id: 1102, name: "司惩" },
        { id: 1103, name: "司惩复" },
        { id: 1104, name: "财保" },
        { id: 1105, name: "行保" },
        { id: 1106, name: "行保复" },
        { id: 1107, name: "证保" },
        { id: 1108, name: "执" },
        { id: 1109, name: "执恢" },
        { id: 1110, name: "执保" },
        { id: 1111, name: "执异" },
        { id: 1112, name: "执复" },
        { id: 1113, name: "执监" },
        { id: 1114, name: "执协" },
        { id: 1115, name: "执他" }

    ],

    // 单位代码
    caseProvinces: [
        { id: 440000, name: "粤0904" }
    ],

    statuses: [
        { id: 101, name: "未分配" },
        { id: 102, name: "已分配" },
        // { id: 103, name: "已完结" }
    ]
}

apiData.caseProvinceIds = (function () {
    return apiData.caseProvinces.map(o => o.id);
})();

apiData.findCaseProvince = function (id) {
    return this.caseProvinces.find(o => o.id === id);
}

apiData.caseTypeIds = (function () {
    return apiData.caseTypes.map(o => o.id);
})();

apiData.findCaseType = function (id) {
    return this.caseTypes.find(o => o.id === id);
}

apiData.cityIds = (function () {
    return apiData.cities.map(o => o.id);
})();

apiData.findCity = function (id) {
    return this.cities.find(o => o.id === id);
}

apiData.servantUnitIds = (function () {
    return apiData.servantUnits.map(o => o.id);
})();

apiData.findServantUnit = function (id) {
    return this.servantUnits.find(o => o.id === id);
}

apiData.statusIds = (function () {
    return apiData.statuses.map(o => o.id)
})()

// @ctitle(5, 20)
// @csentence(100, 500)

const mockData = Mock.mock({
    "users|2-5": [{
        "id|+1": 15610001000,
        "pw": "123456",
        "name": "@cname",
        "authType": 1,
        "jurorId": 0,
        "timeCreate": apiData.currentTime
    }],
    "jurors|5": [{
        "id|+1": 10001000,
        "name": "@cname",
        "sex|1": [0, 1],
        "phone": 15600000001,
        "servantUnitId|1": apiData.servantUnitIds,
        "jurorType": 0,
        "address": "",
        "caseCount": 0,
        "timeCreate": apiData.currentTime
    }],
    "lawCases|3": [{
        "id|+1": 20001000,
        "caseYear|1": [2018, 2019],
        "caseProvince|1": apiData.caseProvinceIds,
        "caseType|1": apiData.caseTypeIds,
        "caseCode": "@natural(100, 199)",
        "undertakerId": 0,
        "servantUnitId": 0,
        "status": apiData.statuses[0].id,
        "jurors": [],
        "timeUpdate": apiData.currentTime,
        "timeCreate": apiData.currentTime
    }]
})

for (const key in mockData) {
    if (mockData.hasOwnProperty(key)) {
        apiData[key] = mockData[key];
    }
}
console.log(apiData)

// 承办人
const count = Math.floor(apiData.jurors.length * 0.3) || 1;
apiData.undertakers = apiData.jurors.splice(0, count);
apiData.findUndertaker = function (id) {
    return this.undertakers.find(o => o.id === id);
};
(function () {
    apiData.undertakers.forEach((o, index) => {
        o.jurorType = 1;
        o.servantUnitId = apiData.servantUnits[index % apiData.servantUnitIds.length].id;
    })
})();

// 处理用户列表
(function () {
    apiData.users.forEach((user, index) => {
        if (Math.random() < 0.05 || index < 1) {
            user.authType = 5;
        }
        if (apiData.jurors[index]) {
            user.jurorId = apiData.jurors[index].id;
        }
    });
    apiData.users[1].authType = 1;

    // 超级管理员
    apiData.users.push({
        id: 15688888888,
        pw: "123456",
        name: "super_admin",
        authType: 9,
        jurorId: 0,
        timeCreate: apiData.currentTime
    })
})();

apiData.addUser = function (user) {
    if (!user.id) return null;

    const target = this.users.find(o => {
        return o.id === user.id;
    });
    if (target) {
        return null;
    }
    user.authType = user.authType || 1;
    user.jurorId = user.jurorId || 0;
    user.timeCreate = new Date().getTime();
    this.users.push(user);
    return user;
}

apiData.updateUser = function (user) {
    const target = this.users.find(o => {
        return o.id === user.id;
    });
    if (target) {
        target.name = user.name || target.name;
        target.pw = user.pw || target.pw;
        target.authType = user.authType || target.authType;
        target.address = user.adddress || target.adddress;
        return true;
    }
    return false;
}

apiData.deleteUser = function (user) {
    const index = this.users.findIndex(o => {
        return o.id === user.id;
    });
    if (index >= 0) {
        this.users.splice(index, 1);
        return true;
    }
    return false;
};

// 处理陪审员列表
(function () {
    apiData.jurors.forEach(juror => {
        let randomIndex = Math.floor(Math.random() * apiData.servantUnits.length);
        juror.servantUnitId = apiData.servantUnits[randomIndex].id;
        juror.phone += Mock.mock('@integer(10000000, 99999999)');
        juror.address = Mock.mock('@county(true)');
    });
})();

apiData.getLowJurors = function (params) {
    const tempJurors = this.jurors.filter(o => o.servantUnitId === params.servantUnitId);

    tempJurors.sort(function (a, b) {
        return a.caseCount > b.caseCount ? 1 : -1;
    });

    return tempJurors.slice(0, 2);
};

apiData.saveJuror = function (data) {
    if (!data) {
        return false;
    }
    if (data.id) {
        // 保存
        let juror = this.jurors.find(o => o.id === data.id);
        let originIsJuror = true;
        if (!juror) {
            juror = this.undertakers.find(o => o.id === data.id);
            originIsJuror = false;
        }
        if (juror) {
            const isSwap = juror.jurorType !== data.jurorType;
            for (const key in juror) {
                if (juror.hasOwnProperty(key)) {
                    juror[key] = data[key];
                }
            }
            if (isSwap) {
                if (originIsJuror) {
                    const index = this.jurors.find(o => o.id === juror.id);
                    const obj = this.jurors.splice(index, 1)[0];
                    this.undertakers.push(obj);
                } else {
                    const index = this.undertakers.find(o => o.id === juror.id);
                    const obj = this.undertakers.splice(index, 1)[0];
                    this.jurors.push(obj);
                }
            }
        } else {
            return false;
        }
    } else {
        // 新增
        const obj = JSON.parse(JSON.stringify(data));

        const user = this.addUser({ id: obj.phone, pw: "123456", name: obj.name });
        if (!user) {
            return false;
        }

        obj.id = this.jurors[this.jurors.length - 1].id + 1;
        obj.caseCount = 0;

        const time = new Date().getTime();
        obj.timeCreate = time;

        if (obj.jurorType) {
            this.undertakers.push(obj);
        } else {
            this.jurors.push(obj);
        }
    }
    return true;
};


// 处理案件列表
(function () {
    apiData.lawCases.forEach(lawCase => {
        // 设置承办人id
        let randomIndex = Math.floor(Math.random() * apiData.undertakers.length);
        const undertaker = apiData.undertakers[randomIndex];
        lawCase.undertakerId = undertaker.id;
        // 设置承办部门id
        lawCase.servantUnitId = undertaker.servantUnitId;

        if (Math.random() < 0.5) {
            // 设置该承办人所属的机构下的陪审员
            const tempJurors = apiData.jurors.filter(o => {
                return o.servantUnitId === undertaker.servantUnitId;
            })
            const jurorLength = tempJurors.length;
            if (!jurorLength) { return; }
            // 第一个陪审员
            const index = Math.floor(Math.random() * jurorLength);
            lawCase.jurors.push({
                id: tempJurors[index].id,
                name: tempJurors[index].name,
            })
            lawCase.status = apiData.statuses[1].id;
            tempJurors[index].caseCount++;

            // 第二个陪审员
            if (Math.random() < 0.95) {
                let index_;
                if (Math.random() < 0.5) {
                    index_ = Math.floor(Math.random() * index);
                } else {
                    index_ = index + Math.floor(Math.random() * (jurorLength - index));
                }
                if (index !== index_) {
                    lawCase.jurors.push({
                        id: tempJurors[index_].id,
                        name: tempJurors[index_].name,
                    });
                    tempJurors[index_].caseCount++;
                }
            }
        }
    })
})();

apiData.getLawCase = function (params) {
    if (params.id) {
        return this.lawCases.find(o => {
            return o.id === params.id;
        });
    }
    else if (params.title) {
        return this.lawCases.find(o => {
            return o.title.includes(params.title);
        })
    } else {
        return null
    }
}

apiData.saveLawCase = function (data) {
    if (!data) {
        return false;
    }
    data = JSON.parse(JSON.stringify(data));
    if (data.id) {
        // 保存
        const lawCase = this.lawCases.find(o => o.id === data.id);
        if (lawCase) {
            // 清空当前陪审员
            lawCase.jurors.forEach(o => {
                const juror = this.jurors.find(o_ => o_.id === o.id);
                if (juror) {
                    juror.caseCount--;
                }
            });
            // 设置新值
            console.log(lawCase.jurors, data.jurors)

            for (const key in lawCase) {
                if (lawCase.hasOwnProperty(key)) {
                    lawCase[key] = data[key];
                }
            }
            lawCase.status = this.statuses[0].id;

            // 判断重新设置陪审员
            if (data.jurors) {
                if (data.jurors.length) {
                    lawCase.status++;
                }
                data.jurors.forEach(o => {
                    const juror = this.jurors.find(o_ => o_.id === o.id);
                    console.log(juror)
                    if (juror) {
                        juror.caseCount++;
                    }
                });
            }
        } else {
            return false;
        }
    } else {
        // 新增
        const obj = JSON.parse(JSON.stringify(data));
        obj.id = this.lawCases[this.lawCases.length - 1].id + 1;
        obj.status = apiData.statuses[0].id;
        if (obj.jurors && obj.jurors.length) {
            obj.status++;
            obj.jurors.forEach(jurorId => {
                const juror = this.jurors.find(o => o.id === jurorId);
                if (juror) {
                    juror.caseCount++;
                }
            });
        } else {
            obj.jurors = [];
        }

        const time = new Date().getTime();
        obj.timeUpdate = time;
        obj.timeCreate = time;

        this.lawCases.push(obj);
    }
    return true;
}

// 其他
apiData.refreshLawCase = function (lawCase) {
    lawCase.servantUnit = this.findServantUnit(lawCase.servantUnitId);
    lawCase.undertaker = this.findUndertaker(lawCase.undertakerId);
}


window.apiData = apiData;
export default apiData;
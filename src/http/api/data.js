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
        { id: 10000, cityId: 1020, name: "刑事审判庭", direct: 1 },
        { id: 10001, cityId: 1020, name: "少年审判庭", direct: 1 },
        { id: 10002, cityId: 1020, name: "民一庭", direct: 1 },
        { id: 10003, cityId: 1020, name: "民二庭", direct: 1 },
        { id: 10004, cityId: 1020, name: "民四庭", direct: 1 },
        { id: 10005, cityId: 1020, name: "立案庭", direct: 1 },
        { id: 10006, cityId: 1020, name: "审判管理办公室", direct: 1 },
        { id: 10007, cityId: 1020, name: "审判监督庭", direct: 1 },
        { id: 10008, cityId: 1020, name: "院领导", direct: 1 },
        { id: 10009, cityId: 1020, name: "研究室", direct: 1 },
        { id: 10010, cityId: 1020, name: "沙朗法庭", direct: 0 },
        { id: 10011, cityId: 1020, name: "七径法庭", direct: 0 },
        { id: 10012, cityId: 1020, name: "林头法庭", direct: 0 },
        { id: 10013, cityId: 1020, name: "岭门法庭", direct: 0 },
        { id: 10014, cityId: 1020, name: "电城法庭", direct: 0 },
    ],

    // 案件类型
    caseTypes: [
        { id: 1001, name: "民初" },
        { id: 1002, name: "民终" },
        { id: 1003, name: "刑初" },
        { id: 1004, name: "刑终" }
    ],

    // 单位代码
    caseProvinces: [
        { id: 440000, name: "粤0904" }
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

// @ctitle(5, 20)
// @csentence(100, 500)

const mockData = Mock.mock({
    "users|20-49": [{
        "id|+1": 15610001000,
        "pw": "123456",
        "name": "@cname",
        "authType": 1,
        "jurorId": 0,
        "timeCreate": apiData.currentTime
    }],
    "jurors|208": [{
        "id|+1": 10001000,
        "name": "@cname",
        "sex|1": [0, 1],
        "phone": 15600000001,
        "servantUnitId|1": apiData.servantUnitIds,
        "address": "",
        "caseCount": 0,
        "timeCreate": apiData.currentTime
    }],
    "lawCases|188": [{
        "id|+1": 20001000,
        "caseYear|1": [2018, 2019],
        "caseProvince|1": apiData.caseProvinceIds,
        "caseType|1": apiData.caseTypeIds,
        "caseCode": "@natural(100, 199)",
        "undertakerId": 0,
        "servantUnitId": 0,
        "status": 1,
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
apiData.undertakers = apiData.jurors.splice(apiData.jurors.length - 61, 60);
apiData.findUndertaker = function (id) {
    return this.undertakers.find(o => o.id === id);
};
(function () {
    apiData.undertakers.forEach((o, index) => {
        o.servantUnitId = apiData.servantUnits[index % apiData.servantUnitIds.length].id;
    })
})();

// 处理用户列表
(function () {
    apiData.users.forEach((user, index) => {
        if (Math.random() < 0.05 || index < 1) {
            user.authType = 5;
        }
        user.jurorId = apiData.jurors[index].id;
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
    user.jurorId = 0;
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

apiData.getLowJurors = function () {
    const tempJurors = this.jurors.filter(o => true);

    tempJurors.sort(function (a, b) {
        return a.caseCount > b.caseCount ? 1 : -1;
    });

    return tempJurors.slice(0, 2);
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
            // 第一个陪审员
            const index = Math.floor(Math.random() * jurorLength);
            lawCase.jurors.push({
                id: tempJurors[index].id,
                name: tempJurors[index].name,
            })
            lawCase.status = Math.random() < 0.8 ? 3 : 2;
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

apiData.saveCaseJurors = function (data) {
    if (!data.id || !data.jurors || !data.jurors.length) {
        return false;
    }
    const lawCase = this.lawCases.find(o => {
        return o.id === data.id;
    });
    if (!lawCase) {
        return false;
    }

    const tempJurors = [];
    data.jurors.forEach(o => {
        const juror = this.jurors.find(o_ => {
            return o_.id === o.id;
        });
        if (juror) {
            tempJurors.push(juror);
        }
    })
    const flag = tempJurors.length && tempJurors.length === data.jurors.length;
    if (flag) {
        lawCase.jurors = data.jurors;
        lawCase.status += 1;
        tempJurors.forEach(o => {
            o.caseCount++;
        });
    }
    return flag;
}

apiData.saveLawCase = function (data) {
    if (!data) {
        return false;
    }
    if (data.id) {
        // 保存
        const lawCase = this.lawCases.find(o => o.id === data.id);
        if (lawCase) {
            console.log(lawCase, data)
            for (const key in lawCase) {
                if (lawCase.hasOwnProperty(key)) {
                    lawCase[key] = data[key];
                }
            }
        } else {
            return false;
        }
    } else {
        // 新增
        const obj = JSON.parse(JSON.stringify(data));
        obj.id = this.lawCases[this.lawCases.length - 1].id + 1;
        obj.status = 1;

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
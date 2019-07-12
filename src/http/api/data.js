import Mock from "mockjs";

const apiData = Mock.mock({
    "users|120-150": [{
        "id|+1": 15610001000,
        "pw": "123456",
        "name": "@cname",
        "authType": "NORMAL",
        "jurorId": 0,
        "timeCreate": new Date().getTime()
    }],
    "jurors|150": [
        {
            "id|+1": 10001000,
            "name": "@cname",
            "sex|1": [0, 1],
            "phone": 15600000001,
            "company|1": ["茂名市单位", "茂名电白单位", "茂名高州单位", "茂名吴川单位"] ,
            "address": "",
            "caseCount": 0,
            "timeCreate": new Date().getTime()
        },
    ],
    "lawCases|1000": [
        {
            "id|+1": 20001000,
            "caseYear|1": [2018, 2019],
            "caseProvince": 440000,
            "caseType|1": [1001, 1002, 1003, 1004],
            "caseCode": "@natural(100, 199)",
            "undertaker": "@cname",
            "department|1": ["市案件管理部门", "乡镇案件管理部门"],
            "timeUpdate": new Date().getTime(),
            "status": 0,
            "jurors": [],
            "timeCreate": new Date().getTime()
        },
    ]
})

// @ctitle(5, 20)
// @csentence(100, 500)

const jurors = apiData.jurors;

// 处理用户列表
apiData.users.forEach((user, index) => {
    if (Math.random() < 0.05 || index < 3) {
        user.authType = "ADMIN";
    }
    user.jurorId = jurors[index].id;
});

apiData.userTotal = function () {
    return this.users.length;
};

apiData.addUser = function (user) {
    if (!user.id) return null;

    const target = this.users.find(o => {
        return o.id === user.id;
    });
    if (target) {
        return null;
    }
    user.authType = "NORMAL";
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
}

// 处理陪审员列表
jurors.forEach(juror => {
    juror.phone += Mock.mock('@integer(10000000, 99999999)');
    juror.address = Mock.mock('@county(true)');
});
apiData.jurorTotal = function () {
    return this.jurors.length;
};
apiData.getLowJurors = function () {
    const tempJurors = this.jurors.filter(o => true);

    tempJurors.sort(function (a, b) {
        return a.caseCount > b.caseCount ? 1 : -1;
    });

    return tempJurors.slice(0, 2);
}


// 处理案件列表
const jurorLength = jurors.length;
apiData.lawCases.forEach(lawCase => {
    if (Math.random() < 0.8) {
        const index = Math.floor(Math.random() * jurorLength);
        lawCase.jurors.push({
            id: jurors[index].id,
            name: jurors[index].name,
        })
        lawCase.status = Math.random() < 0.8 ? 2 : 1;
        jurors[index].caseCount++;

        if (Math.random() < 0.95) {
            let index_;
            if (Math.random() < 0.5) {
                index_ = Math.floor(Math.random() * index);
            } else {
                index_ = index + Math.floor(Math.random() * (jurorLength - index));
            }
            if (index !== index_) {
                lawCase.jurors.push({
                    id: jurors[index_].id,
                    name: jurors[index_].name,
                });
                jurors[index_].caseCount++;
            }
        }
    }
})
apiData.lawCaseTotal = function () {
    return this.lawCases.length;
}
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
apiData.saveCaseJurors = function (params) {
    if (!params.id || !params.jurors || !params.jurors.length) {
        return false;
    }
    const lawCase = this.lawCases.find(o => {
        return o.id === params.id;
    });
    if (!lawCase) {
        return false;
    }

    const tempJurors = [];
    params.jurors.forEach(o => {
        const juror = this.jurors.find(o_ => {
            return o_.id === o.id;
        });
        if (juror) {
            tempJurors.push(juror);
        }
    })
    const flag = tempJurors.length && tempJurors.length === params.jurors.length;
    if (flag) {
        lawCase.jurors = params.jurors;
        lawCase.status += 1;
        tempJurors.forEach(o => {
            o.caseCount++;
        });
    }
    return flag;
}
window.apiData = apiData;
export default apiData;
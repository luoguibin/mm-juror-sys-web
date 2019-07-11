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
            "phone": 15600000001,
            "address": "",
            "caseCount": 0,
            "timeCreate": new Date().getTime()
        },
    ],
    "lawCases|1000": [
        {
            "id|+1": 20001000,
            "title": "@ctitle(5, 20)",
            "content": "@csentence(100, 500)",
            "status": 0,
            "jurors": [],
            "timeCreate": new Date().getTime()
        },
    ]
})

const jurors = apiData.jurors;

// 处理用户列表
apiData.users.forEach((user, index) => {
    if (Math.random() < 0.05 || index < 3) {
        user.authType = "ADMIN";
    }
    user.jurorId = jurors[index].id;
    user.address = Mock.mock('@county(true)');
});

apiData.userTotal = function () {
    return this.users.length;
};

apiData.addUser = function (user) {
    if (!user.id) return false;

    const target = this.users.find(o => {
        return o.id === user.id;
    });
    if (target) {
        return false;
    }
    user.authType = "NORMAL";
    user.jurorId = 0;
    user.timeCreate = new Date().getTime();
    this.users.push(user);
    return true;
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
});
apiData.jurorTotal = function () {
    return this.jurors.length;
};


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
            lawCase.jurors.push({
                id: jurors[index_].id,
                name: jurors[index_].name,
            });
            jurors[index_].caseCount++;
        }
    }
})
apiData.lawCaseTotal = function () {
    return this.lawCases.length;
}

export default apiData;
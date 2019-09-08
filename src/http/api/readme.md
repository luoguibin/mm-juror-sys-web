# 用户管理

## 1、创建用户
```
url: /user/create
method: post

data: {
    id: 15688888888,            // 必传，手机号码
    pw: "123456",               // 必传，暂时为明文密码
    name: "super_admin",        // 必传，昵称
    authType: 9,                // 用户权限 1~9，普通用户1，管理员5，超级管理员9；
                                // 注册不得越权，比如管理员只能提升普通用户的权限到5
    jurorId: 0,                 // 陪审员id，默认0，用于关联陪审员信息
    timeCreate: ''              // 系统创建创建时间
}

response: {
    code: 1000,                 // 状态码：1000请求成功，1001请求失败，1002，1003等自定义
    msg: "注册成功",             // 返回信息
    data: {                     // 请求结果，用于注册后直接登录
        id: 15688888888,        // 必传
        name: "super_admin",    // 必传
        authType: 9,            // 必传
        token: '',              // 必传
        jurorId: 0,                 
        timeCreate: ''              
    }                    
}
```

## 2、用户登陆
```
url: /user/login
method: post

data: {
    id: 15688888888,            // 必传
    pw: "123456",               // 必传，暂时为明文密码
}

response: {
    code: 1000,                 // 状态码
    msg: "登录成功",             // 返回信息
    data: {
        id: 15688888888,        // 必传
        name: "super_admin",    // 必传
        authType: 9,            // 必传
        token: '',              // 必传
        jurorId: 0,                 
        timeCreate: ''
    }
}
```

## 3、更新用户
```
url: /user/update
method: post

data: {
    token: "",                  // 必传，解析出当前登录的用户id
    id: 15688888888,            // 必传，修改目标信息的用户id
    pw: "123456",               
    name: "admin",              
    authType: 5,                
    jurorId: 0,                 
}

response: {
    code: 1000,                 // 状态码
    msg: "更新成功",             // 返回信息
    data: {}                    // 请求结果
}
```

## 4、查询用户列表
```
url: /user/query
method: post

data: {
    token: "",                  // 必传，解析出当前登录的用户id
    id: 15688888888,            // 如果存在id，则查询对应id的用户
    authType: 5,                // 查询的权限不得高于token对应的权限
    name: "",                   // 查询名字
    page: 1,                    // 查询当前页
    limit: 10,                  // 每页个数
}

response: {
    code: 1000,                 // 状态码
    msg: "查询成功",             // 返回信息
    data: []                    // 请求结果
}
```


# 案件管理

### 1、案件配置请求
```
url: /case/config
method: get,

params: {}

response: {
    code: 1000,                 // 状态码
    msg: "",                    // 返回信息
    data: {
        cities: [],             // 参见底部数据定义
        servantUnits: [],       // 参见底部数据定义
        caseTypes: [],          // 参见底部数据定义
        statuses: [],           // 参见底部数据定义
        caseProvinces: []       // 参见底部数据定义
    }
}
```

### 2、创建案件
```
url: /case/create
method: post

data: {
    token: "",                      // 必传，
    caseYear: 2019,                 // 必传，案件年号
    caseProvince: 440000,           // 必传，单位编号，参见底部数据caseProvinces定义
    caseType: 1001,                 // 必传，案件类型id，参见底部数据caseTypes定义
    caseCode: 1234,                 // 必传，案件编号
    servantUnitId: 102000001,       // 必传，承办机构id
    undertakerId: 10001000,         // 必传，承办人id
    jurors: []                      // 陪审员列表
}

response: {
    code: 1000,                     // 状态码
    msg: "添加成功",                // 返回信息
    data: {}
}
```

### 3、请求案件列表
```
url: /case/query
method: post

data: {
    token: "",                  // 必传，解析出登录的用户id，提取对应的案件列表
    id: 15688888888,            // 可选，案件id
    page: 1,                    // 可选，请求当前页
    limit: 10,                  // 可选，一页的数据个数
    status: 0,                  // 可选，0为所有，其余数值参见底部数据statuses定义
}

response: {
    code: 1000,                 // 状态码
    msg: "",                    // 返回信息
    data: [                     // 请求结果
       {
           id: 0,               // 案件id
           caseYear: 2019,      // 案件年号
           caseProvince: 10,    // 单位代码
           caseType: 0,         // 案件类型
           caseCode: 0,         // 案件编号
           undertakerId: 0,     // 承办人id
           servantUnitId: 0,    // 承办机构id
           status: 0,           // 案件状态
           jurors: [],          // 陪审员列表
           timeUpdate: "",      // 更新时间
           timeCreate: ""       // 创建时间
       }
    ]        
}
```
### 4、更新案件
```
跟2、创建案件逻辑相似
```

## 4、删除案件
```
```


# 陪审员管理

### 1、陪审员列表
```
url: /juror/query
method: post

data: {
    id: 15688888888,            // 可选，陪审员id
    page: 1,                    // 可选，请求当前页
    limit: 10,                  // 可选，一页的数据个数
    orderType: 1,               // 可选，案件数排序方式
}

response: {
    code: 1000,                 // 状态码
    msg: "",                    // 返回信息
    data: []                    // 陪审员列表
}
```

## 2、新增陪审员
```
url /juror/create
method post

data: {
    token: "",                  // 必传
    jurorType: 0,               // 必传，1为承办人，0为陪审员
    servantUnitId: 102000001,   // 必传，承办机构id
    name: "dfgdf",              // 必传，原则上真实姓名
    phone: 15622222222,         // 必传，手机号码
    sex: 1,                     // 1为男，0为女
    address:"gfhdf"             // 住址
}

response: {
    code: 1000,                 // 状态码
    msg: "",                    // 返回信息
    data: {}
}
```

## 3、更新陪审员
```
与2、新增陪审员逻辑上类似
```
 
## 4、删除陪审员
```
```

## 5、获取承办人和部门
```
url /case/untakers
method get


data: {
    token: "",                  // 必传
    jurorType: 0,               // 必传，1为承办人，0为陪审员
    servantUnitId: 102000001,   // 必传，承办机构id
    name: "dfgdf",              // 必传，原则上真实姓名
    phone: 15622222222,         // 必传，手机号码
    sex: 1,                     // 1为男，0为女
    address:"gfhdf"             // 住址
}

response: {
    code: 1000,                 // 状态码
    msg: "",                    // 返回信息
    data: {
        undertakers: [],        // 承办人列表
        servantUnits: [],       // 承办部门列表
    }
}
```

# --------------------我是数据定义分割线--------------------- #
```
 模拟数据库列表
 const mockData = Mock.mock({
     "users": [{
         "id": 15610001000,             // id，手机号为账号
         "pw": "123456",                // 密码    
         "name": "@cname",              // 昵称
         "authType": 1,                 // 用户权限，1普通用户，5管理员，9超级管理员
         "jurorId": 0,                  // 陪审员id
         "timeCreate": 1567758232648    // 时间戳
     }],
     "jurors": [{
         "id": 10001000,                // 陪审员id
         "name": "@cname",              // 姓名
         "sex": 0,                      // 性别，0女，1男
         "phone": 15600000001,          // 手机号
         "servantUnitId": 0,            // 承办机构id
         "jurorType": 0,                // 角色，0为陪审员，1为承办人
         "address": "",                 // 住址
         "caseCount": 0,                // 陪审案件数
         "timeCreate": 1567758232648    // 时间戳
     }],
     "lawCases": [{
         "id": 20001000,                // 案件id
         "caseYear": 2019,              // 案件年号
         "caseProvince": 1020,          // 案件单位编码，参见caseProvinces数组定义
         "caseType": 1001,              // 案件类型，参见caseTypes数组定义
         "caseCode": 110,               // 案件编号
         "undertakerId": 0,             // 承办人id
         "servantUnitId": 0,            // 承办机构id
         "status": 0,                   // 案件状态，参见statuses数组定义
         "jurors": [],                  // 承办人列表
         "timeUpdate": 1567758232648,   // 时间戳
         "timeCreate": 1567758232648,   // 时间戳
     }]
 })

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
```




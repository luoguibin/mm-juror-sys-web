export const getJurors = data => {
    return new Promise(function (resolve, reject) {
        resolve({
            data: {
                code: 1000,
                msg: "获取成功",
                total: 150,
                data: [
                    { id: 2001, name: "赵一", phone: 15600000001, address: "广东茂名", caseCount: 10, timeCreate: new Date().toJSON() },
                    { id: 2002, name: "钱二", phone: 15600000002, address: "广东茂名", caseCount: 8, timeCreate: new Date().toJSON() },
                    { id: 2003, name: "张三", phone: 15600000003, address: "广东茂名", caseCount: 7, timeCreate: new Date().toJSON() },
                    { id: 2004, name: "李四", phone: 15600000004, address: "广东茂名", caseCount: 11, timeCreate: new Date().toJSON() },
                    { id: 2005, name: "王五", phone: 15600000005, address: "广东茂名", caseCount: 10, timeCreate: new Date().toJSON() },
                    { id: 2005, name: "孙六", phone: 15600000006, address: "广东茂名", caseCount: 0, timeCreate: new Date().toJSON() }
                ]
            }
        })
    })
}
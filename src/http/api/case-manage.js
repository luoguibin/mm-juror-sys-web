export const getLawCases = data => {
    return new Promise(function (resolve, reject) {
        resolve({
            data: {
                code: 1000,
                msg: "获取成功",
                total: 200,
                data: [
                    {
                        id: 10001001,
                        title: "案件标题1",
                        content: "案件描述内容1",
                        jurors: [
                            { id: 2001, name: "赵一" },
                            { id: 2002, name: "钱二" },
                        ],
                        timeCreate: new Date().toJSON()
                    },
                    {
                        id: 10001002,
                        title: "案件标题2",
                        content: "案件描述内容2",
                        jurors: [
                            { id: 2003, name: "张三" },
                            { id: 2004, name: "李四" }
                        ],
                        timeCreate: new Date().toJSON()
                    },
                    {
                        id: 10001003,
                        title: "案件标题3",
                        content: "案件描述内容3",
                        jurors: [
                            { id: 2005, name: "王五" }
                        ],
                        timeCreate: new Date().toJSON()
                    },
                    {
                        id: 10001004,
                        title: "案件标题4",
                        content: "案件描述内容4",
                        jurors: [],
                        timeCreate: new Date().toJSON()
                    },
                    {
                        id: 10001005,
                        title: "案件标题5",
                        content: "案件描述内容5",
                        jurors: [],
                        timeCreate: new Date().toJSON()
                    }
                ]
            }
        })
    })
}
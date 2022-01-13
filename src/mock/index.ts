import Mock from 'mockjs';
import menus from "./data/menus"
import handCode from "./utils/handCode"

Mock.Random.extend({
    constellations: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 1, 30, 38, 39, 41, 42, 40, 43, 44],
    ids(data:any) {
        //随机选择2个作为返回值
        //return this.pick(this.constellations, 2)
        //随机选择2-4个作为返回值
        return this.pick(this.constellations, 4, 7)
    }
})

Mock.setup({timeout: "500"});
Mock.mock('/mock/menu', "get", () => handCode.success(menus));
Mock.mock("/mock/user", "post", function (r:any) {
    let params = JSON.parse(r.body)
    let {token} = params;
    if (token === "admin-token") {
        return handCode.success({
            avatar: "https://cdn-mini.sangupig.top/test/images/1628668576101.jpg",
            createTime: 1534986716000,
            dept: {
                id: 1,
                name: "总部",
            },
            deptId: 1,
            email: "123456@163.com",
            enabled: true,
            id: 1,
            job: {id: 11, name: "admin2"},
            phone: "13666666666",
            roles: [{
                dataScope: "全部",
                id: 1,
                level: 1,
                name: "超级管理员",
            }],
            sex: "男",
            username: "admin",
        })
    } else {
        return handCode.error("token无效")
    }

})
Mock.mock("/mock/login", "post", function (r:any) {
    let params = JSON.parse(r.body)
    let {username, password, code} = params;
    if (username === "admin" && password === "123456" && code) {
        return handCode.success({
            token: "admin-token",
            user: {
                avatar: "https://cdn-mini.sangupig.top/test/images/1628668576101.jpg",
                createTime: 1534986716000,
                dept: {
                    id: 1,
                    name: "总部",
                },
                deptId: null,
                email: "123456@163.com",
                enabled: true,
                id: 1,
                job: {id: 11, name: "admin2"},
                phone: "13666666666",
                roles: [{
                    dataScope: "全部",
                    id: 1,
                    level: 1,
                    name: "超级管理员",
                }],
                sex: "男",
                username: "admin",
            }
        })
    } else if (username !== "admin") {
        return handCode.error("用户名错误")
    } else if (password !== "123456") {
        return handCode.error("密码错误")
    } else if (!code) {
        return handCode.error("验证码错误")
    } else {
        return handCode.error("请求失败")
    }

})

Mock.mock("/mock/ips", "get", function () {
    let data = Mock.mock({
        "deal|50": [{
            "time|+1": '@now(yyyy-MM-dd)',
            "value|10-50": 1,
        }],
        "ips|50": [{
            "time": '@DATETIME("yyyy-MM-dd")',
            "value|10-50": 1
        }],
        "today": {
            "deal|100-200": 1,
            "ips|0-50": 1
        }
    })
    return handCode.success(data)
})
//所有用户
Mock.mock("/mock/system/allUser", "get", function () {
    let data = Mock.mock({
        "data|15": [
            {
                avatar: "@image",
                createTime: "@now()",
                dept: {
                    id: 1,
                    name: "总部",
                },
                deptId: null,
                email: /^(\w){6,8}@136\.com$/,
                "enabled": "@boolean",
                "id|+1": 1,
                job: {
                    "id|+1": 100,
                    "name|+1": /^admin-[\w]{3,5}/
                },
                phone: /^1[0-9]{10}$/,
                roles: {
                    dataScope: "全部",
                    id: 1,
                    level: 1,
                    name: "超级管理员",
                },
                "sex": "@boolean()",
                username: "@name()",
                password: /^1[0-9]{6}$/
            }
        ]
    })
    return handCode.success(data)
})
//角色
Mock.mock("/mock/system/roles", "get", () => {
    let data = Mock.mock({
        "data|15": [
            {
                "menu_id": "@ids",
                "name|1": ["超级管理员", "财政", "销售", "总监"],
                "type_id|+1": 1,
            }
        ]
    })
    return handCode.success(data)
})

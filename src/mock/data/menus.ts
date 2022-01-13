//可以在接口中获取路由数据
const menus = [
    {
        icon: "icon-piechart",
        keepAlive: true,
        key: "dashboard",
        menu_id: 1,
        parentKey: "",
        path: "/dashboard",
        title: "首页",
        visible:true,
        weight:1,
    },
    {
        icon: "icon-addteam",
        keepAlive: true,
        key: "userCenter",
        menu_id: 8,
        parentKey: "",
        path: "/user",
        title: "用户中心",
        visible:false,
        weight:1,
    },
    {
        icon: "icon-CodeSandbox",
        keepAlive: true,
        key: "systemManagement",
        menu_id: 9,
        parentKey: "",
        path: "/system",
        title: "系统管理",
        visible:true,
        weight:1,
        children: [
            {
                icon: "icon-menu",
                keepAlive: true,
                key: "system-menu",
                menu_id: 10,
                parentKey: "systemManagement",
                path: "/menu",
                title: "菜单管理",
                visible:true,
                weight:1,
            },
            {
                icon: "icon-key",
                keepAlive: true,
                key: "system-auth",
                menu_id: 11,
                parentKey: "systemManagement",
                path: "/auth",
                title: "权限管理",
                visible:true,
                weight:1,
            },
            {
                icon: "icon-user",
                keepAlive: true,
                key: "system-user",
                menu_id: 12,
                parentKey: "systemManagement",
                path: "/user",
                title: "用户管理",
                visible:true,
                weight:1,
            },

        ]
    }
]

export default menus;

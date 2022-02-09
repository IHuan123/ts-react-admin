//自定义生成的路有列表
const dynamicRoutesMap = [
    {
        key:"system-user",
        component: () => import("@/views/system/User/User"),
    },
    {
        key:"system-roles",
        component: () => import("@/views/system/Roles/Roles"),
    },
    {
        key:"system-menu",
        component: () => import("@/views/system/Menu/Menu"),
    },
    {
        key:"dashboard",
        component: function () {
            return import("@/views/Dashboard/Dashboard")
        },
    },
    {
        key:"userCenter",
        component: function () {
            return import("@/views/User/User")
        },
    },
]
export default dynamicRoutesMap

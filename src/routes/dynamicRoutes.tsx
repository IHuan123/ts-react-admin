const dynamicRoutesMap = [

    {
        path: '/system/user',
        component: () => import("@/views/system/User/User"),
    },

    {
        path: '/system/roles',
        component: () => import("@/views/system/Roles/Roles"),
    },

    {
        path: '/system/menu',
        component: () => import("@/views/system/Menu/Menu"),
    },

    {
        path: '/dashboard',
        component: function () {
            return import("@/views/Dashboard/Dashboard")
        },
    },
    {
        path: '/user',
        component: function () {
            return import("@/views/User/User")
        },
    },

]
export default dynamicRoutesMap

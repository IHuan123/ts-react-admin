import request from "../utils/request"
// import "../mock/index"

export function getMenu(roles:string){
    return request({
        url:"/api/user/getMenus",
        method:"GET",
        params:{roles}
    })
}
export function getAllMenu(){
    return request({
        url:"/api/system/getAllMenus",
        method:"GET",
    })
}
//更新菜单
export function updateMenu(data:any){
    return request({
        url:"/api/system/updateMenu",
        method:"PUT",
        data
    })
}

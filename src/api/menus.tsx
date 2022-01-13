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

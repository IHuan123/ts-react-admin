import request from "../utils/request"
// import "../mock/index"
export interface Menuer {
    icon: string;
    keep_alive: number;
    key: string;
    menu_id: number;
    parent_key: string;
    parent_name: string;
    path: string;
    title: string;
    visible: number;
    weight: number;
    children?: Menuer[];
}
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
export function deleteMenu(menu_ids:number[]){
    return request({
        url:"/api/system/deleteMenu",
        method:"DELETE",
        data:{menu_ids}
    })
}
export function addMenu(data:any){
    return request({
        url:"/api/system/addMenu",
        method:"POST",
        data:data
    })
}

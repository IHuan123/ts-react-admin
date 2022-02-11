import request from "../utils/request"

export function getRoles(){
    return request({
        url:"/api/system/getAllRoles",
        method:"get"
    })
}
export function roleGetMenus(id:number){
    return request({
        url:"/api/system/getRolesMenus",
        method:"GET",
        params:{id}
    })
}


export interface UpdateParams {
    id: number;
    name: string;
    dataScope: string
}
export function updateRoles(data:UpdateParams){
    return request({
        url:"/api/system/updateRoles",
        method:"PUT",
        data
    })
}

export function delRoles(ids:number[]){
    return request({
        url:"/api/system/deleteRoles",
        method:"DELETE",
        data:{ids}
    })
}
//更新roles_menus
export function updateRolesMenus(params:{mIds:number[],rid:number|null}){
    return request({
        url:"/api/system/updateRolesMenus",
        method:"PUT",
        data:params
    })
}
//添加
export function addRoles(params:{name:string;dataScope:string}){
    return request({
        url:"/api/system/addRoles",
        method:"POST",
        data:params
    })
}

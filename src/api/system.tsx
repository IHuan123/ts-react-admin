import request from "../utils/request"

export function getAllUser(){
    return request({
        url:"/api/user/getAllUser",
        method:"GET",
    })
}
export function getRoles(){
    return request({
        url:"/api/system/getAllRoles",
        method:"get"
    })
}
export function roleGetMenus(params:{ rid:string }){
    return request({
        url:"/api/system/getRolesMenus",
        method:"GET",
        params
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

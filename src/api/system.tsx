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

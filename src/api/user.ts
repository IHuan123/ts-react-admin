import request from "../utils/request"
export function login(data:any){
    return request({
        url:"/api/login",
        method:"POST",
        data
    })
}
export function getUserInfo(){
    return request({
        url:"/api/user/info",
        method:"GET",
    })
}



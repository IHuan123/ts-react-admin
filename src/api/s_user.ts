import request from "../utils/request"
export function get(){
    return request({
        url:"/api/system/s_users",
        method:"GET",
    })
}
export function add(data:any){
    return request({
        url:"/api/system/s_users",
        method:"POST",
        data
    })
}
export function del(ids:number[]){
    return request({
        url:"/api/system/s_users",
        method:"DELETE",
        data:{uIds:ids}
    })
}
export function edit(data:any){
    return request({
        url:"/api/system/s_users",
        method:"PUT",
        data:data
    })
}

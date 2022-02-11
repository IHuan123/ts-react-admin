import request from "../utils/request"
import "../mock/index"

export function getIps(){
    return request({
        url:"/mock/ips",
        method:"GET",
    })
}

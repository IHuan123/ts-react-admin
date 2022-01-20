import axios from "axios";
import {message} from "antd"
import store from "../store";
import {setToken, setUserInfo} from "../store/actions/userInfo";

const CancelToken = axios.CancelToken;
const severice = axios.create({
    timeout: 3 * 1000,
})

severice.interceptors.request.use((config: any) => {
    let token = localStorage.getItem("token")
    if (token) {
        config.headers["Authorization"] = token || "";
    }
    config.headers['Content-Type'] = 'application/json'
    config.cancelToken = new CancelToken(c => {
        (window as any).AXIOS_REQUEST_CANCEL = c
    })
    return config
}, err => {
    Promise.reject(err)
})


severice.interceptors.response.use(response => {
    const status = response.status
    let msg = ""
    if (status < 200 || status > 300) {
        return Promise.reject(response)
    } else {
        let code = response.data?.code;
        switch (code) {
            case 200:
                return response.data
            case 401:
                //账号被禁用 或者登陆过期
                msg = response.data?.msg
                message.error(msg || "")
                store.dispatch(setUserInfo({}))
                store.dispatch(setToken(null))
                return Promise.reject(response.data)
            default:
                msg = response.data?.msg
                message.error(msg || "")
                return Promise.reject(response.data)
        }
    }
}, err => {
    return Promise.reject(err)
})


export default severice

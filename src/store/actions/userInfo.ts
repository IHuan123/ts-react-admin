import { Dispatch } from 'redux';
import {login, getUserInfo} from "@/api/user"
import {USER_INFO, TOKEN, USER_INFO_TYPE, TOKEN_TYPE} from "../constants/index"
import {message} from "antd"
import {clearMenuTag} from "@/store/actions/menu";


export interface TOKEN_TYPEActions{
    type:TOKEN_TYPE,
    token:string|null
}
export function setToken(token:string|null):TOKEN_TYPEActions {
    return {
        type: TOKEN,
        token
    }
}

export interface USER_INFOAction{
    type:USER_INFO_TYPE,
    userInfo:any
}
export function setUserInfo(info:any):USER_INFOAction {
    return {
        type: USER_INFO,
        userInfo: info
    }
}
export type UserInfoActions = TOKEN_TYPEActions|USER_INFOAction


//登录
export const handleLogin = (data:any) => (dispatch:Dispatch) => {
    login(data).then(res => {
        let data = res?.data
        dispatch(setToken(data.token || ''))
        dispatch(setUserInfo(data.userInfo))
        message.success("登录成功！")
    })
}

//getUserInfo
export const getUser = () => (dispatch:Dispatch) => {
    return new Promise((resolve, reject) => {
        getUserInfo().then(res => {
            dispatch(setUserInfo(res.data?.userInfo))
            resolve(res)
        }).catch(e => {
            reject(e)
        })
    })

}
//登出
export const loginOut = () => (dispatch:Dispatch) => {
    dispatch(clearMenuTag()) //清除顶部tag
    dispatch(setUserInfo({}))
    dispatch(setToken(null))
}

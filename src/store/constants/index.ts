/**all action type */
// user
export const USER_INFO:string = "USER_INFO"
export type USER_INFO_TYPE = typeof USER_INFO;
export const TOKEN:string = "TOKEN"
export type TOKEN_TYPE = typeof TOKEN
//menus
export const SET_MENUS:string = "SET_MENUS"  //储存所有菜单信息
export type SET_MENUS_TYPE = typeof SET_MENUS

export const SET_OPEN_MENUS_KEYS:string = "SET_OPEN_MENUS_KEYS" //设置所有打开的页面信息
export type SET_OPEN_MENUS_KEYS_TYPE = typeof SET_OPEN_MENUS_KEYS

export const ADD_OPEN_MENUS_TAG:string = "ADD_OPEN_MENUS_TAG" //添加打开页面标签
export type ADD_OPEN_MENUS_TAG_TYPE = typeof ADD_OPEN_MENUS_TAG

export const DEL_CLOSE_MENUS_TAG:string = "DEL_CLOSE_MENUS_TAG" //删除关闭的页面标签
export type DEL_CLOSE_MENUS_TAG_TYPE = typeof DEL_CLOSE_MENUS_TAG

export const SET_SELECT_MENU:string = "SET_SELECT_MENU"    //设置当前打开页面信息
export type SET_SELECT_MENU_TYPE = typeof SET_SELECT_MENU

export const CLEAR_MENU_TAG:string = "CLEAR_MENU_TAG"
export type CLEAR_MENU_TAG_TYPE = typeof CLEAR_MENU_TAG


export const SET_BREADCRUMB:string = "SET_BREADCRUMB"  //设置面包屑
export type SET_BREADCRUMB_TYPE = typeof SET_BREADCRUMB

//图标
export const ICON_DATA:string = "ICON_DATA"
export type ICON_DATA_TYPE= typeof ICON_DATA

export const SET_ICON_DATA:string = "SET_ICON_DATA"
export type SET_ICON_DATA_TYPE= typeof SET_ICON_DATA

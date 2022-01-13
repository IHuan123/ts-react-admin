import { SET_MENUS, SET_OPEN_MENUS_KEYS, SET_SELECT_MENU, ADD_OPEN_MENUS_TAG, DEL_CLOSE_MENUS_TAG,SET_BREADCRUMB } from "../constants";
import {Menus} from "@/utils";
import {
    ADD_OPEN_MENUS_TAGAction,
    MenuActionsType,
    SET_MENUSAction,
    SET_OPEN_MENUS_KEYSAction,
    SET_SELECT_MENUAction,
    SelectMenu, CLOSE_MENUAction, SET_BREADCRUMBAction
} from "@/store/actions/menu";

type MenuTags = SelectMenu
interface DefaultState {
    breadcrumb:MenuTags[];
    openMenuTags:MenuTags[];
    menuList:Menus[]
}

const defaultState:DefaultState = {
    breadcrumb:[],
    openMenuTags:[],
    menuList:[]
}
export default function menus(state = defaultState, action:MenuActionsType) {
    let copyState = JSON.parse(JSON.stringify(state))
    let openMenuTags:MenuTags[] = copyState.openMenuTags;
    switch (action.type) {
        case SET_MENUS: //储存所有菜单信息
            return { ...state, menuList: (action as SET_MENUSAction).menus }
        case SET_OPEN_MENUS_KEYS: //设置展开菜单的项目
            return { ...state, openMenuKeys: (action as SET_OPEN_MENUS_KEYSAction).openMenuKeys }
        case SET_SELECT_MENU: //设置当前打开页面信息
            return { ...state, selectMenu: (action as SET_SELECT_MENUAction).selectMenu }
        case ADD_OPEN_MENUS_TAG: //添加 顶部标签
            let openMenu = (action as ADD_OPEN_MENUS_TAGAction).openMenu;
            let isSome = openMenuTags.some(item => {
                return item.key === openMenu.key
            })
            if (!isSome) {
                openMenuTags.push(openMenu)
            }
            return { ...state, openMenuTags: openMenuTags }
        case DEL_CLOSE_MENUS_TAG: //close 顶部标签
            let closeMenuKey = (action as CLOSE_MENUAction).closeMenu;
            let index = openMenuTags.findIndex(item => {
                return item.key === closeMenuKey
            })
            if (index>-1) {
                openMenuTags.splice(index,1)
            }
            return { ...state, openMenuTags: openMenuTags }
        case SET_BREADCRUMB: //设置面包屑
            return {...state,breadcrumb:(action as SET_BREADCRUMBAction).breadcrumb}
        default:
            return state
    }
}

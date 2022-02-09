import {Menus} from "@/utils";
import {
    SET_MENUS,
    SET_OPEN_MENUS_KEYS,
    SET_SELECT_MENU,
    ADD_OPEN_MENUS_TAG,
    DEL_CLOSE_MENUS_TAG,
    SET_BREADCRUMB,
    SET_MENUS_TYPE,
    SET_OPEN_MENUS_KEYS_TYPE,
    SET_SELECT_MENU_TYPE,
    ADD_OPEN_MENUS_TAG_TYPE,
    DEL_CLOSE_MENUS_TAG_TYPE,
    SET_BREADCRUMB_TYPE,
    CLEAR_MENU_TAG_TYPE,
    CLEAR_MENU_TAG
} from "../constants";

export interface SET_MENUSAction {
    type: SET_MENUS_TYPE;
    menus:Menus[];
}

export function setMenus(menus:Menus[]):SET_MENUSAction{
    return {type:SET_MENUS,menus}
}

export interface SET_OPEN_MENUS_KEYSAction {
    type: SET_OPEN_MENUS_KEYS_TYPE;
    openMenuKeys:Array<string>;
}
export function setOpenMenus(openMenuKeys:Array<string>):SET_OPEN_MENUS_KEYSAction{
    return { type:SET_OPEN_MENUS_KEYS,openMenuKeys }
}

export interface SelectMenu {
    key: string;
    title: string;
    path: string;
}
export interface SET_SELECT_MENUAction {
    type:SET_SELECT_MENU_TYPE,
    selectMenu:SelectMenu|null
}
export function setSelectMenu(selectMenu:SelectMenu|null):SET_SELECT_MENUAction{
    return { type:SET_SELECT_MENU,selectMenu }
}


export interface ADD_OPEN_MENUS_TAGAction{
    type:ADD_OPEN_MENUS_TAG_TYPE;
    openMenu:SelectMenu;
}
export function addOpenMenuTag(openMenu:SelectMenu):ADD_OPEN_MENUS_TAGAction{
    return { type:ADD_OPEN_MENUS_TAG,openMenu }
}

export interface CLOSE_MENUAction {
    type:DEL_CLOSE_MENUS_TAG_TYPE;
    closeMenu:string
}
export function delCloseMenuTag(closeMenu:string):CLOSE_MENUAction{
    return { type:DEL_CLOSE_MENUS_TAG,closeMenu }
}

export interface CLEAR_MENUAction {
    type:CLEAR_MENU_TAG_TYPE
}
export function clearMenuTag():CLEAR_MENUAction{
    return { type:CLEAR_MENU_TAG }
}



export interface Breadcrumb {
    icon:string;
    title:string;
    key:string;
}
export interface SET_BREADCRUMBAction{
    type:SET_BREADCRUMB_TYPE;
    breadcrumb: Array<Breadcrumb>;
}
export function setBreadcrumb(breadcrumb:Array<Breadcrumb>):SET_BREADCRUMBAction{
    return {type:SET_BREADCRUMB, breadcrumb}
}

export type MenuActionsType = SET_MENUSAction|SET_OPEN_MENUS_KEYSAction|SET_SELECT_MENUAction|ADD_OPEN_MENUS_TAGAction|CLOSE_MENUAction|SET_BREADCRUMBAction

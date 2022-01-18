import {SET_ICON_DATA, SET_ICON_DATA_TYPE} from "../constants"

export interface Iconer  {
    "icon_id": string
    "name": string
    "font_class": string
    "unicode": string
    "unicode_decimal": number
}

export interface SET_ICON_DATAAction {
    type: SET_ICON_DATA_TYPE;
    data:Iconer[];
}
export function setIcon(data:Iconer[]):SET_ICON_DATAAction{
    return {
        type:SET_ICON_DATA,
        data
    }
}

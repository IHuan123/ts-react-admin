import {Iconer, SET_ICON_DATAAction} from "@/store/actions/icon";
import {SET_ICON_DATA} from "@/store/constants";
import iconList from "@/assets/iconfontData/iconfont.json"
interface DefaultState {
    icon:Iconer[]
}
const defaultState:DefaultState = {
    icon:iconList.glyphs
}
export default function icon(state= defaultState, action:SET_ICON_DATAAction){
    switch (action.type){
        case SET_ICON_DATA:
            let icon = (action as SET_ICON_DATAAction).data;
            return { ...state, icon }
        default:
            return state;
    }
}

import { combineReducers } from "redux"
import { user } from "./userInfo"
import menus from "./menus"
import icon from "./icon";
const reducers = combineReducers({user,menus,icon})
export default reducers

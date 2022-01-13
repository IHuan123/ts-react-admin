import { combineReducers } from "redux"
import { user } from "./userInfo"
import menus from "./menus"
const reducers = combineReducers({user,menus})
export default reducers
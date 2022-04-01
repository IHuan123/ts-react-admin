import { TOKEN, USER_INFO } from "../constants/index"
let token:string|null = ""
try {
    token = localStorage.getItem("token")
}catch (e) {

}
let defaultUser = { token: token, userInfo: {} }
export function user(state = defaultUser, action:any) {
    let type = action.type;
    let copyState = Object.assign({}, state)
    switch (type) {
        case TOKEN:
            try {
                localStorage.setItem("token", action.token);
            }catch (e) {
                console.log("store reducers userInfo",e)
            }
            return { ...copyState, token: action.token };
        case USER_INFO:
            return { ...copyState, userInfo: action.userInfo };
        default:
            return state;
    }
}

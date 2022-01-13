import { TOKEN, USER_INFO } from "../constants/index"
let defaultUser = { token: localStorage.getItem("token"), userInfo: {} }
export function user(state = defaultUser, action:any) {
    let type = action.type;
    let copyState = Object.assign({}, state)
    switch (type) {
        case TOKEN:
            localStorage.setItem("token", action.token);
            return { ...copyState, token: action.token };
        case USER_INFO:
            return { ...copyState, userInfo: action.userInfo };
        default:
            return state;
    }
}

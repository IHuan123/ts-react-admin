import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"
import reducer from "./reducers/index";

// @ts-ignore
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

//测试用的中间件，不影响程序正常
// function logger({ getState }) {
//   return (next: (arg0: any) => any) => (action: any) => {
//     //进入中间件的action
//     // console.log('will dispatch', action)
//     // 调用 middleware 链中下一个 middleware 的 dispatch。
//     let returnValue = next(action)
//     // console.log('state after dispatch', getState())
//     // 一般会是 action 本身，除非
//     // 后面的 middleware 修改了它。
//     return returnValue
//   }
// }

const enhancer = composeEnhancers(
  // applyMiddleware(logger,thunk),
  applyMiddleware(thunk),
  // other store enhancers if any
);

let store = createStore(
  reducer,
  enhancer
);

export default store;

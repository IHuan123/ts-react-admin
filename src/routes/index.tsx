/***
 * 主页路由权限管理
 * useHistory
 useLocation
 useParams
 useRouteMatch
 */
import {useState, useEffect} from "react"
import {Route} from "react-router-dom"
import {Dispatch} from "redux";
import {connect} from "react-redux"
import {CacheRoute, CacheSwitch} from "react-router-cache-route";
import Intercept from "./intercept";
import {setMenus} from "@/store/actions/menu";
import {Menus, reduceMenuList} from "@/utils"
import routes from "@/routes/routes"
import {CSSTransition, TransitionGroup} from "react-transition-group";
import './index.scss';

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setMenus: (list: any[]) => dispatch(setMenus(list)),
    }
}
const mapStateToProps = (state: any) => ({
    menus: state.menus.menuList
})

function useRouter(menus: any[]) {
    const [routerBody, setRoute] = useState<any>(null);
    const [newRoutes, setNewRoutes] = useState<any>([])
    useEffect(() => {
        if (Object.prototype.toString.call(menus) === "[object Array]" && menus.length > 0) {
            //将menus children打平
            let list = reduceMenuList(menus);
            // 把请求的数据 和 本地pages页面暴露出的路由列表合并
            let routerList: any[] = routes.map((router) => {
                let find: any = list.find(
                    (i) => i.key === router.key
                );
                if (find) {
                    router.visible = find.visible === 1
                    router.keep_alive = find.keep_alive === 1
                    router = {...find, ...router};
                }
                if(find){
                    router.path = find.parentPath ? find.parentPath + find.path : find.path
                }
                return router;
            });
            routerList = routerList.filter(item=>{
                return !!item.path
            })
            if (list && list.length) {
                setNewRoutes(routerList)
            }
        }
    }, [menus])
    // 监听 本地路由列表 和 合并后的用户菜单列表 同时存在长度大于1时 渲染路由组件
    useEffect(() => {
        const dom = newRoutes.map((item: Menus) => {
            let {key, path} = item;
            let RouterRender = item.keep_alive ? CacheRoute : Route;
            return (
                <RouterRender key={key} exact={true}
                              path={path}
                              render={(props: any) => {
                                  return <Intercept pageKey={key} {...item} {...props} />
                              }}
                />
            )
        })
        setRoute(dom)
    }, [newRoutes])
    return {routerBody}
}

const Router = ({menus}: any) => {
    const {routerBody} = useRouter(menus);
    const location = window.location
    useEffect(() => {

    }, [menus])
    return (
        <TransitionGroup>
            <CSSTransition key={location.pathname} unmountOnExit classNames="fade" timeout={300}>
                <CacheSwitch>{routerBody}</CacheSwitch>
            </CSSTransition>
        </TransitionGroup>
    );
};


export default connect(mapStateToProps, mapDispatchToProps)(Router)

import {Component} from "react"
import {Dispatch} from "redux";
import {connect} from "react-redux"
import {Redirect,withRouter} from "react-router-dom"
import {setSelectMenu, addOpenMenuTag, setBreadcrumb, SelectMenu, Breadcrumb} from "@/store/actions/menu"
// import Error from "@/views/Error/Error"
import {setOpenMenus} from "@/store/actions/menu"
import {getMenuParentKey} from "@/utils";

const mapStateToProps = (state: any) => ({
    selectMenu: state.menus.selectMenu,
    menuList: state.menus.menuList
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
    setSelectMenu: (data: SelectMenu) => dispatch(setSelectMenu(data)),
    addOpenMenuTag: (data: SelectMenu) => dispatch(addOpenMenuTag(data)),
    setOpenMenus: (list: string[]) => dispatch(setOpenMenus(list)), //设置展开的menu
    setBreadcrumb: (data: Breadcrumb[]) => dispatch(setBreadcrumb(data))
})


class Intercept extends Component<any, any> {
    constructor(props: any) {
        super(props)
        if (this.props.cacheLifecycles) {
            this.props.cacheLifecycles.didCache(this.componentDidCache)
            this.props.cacheLifecycles.didRecover(this.componentDidRecover)
        }
    }

    componentDidMount() {
        this.setInfo()
    }

    //被缓存
    componentDidCache = () => {

    }
    //didRecover
    componentDidRecover = () => {
        this.setInfo()
    }
    //通过当前路径找到当前选择的key
    setInfo = () => {
        const {
            setSelectMenu,
            setOpenMenus,
            setBreadcrumb,
            menuList,
            addOpenMenuTag,
            pageKey,
            title,
            path,
            parentPath,
            to,
        } = this.props;
        let openTag = {key: pageKey, title, path}
        to || addOpenMenuTag(openTag)
        //当前选择的菜单
        setSelectMenu(openTag)
        let breadcrumb = getMenuParentKey(menuList, "key", pageKey)
        setBreadcrumb(breadcrumb)
        //在跳转页面设置展开的菜单
        let current = menuList.find((item: any) => item.path === parentPath);
        current && setOpenMenus([current.key])
    }

    render() {
        const {component: PageComponent, menuList, key, path, to, ...itemProps} = this.props;
        if (to) {
            return (
                <Redirect key={key} exact={true} to={to}/>
            )
        }
        return (
            <PageComponent key={key} exact={true} path={path} {...itemProps} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Intercept));

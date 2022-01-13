import {useEffect, useState} from "react"
import {connect} from "react-redux"
import {Layout, Spin} from "antd"
import SideMenu from "./SideMenu"
import TopHeader from "./TopHeader"
import MainContent from "./MainContent"
//路由数据处理
import {setMenus} from "@/store/actions/menu";
import {getMenu} from "@/api/menus"
import {getUser} from "@/store/actions/userInfo";
import "./index.scss"
import {Dispatch} from "redux";

const mapStateToProps = (state:any) => ({
    menus: state.menus.menuList,
    token: state.user.token,
    userInfo: state.user.userInfo
})
const mapDispatchToProps = (dispatch:Dispatch) => ({
    setMenus: (data:any) => dispatch(setMenus(data)),
    // @ts-ignore
    getUserInfo: () => dispatch(getUser())
})
let timer:any = null;

const Index = ({menus, token, setMenus, getUserInfo}:any) => {
    const [loading, setLoading] = useState(true);
    const [height, setHeight] = useState(document.documentElement.clientHeight)

    useEffect(() => {
        let ignore = false;
        getUserInfo().then((res:any) => {
            getMenu(res.data.userInfo.roles).then(res => {
                let menus = res.data || [];
                if (!ignore) {
                    setMenus(menus)
                    setLoading(false)
                }
            }).catch(e => !ignore && setLoading(false))
        }).catch((e:any) => {
            !ignore && setLoading(false)
        })
        window.addEventListener("resize", function () {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            timer = setTimeout(() => {
                setHeight(document.documentElement.clientHeight)
                clearTimeout(timer)
                timer = null
            }, 100)
        })
        return function () {
            ignore = true
        }
    }, [token, setMenus, getUserInfo])
    if (loading) return (
        <div className="loading-page"><Spin size="large" wrapperClassName="loading-page" tip="Loading..."/></div>
    )
    return (
        <Layout style={{height: height}}>
            <SideMenu menus={menus}/>
            <Layout>
                <TopHeader>Header</TopHeader>
                <MainContent/>
            </Layout>
        </Layout>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)

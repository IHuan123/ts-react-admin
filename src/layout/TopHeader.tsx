import {Layout, Avatar, PageHeader, Menu, Dropdown} from "antd"
import {connect } from "react-redux";

import { withRouter } from "react-router-dom";
import {SwapOutlined} from "@ant-design/icons";
import {loginOut} from "../store/actions/userInfo";
const { Header } = Layout
const mapStateToProps = (state:any)=>({
    user:state.user.userInfo,
    selectMenu: state.menus.selectMenu,
})
const mapDispatchToProps = {
    loginOut
}

const UserMenu = ( { loginOut }:any )=>(
    <Menu onClick={ ({key})=> loginOut(key) }>
        <Menu.Item key="user-center">
            个人中心
        </Menu.Item>
        <Menu.Item key="cut-user" icon={<SwapOutlined />}>
            切换用户
        </Menu.Item>
    </Menu>
)

function TopHeader({user,selectMenu= {},history,loginOut}:any){
    const handUserMenu = (key:string)=>{
        if(key==="user-center"){
            history.push("/user")
        }else if(key==="cut-user"){
            loginOut()
        }
    }
    return (
        <Header style={{ width: '100%',padding:"0 30px",background: "#FFFFFF"}}  className="site-layout-header">
            <div>
                <PageHeader
                    style={{padding:"0"}}
                    className="site-page-header"
                    onBack={() => window.history.back()}
                    title={ selectMenu.title }
                />
            </div>
            <Dropdown overlay={ <UserMenu loginOut={ handUserMenu }/> }>
                <Avatar size={45} src={ user.avatar } className={"avatar"} />
            </Dropdown>


        </Header>
    )
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(TopHeader))

import React, { Component } from "react"
import { Menu, Layout } from "antd"
import { Menus } from "@/utils"

import { withRouter, Link } from "react-router-dom"
import { connect } from "react-redux"
import {Dispatch} from "redux";
import { setOpenMenus } from "@/store/actions/menu"
import Icon from "@/components/Icon/Icon"
const { Sider } = Layout;


//菜单子选项渲染处理
const renderMenu:React.FC<any> = (item:Menus, path:string = "")=>{
    if(!item.visible) return null;
    if (!item.children) return <Menu.Item key={item.key} icon={ <Icon type={item.icon} style={{fontSize:"20px"}}/> }>
        <Link to={(path || "") + item.path}>{item.title}</Link>
    </Menu.Item>
    return (
        <Menu.SubMenu
            key={item.key}
            title={item.title}
            icon={ <Icon type={item.icon} style={{fontSize:"20px"}}/> }
        >
            {item.children.map((i:Menus) => renderMenu(i, path + item.path))}
        </Menu.SubMenu>
    )
}


// type StateType = {
//     [propName: string]: any;
// };
// type propType = {
//     [propName: string]: any;
// };
//声明合并
// interface SideMenu{
//     state: StateType;
//     props:propType
// }
class SideMenu extends Component<any,any>{
    constructor(props:any) {
        super(props);
        this.state = {
            collapsed:false
        }
    }
    render() {
        let { collapsed }:any = this.state;
        let { menus = [], openMenuKeys ,selectMenu }:any = this.props;
        let openMenu = []
        if(selectMenu){
            openMenu.push(selectMenu.key)
        }
        return (
            <Sider breakpoint={"md"}
                   collapsible
                   collapsed={collapsed}
                   onCollapse={this.onCollapse}
                   style={{ height: "100%", overflowY: "auto",msOverflowY:"scroll" }}
                   theme="light">
                <div className="logo">
                    <h1>LOGO</h1>
                </div>
                <Menu
                    theme="light"
                    mode="inline"
                    onOpenChange={this.onOpenChange}
                    selectedKeys ={ openMenu } //定位当前页面激活菜单
                    openKeys={ openMenuKeys }
                >
                    {menus.map(((item:Menus) => {
                        return renderMenu(item)
                    }))}
                </Menu>
            </Sider>
        )
    }
    onOpenChange = (keys:string[]) => {
        this.props.setOpenMenus(keys)
    }
    onCollapse=()=>{
        this.setState((state:any)=>{
            return {
                collapsed:!state.collapsed
            }
        })
    }
}
const mapStateToProps = (state:any) => ({
    openMenuKeys: state.menus.openMenuKeys, //展开的menu项
    selectMenu: state.menus.selectMenu
})
const mapDispatchTopProps = (dispatch:Dispatch) => ({
    setOpenMenus: (list:Array<string>) => dispatch(setOpenMenus(list))
})
export default connect(mapStateToProps, mapDispatchTopProps)(withRouter(SideMenu))

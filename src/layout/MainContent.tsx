import { Component } from "react"
import { Layout } from "antd"
import ContentRouter from "@/routes"
import TagsView from "./TagsView"
import "./index.scss"
const { Content } = Layout;

class SideMenu extends Component{
    render(){
        return (
            <Content style={{padding:"10px", height:"100%",overflowY:"scroll"}}>
                <TagsView/>
                <ContentRouter/>
            </Content>
        )
    }
}
export default SideMenu

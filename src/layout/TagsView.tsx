import React,{Component} from "react"

import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import {Breadcrumb, Tag} from 'antd';
import { delCloseMenuTag } from "@/store/actions/menu";
import Icon from "@/components/Icon/Icon"
import "./index.scss"
import {Dispatch} from "redux";


class TagsView extends Component<any>{
    render(){
        const { openMenuTags=[],selectMenu,breadcrumb=[],history } = this.props;
        return (
            <div className={"tag-container"}>
                {
                    breadcrumb.length !== 0 ? (<div className={"Breadcrumb"}>
                        <Breadcrumb separator="/">
                            {breadcrumb.map((item:any) => (
                                <Breadcrumb.Item key={item.key}>
                                    <Icon type={item.icon} style={{fontSize:"16px",lineHeight:"20px",fontWeight:"blob",color:"#666666"}}/>
                                    <span style={{fontSize:"14px",lineHeight:"20px",color:"#666666"}}>{item.title}</span>
                                </Breadcrumb.Item>
                            ))}
                        </Breadcrumb>
                    </div>):null
                }
                <div className="tags-view flex row">
                    { openMenuTags.map((item:any)=>(
                        <div key={item.key}>
                            <Tag
                                style={{height:40,borderRight:"1px solid #FFFFFF",padding:"0 10px",margin:0,borderRadius:0}}
                                color={selectMenu.key===item.key ? "#108ee9" : "#CFD8DC"}
                                closable={openMenuTags.length>1} onClose={ ()=>{this.closeTag(item)} }
                            >
                                <div style={{height:"40px",lineHeight:"40px",display:'inline-block',justifyContent:'center',alignItems:'center',cursor:"pointer"}} onClick={ ()=>history.push(item.path) }>{item.title}</div>
                            </Tag>
                        </div>
                    ) ) }
                </div>
            </div>

        )
    }
    //关闭tag
    closeTag=(e:any)=>{
        const { openMenuTags=[],history,selectMenu,delCloseMenuTag } = this.props;
        if(openMenuTags.length > 1){
            let key = e.key;
            let index = openMenuTags.findIndex((item:any) => {
                return item.key === key
            })
            delCloseMenuTag(key)
            if(selectMenu.key===openMenuTags[index].key){
                if(index === 0){
                    history.replace(openMenuTags[1].path)
                }else if(index>0){
                    history.replace(openMenuTags[index - 1].path)
                }
            }
        }
    }
}
const mapStateToProps = (state:any) => ({
    openMenuTags:state.menus.openMenuTags,
    selectMenu: state.menus.selectMenu,
    breadcrumb:state.menus.breadcrumb
})
const mapDispatchTopProps = (dispatch:Dispatch)=>({
    delCloseMenuTag:(key:string)=>dispatch(delCloseMenuTag(key))
})


export default connect(mapStateToProps,mapDispatchTopProps)(withRouter(TagsView))

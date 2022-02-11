import React, {useEffect, useRef, useState} from "react";
import {get,add,edit,del} from "@/api/s_user";
import {message, Table} from 'antd';
import Avatar from "antd/es/avatar/avatar";
import CrudOperate from "@/components/CrudOperate/CrudOperate";
import Action,{operate} from "@/components/Action/Action"
import FormModal from "./FormModal";
import "./index.scss"
import {getRoles, updateRoles, delRoles, UpdateParams,roleGetMenus, updateRolesMenus,addRoles } from "@/api/system";
const {Column} = Table;
const defaultForm = {
    username:"",
    avatar:"",
    deptId:"",
    email:"",
    enabled:"",
    phone:"",
    sex:"",
    roles:"",
    createTime:"",
}
interface UserType {
    uid?:number;
    username:string;
    avatar:string;
    deptId?:number;
    email:string;
    enabled:number;
    phone:string;
    sex:string;
    roles:string;
    createTime:string;
    roles_ids?:string[];
}
export default function User() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [isModalVisible, setModalVisible] = useState(false)
    const [currentForm, setCurrentForm] = useState<any>(defaultForm)
    const [refresh, setRefresh] = useState<number>(0)
    const [submitType, setType] = useState<operate>('')
    const [selectedRowKeys,setSelectedRowKeys] = useState<any>([])
    const formEl: any = useRef<HTMLFormElement>(null)
    const [roles, setRoles] = useState<any>([])
    const rowSelection = {
        onChange: (selectedRowKeys: any, selectedRows: any) => {
            setSelectedRowKeys(selectedRowKeys); //需要动态设置选中项目，在删除选中项是需要清除选中状态 ，否则会出现 Tree missing follow keys的错误
        },
        onSelect: (record:any, selected:any, selectedRows:any) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected:any, selectedRows:any, changeRows:any) => {
            console.log(selected, selectedRows, changeRows);
        },
    };
    const handleModel: (visible: boolean) => void = (visible: boolean): void => {
        if (!visible) setType("");
        setModalVisible(visible)
    }
    //刷新页面数据
    const refreshPage = () => {
        let count = refresh + 1
        setRefresh(count)
    }
    const handleCancel = () => {
        handleModel(false)
    }

    const addUser = () => {
        setType("add")
        handleModel(true)
        setCurrentForm(defaultForm)
    }
    const editUser = (info:UserType) => {
        setType("edit")
        handleModel(true)
        info.roles_ids = info.roles.split(",")
        setCurrentForm(info)
    }

    const delUser = (data:any)=>{
        let ids = [data].map((item:any) => item.uid)
        ids = Array.from(new Set(ids))
        del(ids).then((res:any) => {
            if(res.code===200){
                message.success(res.data)
                refreshPage()
            }
        })
    }
    const batchDelMenu = ()=>{
        let ids:number[] = selectedRowKeys;
        ids = Array.from(new Set(ids))
        if(ids.length===0) {
            message.error("没有选择需要删除的菜单！")
            return
        }
        del(ids).then((res:any) => {
            setSelectedRowKeys([])
            if(res.code===200){
                message.success(res.data)
                refreshPage()
            }
        })
    }
    // 提交表单
    const submit = () => {
        formEl.current.validateFields().then((values: any) => {
            let role_ids = values.roles_ids.join(",")
            if (submitType === 'edit') {
                console.log(role_ids)
                let form = Object.assign({}, currentForm, values,{roles:role_ids})
                edit(form).then((res: any) => {
                    if (res.code === 200) {
                        refreshPage()
                    }
                })
            } else if (submitType === 'add') {
                let form = Object.assign({}, values,{roles:role_ids})
                add(form).then((res:any) => {
                    if (res.code === 200) {
                        refreshPage()
                    }
                })
            }
            handleModel(false)
        });
    };
    useEffect(() => {
        let ignore = false;
        getRoles().then((res:any)=>{
            if(!ignore){
                setLoading(false)
                setRoles(res.data)
            }
        })
        return function (){
            ignore = true;
        }
    }, [])
    //获取数据
    const getList = () => {
        setLoading(true)
        get().then(res => {
            setData(res.data)
            setLoading(false)
        }).catch(e => setLoading(false))
    }
    useEffect(() => {
        getList()
    }, [refresh])
    return (
        <div className={"container"}>
            <CrudOperate  onAdd={ addUser } onDel={ batchDelMenu }/>
            {/*编辑框*/}
            <FormModal selectData={roles} type={ submitType } visible={ isModalVisible } title={"Base Model"} form={ currentForm } onCancel={ handleCancel } submit={ submit } ref={ formEl }/>
            <Table
                dataSource={data}
                loading={loading}
                rowKey={record => record.uid}
                rowSelection={{...rowSelection, checkStrictly:false,preserveSelectedRowKeys:false,selectedRowKeys:selectedRowKeys}}
            >
                <Column align={"center"} title={"id"} key={"uid"} dataIndex={"uid"}/>
                <Column align={"center"} title={"头像"} key={"uid"} dataIndex={"avatar"} render={avatar => (
                    <Avatar shape="square" size={64} src={avatar}/>
                )}/>
                <Column align={"center"} title={"账号"} key={"uid"} dataIndex={"username"}/>
                <Column align={"center"} title={"手机号"} key={"uid"} dataIndex={"phone"}/>
                <Column align={"center"} title={"邮箱"} key={"uid"} dataIndex={"email"}/>
                <Column align={"center"} title={"角色id"} key={"uid"} dataIndex={"roles"}/>
                <Column align={"center"} title={"是否禁用"} key={"uid"} dataIndex={"enabled"} render={enabled => (
                    <span>{enabled === 0 ? "禁用" : "启用"}</span>
                )}/>
                <Column align={"center"} title={"性别"} key={"uid"} dataIndex={"sex"} render={sex => (
                    <span>{sex === 0 ? "女" : "男"}</span>
                )}/>
                <Column align={"center"} title={"创建时间"} key={"uid"} dataIndex={"createTime"}/>
                <Column align={"center"} title={"操作"} key={"id"} render={col => (<>
                    <Action delTitle={"删除当前账号，确认删除？"} permission={["edit","del"]} onDel={() => {
                        delUser(col)
                    }} onEdit={() => {
                        editUser(col)
                    }}/>
                </>)}/>
            </Table>
        </div>

    )
}

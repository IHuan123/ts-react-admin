import React, {useEffect, useState, useRef} from "react";
import {Table, Row, Col, Tree, Card, message, Button} from 'antd';
import {getRoles, updateRoles, delRoles, UpdateParams,roleGetMenus, updateRolesMenus,addRoles } from "@/api/system";
import FormModal from "@/views/system/Roles/FormModal";
import Action,{operate} from "@/components/Action/Action"
import {getAllMenu, Menuer} from "@/api/menus";
import CrudOperate from "@/views/system/Menu/CrudOperate";
import "./index.scss"
const {Column} = Table

interface RoleForm {
    name:string;
    dataScope:string;
    id?:number
}
const defaultForm = {
    name:"",
    dataScope:""
}
function Roles() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [isModalVisible, setModalVisible] = useState<boolean>(false)
    const [submitType, setType] = useState<operate>('')
    const formEl: any = useRef<HTMLFormElement>(null)
    const [form,setForm] = useState<RoleForm|null>(defaultForm)
    // rowSelection objects indicates the need for row selection
    const [selectedRowKeys,setSelectedRowKeys] = useState<any>([])
    const rowSelection = {
        onChange: (selectedRowKeys:any, selectedRows:any) => {
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
    const [refresh, setRefresh] = useState<number>(0)
    //所有菜单
    const [allMenus,setAllMenus] = useState<Menuer[]>([])
    //角色对应的菜单
    const [menuIds,setMenuIds] = useState<number[]>([])
    const [currentId,setCurrentId] = useState<number|null>(null)
    //刷新页面数据
    const refreshPage = () => {
        let count = refresh + 1
        setRefresh(count)
    }
    //添加数据
    const add = (info?: RoleForm) => {
        setType("add")
        handleModel(true)
        if(info){
            setForm({name: info.name,dataScope:info.dataScope})
        }else{
            setForm(defaultForm)
        }
    }
    //批量删除
    const batchDelMenu = ()=> {
        let ids:number[] = selectedRowKeys;
        ids = Array.from(new Set(ids))
        if(ids.length===0) {
            message.error("没有选择需要删除的菜单！")
            return
        }
        delRoles(ids).then((res:any) => {
            setSelectedRowKeys([])
            if(res.code===200){
                message.success(res.data)
                refreshPage()
            }
        })
    }
    //编辑
    const edit = (info: any) => {
        setType("edit")
        setForm(info)
        handleModel(true)
    }
    //删除
    const del = (data: {
        name: string;
        dataScope: string;
        id: number
    }[]) => {
        let ids = data.map(item => item.id)
        ids = Array.from(new Set(ids))
        if(currentId && ids.indexOf(currentId) > -1){
            setCurrentId(null)
            setMenuIds([])
        }
        delRoles(ids).then((res: any) => {
            if (res.code === 200) {
                message.success(res.data)
                refreshPage()
            }
        })
    }
    //取消
    const cancel = () => {
        setType("")
        handleModel(false)
    }
    //提交数据
    const submit = ()=>{
        formEl.current.validateFields().then((values:{name: string; dataScope: string})=>{
            console.log(values)
            if (submitType === 'edit') {
                let params:UpdateParams = Object.assign({id:null}, form, values)
                updateRoles(params).then((res: any) => {
                    if (res.code === 200) {
                        refreshPage()
                    }
                })
            } else if (submitType === 'add') {
                let params = Object.assign({}, form, values)
                addRoles(params).then((res:any) => {
                    if (res.code === 200) {
                        refreshPage()
                    }
                })
            }
            handleModel(false)
        })
    }
    //tree check
    const onTreeCheck = (info: any) => {
        setMenuIds(info.checked)
    };
    //点击行
    const clickRow = (row:{id:number;name:string;dataScope:string}) =>{
        setCurrentId(row.id)
        getMenus(row.id)
    }
    //获取对应的角色菜单
    const getMenus = (id:number)=>{
        roleGetMenus(id).then(res=>{
            let ids  = res.data;
            setMenuIds(ids)
        })
    }
    //更新roles_menus
    const updateRoleMenu = ()=>{
        console.log(menuIds)
        updateRolesMenus({mIds:menuIds,rid:currentId}).then(res=>{
            message.success(res.data)
        })
    }
    useEffect(() => {
        let ignore = false;
        getRoles().then(res => {
            if(!ignore){
                setLoading(false)
                setData(res.data)
            }
        }).catch(e => setLoading(false))
        getAllMenu().then((res:any)=>{
            if(!ignore){
                setLoading(false)
                setAllMenus(res.data)
            }
        })
        return function (){
            ignore = true;
        }
    }, [])
    //获取数据
    const getList = () => {
        setLoading(true)
        getRoles().then(res => {
            setData(res.data)
            setLoading(false)
        }).catch(e => setLoading(false))
    }
    useEffect(() => {
        getList()
    }, [refresh])
    return (
        <div className={"container"}>
            <CrudOperate onAdd={ ()=>{add()} } onDel={ batchDelMenu }/>
            <FormModal visible={ isModalVisible } title={"base model"} form={ form } type={ submitType } submit={ submit } onCancel={ cancel } ref={ formEl }/>
            <Row gutter={[16,16]}>
                <Col span={18}>
                    <Table
                        onRow={record => ({
                            onClick: event => {
                                clickRow(record)
                            }, // 点击行
                        })}
                        dataSource={data}
                        loading={loading}
                        rowKey={record => record.id}
                        rowSelection={{...rowSelection, checkStrictly:false,preserveSelectedRowKeys:false,selectedRowKeys:selectedRowKeys}}
                    >
                        <Column align={"center"} title={"角色id"} key={"id"} dataIndex={"id"}/>
                        <Column align={"center"} title={"角色名称"} key={"id"} dataIndex={"name"}/>
                        <Column align={"center"} title={"权限范围"} key={"id"} dataIndex={"dataScope"}/>
                        <Column align={"center"} width={200} title={"操作"} key={"id"} render={col => (<>
                            <Action onDel={() => {
                                del([col])
                            }} onEdit={() => {
                                edit(col)
                            }} permission={["edit", "del"]}/>
                        </>)}/>
                    </Table>
                </Col>
                <Col span={6}>
                    <Card title={"访问权限"} size={"small"}>
                        <Tree
                            defaultExpandAll={true}
                            fieldNames={{ key: "menu_id"}}
                            checkable
                            checkedKeys={menuIds}
                            onCheck={ (e)=>{ onTreeCheck(e) } }
                            treeData={allMenus}
                            checkStrictly={true}
                        />
                        <Button type="primary" size={"small"} style={{float:"right"}} onClick={updateRoleMenu}>
                            确认
                        </Button>
                    </Card>
                </Col>
            </Row>
        </div>

    )
}

export default Roles;

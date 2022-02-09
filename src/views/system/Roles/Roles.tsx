import React, {useEffect, useState, useRef} from "react";
import {Table, Row, Col, Tree, Card, message} from 'antd';
import {getRoles, updateRoles, delRoles, UpdateParams } from "@/api/system";
import FormModal from "@/views/system/Roles/FormModal";
import Action,{operate} from "@/components/Action/Action"
import menuData from "@/mock/data/menus"
import {addMenu, deleteMenu} from "@/api/menus";
import {  } from "@/api/system";
import {reduceMenuList} from "@/utils";

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
    const [checkStrictly] = useState(false);
    const [isModalVisible, setModalVisible] = useState<boolean>(false)
    const [submitType, setType] = useState<operate>('')
    const formEl: any = useRef<HTMLFormElement>(null)
    const [form,setForm] = useState<RoleForm|null>(defaultForm)
    // rowSelection objects indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys:any, selectedRows:any) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
    //刷新页面数据
    const refreshPage = () => {
        let count = refresh + 1
        setRefresh(count)
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
        delRoles(ids).then((res: any) => {
            if (res.code === 200) {
                message.success(res.data)
                refreshPage()
            }
        })
    }

    const cancel = () => {
        setType("")
        handleModel(false)
    }
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
                addMenu(params).then((res:any) => {
                    if (res.code === 200) {
                        refreshPage()
                    }
                })
            }
            handleModel(false)
        })
    }


    const onSelect = (selectedKeys: React.Key[], info: any) => {
        console.log('selected', selectedKeys, info);
    };


    useEffect(() => {
        let ignore = false;
        getRoles().then(res => {
            if(!ignore){
                setLoading(false)
                setData(res.data)
            }
        }).catch(e => setLoading(false))
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
        <>
            <FormModal visible={ isModalVisible } title={"base model"} form={ form } type={ submitType } submit={ submit } onCancel={ cancel } ref={ formEl }/>
            <Row gutter={[16,16]}>
                <Col span={18}>
                    <Table
                        dataSource={data}
                        loading={loading}
                        style={{padding: "20px 0"}}
                        rowKey={record => record.id}
                        rowSelection={{...rowSelection, checkStrictly}}
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
                    <div style={{padding: "20px 0"}}>
                        <Card title={"访问权限"} size={"small"}>
                            <Tree
                                checkable
                                defaultSelectedKeys={[]}
                                defaultCheckedKeys={[]}
                                onSelect={onSelect}
                                treeData={menuData}
                            />
                        </Card>

                    </div>
                </Col>
            </Row>
        </>

    )
}

export default Roles;

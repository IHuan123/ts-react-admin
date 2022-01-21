import React, {useEffect, useState, useRef} from "react";
import "./index.scss"
import {message, Table} from 'antd';
import {connect} from "react-redux";
import Icon from "@/components/Icon/Icon";
import {getAllMenu, updateMenu, deleteMenu, addMenu} from "@/api/menus";
import Action from "@/views/system/Menu/Action";
import {reduceMenuList, Menus} from "@/utils"
import FormModal from "@/views/system/Menu/FormModal";
import CrudOperate from "@/views/system/Menu/CrudOperate";
const {Column} = Table;

type Menuer = Menus
type operate = "add" | "edit" | ""
const mapStateToProps = (state: any) => ({
    icons: state.icon.icon
})
const defaultForm = {
    keep_alive:0,
    visible:0,
    weight:0,
    icon: "",
    key: "",
    parent_key: "",
    parent_name: "",
    path: "",
    title: "",
}
function Menu() {
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<Menuer[]>([])
    const [isModalVisible, setModalVisible] = useState<boolean>(false)
    const [currentForm, setCurrentForm] = useState<any>({
        keep_alive:0,
        visible:0,
        weight:0,
        icon: "",
        key: "",
        parent_key: "",
        parent_name: "",
        path: "",
        title: "",
    })
    const [refresh, setRefresh] = useState<number>(0)
    const [submitType, setType] = useState<operate>('')
    const [selectedRowKeys,setSelectedRowKeys] = useState<any>([])
    const rowSelection = {
        onChange: (selectedRowKeys: any, selectedRows: any) => {
            setSelectedRowKeys(selectedRowKeys); //需要动态设置选中项目，在删除选中项是需要清除选中状态 ，否则会出现 Tree missing follow keys的错误
        },
        onSelect: (record: any, selected: any, selectedRows: any) => {
            // console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
            // console.log(selected, selectedRows, changeRows);
        },
    };
    const formEl: any = useRef<HTMLFormElement>(null)
    const handleModel: (visible: boolean) => void = (visible: boolean): void => {
        if (!visible) setType("");
        setModalVisible(visible)
    }
    //刷新页面数据
    const refreshPage = () => {
        let count = refresh + 1
        setRefresh(count)
    }
    //删除
    const delMenu = (data: Menuer) => {
        let ls = reduceMenuList([data])
        let ids = ls.map(item => item.menu_id)
        ids = Array.from(new Set(ids))
        deleteMenu(ids).then((res:any) => {
            if(res.code===200){
                message.success(res.data)
                refreshPage()
            }
        })
    }
    const batchDelMenu = ()=> {
        let ids:number[] = selectedRowKeys;
        ids = Array.from(new Set(ids))
        if(ids.length===0) {
            message.error("没有选择需要删除的菜单！")
            return
        }
        deleteMenu(ids).then((res:any) => {
            setSelectedRowKeys([])
            if(res.code===200){
                message.success(res.data)
                refreshPage()
            }
        })
    }
    //添加数据
    const add = (info?: Menuer) => {
        setType("add")
        handleModel(true)
        if(info){
            setCurrentForm({parent_key: info.key})
        }else{
            setCurrentForm(defaultForm)
        }
    }
    //编辑
    const edit = (info: Menuer) => {
        setType("edit")
        handleModel(true)
        setCurrentForm(info)
    }
    //获取数据
    const getList = () => {
        setLoading(true)
        getAllMenu().then(res => {
            setData(res.data)
            setLoading(false)
        }).catch(e => setLoading(false))
    }
    useEffect(() => {
        getList()
    }, [refresh])
    // 提交表单
    const submit = () => {
        formEl.current.validateFields().then((values: any) => {
            if (submitType === 'edit') {
                let form = Object.assign({}, currentForm, values)
                updateMenu(form).then((res: any) => {
                    if (res.code === 200) {
                        refreshPage()
                    }
                })
            } else if (submitType === 'add') {
                let form = Object.assign({parent_key: currentForm.key}, values)
                addMenu(form).then((res:any) => {
                    if (res.code === 200) {
                        refreshPage()
                    }
                })
            }
            handleModel(false)
        });
    };
    const onCancel = () => {
        handleModel(false)
    };
    return (
        <div className={"container"}>
            <CrudOperate onAdd={ ()=>{add()} } onDel={ batchDelMenu }/>
            <Table
                dataSource={data}
                loading={loading}
                rowKey={record => record.menu_id}
                rowSelection={{...rowSelection, checkStrictly:false,preserveSelectedRowKeys:false,selectedRowKeys:selectedRowKeys}}
            >
                <Column align={"center"} title={"菜单id"} key={"menu_id"} dataIndex={"menu_id"}/>
                <Column align={"center"} title={"名称"} key={"menu_id"} dataIndex={"title"}/>
                <Column align={"center"} title={"路由"} key={"menu_id"} dataIndex={"path"}/>
                <Column align={"center"} title={"菜单唯一key"} key={"menu_id"} dataIndex={"key"}/>
                <Column align={"center"} title={"菜单图标"} key={"menu_id"} dataIndex={"icon"}
                        render={col => (<Icon type={col} style={{fontSize: "20px"}}/>)}
                />
                <Column align={"center"} title={"父级菜单"} key={"menu_id"} dataIndex={"parent_name"}/>
                <Column align={"center"} title={"父级菜单key"} key={"menu_id"} dataIndex={"parent_key"}/>
                <Column align={"center"} title={"是否显示"} key={"menu_id"} dataIndex={"visible"}
                        render={col => (<span style={{fontSize: "14px"}}>{col === 1 ? "显示" : "隐藏"}</span>)}
                />
                <Column align={"center"} title={"是否缓存"} key={"menu_id"} dataIndex={"keep_alive"}
                        render={keep_alive => (<span style={{fontSize: "14px"}}>{keep_alive ? "缓存" : "不缓存"}</span>)}
                />
                <Column align={"center"} title={"菜单排序"} key={"menu_id"} dataIndex={"weight"}/>
                <Column align={"center"} title={"操作"} key={"menu_id"} render={col => (
                    <Action permission={["edit",!col.parent_key ? "add":"","del"]} onDel={() => {
                        delMenu(col)
                    }} onAdd={() => {
                        add(col)
                    }} onEdit={() => {
                        edit(col)
                    }}/>
                )}/>
            </Table>
            <FormModal type={ submitType } visible={isModalVisible} title={"编辑"} form={ currentForm } onCancel={ onCancel } submit={submit} refInstance={formEl} selectData={ data }/>
        </div>
    )
}

export default connect(mapStateToProps)(Menu)

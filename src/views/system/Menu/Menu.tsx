import React, {useEffect, useState, useRef, createRef} from "react";
import {Table} from 'antd';
import {connect} from "react-redux";
import Icon from "@/components/Icon/Icon";
import {getAllMenu, updateMenu, deleteMenu, addMenu} from "@/api/menus";
import Action from "@/views/system/Menu/Action";
import {reduceMenuList, Menus} from "@/utils"
import FormModal from "@/views/system/Menu/FormModal";

const {Column} = Table;

type Menuer = Menus
type operate = "add" | "edit" | ""
const mapStateToProps = (state: any) => ({
    icons: state.icon.icon
})

function Menu() {
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<Menuer[]>([])
    const [checkStrictly] = useState<boolean>(false);
    const [isModalVisible, setModalVisible] = useState<boolean>(false)
    const [currentForm, setCurrentForm] = useState<any>({
        keepAlive:0,
        visible:0,
        weight:0,
    })
    const [refresh, setRefresh] = useState<number>(0)
    const [submitType, setType] = useState<operate>('')
    const rowSelection = {
        onChange: (selectedRowKeys: any, selectedRows: any) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record: any, selected: any, selectedRows: any) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
            console.log(selected, selectedRows, changeRows);
        },
    };
    const formEl: any = useRef()
    const handleModel: (visible: boolean) => void = (visible: boolean): void => {
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
        console.log(ids)
        deleteMenu(ids).then(res => {
            console.log(res)
            refreshPage()
        })
    }
    //添加数据
    const add = (info: Menuer) => {
        setType("add")
        handleModel(true)
        setCurrentForm({parent_key: info.key})
        // setTimeout(() => {
        //     formEl.current.setFieldsValue({parent_key: info.key})
        // }, 0)
    }
    //编辑
    const edit = (info: Menuer) => {
        setType("edit")
        handleModel(true)
        setCurrentForm(info)
        // setTimeout(() => {
        //     formEl.current.setFieldsValue(info)
        // }, 0)
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
                addMenu(form).then(res => {
                    console.log(res)
                })
            }
            handleModel(false)
        });
    };
    const onCancel = () => {
        setType("")
        handleModel(false)
    };
    return (
        <>
            <FormModal type={ submitType } visible={isModalVisible} title={"编辑"} form={ currentForm } onCancel={onCancel} submit={submit} refInstance={formEl} selectData={ data }/>
            <Table
                dataSource={data} loading={loading}
                style={{padding: "20px 0"}}
                rowKey={record => record.menu_id}
                rowSelection={{...rowSelection, checkStrictly}}
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
                    <Action onDel={() => {
                        console.log(col);
                        delMenu(col)
                    }} onAdd={() => {
                        add(col)
                    }} onEdit={() => {
                        edit(col)
                    }}/>
                )}/>
            </Table>
        </>
    )
}

export default connect(mapStateToProps)(Menu)

import React, {useEffect, useState} from "react";
import {Table, Button, Modal, Form, Input, Row, Popconfirm} from 'antd';
import {connect} from "react-redux";
import Icon from "@/components/Icon/Icon";
import {getAllMenu} from "@/api/menus";
import Action from "@/views/system/Menu/Action";

const {Column} = Table;

const mapStateToProps = (state: any) => ({
    menus: state.menus.menuList
})

function Menu() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [checkStrictly] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false)
    const [form,setForm] = useState({
        title: ""
    })
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
    const handleSubmit = () => {
        handleModel(true)
    }
    const handleCancel = () => {
        handleModel(false)
    }
    const handleModel: (visible: boolean) => void = (visible: boolean): void => {
        setModalVisible(visible)
    }
    const edit = (info: any) => {
        setForm(info)
        handleModel(true)
    }
    useEffect(() => {
        let ignore = false;
        getAllMenu().then(res => {
            if (!ignore) {
                setData(res.data)
                setLoading(false)
            }
        }).catch(e => setLoading(false))
        return function () {
            ignore = true;
        }
    }, [])
    return (
        <>
            {/*编辑框*/}
            <Modal width={"550px"} title="Basic Modal" visible={isModalVisible} onOk={ handleSubmit }
                   onCancel={handleCancel}>
                <Form
                    name="basic"
                    labelCol={{span: 5}}
                    wrapperCol={{span: 18}}
                    initialValues={ form }
                    autoComplete="off"
                    labelAlign="left"
                >
                    <Form.Item
                        label="菜单标题"
                        name="title"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="菜单路径"
                        name="path"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="菜单key"
                        name="key"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="父级菜单"
                        name="parent_key"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="菜单图标"
                        name="icon"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="是否缓存"
                        name="keep_alive"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="菜单排序"
                        name="weight"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
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
                        render={col => (<span style={{fontSize: "14px"}}>{col ? "显示" : "隐藏"}</span>)}
                />
                <Column align={"center"} title={"是否缓存"} key={"menu_id"} dataIndex={"keepAlive"}
                        render={keepAlive => (<span style={{fontSize: "14px"}}>{keepAlive ? "缓存" : "不缓存"}</span>)}
                />
                <Column align={"center"} title={"菜单排序"} key={"menu_id"} dataIndex={"weight"}/>
                <Column align={"center"} title={"操作"} key={"menu_id"} render={col => (
                    <Action record={col.id} onDel={(e) => {
                        console.log(e)
                    }} onAdd={() => {
                    }} onEdit={()=>{edit(col)}}/>
                )}/>
            </Table>
        </>

    )
}

export default connect(mapStateToProps, null)(Menu)

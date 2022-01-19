import React, {useEffect, useState, useRef} from "react";
import {Table, Modal, Form, Input, Select, Radio, InputNumber} from 'antd';
import {connect} from "react-redux";
import Icon from "@/components/Icon/Icon";
import {getAllMenu,updateMenu,deleteMenu} from "@/api/menus";
import Action from "@/views/system/Menu/Action";
import {Iconer} from "@/store/actions/icon";
import { reduceMenuList,Menus } from "@/utils"

const {Column} = Table;
const {Option} = Select;

type Menuer = Menus
const mapStateToProps = (state: any) => ({
    icons: state.icon.icon
})


function Menu({icons}: { icons: Iconer[] }) {
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<Menuer[]>([])
    const [checkStrictly] = useState<boolean>(false);
    const [isModalVisible, setModalVisible] = useState<boolean>(false)
    const [currentForm, setCurrentForm] = useState<any>(null)
    const [refresh,setRefresh] = useState<number>(0)
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
    const formEl: any = useRef(null)
    const handleModel: (visible: boolean) => void = (visible: boolean): void => {
        setModalVisible(visible)
    }
    const edit = (info: Menuer) => {
        handleModel(true)
        setCurrentForm(info)
        setTimeout(() => {
            formEl.current.setFieldsValue(info)
        }, 0)
    }
    const refreshPage=()=>{
        let count = refresh+1
        setRefresh(count)
    }
    //更新数据
    const upMenu = (data:any)=>{
        updateMenu(data).then((res:any)=>{
            if(res.code===200){
                refreshPage()
            }
        })
    }
    //删除
    const delMenu = (data:Menuer)=>{
        let ls = reduceMenuList([data])
        let ids = ls.map(item=>item.menu_id)
        console.log(ids)
        deleteMenu(ids).then(res=>{
            console.log(res)
            refreshPage()
        })
    }
    //获取数据
    const getList = ()=>{
        setLoading(true)
        getAllMenu().then(res => {
            setData(res.data)
            setLoading(false)
        }).catch(e => setLoading(false))
    }
    useEffect(() => {
        getList()
    }, [refresh])

    useEffect(()=>{

    },[data])
    // 提交表单
    const submit = () => {
        formEl.current.validateFields().then((values:any) => {
            let form = Object.assign({},currentForm,values)
            upMenu(form)
            handleModel(false)
        });
    };
    const onCancel = () => {
        formEl.current.resetFields();
        handleModel(false)
    };
    return (
        <>
            {/*编辑框*/}
            <Modal  width={"550px"} title="Basic Modal" visible={isModalVisible} onOk={submit} onCancel={onCancel}>
                <Form
                    name="basic"
                    labelCol={{span: 5}}
                    wrapperCol={{span: 18}}
                    initialValues={currentForm}
                    autoComplete="off"
                    labelAlign="left"
                    ref={formEl}
                >
                    <Form.Item
                        label="菜单标题"
                        name="title"
                        rules={[{required: true, message: 'Please input your title!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="菜单路径"
                        name="path"
                        rules={[{required: true, message: 'Please input your path!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="菜单key"
                        name="key"
                        rules={[{required: true, message: 'Please input your key!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="父级菜单"
                        name="parent_key"
                        rules={[{required: false, message: 'Please input your parent_key!'}]}
                    >
                        <Select disabled={!!currentForm && currentForm.parent_key === ""}
                                placeholder="Please select a country">
                            {data.map((item: any) => (
                                <Option value={item.key} key={'select' + item.menu_id}>{item.title}</Option>))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="菜单图标"
                        name="icon"
                        rules={[{required: true, message: 'Please input your icon!'}]}
                    >
                        <Select allowClear={true}
                                showSearch={true}
                                placeholder="Please select a country">
                            {icons.map((item: Iconer) => (
                                <Option value={item.font_class} key={item.unicode_decimal}>
                                    <div style={{display: "flex",alignItems:"center"}}>
                                        <Icon type={item.font_class} style={{fontSize: "20px"}}/><span
                                        style={{marginLeft: "3px"}}>{item.font_class}</span>
                                    </div>
                                </Option>))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="显示在菜单"
                        name="visible"
                        rules={[{required: true, message: 'Please input your icon!'}]}
                    >
                        <Radio.Group>
                            <Radio value={0}>不显示</Radio>
                            <Radio value={1}>显示</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="是否缓存"
                        name="keep_alive"
                        rules={[{required: true, message: 'Please input your keep_alive!'}]}
                    >
                        <Radio.Group>
                            <Radio value={0}>不缓存</Radio>
                            <Radio value={1}>缓存</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="菜单排序"
                        name="weight"
                        rules={[{required: true, message: 'Please input your weight!'}]}
                    >
                        <InputNumber/>
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
                        render={col => (<span style={{fontSize: "14px"}}>{col === 1 ? "显示" : "隐藏"}</span>)}
                />
                <Column align={"center"} title={"是否缓存"} key={"menu_id"} dataIndex={"keep_alive"}
                        render={keep_alive => (<span style={{fontSize: "14px"}}>{keep_alive ? "缓存" : "不缓存"}</span>)}
                />
                <Column align={"center"} title={"菜单排序"} key={"menu_id"} dataIndex={"weight"}/>
                <Column align={"center"} title={"操作"} key={"menu_id"} render={col => (
                    <Action onDel={() => { console.log(col);delMenu(col)}} onAdd={() => {
                    }} onEdit={() => {edit(col)}}/>
                )}/>
            </Table>
        </>
    )
}

export default connect(mapStateToProps)(Menu)

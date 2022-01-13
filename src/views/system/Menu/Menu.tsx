import {useEffect, useState} from "react";
import {Table, Button, Modal, Form, Input} from 'antd';
import {connect} from "react-redux";
import Icon from "@/components/Icon/Icon";
import {getAllMenu} from "@/api/menus";
const {Column} = Table;

const mapStateToProps = (state:any) => ({
    menus: state.menus.menuList
})

function Menu() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [checkStrictly] = useState(false);
    const [isModalVisible, setModalVisible] = useState(true)
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
    const handleSubmit = () => {
        handleModel(true)
    }
    const handleCancel = () => {
        handleModel(false)
    }
    const handleModel = (visible:boolean) => {
        setModalVisible(visible)
    }
    const edit = () => {
        handleModel(true)
    }
    useEffect(() => {
        let ignore = false;
        getAllMenu().then(res => {
            if(!ignore){
                setData(res.data)
                setLoading(false)
            }
        }).catch(e => setLoading(false))
        return function (){
            ignore = true;
        }
    }, [])
    // @ts-ignore
    return (
        <>
            {/*编辑框*/}
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleSubmit} onCancel={handleCancel}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}

                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
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
                <Column align={"center"} title={"是否显示"} key={"menu_id"} dataIndex={"visible"}
                        render={col => (<span style={{fontSize: "14px"}}>{col ? "显示" : "隐藏"}</span>)}
                />
                <Column align={"center"} title={"是否缓存"} key={"menu_id"} dataIndex={"keepAlive"}
                        render={keepAlive => (<span style={{fontSize: "14px"}}>{keepAlive ? "缓存" : "不缓存"}</span>)}
                />
                <Column align={"center"} title={"菜单排序"} key={"menu_id"} dataIndex={"weight"}/>
                <Column align={"center"} title={"操作"} key={"menu_id"} render={col => (<>
                    <Button type="primary" style={{marginRight: "5px", fontSize: "12px"}} size={"small"} onClick={edit}>编辑</Button>
                    <Button type="ghost" style={{marginRight: "5px", fontSize: "12px"}} size={"small"}>删除</Button>
                </>)}/>
            </Table>
        </>

    )
}

export default connect(mapStateToProps, null)(Menu)

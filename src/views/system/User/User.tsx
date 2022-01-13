import {useEffect, useState} from "react";
import {getAllUser} from "@/api/system";
import {Table, Button, Modal} from 'antd';
import Avatar from "antd/es/avatar/avatar";

const {Column} = Table;
export default function User() {
    const [checkStrictly] = useState(false);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
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
        getAllUser().then(res => {
            if (!ignore) {
                setData(res.data)
                setLoading(false)
            }
        }).catch(e => {
            setLoading(false)
        })
        return function () {
            ignore = true;
        }
    }, [])
    return (
        <>
            {/*编辑框*/}
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleSubmit} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
            <Table
                dataSource={data}
                loading={loading}
                style={{padding: "20px 0"}}
                rowKey={record => record.uid}
                rowSelection={{...rowSelection, checkStrictly}}
            >
                <Column align={"center"} title={"id"} key={"uid"} dataIndex={"uid"}/>
                <Column align={"center"} title={"头像"} key={"uid"} dataIndex={"avatar"} render={avatar => (
                    <Avatar shape="square" size={64} src={avatar}/>
                )}/>
                <Column align={"center"} title={"账号"} key={"uid"} dataIndex={"username"}/>
                <Column align={"center"} title={"手机号"} key={"uid"} dataIndex={"phone"}/>
                <Column align={"center"} title={"手机号"} key={"uid"} dataIndex={"email"}/>
                <Column align={"center"} title={"角色id"} key={"uid"} dataIndex={"roles"}/>
                <Column align={"center"} title={"是否禁用"} key={"uid"} dataIndex={"enabled"} render={enabled => (
                    <span>{enabled === 0 ? "禁用" : "启用"}</span>
                )}/>
                <Column align={"center"} title={"头像"} key={"uid"} dataIndex={"sex"} render={sex => (
                    <span>{sex === 0 ? "女" : "男"}</span>
                )}/>
                <Column align={"center"} title={"创建时间"} key={"uid"} dataIndex={"createTime"}/>
                <Column align={"center"} title={"操作"} key={"id"} render={col => (<>
                    <Button type="primary" style={{marginRight: "5px", fontSize: "12px"}} size={"small"}
                            onClick={edit}>编辑</Button>
                    <Button type="ghost" style={{marginRight: "5px", fontSize: "12px"}} size={"small"}>删除</Button>
                </>)}/>
            </Table>
        </>

    )
}

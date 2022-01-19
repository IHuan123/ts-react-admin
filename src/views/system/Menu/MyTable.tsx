import {Table} from "antd";
import Icon from "@/components/Icon/Icon";
import Action from "@/views/system/Menu/Action";
import React, {useState} from "react";
const { Column } = Table

export interface Menuer {
    icon: string;
    keep_alive: number;
    key: string;
    menu_id: number;
    parent_key: string;
    parent_name: string;
    path: string;
    title: string;
    visible: number;
    weight: number;
    children?: Menuer[];
}

function MyTable(props:any){
    const { data,loading,onEdit } = props;
    const [checkStrictly] = useState<boolean>(false);
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
    const edit = (info: Menuer) => {
        onEdit(info)
    }


    return (
        <Table
            dataSource={data} loading={ loading }
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
                <Action onDel={(e) => {
                    console.log(e)
                }} onAdd={() => {
                }} onEdit={() => {
                    edit(col)
                }}/>
            )}/>
        </Table>
    )
}

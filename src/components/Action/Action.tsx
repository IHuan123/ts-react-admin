import React, {Component} from "react";
import {Button, Popconfirm} from "antd";

interface MProps {
    permission: Array<string>;
    delTitle?:string,
    onDel?: (e: any) => void;
    onEdit?: (e: any) => void;
    onAdd?: (e: any) => void;
}
export type operate = "add" | "edit" | ""
export default class MenuAction extends Component<MProps> {
    public render() {
        const {onDel, onEdit, onAdd, permission,delTitle="确认删除？"} = this.props;
        let edit = permission.indexOf("edit") > -1;
        let add = permission.indexOf("add") > -1;
        let del = permission.indexOf("del") > -1;
        return (
            <div>
                { edit && <Button type="link" onClick={onEdit}>
                    编辑
                </Button> }
                { add && <Button type="link" onClick={onAdd}>
                    添加子菜单
                </Button> }
                { del && <Popconfirm
                    onConfirm={ onDel }
                    okText="确认"
                    title={delTitle}
                    cancelText="取消"
                >
                    <Button type="link" danger>删除</Button>
                </Popconfirm> }
            </div>
        );
    }
}


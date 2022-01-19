import React, {Component} from "react";
import {Button, Popconfirm, Row} from "antd";

type IProps = {
    onDel:(e?:any)=>void;
    onEdit:(e?:any)=>void;
    onAdd:(e?:any)=>void;
}
export default interface Action {
    props:IProps
}
export default class MenuAction extends Component{
    render() {
        const { onDel,onEdit,onAdd } = this.props
        return (
            <Row>
                <Button type="link" onClick={ onEdit }>
                    编辑
                </Button>
                <Button type="link" onClick={onAdd}>
                    添加子菜单
                </Button>
                <Popconfirm
                    onConfirm={ onDel }
                    okText="确认"
                    title="删除选中菜单会一同删除其下所有子菜单，确认删除？"
                    cancelText="取消"
                >
                    <Button type="link" danger>
                        删除
                    </Button>
                </Popconfirm>
            </Row>
        );
    }
}


import React, {FC} from "react";
import {Button, Popconfirm, Row} from 'antd';
import { PlusOutlined,DeleteOutlined } from "@ant-design/icons"
interface CProps {
    onAdd:(e?:any)=>void;
    onDel:(e?:any)=>void;
}
const CrudOperate:FC<CProps> = ({ onAdd,onDel })=>{
    return (
        <Row>
            <Button  type="primary"  icon={<PlusOutlined />} onClick={ ()=>{ onAdd() } }>新增</Button>
            <Popconfirm
                onConfirm={ onDel }
                okText="确认"
                title="删除所有选中项，确认删除？"
                cancelText="取消"
            >
                <Button  danger  icon={<DeleteOutlined />} >删除</Button>
            </Popconfirm>
        </Row>
    )
}

export default CrudOperate

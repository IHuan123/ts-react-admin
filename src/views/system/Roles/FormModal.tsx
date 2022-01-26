import React, {FC, ForwardedRef,forwardRef} from "react"
import {Form, Input, Modal} from "antd";

interface IProps {
    visible: boolean;
    onCancel: () => void;
    submit: () => void;
    title: string;
    refInstance:ForwardedRef<any>;
    form:any;
    type:string;
}
const FormModal:FC<IProps> = ({refInstance,visible,title,submit, onCancel})=>{
    return (
        <Modal width={"550px"} title={title} visible={ visible } onOk={ submit } onCancel={ onCancel }>
            <Form ref={ refInstance }>
                <Form.Item
                    label="角色名称"
                    name="name"
                    rules={[{required: true, message: 'Please input your title!'}]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>

    )
}

const DialogForm = forwardRef((props:any,ref:ForwardedRef<any>)=>{
    return <FormModal {...props} refInstance={ ref }/>
})


export default DialogForm

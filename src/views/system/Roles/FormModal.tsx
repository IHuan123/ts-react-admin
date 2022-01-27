import React, {FC, ForwardedRef, forwardRef, useEffect} from "react"
import {Form, Input, Modal,Select, Tag} from "antd";

interface IProps {
    visible: boolean;
    onCancel: () => void;
    submit: () => void;
    title: string;
    refInstance:ForwardedRef<any>;
    form:any;
    type:string;
}

const FormModal:FC<IProps> = ({refInstance,visible,title,submit, onCancel, form, type})=>{
    useEffect(()=>{
        if (form && type !== "" && refInstance) {
            switch (type){
                case "edit":
                    (refInstance as any).current.setFieldsValue(form);
                    break;
                case "add":
                    (refInstance as any).current.setFieldsValue({parent_key:form.parent_key,keep_alive:0,visible:0, weight:0,});
                    break;
                default:

                    break;
            }
        }
    },[type])
    useEffect(() => {
        if (!visible && refInstance && (refInstance as any).current) {
            (refInstance as any).current.resetFields();
        }
    }, [visible])
    return (
        <Modal width={"550px"} title={title} visible={ visible } onOk={ submit } onCancel={ onCancel }>
            <Form
                ref={ refInstance }
                labelCol={{span: 5}}
                wrapperCol={{span: 18}}
                autoComplete="off"
                labelAlign="left"
            >
                <Form.Item
                    label="角色名称"
                    name="name"
                    rules={[{required: true, message: 'Please input your title!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="权限范围"
                    name="dataScope"
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

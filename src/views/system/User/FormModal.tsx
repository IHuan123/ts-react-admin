import React, {FC, ForwardedRef, forwardRef, useEffect} from "react"
import {Form, Input, Modal, Radio, Select} from "antd";
const { Option } = Select;
interface IProps {
    visible: boolean;
    onCancel: () => void;
    submit: () => void;
    title: string;
    refInstance:ForwardedRef<any>;
    form:any;
    type:string;
    selectData:any[]
}


const FormModal:FC<IProps> = ({refInstance,visible,title,submit, onCancel, form, type,selectData})=>{
    const cancel = () => {
        onCancel()
    }
    const handleSubmit = ()=>{
        submit()
    }
    useEffect(()=>{
        if (form && type !== "" && refInstance) {
            switch (type){
                case "edit":
                    (refInstance as any).current.setFieldsValue(form);
                    break;
                case "add":
                    (refInstance as any).current.setFieldsValue({parent_key:form.parent_key,keep_alive:0,visible:0, weight:0,});
                    break;
            }
        }
    },[type,refInstance,form])

    useEffect(() => {
        if (!visible && refInstance && (refInstance as any).current) {
            (refInstance as any).current.resetFields();
        }
    }, [visible,refInstance])

    const children = [];
    for (let i = 0; i < selectData.length; i++) {
        children.push(<Option key={selectData[i].id}>{selectData[i].name}</Option>);
    }
    function handleChange(value:any) {
        console.log(`selected ${value}`);
    }


    return (
        <Modal width={"550px"} title={title} visible={ visible } onOk={ handleSubmit } onCancel={ cancel }>
            <Form
                ref={ refInstance }
                labelCol={{span: 5}}
                wrapperCol={{span: 18}}
                autoComplete="off"
                labelAlign="left"
            >
                <Form.Item
                    label="账号"
                    name="username"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="头像"
                    name="avatar"
                    rules={[{required: true, message: 'Please input your avatar!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="手机号"
                    name="phone"
                    rules={[{required: true, message: 'Please input your phone!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[{required: true, message: 'Please input your email!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="性别"
                    name="sex"
                    rules={[{required: true, message: 'Please input your sex!'}]}
                >
                    <Radio.Group>
                        <Radio value={"0"}>女</Radio>
                        <Radio value={"1"}>男</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label="状态"
                    name="enabled"
                    rules={[{required: true, message: 'Please input your enabled!'}]}
                >
                    <Radio.Group>
                        <Radio value={0}>禁用</Radio>
                        <Radio value={1}>启用</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label="角色"
                    name="roles_ids"
                    rules={[{required: true, message: 'Please input your roles!'}]}
                >
                    {/*<Input/>*/}
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        onChange={handleChange}
                    >
                        {children}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>

    )
}

const DialogForm = forwardRef((props:any,ref:ForwardedRef<any>)=>{
    return <FormModal {...props} refInstance={ ref }/>
})


export default DialogForm

import { Form, Input, InputNumber, Modal, Radio, Select } from "antd";
import {Iconer} from "@/store/actions/icon";
import Icon from "@/components/Icon/Icon";
import React, {useRef, useState, forwardRef, ForwardedRef, useEffect} from "react";
import {Menus} from "@/utils"
import {connect} from "react-redux";

const {Option} = Select

type Menuer = Menus

interface IProps {
    visible: boolean;
    onCancel: () => void;
    submit: () => void;
    selectData?: Array<Menuer>;
    icons: Array<Iconer>;
    title: string;
    refInstance:ForwardedRef<any>;
    form:any;
    type:string;
}

const mapStateToProps = (state: any) => ({
    icons: state.icon.icon
})

const FormModal = ({visible, submit, onCancel, selectData, icons, title, refInstance, form ,type }: IProps)=>{
    const cancel = () => {
        (refInstance as any).current.resetFields();
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
                default:
                    break;
            }

        }

    },[type])
    return (
        <Modal width={"550px"} title={title} visible={ visible } onOk={ handleSubmit } onCancel={cancel}>
            <Form
                name="basic"
                labelCol={{span: 5}}
                wrapperCol={{span: 18}}
                initialValues={ form }
                autoComplete="off"
                labelAlign="left"
                ref={ refInstance }
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
                {
                    selectData && (
                        <Form.Item
                            label="父级菜单"
                            name="parent_key"
                            rules={[{required: false, message: 'Please input your parent_key!'}]}
                        >
                            <Select disabled={!!form && form.parent_key === ""}
                                    placeholder="Please select a country">
                                {selectData.map((item: Menuer) => (
                                    <Option value={item.key} key={'select' + item.menu_id}>{item.title}</Option>))}
                            </Select>
                        </Form.Item>
                    )
                }
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
                                <div style={{display: "flex", alignItems: "center"}}>
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
    )
}

const ForwardModal = forwardRef((props:IProps,ref:ForwardedRef<any>)=>(
    <FormModal { ...props } refInstance ={ ref }/>
))

const DialogForm = (props:IProps)=>{
    return(
        <ForwardModal
            { ...props }
            ref = { props.refInstance }
        />
    )

}

export default connect(mapStateToProps)(DialogForm)

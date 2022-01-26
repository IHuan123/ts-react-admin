import {useEffect, useState, useRef} from "react";
import {Table} from 'antd';
import {getRoles,roleGetMenus} from "@/api/system";

import FormModal from "@/views/system/Roles/FormModal";
import Action,{operate} from "@/components/Action/Action"
const {Column} = Table

interface RoleForm {
    name:string;
    dataScope:string;
}


function Roles() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [checkStrictly] = useState(false);
    const [isModalVisible, setModalVisible] = useState<boolean>(false)
    const [submitType, setType] = useState<operate>('')
    const formEl: any = useRef<HTMLFormElement>(null)
    const [form,setForm] = useState<RoleForm|null>()
    // rowSelection objects indicates the need for row selection
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
    const handleModel: (visible: boolean) => void = (visible: boolean): void => {
        if (!visible) setType("");
        setModalVisible(visible)
    }
    //通过角色id查询所有菜单
    const getMenus = (id:number)=>{

    }
    //编辑
    const edit = (info: any) => {
        setType("edit")
        roleGetMenus({rid:info.id}).then(res=>{
            console.log(res)
        })
        handleModel(true)
    }
    const cancel = () => {
        setType("")
        handleModel(false)
    }
    const submit = (info:any)=>{

    }


    useEffect(() => {
        let ignore = false;
        getRoles().then(res => {
            if(!ignore){
                setLoading(false)
                setData(res.data)
            }
        }).catch(e => setLoading(false))
        return function (){
            ignore = true;
        }
    }, [])
    return (
        <>
            <FormModal visible={ isModalVisible } title={"base model"} form={ form } type={ submitType } submit={ submit } onCancel={ cancel } ref={formEl}/>
            <Table
                dataSource={data}
                loading={loading}
                style={{padding: "20px 0"}}
                rowKey={record => record.id}
                rowSelection={{...rowSelection, checkStrictly}}
            >
                <Column align={"center"} title={"角色id"} key={"id"} dataIndex={"id"}/>
                <Column align={"center"} title={"角色名称"} key={"id"} dataIndex={"name"}/>
                <Column  align={"center"} width={ 200 } title={"操作"} key={"id"} render={col => (<>
                    <Action onDel={()=>{}} onEdit={()=>{
                        edit(col)
                    }} permission={["edit","del"]}/>
                </>)}/>
            </Table>
        </>

    )
}

export default Roles;

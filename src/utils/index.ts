export interface Menus{
    icon: string;
    keep_alive: boolean|number;
    key: string;
    menu_id: number,
    parentKey: string;
    path: string;
    title: string;
    visible:boolean|number;
    weight:number;
    children?:Array<Menus>;
    parent?:Menus,
    parentPath?:string;
    [propName: string]: any;
}
export function reduceMenuList(list:Menus[], path = ""):Menus[] {
    const data = [];
    let len = list.length;
    for (let i = 0; i < len; i++) {
        let item = list[i];
        let children = item.children || null;
        item.parentPath = path;
        if (children) {
            const child = reduceMenuList(children, path + item.path)
            data.push(...child)
        }
        data.push(item)
    }
    return data
}

//找父级
export function getMenuParentKey(list:Menus, key:string, val:any) {
    if (!list) return []
    let data = JSON.parse(JSON.stringify(list))
    let stack = []
    stack.push(...data)
    if (Array.isArray(data)) {
        while (stack.length !== 0) {
            let item:Menus = stack.pop();
            let children:Menus[]|undefined = item?.children;
            if (Array.isArray(children)) {
                for (let i = 0; i < children.length; i++) {
                    let res:{
                        icon:string;
                        title:string;
                        key:string;
                    }[] = []
                    let info:Menus = children[i]
                    info.parent = item;
                    if (info[key] === val){
                        return (function find(c):any {
                            res.unshift({icon:c.icon,title:c.title,key:c.key})
                            if (c.parent) return find(c.parent);
                            return res
                        })(info)
                    }
                    stack.push(info)
                }
            }else if(item[key]===val){
                return [{icon:item.icon,title:item.title,key:item.key}]
            }
        }
    }
    return []
}

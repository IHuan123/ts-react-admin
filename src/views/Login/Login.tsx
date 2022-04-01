import React, {Component, createRef, RefObject} from "react"
import { Input, Button, Checkbox, Form } from "antd"
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import "./index.scss"
import avatar from "@/assets/images/avatar.webp"
import { handleLogin } from "@/store/actions/userInfo";
import { connect } from 'react-redux'
const mapStateToProps = (state:any) => {
    return {

    };
};

const mapDispatchToProps = { handleLogin };


class Login extends Component<any,any> {
    private formEl: RefObject<any> = createRef<any>();
    public state = {
        loading: false,
        codeImg:"http://localhost:9000/captcha/code",
        refreshCodeImage:false,
        remember:false,
    }


    componentDidMount() {
        let remember = false
        try {
            remember = window.localStorage.getItem("remember") === "1"
        }catch (e) {
            remember = false
        }
        if(remember){
            let initValue:string
            try {
                initValue = window.localStorage.getItem("INIT_LOGIN_VALUE")||'{}';
            }catch (e) {
                initValue = ""
            }
            if(initValue && initValue!=="{}"){
                this.formEl.current.setFieldsValue(JSON.parse(initValue))
            }
        }
        this.setState({
            remember
        })
    }
    handleLoading=(state:any)=>{
        this.setState({
            loading:state||false
        })
    }
    onFinish = (e:{
        username:string;
        password:string;
    }) => {
        try {
            window.localStorage.removeItem("INIT_LOGIN_VALUE")
        }catch (e){
            console.log(e)
        }
        if(this.state.remember) {
            try{
                window.localStorage.setItem("INIT_LOGIN_VALUE",JSON.stringify({username: e.username,password: e.password }))
            }catch (e){
                console.log(e)
            }
        };
        this.props.handleLogin(e,this.props.history) //登录
        this.refreshCode()
    }
    onFinishFailed = (e:any) => {
        console.log('err',e)
    }
    refreshCode=()=>{
        this.setState({
            refreshCodeImage:true,
            codeImg:""
        })
        setTimeout(()=>{
            this.setState({
                refreshCodeImage:false,
                codeImg:"http://localhost:9000/captcha/code?time=" + new Date().valueOf()
            })
        },0)
    }
    onChange=(e:any)=>{
        try {
            window.localStorage.setItem("remember",e.target.checked ? "1":"0");
            if(!e.target.checked){
                window.localStorage.removeItem("INIT_LOGIN_VALUE")
            }
            this.setState({
                remember:e.target.checked
            })
        }catch (e){
            console.log(e)
        }
    }
    render() {
        const iconStyle = { color: "#999999" }
        const { codeImg,refreshCodeImage,remember } = this.state
        return (
            <div className="login">
                <div className="login-container">
                    <div className={"login-left"}>
                        <div className="decorate-box"/>
                        <img src={avatar} className="avatar" alt=""/>
                    </div>

                    <div className="login-form flex col">
                        <Form
                            labelCol={{ span: 0 }}
                            wrapperCol={{ span: 24 }}
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                            size={"small"}
                            ref={ this.formEl }
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}>
                                <Input
                                    bordered={false}
                                    className="input item"
                                    size="large"
                                    autoComplete={"off"}
                                    placeholder="请输入用户名"
                                    prefix={<UserOutlined style={iconStyle} />}
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}>
                                <Input.Password
                                    bordered={ false }
                                    className="input item"
                                    size="large"
                                    placeholder="请输入密码"
                                    type="password"
                                    autoComplete={"off"}
                                    prefix={<LockOutlined style={iconStyle} />}
                                    iconRender={visible => (visible ? <EyeTwoTone style={iconStyle} /> : <EyeInvisibleOutlined style={iconStyle} />)}
                                />
                            </Form.Item>
                            <Form.Item
                                name="code"
                                rules={[{ required: true, message: 'Please input code!' }]}>
                                <div className="item code flex row">
                                    <Input
                                        bordered={false}
                                        className="input code-input"
                                        size="large"
                                        placeholder="请输入验证码"
                                        maxLength={4}
                                        style={{width:"280px"}}
                                        prefix={<SafetyCertificateOutlined style={iconStyle} />}
                                    />

                                    {
                                        !refreshCodeImage && <div className="login-code-box">
                                            <img
                                                className="login-code"
                                                src={codeImg}
                                                alt=""
                                                onClick={this.refreshCode}
                                            />
                                        </div>
                                    }
                                </div>
                            </Form.Item>
                            <div className="remember-password item">
                                    <Checkbox checked={ remember } onChange={this.onChange}><span style={{color:"#999"}}>记住密码</span></Checkbox>
                                </div>
                            <Form.Item>
                                <div className="item">
                                    <Button type="primary" htmlType="submit" className="login-btn" loading={this.state.loading} ghost>登陆</Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }

}


export default connect(mapStateToProps,mapDispatchToProps)(Login)

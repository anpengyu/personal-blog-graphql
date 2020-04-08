import React from 'react';
import '../index.css'
import { Input, Button, Divider, Checkbox } from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { LOGIN } from '../graphql';
import { withApollo } from 'react-apollo';
import { AUTH_TOKEN } from '../../../utils/Constant'
import _ from 'lodash'

class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    onChangeLogin = async() => {
        let { query } = this.props.client;
        localStorage.setItem(AUTH_TOKEN, 'login')
        //自动调用添加功能
       const result =await query({
            query: LOGIN,
            variables: {
                username: 'apyaxd',
                password: 'anpengyu'
            },
        });
        console.log('login',result)
        const login = result.data.login
        if (!_.isEmpty(login)) {
            
            localStorage.setItem(AUTH_TOKEN, login.token)
        }
    }

    onChangeUserName = e => {
        console.log(e.target.value)
        this.setState({
            username: e.target.value
        })
    }

    onChangePsw = e => {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return (
            <div>
                <div className='input_root'>
                    <Input onChange={this.onChangeUserName} className='login_input' color='#000' size="large" placeholder="用户名" prefix={<UserOutlined />} />
                    <Input.Password onChange={this.onChangePsw} className='login_input' size="large" placeholder="密码" prefix={<UserOutlined />} />
                </div>
                <Button onClick={this.onChangeLogin} type="primary" shape="round" className='btn'>登录</Button>
                <div style={{ justifyContent: 'space-between', marginTop: 10 }}>
                    <div style={{ display: 'inline-block', float: "left" }}><Checkbox>7天内自动登录</Checkbox></div>
                    <div style={{ display: 'inline-block', float: "right" }}>找回密码</div>
                </div>
                <div style={{ marginTop: 50 }}>
                    <Divider>快捷登录</Divider>
                    <div>微信 QQ</div>
                </div>
            </div>
        );
    }
}

export default withApollo(LoginComponent);
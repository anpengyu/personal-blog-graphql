import React from 'react';
import '../index.css'
import { Input, Button, Divider, Checkbox, message } from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { LOGIN, USER_INFO } from '../graphql';
import { withApollo } from 'react-apollo';
import { withRouter } from "react-router-dom";
import { AUTH_TOKEN, CONSTANT_USER_INFO, LAST_PATH_NAME } from '../../../utils/Constant'
import _ from 'lodash'
import { connect } from 'dva';

class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            rememberMe: false,
        }
    }

    onChangeLogin = async () => {
        const { username, password,rememberMe } = this.state;
        let { query } = this.props.client;
        localStorage.setItem(AUTH_TOKEN, 'login')
        try {
            const result = await query({
                query: LOGIN,
                variables: {
                    username,
                    password,
                    rememberMe
                },
            });
            const login = result.data.login
            if (!_.isEmpty(login)) {
                localStorage.setItem(AUTH_TOKEN, login.token)
                this.loadUserInfo(login);
            } else {
                message.error('用户不存在');
            }
        } catch (e) {
            message.error('网络错误')
            console.log('eeeee', e)
        }

    }

    loadUserInfo = async (login) => {
        let { query } = this.props.client;
        query({
            query: USER_INFO,
            variables: {
                id: login.id
            },
        }).then(res => {
            let currentUserInfo = res.data.user;
            !_.isEmpty(currentUserInfo) && localStorage.setItem(CONSTANT_USER_INFO, JSON.stringify(res.data.user))
            let lastPathname = localStorage.getItem(LAST_PATH_NAME);
            this.props.dispatch({
                type: 'home/updateState',
                payload: {
                    currentUserInfo,
                    token: login.token
                }
            })
            if (!_.isEmpty(lastPathname)) {
                this.props.history.push(lastPathname)
            } else {
                this.props.history.push('/')
            }
            window.location.reload(false);
        }).catch(err => {
            console.log('err', err)
        });
    }

    onChangeUserName = e => {
        this.setState({
            username: e.target.value
        })
    }

    onChangePsw = e => {
        this.setState({
            password: e.target.value
        })
    }

    rememberMe = (e) => {
        console.log('e', e.target.checked)
        this.setState({
            rememberMe: e.target.checked
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
                    <div style={{ display: 'inline-block', float: "left" }} onChange={this.rememberMe}><Checkbox>7天内自动登录</Checkbox></div>
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

export default withApollo(withRouter(connect(({ home }) => ({
    home,
}))(LoginComponent)));
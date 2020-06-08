import React from 'react';
import '../index.css';
import { Tooltip, Input, Button, Divider, View, message } from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { withApollo } from 'react-apollo';
import { REGISTER } from '../graphql';
import { connect } from 'dva';
import { withRouter } from "react-router-dom";

class RegisterComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: 'apyaxd',
      password: '123456789',
      repassword: '123456789',
      phone: '18538555201'
    }
  }

  changeRegister = async () => {
    const { username, password, repassword, phone } = this.state;
    let { mutate } = this.props.client;
    try {
      let data = await mutate({
        mutation: REGISTER,
        variables: {
          username, password, repassword, phone
        },
      })
      if (data.data.register.response) {
        message.error(data.data.register.response.message);
      } else {
        message.info('注册成功，请登录~')
        this.props.dispatch({
          type: 'login/updateState',
          payload: {
            selectTitle: 0,
            username,
            password
          }
        })
      }
    } catch (e) {

    }
    console.log(username, password, repassword, phone);
  };

  userNameChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }
  passwordChange = (e) => {
    this.setState({
      password: e.target.value
    })
  }
  repasswordChange = (e) => {
    this.setState({
      repassword: e.target.value
    })
  }
  phoneChange = (e) => {
    this.setState({
      phone: e.target.value
    })
  }

  render() {
    const { username, password, repassword, phone } = this.state;
    return (
      <div>
        <div className='input_root'>
          <Input
            className='login_input'
            color="#000"
            size="large"
            value={username}
            onChange={this.userNameChange.bind(this)}
            placeholder="请输入用户名"
            prefix={<UserOutlined />}
          />
          <Input.Password
            className='login_input'
            size="large"
            value={password}
            onChange={this.passwordChange.bind(this)}
            placeholder="设置密码"
            prefix={<UserOutlined />}
          />
          <Input.Password
            className='login_input'
            size="large"
            value={repassword}
            onChange={this.repasswordChange.bind(this)}
            placeholder="确认密码"
            prefix={<UserOutlined />}
          />
          <Input
            className='login_input'
            size="large"
            value={phone}
            onChange={this.phoneChange.bind(this)}
            placeholder="手机号码"
            maxLength={25}
            prefix={<PhoneOutlined />}
          />
        </div>
        <Button
          onClick={this.changeRegister}
          type="primary"
          shape="round"
          className='btn'
        >
          注册
        </Button>
        <div style={{ marginTop: 10 }}>
          点击 “注册” 即表示您同意并愿意遵守简书
        </div>
        <div>
          <a href="/userAgreement">用户协议</a>和
          <a target="_blank" href="/privacyPolicy">
            隐私政策
          </a>
        </div>
        <div style={{ marginTop: 50 }}>
          <Divider>社交帐号直接注册</Divider>
          <div>微信 QQ</div>
        </div>
      </div>
    );
  }
}

export default withApollo(withRouter(connect(({ home, login }) => ({
  home, login
}))(RegisterComponent)));
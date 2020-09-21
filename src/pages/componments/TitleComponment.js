import React from 'react';
import './index.scss';
import { Input, Button, Menu, Dropdown } from 'antd';
import _ from 'lodash';
import { Link, withRouter } from "react-router-dom";
import { AUTH_TOKEN, CONSTANT_USER_INFO, loadUserInfo, loadUserId } from '../../utils/Constant';
import { LOGOUT } from './graphql';
import { withApollo } from 'react-apollo';
import { connect } from 'dva';
const tabs = [
    { name: '技术', index: 0 },
    { name: '问答', index: 1 },
    { name: '文章', index: 2 },
];
const MenuKeys = {
    USER_INFO: 0,
    SETTING: 1,
    LOGOUT: 2,
}
const menuDatas = [
    { title: '个人中心', key: MenuKeys.USER_INFO },
    { title: '设置', key: MenuKeys.SETTING },
    { title: '退出登录', key: MenuKeys.LOGOUT },
];

class TitleComponment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 0,
            tabs,
            isLogin: false,
            userInfo: {},
        };
    }
    clickLogout = (key) => {
        switch (key) {
            case MenuKeys.USER_INFO:
                let userId = loadUserId();
                this.props.history.push(`/userInfo/${userId}`);
                break;
            case MenuKeys.SETTING:
                break;
            case MenuKeys.LOGOUT:
                let { query } = this.props.client;
                //自动调用添加功能
                query({
                    query: LOGOUT
                })
                localStorage.removeItem(AUTH_TOKEN)
                localStorage.setItem(CONSTANT_USER_INFO,'')
                // window.location.reload(false);
                this.props.history.push(`/login`);
                break;
        }
    };

    componentDidMount() {
        let userInfo = loadUserInfo();
        let token = localStorage.getItem(AUTH_TOKEN);
        if (userInfo && !_.isEmpty(userInfo) && !_.isEmpty(token)) {
            this.setState({
                isLogin: true,
                userInfo,
            });
        }
    }

    changeTab = (currentTab) => {
        this.setState({
            currentTab,
        });
        this.props.dispatch({
            type:'titleComponent/updateState',
            payload:{
                currentTab
            }
        })
        this.props.history.push('/')
    };

    clickWriteArticle = () => {
        this.props.history.push('/write')
        // history.go();
    };

    loginUserTitle = (userInfo) => {
        let menu = (
            <Menu>
                {menuDatas.map((item, index) => {
                    return (
                        <Menu.Item key={index}>
                            <div onClick={this.clickLogout.bind(this, item.key)}>
                                {item.title}
                            </div>
                        </Menu.Item>
                    );
                })}
            </Menu>
        );
        return (
            <div>
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        {userInfo.username}
                    </a>
                </Dropdown>
            </div>
        );
    };

    clickToHome = () => {
        this.props.history.push('/');
    };

    render() {
        let pathname = this.props.history.location.pathname;
        let noTitle = ['/write', '/login']
        const { currentTab } = this.state;

        let userInfo = loadUserInfo();
        let isLogin = false;
        if (!_.isEmpty(userInfo)) {
            isLogin = true;
        }
        return (
            <>
                {_.includes(noTitle, pathname) ? null :
                    <div className='normal'>
                        <div className='nav'>
                            <div className='nav_row'>
                                <div className='nav_title'>
                                    <img
                                        onClick={this.clickToHome}
                                        style={{
                                            height: 50,
                                            width: 50,
                                            marginRight: 30,
                                            cursor: 'pointer',
                                        }}
                                        src={require('../../assets/timg.jpg')}
                                    />
                                    {tabs.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={
                                                    _.eq(currentTab, index) ? 'currentTab' : 'tab'
                                                }
                                                onClick={this.changeTab.bind(this, index)}
                                            >
                                                {item.name}
                                            </div>
                                        );
                                    })}
                                    {/* <Input.Search
                                        placeholder="搜索"
                                        onSearch={value => console.log(value)}
                                        enterButton
                                        className='search'
                                    /> */}
                                </div>

                                <div style={{ display: 'flex' }}>
                                    <div style={{ marginRight: 20 }}>
                                        <Button
                                            type="primary"
                                            shape="round"
                                            // icon={<FontColorsOutlined />}
                                            onClick={this.clickWriteArticle}>写博客</Button>
                                    </div>
                                    {isLogin ? (
                                        this.loginUserTitle(userInfo)
                                    ) : (
                                            <Link to="/login">登录/注册</Link>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>

        );
    }
}

// export default connect(({ home }) => ({
//     home,
// }))(Articles);
export default withApollo(withRouter(connect(({ titleComponent }) => ({
    titleComponent,
}))(TitleComponment)));
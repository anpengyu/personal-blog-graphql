import React from 'react';
import './index.scss';
import { Input, Button, Menu, Dropdown } from 'antd';
import _ from 'lodash';
import { Link, withRouter } from "react-router-dom";

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

    clickLogout = (key: number) => {
        switch (key) {
            case MenuKeys.USER_INFO:
                // history.push('/userInfo');
                break;
            case MenuKeys.SETTING:
                break;
            case MenuKeys.LOGOUT:
                // this.props.dispatch({
                //     type: 'base/logout',
                //     callback: () => {
                //         // this.setState({
                //         //   isLogin: false,
                //         //   userInfo: { username: '' },
                //         // });

                //         window.location.reload(false);
                //     },
                // });
                break;
        }
    };

    componentDidMount() {
        let userInfo = localStorage.getItem('userInfo');
        if (userInfo && !_.isEmpty(JSON.parse(userInfo))) {
            console.log('userInfo', userInfo);
            this.setState({
                isLogin: true,
                userInfo: JSON.parse(userInfo),
            });
        }
    }

    changeTab = (currentTab) => {
        this.setState({
            currentTab,
        });
    };

    clickWriteArticle = () => {
        this.props.history.push('/write')
    };

    loginUserTitle = () => {
        const { userInfo } = this.state;
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
        // history.push('/');
    };

    render() {
        const { currentTab, isLogin, userInfo } = this.state;
        console.log('isLogin', isLogin);
        console.log(currentTab);
        return (
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
                                            currentTab === index ? 'currentTab' : 'tab'
                                        }
                                        onClick={this.changeTab.bind(this, index)}
                                    >
                                        {item.name}
                                    </div>
                                );
                            })}
                            <Input.Search
                                placeholder="搜索"
                                onSearch={value => console.log(value)}
                                enterButton
                                className='search'
                            />
                        </div>

                        <div style={{ display: 'flex' }}>
                            <div style={{ marginRight: 20 }}>
                                <Button
                                    type="primary"
                                    shape="round"
                                    // icon={<FontColorsOutlined />}
                                    onClick={this.clickWriteArticle}
                                >写博客</Button>
                                <Link to={`/write`}>写文章</Link>
                            </div>
                            {isLogin ? (
                                this.loginUserTitle()
                            ) : (
                                    <Link to="/register">登录/注册</Link>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(TitleComponment)
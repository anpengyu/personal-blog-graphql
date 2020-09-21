import React from 'react';
import { Menu } from 'antd';
import '../index.scss'

import RightComponent from './detail/RightComponent';

const { SubMenu } = Menu;
class RequestComponent extends React.Component {

    render() {
        return (
            <div style={{ display: 'flex' }}>
                <div className='sidebar'>
                    <Menu
                        onClick={this.handleClick}
                        style={{ width: 200 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >     <Menu.Item key="home">Home</Menu.Item>
                        <Menu.ItemGroup key="g1" title="PUBLIC">
                            <Menu.Item key="1">Stack Overflow</Menu.Item>
                            <Menu.Item key="2">Tags</Menu.Item>
                            <Menu.Item key="3">Users</Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup key="g2" title="FIND A JOB">
                            <Menu.Item key="4">Jobs</Menu.Item>
                            <Menu.Item key="5">Companies</Menu.Item>
                        </Menu.ItemGroup>

                    </Menu>
                </div>
                <RightComponent />
            </div>
        )
    }
}

export default RequestComponent;
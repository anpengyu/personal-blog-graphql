import React from 'react';
import './index.css'
import { Tooltip, Input, Button, Divider, View } from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import TitleComponent from './components/TitleComponent';

let enumTitle = {
    LoginSelect: 0,
    RegisterSelect: 1
}
let enumMouseTitle = {
    NULL: -1,
    LoginOver: 2,
    LoginOut: 3,
    RegisterOver: 4,
    RegisterOut: 5,
}

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectTitle: enumTitle.LoginSelect,
            mouseTitle: -1,
        }
    }

    onMouseOver = (mouseTitle) => {
        const { selectTitle } = this.state;
        if ((selectTitle == enumTitle.LoginSelect && mouseTitle == enumMouseTitle.LoginOver)
            || (selectTitle == enumTitle.RegisterSelect && mouseTitle == enumMouseTitle.RegisterOver)) {
            return;
        }
        this.setState({
            mouseTitle
        })
    }

    changeTitle = (selectTitle) => {
        this.setState({
            selectTitle,
            mouseTitle: enumMouseTitle.NULL
        })
    }

    render() {
        const { selectTitle, mouseTitle } = this.state;
        return (
            <div className='login_root'>
                <div className='card'>
                    <TitleComponent
                        changeTitle={this.changeTitle}
                        selectTitle={selectTitle}
                        mouseTitle={mouseTitle}
                        onMouseOver={this.onMouseOver}
                        enumTitle={enumTitle}
                        enumMouseTitle={enumMouseTitle}
                    />
                    {selectTitle == enumTitle.LoginSelect ?
                        <LoginComponent /> :
                        <RegisterComponent />
                    }
                </div>
            </div>
        );
    }
}

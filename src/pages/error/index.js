import React, { Component } from 'react';
import { Result, Button, message } from 'antd';
import { withRouter } from 'react-router';


class ErrorPage extends Component {
    constructor(props){
        super(props);
        message.error('网络错误')
    }
    render() {
        return (
            <div>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button type="primary" onClick={()=>this.props.history.push('/')}>Back Home</Button>}
                />
            </div>
        )
    }
}

export default withRouter(ErrorPage)
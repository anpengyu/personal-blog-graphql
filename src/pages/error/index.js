import React, { Component } from 'react';
import { Result, Button } from 'antd';
import { withRouter } from 'react-router';

class ErrorPage extends Component {
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
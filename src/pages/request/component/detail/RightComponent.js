import React from 'react';
import { Divider } from 'antd';
import ContentComponent from './ContentComponent';
import TitleComponent from './TitleComponent';

class RightComponent extends React.Component {

    render() {
        return (
            <div style={{paddingLeft:'230px'}}>
                <TitleComponent />
                <Divider />
                <ContentComponent />
            </div>
        )
    }
}

export default RightComponent;
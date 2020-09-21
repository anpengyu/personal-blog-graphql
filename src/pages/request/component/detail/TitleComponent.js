import React from 'react';
import {  Button} from 'antd';
class RequestComponent extends React.Component {

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <div style={{ fontSize: '26px', width: '700px', fontWeight: 'bold', color: 'var(--black-700)' }}>
                        Create a Java annotation for warnings - @NonOptimaasdfasdfasdfasdfasdfasdfadfl</div>
                    <div style={{}}>
                        Asked 14 days ago Active 5 days ago Viewed 107 times
                    </div>
                </div>

                <div style={{ marginRight: '150px', paddingTop: '20px' }}>
                    <Button
                        type="primary"
                        // icon={<FontColorsOutlined />}
                        onClick={this.clickWriteArticle}>创建问题</Button>
                </div>

            </div>
        )
    }
}

export default RequestComponent;
import React, { Component } from 'react'
import {
    message, Modal,
    Form,
    Select,
    Divider,
    Input,
    Button,
    Radio
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import _ from 'lodash'
import { connect } from 'dva'

const { Option } = Select;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

let index = 0;
export class ArticleModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: ['jack', 'lucy'],
            name: '',
            original: true,//是否原创
            classifyDetail: []
        }
    }

    onNameChange = event => {
        this.setState({
            name: event.target.value,
        });
    };

    addItem = () => {
        console.log('addItem');
        const { items, name } = this.state;
        this.setState({
            items: [...items, name || `New item ${index++}`],
            name: '',
        });
        let { loadClassifyForUser = [] } = this.props.classify;
        let data = {
            id: Number(loadClassifyForUser[loadClassifyForUser.length - 1].id) + 1,
            name: name
        }
        loadClassifyForUser.push(data)
        console.log('loadClassifyForUse.....r',loadClassifyForUser)
        this.props.dispatch({
            type: 'writeArticle/updateState',
            payload: {
                loadClassifyForUser: [loadClassifyForUser || `New item ${index++}`],
            }
        })
    };
    handleChange(value) {
        console.log(`selected ${value}`);
    }

    onOriginalChange = (value) => {
        console.log('value....,,,', value.target.value)
        this.setState({ original: value.target.value })
    }

    onClassifyChange = (value) => {
        console.log('value', value)
        let { loadClassifyForUser = [] } = this.props.classify;
        let data = _.filter(loadClassifyForUser, function (o) { return _.eq(o.name, value); });
        console.log('data[0]', data[0])
        if(data[0].detail && !_.isEmpty(data[0].detail)){
            data = JSON.parse(data[0].detail)
        }else{
            data = []
        }
        console.log(data)
        this.setState({
            classifyDetail: data
        })
    }

    render() {
        const onFinish = values => {
            this.props.submit(values)
            console.log('Received values of form: ', values);
        };
        const { items, name, classifyDetail } = this.state;
        const { loadClassifyForUser = [] } = this.props.classify;
        console.log('classify', loadClassifyForUser)
        return (
            <div>
                <Modal
                    title="提交"
                    footer={null}
                    closable={false}
                    visible={this.props.modelVisible}
                >
                    <div>
                        <Form
                            onFinish={onFinish}
                            name="validate_other"
                            {...formItemLayout}
                            initialValues={{
                                original: true,
                                privacy: false
                            }}
                        >
                            <Form.Item label="文章标题">
                                <span className="ant-form-text">{this.props.articleTitle}</span>
                            </Form.Item>
                            <Form.Item name="course" label="文章系列" valuePropName="checked" style={{ paddingTop: 20, paddingBottom: 20 }}>
                                <Select
                                    style={{ width: 240 }}
                                    onChange={this.onClassifyChange}
                                    placeholder={_.isEmpty(loadClassifyForUser) ? "Android基础教程" : loadClassifyForUser[0].name}
                                    dropdownRender={menu => (
                                        <div>
                                            {menu}
                                            <Divider style={{ margin: '4px 0' }} />
                                            <div style={{ flexWrap: 'nowrap', padding: 8 }}>
                                                <Input style={{ flex: 'auto' }} value={name} onChange={this.onNameChange} />
                                                <a
                                                    style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                                    onClick={this.addItem}
                                                >
                                                    <PlusOutlined /> 添加新的文章合集(分类)
                                            </a>
                                            </div>
                                        </div>
                                    )}
                                >
                                    {loadClassifyForUser.map(item => (
                                        <Option key={item.name}>{item.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            {
                                _.isEmpty(classifyDetail) ? null :
                                    classifyDetail.map((item, index) => {
                                        return <div key={index}>{item.name}</div>
                                    })
                            }

                            <Form.Item
                                name="label"
                                label="文章标签"
                                rules={[{ required: false, message: 'Please select your favourite colors!' }]}
                            >
                                <Select mode="tags" placeholder="请选择该文章的标签~">
                                    <Option value="red">Red</Option>
                                    <Option value="green">Green</Option>
                                    <Option value="blue">Blue</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="privacy" label="私密文章" style={{ paddingTop: 20, paddingBottom: 20 }}>
                                <Radio.Group>
                                    <Radio value={true}>是</Radio>
                                    <Radio value={false}>否</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name="original" label="是否原创" >
                                <Radio.Group onChange={(value) => { this.setState({ original: value.target.value }) }}>
                                    <Radio value={true}>是</Radio>
                                    <Radio value={false}>否</Radio>
                                </Radio.Group>
                            </Form.Item>
                            {
                                this.state.original == true ? null : <Form.Item label="原创链接">
                                    <Form.Item name="originalUrl" noStyle>
                                        <Input style={{ width: '180px', marginRight: '10px' }} />
                                    </Form.Item>
                                    <span className="ant-form-text">尊重原创~~</span>
                                </Form.Item>
                            }


                            <Divider style={{ marginTop: '30px', marginBottom: '10px' }} />
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button onClick={this.props.handleCancel}>修改文章</Button>
                                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                                    <Button htmlType="submit" type='primary' style={{ marginLeft: '10px' }}>提交审核</Button>
                                </Form.Item>

                            </div>

                        </Form>


                    </div>
                </Modal>
            </div>
        )
    }
}

export default connect(({ writeArticle }) => ({
    writeArticle,
}))(ArticleModal);
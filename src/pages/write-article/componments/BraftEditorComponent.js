"use strict";

import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/code-highlighter.css'
import {ContentUtils} from 'braft-utils'
import React from 'react';
import { Input, message ,Upload,Icon,Form} from 'antd';
import { connect } from 'dva';
import BraftEditor from 'braft-editor';
import _ from 'lodash';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'
import { withApollo } from 'react-apollo';
import { withRouter } from "react-router-dom";
import { randomId, loadUserInfo } from '../../../utils/Constant';
import ArticleModal from './ArticleModal';
import HeaderId from 'braft-extensions/dist/header-id'
import { ADD_ARTICLE, LOAD_CLASSIFY_FOR_USER } from '../graphql';
import { ALL_ARTICLES } from '../../home/graphql';

BraftEditor.use(
    CodeHighlighter({
        includeEditors: ['editor-id-1'],
    }),
);

const options = {
    includeEditors: ['editor-id-1'], // 指定该模块对哪些BraftEditor生效，不传此属性则对所有BraftEditor有效
}

BraftEditor.use(HeaderId(options))

String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}
/**
 * 文章编辑器
 * @date 2020-03-31
 */

class BraftEditorComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editorState: BraftEditor.createEditorState(),
            articleTitle: '', //文章标题
            articleContent: '', //文章内容
            modelVisible: false,
        };
    }

    handleOk = e => {
        console.log(e);
        this.setState({
            modelVisible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            modelVisible: false,
        });
    };

    delHtmlTag(str) {
        return str.replace(/<[^>]+>/g, ''); //正则去掉所有的html标记
    }

    submit = async (values) => {
        const { editorState, articleTitle } = this.state;
        let userInfo = loadUserInfo()
        if (_.isEmpty(userInfo)) {
            message.error('您已退出登录，请保存数据后重新登录发布~')
            return;
        }
        let content = editorState.toHTML()
        if (_.isEmpty(articleTitle) || content === '<p></p>') {
            message.error('文章标题或者内容不能为空~');
            return;
        }
        // this.props.dispatch({
        //     type: 'writeArticle/mutateArticle',
        //     payload: {
        //         userId: 1,//userInfo.id,
        //         articleContent: content,
        //         articleSubTitle: this.delHtmlTag(content).substring(
        //             0,
        //             100,
        //         ),
        //         articleTitle,
        //         ...values
        //     },
        //     history: this.props.history
        // })
        try {
            let data = await this.props.client.mutate({
                mutation: ADD_ARTICLE,
                variables: {
                    userId: userInfo.id,//userInfo.id,
                    articleContent: content,
                    articleSubTitle: this.delHtmlTag(content).substring(0, 100),
                    articleTitle,
                    ...values
                },
                refetchQueries: [
                    { query: ALL_ARTICLES, variables: { pageNum: 0, pageSize: 20 } }
                ]
            })
            message.info('您的文章已提交审核')
            this.props.history.push('/')
        } catch (e) {
            console.log('createArticle error', e)
        }
    }

    showModal = async () => {
        let userInfo = loadUserInfo()
        if (_.isEmpty(userInfo)) {
            message.error('您已退出登录，请保存数据后重新登录发布')
            return;
        }

        this.props.dispatch({
            type: 'writeArticle/loadClassifyForUser',
            payload: {
                userId: userInfo.id//userInfo.id
            },
        })
        this.setState({
            modelVisible: true,
        });
    };
    beforeUpload = file => {
        this.props.form.setFieldsValue({
            content: ContentUtils.insertMedias(this.props.form.getFieldValue('content'), [{
                type: 'IMAGE',
                url: '', // imgUrl 为上传成功后 后台返回的url地址
            }])
     
        })  }
    handleChange = (editorState) => {
                const { handleChange } = this.props;
                handleChange(editorState)
                this.setState({ editorState });
            };

        changeTitle = (e) => {
            this.setState({
                articleTitle: e.target.value,
            });
        };
        render() {
            // const {
            //     form: { getFieldDecorator },
            // } = this.props;
            const extendControls = [
                {
                    key: 'custom-button',
                    type: 'button',
                    text: '预览',
                    onClick: this.showModal,
                },
                {
                    key: 'save-button',
                    type: 'button',
                    text: '保存到草稿',
                    onClick: this.showModal,
                },
                {
                    key: 'submit-button',
                    type: 'button',
                    text: '提交',
                    onClick: this.showModal,
                },
                {
                    key: 'antd-uploader',
                    type: 'component',

                    text: '图片',
                    component: (
                        <Upload
                            accept="image/*"
                            showUploadList={false}
                            beforeUpload={this.beforeUpload}
                        >
                            {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
                            <button type="button" className="control-item button upload-button" data-title="插入图片">
                                插入图片<Icon type="picture" theme="filled" />
                            </button>
                        </Upload>
                    )
                }
            ];
            return (
                <div style={{ display: 'inline-block', width: 1000 }}>
                    <div
                        style={{
                            borderWidth: 1,
                            height: '100vh',
                            borderColor: '#000',
                            borderStyle: 'solid',
                        }}
                    >
                        <div>
                            <Input
                                style={{ height: 50, fontSize: 20 }}
                                onChange={this.changeTitle}
                                placeholder="文章标题"
                            ></Input>
                        </div>
                        <div className="editor-wrapper">
                            <BraftEditor
                                id="editor-id-1"
                                extendControls={extendControls}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <ArticleModal
                        articleTitle={this.state.articleTitle}
                        modelVisible={this.state.modelVisible}
                        handleOk={this.handleOk}
                        handleCancel={this.handleCancel}
                        submit={this.submit}
                        classify={this.props.writeArticle.classify}
                    />
                </div>
            );
        }
    }

    export default withApollo(withRouter(connect(({ writeArticle }) => ({
        writeArticle,
    }))(BraftEditorComponent)));
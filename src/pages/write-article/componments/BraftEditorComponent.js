import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/code-highlighter.css'

import React from 'react';
import { Input, message, Modal } from 'antd';
import { connect } from 'dva';
import BraftEditor from 'braft-editor';
import _ from 'lodash';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'
import { withApollo } from 'react-apollo';
import { withRouter } from "react-router-dom";
import { CONSTANT_USER_INFO ,randomId} from '../../../utils/Constant';
import ArticleModal from './ArticleModal';
import HeaderId from 'braft-extensions/dist/header-id'

BraftEditor.use(
    CodeHighlighter({
        includeEditors: ['editor-with-code-highlighter'],
    }),
    // HeaderId({})
);

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

    submit = (values) => {
        console.log('values', values)
        console.log('course', values.course)
        console.log('label', values.label)

        const { editorState, articleTitle } = this.state;
        let userInfo = JSON.parse(localStorage.getItem(CONSTANT_USER_INFO));
        if (_.isEmpty(userInfo)) {
            message.error('您已退出登录，请保存数据后重新登录发布')
            return;
        }
        let content = editorState.toHTML()
        if (_.isEmpty(articleTitle) || content === '<p></p>') {
            message.error('文章标题或者内容不能为空~');
            return;
        }
        content = _.replace(content,'<h1>',`<h1 id=${randomId()}>`)
        content = _.replace(content,'<h2>',`<h2 id=${randomId()}>`)
        content = _.replace(content,'<h3>',`<h3 id=${randomId()}>`)
        content = _.replace(content,'<h4>',`<h4 id=${randomId()}>`)
        content = _.replace(content,'<h5>',`<h5 id=${randomId()}>`)
        content = _.replace(content,'<h6>',`<h6 id=${randomId()}>`)
        this.props.dispatch({
            type: 'writeArticle/mutateArticle',
            payload: {
                userId: userInfo.id,
                articleContent: content,
                articleSubTitle: this.delHtmlTag(content).substring(
                    0,
                    100,
                ),
                articleTitle,
                ...values
            },
            history: this.props.history
        })
    }
    showModal = async () => {
        let userInfo = JSON.parse(localStorage.getItem(CONSTANT_USER_INFO));
        if (_.isEmpty(userInfo)) {
            message.error('您已退出登录，请保存数据后重新登录发布')
            return;
        }
        let { query } = this.props.client;
        this.props.dispatch({
            type: 'writeArticle/loadClassifyForUser',
            payload: {
                userId: userInfo.id
            },
        })
        this.setState({
            modelVisible: true,
        });
    };

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
                            id="editor-with-code-highlighter"
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
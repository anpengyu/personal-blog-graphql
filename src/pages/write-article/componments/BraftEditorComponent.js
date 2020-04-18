import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/code-highlighter.css'

import React from 'react';
import { ADD_ARTICLE } from '../graphql';
import { Input, message } from 'antd';
import { connect } from 'dva';
import BraftEditor from 'braft-editor';
import _ from 'lodash';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'
import { withApollo } from 'react-apollo';
import { Link, withRouter } from "react-router-dom";
import { CONSTANT_USER_INFO } from '../../../utils/Constant';
import { ALL_ARTICLES } from '../../home/graphql'

BraftEditor.use(
  CodeHighlighter({
    includeEditors: ['editor-with-code-highlighter'],
  }),
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
    };
  }

  delHtmlTag(str) {
    return str.replace(/<[^>]+>/g, ''); //正则去掉所有的html标记
  }

  submit = () => {
    const { editorState, articleTitle } = this.state;
    let userInfo = JSON.parse(localStorage.getItem(CONSTANT_USER_INFO));
    if (_.isEmpty(articleTitle) || editorState.toHTML() === '<p></p>') {
      message.error('文章标题或者内容不能为空~');
      return;
    }
    this.props.dispatch({
      type: 'writeArticle/mutateArticle',
      payload: {
        userId: userInfo.id,
        articleContent: editorState.toHTML(),
        articleSubTitle: this.delHtmlTag(editorState.toHTML()).substring(
          0,
          100,
        ),
        articleTitle,
      },
      history:this.props.history
    })
  }

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
        onClick: this.submit,
      },
      {
        key: 'save-button',
        type: 'button',
        text: '保存到草稿',
        onClick: this.submit,
      },
      {
        key: 'submit-button',
        type: 'button',
        text: '提交',
        onClick: this.submit,
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
      </div>
    );
  }
}

export default withApollo(withRouter(connect()(BraftEditorComponent)))

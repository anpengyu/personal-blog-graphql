import React from 'react';
import { message } from 'antd';
import BraftEditor from 'braft-editor';
import _ from 'lodash';
import BraftEditorComponent from './componments/BraftEditorComponent';
import { buildPreviewHtml } from './buildHtml';
import { withRouter } from "react-router-dom";
/**
 * 添加新文章
 * @date 2020-03-24
 */
class AddArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: BraftEditor.createEditorState(),
      articleTitle: '', //文章标题
      articleContent: '', //文章内容
    };
  }

  handleChange = (editorState) => {
    this.setState({ editorState });
  };

  delHtmlTag(str) {
    return str.replace(/<[^>]+>/g, ''); //正则去掉所有的html标记
  }

  submit = (createArticle) => {
    const { articleTitle, editorState } = this.state;
    if (_.isEmpty(articleTitle) || editorState.toHTML() === '<p></p>') {
      message.error('文章标题或者内容不能为空~');
      return;
    }
    createArticle().then(() => {
      this.props.history.push('/')
    });
  };

  changeTitle = (e) => {
    this.setState({
      articleTitle: e.target.value,
    });
  };

  render() {
    const { articleTitle, editorState } = this.state;

    return (
      <div style={{ display: 'flex' }}>
        <BraftEditorComponent
          articleTitle={articleTitle}
          editorState={editorState}
          changeTitle={this.changeTitle}
          handleChange={this.handleChange} />

        {/* <MutaionComponent
          articleTitle={articleTitle}
          editorState={editorState}
        /> */}
        <div
          style={{ height: '100vh', marginLeft: 100 }}
          dangerouslySetInnerHTML={{
            __html: buildPreviewHtml(this.state.editorState.toHTML()),
          }}
        ></div>
      </div>
    );
  }
}

export default withRouter(AddArticle);
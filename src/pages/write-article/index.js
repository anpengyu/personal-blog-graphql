import React from 'react';
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
      editorState: '',
    };
  }

  handleChange = (editorState) => {
    this.setState({ editorState });
  };

  render() {
    const { editorState } = this.state;

    return (
      <div style={{ display: 'flex' }}>
        <BraftEditorComponent
          handleChange={this.handleChange} />

        <div
          style={{ height: '100vh', marginLeft: 100 }}
          dangerouslySetInnerHTML={{
            __html: buildPreviewHtml(!_.isEmpty(editorState)?editorState.toHTML():""),
          }}
        ></div>
      </div>
    );
  }
}

export default withRouter(AddArticle);
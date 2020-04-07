import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/code-highlighter.css'

import React, { Fragment } from 'react';

import { Input, message, Button } from 'antd';
import BraftEditor from 'braft-editor';
import _ from 'lodash';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'

BraftEditor.use(
  CodeHighlighter({
    includeEditors: ['editor-with-code-highlighter'],
  }),
);

/**
 * 文章编辑器
 * @date 2020-03-31
 */
export default (props) => {
  const { changeTitle, handleChange } = props;
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
            onChange={changeTitle}
            placeholder="文章标题"
          ></Input>
        </div>
        <div className="editor-wrapper">
          <BraftEditor
            id="editor-with-code-highlighter"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

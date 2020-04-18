import React, { Fragment } from 'react';
import { message, Button } from 'antd';
import _ from 'lodash';
import { Mutation } from 'react-apollo';
import {ADD_ARTICLE} from '../graphql';
import {ALL_ARTICLES} from '../../home/graphql'
import { withRouter } from 'react-router';

/**
 * 添加新文章
 * @date 2020-03-24
 */
class MutationComponent extends React.Component {
  delHtmlTag(str) {
    return str.replace(/<[^>]+>/g, ''); //正则去掉所有的html标记
  }

  submit = (createArticle) => {
    const { articleTitle, editorState } = this.props;
    if (_.isEmpty(articleTitle) || editorState.toHTML() === '<p></p>') {
      message.error('文章标题或者内容不能为空~');
      return;
    }
    createArticle({
      variables: {
        userId: 1,
        articleContent: editorState.toHTML(),
        articleSubTitle: this.delHtmlTag(editorState.toHTML()).substring(
          0,
          100,
        ),
        articleTitle,
      },
      refetchQueries: [{ query: ALL_ARTICLES }]
    }).then(() => {
      this.props.history.push('/')
      // history.go()
    });
  };

  render() {
    return (
      <Mutation
        mutation={ADD_ARTICLE}
        onError={{}}>
        {(createArticle, { data, loading, error }) => {
          if (error) {
            return <div>error</div>;
          }
          return (
            <div>
              {error && <div>error</div>}
              <Fragment>
                <div>
                  <Button
                    type="submit"
                    onClick={this.submit.bind(this, createArticle)}>
                    提交
                  </Button>
                </div>
              </Fragment>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
export default withRouter(MutationComponent);

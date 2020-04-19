import React from 'react';
import '../index.less';
import _ from 'lodash';
import { Button, message } from 'antd';
import {connect} from 'dva';

class ContentComponent extends React.Component {

  //点击发帖用户
  clickUserName = () => {
    // history.push('/userInfo');
  };

  publishComment = () => {
    const { comment, itemId, acticleUser, userInfo } = this.props;
    const { creator, replyTo, content, created_at } = comment;
    let id = -1;
    if (!_.isEmpty(userInfo)) {
      id = userInfo.id;
    } else {
      message.info('请先登录')
      return;
    }

    this.props.dispatch({
      type: 'article/mutateComment',
      payload: {
        userId: id,
        content: '22222222222222',
        articleId: comment.articleId,
        replyToCommentId: creator.id, //0：直接评论文章,直接评论一级评论
        rootCommentId:itemId, //0：文章下的评论
      },
      refetchVariables: {
        id: comment.articleId
      }
    })
  }

  render() {
    const { comment, itemId, acticleUser, userInfo } = this.props;
    const { creator, replyTo, content, created_at } = comment;
    const { username } = replyTo;
    return (
      <div>
        <div>
          {creator.username}
          {_.eq(acticleUser.id, creator.id) ? '(作者本尊)' : ''}
          {replyTo.id == -1 ? ':' : '回复: ' + username} {_.eq(acticleUser.id, replyTo.id) ? '(作者本尊)' : ''}
        </div>
        <div>内容：{content}</div>
        <div
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#eee',
            marginTop: 20,
            marginBottom: 20,
          }}
        ></div>

        <Button onClick={this.publishComment}>发表评论</Button>
      </div>
    );
  }
}

export default connect()(ContentComponent);

import React from 'react';
import '../index.less';
import MutationComponent from './MutationComponent';
import _ from 'lodash';

class ContentComponent extends React.Component {

  //点击发帖用户
  clickUserName = () => {
    // history.push('/userInfo');
  };
  render() {
    const { comment, itemId, acticleUser ,userInfo} = this.props;
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

        <MutationComponent
          articleId={comment.articleId}
          index11={itemId}
          content={'22222222222222'}
          replyToCommentId={creator.id}
          userInfo={userInfo}
        />
      </div>
    );
  }
}

export default ContentComponent;

import React from 'react';
import '../index.less';
import MutationComponent from './MutationComponent';
import _ from 'lodash';
let moment = require('moment');

class ContentComponent extends React.Component {

  //发帖距现在多长时间
  times(date) {
    return moment(new Date(date), 'YYYY-MM-DD HH:mm:ss').fromNow();
  }

  //点击发帖用户
  clickUserName = () => {
    // history.push('/userInfo');
  };
  render() {
    const { comment, itemId } = this.props;
    const { creator, replyTo, content, created_at } = comment;
    const { username } = replyTo;
    return (
      <div>
        <div>
          {creator.username}
          {_.eq(replyTo.id,-1)? '' : '回复: ' + username}
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
          replyToCommentId='3'
        />
      </div>
    );
  }
}

export default ContentComponent;

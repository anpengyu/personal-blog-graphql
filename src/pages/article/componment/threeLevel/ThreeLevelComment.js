import React from 'react';
import '../../index.scss';
import _ from 'lodash';
import { Button, message } from 'antd';
import { connect } from 'dva';
import { loadUserId } from '../../../../utils/Constant';
import ThreeLevelBottomComponment from './ThreeLevelBottomComponment';
import ReplyComponment from '../PublishComponment';
import { withApollo } from 'react-apollo';
import { Link, withRouter } from "react-router-dom";
import { ADD_COMMENT, ARTICLE_DETIAL } from '../../graphql';

class SecondLevelComment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      secondaryCommentVisible: [],
      secondaryComment: '',
    }
  }

  publishComment = async () => {
    const { comment, itemId, acticleUser } = this.props;
    const { secondaryComment } = this.state;
    const { creator, replyTo, content, createDate } = comment;
    let userId = loadUserId();
    if (_.isEmpty(userId)) {
      return;
    }

    if (_.isEmpty(secondaryComment)) {
      message.info('评论不能为空')
      return;
    }

    try {
      let data = await this.props.client.mutate({
        mutation: ADD_COMMENT,
        variables: {
          userId,
          content: secondaryComment,
          articleId: comment.articleId,
          replyToCommentId: creator.id, //0：直接评论文章,直接评论一级评论
          rootCommentId: itemId, //0：文章下的评论
        },
        refetchQueries: [{ query: ARTICLE_DETIAL, variables: { id: comment.articleId } }]
      })
      this.setState({
        secondaryCommentVisible: []
      })
    } catch (e) {

    }
  }

  publishButton = (id) => {
    let { secondaryCommentVisible } = this.state;
    let indexOf = _.indexOf(secondaryCommentVisible, id)
    if (indexOf == -1) {
      secondaryCommentVisible.push(id)
    } else {
      secondaryCommentVisible = _.filter(secondaryCommentVisible, function (item) {
        return item != id;
      })
    }
    this.setState({
      secondaryCommentVisible
    })
  }
  delHtmlTag(str) {
    if (!_.isEmpty(str) && _.isString(str)) {
      return str.replace(/<[^>]+>/g, ''); //正则去掉所有的html标记
    }
  }

  //二级评论
  changeSecondaryComment = (secondaryComment) => {
    const editor = this.delHtmlTag(this.state.secondaryComment);
    if (_.isString(editor)) {
      if (editor.length >= 150) {
        message.info('评论最多只能150字')
        // return;
      }
    }
    this.setState({
      secondaryComment: this.delHtmlTag(secondaryComment.toHTML()),
    })
  }

  render() {
    const { comment, itemId, acticleUser } = this.props;
    const { creator, replyTo, content, createDate } = comment;
    const { username } = replyTo;
    const { secondaryCommentVisible, secondaryComment } = this.state;
    return (
      <div>
        <div style={{ display: 'flex', paddingTop: '10px', paddingRight: '10px', justifyContent: 'space-between' }}>

          <div style={{ display: 'flex' }}>
            <Link to={`/userInfo/${creator.id}`}>
              <div style={{ display: 'flex', cursor: 'pointer' }}>
                <img style={{ height: 25, width: 25, borderRadius: 50, }}
                  src={require('../../../../assets/head.jpg')} />
                <div style={{marginLeft:'10px'}}>{creator.username}</div>
                {_.eq(acticleUser.id, creator.id) ? '(作者本尊)' : ''}
              </div>
            </Link>

            <div style={{ display: 'flex' }}>
              <div style={{marginLeft:'10px'}}>{replyTo.id == -1 ? '' : '回复'}</div>
              <Link to={`/userInfo/${creator.id}`}>
                <div style={{ display: 'flex', cursor: 'pointer',marginLeft:'10px' }}>

                   {username}{_.eq(acticleUser.id, replyTo.id) ? '(作者本尊)' : ''} 
                </div>
              </Link>
            </div>
          </div>

          <div>
            {createDate}
          </div>

        </div>
        <div style={{ marginTop: '10px', marginBottom: '10px' }}>{content}</div>

        <ThreeLevelBottomComponment
          item={comment}
          commentId={comment.id}
          creator={creator}
          articleId={this.props.article.id}
          secondaryCommentVisible={secondaryCommentVisible}
          publishButton={this.publishButton.bind(this)} />

        <ReplyComponment
          secondaryCommentVisible={secondaryCommentVisible}
          secondaryComment={secondaryComment}
          changeSecondaryComment={this.changeSecondaryComment.bind(this)} itemId={comment.id}
          publishComment={this.publishComment.bind(this)} />
        <div
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#eee',
            marginTop: 10,
            marginBottom: 10,
          }}></div>
      </div>
    );
  }
}

export default withApollo(connect()(SecondLevelComment));

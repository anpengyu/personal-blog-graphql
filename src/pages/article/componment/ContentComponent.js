import React from 'react';
import '../index.less';
import { buildPreviewHtml } from '../buildhtml.js';
import { withApollo } from 'react-apollo';
import { ADD_WATCH_COUNT, ADD_PRAISE_COUNT, CHANGE_USERINFO, ARTICLE_DETIAL } from '../graphql';
import { ALL_ARTICLES } from '../../home/graphql';
import { CHANGE_USER_INFO_TYPE } from '../../../utils/Constant';
import _ from 'lodash';
import { message } from 'antd';


let moment = require('moment');

class ContentComponent extends React.Component {

  componentDidMount() {
    const { article } = this.props;
    let { mutate } = this.props.client;

    //自动调用添加功能
    mutate({
      mutation: ADD_WATCH_COUNT,
      variables: {
        articleId: article.id,
      },
      // refetchQueries: [{ query: ALL_ARTICLES }]//重新获取数据
    })

    this.changeUserInfo(1, article.id, CHANGE_USER_INFO_TYPE.HISTORY);
  }

  //发帖距现在多长时间
  times(date) {
    return moment(new Date(date), 'YYYY-MM-DD HH:mm:ss').fromNow();
  }

  //点击发帖用户
  clickUserName = () => {
    // history.push('/userInfo');
  };

  //点赞/关注/收藏
  praiseClick = (flag, userInfo) => {
    const { article } = this.props;
    const { user } = article;
    if (!_.isEmpty(userInfo)) {
      userInfo = JSON.parse(userInfo)
      if (_.eq(userInfo.id, user.id)) {
        _.eq(CHANGE_USER_INFO_TYPE.LIKES,flag) ? message.info('自己的文章不能点赞~~~') : message.info('自己的文章无需收藏~~~')
        return;
      }
    }


    let { mutate } = this.props.client;

    let data = '';
    switch (flag) {
      case CHANGE_USER_INFO_TYPE.LIKES: data = user.likes;
        break;
      case CHANGE_USER_INFO_TYPE.COLLECTS: data = user.collects;
        break;
    }
    let type = 1;
    if (_.includes(JSON.parse(data), article.id)) {
      type = 2;
    }
    mutate({
      mutation: ADD_PRAISE_COUNT,
      variables: {
        articleId: article.id,
        flag,
        type
      },
      refetchQueries: [{
        query: ARTICLE_DETIAL,
        variables: {
          id: article.id
        }
      }, {
        query: ALL_ARTICLES
      }],
    })

    this.changeUserInfo(1, article.id, flag);
  }

  // 1:点赞列表 2:收藏列表 3:浏览记录 4:关注的作者 5:评论列表 6:文章列表
  changeUserInfo = (userId, id, flag) => {
    let { mutate } = this.props.client;
    mutate({
      mutation: CHANGE_USERINFO,
      variables: {
        userId: userId,
        id: id,
        type: flag
      },
      update: (proxy, mutationResult) => {
        // console.log('proxy', proxy)
        // console.log('mutationResult', mutationResult)
      }
    })
  }

  render() {
    const { article, userInfo } = this.props;
    const { user, comment } = article;
    let likes = JSON.parse(user.likes);//赞
    let collects = JSON.parse(user.collects);//收藏
    let commentCount = 0;//评论条数
    comment.map((item, index) => {
      commentCount += item.comment.length + 1
    })
    return (
      <div className='content'>
        <div>
          <div className='article_title'>{article.articleTitle}</div>
        </div>

        <div
          style={{ display: 'flex', height: '50px', lineHeight: '50px', justifyContent: 'space-between', }}>
          <div style={{ display: 'flex' }}>
            <div
              style={{ display: 'flex', cursor: 'pointer' }}
              onClick={this.clickUserName.bind(this, user.id)}>
              <img
                style={{ height: 40, width: 40, marginTop: 5, borderRadius: 50, }}
                src={require('../../../assets/head.jpg')}
              />
              <div className='user_name'>{user.username}</div>
            </div>
            <div className='article_bottom'>
              发布时间：{this.times(article.created_at)}
            </div>
          </div>
          {/* <div className={styles.article_bottom}>有疑问：{item.articledislikeCount}</div> */}
          <div style={{ display: 'flex', marginRight: 10 }}>
            <div className='article_bottom'>
              {article.articlePageView}阅读数
            </div>
            <div className='article_bottom'>
              {commentCount}评论
            </div>
            <div className='article_bottom' onClick={this.praiseClick.bind(this, CHANGE_USER_INFO_TYPE.LIKES, userInfo)}>
              {article.articlePraiseCount}
              {_.includes(likes, article.id) ? '已赞' : '赞'}
            </div>
            <div className='article_bottom' onClick={this.praiseClick.bind(this, CHANGE_USER_INFO_TYPE.COLLECTS, userInfo)}>
              {article.articleDislikeCount}
              {_.includes(collects, article.id) ? '已收藏' : '收藏'}
            </div>
          </div>
        </div>
        <div
          style={{ marginTop: 20 }}
          dangerouslySetInnerHTML={{
            __html: buildPreviewHtml(article.articleContent),
          }}
        ></div>
      </div>
    );
  }
}

export default withApollo(ContentComponent);

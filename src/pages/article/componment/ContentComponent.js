import React from 'react';
import '../index.less';
import { buildPreviewHtml } from '../buildhtml.js';
import { withApollo } from 'react-apollo';
import { ADD_WATCH_COUNT, ADD_PRAISE_COUNT, CHANGE_USERINFO, ARTICLE_DETIAL } from '../graphql';
import { ALL_ARTICLES } from '../../home/graphql';
import { CHANGE_USER_INFO_TYPE } from '../../../utils/Constant';
import _ from 'lodash';

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

  //点赞
  praiseClick = () => {
    const { article } = this.props;
    let { mutate } = this.props.client;
    const { user } = article;
    let likes = JSON.parse(user.likes);
    let type = 1;
    if (_.includes(likes, article.id)) {
      type = 2;
    }
    mutate({
      mutation: ADD_PRAISE_COUNT,
      variables: {
        articleId: article.id,
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

    this.changeUserInfo(1, article.id, CHANGE_USER_INFO_TYPE.LIKES);
  }

  // 1:点赞列表 2:收藏列表 3:浏览记录 4:关注的作者 5:评论列表 6:文章列表
  changeUserInfo = (userId, id, type) => {
    let { mutate } = this.props.client;
    mutate({
      mutation: CHANGE_USERINFO,
      variables: {
        userId: userId,
        id: id,
        type: type
      },
      update: (proxy, mutationResult) => {
        // console.log('proxy', proxy)
        // console.log('mutationResult', mutationResult)
      }
    })
  }

  render() {
    const { article } = this.props;
    const { user } = article;
    let likes = JSON.parse(user.likes);
    console.log('user', JSON.parse(user.likes))
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
              {article.articleCommentCount}评论
            </div>
            <div className='article_bottom' onClick={this.praiseClick.bind(this)}>
              {article.articlePraiseCount}
              {_.includes(likes, article.id) ? '已赞' : '赞'}
            </div>
            <div className='article_bottom'>
              {article.articleDislikeCount}收藏
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

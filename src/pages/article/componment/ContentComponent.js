import React from 'react';
import '../index.less';
import { buildPreviewHtml } from '../buildhtml.js';
import { withApollo } from 'react-apollo';
import { ADD_WATCH_COUNT } from '../graphql';
import { ALL_ARTICLES } from '../../home/graphql';

let moment = require('moment');

class ContentComponent extends React.Component {

  componentDidMount() {
    const { article } = this.props;
    console.log('dddddddddd')
    let { mutate } = this.props.client;
    //自动调用添加功能
    mutate({
      mutation: ADD_WATCH_COUNT,
      variables: {
        articleId: article.id,
      },
      refetchQueries: [{ query: ALL_ARTICLES }]//重新获取数据
    })

  }

  //发帖距现在多长时间
  times(date) {
    return moment(new Date(date), 'YYYY-MM-DD HH:mm:ss').fromNow();
  }

  //点击发帖用户
  clickUserName = () => {
    // history.push('/userInfo');
  };
  render() {
    const { article } = this.props;
    console.log('article', article);
    const { user } = article;
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
            <div className='article_bottom' >
              {article.articlePraiseCount}赞
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

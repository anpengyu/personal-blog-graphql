import React from 'react';
import '../index.less';
import { buildPreviewHtml } from '../buildhtml.js';
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
    const { article } = this.props;
    console.log('article', article);
    const { user } = article;
    return (
      <div className='content'>
        <div>
          <div className='article_title'>{article.articleTitle}</div>
        </div>

        <div
          style={{
            display: 'flex',
            height: '50px',
            lineHeight: '50px',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex' }}>
            <div
              style={{ display: 'flex', cursor: 'pointer' }}
              onClick={this.clickUserName.bind(this, user.id)}
            >
              <img
                style={{
                  height: 40,
                  width: 40,
                  marginTop: 5,
                  borderRadius: 50,
                }}
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
              阅读数：{article.articlePageView}
            </div>
            {/* <div className={styles.article_bottom}>
                    评论：{article.articleCommentCount}
                  </div>
                  <div className={styles.article_bottom}>
                    获赞：{article.articlePraiseCount}
                  </div> */}
            <div className='article_bottom'>收藏</div>
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

export default ContentComponent;

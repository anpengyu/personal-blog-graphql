
import React from 'react';
import moment from 'moment';
import '../index.scss';
import { Link } from "react-router-dom";
/**
 * 首页-文章列表-条目
 *
 * @author apy
 * @date 2020-03-20
 * @class ArticlesItemComponent
 */
export default class ArticleItemComponent extends React.Component {

  onClickTitle = () => {
    // const { item } = this.props;
    // history.push(`/article/${item.id}`);
  };

  //发帖距现在多长时间
  times(date) {
    return moment(new Date(date), 'YYYY-MM-DD HH:mm:ss').fromNow();
  }

  //点击发帖用户
  clickUserName = () => {
    // history.push('/userInfo');
  };

  render() {
    const { item } = this.props;
    const { user } = item;
    return (
      <div style={{ backgroundColor: '#fff', marginTop: 1, padding: 20 }}>
        <div>
          {/* <div className={styles.article_title} onClick={this.onClickTitle}>
            {item.articleTitle}
          </div> */}
          <Link to={`/article/${item.id}`}>{item.articleTitle}</Link>
        </div>
        <div
          style={{
            maxLines: 2,
            color: '#999',
            textOverflow: 'ellipsis',
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          {item.articleSubTitle}
        </div>

        <div
          style={{
            display: 'flex',
            height: '50px',
            lineHeight: '50px',
            justifyContent: 'space-between',
          }}>
          <div style={{ display: 'flex' }}>
            <div
              style={{ display: 'flex', cursor: 'pointer' }}
              onClick={this.clickUserName.bind(this, user.id)}>
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
              发布时间：{this.times(item.created_at)}
            </div>
          </div>
          {/* <div className={styles.article_bottom}>有疑问：{item.articledislikeCount}</div> */}
          <div style={{ display: 'flex', marginRight: 10 }}>
            <div className='article_bottom'>
              访问：{item.articlePageView}
            </div>
            <div className='article_bottom'>
              评论：{item.articleCommentCount}
            </div>
            <div className='article_bottom'>
              获赞：{item.articlePraiseCount}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

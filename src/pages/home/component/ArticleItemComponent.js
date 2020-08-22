import React from 'react';
import '../index.scss';
import { Link } from "react-router-dom";
import { times } from '../../../utils/Constant';
import '../index.scss';
/**
 * 首页-文章列表-条目
 *
 * @author apy
 * @date 2020-03-20
 * @class ArticlesItemComponent
 */
export default class ArticleItemComponent extends React.Component {

  render() {
    const { item } = this.props;
    const { user } = item;
    let id = user.id;
    return (
      <div className='article_item_root'>
        <div className='article_item_title'>
          <Link style={{color:'#000'}} to={`/article/${item.id}`}>{item.articleTitle}</Link>
        </div>
        <div className='article_title_subtitle'>
          {item.articleSubTitle}
        </div>

        <div className='article_item_bottom'>

          <div style={{ display: 'flex' }}>
            <div>
              <Link  style={{color:'#787878'}}  to={`/userInfo/${id}`}>
                <div className='img_title'>
                  <img
                    alt='个人头像'
                    style={{
                      height: 40,
                      width: 40,
                      marginTop: 5,
                      borderRadius: 50,
                    }}
                    src={require('../../../assets/head.jpg')}
                  />
                  <div className='user_name'>{user.username}</div>
                </div></Link>

            </div>
            <div className='article_bottom'>
              发布时间：{item.createDate}
            </div>
          </div>

          <div className='bottom_item'>
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

import React from 'react';
import '../index.scss';
import { buildPreviewHtml } from '../buildhtml.js';
import { withApollo } from 'react-apollo';
import { ADD_WATCH_COUNT, CHANGE_USERINFO } from '../graphql';
import { CHANGE_USER_INFO_TYPE } from '../../../utils/Constant';
import _ from 'lodash';
import { BackTop } from 'antd';
import UserComponent from './UserComponent';

class ContentComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      anchors: []
    }
  }

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

    let anchors = [];
    var _docc = window.document.all;
    // 遍历每一个对象
    for (var i = 0; i < _docc.length; i++) {
      var _dc = _docc[i];
      var id = _dc.getAttribute("id");
      console.log('_dc',_dc)
      if (!_.isEmpty(id) && !_.eq(id, 'root') && !_.eq(id, 'comment')) {
        console.log('text', _dc.innerHTML)
        console.log("id=" + id);
        anchors.push({ id, name: _dc.innerHTML });
      }
    }
    this.setState({
      anchors
    })
  }
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
    const { article, userInfo ,classify} = this.props;
    const { user, comment } = article;
    const { anchors } = this.state;
    let likes = JSON.parse(user.likes);//赞
    let collects = JSON.parse(user.collects);//收藏
    let commentCount = 0;//评论条数
    comment.map((item, index) => {
      commentCount += item.comment.length + 1
    })

    console.log('classify',classify)
    return (
      <div className='content'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* 用户模块 */}
          <UserComponent anchors={anchors} article={article} userInfo={userInfo} classify={classify}/>

          <div style={{ backgroundColor: '#fff',padding:'20px' }}>
            <div>
              <div className='article_detail_title'>{article.articleTitle}</div>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: buildPreviewHtml(article.articleContent),
              }}
            ></div>
          </div>

{console.log('>>>>>>>>>>>>>>>>>>>>',anchors)}
          {_.isEmpty(anchors) ? null : <div class='anchors'>
            {
              anchors.map((item, index) => {
                return <div>
                  <a href={'#' + item.id}>{item.name}</a>
                </div>
              })
            }
          </div>}
        </div>
      </div>
    );
  }
}

export default withApollo(ContentComponent);

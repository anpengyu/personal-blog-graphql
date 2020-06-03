import React from 'react';
import '../index.scss';
import { buildPreviewHtml } from '../buildhtml.js';
import { withApollo } from 'react-apollo';
import { ADD_WATCH_COUNT, CHANGE_USERINFO } from '../graphql';
import { CHANGE_USER_INFO_TYPE, loadCurrentUserId } from '../../../utils/Constant';
import _ from 'lodash';
import { connect } from 'dva'
import { message, } from 'antd';
import CommentComponent from './CommentComponent'

const style = {
  height: 40,
  width: 90,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};
class ContentComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      anchors: [],
    }
  }

  componentDidMount() {
    let { article } = this.props;
    let { mutate } = this.props.client;

    //阅读数+1
    mutate({
      mutation: ADD_WATCH_COUNT,
      variables: {
        articleId: article.id,
      },
    })

    let anchors = [];
    var _docc = window.document.all;
    // 锚点
    for (var i = 0; i < _docc.length; i++) {
      var _dc = _docc[i];
      var id = _dc.getAttribute("id");
      if (!_.isEmpty(id) && !_.eq(id, 'root') && !_.eq(id, 'comment')) {// && _.startsWith(id, 'blog_an')
        anchors.push({ id, name: _dc.innerHTML });
        let style = _dc.getAttribute('style');
        if(_.isEmpty(style)){
          style = 'padding-top:50px';
        }else{
          style += ' padding-top:50px'
        }
        _dc.setAttribute('style',style)
      }
    }

    this.setState({
      anchors
    })

    let userId = loadCurrentUserId(false);
    if (_.isEmpty(userId)) {
      return;
    }
    this.changeUserInfo(userId, article.id, CHANGE_USER_INFO_TYPE.HISTORY);
  }

  changeUserInfo = (userId, id, flag) => {
    let { mutate } = this.props.client;
    mutate({
      mutation: CHANGE_USERINFO,
      variables: {
        userId: userId,
        id: id,
        type: flag
      }
    })
  }


  render() {
    const { article } = this.props;
    const { anchors } = this.state;
    return (
      <div className='content'>
        <div>
        <div style={{ backgroundColor: '#fff', padding: '20px', width: '600px' }}>
          <div>
            <div className='article_detail_title'>{article.articleTitle}</div>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: buildPreviewHtml(article.articleContent),
            }}
          ></div>
        </div>
            {/* 评论 */}
            <CommentComponent article={article} />
        </div>
        

        {/* 锚点 */}
        {_.isEmpty(anchors) ? null : <div className='anchors'>
          {
            anchors.map((item, index) => {
              return <div key={index}>
                <a href={'#' + item.id}>{item.name}</a>
              </div>
            })
          }
        </div>
        }
      </div>
    );
  }
}

export default withApollo(connect()(ContentComponent));

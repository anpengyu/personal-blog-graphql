import React, { useState, useEffect } from 'react';
import { Anchor } from 'antd';
import '../index.scss';
import { buildPreviewHtml } from '../buildhtml.js';
import { withApollo } from 'react-apollo';
import { ADD_WATCH_COUNT, CHANGE_USERINFO } from '../graphql';
import { CHANGE_USER_INFO_TYPE, loadCurrentUserId } from '../../../utils/Constant';
import _ from 'lodash';
import { connect } from 'dva'
import CommentComponent from './CommentComponent'
const { Link } = Anchor;

const ContentComponent = (props) => {
  const [
    targetOffset, setTargetOffset
  ] = useState(undefined)
  useEffect(() => {
    setTargetOffset(window.innerHeight);
  }, []);
  let anchors = []
  console.log('this', props)
  let { article } = props;
  let { mutate } = props.client;
  mutate({
    mutation: ADD_WATCH_COUNT,
    variables: {
      articleId: article.id,
    },
  })
  // let anchors = [];
  var _docc = window.document.all;
  // 锚点
  for (var i = 0; i < _docc.length; i++) {
    var _dc = _docc[i];
    var id = _dc.getAttribute("id");
    if (!_.isEmpty(id) && !_.eq(id, 'root') && !_.eq(id, 'comment') && _.startsWith(id, 'blog_an')) {
      anchors.push({ id, name: _dc.innerHTML });
      let style = _dc.getAttribute('style');
      if (_.isEmpty(style)) {
        style = 'padding-top:50px';
      } else {
        style += ' padding-top:50px'
      }
      _dc.setAttribute('style', style)
    }
  }

  console.log('anchors', anchors)
  let userId = loadCurrentUserId(false);
  if (_.isEmpty(userId)) {
    return;
  }

  mutate({
    mutation: CHANGE_USERINFO,
    variables: {
      userId: userId,
      id: article.id,
      type: CHANGE_USER_INFO_TYPE.HISTORY
    }
  })



  // const [targetOffset, setTargetOffset] = useState(undefined);

  console.log('anchors', anchors)
  return (
    <div className='content'>
      <div>
        <div style={{ backgroundColor: '#fff', padding: '20px', width: '1000px' }}>
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
        <Anchor targetOffset={targetOffset}>
          {
            anchors.map((item, index) => {
              return <Link href={'#' + item.id} title={item.name} />
            })
          }
        </Anchor>

      </div>
      }

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
};
export default withApollo(connect()(ContentComponent));
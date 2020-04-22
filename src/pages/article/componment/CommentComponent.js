import React from 'react';
import '../index.scss';

import ToCommentComponent from './ToCommentComponent';
import _ from 'lodash';
import { Button, message,BackTop } from 'antd';
import {connect} from 'dva'
let moment = require('moment');

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
class CommentComponent extends React.Component {

    //发帖距现在多长时间
    times(date) {
        moment.locale('zh-cn');
        return moment(new Date(date), 'YYYY-MM-DD HH:mm:ss').locale('zh-cn').fromNow();
    }

    //点击发帖用户
    clickUserName = () => {
        // history.push('/userInfo');
    };

    publishComment = (rootCommentId) => {
        let { article,userInfo } = this.props;
        let id = -1;
        if (userInfo && !_.isEmpty(userInfo)) {
            userInfo = JSON.parse(userInfo)
            id = userInfo.id;
           
        } else {
            message.info('请先登录')
            return;
        }

        this.props.dispatch({
            type: 'article/mutateComment',
            payload: {
                userId: id,
                content: '111111111',
                articleId: article.id,
                replyToCommentId: '0', //0：直接评论文章,直接评论一级评论
                rootCommentId:rootCommentId, //0：文章下的评论
            },
            refetchVariables: {
                id: article.id
            }
        })
    }

    render() {
        let { article, userInfo } = this.props;
        const { comment, user } = article;
        if (!_.isEmpty(userInfo)) {
            userInfo = JSON.parse(userInfo)
        }

        return (
            <div className='content'>
                {comment.map((item, index, ) => {
                    const { creator, comment } = item;
                    return (
                        <div key={index}>
                            <div>
                                {creator.username}
                                {_.eq(creator.id, user.id) ? '(作者本尊)' : ''}
                            </div>
                            <div>{this.times(item.created_at)}</div>
                            <div>内容：{item.content}</div>

                            <Button onClick={this.publishComment.bind(this,item.id)}>发表评论11</Button>

                            <div style={{ marginTop: 20, backgroundColor: '#f6f6f6' }}>
                                {comment.map((item1, index) => {
                                    return (
                                        <div style={{ marginLeft: 30 }} key={index}>
                                            <ToCommentComponent comment={item1} itemId={item.id} acticleUser={user} userInfo={userInfo} />
                                        </div>
                                    );
                                })}
                            </div>
                            <div
                                style={{ width: '100%', height: 2, backgroundColor: '#000' }}
                            ></div>
                        </div>
                    );
                },
                )}
                 <BackTop>
                        <div style={style}>回到顶部</div>
                    </BackTop>
            </div>
        );
    }
}

export default connect()(CommentComponent);
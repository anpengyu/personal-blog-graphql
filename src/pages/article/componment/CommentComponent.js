import React from 'react';
import '../index.scss';

import ToCommentComponent from './ToCommentComponent';
import _ from 'lodash';
import { Button, message, BackTop, Input } from 'antd';
import { connect } from 'dva'
import { loadUserInfo, loadUserId } from '../../../utils/Constant';
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
    constructor(props) {
        super(props);
        this.state = {
            commentChange: '',
        }
    }
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
        let userId = loadUserId();
        let { article } = this.props;
        if (_.isEmpty(userId)) {
            return;
        }

        this.props.dispatch({
            type: 'article/mutateComment',
            payload: {
                userId: userId,
                content: '111111111',
                articleId: article.id,
                replyToCommentId: '0', //0：直接评论文章,直接评论一级评论
                rootCommentId: rootCommentId, //0：文章下的评论
            },
            refetchVariables: {
                id: article.id
            }
        })
    }
    changeComment = (e) => {
        this.setState({
            commentChange: e.target.value
        })
    }

    // 一级评论——直接评论文章
    publishCommentToArticle = (articleId) => {
        let userId = loadUserId();
        let { commentChange } = this.state;
        if (_.isEmpty(userId)) {
            return;
        }

        this.props.dispatch({
            type: 'article/mutateComment',
            payload: {
                userId: userId,
                content: commentChange,
                articleId: articleId,
                replyToCommentId: '0', //0：直接评论文章,直接评论一级评论
                rootCommentId: '0', //0：文章下的评论
            },
            refetchVariables: {
                id: articleId
            }
        })
    }
    render() {
        let { article } = this.props;
        const { comment, user } = article;

        return (
            <div className='comment'>
                <div style={{ display: 'flex', backgroundColor: '#fff', marginTop: '20px' }}>
                    <img
                        style={{
                            height: 40,
                            width: 40,
                            marginTop: 5,
                            borderRadius: 50,
                        }}
                        src={require('../../../assets/head.jpg')}
                    />
                    <Input style={{marginLeft:'20px'}} onChange={this.changeComment}></Input>
                </div>
                <Button style={{float:'right',marginTop:'10px'}} onClick={this.publishCommentToArticle.bind(this, article.id)}>发表评论</Button>

                <p id='comment' className='comment_anchor'>评论区</p>
                {comment.map((item, index, ) => {
                    const { creator, comment } = item;
                    return <div key={index}>
                        <div>
                            {creator.username}
                            {_.eq(creator.id, user.id) ? '(作者本尊)' : ''}
                        </div>
                        <div>{this.times(item.created_at)}</div>
                        <div>内容：{item.content}</div>

                        <Button onClick={this.publishComment.bind(this, item.id)}>发表评论11</Button>

                        <div style={{ marginTop: 20, backgroundColor: '#f6f6f6' }}>
                            {comment.map((item1, index) => {
                                return (
                                    <div style={{ marginLeft: 30 }} key={index}>
                                        <ToCommentComponent comment={item1} itemId={item.id} acticleUser={user} />
                                    </div>
                                );
                            })}
                        </div>
                        <div
                            style={{ width: '100%', height: 2, backgroundColor: '#000' }}
                        ></div>
                    </div>

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
import React from 'react';
import '../index.scss';

import ToCommentComponent from './ToCommentComponent';
import _ from 'lodash';
import { Button, message, BackTop, Input } from 'antd';
import { connect } from 'dva'
import { loadUserInfo, loadUserId } from '../../../utils/Constant';
import BraftEditor from 'braft-editor';

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
            editorState: BraftEditor.createEditorState(),
            secondaryComment: BraftEditor.createEditorState(),
            secondaryCommentVisible: []
        }
    }
    //发帖距现在多长时间
    times(date) {
        moment.locale('zh-cn');
        return moment(new Date(date), 'YYYY-MM-DD HH:mm:ss').locale('zh-cn').fromNow();
    }

    //二级评论
    publishComment = (rootCommentId) => {
        const { secondaryComment } = this.state;
        let userId = loadUserId();
        let { article } = this.props;
        if (_.isEmpty(userId)) {
            return;
        }
        const editor = this.delHtmlTag(secondaryComment);
        if (_.isString(editor)) {
            if (editor.length >= 150) {
                message.info('评论最多只能150字')
                return;
            }
        }

        this.props.dispatch({
            type: 'article/mutateComment',
            payload: {
                userId: userId,
                content: editor,
                articleId: article.id,
                replyToCommentId: '0', //0：直接评论文章,直接评论一级评论
                rootCommentId: rootCommentId, //0：文章下的评论
            },
            callback: () => {
                this.setState({
                    secondaryCommentVisible: []
                })
            },
            refetchVariables: {
                id: article.id
            }
        })

    }

    //一级评论
    changeComment = (editorState) => {
        const editor = this.delHtmlTag(this.state.editorState);
        if (_.isString(editor)) {
            if (editor.length >= 50) {
                message.info('评论最多只能50字')
            }
        }
        this.setState({
            editorState: editorState.toHTML(),
        })
    }


    //二级评论按钮状态
    publishButton = (id) => {
        let { secondaryCommentVisible } = this.state;
        let indexOf = _.indexOf(secondaryCommentVisible, id)
        if (indexOf == -1) {
            secondaryCommentVisible.push(id)
        } else {
            secondaryCommentVisible = _.filter(secondaryCommentVisible, function (item) {
                return item != id;
            })
        }
        this.setState({
            secondaryCommentVisible
        })
    }

    //二级评论
    changeSecondaryComment = (secondaryComment) => {
        const editor = this.delHtmlTag(this.state.secondaryComment);
        if (_.isString(editor)) {
            if (editor.length >= 50) {
                message.info('评论最多只能50字')
                return;
            }
        }
        this.setState({
            secondaryComment: secondaryComment.toHTML(),
        })
    }

    // 一级评论——直接评论文章
    publishCommentToArticle = (articleId) => {
        let userId = loadUserId();
        if (_.isEmpty(userId)) {
            return;
        }
        const editor = this.delHtmlTag(this.state.editorState);
        if (_.isString(editor)) {
            if (editor.length >= 150) {
                message.info('评论最多只能150字')
                return;
            }
            this.props.dispatch({
                type: 'article/mutateComment',
                payload: {
                    userId: userId,
                    content: editor,
                    articleId: articleId,
                    replyToCommentId: '0', //0：直接评论文章,直接评论一级评论
                    rootCommentId: '0', //0：文章下的评论
                },
                refetchVariables: {
                    id: articleId
                }
            })
        }

    }

    delHtmlTag(str) {
        if (!_.isEmpty(str) && _.isString(str)) {
            return str.replace(/<[^>]+>/g, ''); //正则去掉所有的html标记
        }
    }

    render() {
        let { article } = this.props;
        const { comment, user } = article;
        const { secondaryCommentVisible } = this.state;
        const controls = [
            {
                key: 'bold',
                text: <b>加粗</b>
            },
            'italic', 'underline', 'separator', 'separator'
        ]
        return (
            <div className='comment'>
                <div style={{ backgroundColor: '#fff', marginTop: '10px', marginBottom: '40px' }}>
                    <BraftEditor
                        id="editor-id-1"
                        controls={controls}
                        contentStyle={{ height: 110, boxShadow: 'inset 1px 1px 3px rgba(0,0,0,.1)' }}
                        onChange={this.changeComment} />

                </div>
                <Button style={{ float: 'right', marginTop: '10px' }} onClick={this.publishCommentToArticle.bind(this, article.id)}>发表评论</Button>

                <p id='comment' className='comment_anchor'>评论区</p>
                {comment.map((item, index, ) => {
                    const { creator, comment } = item;
                    return <div key={index}>
                        <div>
                            {creator.username}
                            {_.eq(creator.id, user.id) ? '(作者本尊)' : ''}
                        </div>
                        <div>{item.createDate}</div>
                        <div>内容：{this.delHtmlTag(item.content)}</div>
                        <Button onClick={this.publishButton.bind(this, item.id)}>{_.indexOf(secondaryCommentVisible, item.id) != -1 ? '取消回复' : '回复'}</Button>
                        {_.indexOf(secondaryCommentVisible, item.id) != -1 ? <BraftEditor
                            id="editor-id-2"
                            controls={controls}
                            contentStyle={{ height: 110, marginBottom: '10px', boxShadow: 'inset 1px 1px 3px rgba(0,0,0,.1)' }}
                            onChange={this.changeSecondaryComment} /> : null}

                        {_.indexOf(secondaryCommentVisible, item.id) != -1 ? <Button style={{ marginBottom: '20px' }} onClick={this.publishComment.bind(this, item.id)}>发布</Button> : null}

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
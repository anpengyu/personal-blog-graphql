import React from 'react';
import '../index.scss';

import ThreeLevelComment from './threeLevel/ThreeLevelComment';
import _ from 'lodash';
import { Button, message, BackTop, Input } from 'antd';
import { connect } from 'dva'
import { loadUserInfo, loadUserId } from '../../../utils/Constant';
import BraftEditor from 'braft-editor';
import SecondLevelTitleComponment from './secondLevel/SecondLevelTitleComponment';
import ReplyComponment from './PublishComponment';
import FirstLevelComment from './firstLevel/FirstLevelComment';
import SecondLevelBottomComponment from './secondLevel/SecondLevelBottomComponment';

let moment = require('moment');

class CommentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secondaryComment: '',
            secondaryCommentVisible: [],
            unfold: []//收起评论
        }
    }

    unfoldFun = (unfold) => {
        console.log('.........', unfold)
        this.setState({ unfold })
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
            if (editor.length >= 150) {
                message.info('评论最多只能150字')
                // return;
            }
        }
        this.setState({
            secondaryComment: secondaryComment.toHTML(),
        })
    }

    //二级评论
    publishComment = (rootCommentId) => {
        let userId = loadUserId();
        let { article } = this.props;
        if (_.isEmpty(userId)) {
            return;
        }
        const editor = this.delHtmlTag(this.state.secondaryComment);
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
    }

    delHtmlTag(str) {
        if (!_.isEmpty(str) && _.isString(str)) {
            return str.replace(/<[^>]+>/g, ''); //正则去掉所有的html标记
        }
    }

    render() {
        let { article } = this.props;
        const { comment, user } = article;
        const { secondaryCommentVisible, secondaryComment } = this.state;

        return (
            <div className='comment'>
                <FirstLevelComment article={article} />

                {comment.map((item, index, ) => {
                    const { creator, comment } = item;
                    return <div key={index}>

                        {/* 二级评论头部  姓名、头像、时间 */}
                        <SecondLevelTitleComponment creator={creator} item={item} user={user} />
                        {/* 二级评论评论内容 */}
                        <div className='comment_content'>{this.delHtmlTag(item.content)}</div>
                        {/* 二级评论底部  点赞，评论按钮*/}
                        <SecondLevelBottomComponment
                            item={item}
                            comment={comment}
                            article={article}
                            commentId={item.id}
                            unfold={this.state.unfold}
                            unfoldFun={this.unfoldFun.bind(this)}
                            secondaryCommentVisible={secondaryCommentVisible}
                            publishButton={this.publishButton.bind(this)} />
                        {/*二级评论 输入框，发布按钮*/}
                        <ReplyComponment
                            secondaryComment={secondaryComment}
                            secondaryCommentVisible={secondaryCommentVisible}
                            changeSecondaryComment={this.changeSecondaryComment.bind(this)}
                            itemId={item.id}
                            publishComment={this.publishComment.bind(this)} />

                        {/* 三级评论 */}
                        {
                            _.indexOf(this.state.unfold, item.id) == -1 ? <div style={{ marginTop: 20, backgroundColor: '#f6f6f6' }}>
                                {comment.map((item1, index) => {
                                    return (
                                        <div style={{ marginLeft: 30 }} key={index}>
                                            <ThreeLevelComment article={article} item={item} comment={item1} itemId={item.id} acticleUser={user} />
                                        </div>
                                    );
                                })}
                            </div> : null
                        }

                        <div style={{ width: '100%', height: '1px', backgroundColor: 'rgb(247, 247, 247)', marginBottom: '20px' }}></div>
                    </div>
                })
                }
            </div >
        );
    }
}

export default connect()(CommentComponent);
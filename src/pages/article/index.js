import React from "react";
import { ARTICLE_DETIAL } from './graphql';
import Loading from "../Loading";
import { Query } from "react-apollo";
import './index.scss';
import ContentComponent from './componment/ContentComponent';
import CommentComponent from './componment/CommentComponent';
import { Input, Button, message, BackTop } from "antd";
import { connect } from 'dva'
import Base from "../Base";
import _ from 'lodash';
import { AUTH_TOKEN, CONSTANT_USER_INFO } from '../../utils/Constant';

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
class Articles extends Base {

    constructor(props) {
        super(props);
        this.state = {
            commentChange: '',
            userInfo: localStorage.getItem(CONSTANT_USER_INFO)
        }
    }

    changeComment = (e) => {
        this.setState({
            commentChange: e.target.value
        })
    }
    publishComment = () => {
        let { userInfo, commentChange } = this.state;
        let articleId = this.props.match.params.id;
        let id = -1;
        if (!_.isEmpty(userInfo)) {
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
        let id = this.props.match.params.id;
        const { userInfo } = this.state;

        return (
            <Query
                query={ARTICLE_DETIAL}
                variables={{ id }}
            >
                {({ loading, error, data }) => {
                    if (loading) return <Loading />;
                    if (error) return <Loading />;

                    return (
                        <div className='article_normal'>
                            <ContentComponent article={data.article} userInfo={userInfo} classify={data.article.classify} />

                            <div className='comment'>
                                <p id='comment' className='comment_anchor'>评论区</p>
                                <div style={{ display: 'flex', backgroundColor: '#fff',marginTop:'20px' }}>
                                    <img
                                        style={{
                                            height: 40,
                                            width: 40,
                                            marginTop: 5,
                                            borderRadius: 50,
                                        }}
                                        src={require('../../assets/head.jpg')}
                                    />
                                    <Input onChange={this.changeComment}></Input>
                                    <Button onClick={this.publishComment}>发表评论</Button>
                                </div>

                                <CommentComponent article={data.article} userInfo={userInfo} />
                            </div>


                        </div>
                    );
                }}
            </Query>
        )
    }
}

export default connect(({ article, home }) => ({
    article, home
}))(Articles);
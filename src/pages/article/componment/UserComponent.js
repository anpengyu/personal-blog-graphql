import React from 'react';
import _ from 'lodash';
import { CHANGE_USER_INFO_TYPE, loadUserId, CONSTANT_USER_INFO, loadUserInfo, clickTime } from '../../../utils/Constant';
import { times } from '../../../utils/Constant'
import { message } from 'antd';
import { ADD_PRAISE_COUNT, CHANGE_USERINFO, ARTICLE_DETIAL } from '../graphql';
import { ALL_ARTICLES } from '../../home/graphql';
import { Link, withRouter } from "react-router-dom";
import { withApollo } from 'react-apollo';
import '../index.scss'
import { USER_INFO } from '../../login/graphql';

class UserComponent extends React.Component {

    clickUserName = () => {
        // history.push('/userInfo');
    }

    //点赞/关注/收藏
    praiseClick = (flag, isLikesOrCollect) => {
        if (clickTime()) {
            return;
        }
        const { article } = this.props;
        const { user } = article;
        let userId = loadUserId();
        if (_.isEmpty(userId)) {
            return;
        }

        if (_.eq(userId, user.id)) {
            _.eq(CHANGE_USER_INFO_TYPE.LIKES, flag) ? message.info('自己的文章不能点赞~~~') : message.info('自己的文章无需收藏~~~')
            return;
        }

        let { mutate } = this.props.client;
        let data = [];
        switch (flag) {
            case CHANGE_USER_INFO_TYPE.LIKES: data = user.likes;
                break;
            case CHANGE_USER_INFO_TYPE.COLLECTS: data = user.collects;
                break;
        }
        let type = 1;
        if (_.isEmpty(data)) {
            data = []
        } else {
            if (isLikesOrCollect) {
                type = 2;
            }
        }


        mutate({
            mutation: ADD_PRAISE_COUNT,
            variables: {
                articleId: article.id,
                flag,
                type
            },
            refetchQueries: [{
                query: ARTICLE_DETIAL,
                variables: {
                    id: article.id
                }
            }, {
                query: ALL_ARTICLES
            }],
        })


        this.changeUserInfo(userId, article.id, flag);
    }

    changeUserInfo = async (userId, id, flag) => {
        let { mutate, query } = this.props.client;
        let mutateUserInfoResult = await mutate({
            mutation: CHANGE_USERINFO,
            variables: {
                userId: userId,
                id: id,
                type: flag
            }
        })
        //获取最新点赞列表
        let userInfo = JSON.parse(localStorage.getItem(CONSTANT_USER_INFO))
        userInfo.likes = mutateUserInfoResult.data.changeUserInfo.likes;
        localStorage.setItem(CONSTANT_USER_INFO, JSON.stringify(userInfo))
        //获取最新收藏列表
        userInfo.collects = mutateUserInfoResult.data.changeUserInfo.collects;
        localStorage.setItem(CONSTANT_USER_INFO, JSON.stringify(userInfo))
    }

    render() {
        const { article, classify } = this.props;
        const { user, comment } = article;

        let commentCount = 0;//评论条数
        comment.map((item, index) => {
            commentCount += item.comment.length + 1
        })
        let currentUserInfo = loadUserInfo();
        let isLikes = false;//是否点赞
        let isCollect = false;//是否收藏
        if (!_.isEmpty(currentUserInfo)) {
            isLikes = _.includes(currentUserInfo.likes, article.id);
        }
        if (!_.isEmpty(currentUserInfo)) {
            isCollect = _.includes(currentUserInfo.collects, article.id);
        }

        return (
            <div className='article_left_root'>
                <div className='article_user_root'>
                    <div style={{ height: '50px', lineHeight: '50px', justifyContent: 'space-between', }}>
                        <Link to={`/userInfo/${user.id}`}><div
                            style={{ display: 'flex', cursor: 'pointer' }}
                            onClick={this.clickUserName.bind(this, user.id)}>

                            <img
                                style={{ height: 40, width: 40, marginTop: 5, borderRadius: 50, }}
                                src={require('../../../assets/head.jpg')}
                            />
                            <div className='article_user_name'>{user.username}</div>
                        </div></Link>
                    </div>
                    <div className='article_user_date'>
                        发布时间：{times(article.created_at)}
                    </div>
                    <div >
                        <div style={{ display: 'flex', marginRight: 10 }}>
                            <div className='article_user_bottom'>
                                {article.articlePageView}阅读数
                        </div>
                            <div className='article_user_bottom'>
                                <a href={'#comment'}> {commentCount}评论</a>
                            </div>
                            <div className='article_user_bottom' onClick={this.praiseClick.bind(this, CHANGE_USER_INFO_TYPE.LIKES, isLikes)}>
                                {article.articlePraiseCount}
                                {isLikes ? '已赞' : '赞'}
                            </div>
                            <div className='article_user_bottom' onClick={this.praiseClick.bind(this, CHANGE_USER_INFO_TYPE.COLLECTS, isCollect)}>
                                {article.articleDislikeCount}
                                {isCollect ? '已收藏' : '收藏'}
                            </div>
                        </div>
                    </div>


                </div>
                {
                    _.isEmpty(classify) ? null : <div className='article_classify_root'>
                        <div>
                            <div style={{ paddingLeft: '-10px', fontSize: '14px' }}>{classify.name}</div>
                            <div style={{ marginTop: '20px' }}>
                                {JSON.parse(classify.detail).map((item, index) => {
                                    return <div key={index} style={{ padding: '10px', fontSize: '18px', cursor: 'pointer' }} onClick={() => {
                                        this.props.history.push(`./${item.id}`)
                                        window.location.reload(false);
                                    }}>
                                        <div style={{ color: article.id == item.id ? '#5CACEE' : '#000' }}>{item.name}</div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                }


            </div>

        )
    }
}

export default withApollo(withRouter(UserComponent));
import React from 'react';
import _ from 'lodash';
import { CHANGE_USER_INFO_TYPE } from '../../../utils/Constant';
import { times } from '../../../utils/Constant'
import { message } from 'antd';
import { ADD_PRAISE_COUNT, CHANGE_USERINFO, ARTICLE_DETIAL } from '../graphql';
import { ALL_ARTICLES } from '../../home/graphql';
import { withApollo } from 'react-apollo';
import '../index.scss'

class UserComponent extends React.Component {

    clickUserName = () => {
        // history.push('/userInfo');
    }

    //点赞/关注/收藏
    praiseClick = (flag, userInfo) => {
        const { article } = this.props;
        const { user } = article;
        if (!_.isEmpty(userInfo)) {
            userInfo = JSON.parse(userInfo)
            if (_.eq(userInfo.id, user.id)) {
                _.eq(CHANGE_USER_INFO_TYPE.LIKES, flag) ? message.info('自己的文章不能点赞~~~') : message.info('自己的文章无需收藏~~~')
                return;
            }
        }
        let { mutate } = this.props.client;
        let data = '';
        switch (flag) {
            case CHANGE_USER_INFO_TYPE.LIKES: data = user.likes;
                break;
            case CHANGE_USER_INFO_TYPE.COLLECTS: data = user.collects;
                break;
        }
        let type = 1;
        if (_.includes(JSON.parse(data), article.id)) {
            type = 2;
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

        this.changeUserInfo(1, article.id, flag);
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
        const { article, userInfo, anchors, classify } = this.props;
        const { user, comment } = article;
        let likes = JSON.parse(user.likes);//赞
        let collects = JSON.parse(user.collects);//收藏
        let commentCount = 0;//评论条数
        comment.map((item, index) => {
            commentCount += item.comment.length + 1
        })
        return (
            <div className='article_left_root'>
                <div className='article_user_root'>
                    <div style={{ height: '50px', lineHeight: '50px', justifyContent: 'space-between', }}>
                        <div
                            style={{ display: 'flex', cursor: 'pointer' }}
                            onClick={this.clickUserName.bind(this, user.id)}>
                            <img
                                style={{ height: 40, width: 40, marginTop: 5, borderRadius: 50, }}
                                src={require('../../../assets/head.jpg')}
                            />
                            <div className='article_user_name'>{user.username}</div>
                        </div>
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
                            <div className='article_user_bottom' onClick={this.praiseClick.bind(this, CHANGE_USER_INFO_TYPE.LIKES, userInfo)}>
                                {article.articlePraiseCount}
                                {_.includes(likes, article.id) ? '已赞' : '赞'}
                            </div>
                            <div className='article_user_bottom' onClick={this.praiseClick.bind(this, CHANGE_USER_INFO_TYPE.COLLECTS, userInfo)}>
                                {article.articleDislikeCount}
                                {_.includes(collects, article.id) ? '已收藏' : '收藏'}
                            </div>
                        </div>
                    </div>


                </div>
                {
                    _.isEmpty(classify) ? null : <div className='article_classify_root'>
                        <div>
                            {classify.name}
                            {JSON.parse(classify.detail).map((item, index) => {
                                return <div>
                                    <a href='#4p1l8'>{item.name}</a>
                                </div>
                            })}
                        </div>
                    </div>
                }


            </div>

        )
    }
}

export default withApollo(UserComponent);
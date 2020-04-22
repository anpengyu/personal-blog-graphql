import React from "react";
import { ARTICLE_DETIAL } from './graphql';
import Loading from "../Loading";
import { Query } from "react-apollo";
import './index.scss';
import ContentComponent from './componment/ContentComponent';
import BasePage from "../Base";
import { CONSTANT_USER_INFO } from '../../utils/Constant';
import UserComponent from './componment/UserComponent';
import CommentComponent from './componment/CommentComponent'

class Articles extends BasePage {

    render() {
        let id = this.props.match.params.id;
        const userInfo = localStorage.getItem(CONSTANT_USER_INFO)
        return (
            <Query
                query={ARTICLE_DETIAL}
                variables={{ id }}>
                {({ loading, error, data }) => {
                    if (loading) return <Loading />;
                    if (error) return <Loading />;
                    console.log('data...',data)
                    return (
                        <div className='article_normal'>
                            {/* 用户模块 */}
                            <UserComponent article={data.article} userInfo={userInfo} classify={data.article.classify} />
                            <div>
                                {/* 正文 */}
                                <ContentComponent article={data.article} userInfo={userInfo} classify={data.article.classify} />
                                {/* 评论 */}
                                <CommentComponent article={data.article} userInfo={userInfo} />
                            </div>
                        </div>
                    );
                }}
            </Query>
        )
    }
}

export default Articles;
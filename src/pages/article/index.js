import React from "react";
import { ARTICLE_DETIAL } from './graphql';
import Loading from "../Loading";
import { Query } from "react-apollo";
import './index.scss';
import ContentComponent from './componment/ContentComponent';
import BasePage from "../Base";
import UserComponent from './componment/UserComponent';
import CommentComponent from './componment/CommentComponent'
import { loadUserId } from "../../utils/Constant";
import _ from 'lodash';

class Articles extends BasePage {

    render() {
        let id = this.props.match.params.id;
        let userId = loadUserId();
        console.log('userId',userId);
        return (
            <Query
                query={ARTICLE_DETIAL}
                variables={{ id ,userId}}>
                {({ loading, error, data }) => {
                    if (loading) return <Loading />;
                    if (error) return <Loading />;
                    console.log('detail............',data.article)
                    return (
                        <div className='article_normal'>
                            {/* 用户模块 */}
                            <UserComponent article={data.article} classify={data.article.classify}/>
                            {/* 正文 */}
                            <ContentComponent article={data.article} classify={data.article.classify} />
                        </div>
                    );
                }}
            </Query>
        )
    }
}

export default Articles;
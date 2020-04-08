import React, { Fragment } from 'react';
import {  Button } from 'antd';
import _ from 'lodash';
import { Mutation } from 'react-apollo';
import { ADD_COMMENT, ARTICLE_DETIAL } from '../graphql';
/**
 * 添加新评论
 * @date 2020-03-230
 */
class MutationComponent extends React.Component {
    submit = (createComment) => {
        createComment();
    };
    render() {
        const { content, articleId, index11 ,replyToCommentId} = this.props;
        return (
            <Mutation
                mutation={ADD_COMMENT}
                refetchQueries={[
                    {
                        query: ARTICLE_DETIAL,
                        variables: {
                            id:articleId,
                        },
                        
                    },
                ]}
                awaitRefetchQueries={true}
                variables={{
                    userId: 2,
                    content: content,
                    articleId: articleId,
                    replyToCommentId: replyToCommentId, //0：直接评论文章,直接评论一级评论
                    rootCommentId: index11, //0：文章下的评论
                }}
                onError={{}}
            >
                {(createComment, { data, loading, error }) => {
                    if (error) {
                        console.log('error', error);
                        return <div>error</div>;
                    }
                    return (
                        <div>
                            {error && <div>error</div>}
                            <Fragment>
                                <div>
                                    <Button type="submit" onClick={this.submit.bind(this, createComment)}>提交</Button>
                                </div>
                            </Fragment>
                        </div>
                    );
                }}
            </Mutation>
        );
    }
}
export default MutationComponent;

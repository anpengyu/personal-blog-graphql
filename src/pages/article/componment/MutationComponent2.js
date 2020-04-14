import React, { Fragment } from 'react';
import { Button, message } from 'antd';
import _ from 'lodash';
import { Mutation } from 'react-apollo';
import { ADD_COMMENT, ARTICLE_DETIAL } from '../graphql';
/**
 * 添加新评论
 * @date 2020-03-230
 */
class MutationComponent extends React.Component {
    submit = (createComment, id) => {
        console.log('iddddddd',id)
        if (id == -1) {
            message.info('请先登录~')
            return;
        }
        createComment();
    };
    render() {
        const { content, articleId, index11, replyToCommentId } = this.props;
        let { userInfo = {} } = this.props;
        let id = -1;
        if (userInfo && !_.isEmpty(userInfo)) {
            console.log('======', userInfo, !_.isNaN(userInfo), !_.isNil(userInfo), !_.isNull(userInfo))
            userInfo = JSON.parse(userInfo)
            id = userInfo.id;
        }
        console.log('id', id)
        return (
            <Mutation
                mutation={ADD_COMMENT}
                refetchQueries={[
                    {
                        query: ARTICLE_DETIAL,
                        variables: {
                            id: articleId,
                        },

                    },
                ]}
                awaitRefetchQueries={true}
                variables={{
                    userId: id,
                    content: content,
                    articleId: articleId,
                    replyToCommentId: replyToCommentId, //0：直接评论文章,直接评论一级评论
                    rootCommentId: index11, //0：文章下的评论
                }}
            // onError={{}}
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
                                    <Button type="submit" onClick={this.submit.bind(this, createComment, id)}>提交11</Button>
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

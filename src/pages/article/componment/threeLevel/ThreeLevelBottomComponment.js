import React, { FC, useState } from 'react';
import styles from '../../index.scss';
import moment from 'moment';
import _ from 'lodash';
import { withApollo } from 'react-apollo';
import { COMMENT_LIKE, ARTICLE_DETIAL } from '../../graphql';
import { loadUserId } from '../../../../utils/Constant';

class ThreeLevelBottomComponment extends React.Component {

    unfoldComent = () => {
        let { item, unfold } = this.props;
        let itemId = item.id;
        let indexOf = _.indexOf(unfold, itemId)
        if (indexOf == -1) {
            unfold.push(itemId)
        } else {
            unfold = _.filter(unfold, function (item) {
                return item != itemId;
            })
        }
        this.props.unfoldFun(unfold)
    }

    likeComment = async () => {
        let userId = loadUserId()
        let { commentId, unfold } = this.props;
        console.log('commentId', commentId)
        try {
            let data = await this.props.client.mutate({
                mutation: COMMENT_LIKE,
                variables: {
                    type: '1',
                    userId: userId,
                    commentId: commentId
                },
                refetchQueries: [{ query: ARTICLE_DETIAL, variables: { id: this.props.articleId } }]
            })

        } catch (e) {

        }
    }

    render() {
        const { item, comment, unfold,creator} = this.props;
        let userLikes = JSON.parse(item.userLikes)
        let userId = creator.id;
        let itemId = item.id;
        return (
            <div style={{ display: 'flex', height: '30px', lineHeight: '30px' }}>
                <div style={{ display: 'flex', cursor: 'pointer' }}>
                    <div style={{ height: 20, width: 20 }} onClick={this.likeComment.bind(this)}>
                        {_.indexOf(userLikes, userId) == -1 ? <img src={require('../../../../assets/like_default.png')} /> :
                            <img src={require('../../../../assets/second_like.png')} />}
                    </div>
                    <div style={{ marginLeft: '5px' }}>{item.likes}</div>
                </div>
                <div style={{ display: 'flex', marginLeft: '20px', cursor: 'pointer' }} onClick={this.props.publishButton.bind(this, itemId)}>
                    <div style={{ height: 20, width: 20 }}><img src={require('../../../../assets/reply_default.png')} /></div>
                    <div style={{ marginLeft: '5px' }}>{_.indexOf(this.props.secondaryCommentVisible, itemId) != -1 ? '取消回复' : '回复'}</div>
                </div>
            </div>
        )
    }


}

export default withApollo(ThreeLevelBottomComponment);
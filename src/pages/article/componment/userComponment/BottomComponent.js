import React, { FC, useState } from 'react';
import styles from '../../index.scss';
import moment from 'moment';
import _ from 'lodash';
import { CHANGE_USER_INFO_TYPE } from '../../../../utils/Constant';
import { Link, withRouter } from "react-router-dom";
const BottomComponment: FC = (props) => {

    const { article, commentCount, praiseClick, isCollect, isLikes } = props;

    return (
        <div style={{ display: 'flex', marginRight: 10, height: '30px', lineHeight: '30px' }}>
            {/* 查看 */}
            <div className='article_user_bottom'>
                <div><img style={{ height: 15, width: 15 }} src={require('../../../../assets/look.png')} /></div>
                <div style={{ marginLeft: '5px' }}>{article.articlePageView}</div>
            </div>
            {/* 评论 */}
            <div className='article_user_bottom'>
                <a href={'#comment'}>
                    <div style={{ display: 'flex' }}>
                        <div><img style={{ height: 15, width: 15 }} src={require('../../../../assets/comment.png')} /></div>
                        <div style={{ marginLeft: '5px' }}>{article.articleCommentCount}</div>
                    </div>
                </a>
            </div>
            {/* 点赞 */}
            <div className='article_user_bottom' onClick={praiseClick.bind(this, CHANGE_USER_INFO_TYPE.LIKES, isLikes)}>
                {isLikes ?
                    <div><img style={{ height: 15, width: 15 }} src={require('../../../../assets/praise.png')} /></div> :
                    <div> <img style={{ height: 15, width: 15 }} src={require('../../../../assets/praise_default.png')} /></div>}
                <div style={{ marginLeft: 5 }}> {article.articlePraiseCount}</div>
            </div>
            {/* 收藏 */}
            <div className='article_user_bottom'
                onClick={praiseClick.bind(this, CHANGE_USER_INFO_TYPE.COLLECTS, isCollect)}>
                {isCollect ?
                    <div><img style={{ height: 15, width: 15 }} src={require('../../../../assets/collect.png')} /></div> :
                    <div> <img style={{ height: 15, width: 15 }} src={require('../../../../assets/collect_default.png')} /></div>}
                <div style={{ marginLeft: '5px' }}> {article.articleDisLikeCount}</div>
            </div>
        </div>
    )
}

export default BottomComponment
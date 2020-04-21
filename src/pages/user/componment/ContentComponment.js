import React from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import '../index.scss'
import { times } from '../../../utils/Constant';

import { withRouter } from "react-router-dom";
class ContentComponment extends React.Component {

    clickArticleDetail = (id) => {
        this.props.history.push(`/article/${id}`)
    }

    render() {
        const { allArticles } = this.props;
        return (
            <div>
                {
                    _.isEmpty(allArticles) ? <div className='content_root'></div> :
                        allArticles.map((item, index) => {
                            const { user } = item;
                            return <div className='content_root' key={index} onClick={this.clickArticleDetail.bind(this, item.id)}>
                                <div className='content_title_tv'>{item.articleTitle}</div>
                                <div className='content_info'>文章内容提示</div>
                                <div className='content_bottom_root'>
                                    <div> 发布时间：{times(item.created_at)}</div>
                                    <div className='content_bottom_right'>
                                        <div>{item.articlePraiseCount}点赞</div>
                                        <div className='content_bottom_tv'>{item.articleDislikeCount}收藏</div>
                                        <div>{item.articlePageView}查看</div>
                                    </div>
                                </div>
                            </div>
                        })
                }
            </div>
        )
    }
}

export default withRouter(connect(({ user }) => ({
    user,
}))(ContentComponment));
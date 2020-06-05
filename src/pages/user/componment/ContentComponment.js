import React from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import '../index.scss'
import { times } from '../../../utils/Constant';

import { withRouter } from "react-router-dom";
import { buildPreviewHtml } from '../buildhtml';
class ContentComponment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articleUnfold: []//点击文章提示展开
        }
    }

    clickArticleDetail = (id) => {
        this.props.history.push(`/article/${id}`)
    }

    articleSubTitle = (articleId) => {
        let articleUnfold = this.state.articleUnfold;
        if (_.includes(articleUnfold, articleId)) {
            articleUnfold= _.filter(articleUnfold, function (item) {
                console.log('.....',item,articleId)
                return item != articleId
            })
        } else {
            articleUnfold.push(articleId)
        }
        console.log('articleUnfold', articleUnfold, articleId)
        this.setState({ articleUnfold })
    }

    render() {
        const { allArticles } = this.props;
        const { articleUnfold } = this.state;
        // console.log('articleUnfold',articleUnfold)
        return (
            <div>
                {
                    _.isEmpty(allArticles) ? <div className='content_root'></div> :
                        allArticles.map((item, index) => {
                            const { user } = item;
                            console.log(item)
                            return <div className='content_root' key={index}>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ width: '50px', height: '50px' }}><img src={require('../../../assets/head.jpg')} /></div>
                                    <div style={{ marginLeft: '10px' }}>
                                        <div style={{ color: '#000', fontWeight: '500', fontSize: '18px' }}>{user.username}</div>
                                        <div style={{ fontSize: '14px' }}>签名。。。。。。。。。。。。。。。。</div>
                                    </div>
                                </div>
                                <div className='content_title_tv' onClick={this.clickArticleDetail.bind(this, item.id)}>{item.articleTitle}</div>

                                {_.includes(articleUnfold, item.id) ?
                                    <div dangerouslySetInnerHTML={{
                                        __html: buildPreviewHtml(item.articleContent),
                                    }}>

                                    </div> :
                                    <div className='content_info' onClick={this.articleSubTitle.bind(this, item.id)}>{item.articleSubTitle}</div>
                                }

                                <div className='content_bottom_root'>
                                    <div className='content_bottom_right'>
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ width: '20px', height: '20px' }}><img src={require('../../../assets/like_default.png')} /></div>
                                            <div style={{ marginLeft: '5px' }}>{item.articlePraiseCount}</div></div>
                                        <div className='content_bottom_tv'>
                                            <div style={{ width: '20px', height: '20px' }}>
                                                <img src={require('../../../assets/collect_default.png')} />
                                            </div>
                                            <div style={{ marginLeft: '5px' }}>{item.articleDisLikeCount}
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ width: '20px', height: '20px' }}><img src={require('../../../assets/look.png')} /></div>
                                            <div style={{ marginLeft: '5px' }}>{item.articlePageView}</div>
                                        </div>
                                    </div>
                                    <div> 发布时间：{item.createDate}</div>
                                    {_.includes(articleUnfold, item.id) ?
                                        <div onClick={this.articleSubTitle.bind(this, item.id)}> 收起</div> : null
                                    }

                                </div>
                                <div className='line' />
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
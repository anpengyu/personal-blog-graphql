import React from 'react';

class ContentComponment extends React.Component {
    render() {
        return (
            <div className='content_root'>
                <div className='content_title_tv'>文章标题</div>
                <div className='content_info'>文章内容提示</div>
                <div className='content_bottom_root'>
                    <div>2020/4/13 星期一</div>
                    <div className='content_bottom_right'>
                        <div>点赞</div>
                        <div>收藏</div>
                        <div>查看</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContentComponment;
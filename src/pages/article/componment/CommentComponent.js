import React from 'react';
import '../index.less';

import ToCommentComponent from './ToCommentComponent';
import MutationComponent from './MutationComponent';
let moment = require('moment');
class ContentComponent extends React.Component {

    //发帖距现在多长时间
    times(date) {
        moment.locale('zh-cn');
        return moment(new Date(date), 'YYYY-MM-DD HH:mm:ss').locale('zh-cn').fromNow();
    }

    //点击发帖用户
    clickUserName = () => {
        // history.push('/userInfo');
    };
    render() {
        const { article } = this.props;
        const { comment } = article;
        return (
            <div className='content'>
                {comment.map((item, index, ) => {
                    const { creator, comment } = item;
                    return (
                        <div key={index}>
                            <div>{creator.username}</div>
                            <div>{this.times(item.created_at)}</div>
                            <div>内容：{item.content}</div>

                            <MutationComponent
                                content="111111111"
                                index11={item.id}
                                articleId={article.id}
                                replyToCommentId='0'
                            />

                            <div style={{ marginTop: 20, backgroundColor: '#f6f6f6' }}>
                                {comment.map((item1, index) => {
                                    return (
                                        <div style={{ marginLeft: 30 }} key={index}>
                                            <ToCommentComponent comment={item1} itemId={item.id} />
                                        </div>
                                    );
                                })}
                            </div>
                            <div
                                style={{ width: '100%', height: 2, backgroundColor: '#000' }}
                            ></div>
                        </div>
                    );
                },
                )}
            </div>
        );
    }
}

export default ContentComponent;
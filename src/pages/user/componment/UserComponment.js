import React from 'react';
import avatar from '../../../assets/head.jpg';
import './user.scss'

class UserComponment extends React.Component {

    clickLinks = (id) => {
        console.log('id', id)
    }

    render() {
        const { articlesLength,classifyLength } = this.props;
        return (
            <div className='user_root'>
                <div className='user_top_root'>
                    <img className='user_top_avatar'
                        src={avatar} />
                    <div className='user_top_name_root'>
                        <div className='user_name_tv'>宇</div>
                        <div className='user_top_info'>
                            <div className='tv1'>男</div>
                            <div className='tv1'>郑州</div>
                            <div className='tv1'>Android开发</div>
                        </div>
                    </div>
                </div>
                <div className='signature'>
                    成功不是将来才有的，而是从决定去做的那一刻起，持续累积而成
                </div>
                <div className='middle_root'>
                    <div>
                        <div className='tv2'>文章</div>
                        <div className='tv3'>{articlesLength}</div>
                    </div>
                    <div>
                        <div className='tv2'>分类</div>
                        <div className='tv3'>{classifyLength}</div>
                    </div>
                    <div>
                        <div className='tv2'>标签</div>
                        <div className='tv3'>16</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserComponment;
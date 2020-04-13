import React from 'react';
import avatar from '../../../assets/head.jpg';
import './user.scss'

const userLinks = [
    {
        id: 1,
        name: 'github连接',
        likns: 'https://github.com/anpengyu?tab=repositories'
    },
    {
        id: 2,
        name: '个人网站',
        likns: 'https://www.xxx.com'
    },
    {
        id: 3,
        name: '个人网站',
        likns: 'https://github.com'
    }
]

class UserComponment extends React.Component {

    clickLinks=(id)=>{
        console.log('id',id)
    }

    render() {
        return (
            <div>
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
                        <div className='tv3'>21</div>
                    </div>
                    <div>
                        <div className='tv2'>分类</div>
                        <div className='tv3'>7</div>
                    </div>
                    <div>
                        <div className='tv2'>标签</div>
                        <div className='tv3'>16</div>
                    </div>
                </div>
                <div className='bottom_root'>
                    {
                        userLinks.map((item, index) => {
                            return <div className='item' onClick={this.clickLinks.bind(this,item.id)}>
                                <div>{item.name}：</div>
                                <div className='item_tv'>{item.likns}</div>
                            </div>
                        })
                    }

                    {/* <div className='item'>
                        <div>个人网站：</div>
                        <div className='item_tv'>www.xxxx.com</div>
                    </div> */}
                </div>
            </div>
        )
    }
}

export default UserComponment;
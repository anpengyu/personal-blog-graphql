import React from 'react';
import avatar from '../../../assets/head.jpg';
import './links.scss'

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

class LinksComponment extends React.Component {

    clickLinks=(id)=>{
        console.log('id',id)
    }

    render() {
        return (
            <div className='links_root'>
                <div className='bottom_root'>
                    {
                        userLinks.map((item, index) => {
                            return <div className='item' key={index} onClick={this.clickLinks.bind(this,item.id)}>
                                <div>{item.name}：</div>
                                <div className='item_tv'>{item.likns}</div>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default LinksComponment;
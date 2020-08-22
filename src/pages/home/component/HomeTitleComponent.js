import React from 'react';
import '../index.scss';
import { Link } from 'react-router-dom';

const tab = [
    '推荐',
    '关注',
    '热榜'
]
export default class HomeTitleComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectIndex: 0,
        }
    }

    changeTab = (selectIndex) => {
        this.setState({
            selectIndex
        })
    }

    render() {
        const { selectIndex } = this.state;
        return (
            <div className='home_title_bg'>
                {
                    tab.map((item, index) => {
                        return <Link><div
                            onClick={this.changeTab.bind(this, index)}
                            className={selectIndex == index ? 'home_title_tv_select' : 'home_title_tv'}>{item}</div></Link>
                    })
                }
                {/* <Link><div className={selectIndex==0?'home_title_tv_select':'home_title_tv'}>推荐</div></Link>
                <Link><div className='home_title_tv'>关注</div></Link>
                <Link><div className='home_title_tv'>热榜</div></Link> */}
            </div>
        )
    }
}
import React from 'react';
import './index.scss';

import UserComponment from './componment/UserComponment';
import LinksComponment from './componment/LinksComponment';
import MarksComponment from './componment/MarksComponment';

/**
  * @author apy
  * @date 2020-04-10
  * 个人中心Root页面
  */
export default class UserInfoPage extends React.Component {


    render() {
        return (
            <div className='user_container'>
                <div className='container'>
                    <div className='left'>
                        <div className='user_root'>
                            <UserComponment />
                        </div>
                        <div className='books_root'>2</div>
                        <MarksComponment />
                        <div className='links_root'>
                            <LinksComponment />
                        </div>
                    </div>
                    <div className='right'>
                        <div className='content_root'>5</div>
                        <div className='content_root'>6</div>
                        <div className='about_auth_root'>7</div>
                    </div>
                </div>
            </div>
        )
    }
}
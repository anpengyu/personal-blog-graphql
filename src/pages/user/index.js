import React from 'react';
import './index.scss';

import UserComponment from './componment/UserComponment';
import LinksComponment from './componment/LinksComponment';
import MarksComponment from './componment/MarksComponment';
import CourseComponment from './componment/CourseComponment';
import ContentComponment from './componment/ContentComponment';
import AboutAuthComponment from './componment/AboutAuthComponment';

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
                        <UserComponment />
                        <CourseComponment />
                        <MarksComponment />
                        <LinksComponment />
                    </div>
                    <div className='right'>
                        <div className='content_root'>5</div>
                        <div className='right_content_root'>
                            <ContentComponment />
                            <AboutAuthComponment />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
import React from 'react';
import './index.scss';

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
                    <div>
                        <div className='user_root'>1</div>
                        <div className='books_root'>2</div>
                        <div className='marks_root'>3</div>
                        <div className='links_root'>4</div>
                    </div>
                    <div>
                        <div  className='content_root'>5</div>
                        <div  className='content_root'>6</div>
                        <div  className='about_auth_root'>7</div>
                    </div>
                </div>
            </div>
        )
    }
}
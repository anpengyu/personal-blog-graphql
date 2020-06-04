import React, { FC, useState } from 'react';
import styles from '../../index.scss';
import moment from 'moment';
import _ from 'lodash';
import { CHANGE_USER_INFO_TYPE } from '../../../../utils/Constant';
import { Link, withRouter } from "react-router-dom";
const TitleComponment: FC = (props) => {

    const {user ,article} = props;

    console.log('user',user)

    return (
        <div style={{ height: '50px', lineHeight: '50px', justifyContent: 'space-between', }}>
            <Link to={`/userInfo/${user.id}`}>
                <div style={{ display: 'flex', cursor: 'pointer' }}>
                    <img style={{ height: 40, width: 40, marginTop: 5, borderRadius: 50, }} src={require('../../../../assets/head.jpg')} />
                    <div className='article_user_name'>{user.username}</div>
                </div>
            </Link>
        </div>
    )
}

export default TitleComponment
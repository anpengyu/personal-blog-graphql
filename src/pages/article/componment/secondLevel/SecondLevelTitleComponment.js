import React, { FC, useState } from 'react';
import styles from '../../index.scss';
import moment from 'moment';
import _ from 'lodash';
import { Link, withRouter } from "react-router-dom";
const TitleComponment: FC = (props) => {

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', lineHeight: '40px', height: '40px' }}>

            <Link to={`/userInfo/${props.creator.id}`}>
                <div style={{ display: 'flex', cursor: 'pointer' }}>
                    <img style={{ height: 35, width: 35, borderRadius: 50, }}
                        src={require('../../../../assets/head.jpg')} />
                    <div className='comment_name'>
                        {props.creator.username}
                        <div style={{ color: '#8590a6', fontSize: '14px', marginLeft: '5px' }}>
                            {_.eq(props.creator.id, props.user.id) ? '(作者)' : ''}
                        </div>
                    </div>
                </div>
            </Link>

            <div>
                {props.item.createDate}
            </div>
        </div>
    )
}

export default TitleComponment
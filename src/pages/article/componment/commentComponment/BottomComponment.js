import React, { FC, useState } from 'react';
import styles from '../../index.scss';
import moment from 'moment';
import _ from 'lodash';

const TitleComponment: FC = (props) => {

    return (
        <div style={{ display: 'flex', height: '30px', lineHeight: '30px' }}>
            <div style={{ display: 'flex', cursor: 'pointer' }}>
                <div style={{ height: 20, width: 20 }}>
                    <img
                        src={require('../../../../assets/like.png')} />
                </div>
                <div style={{ marginLeft: '5px' }}>10</div>
            </div>

            <div style={{ display: 'flex', marginLeft: '20px', cursor: 'pointer' }} onClick={props.publishButton.bind(this,props.item.id)}>
                <div style={{ height: 20, width: 20 }}><img src={require('../../../../assets/reply.png')} /></div>
                <div style={{ marginLeft: '5px' }}>{_.indexOf(props.secondaryCommentVisible, props.item.id) != -1 ? '取消回复' : '回复'}</div>
            </div>
        </div>
    )
}

export default TitleComponment
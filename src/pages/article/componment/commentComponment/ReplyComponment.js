import React, { FC, useState } from 'react';
import styles from '../../index.scss';
import moment from 'moment';
import _ from 'lodash';
import BraftEditor from 'braft-editor';

const ReplyComponment: FC = (props) => {
    const { secondaryCommentVisible, item } = props;
    const controls = [
        {
            key: 'bold',
            text: <b>加粗</b>
        },
        'italic', 'underline', 'separator', 'separator'
    ]
    return (
        <div >
            {
                _.indexOf(secondaryCommentVisible, item.id) != -1 ? <BraftEditor
                    id="editor-id-2"
                    controls={controls}
                    contentStyle={{ height: 110, marginBottom: '10px', boxShadow: 'inset 1px 1px 3px rgba(0,0,0,.1)' }}
                    onChange={props.changeSecondaryComment.bind(this)} /> : null
            }

            {_.indexOf(secondaryCommentVisible, item.id) != -1 ?
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div />
                    <div style={{
                        cursor: 'pointer', borderRadius: '50px',
                        backgroundColor: '#ec7259', color: '#fff',
                        width: '60px', textAlign: 'center',
                        fontSize: '14px', padding: '4px 12px', marginBottom: '20px'
                    }} onClick={props.publishComment.bind(this, item.id)}>发布</div>
                </div> : null}
        </div>
    )
}

export default ReplyComponment
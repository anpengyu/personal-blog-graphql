import React, { FC, useState } from 'react';
import styles from '../index.scss';
import moment from 'moment';
import _ from 'lodash';
import BraftEditor from 'braft-editor';

const ReplyComponment: FC = (props) => {
    const { secondaryCommentVisible, itemId, secondaryComment } = props;
    const controls = [
        {
            key: 'bold',
            text: <b>加粗</b>
        },
        'italic', 'underline', 'separator', 'separator'
    ]
    function delHtmlTag(str) {
        if (!_.isEmpty(str) && _.isString(str)) {
            return str.replace(/<[^>]+>/g, ''); //正则去掉所有的html标记
        }
    }
    return (
        <div >
            {
                _.indexOf(secondaryCommentVisible, itemId) != -1 ? <BraftEditor
                    id="editor-id-2"
                    controls={controls}
                    contentStyle={{ height: 110, marginBottom: '10px', boxShadow: 'inset 1px 1px 3px rgba(0,0,0,.1)' }}
                    onChange={props.changeSecondaryComment.bind(this)} /> : null
            }
            {!_.isEmpty(delHtmlTag(secondaryComment)) ?
                _.indexOf(secondaryCommentVisible, itemId) != -1 ?
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div />
                        <div style={{
                            cursor: 'pointer', borderRadius: '50px',
                            backgroundColor: '#ec7259', color: '#fff',
                            width: '60px', textAlign: 'center',
                            fontSize: '14px', padding: '4px 12px', marginBottom: '20px'
                        }} onClick={props.publishComment.bind(this, itemId)}>发布</div>
                    </div> : null : null
            }

        </div>
    )
}

export default ReplyComponment
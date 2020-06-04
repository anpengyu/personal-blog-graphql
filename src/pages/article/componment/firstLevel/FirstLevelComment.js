import React, { FC, useState } from 'react';
import styles from '../../index.scss';
import moment from 'moment';
import _ from 'lodash';
import BraftEditor from 'braft-editor';
import { Button, message, BackTop, Input } from 'antd';
import { loadUserInfo, loadUserId } from '../../../../utils/Constant';
import { ADD_COMMENT, ARTICLE_DETIAL } from '../../graphql';
import { ContentUtils } from 'braft-utils'
import { withApollo } from 'react-apollo';

const TitleComponment: FC = (props) => {

    const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null))//添加新类型

    const controls = [
        {
            key: 'bold',
            text: <b>加粗</b>
        },
        'italic', 'underline', 'separator', 'separator'
    ]
    const extendControls = [
        {
            key: 'clear-editor',
            type: 'button',
            text: '清空编辑器',
            onClick: clearContent
        }
    ]
    function clearContent() {
        setEditorState(ContentUtils.clear(editorState))

    }
    function delHtmlTag(str) {
        if (!_.isEmpty(str) && _.isString(str)) {
            return str.replace(/<[^>]+>/g, ''); //正则去掉所有的html标记
        }
    }
    //一级评论
    function changeComment(editorState) {
        const editor = delHtmlTag(editorState);
        if (_.isString(editor)) {
            if (editor.length >= 150) {
                message.info('评论最多只能150字')
            }
        }
        setEditorState(editorState)
    }

    const publishCommentToArticle = async (articleId) => {
        let userId = loadUserId();
        if (_.isEmpty(userId)) {
            return;
        }
        const editor = delHtmlTag(editorState.toHTML());
        if (_.isString(editor)) {
            if (_.isEmpty(editor)) {
                message.info('评论不能为空')
                return;
            }
            if (editor.length >= 150) {
                message.info('评论最多只能150字')
                return;
            }
            try {
                let data = await props.client.mutate({
                    mutation: ADD_COMMENT,
                    variables: {
                        userId: userId,
                        content: editor,
                        articleId: articleId,
                        replyToCommentId: '0', //0：直接评论文章,直接评论一级评论
                        rootCommentId: '0', //0：文章下的评论
                    },
                    refetchQueries: [{ query: ARTICLE_DETIAL, variables: { id: articleId } }]
                })
                clearContent()
            } catch (e) {

            }
        }
    }
    return (
        <div>
            <div id='comment' style={{ paddingBottom: "40px", color: '#fff' }}>发表您的评论</div>
            <div style={{ backgroundColor: '#fff', marginTop: '10px', marginBottom: '10px' }}>
                <BraftEditor
                    id="editor-id-1"
                    controls={controls}
                    value={editorState}
                    extendControls={extendControls}
                    contentStyle={{ height: 110, boxShadow: 'inset 1px 1px 3px rgba(0,0,0,.1)' }}
                    onChange={changeComment} />
            </div>

        {!_.isEmpty(delHtmlTag(editorState.toHTML()))? <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div />
                <div style={{
                    cursor: 'pointer', borderRadius: '50px',
                    backgroundColor: '#ec7259', color: '#fff',
                    fontSize: '14px', padding: '4px 12px'}}
                    onClick={publishCommentToArticle.bind(this, props.article.id)}>发表评论</div>
            </div>:null}

           

            <div style={{ display: 'flex' }}>
                <div style={{ backgroundColor: '#ec7259', width: '5px', height: '30px' }}></div>
                <div className='comment_anchor'>评论区</div>
            </div>
        </div>
    )
}

export default withApollo(TitleComponment)
import React from 'react';
import { Divider } from 'antd';
import BraftEditorComponent from './BraftEditorComponent';
import { buildPreviewHtml } from '../../write-article/buildHtml';
import _ from 'lodash'

const answer = [
    {
        id: 1, applaud: 10, content: 'sssssssssxxxxxxxxxxxxxxxxxxxxxxxxxxx\nxxxxxxxxxx\nxxxxxxxxxxxx\nasssssssss\nddddddddddd', answerTime: 'Aug 28 at 15:04',
        user: { id: 1, username: 'jccampanero', userImg: 'xxxx', reputation: '3068', badge: 1 }
    }, {
        id: 2, applaud: 12, content: 'sssssssssxxxxxxxxxxxxxxxxxxxxxxxxxxx\nxxxxxxxxxx\nxxxxxxxxxxxx\nasssssssss\nddddddddddd', answerTime: 'Aug 28 at 15:04',
        user: { id: 1, username: 'jccampanero', userImg: 'xxxx', reputation: '3068', badge: 1 }
    }, {
        id: 3, applaud: 533, content: 'sssssssssxxxxxxxxxxxxxxxxxxxxxxxxxxx\nxxxxxxxxxx\nxxxxxxxxxxxx\nasssssssss\nddddddddddd', answerTime: 'Aug 28 at 15:04',
        user: { id: 1, username: 'jccampanero', userImg: 'xxxx', reputation: '3068', badge: 1 }
    }
]

class AnswerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            answerType: 1,
            editorState: '',
            comment: ''
        }
    }

    changeType = (answerType) => {
        this.setState({
            answerType
        })
    }

    handleChange = (editorState) => {
        this.setState({ 
            editorState,
            comment:editorState.toHTML()
         });
    };

    delHtmlTag(str) {
        if (!_.isEmpty(str) && _.isString(str)) {
            return str.replace(/<[^>]+>/g, ''); //正则去掉所有的html标记
        }
    }
    render() {
        const { answerType, editorState ,comment} = this.state;
        return (
            <div style={{ marginTop: '20px' }}>
                <div>
                    你的回答
                </div>

                <BraftEditorComponent handleChange={this.handleChange} />
                <div
                    dangerouslySetInnerHTML={{
                        __html: buildPreviewHtml(!_.isEmpty(editorState) ? editorState.toHTML() : ""),
                    }}
                ></div>
                <div>
                    {
                        !_.isEmpty(this.delHtmlTag(comment))? <a>发布评论</a>:null
                    }
                   
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px', marginBottom: '50px' }}>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>2 Answers</div>

                    <div style={{ display: 'flex' }}>
                        <div onClick={this.changeType.bind(this, 1)} style={{ backgroundColor: answerType == 1 ? '#eee' : '#fff', cursor: 'pointer', padding: '10px 20px', borderWidth: 1, borderRight: 0, borderColor: 'var(--black-300)', borderStyle: 'solid' }}>Active</div>
                        <div onClick={this.changeType.bind(this, 2)} style={{ backgroundColor: answerType == 2 ? '#eee' : '#fff', cursor: 'pointer', padding: '10px 20px', borderWidth: 1, borderRight: 0, borderColor: 'var(--black-300)', borderStyle: 'solid' }}>Oldest</div>
                        <div onClick={this.changeType.bind(this, 3)} style={{ backgroundColor: answerType == 3 ? '#eee' : '#fff', cursor: 'pointer', padding: '10px 20px', borderWidth: 1, borderColor: 'var(--black-300)', borderStyle: 'solid' }}>Votes</div>
                    </div>

                </div>
                {
                    answer.map((item, index) => {
                        return <div>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <div>赞同</div>
                                    <div>{item.applaud}</div>
                                    <div>不赞同</div>
                                </div>
                                <div>
                                    {item.content}
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div><a>share</a>      <a>follow</a></div>
                                <div style={{ backgroundColor: '#E1ECF4', padding: '10px' }}>
                                    <div>asked Aug 19 at 15:07</div>
                                    <div style={{ display: 'flex' }}>
                                        <div>头像</div>
                                        <div>
                                            <a>
                                                The Impaler
                                            </a>
                                            <div>
                                                25.3k 2323 51
                                                </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <Divider />
                        </div>
                    })
                }

            </div>
        )
    }
}

export default AnswerComponent;
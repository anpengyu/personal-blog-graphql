import React from "react";
import { ARTICLE_DETIAL } from './graphql';
import Loading from "../Loading";
import { Query } from "react-apollo";
import './index.less';
import ContentComponent from './componment/ContentComponent';
import CommentComponent from './componment/CommentComponent';
import MutationComponent from './componment/MutationComponent2';
import { Input } from "antd";
import Base from "../Base";
import { AUTH_TOKEN, CONSTANT_USER_INFO } from '../../utils/Constant';

export default class Articles extends Base {

    constructor(props) {
        super(props);
        this.state = {
            commentChange: '',
            userInfo: localStorage.getItem(CONSTANT_USER_INFO)
        }
        console.log('ddddddddddddddddddddddddddddddddddd',this.state.userInfo)
    }
    changeComment = (e) => {
        this.setState({
            commentChange: e.target.value
        })
    }

    render() {
        let id = this.props.match.params.id;
        const { userInfo } = this.state;

        return (
            <Query
                query={ARTICLE_DETIAL}
                variables={{ id }}
            >
                {({ loading, error, data }) => {
                    if (loading) return <Loading />;
                    if (error) return <Loading />;

                    return (
                        <div className='normal'>
                            <ContentComponent article={data.article} userInfo={userInfo} />
                            <div style={{ display: 'flex', backgroundColor: '#fff' }}>
                                <img
                                    style={{
                                        height: 40,
                                        width: 40,
                                        marginTop: 5,
                                        borderRadius: 50,
                                    }}
                                    src={require('../../assets/head.jpg')}
                                />
                                <Input onChange={this.changeComment}></Input>
                                <MutationComponent 
                                content={this.state.commentChange} 
                                articleId={id} index11={"0"}
                                 replyToCommentId='0' 
                                 userInfo={userInfo} 
                                 />
                            </div>

                            <div className='comment'>
                                评论区
                                <CommentComponent article={data.article} userInfo={userInfo}/>
                            </div>
                        </div>
                    );
                }}
            </Query>
        )
    }
}
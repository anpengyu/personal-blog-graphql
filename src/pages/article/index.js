import React from "react";
import { ARTICLE_DETIAL } from './graphql';
import Loading from "../Loading";
import { Query } from "react-apollo";
import './index.less';
import ContentComponent from './componment/ContentComponent';
import CommentComponent from './componment/CommentComponent';
import MutationComponent from './componment/MutationComponent';
import { Input } from "antd";

export default class Articles extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            commentChange: '',
        }
    }
    changeComment = (e) => {
        this.setState({
            commentChange: e.target.value
        })
    }

    render() {
        console.log('this.props', this.props)
        let id = this.props.match.params.id;
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
                            <ContentComponent article={data.article} />
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
                                <MutationComponent content={this.state.commentChange} articleId={id} index11={"0"} replyToCommentId='0'/>
                            </div>

                            <div className='comment'>
                                评论区
                         <CommentComponent article={data.article} />
                            </div>
                        </div>
                    );
                }}
            </Query>
        )
    }
}
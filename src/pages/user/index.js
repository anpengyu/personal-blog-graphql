import React from 'react';
import './index.scss';

import UserComponment from './componment/UserComponment';
import LinksComponment from './componment/LinksComponment';
import MarksComponment from './componment/MarksComponment';
import CourseComponment from './componment/CourseComponment';
import ContentComponment from './componment/ContentComponment';
import AboutAuthComponment from './componment/AboutAuthComponment';
import { message } from 'antd';
import { USER_INFO } from './graphql';
import { withApollo } from 'react-apollo';
import { withRouter } from "react-router-dom";
import { connect } from 'dva';
/**
  * @author apy
  * @date 2020-04-10
  * 个人中心Root页面
  */
class UserInfoPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allArticles: [],
            classify:[]
        }
    }

    async componentDidMount() {
        let id = this.props.match.params.id;
        let { query } = this.props.client;
        try {
            const result = await query({
                query: USER_INFO,
                variables: {
                    id
                },
            });
            console.log('result',result.data)
            let data = result.data.user;
            this.setState({
                allArticles: data.articles,
                classify:data.classify
            })
        } catch (e) {
            message.error('网络错误', e)
        }
    }

    render() {
        const {allArticles,classify} = this.state;
        return (
            <div className='user_container'>
                <div className='container'>
                    <div className='left' >
                        <UserComponment />
                        <CourseComponment classify={classify}/>
                        <MarksComponment />
                        <LinksComponment />
                    </div>
                    <div className='right'>
                        <div className='new_article_root'>5</div>
                        <div className='right_content_root'>
                            <ContentComponment allArticles={allArticles}/>
                            <AboutAuthComponment />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withApollo(withRouter(connect(({ user }) => ({
    user,
}))(UserInfoPage)));
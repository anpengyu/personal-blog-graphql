import React from 'react';
import './index.scss';

import UserComponment from './componment/UserComponment';
import LinksComponment from './componment/LinksComponment';
import MarksComponment from './componment/MarksComponment';
import CourseComponment from './componment/CourseComponment';
import ContentComponment from './componment/ContentComponment';
import AboutAuthComponment from './componment/AboutAuthComponment';
import UserAttentionComponment from './componment/UserAttentionComponment';
import { message, Tabs } from 'antd';
import { USER_DETAIL_INFO } from './graphql';
import { withApollo } from 'react-apollo';
import { withRouter } from "react-router-dom";
import { connect } from 'dva';
import { loadUserId } from '../../utils/Constant';
const { TabPane } = Tabs;
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
            classify: []
        }
    }

    callback = (key) => {
        console.log(key);
    }

    async componentDidMount() {
        let id = this.props.match.params.id;
        let userId = loadUserId()
        console.log('userId',userId)
        let { query } = this.props.client;
        try {
            const result = await query({
                query: USER_DETAIL_INFO,
                variables: {
                    id,
                    userId
                },
            });
            console.log('result', result.data)
            let data = result.data.user;
            this.setState({
                allArticles: data.articles,
                classify: data.classify
            })
        } catch (e) {
        }
    }

    render() {
        const { allArticles, classify } = this.state;
        return (
            <div className='user_container'>
                <UserComponment articlesLength={allArticles.length} classifyLength={classify.length} />
                <div style={{ display: 'flex', width: '100%' }}>
                    <div style={{ width: '600px', backgroundColor: '#fff', padding: '20px', marginLeft: '20px' }}>
                        <Tabs defaultActiveKey="1" onChange={this.callback}>
                            <TabPane tab="文章" key="1">
                                <ContentComponment allArticles={allArticles} />
                            </TabPane>
                            <TabPane tab="关注" key="2">
                                <UserAttentionComponment allArticles={allArticles} />
                            </TabPane>
                            <TabPane tab="收藏" key="3">
                                Content of Tab Pane 3
                            </TabPane>
                            <TabPane tab="浏览记录" key="4">
                                Content of Tab Pane 3
                            </TabPane>
                            <TabPane tab="提问" key="5">
                                Content of Tab Pane 3
                            </TabPane>
                            <TabPane tab="评论" key="6">
                                Content of Tab Pane 3
                            </TabPane>
                            <TabPane tab="点赞的文章" key="7">
                                Content of Tab Pane 3
                            </TabPane>
                        </Tabs>
                    </div>
                    <div style={{ backgroundColor: '#fff', padding: '30px', marginLeft: '10px', marginRight: '20px', width: '300px' }}>
                        <CourseComponment classify={classify} />
                        <MarksComponment />
                        <LinksComponment />
                    </div>
                </div>
                {/* <div className='container'>

                    <div className='left' >

                    </div>
                    <div className='right'>
                        <div className='right_content_root'>
                            <ContentComponment allArticles={allArticles} />
                            <AboutAuthComponment />
                        </div>
                    </div>
                </div> */}
            </div>
        )
    }
}

export default withApollo(withRouter(connect(({ user }) => ({
    user,
}))(UserInfoPage)));
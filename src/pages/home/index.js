import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { ALL_ARTICLES } from './graphql';
import Loading from '../Loading';
import ArticleItemComponent from './component/ArticleItemComponent';
import Base from '../Base'
import { connect } from 'dva';
import { BackTop } from 'antd';
import HomeTitleCompnent from './component/HomeTitleComponent';
import RightComponent from './component/RightComponent';
import RequestComponent from '../request'
const BackTopStyle = {
    height: 40,
    width: 90,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
};

class Articles extends Base {

    render() {
        let { titleComponent: { currentTab = 0 } } = this.props;
        // currentTab = 1;
        return (
            <Fragment>
                <div style={{ width:'100%'}}>
                    {
                        currentTab == 0 ?
                            <Query
                                query={ALL_ARTICLES}
                                variables={{ pageNum: 0, pageSize: 20, audit: 1 }}>
                                {({ loading, data, error, refetch }) => {
                                    if (error) return <Loading isCenter={true} />;
                                    if (loading) return <Loading isCenter={true} />;
                                    // refetch();
                                    return (
                                        <Fragment>
                                            <div style={{ display: 'flex',margin:'0 auto',width: '994px',padding:'10px' }}>
                                                <div style={{width:'694px'}}>
                                                    <div>
                                                        <HomeTitleCompnent />
                                                    </div>
                                                    {
                                                           currentTab == 0 ?
                                                           <div style={{ boxShadow: '0 1px 3px rgba(26,26,26,.1)' }}>
                                                           {data.allArticles.articles.map((item, index) => {
                                                               return (
                                                                   <div key={index} style={{}}>
                                                                       <ArticleItemComponent item={item} />
                                                                   </div>
                                                               );
                                                           })}
                                                       </div>: <RequestComponent />
                                                    }
                                                 
                                                </div>
                                                <RightComponent />
                                            </div>

                                        </Fragment>
                                    );
                                }}
                            </Query>
                            :
                            <RequestComponent />
                    }


                    <BackTop>
                        <div style={BackTopStyle}>回到顶部</div>
                    </BackTop>
                </div>
            </Fragment>
        );
    }
}

export default connect(({ home, titleComponent }) => ({
    home, titleComponent
}))(Articles);
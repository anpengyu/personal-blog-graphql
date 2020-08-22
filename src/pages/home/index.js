import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { ALL_ARTICLES } from './graphql';
import Loading from '../Loading';
import ArticleItemComponent from './component/ArticleItemComponent';
import Base from '../Base'
import { connect } from 'dva';
import { BackTop } from 'antd';
import HomeTitleCompnent from './component/HomeTitleComponent';

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

        return (
            <Fragment>
                <div>
                    <Query
                        query={ALL_ARTICLES}
                        variables={{ pageNum: 0, pageSize: 20, audit: 1 }}>
                        {({ loading, data, error, refetch }) => {
                            if (error) return <Loading isCenter={true} />;
                            if (loading) return <Loading isCenter={true} />;
                            // refetch();
                            return (
                                <Fragment>
                                    <div style={{ display: 'flex'}}>
                                        <div style={{width:'694px' }}>
                                            <div>
                                                <HomeTitleCompnent />
                                            </div>
                                            {data.allArticles.articles.map((item, index) => {
                                                return (
                                                    <div key={index} style={{}}>
                                                        <ArticleItemComponent item={item} />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div style={{marginLeft:'20px',backgroundColor:'#fff',width:'200px',height:'200px',padding:'20px'}}>
                                            ddd
                                        </div>
                                    </div>

                                </Fragment>
                            );
                        }}
                    </Query>

                    <BackTop>
                        <div style={BackTopStyle}>回到顶部</div>
                    </BackTop>
                </div>
            </Fragment>
        );
    }
}

export default connect(({ home }) => ({
    home,
}))(Articles);
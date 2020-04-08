import React, { Fragment } from "react";
import { Query} from "react-apollo";
import { ALL_ARTICLES } from './graphql';
import Loading from '../Loading';
import ArticleItemComponent from './component/ArticleItemComponent';

export default class Articles extends React.Component {

    componentDidMount(){
        console.log('...........')
    }

    render() {

        return (
            <Fragment>
                <div style={{ display: 'inline-block', width: '70%' }}>
                    <Query query={ALL_ARTICLES}>
                        {({ loading, data, error, refetch }) => {
                            if (error) return <Loading isCenter={true} />;
                            if (loading) return <Loading isCenter={true} />;
                          
                            // refetch();
                            return (
                                <Fragment>
                                    {data.allArticles.map((item, index) => {
                                        return (
                                            <div key={index} style={{}}>
                                                <ArticleItemComponent item={item} />
                                                {/* <div>{item.articleTitle}</div> */}
                                            </div>
                                        );
                                    })}
                                </Fragment>
                            );
                        }}
                    </Query>
                </div>
            </Fragment>
        );
    }
}
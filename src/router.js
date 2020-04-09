import React from 'react';
import { ApolloProvider } from 'react-apollo'
import { AUTH_TOKEN } from './utils/Constant';
import routers from './routerMap';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import NotFoundPage from './pages/error';
import _ from 'lodash'
import TitleComponment from './pages/componments/TitleComponment'
import monent_cn from './moment-cn'
import client from './apolloconfig';
let moment = require('moment');

function RouterConfig({ history, app }) {
    moment.locale('zh-cn', monent_cn)

    let token = !_.isEmpty(localStorage.getItem(AUTH_TOKEN));
    return (
        <ApolloProvider client={client}>
            <Router>
                <TitleComponment />
                <div style={{ backgroundColor: '#eee', width: '100%', display: 'flex', justifyContent: 'center', padding: 20 }}>

                    <Switch>
                        {routers.map((item, index) => {
                            return <Route key={index} path={item.path} exact
                                render={props => !item.auth ?
                                    <item.component {...props} /> :
                                    token ?
                                        <item.component {...props} /> :
                                        <Redirect to={{
                                            pathname: '/login',
                                            state: { from: props.location }
                                        }} />
                                } />
                        })}
                        {/*  所有错误路由跳转页面 */}
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </Router>
        </ApolloProvider>
    );
}
export default RouterConfig;



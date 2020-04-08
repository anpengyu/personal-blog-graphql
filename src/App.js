import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
// import ApolloClient, { InMemoryCache, } from 'apollo-boost';
// import { ApolloProvider } from 'react-apollo';
import HeaderPage from './pages/title';
import TitleComponment from './pages/componments/TitleComponment'
import routers from './routerMap';
import NotFoundPage from './pages/error';
import monent_cn from './moment-cn'

import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { AUTH_TOKEN } from './utils/Constant';
import { onError } from 'apollo-link-error';
let moment = require('moment');

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
      // authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhcHlheGQiLCJsb2dpblRpbWUiOiIyMDIwLTMtOC0xNi01My0xOSIsImlhdCI6MTU4NjMzNTk5OX0.AkixwdG20-zx4hhIjXE-hNjOyZCiRJ3eLX1G7G3-pGk'
    },
  }
})
const errorLink = onError(
  ({ graphQLErrors, networkError, response, operation, forward }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
    console.log('operation', operation);
    console.log('forward', forward);
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
            locations,
          )}, Path: ${path}`,
        ),
      );
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  },
);
const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:7001/graphql'
})

const link = ApolloLink.from([authLink,errorLink, httpLink]);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

class RootPage extends Component {

  componentDidMount() {
    moment.locale('zh-cn', monent_cn)
  }
  render() {
    // let token = this.props.token
    let token = true;

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
}
export default RootPage;

import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import HeaderPage from './pages/title';
import TitleComponment from './pages/componments/TitleComponment'
import routers from './routerMap';
import NotFoundPage from './pages/error';
import monent_cn from './moment-cn'
let moment = require('moment');

const client = new ApolloClient({
  uri: 'http://127.0.0.1:7001/graphql',
  // InMemoryCache
});

class RootPage extends Component {

  componentDidMount(){
    moment.locale('zh-cn', monent_cn)
  }
  render() {
    // let token = this.props.token
    let token = true;
    return (
      <ApolloProvider client={client}>
        <Router>   
          <TitleComponment />
          <div style={{ backgroundColor: '#eee', width: '100%', display: 'flex', justifyContent: 'center' ,padding:20}}>

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

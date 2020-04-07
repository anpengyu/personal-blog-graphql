
import React from 'react';

import styles from './index.less';
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
class ArticleItemComponent extends React.Component {

  componentDidMount() {

  }
  render() {
    let pathname = this.props.location.pathname;
    return (
      <div >
        {pathname != '/login' ? <div>
          公共头部
        <Link to={`/write`}>写文章</Link>
        </div> : null}

      </div>
    );
  }
}

export default withRouter(ArticleItemComponent)